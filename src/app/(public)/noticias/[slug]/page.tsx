import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() { const posts = await getPosts(); return posts.map(post => ({ slug: post.slug })); }

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = await getPostBySlug(slug); if (!post) notFound();
  return <><section className="border-b border-black/[.06] py-14"><Container><Link href="/noticias" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]"><ArrowLeft size={16}/> Voltar</Link><div className="mt-8 flex items-center gap-3"><Badge tone="brand">{post.category}</Badge><span className="text-xs font-semibold text-black/35">{formatDate(post.publishedAt)}</span></div><h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-.045em] sm:text-6xl">{post.title}</h1><p className="mt-6 max-w-3xl text-xl leading-8 text-black/60">{post.excerpt}</p></Container></section><Container className="py-14"><article className="prose-public max-w-3xl"><p>{post.body}</p></article></Container></>;
}
