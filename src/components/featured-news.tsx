import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { formatShortDate, formatDate } from "@/lib/utils";
import { Container } from "./container";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  publishedAt: Date | string | null;
};

type EventItem = {
  id: string;
  title: string;
  city: string;
  location: string | null;
  startAt: Date | string;
  status: string;
};

export function FeaturedNews({
  posts,
  nextEvent,
}: {
  posts: Post[];
  nextEvent?: EventItem | null;
}) {
  const [featured, ...rest] = posts;

  return (
    <section className="bg-[var(--surface-muted)]/45 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
              Informação oficial
            </p>
            <h2 className="display-balance mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Notícias e agenda da caminhada.
            </h2>
          </div>
          <Link href="/noticias" className="text-sm font-bold text-[var(--brand-dark)]">
            Ver todas as notícias
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          {featured ? (
            <Link
              href={`/noticias/${featured.slug}`}
              className="group relative flex min-h-[380px] flex-col overflow-hidden border border-[var(--border)] bg-[var(--hero)] p-8 text-white sm:p-10"
              style={{ borderRadius: "var(--radius)" }}
            >
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" aria-hidden />
              <span className="relative w-fit border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                {featured.category}
              </span>
              <div className="relative mt-auto pt-16">
                {featured.publishedAt && (
                  <p className="text-xs text-white/45">{formatShortDate(featured.publishedAt)}</p>
                )}
                <h3 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">{featured.excerpt}</p>
                )}
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                  Ler notícia <ArrowUpRight size={16} aria-hidden />
                </span>
              </div>
            </Link>
          ) : (
            <div
              className="flex min-h-[280px] items-center border border-[var(--border)] bg-[var(--surface)] p-8 text-[var(--text-muted)]"
              style={{ borderRadius: "var(--radius)" }}
            >
              As primeiras publicações oficiais aparecerão aqui.
            </div>
          )}

          <div className="grid gap-5">
            {rest.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                href={`/noticias/${post.slug}`}
                className="border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--brand)]/25"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--brand)]">
                    {post.category}
                  </span>
                  {post.publishedAt && (
                    <span className="text-xs text-[var(--text-muted)]">{formatShortDate(post.publishedAt)}</span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.025em] text-[var(--ink)]">
                  {post.title}
                </h3>
              </Link>
            ))}

            {nextEvent ? (
              <Link
                href="/agenda"
                className="border border-[var(--border)] bg-[var(--brand-dark)] p-6 text-white"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                  <CalendarDays size={14} aria-hidden /> Próxima agenda
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.025em]">
                  {nextEvent.title}
                </h3>
                <p className="mt-3 text-sm text-white/55">
                  {formatDate(nextEvent.startAt, true)} · {nextEvent.city}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
                  {nextEvent.status}
                </p>
              </Link>
            ) : (
              <Link
                href="/verdade-ou-boato"
                className="border border-[var(--border)] bg-[var(--surface)] p-6"
                style={{ borderRadius: "var(--radius)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                  Segurança da informação
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.025em]">
                  Verdade ou boato?
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  Confirme mensagens pelos canais oficiais.
                </p>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
