import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CandidatePortrait } from "@/components/candidate-portrait";
import { Container } from "@/components/container";
import { ParticipationCallout } from "@/components/participation-callout";
import { PublicPageHero } from "@/components/page-hero";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Conheça Luzia Mary" };

export default function AboutPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Conheça"
        title="Uma trajetória construída em Imperatriz. Um compromisso com o Maranhão."
        description="Experiência, presença e a decisão de representar a Região Tocantina na Câmara dos Deputados."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <CandidatePortrait tone="light" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
              A história por trás da candidatura
            </p>
            <blockquote className="display-balance mt-5 font-display text-[clamp(1.7rem,3vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
              “{siteConfig.candidate.manifesto}”
            </blockquote>
            <div className="mt-8 space-y-5 text-base leading-8 text-[var(--text-muted)]">
              {siteConfig.candidate.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-muted)]/40 py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">Linha do tempo</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.03em]">
              Caminhos que formam a candidatura
            </h2>
          </div>
          <ol className="mt-12 border-t border-[var(--border)]">
            {siteConfig.timeline.map((item, index) => (
              <li
                key={item.label}
                className="grid gap-4 border-b border-[var(--border)] py-8 sm:grid-cols-[88px_1fr]"
              >
                <span className="font-display text-3xl font-semibold text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">{item.label}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-[var(--text-muted)]">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-[var(--text-muted)]">
            {/* PLACEHOLDER: acrescente datas e marcos adicionais quando validados pela equipe */}
            Marcos adicionais podem ser incluídos após validação da equipe.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">Valores</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.03em]">
              A forma de fazer política também importa.
            </h2>
          </div>
          <div className="border-t border-[var(--border)]">
            {siteConfig.values.map((value, index) => (
              <div key={value.title} className="border-b border-[var(--border)] py-8">
                <p className="font-mono text-[11px] text-[var(--text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em]">{value.title}</h3>
                <p className="mt-3 max-w-xl text-base leading-8 text-[var(--text-muted)]">{value.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--hero)] py-20 text-white sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">Território</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.03em]">
              Imperatriz e a Região Tocantina como ponto de partida.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/55">
              A candidatura nasce do conhecimento da realidade local e do compromisso de levar essa
              vivência para a Câmara dos Deputados.
            </p>
          </div>
          <Link
            href="/demandas"
            className="inline-flex h-12 w-fit items-center gap-2 bg-[var(--accent)] px-6 text-sm font-bold text-white"
            style={{ borderRadius: "999px" }}
          >
            Participar da construção <ArrowRight size={16} aria-hidden />
          </Link>
        </Container>
      </section>

      <ParticipationCallout />
    </>
  );
}
