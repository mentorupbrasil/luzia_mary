import { unstable_cache } from "next/cache";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import { commitments, demands, events, factChecks, posts, proposals } from "@/db/schema";
import {
  PUBLIC_DATA_REVALIDATE_SECONDS,
  cacheTags,
} from "@/lib/cache-tags";
import { pickDemandCategory } from "@/lib/demand-category";
import { publicDemandStatuses } from "@/lib/demand-workflow";
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

function asDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value);
}

/** unstable_cache exige runtime Next; em testes cai no fetch direto. */
function publicCached<T>(
  key: string[],
  tags: string[],
  fn: () => Promise<T>,
): () => Promise<T> {
  const cached = unstable_cache(fn, key, {
    revalidate: PUBLIC_DATA_REVALIDATE_SECONDS,
    tags,
  });
  return async () => {
    try {
      return await cached();
    } catch {
      return fn();
    }
  };
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
  createdAt: Date | string;
  updatedAt: Date | string;
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
    createdAt: asDate(row.createdAt),
    updatedAt: asDate(row.updatedAt),
  };
}

async function fetchPublishedProposals(): Promise<ProposalRecord[]> {
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

const cachedPublishedProposals = publicCached(
  ["public-proposals"],
  [cacheTags.proposals],
  fetchPublishedProposals,
);

/** Propostas publicadas para o site (banco → fallback). */
export async function getProposals(): Promise<ProposalRecord[]> {
  return cachedPublishedProposals();
}

/** Todas as propostas para o painel (inclui rascunhos). Sem cache público. */
export async function getAllProposals(): Promise<ProposalRecord[]> {
  if (!hasDatabase()) return fallbackProposals;
  try {
    const rows = await getDb().select().from(proposals).orderBy(asc(proposals.sortOrder));
    return rows.map(normalizeProposal);
  } catch {
    return fallbackProposals;
  }
}

async function fetchProposalBySlug(slug: string): Promise<ProposalRecord | null> {
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

export async function getProposalBySlug(slug: string): Promise<ProposalRecord | null> {
  return publicCached(
    ["public-proposal", slug],
    [cacheTags.proposals],
    () => fetchProposalBySlug(slug),
  )();
}

async function fetchPublishedCommitments() {
  if (!hasDatabase()) return publishedOnly(fallbackCommitments);
  try {
    const rows = await getDb()
      .select()
      .from(commitments)
      .where(eq(commitments.published, true))
      .orderBy(asc(commitments.sortOrder));
    return rows.map((row) => ({
      ...row,
      createdAt: asDate(row.createdAt),
      updatedAt: asDate(row.updatedAt),
      dueDate: row.dueDate ? asDate(row.dueDate) : null,
    }));
  } catch {
    return publishedOnly(fallbackCommitments);
  }
}

const cachedPublishedCommitments = publicCached(
  ["public-commitments"],
  [cacheTags.commitments],
  fetchPublishedCommitments,
);

export async function getCommitments() {
  return cachedPublishedCommitments();
}

async function fetchPublishedFactChecks() {
  if (!hasDatabase()) return publishedOnly(fallbackFactChecks);
  try {
    const rows = await getDb()
      .select()
      .from(factChecks)
      .where(eq(factChecks.published, true))
      .orderBy(desc(factChecks.publishedAt));
    return rows.map((row) => ({
      ...row,
      createdAt: asDate(row.createdAt),
      updatedAt: asDate(row.updatedAt),
      publishedAt: asDate(row.publishedAt),
    }));
  } catch {
    return publishedOnly(fallbackFactChecks);
  }
}

const cachedPublishedFactChecks = publicCached(
  ["public-fact-checks"],
  [cacheTags.factChecks],
  fetchPublishedFactChecks,
);

export async function getFactChecks() {
  return cachedPublishedFactChecks();
}

async function fetchPublicEvents() {
  if (!hasDatabase()) {
    const { listLocalEvents } = await import("./local-events-store");
    return (await listLocalEvents()).filter((row) => row.public === true);
  }
  try {
    const rows = await getDb()
      .select()
      .from(events)
      .where(eq(events.public, true))
      .orderBy(asc(events.startAt));
    return rows.map((row) => ({
      ...row,
      startAt: asDate(row.startAt),
      endAt: row.endAt ? asDate(row.endAt) : null,
      createdAt: asDate(row.createdAt),
      updatedAt: asDate(row.updatedAt),
    }));
  } catch {
    const { listLocalEvents } = await import("./local-events-store");
    return (await listLocalEvents()).filter((row) => row.public === true);
  }
}

const cachedPublicEvents = publicCached(
  ["public-events"],
  [cacheTags.agenda],
  fetchPublicEvents,
);

export async function getEvents() {
  return cachedPublicEvents();
}

/** Todos os eventos para o painel (inclui privados e não confirmados). Sem cache público. */
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

async function fetchPublishedPosts() {
  if (!hasDatabase()) return publishedOnly(fallbackPosts);
  try {
    const rows = await getDb()
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.publishedAt));
    return rows.map((row) => ({
      ...row,
      createdAt: asDate(row.createdAt),
      updatedAt: asDate(row.updatedAt),
      publishedAt: asDate(row.publishedAt),
    }));
  } catch {
    return publishedOnly(fallbackPosts);
  }
}

