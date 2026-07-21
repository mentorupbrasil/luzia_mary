import Link from "next/link";
import { content } from "@/config/site";

export function SiteLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex flex-col leading-none" aria-label={`${content.candidate.ballotName} — início`}>
      <span className={`font-display text-[1.4rem] font-extrabold tracking-[-0.045em] sm:text-[1.55rem] ${light ? "text-white" : "text-[var(--ink)]"}`}>
        Luzia <span className={light ? "text-white/85" : "text-[var(--cyan)]"}>Mary</span>
      </span>
      <span className={`mt-1 text-[10px] font-bold uppercase tracking-[0.14em] ${light ? "text-white/45" : "text-[var(--muted)]"}`}>
        {content.candidate.city} · {content.candidate.state}
      </span>
    </Link>
  );
}
