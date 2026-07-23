import { describe, expect, it } from "vitest";
import type { AgendaEvent } from "@/config/agenda";
import { buildAgendaIcs, resolveAgendaIcsEnd } from "@/lib/agenda";

function sampleEvent(overrides: Partial<AgendaEvent> = {}): AgendaEvent {
  return {
    id: "evt-test-1",
    title: "Encontro com lideranças",
    category: "Encontro comunitário",
    date: "2026-08-10",
    time: "19:00",
    location: "Praça de Fátima",
    city: "Imperatriz",
    description: "Diálogo com a comunidade.",
    status: "confirmed",
    region: "imperatriz",
    ...overrides,
  };
}

describe("geração do .ics", () => {
  it("usa +1h como fim padrão e gera VEVENT válido", () => {
    expect(resolveAgendaIcsEnd("2026-08-10", "19:00")).toEqual({
      date: "2026-08-10",
      time: "20:00",
    });

    const ics = buildAgendaIcs(sampleEvent());

    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("DTSTART;TZID=America/Fortaleza:20260810T190000");
    expect(ics).toContain("DTEND;TZID=America/Fortaleza:20260810T200000");
    expect(ics).toContain("SUMMARY:Encontro com lideranças");
    expect(ics).toContain("LOCATION:Praça de Fátima\\, Imperatriz");
    expect(ics).toMatch(/UID:evt-test-1@/);
    expect(ics.endsWith("\r\n") || ics.includes("END:VCALENDAR")).toBe(true);
  });

  it("rola o dia quando o fim padrão passa da meia-noite", () => {
    expect(resolveAgendaIcsEnd("2026-08-10", "23:30")).toEqual({
      date: "2026-08-11",
      time: "00:30",
    });

    const ics = buildAgendaIcs(sampleEvent({ time: "23:30" }));
    expect(ics).toContain("DTSTART;TZID=America/Fortaleza:20260810T233000");
    expect(ics).toContain("DTEND;TZID=America/Fortaleza:20260811T003000");
  });

  it("respeita endTime no mesmo dia e rejeita data inválida", () => {
    expect(resolveAgendaIcsEnd("2026-08-10", "19:00", "21:15")).toEqual({
      date: "2026-08-10",
      time: "21:15",
    });

    const ics = buildAgendaIcs(sampleEvent({ endTime: "21:15" }));
    expect(ics).toContain("DTEND;TZID=America/Fortaleza:20260810T211500");

    expect(() => buildAgendaIcs(sampleEvent({ date: "2026-13-40" }))).toThrow(
      /Data ou horário inválidos/i,
    );
  });
});
