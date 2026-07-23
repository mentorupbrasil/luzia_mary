"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb, hasDatabase } from "@/db";
import { commitments, demands, events, factChecks, posts, proposals } from "@/db/schema";
import { slugify } from "@/lib/utils";

function dbOrThrow() {
  if (!hasDatabase()) throw new Error("Conecte o banco Neon configurando DATABASE_URL.");
  return getDb();
}
const text = (f: FormData, key: string) => String(f.get(key) || "").trim();
const bool = (f: FormData, key: string) => f.get(key) === "on";
const int = (f: FormData, key: string, fallback = 0) => Number.parseInt(text(f,key),10) || fallback;

export async function updateDemandAction(formData: FormData) {
  const id = text(formData, "id");
  await dbOrThrow().update(demands).set({ status: text(formData,"status"), priority: text(formData,"priority"), assignedTo: text(formData,"assignedTo") || null, internalNotes: text(formData,"internalNotes") || null, updatedAt: new Date() }).where(eq(demands.id,id));
  revalidatePath("/admin/demandas");
}

export async function createProposalAction(formData: FormData) {
  const title = text(formData, "title");
  const lines = (key: string) =>
    text(formData, key)
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  const category = text(formData, "category");
  await dbOrThrow().insert(proposals).values({
    title,
    slug: slugify(text(formData, "slug") || title),
    summary: text(formData, "summary"),
    body: text(formData, "body"),
    category,
    icon: text(formData, "icon") || "landmark",
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    sortOrder: int(formData, "sortOrder"),
    whyItMatters: text(formData, "whyItMatters"),
    commitments: lines("commitments"),
    howFederalActs: lines("howFederalActs"),
    demandTheme: text(formData, "demandTheme") || category,
  });
  revalidatePath("/admin/propostas");
  revalidatePath("/propostas");
  revalidatePath("/");
}

export async function createCommitmentAction(formData: FormData) {
  await dbOrThrow().insert(commitments).values({ title: text(formData,"title"), summary: text(formData,"summary"), metric: text(formData,"metric"), target: text(formData,"target"), status: text(formData,"status") || "proposto", progress: Math.min(100, Math.max(0,int(formData,"progress"))), published: bool(formData,"published"), sortOrder: int(formData,"sortOrder") });
  revalidatePath("/admin/compromissos"); revalidatePath("/compromissos");
}

export async function createEventAction(formData: FormData) {
  const startText = text(formData,"startAt");
  const startAt = new Date(`${startText}:00-03:00`);
  const endText = text(formData,"endAt");
  await dbOrThrow().insert(events).values({ title: text(formData,"title"), description: text(formData,"description") || null, city: text(formData,"city"), location: text(formData,"location") || null, startAt, endAt: endText ? new Date(`${endText}:00-03:00`) : null, status: text(formData,"status") || "confirmado", public: bool(formData,"public") });
  revalidatePath("/admin/agenda"); revalidatePath("/agenda");
}

export async function createFactCheckAction(formData: FormData) {
  const claim = text(formData,"claim");
  const sourceLabel = text(formData,"sourceLabel");
  const sourceUrl = text(formData,"sourceUrl");
  await dbOrThrow().insert(factChecks).values({ claim, slug: slugify(text(formData,"slug") || claim), verdict: text(formData,"verdict"), explanation: text(formData,"explanation"), sources: sourceUrl ? [{label: sourceLabel || "Fonte", url: sourceUrl}] : [], published: bool(formData,"published") });
  revalidatePath("/admin/checagens"); revalidatePath("/verdade-ou-boato");
}

export async function createPostAction(formData: FormData) {
  const title = text(formData,"title");
  await dbOrThrow().insert(posts).values({ title, slug: slugify(text(formData,"slug") || title), excerpt: text(formData,"excerpt"), body: text(formData,"body"), category: text(formData,"category") || "Notícias", imageUrl: text(formData,"imageUrl") || null, published: bool(formData,"published") });
  revalidatePath("/admin/noticias"); revalidatePath("/noticias");
}

export async function deleteContentAction(formData: FormData) {
  const id = text(formData,"id"); const type = text(formData,"type");
  const tables = { proposal: proposals, commitment: commitments, event: events, factCheck: factChecks, post: posts } as const;
  const table = tables[type as keyof typeof tables];
  if (!table) return;
  // Drizzle's generic table types are intentionally narrowed at runtime here.
  await dbOrThrow().delete(table as never).where(eq((table as typeof proposals).id,id));
  revalidatePath("/admin"); revalidatePath("/");
  if (type === "proposal") {
    revalidatePath("/admin/propostas");
    revalidatePath("/propostas");
  }
}
