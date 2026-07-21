import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IconBox } from "./icon-box";

export function ProposalCard({ proposal, index }: { proposal: { slug: string; title: string; summary: string; category: string; icon?: string | null }; index?: number }) {
  return (
    <Link href={`/propostas/${proposal.slug}`} className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-[30px] border border-black/[.08] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--brand)]/22 hover:shadow-[0_30px_80px_rgba(10,52,126,.12)]">
      <div className="flex items-start justify-between gap-4">
        <IconBox name={proposal.icon} />
        <span className="font-mono text-[10px] font-semibold text-black/28">{String((index ?? 0) + 1).padStart(2, "0")}</span>
      </div>
      <div className="mt-auto pt-10">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--brand)]">{proposal.category}</p>
        <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.04] tracking-[-.04em] text-[var(--ink)]">{proposal.title}</h3>
        <p className="mt-4 text-sm leading-7 text-black/55">{proposal.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]">
          Conhecer proposta <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
      <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-[var(--brand-soft)] opacity-0 transition duration-500 group-hover:opacity-70" aria-hidden />
    </Link>
  );
}
