"use server";

import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import { contacts, demands } from "@/db/schema";

const schema = z.object({
  name: z.string().min(3, "Informe seu nome."),
  email: z.string().email("E-mail inválido.").optional().or(z.literal("")),
  phone: z.string().min(8, "Informe um telefone válido.").optional().or(z.literal("")),
  city: z.string().min(2, "Informe o município."),
  neighborhood: z.string().optional(),
  category: z.string().min(2, "Escolha um tema."),
  title: z.string().min(5, "Resuma a demanda em pelo menos 5 caracteres."),
  description: z.string().min(20, "Descreva a situação com pelo menos 20 caracteres."),
  consent: z.literal("on", { error: "É necessário concordar com o tratamento dos dados para enviar." }),
  updates: z.string().optional(),
  website: z.string().optional(),
});

export type DemandState = { ok: boolean; message: string; protocol?: string; errors?: Record<string, string[]> };

export async function submitDemand(_: DemandState, formData: FormData): Promise<DemandState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: "Revise os campos destacados.", errors: parsed.error.flatten().fieldErrors };
  // Honeypot: bots that fill hidden fields are rejected silently
  if (parsed.data.website) return { ok: true, message: "Demanda registrada com sucesso.", protocol: `MA-${new Date().getFullYear()}-OK` };
  if (!hasDatabase()) return { ok: false, message: "O banco de dados ainda não foi conectado. Configure DATABASE_URL no Neon/Vercel para ativar o formulário." };

  const data = parsed.data;
  const protocol = `MA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
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
    return { ok: true, message: "Demanda registrada com sucesso.", protocol };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Não foi possível registrar agora. Tente novamente ou utilize o canal oficial de contato." };
  }
}
