import Link from "next/link";
import { content } from "@/config/site";
import { BrandLogo } from "./brand-logo";

export function SiteLogo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex flex-col leading-none"
      aria-label={`${content.candidate.ballotName} — início`}
    >
      <BrandLogo size="md" decorative />
      <span
        className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
          light ? "text-white/50" : "text-[var(--muted)]"
        }`}
      >
        {content.candidate.city} · {content.candidate.state}
      </span>
    </Link>
  );
}
