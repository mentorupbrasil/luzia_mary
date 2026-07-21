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

  const related = (await getPosts())
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--hero)] py-14 text-white sm:py-16">
        <Container>
          <Link href="/noticias" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white">
            <ArrowLeft size={16} aria-hidden /> Voltar
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
              {post.category}
            </span>
            <span className="text-white/45">{formatDate(post.publishedAt)}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold tracking-[-0.035em]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">{post.excerpt}</p>
          )}
        </Container>
      </section>

      <Container className="py-14">
        <article className="prose-public mx-auto max-w-3xl">
          <p>{post.body}</p>
        </article>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl border-t border-[var(--border)] pt-10">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.025em]">Leia também</h2>
            <div className="mt-6 grid gap-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/noticias/${item.slug}`}
                  className="border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--brand)]/25"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--brand)]">
                    {item.category}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
