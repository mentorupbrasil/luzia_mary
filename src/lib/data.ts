import { asc, desc, eq, sql } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import { commitments, demands, events, factChecks, posts, proposals } from "@/db/schema";
import { fallbackCommitments, fallbackEvents, fallbackFactChecks, fallbackPosts, fallbackProposals } from "./fallback-data";

export async function getProposals() {
  if (!hasDatabase()) return fallbackProposals;
  try { return await getDb().select().from(proposals).where(eq(proposals.published, true)).orderBy(asc(proposals.sortOrder)); } catch { return fallbackProposals; }
}

export async function getProposalBySlug(slug: string) {
  if (!hasDatabase()) return fallbackProposals.find(item => item.slug === slug) ?? null;
  try { const rows = await getDb().select().from(proposals).where(eq(proposals.slug, slug)).limit(1); return rows[0] ?? null; } catch { return fallbackProposals.find(item => item.slug === slug) ?? null; }
}

export async function getCommitments() {
  if (!hasDatabase()) return fallbackCommitments;
  try { return await getDb().select().from(commitments).where(eq(commitments.published, true)).orderBy(asc(commitments.sortOrder)); } catch { return fallbackCommitments; }
}

export async function getFactChecks() {
  if (!hasDatabase()) return fallbackFactChecks;
  try { return await getDb().select().from(factChecks).where(eq(factChecks.published, true)).orderBy(desc(factChecks.publishedAt)); } catch { return fallbackFactChecks; }
}

export async function getEvents() {
  if (!hasDatabase()) return fallbackEvents;
  try { return await getDb().select().from(events).where(eq(events.public, true)).orderBy(asc(events.startAt)); } catch { return fallbackEvents; }
}

export async function getPosts() {
  if (!hasDatabase()) return fallbackPosts;
  try { return await getDb().select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.publishedAt)); } catch { return fallbackPosts; }
}

export async function getPostBySlug(slug: string) {
  if (!hasDatabase()) return fallbackPosts.find(item => item.slug === slug) ?? null;
  try { const rows = await getDb().select().from(posts).where(eq(posts.slug, slug)).limit(1); return rows[0] ?? null; } catch { return fallbackPosts.find(item => item.slug === slug) ?? null; }
}

export async function getPublicDemandStats() {
  if (!hasDatabase()) return { total: 0, cities: 0, categories: [] as Array<{ category: string; total: number }> };
  try {
    const db = getDb();
    const [totalRow] = await db.select({ total: sql<number>`count(*)::int` }).from(demands);
    const [citiesRow] = await db.select({ total: sql<number>`count(distinct ${demands.city})::int` }).from(demands);
    const categories = await db.select({ category: demands.category, total: sql<number>`count(*)::int` }).from(demands).groupBy(demands.category).orderBy(desc(sql`count(*)`)).limit(6);
    return { total: totalRow?.total ?? 0, cities: citiesRow?.total ?? 0, categories };
  } catch { return { total: 0, cities: 0, categories: [] as Array<{ category: string; total: number }> }; }
}
