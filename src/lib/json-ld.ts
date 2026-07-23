import type { AgendaEvent } from "@/config/agenda";
import { content } from "@/config/site";
import { getAbsoluteUrl } from "@/lib/page-metadata";
import { getSiteUrl } from "@/lib/site-url";

export type JsonLdObject = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ArticleInput = {
  title: string;
  description: string;
  path: string;
  imageUrl?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
  category?: string | null;
};

function siteBase() {
  return getSiteUrl().replace(/\/$/, "");
}

function absoluteMedia(path?: string | null) {
  if (!path?.trim()) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteBase()}${path.startsWith("/") ? path : `/${path}`}`;
}

function toIsoDate(value?: Date | string | null) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

/** @id estável da Person — compartilhado entre Home e Biografia. */
export function personId() {
  return `${siteBase()}/#person`;
}

export function websiteId() {
  return `${siteBase()}/#website`;
}

/**
 * Person com dados já publicados no projeto.
 * Omite partido, cargo confirmado, redes vazias e endereço de rua.
 */
export function buildPersonJsonLd(): JsonLdObject {
  const { candidate, contact } = content;
  const image = absoluteMedia(candidate.photos.about || candidate.photos.hero);

  const person: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(),
    name: candidate.name,
    alternateName: candidate.ballotName,
    description: candidate.shortBio,
    url: getAbsoluteUrl("/sobre"),
  };

  if (image) person.image = image;
  if (contact.email?.trim()) person.email = contact.email.trim();

  if (candidate.city || candidate.state) {
    person.address = {
      "@type": "PostalAddress",
      ...(candidate.city ? { addressLocality: candidate.city } : {}),
      ...(candidate.state ? { addressRegion: candidate.state } : {}),
      addressCountry: "BR",
    };
  }

  return person;
}

/** WebSite no layout público — referencia a Person por @id, sem duplicar o objeto. */
export function buildWebsiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    name: content.candidate.ballotName,
    url: siteBase(),
    description: content.candidate.shortBio,
    inLanguage: "pt-BR",
    about: { "@id": personId() },
    publisher: { "@id": personId() },
  };
}

/** BreadcrumbList: Início + itens da página (páginas internas). */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  const crumbs: BreadcrumbItem[] = [{ name: "Início", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function buildArticleJsonLd(input: ArticleInput): JsonLdObject {
  const url = getAbsoluteUrl(input.path);
  const image = absoluteMedia(input.imageUrl);
  const datePublished = toIsoDate(input.publishedAt);
  const dateModified = toIsoDate(input.updatedAt) || datePublished;

  const article: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: input.title,
    description: input.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: { "@id": personId() },
    publisher: { "@id": personId() },
    isPartOf: { "@id": websiteId() },
  };

  if (image) article.image = [image];
  if (datePublished) article.datePublished = datePublished;
  if (dateModified) article.dateModified = dateModified;
  if (input.category?.trim()) article.articleSection = input.category.trim();

  return article;
}

/** Monta startDate ISO a partir de data/hora reais do evento (fuso Fortaleza). */
export function eventStartIso(event: Pick<AgendaEvent, "date" | "time">) {
  if (!event.date?.trim() || !event.time?.trim()) return undefined;
  const iso = `${event.date}T${event.time}:00-03:00`;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return iso;
}

export function eventEndIso(event: Pick<AgendaEvent, "date" | "time" | "endTime">) {
  if (!event.endTime?.trim() || !event.date?.trim()) return undefined;
  const iso = `${event.date}T${event.endTime}:00-03:00`;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return iso;
}

export function buildEventJsonLd(event: AgendaEvent): JsonLdObject | null {
  const startDate = eventStartIso(event);
  if (!startDate || !event.title?.trim()) return null;

  const url = getAbsoluteUrl(`/agenda/${event.id}`);
  const endDate = eventEndIso(event);
  const isOnline = event.region === "online";

  const place: JsonLdObject = {
    "@type": "Place",
    name: event.location.trim() || event.city,
  };

  if (!isOnline && (event.city?.trim() || event.location?.trim())) {
    place.address = {
      "@type": "PostalAddress",
      ...(event.city?.trim() ? { addressLocality: event.city.trim() } : {}),
      addressRegion: content.candidate.state,
      addressCountry: "BR",
    };
  }

  const node: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${url}#event`,
    name: event.title,
    startDate,
    eventAttendanceMode: isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: isOnline
      ? {
          "@type": "VirtualLocation",
          url,
        }
      : place,
    organizer: { "@id": personId() },
    url,
  };

  if (event.description?.trim()) node.description = event.description.trim();
  if (endDate) node.endDate = endDate;

  return node;
}

export function buildEventsJsonLd(events: AgendaEvent[]): JsonLdObject[] {
  return events
    .map((event) => buildEventJsonLd(event))
    .filter((item): item is JsonLdObject => Boolean(item));
}
