"use server";

import { eq } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import { commitments, demands, events, factChecks, posts, proposals } from "@/db/schema";
import { invalidatePublicContent } from "@/lib/cache-tags";
import { resolveDemandCategory } from "@/lib/demand-category";
import {
  demandPrioritySchema,
  demandStatusSchema,
} from "@/lib/demand-workflow";
import { slugify } from "@/lib/utils";

function dbOrThrow() {
  if (!hasDatabase()) throw new Error("Database unavailable.");
  return getDb();
}
const text = (f: FormData, key: string) => String(f.get(key) || "").trim();
const bool = (f: FormData, key: string) => f.get(key) === "on";
const int = (f: FormData, key: string, fallback = 0) => Number.parseInt(text(f, key), 10) || fallback;

export async function updateDemandAction(formData: FormData) {
  const id = text(formData, "id");
  const statusParsed = demandStatusSchema.safeParse(text(formData, "status"));
  const priorityParsed = demandPrioritySchema.safeParse(text(formData, "priority"));
  if (!id || !statusParsed.success || !priorityParsed.success) {
    throw new Error("Status ou prioridade inválidos.");
  }

  await dbOrThrow()
    .update(demands)
    .set({
      status: statusParsed.data,
      priority: priorityParsed.data,
      assignedTo: text(formData, "assignedTo") || null,
      internalNotes: text(formData, "internalNotes") || null,
      updatedAt: new Date(),
    })
    .where(eq(demands.id, id));

  invalidatePublicContent("demand");
}

export async function createProposalAction(formData: FormData) {
  const title = text(formData, "title");
  const lines = (key: string) =>
    text(formData, key)
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  const category = text(formData, "category");
  const demandTheme =
    resolveDemandCategory(text(formData, "demandTheme")) ||
    resolveDemandCategory(category);
  if (!demandTheme) {
    throw new Error("Selecione um tema da demanda válido (lista do formulário Participe).");
  }
  const slug = slugify(text(formData, "slug") || title);
  await dbOrThrow().insert(proposals).values({
    title,
    slug,
    summary: text(formData, "summary"),
    body: text(formData, "body"),
    category,
    icon: text(formData, "icon") || "heart-handshake",
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    sortOrder: int(formData, "sortOrder"),
    whyItMatters: text(formData, "whyItMatters"),
    commitments: lines("commitments"),
    howFederalActs: lines("howFederalActs"),
    demandTheme,
  });
  invalidatePublicContent("proposal", { slug });
}

export async function createCommitmentAction(formData: FormData) {
  await dbOrThrow().insert(commitments).values({
    title: text(formData, "title"),
    summary: text(formData, "summary"),
    metric: text(formData, "metric"),
    target: text(formData, "target"),
    status: text(formData, "status") || "proposto",
    progress: Math.min(100, Math.max(0, int(formData, "progress"))),
    published: bool(formData, "published"),
    sortOrder: int(formData, "sortOrder"),
  });
  invalidatePublicContent("commitment");
}

export async function createEventAction(formData: FormData) {
  const startText = text(formData, "startAt");
  const startAt = new Date(`${startText}:00-03:00`);
  const endText = text(formData, "endAt");
  const endAt = endText ? new Date(`${endText}:00-03:00`) : null;
  const payload = {
    title: text(formData, "title"),
    description: text(formData, "description") || null,
    city: text(formData, "city"),
    location: text(formData, "location") || null,
    startAt,
    endAt,
    status: text(formData, "status") || "confirmado",
    public: bool(formData, "public"),
    featured: bool(formData, "featured"),
    category: text(formData, "category") || "Evento institucional",
    region: text(formData, "region") || null,
  };

  let id: string | undefined;
  if (hasDatabase()) {
    const inserted = await getDb().insert(events).values(payload).returning({ id: events.id });
    id = inserted[0]?.id;
  } else {
    const { insertLocalEvent } = await import("@/lib/local-events-store");
    const created = await insertLocalEvent(payload);
    id = created.id;
  }

  invalidatePublicContent("event", { id });
}

export async function createFactCheckAction(formData: FormData) {
  const claim = text(formData, "claim");
  const sourceLabel = text(formData, "sourceLabel");
  const sourceUrl = text(formData, "sourceUrl");
  const slug = slugify(text(formData, "slug") || claim);
  await dbOrThrow().insert(factChecks).values({
    claim,
    slug,
    verdict: text(formData, "verdict"),
    explanation: text(formData, "explanation"),
    sources: sourceUrl ? [{ label: sourceLabel || "Fonte", url: sourceUrl }] : [],
    published: bool(formData, "published"),
  });
  invalidatePublicContent("factCheck");
}

export async function createPostAction(formData: FormData) {
  const title = text(formData, "title");
  const slug = slugify(text(formData, "slug") || title);
  await dbOrThrow().insert(posts).values({
    title,
    slug,
    excerpt: text(formData, "excerpt"),
    body: text(formData, "body"),
    category: text(formData, "category") || "Notícias",
    imageUrl: text(formData, "imageUrl") || null,
    published: bool(formData, "published"),
  });
  invalidatePublicContent("post", { slug });
}

export async function deleteContentAction(formData: FormData) {
  const id = text(formData, "id");
  const type = text(formData, "type");
  const tables = {
    proposal: proposals,
    commitment: commitments,
    event: events,
    factCheck: factChecks,
    post: posts,
  } as const;
  const table = tables[type as keyof typeof tables];
  if (!table) return;

  let slug: string | undefined;
  if (type === "proposal" || type === "post" || type === "factCheck") {
    const rows = await dbOrThrow()
      .select({ slug: (table as typeof proposals).slug })
      .from(table as typeof proposals)
      .where(eq((table as typeof proposals).id, id))
      .limit(1);
    slug = rows[0]?.slug;
  }

  await dbOrThrow().delete(table as never).where(eq((table as typeof proposals).id, id));

  if (type === "proposal") invalidatePublicContent("proposal", { slug });
  else if (type === "post") invalidatePublicContent("post", { slug });
  else if (type === "commitment") invalidatePublicContent("commitment");
  else if (type === "event") invalidatePublicContent("event", { id });
  else if (type === "factCheck") invalidatePublicContent("factCheck");
}