const cachedPublishedPosts = publicCached(
  ["public-posts"],
  [cacheTags.posts],
  fetchPublishedPosts,
);

export async function getPosts() {
  return cachedPublishedPosts();
}

/** Todas as notícias para o painel (inclui rascunhos). Sem cache público. */
export async function getAllPosts() {
  if (!hasDatabase()) return fallbackPosts;
  try {
    return await getDb().select().from(posts).orderBy(desc(posts.publishedAt));
  } catch {
    return fallbackPosts;
  }
}

async function fetchPostBySlug(slug: string) {
  if (!hasDatabase()) {
    return publishedOnly(fallbackPosts).find((item) => item.slug === slug) ?? null;
  }
  try {
    const rows = await getDb()
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.published, true)))
      .limit(1);
    const row = rows[0];
    if (!row) return null;
    return {
      ...row,
      createdAt: asDate(row.createdAt),
      updatedAt: asDate(row.updatedAt),
      publishedAt: asDate(row.publishedAt),
    };
  } catch {
    return publishedOnly(fallbackPosts).find((item) => item.slug === slug) ?? null;
  }
}

/** Notícia publicada por slug — rascunho retorna null (página pública → notFound). */
export async function getPostBySlug(slug: string) {
  return publicCached(
    ["public-post", slug],
    [cacheTags.posts],
    () => fetchPostBySlug(slug),
  )();
}

async function fetchPublicDemandStats() {
  if (!hasDatabase()) {
    return { total: 0, cities: 0, categories: [] as Array<{ category: string; total: number }> };
  }
  try {
    const db = getDb();
    const publicOnly = inArray(demands.status, [...publicDemandStatuses]);

    const [totalRow] = await db
      .select({ total: sql<number>`count(*)::int` })
      .from(demands)
      .where(publicOnly);

    const [citiesRow] = await db
      .select({ total: sql<number>`count(distinct ${demands.city})::int` })
      .from(demands)
      .where(publicOnly);

    const categories = await db
      .select({ category: demands.category, total: sql<number>`count(*)::int` })
      .from(demands)
      .where(publicOnly)
      .groupBy(demands.category)
      .orderBy(desc(sql`count(*)`))
      .limit(6);

    return {
      total: totalRow?.total ?? 0,
      cities: citiesRow?.total ?? 0,
      categories,
    };
  } catch {
    return { total: 0, cities: 0, categories: [] as Array<{ category: string; total: number }> };
  }
}

const cachedPublicDemandStats = publicCached(
  ["public-demand-stats"],
  [cacheTags.demandStats],
  fetchPublicDemandStats,
);

export async function getPublicDemandStats() {
  return cachedPublicDemandStats();
}
