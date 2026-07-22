import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProposalCard({
  proposal,
  index,
}: {
  proposal: { slug: string; title: string; summary: string; category: string; icon?: string | null };
  index?: number;
}) {
  return (
    <Link
      href={`/propostas/${proposal.slug}`}
      className="group relative flex min-h-[280px] flex-col border border-[var(--border)] bg-[var(--surface)] p-7 transition hover:border-[var(--brand)]/30"
      style={{ borderRadius: "var(--radius)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand)]">
          {proposal.category}
        </p>
        <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)]">
          {String((index ?? 0) + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-auto pt-10">
        <h3 className="font-display text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--ink)]">
          {proposal.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{proposal.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.06em] text-[var(--brand-dark)]">
          Conhecer a proposta{" "}
          <ArrowRight
            size={16}
            className="text-[var(--accent)] transition group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
