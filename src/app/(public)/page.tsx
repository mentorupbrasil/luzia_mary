import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Target,
} from "lucide-react";
import { CampaignHomeHeader } from "@/components/campaign-home-header";
import { Container } from "@/components/container";
import { hasPhoto } from "@/components/photo";
import { proposalNumber } from "@/config/bandeiras";
import { content } from "@/config/site";
import { getPosts, getProposals } from "@/lib/data";
import { createPageMetadata } from "@/lib/page-metadata";
import { getProposalIcon } from "@/lib/proposal-icons";
import { formatShortDate } from "@/lib/utils";
import { JsonLd } from "@/components/json-ld";
import { buildPersonJsonLd } from "@/lib/json-ld";

export const metadata = createPageMetadata({
  title: `${content.candidate.ballotName} | ${content.candidate.office}`,
  description: content.candidate.homeLead || content.candidate.shortBio,
  path: "/",
  absoluteTitle: true,
  image: content.candidate.photos.hero,
});

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
  const showAboutPhoto = hasPhoto(aboutSrc);
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

  return (
    <>
      <JsonLd data={buildPersonJsonLd()} />
      <section className="campaign-hero" aria-labelledby="hero-title">
        <Image
          src="/hero/hero-final.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
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
                  sizes="(max-width: 768px) 90vw, (max-width: 1280px) 360px, 400px"
                  quality={80}
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
                const Icon = getProposalIcon(item.icon);
                const n = proposalNumber(item.sortOrder);
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

              <Link href="/participe" className="gabinete-cta">
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

      <section className="convite" aria-labelledby="convite-heading">
        <div className="convite-bg" aria-hidden>
          <span className="convite-glow" />
          <span className="convite-arc" />
          <span className="convite-dots" />
          <span className="convite-curve" />
          <span className="convite-orb convite-orb--green" />
          <span className="convite-orb convite-orb--yellow" />
          <span className="convite-word">Participe</span>
        </div>

        <Container className="convite-container relative max-w-[1220px]">
          <div className="convite-layout">
            <div className="convite-copy">
              <div className="convite-seal-wrap">
                <span className="convite-seal-shadow" aria-hidden />
                <p className="convite-seal">A mulher do povo</p>
              </div>

              <h2 id="convite-heading" className="convite-title">
                <span className="convite-title-line">Vamos construir</span>
                <span className="convite-title-line">
                  uma <em>voz forte</em>
                </span>
                <span className="convite-title-line">para Imperatriz</span>
                <span className="convite-title-line">e para o Maranhão.</span>
              </h2>

              <p className="convite-lead">
                Conte o que sua comunidade precisa. Participação de verdade começa com escuta, presença e
                compromisso.
              </p>
            </div>

            <div className="convite-aside">
              <div className="convite-visual" aria-hidden>
                <svg className="convite-visual-svg" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="160" cy="150" r="88" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                  <circle cx="160" cy="150" r="58" stroke="rgba(229,217,39,0.22)" strokeWidth="1.5" strokeDasharray="4 6" />
                  <path
                    d="M52 78C78 42 124 36 160 58"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M268 86C242 48 198 40 160 58"
                    stroke="rgba(39,211,87,0.35)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M64 214C96 246 132 252 160 236"
                    stroke="rgba(229,217,39,0.28)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M256 210C224 248 188 252 160 236"
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <g className="convite-bubble convite-bubble--1">
                    <rect x="38" y="48" width="78" height="54" rx="18" fill="rgba(255,255,255,0.14)" />
                    <path d="M58 102L52 118L74 102" fill="rgba(255,255,255,0.14)" />
                    <circle cx="62" cy="75" r="4" fill="rgba(229,217,39,0.9)" />
                    <circle cx="77" cy="75" r="4" fill="rgba(255,255,255,0.55)" />
                    <circle cx="92" cy="75" r="4" fill="rgba(39,211,87,0.85)" />
                  </g>
                  <g className="convite-bubble convite-bubble--2">
                    <rect x="208" y="42" width="72" height="48" rx="16" fill="rgba(0,105,254,0.45)" />
                    <path d="M254 90L266 106L242 90" fill="rgba(0,105,254,0.45)" />
                    <rect x="224" y="60" width="28" height="4" rx="2" fill="rgba(255,255,255,0.55)" />
                    <rect x="224" y="70" width="40" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
                  </g>
                  <g className="convite-bubble convite-bubble--3">
                    <rect x="214" y="168" width="70" height="48" rx="16" fill="rgba(229,217,39,0.88)" />
                    <path d="M248 216L258 232L236 216" fill="rgba(229,217,39,0.88)" />
                    <circle cx="238" cy="192" r="8" fill="#002a66" opacity="0.35" />
                    <circle cx="256" cy="192" r="8" fill="#002a66" opacity="0.55" />
                  </g>
                  <g className="convite-bubble convite-bubble--4">
                    <rect x="42" y="168" width="66" height="46" rx="15" fill="rgba(39,211,87,0.75)" />
                    <path d="M68 214L58 230L82 214" fill="rgba(39,211,87,0.75)" />
                    <rect x="56" y="186" width="36" height="4" rx="2" fill="#002a66" opacity="0.35" />
                    <rect x="56" y="196" width="24" height="4" rx="2" fill="#002a66" opacity="0.25" />
                  </g>
                  <circle cx="160" cy="150" r="22" fill="rgba(255,255,255,0.16)" />
                  <circle cx="160" cy="150" r="12" fill="#e5d927" />
                </svg>
              </div>

              <aside className="convite-panel" aria-label="Formas de participar">
                <h3 className="convite-panel-title">Faça parte dessa construção</h3>
                <p className="convite-panel-lead">
                  Escolha como você quer participar e acompanhe de perto os compromissos com Imperatriz e o
                  Maranhão.
                </p>

                <div className="convite-actions">
                  <Link href="/participe" className="convite-btn convite-btn--primary">
                    <MessageCircle size={18} aria-hidden />
                    Quero participar
                    <ArrowRight size={17} aria-hidden />
                  </Link>
                  <Link href="/compromissos" className="convite-btn convite-btn--secondary">
                    Ver compromissos
                    <ArrowRight size={17} aria-hidden />
                  </Link>
                </div>

                <ul className="convite-guarantees">
                  <li>
                    <CheckCircle2 size={15} aria-hidden />
                    Escuta ativa
                  </li>
                  <li>
                    <CheckCircle2 size={15} aria-hidden />
                    Protocolo organizado
                  </li>
                  <li>
                    <CheckCircle2 size={15} aria-hidden />
                    Compromisso com retorno
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
