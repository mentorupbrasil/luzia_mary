"use server";

import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import { contacts, demands } from "@/db/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { getDemandRateLimitKey } from "@/lib/request-ip";

/** Janela curta: até 5 envios válidos por IP a cada 10 minutos. */
const DEMAND_RATE_LIMIT = 5;
const DEMAND_RATE_WINDOW_MS = 10 * 60 * 1000;

function sanitizeText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}

function normalizePhone(value: string) {
  return value.replace(/[^\d+()\-\s]/g, "").trim();
}

const schema = z.object({
  name: z.string().min(3, "Informe seu nome.").max(120, "Nome muito longo."),
  email: z
    .string()
    .email("Informe um e-mail válido.")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((value) => {
      if (!value) return true;
      const digits = value.replace(/\D/g, "");
      return digits.length >= 8 && digits.length <= 15;
    }, "Informe um telefone válido com DDD."),
  city: z.string().min(2, "Informe o município.").max(80, "Município muito longo."),
  neighborhood: z.string().max(80, "Localidade muito longa.").optional().or(z.literal("")),
  category: z.string().min(2, "Escolha um tema."),
  title: z
    .string()
    .min(5, "Resuma a demanda em pelo menos 5 caracteres.")
    .max(160, "Resumo com no máximo 160 caracteres."),
  description: z
    .string()
    .min(20, "Descreva a situação com pelo menos 20 caracteres.")
    .max(4000, "Descrição com no máximo 4.000 caracteres."),
  consent: z.literal("on", {
    error: "É necessário concordar com o tratamento dos dados para enviar.",
  }),
  updates: z.string().optional(),
});

export type DemandState = {
  ok: boolean;
  message: string;
  protocol?: string;
  registeredAt?: string;
  errors?: Record<string, string[]>;
};

export async function submitDemand(_: DemandState, formData: FormData): Promise<DemandState> {
  // Honeypot: campo oculto para bots. Não inventar anti-spam externo.
  const honeypot = String(formData.get("website") || "").trim();
  if (honeypot) {
    return {
      ok: false,
      message: "Não foi possível registrar agora. Tente novamente ou utilize o canal oficial de contato.",
    };
  }

  const raw = {
    name: sanitizeText(formData.get("name"), 120),
    email: sanitizeText(formData.get("email"), 120),
    phone: normalizePhone(sanitizeText(formData.get("phone"), 40)),
    city: sanitizeText(formData.get("city"), 80),
    neighborhood: sanitizeText(formData.get("neighborhood"), 80),
    category: sanitizeText(formData.get("category"), 80),
    title: sanitizeText(formData.get("title"), 160),
    description: sanitizeText(formData.get("description"), 4000),
    consent: formData.get("consent"),
    updates: formData.get("updates") ? "on" : undefined,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Revise os campos destacados.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const rateKey = await getDemandRateLimitKey();
  const rate = checkRateLimit(rateKey, {
    limit: DEMAND_RATE_LIMIT,
    windowMs: DEMAND_RATE_WINDOW_MS,
  });
  if (!rate.allowed) {
    // Sem logs de IP, formulário ou dados pessoais.
    return {
      ok: false,
      message:
        "Você enviou várias contribuições em pouco tempo. Aguarde alguns minutos e tente novamente.",
    };
  }

  if (!hasDatabase()) {
    return {
      ok: false,
      message:
        "O banco de dados ainda não foi conectado. Configure DATABASE_URL no Neon/Vercel para ativar o formulário.",
    };
  }

  const data = parsed.data;
  const registeredAt = new Date();
  const protocol = `MA-${registeredAt.getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  try {
    const db = getDb();
    await db.insert(demands).values({
      protocol,
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      city: data.city,
      neighborhood: data.neighborhood || null,
      category: data.category,
      title: data.title,
      description: data.description,
      consent: true,
    });

    if (data.updates === "on" && (data.email || data.phone)) {
      await db.insert(contacts).values({
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        city: data.city,
        source: "formulario-demanda",
        consentText: "Autorizo o recebimento de atualizações pelos canais informados.",
      });
    }

    return {
      ok: true,
      message: "Demanda registrada com sucesso.",
      protocol,
      registeredAt: registeredAt.toISOString(),
    };
  } catch {
    // Não registrar dados pessoais em logs.
    return {
      ok: false,
      message:
        "Não foi possível registrar agora. Tente novamente ou utilize o canal oficial de contato.",
    };
  }
}
