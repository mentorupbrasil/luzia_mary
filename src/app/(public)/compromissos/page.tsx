import { Container } from "@/components/container";
import { PublicPageHero } from "@/components/page-hero";
import { commitmentStatusLabel } from "@/lib/commitments";
import { getCommitments } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

export const metadata = { title: "Compromissos" };

export default async function CommitmentsPage() {
  const items = await getCommitments();

  return (
    <>
      <PublicPageHero
        eyebrow="Compromissos"
        title="Metas públicas para acompanhar"
        description="Cada compromisso combina objetivo, indicador e situação atual — com transparência sobre o que já está em construção."
      />
      <Container className="py-12">
        <div className="space-y-4">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-2xl font-bold text-[var(--brand)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-dark)]">
                  {commitmentStatusLabel(item.status, item.progress)}
                </span>
                {item.dueDate && (
                  <span className="text-xs text-[var(--text-muted)]">
                    Revisão: {formatShortDate(item.dueDate)}
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-display text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{item.summary}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[var(--surface-muted)]/70 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Indicador
                  </p>
                  <p className="mt-1 text-sm font-semibold">{item.metric}</p>
                </div>
                <div className="rounded-2xl bg-[var(--surface-muted)]/70 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Acompanhamento
                  </p>
                  <p className="mt-1 text-sm font-semibold">{item.target}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
