import { z } from "zod";
import {
  demandCategories,
  isDemandCategory,
  type DemandCategory,
} from "@/config/site";

/** Schema do tema — mesma lista do `<select>` em DemandForm. */
export const demandCategorySchema = z.enum(demandCategories, {
  error: "Escolha um tema da lista.",
});

export function parseDemandCategory(value: string) {
  return demandCategorySchema.safeParse(value);
}

/** Aceita só valores idênticos às opções do formulário (após trim). */
export function resolveDemandCategory(value?: string | null): DemandCategory | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return isDemandCategory(trimmed) ? trimmed : null;
}

/**
 * Escolhe o primeiro candidato que exista em `demandCategories`.
 * Usado ao normalizar propostas (DB / fallback) e ao montar links.
 */
export function pickDemandCategory(
  ...candidates: Array<string | null | undefined>
): DemandCategory | null {
  for (const candidate of candidates) {
    const resolved = resolveDemandCategory(candidate);
    if (resolved) return resolved;
  }
  return null;
}

/** Link canônico para /participe com tema válido na query string. */
export function buildParticipateHref(tema?: string | null): string {
  const category = resolveDemandCategory(tema);
  if (!category) return "/participe";
  return `/participe?tema=${encodeURIComponent(category)}`;
}

export { demandCategories, isDemandCategory };
export type { DemandCategory };
