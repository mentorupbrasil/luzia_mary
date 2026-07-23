import {
  type AgendaCategory,
  type AgendaEvent,
  type AgendaRegion,
} from "@/config/agenda";

const TZ = "America/Fortaleza";

const INCOMPLETE_MARKERS = [
  "a confirmar",
  "[preencher]",
  "preencher",
  "tbd",
  "a definir",
];

const TOCANTINA_MARKERS = [
  "açailândia",
  "acailandia",
  "porto franco",
  "estreito",
  "joão lisboa",
  "joao lisboa",
  "governador edison lobão",
  "governador edison lobao",
  "campestre do maranhão",
  "campestre do maranhao",
  "são joão do paraíso",
  "sao joao do paraiso",
  "davínópolis",
  "davinopolis",
  "cidelândia",
  "cidelandia",
  "vila nova dos martírios",
  "vila nova dos martirios",
];

export type EventSourceRow = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  city: string;
  startAt: Date;
  endAt: Date | null;
  status: string;
  public: boolean;
  featured?: boolean | null;
  category?: string | null;
  region?: string | null;
};

function hasIncompleteText(value: string) {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return true;
  return INCOMPLETE_MARKERS.some((marker) => normalized.includes(marker));
}

/** Data civil YYYY-MM-DD no fuso de Brasília/Fortaleza. */
export function todayInBrasilia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function formatInTz(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, ...options }).format(date);
}

