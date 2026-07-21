import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Photo, hasPhoto } from "@/components/photo";
import { content } from "@/config/site";
import { getPosts, getProposals } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

const bandeiraAccent = ["#0c2d5a", "#c94b2f", "#163f78", "#2a6bb5"] as const;

const canalPassos = [
  {
    n: "01",
    title: "Você conta",
    text: "Descreva a demanda do seu município, bairro ou comunidade.",
  },
  {
    n: "02",
    title: "Recebemos",
    text: "A equipe registra com protocolo e classifica o tema.",
  },
  {
    n: "03",
    title: "Acompanhamos",
    text: "Priorizamos o que pode avançar com articulação e cobrança.",
  },
  {
    n: "04",
    title: "Respondemos",
    text: "Você recebe retorno sobre o andamento — sem sumiço.",
  },
] as const;

export default async function HomePage() {
  const [proposals, posts] = await Promise.all([getProposals(), getPosts()]);
  const bandeiras = proposals.slice(0, 4);
  const [featured, ...rest] = posts;
  const secondary = rest.slice(0, 2);

  const heroSrc = content.candidate.photos.hero;
  const aboutSrc = content.candidate.photos.about;
  const participateSrc = content.candidate.photos.participate;
  const showHeroPhoto = hasPhoto(heroSrc);
  const showAboutPhoto = hasPhoto(aboutSrc);
  const showParticipatePhoto = hasPhoto(participateSrc);
  const highlights = content.highlights.slice(0, 3);
  const achievements = content.achievements;
  const hasSocial =
    Boolean(content.social.instagram) ||
    Boolean(content.social.facebook) ||
    Boolean(content.social.youtube) ||
    Boolean(content.contact.whatsapp);

  return (
    <>
      {/* 1. Hero full-bleed — tipografia em camadas (Nikolas) + presença (Marina) */}
      <section className="hero-stage relative isolate min-h-[100dvh] overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[var(--sky)]/20 blur-3xl" />
          <div className="absolute -right-16 bottom-40 h-80 w-80 rounded-full bg-[var(--coral)]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col px-5 pt-[72px] sm:px-7 lg:px-10">
          <h1 className="sr-only">
            {content.candidate.ballotName} — {content.candidate.office}
          </h1>
          <p className="anim-rise relative z-20 mt-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-white/55 sm:text-left">
            {content.candidate.office} · {content.candidate.city} · {content.candidate.state}
          </p>

          <div className="relative mt-2 flex flex-1 flex-col justify-end">
            {/* Nome gigante atrás da foto */}
            <div className="anim-fade pointer-events-none absolute inset-x-0 top-[8%] z-0 flex justify-center lg:top-[4%]">
              <p className="hero-giant text-center">Luzia</p>
            </div>

            {/* Cutout */}
            {showHeroPhoto ? (
              <div className="anim-rise anim-d1 relative z-10 mx-auto w-full max-w-[520px] lg:max-w-[580px]">
                <Photo
                  src={heroSrc}
                  alt={`${content.candidate.ballotName}, ${content.candidate.office}`}
                  priority
                  className="mx-auto aspect-[3/4] w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                  imgClassName="object-contain object-bottom"
                  objectPosition="center bottom"
                />
              </div>
            ) : (
              <div className="relative z-10 mx-auto mb-10 flex h-[50vh] w-full max-w-lg items-end justify-center" aria-hidden>
                <p className="hero-script">Luzia</p>
              </div>
            )}

            {/* Script na frente da foto */}
            <p className="hero-script anim-rise anim-d2 pointer-events-none absolute bottom-[22%] left-1/2 z-20 -translate-x-1/2 sm:bottom-[18%] lg:bottom-[16%]">
              Mary
            </p>
          </div>
        </div>

        {/* Barra inferior de impacto */}
        <div className="relative z-30 grid border-t border-white/10 lg:grid-cols-[1.4fr_1fr]">
          <div className="bg-[var(--navy)] px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
            <p className="font-display text-lg font-extrabold leading-snug tracking-[-0.02em] text-white sm:text-xl lg:text-2xl">
              {content.candidate.slogan}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">{content.candidate.homeLead}</p>
          </div>
          <div className="flex flex-col gap-3 bg-[var(--sky)] px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:px-8 sm:py-6 lg:px-10">
            <Link
              href="/sobre"
              className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--navy)] px-6 text-sm font-bold text-white transition hover:bg-[var(--navy-mid)]"
            >
              Conheça Luzia <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href="/demandas"
              className="inline-flex h-12 items-center justify-center border-2 border-[var(--navy)] bg-transparent px-6 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--navy)] hover:text-white"
            >
              Envie sua demanda
            </Link>
          </div>
        </div>
        <div className="h-2 bg-[var(--coral)]" aria-hidden />
      </section>

      {/* 2. Quem é Luzia — bloco de cor + cutout (Marina) */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 text-white sm:py-20">
        <Container className={`relative grid items-end gap-10 lg:gap-12 ${showAboutPhoto ? "lg:grid-cols-[0.85fr_1.15fr]" : ""}`}>
          {showAboutPhoto && (
            <div className="relative -mb-16 max-w-md lg:-mb-20 lg:max-w-none">
              <Photo
                src={aboutSrc}
                alt={`${content.candidate.ballotName} em Imperatriz`}
                className="aspect-[4/5] w-full"
                imgClassName="object-contain object-bottom"
                objectPosition="center bottom"
              />
            </div>
          )}
          <div className="pb-4 lg:pb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sky)]">Prazer, Luzia</p>
            <h2 className="section-title mt-3 text-white">
              Trajetória em Imperatriz, compromisso com o Maranhão
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/70">
              {content.candidate.bio.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            {highlights.length > 0 && (
              <ul className="mt-8 grid gap-4 border-t border-white/15 pt-8 sm:grid-cols-3">
                {highlights.map((item) => (
                  <li key={item.label}>
                    <p className="font-display text-sm font-extrabold text-[var(--sky)]">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-white/60">{item.text}</p>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href="/sobre"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-[var(--coral)] decoration-2 underline-offset-6 hover:text-[var(--sky)]"
            >
              Conheça a história completa <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      {/* 3. Quatro bandeiras */}
      <section className="border-t border-[var(--line)] bg-[var(--bg)] py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--coral)]">Bandeiras</p>
            <h2 className="section-title mt-3">
              Quatro prioridades para a Região Tocantina
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Temas concretos, sem discurso genérico — cada bandeira com caminho de acompanhamento.
            </p>
          </div>

          <ol className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {bandeiras.map((item, index) => (
              <li key={item.id} className="group grid gap-4 py-8 sm:grid-cols-[4.5rem_1fr_auto] sm:items-start sm:gap-8">
                <span
                  className="font-display text-3xl font-extrabold tracking-[-0.04em]"
                  style={{ color: bandeiraAccent[index % bandeiraAccent.length] }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="max-w-2xl">
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: bandeiraAccent[index % bandeiraAccent.length] }}
                  >
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">{item.summary}</p>
                </div>
                <Link
                  href={`/propostas/${item.slug}`}
                  className="inline-flex items-center gap-1 self-start text-sm font-bold text-[var(--navy)] transition group-hover:text-[var(--coral)] sm:pt-1"
                >
                  Ler <ArrowRight size={14} aria-hidden />
                </Link>
              </li>
            ))}
          </ol>

          <Link
            href="/propostas"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--navy)] underline decoration-[var(--coral)] decoration-2 underline-offset-6"
          >
            Ver todas as bandeiras <ArrowRight size={15} aria-hidden />
          </Link>
        </Container>
      </section>

      {/* 4. Resultados — só se houver dados */}
      {achievements.length > 0 && (
        <section className="border-t border-[var(--line)] bg-[var(--surface)] py-16 sm:py-20">
          <Container>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--coral)]">Trajetória pública</p>
            <h2 className="section-title mt-3">
              Resultados que podem ser conferidos
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((item) => (
                <li key={item.label} className="border-t-2 border-[var(--navy)] pt-5">
                  <p className="font-display text-3xl font-extrabold tracking-[-0.04em] text-[var(--navy)]">{item.value}</p>
                  <p className="mt-2 text-sm font-bold text-[var(--ink)]">{item.label}</p>
                  {item.detail && <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* 5. Notícias */}
      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--coral)]">Notícias</p>
              <h2 className="section-title mt-3">
                O que está acontecendo
              </h2>
            </div>
            <Link href="/noticias" className="text-sm font-bold text-[var(--navy)] underline decoration-2 underline-offset-6">
              Ver todas
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="mt-10 max-w-xl border-l-2 border-[var(--navy)] pl-5 text-[15px] leading-7 text-[var(--muted)]">
              Em breve, atualizações da pré-candidatura e da escuta na Região Tocantina.
            </p>
          ) : (
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr]">
              {featured && (
                <article>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                    {featured.publishedAt ? formatShortDate(featured.publishedAt) : featured.category}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                    <Link href={`/noticias/${featured.slug}`} className="hover:text-[var(--coral)]">
                      {featured.title}
                    </Link>
                  </h3>
                  {featured.excerpt && (
                    <p className="mt-3 max-w-xl text-[15px] leading-7 text-[var(--muted)]">{featured.excerpt}</p>
                  )}
                  <Link
                    href={`/noticias/${featured.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--navy)]"
                  >
                    Ler matéria <ArrowRight size={14} aria-hidden />
                  </Link>
                </article>
              )}
              {secondary.length > 0 && (
                <ul className="divide-y divide-[var(--line)] border-t border-[var(--line)] lg:border-t-0 lg:border-l lg:pl-10">
                  {secondary.map((post) => (
                    <li key={post.id} className="py-5 first:pt-0 lg:first:pt-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                        {post.publishedAt ? formatShortDate(post.publishedAt) : post.category}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.02em]">
                        <Link href={`/noticias/${post.slug}`} className="hover:text-[var(--coral)]">
                          {post.title}
                        </Link>
                      </h3>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* 6. Canal direto */}
      <section className="border-t border-[var(--line)] bg-[var(--surface)] py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--coral)]">Escuta</p>
            <h2 className="section-title mt-3">
              Um canal direto para ouvir você.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Demanda com protocolo, retorno da equipe e acompanhamento — sem fila invisível.
            </p>
          </div>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {canalPassos.map((passo) => (
              <li key={passo.n}>
                <p className="font-display text-sm font-extrabold text-[var(--coral)]">{passo.n}</p>
                <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.02em]">{passo.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{passo.text}</p>
              </li>
            ))}
          </ol>

          <Link
            href="/demandas"
            className="mt-10 inline-flex h-12 items-center justify-center gap-2 bg-[var(--coral)] px-7 text-sm font-bold text-white transition hover:brightness-95"
          >
            Enviar demanda agora <ArrowRight size={16} aria-hidden />
          </Link>
        </Container>
      </section>

      {/* 7. Participação */}
      <section className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--navy)] py-16 text-white sm:py-20">
        <Container className={`relative grid items-center gap-10 ${showParticipatePhoto ? "lg:grid-cols-[1fr_0.85fr]" : ""}`}>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Participe</p>
            <h2 className="section-title mt-3 text-white">
              Sua demanda pode virar prioridade
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-white/65">
              Conte o que falta no seu município. A escuta começa aqui — e o retorno também.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/demandas"
                className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--coral)] px-7 text-sm font-bold text-white transition hover:brightness-95"
              >
                Envie sua demanda <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/compromissos"
                className="inline-flex h-12 items-center justify-center border border-white/25 px-7 text-sm font-bold text-white transition hover:border-white/50"
              >
                Ver compromissos
              </Link>
            </div>
            {hasSocial && (
              <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-white/55">
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
            <div className="relative justify-self-end overflow-hidden bg-[color-mix(in_srgb,white_8%,transparent)] px-4 pt-4 sm:px-6">
              <Photo
                src={participateSrc}
                alt={`${content.candidate.ballotName} convida à participação`}
                className="aspect-[4/5] w-full max-w-md lg:max-w-none"
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
