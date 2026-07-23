/**
 * Fonte central da agenda pública.
 *
 * Regras:
 * - Só publicamos eventos com status "confirmed" e campos obrigatórios preenchidos.
 * - Não inventar horários, locais, partidos ou presença.
 * - Preencher time, location e confirmar presença/partido antes de publicar.
 */

export type AgendaCategory =
  | "Convenção"
  | "Convenção partidária"
  | "Encontro comunitário"
  | "Visita"
  | "Reunião"
  | "Entrevista"
  | "Audiência"
  | "Mobilização"
  | "Evento institucional";

export type AgendaRegion = "imperatriz" | "tocantina" | "maranhao" | "online";

export type AgendaStatus = "confirmed" | "draft" | "cancelled";

export type AgendaEvent = {
  id: string;
  title: string;
  category: AgendaCategory;
  /** YYYY-MM-DD (calendário de Brasília / Fortaleza) */
  date: string;
  /** HH:mm — obrigatório para publicação */
  time: string;
  /** Horário de término opcional (HH:mm) */
  endTime?: string;
  location: string;
  city: string;
  description: string;
  status: AgendaStatus;
  featured?: boolean;
  region?: AgendaRegion;
  mapUrl?: string;
  registrationUrl?: string;
  /** Link para notícia, galeria ou registro público */
  postUrl?: string;
  /**
   * Confirmações internas (não exibidas).
   * Para convenções e atos partidários: só publicar após ambos true.
   */
  presenceConfirmed?: boolean;
  partyConfirmed?: boolean;
};

/**
 * Convenção de 25/07/2026 — estrutura preparada, NÃO publicar até:
 * - horário confirmado
 * - local confirmado
 * - presença de Luzia Mary confirmada
 * - partido confirmado pela equipe (não assumir)
 */
export const AGENDA_DRAFT_CONVENTION_ID = "convencao-partidaria-2026";

export const agendaEvents: AgendaEvent[] = [
  {
    id: AGENDA_DRAFT_CONVENTION_ID,
    title: "Convenção Partidária Estadual",
    category: "Convenção partidária",
    date: "2026-07-25",
    time: "",
    location: "",
    city: "São Luís - MA",
    description:
      "Encontro partidário para definição e homologação das candidaturas que participarão das Eleições 2026.",
    status: "draft",
    featured: true,
    region: "maranhao",
    presenceConfirmed: false,
    partyConfirmed: false,
  },
];

export const agendaMeta = {
  title: "Agenda",
  description:
    "Acompanhe os próximos compromissos, encontros e atividades públicas de Luzia Mary em Imperatriz, na Região Tocantina e no Maranhão.",
} as const;

export const agendaFilterOptions = [
  { id: "todos", label: "TODOS" },
  { id: "imperatriz", label: "IMPERATRIZ" },
  { id: "tocantina", label: "REGIÃO TOCANTINA" },
  { id: "maranhao", label: "MARANHÃO" },
  { id: "online", label: "ONLINE" },
] as const;
