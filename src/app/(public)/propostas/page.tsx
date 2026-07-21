import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { PublicPageHero } from "@/components/page-hero";
import { getProposals } from "@/lib/data";

export const metadata = { title: "Prioridades" };

export default async function ProposalsPage() {
  const proposals = await getProposals();
  const categories = [...new Set(proposals.map((item) => item.category))];

  return (
    <>
      <PublicPageHero
        eyebrow="Prioridades"
        title="Prioridades construídas para serem acompanhadas"
        description="Cada proposta apresenta um caminho de atuação compatível com o mandato de deputada federal e poderá evoluir com contribuições da população."
      />

      <Container className="py-14 sm:py-16">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-muted)]"
              style={{ borderRadius: "999px" }}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="border-t border-[var(--border)]">
          {proposals.map((proposal, index) => (
            <Link
              key={proposal.id}
              href={`/propostas/${proposal.slug}`}
              className="group grid gap-4 border-b border-[var(--border)] py-8 transition hover:bg-[var(--surface)]/70 sm:grid-cols-[72px_1fr_auto] sm:items-start sm:gap-8"
            >
              <span className="font-display text-3xl font-semibold text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand)]">
                  {proposal.category}
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.5rem,2.5vw,2.2rem)] font-semibold tracking-[-0.025em] text-[var(--ink)] group-hover:text-[var(--brand-dark)]">
                  {proposal.title}
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--text-muted)]">
                  {proposal.summary}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]">
                Ler <ArrowUpRight size={16} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
