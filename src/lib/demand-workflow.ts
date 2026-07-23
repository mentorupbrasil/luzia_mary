import { z } from "zod";

/** Valores canônicos de status de demanda (banco, painel e consultas). */
export const demandStatuses = [
  "recebida",
  "em análise",
  "encaminhada",
  "respondida",
  "arquivada",
] as const;

export type DemandStatus = (typeof demandStatuses)[number];

/**
 * Statuses that may appear in public aggregate stats.
 * Excludes: not yet moderated (`recebida`), archived/removed (`arquivada`),
 * and any future spam/rejected/test values that are not listed here.
 */
export const publicDemandStatuses = [
  "em análise",
  "encaminhada",
  "respondida",
] as const satisfies readonly DemandStatus[];

export type PublicDemandStatus = (typeof publicDemandStatuses)[number];

export const demandStatusLabels: Record<DemandStatus, string> = {
  recebida: "Recebida",
  "em análise": "Em análise",
  encaminhada: "Encaminhada",
  respondida: "Respondida",
  arquivada: "Arquivada",
};

/** Valores canônicos de prioridade de demanda. */
export const demandPriorities = ["baixa", "normal", "alta", "urgente"] as const;

export type DemandPriority = (typeof demandPriorities)[number];

export const demandPriorityLabels: Record<DemandPriority, string> = {
  baixa: "Baixa",
  normal: "Normal",
  alta: "Alta",
  urgente: "Urgente",
};

export const demandStatusSchema = z.enum(demandStatuses, {
  error: "Status inválido.",
});

export const demandPrioritySchema = z.enum(demandPriorities, {
  error: "Prioridade inválida.",
});

export function isDemandStatus(value: string): value is DemandStatus {
  return (demandStatuses as readonly string[]).includes(value);
}

export function isPublicDemandStatus(value: string): value is PublicDemandStatus {
  return (publicDemandStatuses as readonly string[]).includes(value);
}

export function isDemandPriority(value: string): value is DemandPriority {
  return (demandPriorities as readonly string[]).includes(value);
}

/** Aggregate-only public stats — never include name, contact, protocol or free text. */
export function aggregatePublicDemandStats(
  rows: ReadonlyArray<{ status: string; city: string; category: string }>,
): {
  total: number;
  cities: number;
  categories: Array<{ category: string; total: number }>;
} {
  const publicRows = rows.filter((row) => isPublicDemandStatus(row.status));
  const cities = new Set(
    publicRows.map((row) => row.city.trim()).filter(Boolean),
  );
  const byCategory = new Map<string, number>();
  for (const row of publicRows) {
    const category = row.category.trim() || "Outro assunto";
    byCategory.set(category, (byCategory.get(category) ?? 0) + 1);
  }
  const categories = [...byCategory.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total || a.category.localeCompare(b.category))
    .slice(0, 6);

  return {
    total: publicRows.length,
    cities: cities.size,
    categories,
  };
}

/** Normaliza texto legado para um status canônico (ou null se inválido). */
export function resolveDemandStatus(value?: string | null): DemandStatus | null {
  if (typeof value !== "string") return null;
  const raw = value.trim().toLowerCase();
  if (!raw) return null;

  const aliases: Record<string, DemandStatus> = {
    recebida: "recebida",
    recebido: "recebida",
    nova: "recebida",
    novo: "recebida",
    "em análise": "em análise",
    "em analise": "em análise",
    analise: "em análise",
    análise: "em análise",
    analysis: "em análise",
    encaminhada: "encaminhada",
    encaminhado: "encaminhada",
    respondida: "respondida",
    respondido: "respondida",
    arquivada: "arquivada",
    arquivado: "arquivada",
  };

  return aliases[raw] ?? (isDemandStatus(raw) ? raw : null);
}

/** Normaliza texto legado para uma prioridade canônica (ou null se inválido). */
export function resolveDemandPriority(value?: string | null): DemandPriority | null {
  if (typeof value !== "string") return null;
  const raw = value.trim().toLowerCase();
  if (!raw) return null;

  const aliases: Record<string, DemandPriority> = {
    baixa: "baixa",
    low: "baixa",
    normal: "normal",
    media: "normal",
    média: "normal",
    medium: "normal",
    alta: "alta",
    high: "alta",
    urgente: "urgente",
    urgent: "urgente",
    critica: "urgente",
    crítica: "urgente",
  };

  return aliases[raw] ?? (isDemandPriority(raw) ? raw : null);
}

/** Para migration: valor inválido → padrão seguro. */
export function coerceDemandStatus(value?: string | null): DemandStatus {
  return resolveDemandStatus(value) ?? "recebida";
}

export function coerceDemandPriority(value?: string | null): DemandPriority {
  return resolveDemandPriority(value) ?? "normal";
}
