import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteLogo({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3.5"
      aria-label={`${siteConfig.candidate.ballotName} — página inicial`}
    >
      <span
        className={cn(
          "relative grid h-10 w-10 place-items-center overflow-hidden text-[11px] font-bold tracking-[0.14em] text-white",
          inverted ? "bg-[var(--accent)]" : "bg-[var(--brand-dark)]",
        )}
        style={{ borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%" }}
        aria-hidden
      >
        <span className="absolute inset-[3px] border border-white/25" style={{ borderRadius: "inherit" }} />
        <span className="relative">{siteConfig.candidate.initials}</span>
      </span>

      {!compact && (
        <span className="leading-none">
          <strong
            className={cn(
              "block font-display text-[1.35rem] font-semibold tracking-[-0.03em]",
              inverted ? "text-white" : "text-[var(--ink)]",
            )}
          >
            {siteConfig.candidate.ballotName}
          </strong>
          <span
            className={cn(
              "mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em]",
              inverted ? "text-white/45" : "text-[var(--text-muted)]",
            )}
          >
            {siteConfig.candidate.partyAcronym} · Maranhão
          </span>
        </span>
      )}
    </Link>
  );
}
