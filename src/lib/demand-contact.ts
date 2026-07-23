import { z } from "zod";

/** Regra compartilhada: pelo menos um canal de retorno (e-mail ou telefone). */

export const DEMAND_CONTACT_REQUIRED_MESSAGE =
  "Informe um e-mail ou um telefone/WhatsApp para retorno.";

export function hasDemandContact(email?: string | null, phone?: string | null) {
  return Boolean(email?.trim() || phone?.trim());
}

const emailField = z
  .string()
  .email("Informe um e-mail válido.")
  .optional()
  .or(z.literal(""));

const phoneField = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine((value) => {
    if (!value) return true;
    const digits = value.replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15;
  }, "Informe um telefone válido com DDD.");

export const demandContactFieldsSchema = z
  .object({
    email: emailField,
    phone: phoneField,
  })
  .superRefine((data, ctx) => {
    if (hasDemandContact(data.email, data.phone)) return;
    ctx.addIssue({
      code: "custom",
      path: ["email"],
      message: DEMAND_CONTACT_REQUIRED_MESSAGE,
    });
    ctx.addIssue({
      code: "custom",
      path: ["phone"],
      message: DEMAND_CONTACT_REQUIRED_MESSAGE,
    });
  });

export function parseDemandContactFields(input: { email?: string; phone?: string }) {
  return demandContactFieldsSchema.safeParse({
    email: input.email ?? "",
    phone: input.phone ?? "",
  });
}

export { emailField as demandEmailField, phoneField as demandPhoneField };
