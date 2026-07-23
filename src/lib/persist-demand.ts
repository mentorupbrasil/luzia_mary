import { contacts, demands } from "@/db/schema";
import type { getDb } from "@/db";

export type DemandInsert = typeof demands.$inferInsert;
export type ContactInsert = typeof contacts.$inferInsert;

export type DemandWriteClient = {
  insertDemandOnly: (demand: DemandInsert) => Promise<void>;
  /** Deve ser atômico: demanda + contato, ou nada. */
  insertDemandWithContact: (demand: DemandInsert, contact: ContactInsert) => Promise<void>;
};

export function shouldPersistContact(input: {
  updates?: string;
  email?: string | null;
  phone?: string | null;
}) {
  return input.updates === "on" && Boolean(input.email || input.phone);
}

export async function writeDemandSubmission(
  writer: DemandWriteClient,
  input: {
    protocol: string;
    name: string;
    email?: string;
    phone?: string;
    city: string;
    neighborhood?: string;
    category: string;
    title: string;
    description: string;
    updates?: string;
  },
) {
  const demand: DemandInsert = {
    protocol: input.protocol,
    name: input.name,
    email: input.email || null,
    phone: input.phone || null,
    city: input.city,
    neighborhood: input.neighborhood || null,
    category: input.category,
    title: input.title,
    description: input.description,
    consent: true,
    status: "recebida",
    priority: "normal",
  };

  if (!shouldPersistContact(input)) {
    await writer.insertDemandOnly(demand);
    return { savedContact: false as const };
  }

  const contact: ContactInsert = {
    name: input.name,
    email: input.email || null,
    phone: input.phone || null,
    city: input.city,
    source: "formulario-demanda",
    consentText: "Autorizo o recebimento de atualizações pelos canais informados.",
  };

  await writer.insertDemandWithContact(demand, contact);
  return { savedContact: true as const };
}

/** Adapter Neon HTTP: `batch` executa as queries em uma única transação. */
export function createNeonDemandWriter(db: ReturnType<typeof getDb>): DemandWriteClient {
  return {
    async insertDemandOnly(demand) {
      await db.insert(demands).values(demand);
    },
    async insertDemandWithContact(demand, contact) {
      await db.batch([
        db.insert(demands).values(demand),
        db.insert(contacts).values(contact),
      ]);
    },
  };
}
