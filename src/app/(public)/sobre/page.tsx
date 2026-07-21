import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CandidatePhoto } from "@/components/candidate-photo";
import { Container } from "@/components/container";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Conheça Luzia Mary" };

export default function AboutPage() {
  return (
    <>
      <section className="overflow-hidden bg-[linear-gradient(160deg,#eef4ff_0%,#faf9f7_55%)] py-14 sm:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
            <div className="soft-blob absolute -inset-5 bg-[var(--brand)]/10 blur-2xl" aria-hidden />
            <div className="photo-frame relative overflow-hidden rounded-[2rem] border border-white bg-white p-2">
              <CandidatePhoto
                src={siteConfig.candidate.photos.about}
                alt={`${siteConfig.candidate.ballotName} — conheça a trajetória`}
                className="rounded-[1.6rem]"
                priority
              />
            </div>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Conheça</p>
            <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold tracking-[-0.045em]">
              Luzia Mary
            </h1>
            <p className="mt-3 text-sm font-semibold text-[var(--text-muted)]">
              {siteConfig.candidate.office}
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-muted)]">
              {siteConfig.candidate.shortBio}
            </p>
            <p className="mt-4 text-sm font-semibold text-[var(--brand-dark)]">
              {siteConfig.candidate.cityBase} · {siteConfig.candidate.region} · {siteConfig.candidate.state}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">Biografia</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[var(--text-muted)]">
            {siteConfig.candidate.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {siteConfig.candidate.candidacyMotivation ? (
            <div className="mt-10 rounded-3xl bg-[var(--surface-muted)] p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold">Por que esta candidatura</h3>
              <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">
                {siteConfig.candidate.candidacyMotivation}
              </p>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-white py-14 sm:py-16">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">Trajetória</h2>
          <ol className="mt-8 space-y-0">
            {siteConfig.timeline.map((item, index) => (
              <li
                key={item.label}
                className="grid gap-3 border-b border-[var(--border)] py-7 sm:grid-cols-[80px_1fr]"
              >
                <span className="font-display text-2xl font-bold text-[var(--brand)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{item.label}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">Valores</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {siteConfig.values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)]/50 p-6"
              >
                <h3 className="font-display text-xl font-bold">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{value.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-[var(--brand-dark)] px-8 py-10 text-white sm:flex-row sm:items-center sm:px-10">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                Participe desta construção
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-white/60">
                Envie uma demanda ou sugestão e ajude a orientar as prioridades do território.
              </p>
            </div>
            <Link
              href="/demandas"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-bold text-white"
            >
              Enviar demanda <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
