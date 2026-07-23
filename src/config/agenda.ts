/**
 * Tipos e textos da agenda pública.
 * Os eventos vêm de getAgendaEvents() (banco → store local se o banco estiver indisponível).
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

export const agendaCategories: AgendaCategory[] = [
  "Encontro comunitário",
  "Visita",
  "Reunião",
  "Entrevista",
  "Audiência",
  "Mobilização",
  "Evento institucional",
  "Convenção",
  "Convenção partidária",
];
