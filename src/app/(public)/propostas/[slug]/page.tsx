import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  FileCheck2,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Home,
  Landmark,
  MessagesSquare,
  Scale,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
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

  return (
    <div className="flag-detail-page">
      <section className="flag-detail-hero" aria-labelledby="flag-detail-title">
        <Container className="flag-detail-hero-inner">
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
        </Container>
      </section>

      <Container className="flag-detail-body">
        <section className="flag-block" aria-labelledby="why-heading">
          <p className="flag-block-eyebrow">Por que essa bandeira importa</p>
          <h2 id="why-heading" className="flag-block-title">
            Uma prioridade ligada à vida real
          </h2>
          <p className="flag-block-text">{bandeira.whyItMatters}</p>
        </section>

        <section className="flag-block flag-block--commitments" aria-labelledby="defend-heading">
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

        <section className="flag-block flag-block--federal" aria-labelledby="federal-heading">
          <p className="flag-block-eyebrow">Como uma deputada federal pode atuar</p>
          <h2 id="federal-heading" className="flag-block-title">
            Instrumentos do mandato parlamentar
          </h2>
          <p className="flag-block-text">{federalAtuacaoResumo}</p>
          <ul className="flag-federal-grid">
            {bandeira.howFederalActs.map((item, index) => {
              const FederalIcon = federalIcons[index % federalIcons.length];
              return (
                <li key={item}>
                  <span className="flag-federal-icon" aria-hidden>
                    <FederalIcon size={18} strokeWidth={1.75} />
                  </span>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="flag-block flag-block--transparency" aria-labelledby="transparency-heading">
          <p className="flag-block-eyebrow">Compromisso com transparência</p>
          <h2 id="transparency-heading" className="flag-block-title">
            Prestação de contas em linguagem acessível
          </h2>
          <p className="flag-block-text">{transparenciaCompromisso}</p>
        </section>

        <section className="flag-cta" aria-labelledby="flag-cta-title">
          <h2 id="flag-cta-title" className="flag-cta-title">
            Essa prioridade também é importante para sua comunidade?
          </h2>
          <div className="flag-cta-actions">
            <Link
              href={`/demandas?tema=${encodeURIComponent(bandeira.demandTheme)}`}
              className="flag-cta-btn flag-cta-btn--primary"
            >
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
