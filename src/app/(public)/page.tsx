import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  HeartPulse,
  MessageCircle,
  Route,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import { CampaignHomeHeader } from "@/components/campaign-home-header";
import { Container } from "@/components/container";
import { Photo, hasPhoto } from "@/components/photo";
import { content } from "@/config/site";
import { getPosts, getProposals } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

const priorityIcons: Record<string, LucideIcon> = {
  "heart-pulse": HeartPulse,
  "briefcase-business": BriefcaseBusiness,
  route: Route,
  "shield-check": ShieldCheck,
};

const listeningSteps = [
  {
    n: "01",
    title: "Conte a realidade da sua comunidade",
    text: "Registre o problema, a necessidade ou a proposta de forma simples e direta.",
    Icon: MessageCircle,
  },
  {
    n: "02",
    title: "Receba um protocolo",
    text: "A demanda fica organizada por tema e localidade, sem se perder em mensagens soltas.",
    Icon: CheckCircle2,
  },
  {
    n: "03",
    title: "Ajude a construir prioridades",
    text: "As contribuições ajudam a orientar propostas e ações conectadas com a vida real.",
    Icon: Target,
  },
] as const;

export default async function HomePage() {
  const [proposals, posts] = await Promise.all([getProposals(), getPosts()]);
  const priorities = proposals.slice(0, 4);
  const [featured, ...rest] = posts;
  const secondary = rest.slice(0, 2);

  const aboutSrc = "/images/imagem-final.png";
  const participateSrc = content.candidate.photos.participate;
  const showAboutPhoto = hasPhoto(aboutSrc);
  const showParticipatePhoto = hasPhoto(participateSrc);
  const aboutValues = [
    {
      title: "Clareza",
      text: "Posições e decisões explicadas de forma simples.",
    },
    {
      title: "Presença",
      text: "Diálogo permanente com municípios e comunidades.",
    },
    {
      title: "Responsabilidade",
      text: "Compromissos tratados com seriedade e transparência.",
    },
  ] as const;
  const aboutParagraphs = [
    "Luzia Mary de Araújo construiu sua trajetória em Imperatriz, conhecendo de perto os desafios da gestão pública, das famílias e de quem precisa que o poder público funcione de verdade.",
    "Nas eleições municipais de 2024, ampliou uma rede de diálogo com lideranças, profissionais, mulheres, jovens e comunidades da Região Tocantina.",
  ] as const;
  const achievements = content.achievements;
  const hasSocial =
    Boolean(content.social.instagram) ||
    Boolean(content.social.facebook) ||
    Boolean(content.social.youtube) ||
    Boolean(content.contact.whatsapp);

  return (
    <>
      <section className="campaign-hero" aria-labelledby="hero-title">
        <Image
          src="/hero/hero-final.png"
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized
          className="hero-base-img"
        />

        <div className="campaign-hero-chrome">
          <CampaignHomeHeader />
        </div>

        <h1 id="hero-title" className="sr-only">
          Luzia Mary — pré-candidata a deputada federal pelo Maranhão
        </h1>
        <p className="sr-only">
          A mulher do povo, de Imperatriz para o Maranhão. Trabalho, fé e família.
        </p>

        <Link href="/sobre" className="hero-button">
          <span>Conheça Luzia</span>
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
        </Link>
      </section>

      <section className="about-section" aria-labelledby="about-title">
        <Container className="about-section-grid">
          {showAboutPhoto && (
            <div className="about-photo-col">
              <figure className="about-photo-stage">
                <Image
                  src={aboutSrc}
                  alt={`${content.candidate.ballotName} — De Imperatriz para todo o Maranhão`}
                  width={1122}
                  height={1402}
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 90vw, (max-width: 1280px) 380px, 400px"
                  className="about-photo-img"
                />
                <figcaption className="sr-only">
                  De Imperatriz para todo o Maranhão.
                </figcaption>
              </figure>
              <Link href="/sobre" className="about-cta">
                Conheça a trajetória completa
                <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
              </Link>
            </div>
          )}

          <div className="about-copy">
            <p className="about-kicker">Quem é Luzia Mary</p>
            <h2 id="about-title" className="about-title">
              Presença para ouvir.
              <br />
              Coragem para representar.
              <br />
              Trabalho para transformar.
            </h2>

            <div className="about-bio">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>

            <ul className="about-values">
              {aboutValues.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>

            {!showAboutPhoto && (
              <Link href="/sobre" className="about-cta">
                Conheça a trajetória completa
                <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
              </Link>
            )}
          </div>
        </Container>
      </section>

      {priorities.length > 0 && (
        <section className="bandeiras" aria-labelledby="bandeiras-heading">
          <div className="bandeiras-deco" aria-hidden>
            <span className="bandeiras-deco-arc" />
            <span className="bandeiras-deco-dots" />
            <span className="bandeiras-deco-line" />
            <span className="bandeiras-deco-glow" />
          </div>

          <Container className="bandeiras-container relative max-w-[1220px]">
            <header className="bandeiras-header">
              <p className="bandeiras-eyebrow">
                <span className="bandeiras-eyebrow-mark" aria-hidden />
                Bandeiras
              </p>
              <h2 id="bandeiras-heading" className="bandeiras-title">
                <span className="bandeiras-title-line">Prioridades que nascem da escuta</span>
                <span className="bandeiras-title-line">
                  e <em>viram ação</em>.
                </span>
              </h2>
              <p className="bandeiras-lead">
                Propostas construídas com diálogo e ligadas à realidade de Imperatriz, da Região
                Tocantina e do Maranhão.
              </p>
            </header>

            <div className="bandeiras-grid">
              {priorities.map((item, index) => {
                const Icon = priorityIcons[item.icon ?? ""] ?? HeartPulse;
                const n = String(index + 1).padStart(2, "0");
                return (
                  <article
                    key={item.id}
                    className={`bandeiras-card bandeiras-card--${index + 1} group`}
                  >
                    <div className="bandeiras-card-meta">
                      <span className="bandeiras-card-icon" aria-hidden>
                        <Icon size={30} strokeWidth={1.75} />
                      </span>
                      <p className="bandeiras-card-label">
                        <span className="bandeiras-card-num">{n}</span>
                        <span className="bandeiras-card-dot" aria-hidden>
                          ·
                        </span>
                        <span>{item.category}</span>
                      </p>
                    </div>
                    <h3 className="bandeiras-card-title">{item.title}</h3>
                    <p className="bandeiras-card-summary">{item.summary}</p>
                    <Link
                      href={`/propostas/${item.slug}`}
                      className="bandeiras-card-link"
                      aria-label={`Ver proposta: ${item.title}`}
                    >
                      Ver proposta
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  </article>
                );
              })}
            </div>

            <Link href="/propostas" className="bandeiras-cta">
              Ver todas as bandeiras
              <ArrowRight size={18} aria-hidden />
            </Link>
          </Container>
        </section>
      )}

      <section className="gabinete" aria-labelledby="gabinete-heading">
        <Container className="gabinete-container relative max-w-[1220px]">
          <div className="gabinete-layout">
            <div className="gabinete-copy">
              <div className="gabinete-icon" aria-hidden>
                <MessageCircle size={30} strokeWidth={1.75} />
                <span className="gabinete-icon-accent" />
              </div>

              <p className="gabinete-eyebrow">
                <span className="gabinete-eyebrow-mark" aria-hidden />
                Gabinete digital
              </p>

              <h2 id="gabinete-heading" className="gabinete-title">
                A voz da comunidade
                <br />
                precisa <em>virar ação</em>.
              </h2>

              <p className="gabinete-lead">
                Envie sua demanda, receba um protocolo e ajude a transformar as necessidades da sua
                região em prioridades organizadas.
              </p>

              <Link href="/demandas" className="gabinete-cta">
                Registrar uma demanda
                <ArrowRight size={18} aria-hidden />
              </Link>

              <p className="gabinete-micro">
                <Clock3 size={14} aria-hidden />
                Leva menos de 3 minutos.
              </p>
            </div>

            <aside className="gabinete-panel" aria-label="Como funciona o Gabinete Digital">
              <div className="gabinete-panel-deco" aria-hidden>
                <span className="gabinete-panel-glow" />
                <span className="gabinete-panel-dots" />
                <span className="gabinete-panel-line" />
              </div>

              <div className="gabinete-panel-head">
                <span className="gabinete-seal">Escuta ativa</span>
                <h3 className="gabinete-panel-title">Como funciona</h3>
                <p className="gabinete-panel-lead">
                  Três passos simples para sua demanda não se perder.
                </p>
              </div>

              <ol className="gabinete-steps">
                {listeningSteps.map(({ n, title, text, Icon }) => (
                  <li key={n} className="gabinete-step">
                    <div className="gabinete-step-rail" aria-hidden>
                      <span className="gabinete-step-num">{n}</span>
                      <span className="gabinete-step-icon">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                    </div>
                    <div className="gabinete-step-body">
                      <h4 className="gabinete-step-title">{title}</h4>
                      <p className="gabinete-step-text">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
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
