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

  return (
    <>
      <PublicPageHero
        eyebrow="Notícias"
        title="Ações e atualizações oficiais"
        description="Publicações da equipe da campanha em um canal próprio e organizado."
      />

      <Container className="py-12 sm:py-14">
        {posts.length === 0 ? (
          <EmptyState
            title="Nenhuma publicação ainda"
            description="As primeiras notícias oficiais aparecerão aqui."
          />
        ) : (
          <>
            {featured && (
              <Link
                href={`/noticias/${featured.slug}`}
                className="grid gap-6 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white lg:grid-cols-[1.2fr_0.8fr]"
              >
                <div className="min-h-[240px] bg-gradient-to-br from-[var(--brand)] to-[var(--brand-dark)] p-8 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                    {featured.category}
                  </span>
                  <h2 className="mt-8 font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                    {featured.title}
                  </h2>
                  {featured.publishedAt && (
                    <p className="mt-4 text-xs text-white/45">{formatShortDate(featured.publishedAt)}</p>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  {featured.excerpt && (
                    <p className="text-base leading-8 text-[var(--text-muted)]">{featured.excerpt}</p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]">
                    Ler notícia <ArrowUpRight size={16} aria-hidden />
                  </span>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="mt-8 border-t border-[var(--border)]">
                {rest.map((post) => (
                  <Link
                    key={post.id}
                    href={`/noticias/${post.slug}`}
                    className="grid gap-2 border-b border-[var(--border)] py-6 sm:grid-cols-[130px_1fr] sm:items-center"
                  >
                    <span className="text-xs font-semibold text-[var(--text-muted)]">
                      {post.publishedAt ? formatShortDate(post.publishedAt) : "—"}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--brand)]">
                        {post.category}
                      </p>
                      <h2 className="mt-1 font-display text-lg font-bold">{post.title}</h2>
                    </div>
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
