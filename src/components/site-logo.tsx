import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteLogo({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="group inline-flex items-center gap-3" aria-label="Página inicial">
    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand)] text-sm font-black tracking-wide text-white shadow-lg transition group-hover:-rotate-2">{siteConfig.candidate.initials}</span>
    {!compact && <span className="leading-tight"><strong className="block text-sm font-extrabold text-[var(--ink)]">{siteConfig.candidate.ballotName}</strong><span className="text-xs font-medium text-black/50">{siteConfig.candidate.office}</span></span>}
  </Link>;
}
