import { siteConfig } from "@/config/site";

export function CampaignBanner() {
  return (
    <div className="border-b border-black/[.06] bg-[#0c2e24] px-4 py-2.5 text-center text-[11px] font-medium leading-relaxed tracking-wide text-white/75 sm:text-xs">
      <span className="text-[var(--accent)]">{siteConfig.candidate.partyAcronym}</span>
      <span className="mx-1.5 text-white/30">·</span>
      {siteConfig.candidate.office}
      <span className="mx-1.5 hidden text-white/30 sm:inline">·</span>
      <span className="mt-0.5 block text-white/50 sm:mt-0 sm:inline">
        Pré-candidatura · conteúdo institucional
      </span>
    </div>
  );
}
