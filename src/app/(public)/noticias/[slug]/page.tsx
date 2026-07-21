import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { getPostBySlug, getPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = (await getPosts()).filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-[var(--border)] bg-[linear-gradient(160deg,#eef4ff_0%,#faf9f7_70%)] py-12">
        <Container>
          <Link href="/noticias" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]">
            <ArrowLeft size={16} aria-hidden /> Voltar
          </Link>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-dark)]">
              {post.category}
            </span>
            {post.publishedAt && (
              <span className="text-[var(--text-muted)]">{formatDate(post.publishedAt)}</span>
            )}
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold tracking-[-0.04em]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)]">{post.excerpt}</p>
          )}
        </Container>
      </section>

      <Container className="py-12">
        <article className="prose-public mx-auto">
          <p>{post.body}</p>
        </article>

        {related.length > 0 && (
          <div className="mx-auto mt-14 max-w-3xl border-t border-[var(--border)] pt-8">
            <h2 className="font-display text-xl font-bold">Leia também</h2>
            <div className="mt-5 grid gap-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/noticias/${item.slug}`}
                  className="rounded-2xl border border-[var(--border)] bg-white p-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand)]">
                    {item.category}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
