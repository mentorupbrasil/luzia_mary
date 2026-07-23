import { and, asc, desc, eq, sql } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import { commitments, demands, events, factChecks, posts, proposals } from "@/db/schema";
import {
  fallbackCommitments,
  fallbackEvents,
  fallbackFactChecks,
  fallbackPosts,
  fallbackProposals,
  type ProposalRecord,
} from "./fallback-data";

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
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    body: row.body,
    category: row.category,
    icon: row.icon ?? fallback?.icon ?? "landmark",
    featured: row.featured,
    published: row.published,
    sortOrder: row.sortOrder,
    whyItMatters: row.whyItMatters || fallback?.whyItMatters || row.body,
    commitments: row.commitments?.length ? row.commitments : fallback?.commitments ?? [],
    howFederalActs: row.howFederalActs?.length ? row.howFederalActs : fallback?.howFederalActs ?? [],
    demandTheme: row.demandTheme || fallback?.demandTheme || row.category,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/** Propostas publicadas para o site (banco → fallback). */
export async function getProposals(): Promise<ProposalRecord[]> {
  if (!hasDatabase()) return fallbackProposals;
  try {
    const rows = await getDb()
      .select()
      .from(proposals)
      .where(eq(proposals.published, true))
      .orderBy(asc(proposals.sortOrder));
    return rows.map(normalizeProposal);
  } catch {
    return fallbackProposals;
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
  if (!hasDatabase()) return fallbackProposals.find((item) => item.slug === slug) ?? null;
  try {
    const rows = await getDb()
      .select()
      .from(proposals)
      .where(and(eq(proposals.slug, slug), eq(proposals.published, true)))
      .limit(1);
    return rows[0] ? normalizeProposal(rows[0]) : null;
  } catch {
    return fallbackProposals.find((item) => item.slug === slug) ?? null;
  }
}

export async function getCommitments() {
  if (!hasDatabase()) return fallbackCommitments;
  try {
    return await getDb()
      .select()
      .from(commitments)
      .where(eq(commitments.published, true))
      .orderBy(asc(commitments.sortOrder));
  } catch {
    return fallbackCommitments;
  }
}

export async function getFactChecks() {
  if (!hasDatabase()) return fallbackFactChecks;
  try {
    return await getDb()
      .select()
      .from(factChecks)
      .where(eq(factChecks.published, true))
      .orderBy(desc(factChecks.publishedAt));
  } catch {
    return fallbackFactChecks;
  }
}

export async function getEvents() {
  if (!hasDatabase()) return fallbackEvents;
  try {
    return await getDb()
      .select()
      .from(events)
      .where(eq(events.public, true))
      .orderBy(asc(events.startAt));
  } catch {
    return fallbackEvents;
  }
}

export async function getPosts() {
  if (!hasDatabase()) return fallbackPosts;
  try {
    return await getDb()
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.publishedAt));
  } catch {
    return fallbackPosts;
  }
}

export async function getPostBySlug(slug: string) {
  if (!hasDatabase()) return fallbackPosts.find((item) => item.slug === slug) ?? null;
  try {
    const rows = await getDb().select().from(posts).where(eq(posts.slug, slug)).limit(1);
    return rows[0] ?? null;
  } catch {
    return fallbackPosts.find((item) => item.slug === slug) ?? null;
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
