import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteLogo({ compact = false, onDark = false }: { compact?: boolean; onDark?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${siteConfig.candidate.ballotName} — página inicial`}>
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand)] text-sm font-black tracking-wide text-white shadow-lg transition group-hover:-rotate-2">
        {siteConfig.candidate.initials}
      </span>
      {!compact && (
        <span className="leading-tight">
          <strong className={cn("block font-display text-base font-semibold tracking-tight", onDark ? "text-white" : "text-[var(--ink)]")}>
            {siteConfig.candidate.ballotName}
          </strong>
          <span className={cn("text-xs font-medium", onDark ? "text-white/55" : "text-black/50")}>
            {siteConfig.candidate.office}
          </span>
        </span>
      )}
    </Link>
  );
}
