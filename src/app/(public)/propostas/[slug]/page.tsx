import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Eye,
  FileCheck2,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Home,
  Landmark,
  MessageCircle,
  MessagesSquare,
  Scale,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { FlagDetailSideNav } from "@/components/flag-detail-side-nav";
import {
  bandeiras,
  federalAtuacaoResumo,
  getBandeiraBySlug,
  transparenciaCompromisso,
  type BandeiraIcon,
} from "@/config/bandeiras";

const iconMap: Record<BandeiraIcon, LucideIcon> = {
  "heart-handshake": HeartHandshake,
  home: Home,
  "heart-pulse": HeartPulse,
  "building-2": Building2,
  shield: Shield,
  "messages-square": MessagesSquare,
};

const federalIcons: LucideIcon[] = [Landmark, FileCheck2, Scale, Handshake, Eye, MessagesSquare];

/** Rótulos curtos derivados dos instrumentos já existentes — sem alterar as descrições. */
const instrumentTitles = [
  "Emendas parlamentares",
  "Projetos de lei",
  "Fiscalização",
  "Articulação institucional",
  "Programas federais",
  "Acompanhamento",
] as const;

const heroPanel = [
  {
    title: "Escuta da população",
    text: "Uma prioridade ligada à vida real.",
    Icon: MessageCircle,
  },
  {
    title: "Atuação federal",
    text: "Instrumentos do mandato parlamentar.",
    Icon: Landmark,
  },
  {
    title: "Prestação de contas",
    text: "Prestação de contas em linguagem acessível.",
    Icon: CheckCircle2,
  },
] as const;

const sideNav = [
  { href: "#por-que-importa", label: "Por que importa" },
  { href: "#compromissos", label: "Compromissos" },
  { href: "#atuacao-federal", label: "Atuação federal" },
  { href: "#transparencia", label: "Transparência" },
] as const;

export function generateStaticParams() {
  return bandeiras.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bandeira = getBandeiraBySlug(slug);
  if (!bandeira) return { title: "Bandeira" };
  return { title: bandeira.title };
}

export default async function ProposalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bandeira = getBandeiraBySlug(slug);
  if (!bandeira) notFound();

  const Icon = iconMap[bandeira.icon];
  const demandHref = `/demandas?tema=${encodeURIComponent(bandeira.demandTheme)}`;

  return (
    <div className="flag-detail-page">
      <section className="flag-detail-hero" aria-labelledby="flag-detail-title">
        <Container className="flag-detail-hero-shell">
          <div className="flag-detail-hero-grid">
            <div className="flag-detail-hero-copy">
              <Link href="/propostas" className="flag-detail-back">
                <ArrowLeft size={16} aria-hidden />
                Voltar para todas as bandeiras
              </Link>

              <div className="flag-detail-meta">
                <span className="flag-detail-number">{bandeira.number}</span>
                <span className="flag-detail-category">{bandeira.category}</span>
              </div>

              <div className="flag-detail-heading">
                <span className="flag-detail-icon" aria-hidden>
                  <Icon size={28} strokeWidth={1.75} />
                </span>
                <h1 id="flag-detail-title" className="flag-detail-title">
                  {bandeira.title}
                </h1>
              </div>

              <p className="flag-detail-summary">{bandeira.summary}</p>
            </div>

            <aside className="flag-detail-hero-panel" aria-label="Pilares do mandato">
              <ul className="flag-detail-hero-list">
                {heroPanel.map(({ title, text, Icon: PanelIcon }) => (
                  <li key={title}>
                    <span className="flag-detail-hero-panel-icon" aria-hidden>
                      <PanelIcon size={18} strokeWidth={1.85} />
                    </span>
                    <div>
                      <p className="flag-detail-hero-panel-title">{title}</p>
                      <p className="flag-detail-hero-panel-text">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <Container className="flag-detail-layout">
        <div className="flag-detail-top">
          <div className="flag-detail-main">
            <section
              id="por-que-importa"
              className="flag-editorial"
              aria-labelledby="why-heading"
            >
              <p className="flag-block-eyebrow">Por que essa bandeira importa</p>
              <h2 id="why-heading" className="flag-block-title">
                Uma prioridade ligada à vida real
              </h2>
              <p className="flag-block-text">{bandeira.whyItMatters}</p>
            </section>

            <section
              id="compromissos"
              className="flag-commitments"
              aria-labelledby="defend-heading"
            >
              <p className="flag-block-eyebrow">O que Luzia Mary vai defender</p>
              <h2 id="defend-heading" className="flag-block-title">
                Compromissos objetivos desta bandeira
              </h2>
              <ul className="flag-check-list">
                {bandeira.commitments.map((item) => (
                  <li key={item}>
                    <span className="flag-check" aria-hidden>
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="flag-detail-side" aria-label="Nesta bandeira">
            <div className="flag-detail-side-inner">
              <p className="flag-side-eyebrow">Nesta bandeira</p>
              <FlagDetailSideNav items={sideNav} />

              <div className="flag-side-panel">
                <p className="flag-side-panel-label">Compromisso central</p>
                <p className="flag-side-panel-text">{bandeira.summary}</p>
                <Link href={demandHref} className="flag-side-panel-btn">
                  Enviar uma contribuição
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <section
          id="atuacao-federal"
          className="flag-federal"
          aria-labelledby="federal-heading"
        >
          <p className="flag-block-eyebrow">Como uma deputada federal pode atuar</p>
          <h2 id="federal-heading" className="flag-block-title">
            Instrumentos do mandato parlamentar
          </h2>
          <p className="flag-block-text flag-federal-lead">{federalAtuacaoResumo}</p>
          <ul className="flag-federal-grid">
            {bandeira.howFederalActs.map((item, index) => {
              const FederalIcon = federalIcons[index % federalIcons.length];
              return (
                <li key={item}>
                  <span className="flag-federal-icon" aria-hidden>
                    <FederalIcon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="flag-federal-title">{instrumentTitles[index]}</p>
                    <p className="flag-federal-desc">{item}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          id="transparencia"
          className="flag-transparency-band"
          aria-labelledby="transparency-heading"
        >
          <span className="flag-transparency-icon" aria-hidden>
            <Eye size={22} strokeWidth={1.75} />
          </span>
          <div className="flag-transparency-copy">
            <p className="flag-block-eyebrow">Compromisso com transparência</p>
            <h2 id="transparency-heading" className="flag-block-title">
              Prestação de contas em linguagem acessível
            </h2>
            <p className="flag-block-text">{transparenciaCompromisso}</p>
          </div>
        </section>

        <section className="flag-cta" aria-labelledby="flag-cta-title">
          <h2 id="flag-cta-title" className="flag-cta-title">
            Essa prioridade também é importante para sua comunidade?
          </h2>
          <div className="flag-cta-actions">
            <Link href={demandHref} className="flag-cta-btn flag-cta-btn--primary">
              Enviar uma contribuição
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/propostas" className="flag-cta-btn flag-cta-btn--secondary">
              Ver outras bandeiras
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
