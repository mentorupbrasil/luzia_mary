import { z } from "zod";
import { demandCategories, isDemandCategory } from "@/config/site";

/** Schema do tema — mesma lista do `<select>` em DemandForm. */
export const demandCategorySchema = z.enum(demandCategories, {
  error: "Escolha um tema da lista.",
});

export function parseDemandCategory(value: string) {
  return demandCategorySchema.safeParse(value);
}

export { isDemandCategory, demandCategories };
