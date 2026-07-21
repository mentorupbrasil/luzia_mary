import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

export const metadata = { title: "Notícias" };

export default async function NewsPage() {
  const posts = await getPosts();
  return <><PageHero eyebrow="Notícias e posicionamentos" title="Informações oficiais da campanha" description="Atualizações, explicações, propostas e registros publicados pela equipe em um canal próprio e organizado."/><Container className="py-14">{posts.length === 0 ? <EmptyState title="Nenhuma publicação ainda" description="As primeiras notícias e atualizações aparecerão aqui."/> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{posts.map(post=><Link href={`/noticias/${post.slug}`} key={post.id} className="group rounded-[28px] border border-black/[.07] bg-white p-6 shadow-[0_18px_60px_rgba(27,45,38,.07)] transition hover:-translate-y-1"><div className="flex items-center justify-between"><Badge>{post.category}</Badge><ArrowUpRight size={18} className="text-black/30 transition group-hover:text-[var(--brand)]"/></div><h2 className="mt-6 text-xl font-bold tracking-[-.025em] group-hover:text-[var(--brand)]">{post.title}</h2><p className="mt-3 text-sm leading-7 text-black/55">{post.excerpt}</p><p className="mt-6 text-xs font-semibold uppercase tracking-wider text-black/35">{formatShortDate(post.publishedAt)}</p></Link>)}</div>}</Container></>;
}
