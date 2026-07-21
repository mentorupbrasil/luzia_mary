import { siteConfig } from "@/config/site";

export function CampaignBanner() {
  return (
    <div className="border-b border-white/10 bg-[var(--brand-dark)] px-4 py-2 text-center text-[11px] text-white/70">
      <span className="font-semibold text-white">{siteConfig.candidate.partyAcronym}</span>
      <span className="mx-2 text-white/25">·</span>
      <span>{siteConfig.candidate.office}</span>
      <span className="mx-2 hidden text-white/25 sm:inline">·</span>
      <span className="mt-0.5 block text-white/45 sm:mt-0 sm:inline">
        Conteúdo institucional de pré-candidatura
      </span>
    </div>
  );
}
