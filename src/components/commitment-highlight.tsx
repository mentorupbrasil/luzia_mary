import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { commitmentStatusLabel } from "@/lib/commitments";
import { Container } from "./container";

type Commitment = {
  id: string;
  title: string;
  summary: string;
  metric: string;
  target: string;
  status: string;
  progress: number;
};

export function CommitmentHighlight({ commitments }: { commitments: Commitment[] }) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
              Compromissos públicos
            </p>
            <h2 className="display-balance mt-4 font-display text-[clamp(2rem,4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Não basta dizer. É preciso mostrar como será feito.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-muted)]">
              Cada compromisso combina objetivo, indicador e situação atual — com transparência
              sobre o que já está em construção e o que ainda será atualizado.
            </p>
            <Link
              href="/compromissos"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]"
            >
              Ver todos os compromissos <ArrowUpRight size={16} aria-hidden />
            </Link>
          </div>

          <div className="border-t border-[var(--border)]">
            {commitments.slice(0, 4).map((commitment, index) => (
              <article
                key={commitment.id}
                className="grid gap-4 border-b border-[var(--border)] py-7 sm:grid-cols-[56px_1fr_auto] sm:items-start"
              >
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">
                    {commitment.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{commitment.summary}</p>
                  <p className="mt-3 text-xs text-[var(--text-muted)]">
                    Indicador: <strong className="text-[var(--ink)]">{commitment.metric}</strong>
                  </p>
                </div>
                <span
                  className="w-fit bg-[var(--brand-soft)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-dark)]"
                  style={{ borderRadius: "999px" }}
                >
                  {commitmentStatusLabel(commitment.status, commitment.progress)}
                </span>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
