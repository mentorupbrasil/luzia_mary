import type { MetadataRoute } from "next";
import { getAgendaEvents, getPosts, getProposals } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-url";

/** Regenera com dados publicados (propostas, notícias e eventos). */
export const dynamic = "force-dynamic";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type StaticRoute = {
  path: string;
  changeFrequency: Freq;
  priority: number;
};

/** Páginas fixas — participação só na rota oficial /participe. */
const STATIC_ROUTES: StaticRoute[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/propostas", changeFrequency: "weekly", priority: 0.9 },
  { path: "/participe", changeFrequency: "weekly", priority: 0.9 },
  { path: "/agenda", changeFrequency: "daily", priority: 0.9 },
  { path: "/noticias", changeFrequency: "daily", priority: 0.8 },
  { path: "/compromissos", changeFrequency: "weekly", priority: 0.7 },
  { path: "/sobre", changeFrequency: "monthly", priority: 0.7 },
  { path: "/verdade-ou-boato", changeFrequency: "weekly", priority: 0.6 },
  { path: "/transparencia", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacidade", changeFrequency: "yearly", priority: 0.3 },
];

function toDate(value: Date | string | null | undefined, fallback: Date) {
  if (!value) return fallback;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date;
}

function dedupeByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const result: MetadataRoute.Sitemap = [];
  for (const entry of entries) {
    if (seen.has(entry.url)) continue;
    seen.add(entry.url);
    result.push(entry);
  }
  return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().replace(/\/$/, "");
  const now = new Date();

  const [proposals, posts, events] = await Promise.all([
    getProposals(),
    getPosts(),
    getAgendaEvents(),
  ]);

  const latestEventDate = events.reduce<Date | null>((latest, event) => {
    const date = toDate(event.date, now);
    if (!latest || date > latest) return date;
    return latest;
  }, null);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${base}${route.path}`,
    lastModified:
      route.path === "/agenda" && latestEventDate ? latestEventDate : now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const proposalEntries: MetadataRoute.Sitemap = proposals.map((proposal) => ({
    url: `${base}/propostas/${proposal.slug}`,
    lastModified: toDate(proposal.updatedAt ?? proposal.createdAt, now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/noticias/${post.slug}`,
    lastModified: toDate(post.updatedAt ?? post.publishedAt ?? post.createdAt, now),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  /** Rotas públicas `/agenda/{id}` dos eventos publicados. */
  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${base}/agenda/${event.id}`,
    lastModified: toDate(event.date, now),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return dedupeByUrl([
    ...staticEntries,
    ...proposalEntries,
    ...postEntries,
    ...eventEntries,
  ]);
}
