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
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[var(--bg)]">
        {showHeroPhoto && (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-[var(--navy)] lg:block"
            aria-hidden
          />
        )}

        <Container className="relative grid gap-8 pt-6 pb-14 lg:min-h-[calc(100dvh-68px)] lg:grid-cols-[1fr_minmax(280px,0.95fr)] lg:items-center lg:gap-12 lg:py-12">
          <div className="order-2 lg:order-1">
            <p className="anim-rise text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
              {content.candidate.city} · {content.candidate.region} · {content.candidate.state}
            </p>
            <p className="anim-rise anim-d1 mt-4 text-sm font-semibold text-[var(--navy-mid)]">
              {content.candidate.office}
            </p>
            <h1 className="hero-name anim-rise anim-d1 mt-2 text-[var(--ink)]">
              Luzia Mary
            </h1>
            <p className="hero-slogan anim-rise anim-d2 mt-6 max-w-lg text-[var(--ink)]">
              {content.candidate.slogan}
            </p>
            <p className="anim-rise anim-d2 mt-4 max-w-md text-[15px] leading-7 text-[var(--muted)]">
              {content.candidate.homeLead}
            </p>
            <div className="anim-rise anim-d3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/sobre"
                className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--navy)] px-7 text-sm font-bold text-white transition hover:bg-[var(--navy-mid)]"
              >
                Conheça Luzia <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/demandas"
                className="inline-flex h-12 items-center justify-center border-2 border-[var(--ink)]/15 bg-transparent px-7 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--navy)] hover:text-[var(--navy)]"
              >
                Envie sua demanda
              </Link>
            </div>
          </div>

          {showHeroPhoto ? (
            <div className="relative order-1 mx-auto w-full max-w-[420px] lg:order-2 lg:mx-0 lg:max-w-none lg:self-end">
              <Photo
                src={heroSrc}
                alt={`${content.candidate.ballotName}, ${content.candidate.office}`}
                priority
                className="relative z-10 aspect-[3/4] w-full shadow-[var(--lift)] sm:aspect-[4/5] lg:max-h-[min(82dvh,740px)] lg:aspect-auto lg:h-[min(82dvh,740px)]"
                imgClassName="object-cover object-top"
                objectPosition="center top"
              />
            </div>
          ) : (
            <div
              className="relative order-1 flex min-h-[200px] items-end bg-[var(--navy)] px-6 py-8 sm:min-h-[240px] lg:order-2 lg:min-h-[min(70dvh,560px)] lg:px-10 lg:py-12"
              aria-hidden
            >
              <div>
                <p className="hero-name text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 3.75rem)" }}>
                  Imperatriz
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
                  Região Tocantina · Maranhão
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* 2. Quem é Luzia */}
      <section className="border-t border-[var(--line)] bg-[var(--surface)] py-16 sm:py-20">
        <Container className={`grid items-center gap-10 lg:gap-14 ${showAboutPhoto ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
          {showAboutPhoto && (
            <Photo
              src={aboutSrc}
              alt={`${content.candidate.ballotName} em Imperatriz`}
              className="aspect-[4/5] w-full max-w-md shadow-[var(--lift)] lg:max-w-none"
              objectPosition="center top"
            />
          )}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--coral)]">Quem é Luzia</p>
            <h2 className="section-title mt-3">
              Trajetória em Imperatriz, compromisso com o Maranhão
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-[var(--muted)]">
              {content.candidate.bio.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            {highlights.length > 0 && (
              <ul className="mt-8 grid gap-4 border-t border-[var(--line)] pt-8 sm:grid-cols-3">
                {highlights.map((item) => (
                  <li key={item.label}>
                    <p className="font-display text-sm font-extrabold text-[var(--navy)]">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href="/sobre"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--navy)] underline decoration-[var(--coral)] decoration-2 underline-offset-6 hover:text-[var(--coral)]"
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
            <Photo
              src={participateSrc}
              alt={`${content.candidate.ballotName} convida à participação`}
              className="aspect-[4/5] w-full max-w-md justify-self-end shadow-[0_24px_50px_rgba(0,0,0,0.35)] lg:max-w-none"
              objectPosition="center top"
            />
          )}
        </Container>
      </section>
    </>
  );
}
