import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { PublicPageHero } from "@/components/page-hero";
import { getProposals } from "@/lib/data";

export const metadata = { title: "Bandeiras" };

export default async function ProposalsPage() {
  const proposals = await getProposals();

  return (
    <>
      <PublicPageHero
        eyebrow="Bandeiras"
        title="Prioridades para o Maranhão real"
        description="Cada bandeira aponta um caminho de atuação federal, com acompanhamento público e espaço para a contribuição da população."
      />

      <Container className="py-12 sm:py-14">
        <div className="space-y-5">
          {proposals.map((proposal, index) => (
            <Link
              key={proposal.id}
              href={`/propostas/${proposal.slug}`}
              className={`group grid gap-5 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white p-6 transition hover:shadow-[var(--shadow)] sm:grid-cols-[100px_1fr_auto] sm:items-center sm:p-8 ${
                index % 2 === 1 ? "bg-[var(--surface-muted)]/40" : ""
              }`}
            >
              <span className="font-display text-4xl font-bold text-[var(--brand)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {proposal.category}
                </p>
                <h2 className="mt-2 font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                  {proposal.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">{proposal.summary}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]">
                Abrir <ArrowUpRight size={16} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
