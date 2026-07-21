import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IconBox } from "./icon-box";

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
      className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-white/90 p-7 shadow-[0_4px_24px_rgba(11,28,21,.03)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--brand)]/25 hover:shadow-[0_28px_70px_rgba(15,107,79,.12)]"
    >
      <div className="flex items-start justify-between gap-4">
        <IconBox name={proposal.icon} />
        <span className="font-mono text-[10px] font-semibold text-black/22">
          {String((index ?? 0) + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-auto pt-10">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--brand)]">{proposal.category}</p>
        <h3 className="mt-3 font-display text-[1.65rem] font-medium leading-[1.08] tracking-[-.03em] text-[var(--ink)] sm:text-3xl">
          {proposal.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{proposal.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]">
          Conhecer proposta{" "}
          <ArrowUpRight
            size={16}
            className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
      <div
        className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-[var(--brand-soft)] opacity-0 transition duration-500 group-hover:opacity-80"
        aria-hidden
      />
    </Link>
  );
}
