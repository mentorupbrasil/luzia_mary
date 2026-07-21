import Link from "next/link";
import { ArrowRight, Check, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";
import { Photo, hasPhoto } from "@/components/photo";
import { content } from "@/config/site";
import { getPosts, getProposals } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

const listeningSteps = [
  {
    n: "01",
    title: "Conte o que está acontecendo",
    text: "Registre a necessidade do seu bairro, município ou comunidade de forma direta.",
  },
  {
    n: "02",
    title: "Receba seu protocolo",
    text: "A contribuição é organizada por tema e localidade para não se perder em uma conversa.",
  },
  {
    n: "03",
    title: "Ajude a definir prioridades",
    text: "As demandas registradas ajudam a orientar propostas, posicionamentos e articulações.",
  },
  {
    n: "04",
    title: "Mantenha o canal aberto",
    text: "O protocolo permite que a equipe identifique o registro e organize o retorno.",
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
      <section className="campaign-hero relative isolate overflow-hidden">
        <div className="campaign-grain pointer-events-none absolute inset-0" aria-hidden />
        <div className="campaign-hero-word pointer-events-none" aria-hidden>
          Maranhão
        </div>

        <Container className="campaign-hero-layout relative min-h-[min(900px,100svh)] pt-[104px]">
          <div className="campaign-hero-copy relative z-20 self-center pb-14 pt-12 lg:pb-24 lg:pt-16">
            <p className="anim-rise campaign-eyebrow">
              <MapPin size={14} aria-hidden />
              {content.candidate.city} · {content.candidate.region}
            </p>

            <p className="anim-rise anim-d1 campaign-office">{content.candidate.office}</p>

            <h1 className="campaign-name anim-rise anim-d1" aria-label={content.candidate.ballotName}>
              <span className="campaign-name-first">Luzia</span>
              <span className="campaign-name-last">Mary</span>
            </h1>

            <div className="campaign-statement anim-rise anim-d2">
              <span aria-hidden />
              <p>{content.candidate.slogan}</p>
            </div>

            <p className="anim-rise anim-d2 campaign-lead">{content.candidate.homeLead}</p>

            <div className="anim-rise anim-d3 campaign-actions">
              <Link href="/sobre" className="campaign-button campaign-button-primary">
                Conheça Luzia <ArrowRight size={17} aria-hidden />
              </Link>
              <Link href="/demandas" className="campaign-button campaign-button-secondary">
                Envie sua demanda
              </Link>
            </div>
          </div>

          <div className="campaign-portrait-stage relative z-10 flex min-h-[500px] items-end justify-center lg:min-h-0">
            <div className="campaign-sun" aria-hidden />
            <div className="campaign-portrait-line" aria-hidden />
            <p className="campaign-vertical-note" aria-hidden>
              Imperatriz · Maranhão
            </p>

            {showHeroPhoto ? (
              <Photo
                src={heroSrc}
                alt={`${content.candidate.ballotName}, ${content.candidate.office}`}
                priority
                className="campaign-portrait anim-rise anim-d1 relative z-10 aspect-[3/4] w-full"
                imgClassName="object-contain object-bottom"
                objectPosition="center bottom"
              />
            ) : (
              <div className="relative z-10 h-[72vh] w-full" aria-hidden />
            )}

            <div className="campaign-photo-tag">
              <span>Uma voz da</span>
              <strong>Região Tocantina</strong>
            </div>
          </div>
        </Container>

        <div className="campaign-territory-strip relative z-30">
          <Container className="campaign-territory-inner">
            <p>De Imperatriz para todo o Maranhão</p>
            <span aria-hidden />
            <p>Escuta · Presença · Responsabilidade</p>
            <Link href="/demandas">
              Participe <ArrowRight size={15} aria-hidden />
            </Link>
          </Container>
        </div>
      </section>

      <section className="campaign-intro overflow-hidden bg-[var(--campaign-paper)] py-20 sm:py-24 lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {showAboutPhoto && (
            <div className="campaign-about-visual relative mx-auto w-full max-w-[520px] lg:mx-0">
              <div className="campaign-about-block" aria-hidden />
              <Photo
                src={aboutSrc}
                alt={`${content.candidate.ballotName} em Imperatriz`}
                className="campaign-about-photo aspect-[4/5] w-full"
                imgClassName="object-contain object-bottom"
                objectPosition="center bottom"
              />
              <p className="campaign-about-caption">Política feita perto das pessoas.</p>
            </div>
          )}

          <div>
            <p className="campaign-section-kicker">Quem é Luzia Mary</p>
            <h2 className="campaign-display-title mt-5 max-w-3xl">
              Uma trajetória que começa no território e mantém as pessoas no centro das decisões.
            </h2>

            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-[var(--muted)]">
              {content.candidate.bio.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <ul className="campaign-values mt-10">
              {values.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link href="/sobre" className="campaign-text-link mt-9">
              Conheça a trajetória completa <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      {priorities.length > 0 && (
        <section className="campaign-priorities relative overflow-hidden bg-[var(--campaign-navy)] py-20 text-white sm:py-24 lg:py-32">
          <div className="campaign-priorities-word" aria-hidden>
            Pautas
          </div>
          <Container className="relative">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="campaign-section-kicker campaign-section-kicker-light">Prioridades</p>
                <h2 className="campaign-display-title mt-5 max-w-2xl text-white">
                  Bandeiras claras para problemas que não podem continuar esperando.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-white/62 lg:justify-self-end">
                Propostas apresentadas com linguagem direta, ligação com a realidade local e espaço para
                acompanhamento público.
              </p>
            </div>

            <div className="campaign-priority-list mt-14">
              {priorities.map((item, index) => (
                <article key={item.id} className="campaign-priority-row group">
                  <span className="campaign-priority-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="campaign-priority-main">
                    <p>{item.category}</p>
                    <h3>{item.title}</h3>
                  </div>
                  <p className="campaign-priority-summary">{item.summary}</p>
                  <Link href={`/propostas/${item.slug}`} aria-label={`Ver proposta: ${item.title}`}>
                    <ArrowRight size={22} aria-hidden />
                  </Link>
                </article>
              ))}
            </div>

            <Link href="/propostas" className="campaign-text-link campaign-text-link-light mt-10">
              Ver todas as bandeiras <ArrowRight size={16} aria-hidden />
            </Link>
          </Container>
        </section>
      )}

      <section className="campaign-listening overflow-hidden bg-[var(--campaign-cyan)] text-[var(--campaign-navy)]">
        <Container className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="campaign-listening-intro py-20 sm:py-24 lg:py-28 lg:pr-16">
            <div className="campaign-message-icon" aria-hidden>
              <MessageCircle size={28} />
            </div>
            <p className="campaign-section-kicker mt-8 text-[var(--campaign-navy)]">Gabinete digital</p>
            <h2 className="campaign-display-title mt-5 max-w-xl">
              Sua demanda precisa de registro, não de promessa solta.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[color-mix(in_srgb,var(--campaign-navy)_72%,transparent)]">
              O canal de participação reúne contribuições por tema e localidade, gera protocolo e ajuda
              a transformar escuta em prioridade de trabalho.
            </p>
            <Link href="/demandas" className="campaign-button campaign-button-dark mt-9">
              Enviar uma demanda <ArrowRight size={17} aria-hidden />
            </Link>
          </div>

          <ol className="campaign-listening-steps lg:border-l lg:border-[rgba(5,33,58,0.2)] lg:pl-16">
            {listeningSteps.map((step) => (
              <li key={step.n}>
                <span>{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <Check size={20} aria-hidden />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {achievements.length > 0 && (
        <section className="border-b border-[var(--line)] bg-white py-20 sm:py-24">
          <Container>
            <p className="campaign-section-kicker">Trajetória pública</p>
            <h2 className="campaign-display-title mt-5">Resultados que podem ser conferidos.</h2>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((item) => (
                <li key={item.label} className="border-t-2 border-[var(--campaign-navy)] pt-5">
                  <p className="font-display text-4xl font-black tracking-[-0.055em] text-[var(--campaign-navy)]">
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
        <section className="bg-[var(--campaign-paper)] py-20 sm:py-24 lg:py-28">
          <Container>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="campaign-section-kicker">Notícias</p>
                <h2 className="campaign-display-title mt-5">Acompanhe a pré-candidatura.</h2>
              </div>
              <Link href="/noticias" className="campaign-text-link">
                Ver todas as notícias <ArrowRight size={16} aria-hidden />
              </Link>
            </div>

            <div className="campaign-news-grid mt-12">
              {featured && (
                <article className="campaign-news-featured">
                  <p>{featured.publishedAt ? formatShortDate(featured.publishedAt) : featured.category}</p>
                  <h3>
                    <Link href={`/noticias/${featured.slug}`}>{featured.title}</Link>
                  </h3>
                  {featured.excerpt && <div>{featured.excerpt}</div>}
                  <Link href={`/noticias/${featured.slug}`} className="campaign-text-link mt-7">
                    Ler matéria <ArrowRight size={16} aria-hidden />
                  </Link>
                </article>
              )}

              {secondary.length > 0 && (
                <ul className="campaign-news-secondary">
                  {secondary.map((post) => (
                    <li key={post.id}>
                      <p>{post.publishedAt ? formatShortDate(post.publishedAt) : post.category}</p>
                      <h3>
                        <Link href={`/noticias/${post.slug}`}>{post.title}</Link>
                      </h3>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
        </section>
      )}

      <section className="campaign-closing relative isolate overflow-hidden bg-[var(--campaign-coral)] text-white">
        <div className="campaign-closing-word" aria-hidden>
          Participe
        </div>
        <Container
          className={`relative grid items-end gap-10 ${
            showParticipatePhoto ? "lg:grid-cols-[1.04fr_0.96fr]" : ""
          }`}
        >
          <div className="py-20 sm:py-24 lg:py-28">
            <p className="campaign-section-kicker campaign-section-kicker-light">Faça parte</p>
            <h2 className="campaign-closing-title mt-5 max-w-3xl">
              O Maranhão avança quando a política começa ouvindo.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/76">
              Conte o que falta no seu município. Sua contribuição ajuda a construir prioridades mais
              próximas da vida real.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/demandas" className="campaign-button campaign-button-light">
                Quero participar <ArrowRight size={17} aria-hidden />
              </Link>
              <Link href="/compromissos" className="campaign-button campaign-button-outline-light">
                Ver compromissos
              </Link>
            </div>

            {hasSocial && (
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-white/70">
                {content.contact.whatsapp && (
                  <a href={`https://wa.me/${content.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                )}
                {content.social.instagram && (
                  <a href={content.social.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                )}
                {content.social.facebook && (
                  <a href={content.social.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                )}
                {content.social.youtube && (
                  <a href={content.social.youtube} target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                )}
              </div>
            )}
          </div>

          {showParticipatePhoto && (
            <div className="campaign-closing-photo relative flex min-h-[540px] items-end justify-center lg:min-h-[690px]">
              <div aria-hidden />
              <Photo
                src={participateSrc}
                alt={`${content.candidate.ballotName} convida à participação`}
                className="relative z-10 aspect-[4/5] w-full max-w-[530px]"
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
