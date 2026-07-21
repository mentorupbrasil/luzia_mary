import Link from "next/link";
import { ArrowRight, Eye, Handshake, ShieldCheck } from "lucide-react";
import { CandidateVisual } from "@/components/candidate-visual";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Conheça Luzia Mary" };

const principles = [
  {
    icon: Eye,
    title: "Clareza",
    text: "Explicar posições, prioridades, decisões e resultados sem esconder a política atrás de linguagem complicada.",
  },
  {
    icon: Handshake,
    title: "Presença",
    text: "Manter diálogo permanente com municípios, lideranças, categorias profissionais e comunidades.",
  },
  {
    icon: ShieldCheck,
    title: "Responsabilidade",
    text: "Tratar informação, recursos públicos, dados pessoais e compromissos com seriedade.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Conheça Luzia Mary"
        title="Uma trajetória construída em Imperatriz. Um compromisso com todo o Maranhão."
        description="Experiência, presença e a decisão de representar a Região Tocantina na Câmara dos Deputados."
      />

      <section className="relative overflow-hidden bg-[var(--hero)] pb-24 text-white">
        <div className="aurora absolute inset-0 opacity-50" aria-hidden />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[.82fr_1.18fr]">
          <CandidateVisual />
          <div className="lg:pl-6">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--accent)]">
              A história por trás da candidatura
            </p>
            <blockquote className="display-balance mt-5 font-display text-3xl font-medium leading-[1.08] tracking-[-.03em] sm:text-4xl lg:text-5xl">
              “{siteConfig.candidate.manifesto}”
            </blockquote>
            <div className="mt-9 space-y-5 text-base leading-8 text-white/55">
              {siteConfig.candidate.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white/70">
                {siteConfig.candidate.party}
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white/70">
                Número: {siteConfig.candidate.number}
              </span>
            </div>
            <Link
              href="/demandas"
              className="mt-9 inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-bold text-[var(--hero)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]"
            >
              Converse com a equipe <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--brand)]">Princípios</p>
              <h2 className="display-balance mt-5 font-display text-4xl font-medium leading-[1.05] tracking-[-.035em] sm:text-5xl">
                A forma de fazer política também importa.
              </h2>
            </div>
            <div className="border-t border-[var(--line)]">
              {principles.map((principle, index) => (
                <div
                  key={principle.title}
                  className="grid gap-5 border-b border-[var(--line)] py-8 sm:grid-cols-[56px_1fr]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]">
                    <principle.icon size={21} strokeWidth={1.6} aria-hidden />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-black/25">0{index + 1}</p>
                    <h3 className="mt-2 font-display text-2xl font-medium tracking-[-.03em] sm:text-3xl">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{principle.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
