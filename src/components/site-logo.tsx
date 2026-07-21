import Link from "next/link";
import { content } from "@/config/site";

export function SiteLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex flex-col leading-none" aria-label={`${content.candidate.ballotName} — início`}>
      <span className={`font-display text-[1.25rem] font-extrabold tracking-[-0.04em] sm:text-[1.4rem] ${light ? "text-white" : "text-[var(--ink)]"}`}>
        Luzia Mary
      </span>
      <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${light ? "text-white/50" : "text-[var(--muted)]"}`}>
        {content.candidate.city} · {content.candidate.state}
      </span>
    </Link>
  );
}
