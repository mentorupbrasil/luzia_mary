import { siteConfig } from "@/config/site";

export function CandidateVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
      <div className="absolute -left-8 top-12 hidden h-32 w-32 rounded-full border border-white/15 lg:block" aria-hidden />
      <div className="absolute -right-7 bottom-20 h-24 w-24 rounded-full bg-[var(--accent)]/90 blur-[1px]" aria-hidden />
      <div className="animate-drift relative aspect-[4/5] overflow-hidden rounded-[42%_42%_12%_12%/28%_28%_12%_12%] border border-white/15 bg-[linear-gradient(155deg,#1d65dd_0%,#0d397d_48%,#071a33_100%)] shadow-[0_40px_100px_rgba(0,0,0,.35)]">
        <div className="editorial-grid absolute inset-0 opacity-70" aria-hidden />
        <svg className="absolute inset-x-0 bottom-0 h-[84%] w-full" viewBox="0 0 480 560" fill="none" aria-hidden>
          <path d="M83 559C91 421 147 343 240 343C333 343 389 421 397 559H83Z" fill="rgba(245,241,233,.12)"/>
          <ellipse cx="240" cy="208" rx="102" ry="126" fill="rgba(245,241,233,.1)"/>
          <path d="M140 216C140 96 192 38 242 38C325 38 349 119 339 225C322 167 279 126 220 121C187 118 160 151 140 216Z" fill="rgba(7,26,51,.84)"/>
          <path d="M131 188C145 84 197 33 248 37C296 40 336 94 346 182C319 129 278 98 228 100C188 102 158 132 131 188Z" stroke="rgba(241,93,67,.75)" strokeWidth="4"/>
        </svg>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--hero)] via-[var(--hero)]/30 to-transparent px-8 pb-9 pt-28 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/52">Imperatriz · Maranhão</p>
          <p className="mt-3 font-display text-4xl font-semibold tracking-[-.04em]">{siteConfig.candidate.ballotName}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/62">{siteConfig.candidate.office}</p>
        </div>
        <div className="absolute right-7 top-7 grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-white/10 text-sm font-black tracking-[.14em] text-white backdrop-blur">
          {siteConfig.candidate.initials}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/38 lg:justify-start">
        <span className="h-px w-8 bg-white/20" /> Liderança · presença · trabalho
      </div>
    </div>
  );
}