function timeInTz(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

export function inferAgendaRegion(city: string): AgendaRegion {
  const normalized = city.trim().toLowerCase();
  if (!normalized) return "maranhao";
  if (
    normalized.includes("online") ||
    normalized.includes("virtual") ||
    normalized.includes("zoom") ||
    normalized.includes("meet")
  ) {
    return "online";
  }
  if (normalized.includes("imperatriz")) return "imperatriz";
  if (TOCANTINA_MARKERS.some((marker) => normalized.includes(marker))) return "tocantina";
  return "maranhao";
}

function mapStatus(status: string): AgendaEvent["status"] {
  const normalized = status.trim().toLowerCase();
  if (normalized === "confirmado" || normalized === "confirmed") return "confirmed";
  if (normalized === "cancelado" || normalized === "cancelled") return "cancelled";
  return "draft";
}

function asCategory(value: string | null | undefined): AgendaCategory {
  const allowed: AgendaCategory[] = [
    "Convenção",
    "Convenção partidária",
    "Encontro comunitário",
    "Visita",
    "Reunião",
    "Entrevista",
    "Audiência",
    "Mobilização",
    "Evento institucional",
  ];
  if (value && (allowed as string[]).includes(value)) return value as AgendaCategory;
  return "Evento institucional";
}

function asRegion(value: string | null | undefined, city: string): AgendaRegion {
  const allowed: AgendaRegion[] = ["imperatriz", "tocantina", "maranhao", "online"];
  if (value && (allowed as string[]).includes(value)) return value as AgendaRegion;
  return inferAgendaRegion(city);
}

/** Converte registro do banco/store local para o formato da agenda pública. */
export function mapEventRecordToAgendaEvent(row: EventSourceRow): AgendaEvent {
  const date = formatInTz(row.startAt, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const time = timeInTz(row.startAt);
  const endTime = row.endAt ? timeInTz(row.endAt) : undefined;

  return {
    id: row.id,
    title: row.title,
    category: asCategory(row.category),
    date,
    time,
    endTime,
    location: row.location?.trim() || "",
    city: row.city,
    description: row.description?.trim() || "",
    status: mapStatus(row.status),
    featured: Boolean(row.featured),
    region: asRegion(row.region, row.city),
  };
}

export function isAgendaEventPublishable(event: AgendaEvent): boolean {
  if (event.status !== "confirmed") return false;
  if (!event.title?.trim()) return false;
  if (!event.date?.trim()) return false;
  if (hasIncompleteText(event.time)) return false;
  if (hasIncompleteText(event.location)) return false;
  if (hasIncompleteText(event.title)) return false;
  if (hasIncompleteText(event.date)) return false;
  if (hasIncompleteText(event.city || "")) return false;

  // Convenções: exigir confirmação explícita de presença e partido
  if (event.category.toLowerCase().includes("convenção")) {
    if (!event.presenceConfirmed || !event.partyConfirmed) return false;
  }

  return true;
}

export function getPublishableAgendaEvents(source: AgendaEvent[]): AgendaEvent[] {
  const seen = new Set<string>();
  return source.filter((event) => {
    if (!isAgendaEventPublishable(event)) return false;
    if (seen.has(event.id)) return false;
    seen.add(event.id);
    return true;
  });
}

function eventSortKey(event: AgendaEvent) {
  return `${event.date}T${event.time || "00:00"}`;
}

export function partitionAgendaEvents(events: AgendaEvent[]) {
  const today = todayInBrasilia();
  const upcoming = events
    .filter((event) => event.date >= today)
    .sort((a, b) => eventSortKey(a).localeCompare(eventSortKey(b)));
  const past = events
    .filter((event) => event.date < today)
    .sort((a, b) => eventSortKey(b).localeCompare(eventSortKey(a)));

  const featured =
    upcoming.find((event) => event.featured) ?? upcoming[0] ?? null;

  const upcomingList = featured
    ? upcoming.filter((event) => event.id !== featured.id)
    : upcoming;

  return { upcoming, upcomingList, past, featured };
}

export function filterByRegion(
  events: AgendaEvent[],
  region: AgendaRegion | "todos",
) {
  if (region === "todos") return events;
  return events.filter((event) => event.region === region);
}

export function formatAgendaDayParts(date: string) {
  const anchor = new Date(`${date}T12:00:00-03:00`);
  const day = new Intl.DateTimeFormat("pt-BR", {
    timeZone: TZ,
    day: "2-digit",
  }).format(anchor);
  const month = new Intl.DateTimeFormat("pt-BR", {
    timeZone: TZ,
    month: "short",
  })
    .format(anchor)
    .replace(".", "")
    .toUpperCase();
  const year = new Intl.DateTimeFormat("pt-BR", {
    timeZone: TZ,
    year: "numeric",
  }).format(anchor);
  return { day, month, year };
}

export function formatAgendaLongDate(date: string) {
  const anchor = new Date(`${date}T12:00:00-03:00`);
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(anchor);
}

export function formatAgendaTime(time: string, endTime?: string) {
  const start = time.replace(":", "h");
  if (!endTime) return start;
  return `${start} – ${endTime.replace(":", "h")}`;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toIcsLocalStamp(date: string, time: string) {
  const [y, m, d] = date.split("-");
  const [hh, mm] = time.split(":");
  return `${y}${m}${d}T${hh}${mm}00`;
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function buildAgendaIcs(event: AgendaEvent) {
  const dtStart = toIcsLocalStamp(event.date, event.time);
  const endTime = event.endTime || addOneHour(event.time);
  const dtEnd = toIcsLocalStamp(event.date, endTime);
  const now = new Date();
  const dtStamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
  const location = [event.location, event.city].filter(Boolean).join(", ");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Luzia Mary//Agenda Publica//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@luziamary.com.br`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=${TZ}:${dtStart}`,
    `DTEND;TZID=${TZ}:${dtEnd}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description || "")}`,
    `LOCATION:${escapeIcs(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

function addOneHour(time: string) {
  const [hh, mm] = time.split(":").map(Number);
  const total = hh * 60 + mm + 60;
  const nextH = Math.floor(total / 60) % 24;
  const nextM = total % 60;
  return `${pad(nextH)}:${pad(nextM)}`;
}

export function downloadAgendaIcs(event: AgendaEvent) {
  const ics = buildAgendaIcs(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${event.id}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function getAgendaShareUrl(eventId: string) {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/agenda#evento-${eventId}`;
}
