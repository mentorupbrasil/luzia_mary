import { siteConfig } from "@/config/site";

type CandidateVisualProps = {
  className?: string;
  compact?: boolean;
};

export function CandidateVisual({ className = "", compact = false }: CandidateVisualProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Ambient orbs */}
      <div
        className="animate-glow pointer-events-none absolute -right-10 top-8 h-40 w-40 rounded-full bg-[var(--accent)]/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-8 bottom-16 h-36 w-36 rounded-full bg-[var(--hero-glow)]/40 blur-3xl"
        aria-hidden
      />

      <div
        className={`animate-float relative overflow-hidden border border-white/15 bg-[var(--hero-mid)] shadow-[0_40px_100px_rgba(0,0,0,.4)] ${
          compact ? "aspect-[4/5] rounded-[32px]" : "aspect-[4/5] rounded-[28px] sm:rounded-[36px]"
        }`}
      >
        {/* Portrait plane — ready for photo swap */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(160deg, rgba(212,168,75,.15) 0%, transparent 35%),
              linear-gradient(200deg, #0c2a1f 0%, #0f6b4f 42%, #06150f 100%)
            `,
          }}
          aria-hidden
        />

        {/* Soft silhouette suggestion */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[78%] w-full opacity-90"
          viewBox="0 0 480 520"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="portraitFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(238,243,239,0.18)" />
              <stop offset="100%" stopColor="rgba(238,243,239,0.04)" />
            </linearGradient>
          </defs>
          <ellipse cx="240" cy="175" rx="88" ry="108" fill="url(#portraitFade)" />
          <path
            d="M95 520C110 360 165 290 240 290C315 290 370 360 385 520H95Z"
            fill="url(#portraitFade)"
          />
          <circle cx="240" cy="175" r="96" stroke="rgba(212,168,75,.35)" strokeWidth="1.5" fill="none" />
        </svg>

        <div className="paper-noise absolute inset-0 opacity-60" aria-hidden />
        <div className="editorial-grid absolute inset-0 opacity-50" aria-hidden />

        {/* Top badge */}
        <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-xs font-black tracking-[.14em] text-white backdrop-blur-md">
            {siteConfig.candidate.initials}
          </span>
          <span className="hidden rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-white/70 backdrop-blur-md sm:inline">
            {siteConfig.candidate.partyAcronym}
          </span>
        </div>

        {/* Bottom identity */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--hero)] via-[var(--hero)]/80 to-transparent px-6 pb-7 pt-28 sm:px-8 sm:pb-9">
          <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--accent)]">
            {siteConfig.candidate.cityBase} · {siteConfig.candidate.state}
          </p>
          <p className="mt-2 font-display text-3xl font-medium tracking-[-.03em] text-white sm:text-4xl">
            {siteConfig.candidate.ballotName}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/55">
            {siteConfig.candidate.office}
          </p>
        </div>
      </div>

      {!compact && (
        <p className="mt-5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[.22em] text-white/35 lg:justify-start">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/25" />
          Escuta · trabalho · resultado
        </p>
      )}
    </div>
  );
}
