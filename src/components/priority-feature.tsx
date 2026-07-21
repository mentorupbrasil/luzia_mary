import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Priority = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
};

export function PriorityFeature({
  proposal,
  index,
}: {
  proposal: Priority;
  index: number;
}) {
  const reverse = index % 2 === 1;

  return (
    <article
      className={cn(
        "grid gap-8 border-t border-[var(--border)] py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14",
        reverse && "lg:[&>*:first-child]:order-2",
      )}
    >
      <div>
        <div className="flex items-center gap-4">
          <span className="font-display text-4xl font-semibold text-[var(--accent)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand)]">
            {proposal.category}
          </span>
        </div>
        <h3 className="mt-5 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--ink)]">
          {proposal.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-muted)]">{proposal.summary}</p>
        <Link
          href={`/propostas/${proposal.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]"
        >
          Conhecer prioridade <ArrowUpRight size={16} aria-hidden />
        </Link>
      </div>

      <div
        className="relative min-h-[220px] overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-8"
        style={{ borderRadius: "var(--radius)" }}
      >
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              index % 4 === 0
                ? "linear-gradient(145deg, var(--brand-soft), transparent 55%)"
                : index % 4 === 1
                  ? "linear-gradient(145deg, var(--accent-soft), transparent 55%)"
                  : index % 4 === 2
                    ? "linear-gradient(145deg, #dfe8f6, transparent 55%)"
                    : "linear-gradient(145deg, #f0e6df, transparent 55%)",
          }}
          aria-hidden
        />
        <div className="relative flex h-full min-h-[180px] flex-col justify-between">
          <p className="max-w-[14ch] font-display text-2xl font-semibold leading-snug tracking-[-0.025em] text-[var(--ink)]">
            {proposal.category}
          </p>
          <p className="text-sm leading-7 text-[var(--text-muted)]">
            Atuação compatível com o mandato federal, com acompanhamento público.
          </p>
        </div>
      </div>
    </article>
  );
}
