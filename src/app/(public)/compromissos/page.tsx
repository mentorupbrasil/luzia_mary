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
        eyebrow="Compromissos públicos"
        title="Promessas precisam virar metas acompanháveis"
        description="Cada compromisso combina objetivo, indicador e situação atual. Quando ainda não houver execução, o status permanece honesto e transparente."
      />

      <Container className="py-14 sm:py-16">
        <div className="border-t border-[var(--border)]">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="grid gap-6 border-b border-[var(--border)] py-10 lg:grid-cols-[88px_1fr]"
            >
              <span className="font-display text-3xl font-semibold text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="bg-[var(--brand-soft)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-dark)]"
                    style={{ borderRadius: "999px" }}
                  >
                    {commitmentStatusLabel(item.status, item.progress)}
                  </span>
                  {item.dueDate && (
                    <span className="text-xs text-[var(--text-muted)]">
                      Revisão: {formatShortDate(item.dueDate)}
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.6rem,2.8vw,2.3rem)] font-semibold tracking-[-0.025em]">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--text-muted)]">
                  {item.summary}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="border border-[var(--border)] bg-[var(--surface)] p-4" style={{ borderRadius: "var(--radius)" }}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Indicador
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{item.metric}</p>
                  </div>
                  <div className="border border-[var(--border)] bg-[var(--surface)] p-4" style={{ borderRadius: "var(--radius)" }}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Forma de acompanhamento
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{item.target}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-10 border border-[var(--border)] bg-[var(--surface)] p-6"
          style={{ borderRadius: "var(--radius)" }}
        >
          <h3 className="font-display text-xl font-semibold">Transparência da informação</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            O painel administrativo permite atualizar o andamento. Mudanças importantes devem ser
            explicadas em notícia ou relatório, evitando que metas desapareçam sem justificativa.
            Resultados só serão publicados quando existirem dados reais.
          </p>
        </div>
      </Container>
    </>
  );
}
