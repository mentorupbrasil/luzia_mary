import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteLogo({ compact = false, inverted = false }: { compact?: boolean; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label={`${siteConfig.candidate.ballotName} — página inicial`}
    >
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-[var(--brand)] text-xs font-black tracking-[.12em] text-white shadow-[0_12px_28px_rgba(15,107,79,.28)] transition group-hover:-rotate-3">
        <span className="absolute inset-[3px] rounded-[13px] border border-white/25" aria-hidden />
        <span className="relative">{siteConfig.candidate.initials}</span>
      </span>
      {!compact && (
        <span className="leading-none">
          <strong
            className={cn(
              "block font-display text-xl font-medium tracking-[-.03em]",
              inverted ? "text-white" : "text-[var(--ink)]",
            )}
          >
            {siteConfig.candidate.ballotName}
          </strong>
          <span
            className={cn(
              "mt-1.5 block text-[10px] font-bold uppercase tracking-[.16em]",
              inverted ? "text-white/45" : "text-black/40",
            )}
          >
            {siteConfig.candidate.office}
          </span>
        </span>
      )}
    </Link>
  );
}
