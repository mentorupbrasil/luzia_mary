import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex flex-col leading-none"
      aria-label={`${siteConfig.candidate.ballotName} — página inicial`}
    >
      <span
        className={cn(
          "font-display text-[1.35rem] font-bold tracking-[-0.04em] sm:text-[1.45rem]",
          inverted ? "text-white" : "text-[var(--ink)]",
        )}
      >
        Luzia <span className={inverted ? "text-white/80" : "text-[var(--brand)]"}>Mary</span>
      </span>
      <span
        className={cn(
          "mt-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
          inverted ? "text-white/45" : "text-[var(--text-muted)]",
        )}
      >
        {siteConfig.candidate.partyAcronym} · {siteConfig.candidate.state}
      </span>
    </Link>
  );
}
