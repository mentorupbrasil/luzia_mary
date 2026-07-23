import { and, asc, desc, eq, sql } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import { commitments, demands, events, factChecks, posts, proposals } from "@/db/schema";
import { pickDemandCategory } from "@/lib/demand-category";
import {
  fallbackCommitments,
  fallbackFactChecks,
  fallbackPosts,
  fallbackProposals,
  type ProposalRecord,
} from "./fallback-data";

function publishedOnly<T extends { published: boolean }>(items: T[]) {
  return items.filter((item) => item.published === true);
}

function normalizeProposal(row: {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  icon: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  whyItMatters?: string | null;
  commitments?: string[] | null;
  howFederalActs?: string[] | null;
  demandTheme?: string | null;
  createdAt: Date;
  updatedAt: Date;
}): ProposalRecord {
  const fallback = fallbackProposals.find((item) => item.slug === row.slug);
  const demandTheme =
    pickDemandCategory(row.demandTheme, fallback?.demandTheme, row.category) ??
    fallback?.demandTheme ??
    "Outro assunto";

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    body: row.body,
    category: row.category,
    icon: row.icon ?? fallback?.icon ?? "heart-handshake",
    featured: row.featured,
    published: row.published,
    sortOrder: row.sortOrder,
    whyItMatters: row.whyItMatters || fallback?.whyItMatters || row.body,
    commitments: row.commitments?.length ? row.commitments : fallback?.commitments ?? [],
    howFederalActs: row.howFederalActs?.length ? row.howFederalActs : fallback?.howFederalActs ?? [],
    demandTheme,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/** Propostas publicadas para o site (banco → fallback). */
export async function getProposals(): Promise<ProposalRecord[]> {
  if (!hasDatabase()) return publishedOnly(fallbackProposals);
  try {
    const rows = await getDb()
      .select()
      .from(proposals)
      .where(eq(proposals.published, true))
      .orderBy(asc(proposals.sortOrder));
    return rows.map(normalizeProposal);
  } catch {
    return publishedOnly(fallbackProposals);
  }
}

/** Todas as propostas para o painel (inclui rascunhos). */
export async function getAllProposals(): Promise<ProposalRecord[]> {
  if (!hasDatabase()) return fallbackProposals;
  try {
    const rows = await getDb().select().from(proposals).orderBy(asc(proposals.sortOrder));
    return rows.map(normalizeProposal);
  } catch {
    return fallbackProposals;
  }
}

export async function getProposalBySlug(slug: string): Promise<ProposalRecord | null> {
  if (!hasDatabase()) {
    return publishedOnly(fallbackProposals).find((item) => item.slug === slug) ?? null;
  }
  try {
    const rows = await getDb()
      .select()
      .from(proposals)
      .where(and(eq(proposals.slug, slug), eq(proposals.published, true)))
      .limit(1);
    return rows[0] ? normalizeProposal(rows[0]) : null;
  } catch {
    return publishedOnly(fallbackProposals).find((item) => item.slug === slug) ?? null;
  }
}

export async function getCommitments() {
  if (!hasDatabase()) return publishedOnly(fallbackCommitments);
  try {
    return await getDb()
      .select()
      .from(commitments)
      .where(eq(commitments.published, true))
      .orderBy(asc(commitments.sortOrder));
  } catch {
    return publishedOnly(fallbackCommitments);
  }
}

export async function getFactChecks() {
  if (!hasDatabase()) return publishedOnly(fallbackFactChecks);
  try {
    return await getDb()
      .select()
      .from(factChecks)
      .where(eq(factChecks.published, true))
      .orderBy(desc(factChecks.publishedAt));
  } catch {
    return publishedOnly(fallbackFactChecks);
  }
}

export async function getEvents() {
  if (!hasDatabase()) {
    const { listLocalEvents } = await import("./local-events-store");
    return (await listLocalEvents()).filter((row) => row.public === true);
  }
  try {
    return await getDb()
      .select()
      .from(events)
      .where(eq(events.public, true))
      .orderBy(asc(events.startAt));
  } catch {
    const { listLocalEvents } = await import("./local-events-store");
    return (await listLocalEvents()).filter((row) => row.public === true);
  }
}

/** Todos os eventos para o painel (inclui privados e não confirmados). */
export async function getAllEvents() {
  if (!hasDatabase()) {
    const { listLocalEvents } = await import("./local-events-store");
    return listLocalEvents();
  }
  try {
    return await getDb().select().from(events).orderBy(asc(events.startAt));
  } catch {
    const { listLocalEvents } = await import("./local-events-store");
    return listLocalEvents();
  }
}

/** Eventos já mapeados e filtrados para a agenda pública. */
export async function getAgendaEvents() {
  const { getPublishableAgendaEvents, mapEventRecordToAgendaEvent } = await import("./agenda");
  const rows = await getEvents();
  const mapped = rows
    .filter((row) => row.public !== false)
    .filter((row) => {
      const status = String(row.status || "").toLowerCase();
      return status === "confirmado" || status === "confirmed";
    })
    .map((row) =>
      mapEventRecordToAgendaEvent({
        id: row.id,
        title: row.title,
        description: row.description,
        location: row.location,
        city: row.city,
        startAt: row.startAt instanceof Date ? row.startAt : new Date(row.startAt),
        endAt: row.endAt ? (row.endAt instanceof Date ? row.endAt : new Date(row.endAt)) : null,
        status: row.status,
        public: row.public,
        featured: "featured" in row ? (row as { featured?: boolean }).featured : false,
        category: "category" in row ? (row as { category?: string }).category : null,
        region: "region" in row ? (row as { region?: string | null }).region : null,
      }),
    );
  return getPublishableAgendaEvents(mapped);
}

export async function getPosts() {
  if (!hasDatabase()) return publishedOnly(fallbackPosts);
  try {
    return await getDb()
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.publishedAt));
  } catch {
    return publishedOnly(fallbackPosts);
  }
}

/** Todas as notícias para o painel (inclui rascunhos). */
export async function getAllPosts() {
  if (!hasDatabase()) return fallbackPosts;
  try {
    return await getDb().select().from(posts).orderBy(desc(posts.publishedAt));
  } catch {
    return fallbackPosts;
  }
}

/** Notícia publicada por slug — rascunho retorna null (página pública → notFound). */
export async function getPostBySlug(slug: string) {
  if (!hasDatabase()) {
    return publishedOnly(fallbackPosts).find((item) => item.slug === slug) ?? null;
  }
  try {
    const rows = await getDb()
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.published, true)))
      .limit(1);
    return rows[0] ?? null;
  } catch {
    return publishedOnly(fallbackPosts).find((item) => item.slug === slug) ?? null;
  }
}

export async function getPublicDemandStats() {
  if (!hasDatabase()) return { total: 0, cities: 0, categories: [] as Array<{ category: string; total: number }> };
  try {
    const db = getDb();
    const [totalRow] = await db.select({ total: sql<number>`count(*)::int` }).from(demands);
    const [citiesRow] = await db.select({ total: sql<number>`count(distinct ${demands.city})::int` }).from(demands);
    const categories = await db
      .select({ category: demands.category, total: sql<number>`count(*)::int` })
      .from(demands)
      .groupBy(demands.category)
      .orderBy(desc(sql`count(*)`))
      .limit(6);
    return { total: totalRow?.total ?? 0, cities: citiesRow?.total ?? 0, categories };
  } catch {
    return { total: 0, cities: 0, categories: [] as Array<{ category: string; total: number }> };
  }
}
