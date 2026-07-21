import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CandidatePortrait } from "@/components/candidate-portrait";
import { Container } from "@/components/container";
import { siteConfig } from "@/config/site";

export function HeroCandidate() {
  return (
    <section className="relative overflow-hidden bg-[var(--hero)] text-white">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-[var(--hero-soft)]/70 to-transparent lg:block" aria-hidden />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full border border-white/8" aria-hidden />

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div>
          <p className="animate-rise inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
            {siteConfig.candidate.cityBase} · {siteConfig.candidate.region} · {siteConfig.candidate.state}
          </p>

          <p className="animate-rise animate-rise-delay-1 mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            {siteConfig.candidate.office}
          </p>

          <h1 className="animate-rise animate-rise-delay-1 mt-4 font-display text-[clamp(3.4rem,9vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            Luzia <span className="text-[var(--accent)]">Mary</span>
          </h1>

          <p className="animate-rise animate-rise-delay-2 mt-7 max-w-xl text-xl font-medium leading-snug text-white/90 sm:text-2xl">
            {siteConfig.candidate.slogan}
          </p>
          <p className="animate-rise animate-rise-delay-2 copy-balance mt-5 max-w-lg text-base leading-8 text-white/55">
            {siteConfig.candidate.shortBio}
          </p>

          <div className="animate-rise animate-rise-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sobre"
              className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--accent)] px-7 text-sm font-bold text-white transition hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
              style={{ borderRadius: "999px" }}
            >
              Conheça Luzia Mary <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href="/demandas"
              className="inline-flex h-12 items-center justify-center border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5"
              style={{ borderRadius: "999px" }}
            >
              Envie sua demanda
            </Link>
          </div>
        </div>

        <div className="animate-fade">
          <CandidatePortrait />
        </div>
      </Container>
    </section>
  );
}
