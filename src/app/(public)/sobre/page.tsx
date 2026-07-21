import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Photo, hasPhoto } from "@/components/photo";
import { content } from "@/config/site";

export const metadata = { title: "Quem é Luzia Mary" };

export default function AboutPage() {
  const photo = content.candidate.photos.about;
  const showPhoto = hasPhoto(photo);

  return (
    <>
      <section className="bg-[linear-gradient(160deg,#e9f7fc_0%,#fffdf9_60%)] py-14 sm:py-16">
        <Container className={`grid items-center gap-10 lg:gap-14 ${showPhoto ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
          {showPhoto && (
            <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
              <div className="absolute -inset-3 rounded-[2rem] bg-[var(--cyan)]/15" aria-hidden />
              <Photo
                src={photo}
                alt={`${content.candidate.ballotName}`}
                priority
                className="relative aspect-[4/5] rounded-[1.75rem] shadow-[var(--glow)]"
              />
            </div>
          )}
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--coral)]">Quem é Luzia</p>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold tracking-[-0.045em]">
              Luzia Mary
            </h1>
            <p className="mt-3 text-sm font-bold text-[var(--muted)]">{content.candidate.office}</p>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">{content.candidate.shortBio}</p>
            <p className="mt-4 text-sm font-extrabold text-[var(--cyan-deep)]">
              {content.candidate.city} · {content.candidate.region} · {content.candidate.state}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">Biografia</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[var(--muted)]">
            {content.candidate.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {content.candidate.motivation ? (
            <div className="mt-10 rounded-3xl bg-[var(--bg-soft)] p-6 sm:p-8">
              <h3 className="font-display text-xl font-extrabold">Por que esta candidatura</h3>
              <p className="mt-3 text-base leading-8 text-[var(--muted)]">{content.candidate.motivation}</p>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="border-y border-[var(--line)] bg-white py-14">
        <Container>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Trajetória</h2>
          <ol className="mt-8">
            {content.timeline.map((item, i) => (
              <li key={item.label} className="grid gap-3 border-b border-[var(--line)] py-7 sm:grid-cols-[72px_1fr]">
                <span className="font-display text-2xl font-extrabold text-[var(--cyan)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold">{item.label}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Valores</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.values.map((v) => (
              <div key={v.title} className="rounded-3xl border border-[var(--line)] bg-[var(--bg-soft)] p-6">
                <h3 className="font-display text-xl font-extrabold">{v.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-[var(--blue-deep)] px-8 py-10 text-white sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Participe desta construção</h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-white/60">
                Envie uma demanda ou sugestão e ajude a orientar as prioridades do território.
              </p>
            </div>
            <Link href="/demandas" className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--coral)] px-6 text-sm font-extrabold">
              Enviar demanda <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
