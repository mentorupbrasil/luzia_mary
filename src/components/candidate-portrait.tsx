import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type CandidatePortraitProps = {
  className?: string;
  tone?: "dark" | "light";
  caption?: boolean;
};

/**
 * Espaço preparado para o retrato oficial.
 * Arquivo esperado: public/images/luzia-mary-retrato.jpg
 * Enquanto a foto não existir, exibe um placeholder editorial (sem simular rosto).
 */
export function CandidatePortrait({ className, tone = "dark", caption = true }: CandidatePortraitProps) {
  const dark = tone === "dark";

  return (
    <figure className={cn("relative mx-auto w-full max-w-[520px]", className)}>
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden border",
          dark ? "border-white/15 bg-[linear-gradient(160deg,#12305a_0%,#071833_58%,#051225_100%)]" : "border-[var(--border)] bg-[var(--surface-muted)]",
        )}
        style={{ borderRadius: "calc(var(--radius) + 4px)" }}
      >
        {/*
          Quando a fotografia oficial estiver disponível, troque o bloco abaixo por:
          <Image src={siteConfig.candidate.portraitPath} alt={siteConfig.candidate.portraitAlt} fill className="object-cover object-top" priority />
        */}
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-x-8 top-10 h-px bg-current opacity-15" />
          <div className="absolute inset-y-10 left-8 w-px bg-current opacity-15" />
          <div
            className={cn(
              "absolute bottom-0 left-1/2 h-[58%] w-[68%] -translate-x-1/2 opacity-30",
              dark ? "bg-white" : "bg-[var(--brand-dark)]",
            )}
            style={{
              clipPath: "polygon(18% 100%, 82% 100%, 92% 42%, 72% 18%, 50% 10%, 28% 18%, 8% 42%)",
            }}
          />
        </div>

        <div className={cn("absolute inset-x-0 bottom-0 p-7", dark ? "text-white" : "text-[var(--ink)]")}>
          <p className={cn("text-[10px] font-bold uppercase tracking-[0.22em]", dark ? "text-white/50" : "text-[var(--text-muted)]")}>
            {siteConfig.candidate.cityBase} · {siteConfig.candidate.state}
          </p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {siteConfig.candidate.ballotName}
          </p>
          <p className={cn("mt-2 max-w-xs text-sm leading-6", dark ? "text-white/55" : "text-[var(--text-muted)]")}>
            {siteConfig.candidate.office}
          </p>
          <p className={cn("mt-5 text-[11px] leading-5", dark ? "text-white/35" : "text-[var(--text-muted)]")}>
            Espaço reservado para fotografia oficial
            <br />
            <code className="text-[10px]">public/images/luzia-mary-retrato.jpg</code>
          </p>
        </div>
      </div>

      {caption && (
        <figcaption className={cn("mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em]", dark ? "text-white/40" : "text-[var(--text-muted)]")}>
          Imperatriz · Região Tocantina · Maranhão
        </figcaption>
      )}
    </figure>
  );
}

/** Alias legado usado em páginas existentes */
export function CandidateVisual() {
  return <CandidatePortrait />;
}
