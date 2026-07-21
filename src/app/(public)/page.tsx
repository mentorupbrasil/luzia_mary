import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { Photo, hasPhoto } from "@/components/photo";
import { content } from "@/config/site";
import { getPosts, getProposals } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

const priorityAccent = ["#5ed6f3", "#ff8f70", "#9fdcf0", "#f4c4b5"] as const;

const heroPrinciples = [
  {
    n: "01",
    title: "Escuta que vira prioridade",
    text: "As necessidades da região precisam orientar o trabalho político.",
  },
  {
    n: "02",
    title: "Presença no território",
    text: "Imperatriz e a Região Tocantina no centro das decisões.",
  },
  {
    n: "03",
    title: "Informação aberta",
    text: "Compromissos explicados com clareza e acompanhamento público.",
  },
] as const;

const listeningSteps = [
  {
    n: "01",
    title: "Você conta",
    text: "Descreva a necessidade do seu município, bairro ou comunidade.",
  },
  {
    n: "02",
    title: "A equipe organiza",
    text: "A demanda recebe protocolo e é classificada por tema e localidade.",
  },
  {
    n: "03",
    title: "A prioridade é analisada",
    text: "O registro ajuda a orientar propostas, articulações e posicionamentos.",
  },
  {
    n: "04",
    title: "Você acompanha",
    text: "O protocolo mantém a contribuição identificada para retorno da equipe.",
  },
] as const;

