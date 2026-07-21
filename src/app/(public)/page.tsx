import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";
import { Photo, hasPhoto } from "@/components/photo";
import { content } from "@/config/site";
import { getPosts, getProposals } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

const listeningSteps = [
  {
    n: "01",
    title: "Conte a realidade da sua comunidade",
    text: "Registre o problema, a necessidade ou a proposta de forma simples e direta.",
  },
  {
    n: "02",
    title: "Receba um protocolo",
    text: "A demanda fica organizada por tema e localidade, sem se perder em mensagens soltas.",
  },
  {
    n: "03",
    title: "Ajude a construir prioridades",
    text: "As contribuições ajudam a orientar propostas e ações conectadas com a vida real.",
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
        <div className="campaign-sky" aria-hidden />
        <div className="campaign-lights" aria-hidden />

        <svg className="campaign-waves" viewBox="0 0 760 540" fill="none" aria-hidden>
          <path d="M-40 166C116 91 205 247 364 172C506 105 597 196 760 129" />
          <path d="M-40 208C116 133 205 289 364 214C506 147 597 238 760 171" />
          <path d="M-40 250C116 175 205 331 364 256C506 189 597 280 760 213" />
          <path d="M-40 292C116 217 205 373 364 298C506 231 597 322 760 255" />
          <path d="M-40 334C116 259 205 415 364 340C506 273 597 364 760 297" />
        </svg>

        <svg className="campaign-bridge" viewBox="0 0 1600 500" preserveAspectRatio="none" aria-hidden>
          <path className="campaign-bridge-deck" d="M0 404C260 395 532 401 790 383C1047 365 1308 351 1600 360V500H0Z" />
          <path className="campaign-bridge-line" d="M0 400C264 391 528 397 790 379C1052 361 1318 348 1600 356" />
          <path className="campaign-bridge-line" d="M655 385L790 135L914 371" />
          <path className="campaign-bridge-line campaign-bridge-line-soft" d="M682 374L790 135M708 373L790 135M734 371L790 135M760 369L790 135M818 369L790 135M846 368L790 135M874 367L790 135" />
        </svg>

        <Container className="campaign-stage relative z-10">
          <p className="campaign-office anim-rise">
            {content.candidate.office} pelo {content.candidate.state}
          </p>

          <div className="campaign-name-composition">
            <h1 className="campaign-luzia anim-rise anim-d1" aria-label={content.candidate.ballotName}>
              LUZIA
            </h1>

            {showHeroPhoto ? (
              <Photo
                src={heroSrc}
                alt={`${content.candidate.ballotName}, ${content.candidate.office}`}
                priority
                className="campaign-portrait anim-rise anim-d1"
                imgClassName="object-contain object-bottom"
                objectPosition="center bottom"
              />
            ) : (
              <div className="campaign-portrait-placeholder" aria-hidden />
            )}

            <span className="campaign-mary anim-rise anim-d2" aria-hidden>
              Mary
            </span>
          </div>

          <div className="campaign-location anim-rise anim-d3">
            <span>Imperatriz</span>
            <i aria-hidden />
            <span>Região Tocantina</span>
          </div>
        </Container>

        <div className="campaign-band relative z-20">
          <div className="campaign-band-blue">
            <span>A mulher</span>
            <strong>do povo!</strong>
          </div>
          <div className="campaign-band-green">
            <span>De Imperatriz</span>
            <strong>para o Maranhão</strong>
          </div>
          <Link href="/sobre" className="campaign-band-yellow">
            <span>Conheça Luzia</span>
            <ArrowRight size={23} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="people-intro overflow-hidden bg-white py-20 sm:py-24 lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
          {showAboutPhoto && (
            <div className="people-about-visual relative mx-auto w-full max-w-[540px] lg:mx-0">
              <div className="people-about-blue" aria-hidden />
              <div className="people-about-lime" aria-hidden />
              <Photo
                src={aboutSrc}
                alt={`${content.candidate.ballotName} em Imperatriz`}
                className="people-about-photo aspect-[4/5] w-full"
                imgClassName="object-contain object-bottom"
                objectPosition="center bottom"
              />
              <p className="people-about-caption">De Imperatriz para todo o Maranhão.</p>
            </div>
          )}

          <div>
            <p className="people-kicker">Quem é Luzia Mary</p>
            <h2 className="people-title mt-5 max-w-3xl">
              Uma mulher presente, que conhece de perto a força e as necessidades do nosso povo.
            </h2>

            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-[var(--people-muted)]">
              {content.candidate.bio.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <ul className="people-values mt-10">
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

            <Link href="/sobre" className="people-text-link mt-9">
              Conheça a trajetória completa <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      {priorities.length > 0 && (
        <section className="people-priorities relative overflow-hidden py-20 text-white sm:py-24 lg:py-32">
          <div className="people-priorities-glow" aria-hidden />
          <Container className="relative">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="people-kicker people-kicker-light">Bandeiras</p>
                <h2 className="people-title mt-5 max-w-2xl text-white">
                  Prioridades que nascem da escuta e precisam virar ação.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-white/70 lg:justify-self-end">
                Propostas apresentadas de forma clara, ligadas à realidade de Imperatriz, da Região Tocantina e do Maranhão.
              </p>
            </div>

            <div className="people-priority-grid mt-14">
              {priorities.map((item, index) => (
                <article key={item.id} className="people-priority-card group">
                  <div className="people-priority-top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item.category}</p>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="people-priority-summary">{item.summary}</p>
                  <Link href={`/propostas/${item.slug}`} aria-label={`Ver proposta: ${item.title}`}>
                    Ver proposta <ArrowRight size={17} aria-hidden />
                  </Link>
                </article>
              ))}
            </div>

            <Link href="/propostas" className="people-text-link people-text-link-light mt-10">
              Ver todas as bandeiras <ArrowRight size={16} aria-hidden />
            </Link>
          </Container>
        </section>
      )}

      <section className="people-listening overflow-hidden">
        <Container className="people-listening-layout">
          <div className="people-listening-copy py-20 sm:py-24 lg:py-28">
            <div className="people-message-icon" aria-hidden>
              <MessageCircle size={28} />
            </div>
            <p className="people-kicker mt-8">Gabinete digital</p>
            <h2 className="people-title mt-5 max-w-xl">
              A voz da comunidade não pode se perder em uma conversa.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[var(--people-muted)]">
              Envie sua demanda, receba um protocolo e ajude a transformar as necessidades da sua região em prioridades organizadas.
            </p>
            <Link href="/demandas" className="people-button people-button-blue mt-9">
              Registrar uma demanda <ArrowRight size={17} aria-hidden />
            </Link>
          </div>

          <ol className="people-listening-steps">
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
        <section className="border-b border-[var(--people-line)] bg-white py-20 sm:py-24">
          <Container>
            <p className="people-kicker">Trajetória pública</p>
            <h2 className="people-title mt-5">Resultados que podem ser conferidos.</h2>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((item) => (
                <li key={item.label} className="border-t-4 border-[var(--people-lime)] pt-5">
                  <p className="font-display text-4xl font-black tracking-[-0.055em] text-[var(--people-blue)]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-extrabold text-[var(--people-ink)]">{item.label}</p>
                  {item.detail && <p className="mt-2 text-sm leading-6 text-[var(--people-muted)]">{item.detail}</p>}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {posts.length > 0 && (
        <section className="bg-[var(--people-soft)] py-20 sm:py-24 lg:py-28">
          <Container>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="people-kicker">Notícias</p>
                <h2 className="people-title mt-5">Acompanhe a caminhada.</h2>
              </div>
              <Link href="/noticias" className="people-text-link">
                Ver todas as notícias <ArrowRight size={16} aria-hidden />
              </Link>
            </div>

            <div className="people-news-grid mt-12">
              {featured && (
                <article className="people-news-featured">
                  <p>{featured.publishedAt ? formatShortDate(featured.publishedAt) : featured.category}</p>
                  <h3>
                    <Link href={`/noticias/${featured.slug}`}>{featured.title}</Link>
                  </h3>
                  {featured.excerpt && <div>{featured.excerpt}</div>}
                  <Link href={`/noticias/${featured.slug}`} className="people-text-link mt-7">
                    Ler matéria <ArrowRight size={16} aria-hidden />
                  </Link>
                </article>
              )}

              {secondary.length > 0 && (
                <ul className="people-news-secondary">
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

      <section className="people-closing relative isolate overflow-hidden text-white">
        <div className="people-closing-word" aria-hidden>
          Participe
        </div>
        <Container className={`relative grid items-end gap-10 ${showParticipatePhoto ? "lg:grid-cols-[1.02fr_0.98fr]" : ""}`}>
          <div className="py-20 sm:py-24 lg:py-28">
            <div className="people-closing-tag">A mulher do povo!</div>
            <h2 className="people-closing-title mt-6 max-w-3xl">
              Vamos construir uma voz forte para Imperatriz e para o Maranhão.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/78">
              Conte o que sua comunidade precisa. Participação de verdade começa com escuta, presença e compromisso.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/demandas" className="people-button people-button-lime">
                Quero participar <ArrowRight size={17} aria-hidden />
              </Link>
              <Link href="/compromissos" className="people-button people-button-outline-light">
                Ver compromissos
              </Link>
            </div>

            {hasSocial && (
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-white/72">
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
            <div className="people-closing-photo relative flex min-h-[520px] items-end justify-center lg:min-h-[690px]">
              <div className="people-closing-lime" aria-hidden />
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
