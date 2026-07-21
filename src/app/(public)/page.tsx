import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CandidatePortrait } from "@/components/candidate-portrait";
import { CommitmentHighlight } from "@/components/commitment-highlight";
import { Container } from "@/components/container";
import { DigitalOfficeSection } from "@/components/digital-office-section";
import { FeaturedNews } from "@/components/featured-news";
import { HeroCandidate } from "@/components/hero-candidate";
import { ParticipationCallout } from "@/components/participation-callout";
import { PriorityFeature } from "@/components/priority-feature";
import { TerritorySection } from "@/components/territory-section";
import { siteConfig } from "@/config/site";
import { getCommitments, getEvents, getPosts, getProposals } from "@/lib/data";

export default async function HomePage() {
  const [proposals, commitments, posts, events] = await Promise.all([
    getProposals(),
    getCommitments(),
    getPosts(),
    getEvents(),
  ]);

  const featuredPriorities = proposals.slice(0, 4);
  const nextEvent = events[0] ?? null;

  return (
    <>
      <HeroCandidate />

      {/* Manifesto curto — sem cards */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <Container className="py-16 sm:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">Manifesto</p>
          <blockquote className="display-balance mt-6 max-w-4xl font-display text-[clamp(1.8rem,3.8vw,3rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[var(--ink)]">
            “{siteConfig.candidate.manifesto}”
          </blockquote>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
            Representação com proximidade: escutar o território, organizar prioridades e prestar
            contas do caminho percorrido.
          </p>
        </Container>
      </section>

      {/* Quem é Luzia Mary */}
      <section className="py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <CandidatePortrait tone="light" caption={false} />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
              Quem é Luzia Mary
            </p>
            <h2 className="display-balance mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Autoridade construída em Imperatriz. Compromisso com o Maranhão.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--text-muted)]">
              {siteConfig.candidate.bio.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link
              href="/sobre"
              className="mt-8 inline-flex h-12 items-center gap-2 bg-[var(--brand-dark)] px-6 text-sm font-bold text-white transition hover:bg-[var(--brand)]"
              style={{ borderRadius: "999px" }}
            >
              Conhecer a trajetória <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <TerritorySection />

      {/* Prioridades — composição editorial */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
                Prioridades
              </p>
              <h2 className="display-balance mt-4 font-display text-[clamp(2rem,4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                O mandato começa pelas necessidades de quem vive o Maranhão real.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                Menos promessa genérica. Cada prioridade apresenta um problema concreto e um caminho
                possível de atuação federal.
              </p>
            </div>
            <Link
              href="/propostas"
              className="inline-flex items-center gap-2 border-b border-[var(--brand)] pb-1 text-sm font-bold text-[var(--brand-dark)]"
            >
              Ver todas as prioridades <ArrowUpRight size={16} aria-hidden />
            </Link>
          </div>

          <div className="mt-4">
            {featuredPriorities.map((proposal, index) => (
              <PriorityFeature key={proposal.id} proposal={proposal} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <DigitalOfficeSection />
      <CommitmentHighlight commitments={commitments} />
      <FeaturedNews posts={posts} nextEvent={nextEvent} />
      <ParticipationCallout />
    </>
  );
}