export default async function HomePage() {
  const [proposals, posts] = await Promise.all([getProposals(), getPosts()]);
  const priorities = proposals.slice(0, 4);
  const [featured, ...rest] = posts;
  const secondary = rest.slice(0, 2);

  const heroSrc = content.candidate.photos.hero;
  const aboutSrc = content.candidate.photos.about;
  const participateSrc = content.candidate.photos.participate;
  const showHeroPhoto = hasPhoto(heroSrc);
  const showAboutPhoto = hasPhoto(aboutSrc);
  const showParticipatePhoto = hasPhoto(participateSrc);
  const achievements = content.achievements;
  const values = content.values.slice(0, 3);
  const hasSocial =
    Boolean(content.social.instagram) ||
    Boolean(content.social.facebook) ||
    Boolean(content.social.youtube) ||
    Boolean(content.contact.whatsapp);

  return (
    <>
      <section className="home-hero relative isolate overflow-hidden text-white">
        <div className="home-hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="home-hero-glow home-hero-glow-left" aria-hidden />
        <div className="home-hero-glow home-hero-glow-right" aria-hidden />

        <Container className="relative grid min-h-[min(900px,100svh)] gap-10 pb-10 pt-[108px] lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-0 lg:pb-0">
          <div className="relative z-20 pb-4 lg:pb-24">
            <p className="anim-rise inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              <MapPin size={13} className="text-[var(--sky)]" aria-hidden />
              {content.candidate.city} · {content.candidate.region} · {content.candidate.state}
            </p>

            <p className="anim-rise anim-d1 mt-8 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--sky)]">
              {content.candidate.office}
            </p>

            <h1 className="home-hero-name anim-rise anim-d1 mt-4">
              Luzia
              <span>Mary</span>
            </h1>

            <p className="anim-rise anim-d2 mt-7 max-w-xl font-display text-[clamp(1.45rem,2.6vw,2.25rem)] font-bold leading-[1.08] tracking-[-0.035em] text-white">
              {content.candidate.slogan}
            </p>
            <p className="anim-rise anim-d2 mt-5 max-w-lg text-base leading-8 text-white/65">
              {content.candidate.homeLead}
            </p>

            <div className="anim-rise anim-d3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/demandas"
                className="inline-flex h-13 items-center justify-center gap-2 bg-[var(--sky)] px-7 text-sm font-extrabold text-[var(--navy)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Envie sua demanda <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/sobre"
                className="inline-flex h-13 items-center justify-center gap-2 border border-white/25 px-7 text-sm font-bold text-white transition hover:border-white/55 hover:bg-white/5"
              >
                Conheça a trajetória
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex min-h-[510px] items-end justify-center lg:min-h-[calc(100svh-108px)] lg:justify-end">
            <p className="home-hero-monogram" aria-hidden>
              LM
            </p>
            <div className="home-portrait-halo" aria-hidden />
            {showHeroPhoto ? (
              <Photo
                src={heroSrc}
                alt={`${content.candidate.ballotName}, ${content.candidate.office}`}
                priority
                className="anim-rise anim-d1 relative z-10 aspect-[3/4] w-full max-w-[540px] lg:max-w-[650px]"
                imgClassName="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.42)]"
                objectPosition="center bottom"
              />
            ) : (
              <div className="relative z-10 h-[62vh] w-full max-w-[560px]" aria-hidden />
            )}
            <div className="home-photo-caption absolute bottom-6 right-0 z-20 hidden lg:block">
              <span>De Imperatriz</span>
              <strong>para o Maranhão</strong>
            </div>
          </div>
        </Container>

        <div className="home-principles relative z-30">
          <Container>
            <ul className="grid lg:grid-cols-3">
              {heroPrinciples.map((item) => (
                <li key={item.n} className="home-principle-item">
                  <span>{item.n}</span>
                  <div>
                    <p>{item.title}</p>
                    <small>{item.text}</small>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      <section className="overflow-hidden bg-[var(--bg)] py-20 sm:py-24 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {showAboutPhoto && (
            <div className="home-about-photo relative mx-auto w-full max-w-[520px] lg:mx-0">
              <div className="absolute -left-5 -top-5 h-28 w-28 border-l-2 border-t-2 border-[var(--coral)]" aria-hidden />
              <Photo
                src={aboutSrc}
                alt={`${content.candidate.ballotName} em Imperatriz`}
                className="aspect-[4/5] w-full bg-[var(--navy)]"
                imgClassName="object-contain object-bottom"
                objectPosition="center bottom"
              />
              <div className="absolute -bottom-6 -right-4 max-w-[230px] bg-[var(--sky)] p-5 text-[var(--navy)] sm:-right-8">
                <p className="font-display text-xl font-extrabold leading-tight tracking-[-0.03em]">
                  Política com os pés no território.
                </p>
              </div>
            </div>
          )}

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--coral)]">
              Quem é Luzia Mary
            </p>
            <h2 className="section-title mt-4 max-w-2xl">
              Uma trajetória construída perto de quem precisa que o poder público funcione.
            </h2>
            <div className="mt-7 max-w-2xl space-y-4 text-base leading-8 text-[var(--muted)]">
              {content.candidate.bio.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-9 grid gap-4 sm:grid-cols-3">
              {values.map((item) => (
                <li key={item.title} className="border-t-2 border-[var(--navy)] pt-4">
                  <p className="font-display text-lg font-extrabold tracking-[-0.03em] text-[var(--navy)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                </li>
              ))}
            </ul>

            <Link
              href="/sobre"
              className="mt-9 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--navy)] underline decoration-[var(--coral)] decoration-2 underline-offset-8 transition hover:text-[var(--coral)]"
            >
              Conheça a história completa <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[var(--navy)] py-20 text-white sm:py-24 lg:py-28">
        <div className="home-section-orbit" aria-hidden />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--sky)]">
                Bandeiras
              </p>
              <h2 className="section-title mt-4 max-w-xl text-white">
                Prioridades para o Maranhão que começa na Região Tocantina.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-white/60 lg:justify-self-end">
              Cada bandeira parte de um problema concreto e apresenta um caminho de atuação federal,
              sem esconder a proposta atrás de discurso genérico.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {priorities.map((item, index) => (
              <article key={item.id} className="home-priority-card group">
                <span className="home-priority-number" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <p
                    className="text-[11px] font-extrabold uppercase tracking-[0.18em]"
                    style={{ color: priorityAccent[index % priorityAccent.length] }}
                  >
                    {item.category}
                  </p>
                  <h3 className="mt-5 max-w-md font-display text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.06] tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/60">{item.summary}</p>
                  <Link
                    href={`/propostas/${item.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-white transition group-hover:text-[var(--sky)]"
                  >
                    Ver proposta <ArrowRight size={15} aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <Link
            href="/propostas"
            className="mt-9 inline-flex items-center gap-2 text-sm font-extrabold text-white underline decoration-[var(--coral)] decoration-2 underline-offset-8"
          >
            Ver todas as bandeiras <ArrowRight size={15} aria-hidden />
          </Link>
        </Container>
      </section>

      <section className="bg-[var(--surface)] py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--coral)]">
              Gabinete digital
            </p>
            <h2 className="section-title mt-4 max-w-xl">
              Seu problema não deve cair em uma fila invisível.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[var(--muted)]">
              O canal de participação organiza contribuições por tema e localidade, gera protocolo e
              ajuda a transformar escuta em prioridade de trabalho.
            </p>
            <Link
              href="/demandas"
              className="mt-8 inline-flex h-13 items-center justify-center gap-2 bg-[var(--coral)] px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:brightness-95"
            >
              Enviar uma demanda <ArrowRight size={16} aria-hidden />
            </Link>
          </div>

          <ol className="border-t border-[var(--line)]">
            {listeningSteps.map((step) => (
              <li key={step.n} className="home-listening-step">
                <span>{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <Check size={20} className="hidden text-[var(--coral)] sm:block" aria-hidden />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {achievements.length > 0 && (
        <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-20 sm:py-24">
          <Container>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--coral)]">
              Trajetória pública
            </p>
            <h2 className="section-title mt-4">Resultados que podem ser conferidos.</h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((item) => (
                <li key={item.label} className="border-t-2 border-[var(--navy)] pt-5">
                  <p className="font-display text-4xl font-extrabold tracking-[-0.05em] text-[var(--navy)]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-extrabold text-[var(--ink)]">{item.label}</p>
                  {item.detail && <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {posts.length > 0 && (
        <section className="border-t border-[var(--line)] bg-[var(--bg)] py-20 sm:py-24 lg:py-28">
          <Container>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--coral)]">
                  Notícias
                </p>
                <h2 className="section-title mt-4">Acompanhe a pré-candidatura.</h2>
              </div>
              <Link
                href="/noticias"
                className="text-sm font-extrabold text-[var(--navy)] underline decoration-2 underline-offset-8"
              >
                Ver todas as notícias
              </Link>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
              {featured && (
                <article className="border-t-2 border-[var(--navy)] pt-6">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {featured.publishedAt ? formatShortDate(featured.publishedAt) : featured.category}
                  </p>
                  <h3 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.3rem)] font-extrabold leading-[1.04] tracking-[-0.045em]">
                    <Link href={`/noticias/${featured.slug}`} className="transition hover:text-[var(--coral)]">
                      {featured.title}
                    </Link>
                  </h3>
                  {featured.excerpt && (
                    <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">{featured.excerpt}</p>
                  )}
                  <Link
                    href={`/noticias/${featured.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--navy)]"
                  >
                    Ler matéria <ArrowRight size={15} aria-hidden />
                  </Link>
                </article>
              )}

              {secondary.length > 0 && (
                <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)] lg:border-y-0 lg:border-l lg:pl-10">
                  {secondary.map((post) => (
                    <li key={post.id} className="py-7 first:pt-0 lg:first:pt-0">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--muted)]">
                        {post.publishedAt ? formatShortDate(post.publishedAt) : post.category}
                      </p>
                      <h3 className="mt-3 font-display text-xl font-extrabold leading-tight tracking-[-0.03em]">
                        <Link href={`/noticias/${post.slug}`} className="transition hover:text-[var(--coral)]">
                          {post.title}
                        </Link>
                      </h3>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
        </section>
      )}

      <section className="home-closing relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="home-closing-glow" aria-hidden />
        <Container
          className={`relative grid items-end gap-10 pt-20 sm:pt-24 ${
            showParticipatePhoto ? "lg:grid-cols-[1fr_0.88fr] lg:pt-0" : "pb-20 sm:pb-24"
          }`}
        >
          <div className="pb-20 sm:pb-24 lg:py-28">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--sky)]">
              Participe
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.055em]">
              A política começa quando alguém é ouvido.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/65">
              Conte o que falta no seu município. Sua contribuição ajuda a construir prioridades mais
              próximas da realidade do Maranhão.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/demandas"
                className="inline-flex h-13 items-center justify-center gap-2 bg-[var(--sky)] px-7 text-sm font-extrabold text-[var(--navy)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Quero participar <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/compromissos"
                className="inline-flex h-13 items-center justify-center border border-white/25 px-7 text-sm font-bold text-white transition hover:border-white/55 hover:bg-white/5"
              >
                Ver compromissos
              </Link>
            </div>

            {hasSocial && (
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/55">
                {content.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${content.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp
                  </a>
                )}
                {content.social.instagram && (
                  <a href={content.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    Instagram
                  </a>
                )}
                {content.social.facebook && (
                  <a href={content.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    Facebook
                  </a>
                )}
                {content.social.youtube && (
                  <a href={content.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    YouTube
                  </a>
                )}
              </div>
            )}
          </div>

          {showParticipatePhoto && (
            <div className="relative flex h-full min-h-[520px] items-end justify-center lg:min-h-[680px]">
              <div className="absolute inset-x-8 bottom-0 top-16 bg-white/[0.045]" aria-hidden />
              <Photo
                src={participateSrc}
                alt={`${content.candidate.ballotName} convida à participação`}
                className="relative z-10 aspect-[4/5] w-full max-w-[520px]"
                imgClassName="object-contain object-bottom"
                objectPosition="center bottom"
              />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
