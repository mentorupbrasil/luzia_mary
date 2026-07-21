import { siteConfig } from "@/config/site";

export function CampaignBanner() {
  return (
    <div className="border-b border-white/10 bg-[var(--hero)] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[.18em] text-white/62 sm:text-[11px]">
      <span className="text-white">{siteConfig.candidate.partyAcronym}</span>
      <span className="mx-2 text-white/25">/</span>
      {siteConfig.candidate.office}
      <span className="mx-2 hidden text-white/25 sm:inline">/</span>
      <span className="mt-1 block normal-case tracking-normal text-white/40 sm:mt-0 sm:inline">
        Conteúdo institucional de pré-candidatura
      </span>
    </div>
  );
}
