import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgendaEvent } from "@/config/agenda";
import {
  getPublishableAgendaEvents,
  isAgendaEventPublishable,
  mapEventRecordToAgendaEvent,
} from "@/lib/agenda";

const listLocalEvents = vi.fn(async () => [] as Array<{
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  city: string;
  startAt: Date;
  endAt: Date | null;
  status: string;
  public: boolean;
  featured: boolean;
  category: string;
  region: string | null;
  createdAt: Date;
  updatedAt: Date;
}>);

vi.mock("@/db", () => ({
  hasDatabase: vi.fn(() => false),
  getDb: vi.fn(),
}));

vi.mock("@/lib/local-events-store", () => ({
  listLocalEvents: () => listLocalEvents(),
}));

import { getAgendaEvents, getProposalBySlug, getProposals } from "@/lib/data";

function confirmedEvent(overrides: Partial<AgendaEvent> = {}): AgendaEvent {
  return {
    id: "a1",
    title: "Visita ao bairro",
    category: "Visita",
    date: "2026-09-01",
    time: "10:00",
    location: "Associação de Moradores",
    city: "Imperatriz",
    description: "Escuta com moradores.",
    status: "confirmed",
    region: "imperatriz",
    ...overrides,
  };
}

describe("carregamento de propostas e agenda", () => {
  beforeEach(() => {
    listLocalEvents.mockReset();
    listLocalEvents.mockResolvedValue([]);
  });

  it("carrega propostas publicadas com campos essenciais", async () => {
    const proposals = await getProposals();

    expect(proposals.length).toBeGreaterThan(0);
    expect(proposals.every((item) => item.published)).toBe(true);

    for (const proposal of proposals) {
      expect(proposal.slug.length).toBeGreaterThan(0);
      expect(proposal.title.length).toBeGreaterThan(0);
      expect(proposal.summary.length).toBeGreaterThan(0);
      expect(proposal.demandTheme.length).toBeGreaterThan(0);
    }

    const bySlug = await getProposalBySlug(proposals[0]!.slug);
    expect(bySlug?.id).toBe(proposals[0]!.id);
  });

  it("getAgendaEvents retorna lista (store local sem banco)", async () => {
    const events = await getAgendaEvents();
    expect(Array.isArray(events)).toBe(true);
    expect(listLocalEvents).toHaveBeenCalled();
  });

  it("mapeia registro e publica só eventos confirmados e completos", async () => {
    const startAt = new Date("2026-09-01T13:00:00.000Z"); // 10:00 Fortaleza (UTC-3)
    const mapped = mapEventRecordToAgendaEvent({
      id: "db-1",
      title: "Reunião com lideranças",
      description: "Pauta social",
      location: "Centro Comunitário",
      city: "Imperatriz",
      startAt,
      endAt: null,
      status: "confirmado",
      public: true,
      featured: true,
      category: "Reunião",
      region: "imperatriz",
    });

    expect(mapped.status).toBe("confirmed");
    expect(mapped.date).toBe("2026-09-01");
    expect(mapped.time).toBe("10:00");
    expect(isAgendaEventPublishable(mapped)).toBe(true);

    const publishable = getPublishableAgendaEvents([
      mapped,
      confirmedEvent({ id: "draft", status: "draft" }),
      confirmedEvent({ id: "incomplete", location: "a confirmar" }),
      confirmedEvent({ id: "dup", title: "Outro" }),
      confirmedEvent({ id: "dup", title: "Duplicado" }),
    ]);

    expect(publishable.map((event) => event.id).sort()).toEqual(["db-1", "dup"].sort());
  });

  it("carrega eventos públicos confirmados a partir do store local", async () => {
    listLocalEvents.mockResolvedValue([
      {
        id: "local-1",
        title: "Mobilização no mercado",
        description: "Presença e escuta",
        location: "Mercado Municipal",
        city: "Imperatriz",
        startAt: new Date("2026-10-05T14:00:00.000Z"),
        endAt: null,
        status: "confirmado",
        public: true,
        featured: false,
        category: "Mobilização",
        region: "imperatriz",
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: new Date("2026-01-01T00:00:00.000Z"),
      },
      {
        id: "local-private",
        title: "Interno",
        description: null,
        location: "Gabinete",
        city: "Imperatriz",
        startAt: new Date("2026-10-06T14:00:00.000Z"),
        endAt: null,
        status: "confirmado",
        public: false,
        featured: false,
        category: "Reunião",
        region: "imperatriz",
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: new Date("2026-01-01T00:00:00.000Z"),
      },
    ]);

    const events = await getAgendaEvents();
    expect(events).toHaveLength(1);
    expect(events[0]?.id).toBe("local-1");
    expect(events[0]?.status).toBe("confirmed");
  });
});
