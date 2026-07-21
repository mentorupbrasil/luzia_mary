import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PublicPageHero } from "@/components/page-hero";
import { getPosts } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

export const metadata = { title: "Notícias" };

export default async function NewsPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <>
      <PublicPageHero
        eyebrow="Notícias"
        title="Informações oficiais da campanha"
        description="Atualizações, explicações e registros publicados pela equipe em um canal próprio e organizado."
      />

      <Container className="py-14 sm:py-16">
        {posts.length === 0 ? (
          <EmptyState
            title="Nenhuma publicação ainda"
            description="As primeiras notícias e atualizações aparecerão aqui."
          />
        ) : (
          <>
            {categories.length > 1 && (
              <div className="mb-10 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)]"
                    style={{ borderRadius: "999px" }}
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {featured && (
              <Link
                href={`/noticias/${featured.slug}`}
                className="group grid gap-8 border-b border-[var(--border)] pb-12 lg:grid-cols-[1.2fr_0.8fr]"
              >
                <div
                  className="min-h-[260px] bg-[var(--hero)] p-8 text-white"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                    Destaque · {featured.category}
                  </span>
                  <h2 className="mt-6 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-sm text-white/50">{formatShortDate(featured.publishedAt)}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-base leading-8 text-[var(--text-muted)]">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]">
                    Ler notícia <ArrowUpRight size={16} aria-hidden />
                  </span>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="mt-10 grid gap-0 border-t border-[var(--border)]">
                {rest.map((post) => (
                  <Link
                    key={post.id}
                    href={`/noticias/${post.slug}`}
                    className="grid gap-3 border-b border-[var(--border)] py-7 transition hover:bg-[var(--surface)]/60 sm:grid-cols-[140px_1fr_auto] sm:items-center"
                  >
                    <span className="text-xs font-semibold text-[var(--text-muted)]">
                      {formatShortDate(post.publishedAt)}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--brand)]">
                        {post.category}
                      </p>
                      <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{post.excerpt}</p>
                      )}
                    </div>
                    <ArrowUpRight size={18} className="text-[var(--text-muted)]" aria-hidden />
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}
