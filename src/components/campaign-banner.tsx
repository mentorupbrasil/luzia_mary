import { siteConfig } from "@/config/site";

export function CampaignBanner() {
  return (
    <div
      className="border-b border-white/10 bg-[var(--hero)] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[.16em] text-white/55 sm:text-[11px]"
      style={{ ["--banner-h" as string]: "40px" }}
    >
      <span className="text-[var(--accent)]">{siteConfig.candidate.partyAcronym}</span>
      <span className="mx-2 text-white/20">·</span>
      {siteConfig.candidate.office}
      <span className="mx-2 hidden text-white/20 sm:inline">·</span>
      <span className="mt-1 block normal-case tracking-normal text-white/35 sm:mt-0 sm:inline">
        Conteúdo institucional de pré-candidatura
      </span>
    </div>
  );
}
