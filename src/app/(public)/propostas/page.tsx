import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Landmark,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { proposalNumber } from "@/config/bandeiras";
import { getProposals } from "@/lib/data";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/page-metadata";
import { getProposalIcon } from "@/lib/proposal-icons";

export const metadata = createPageMetadata({
  title: "Propostas",
  description:
    "Prioridades construídas a partir da escuta das comunidades de Imperatriz, da Região Tocantina e do Maranhão.",
  path: "/propostas",
});

const pillars: Array<{ title: string; tone: "yellow" | "blue" | "green"; Icon: LucideIcon }> = [
  { title: "Escuta da população", tone: "yellow", Icon: MessageCircle },
  { title: "Atuação federal", tone: "blue", Icon: Landmark },
  { title: "Prestação de contas", tone: "green", Icon: CheckCircle2 },
];

export default async function ProposalsPage() {
  const proposals = await getProposals();

  return (
    <div className="flags-page">
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Propostas", path: "/propostas" }])} />
      <div className="flags-hero-stack">
        <section className="flags-hero" aria-labelledby="flags-hero-title">
          <div className="flags-hero-atmosphere" aria-hidden>
            <span className="flags-hero-glow flags-hero-glow--blue" />
            <span className="flags-hero-glow flags-hero-glow--green" />
            <span className="flags-hero-arc flags-hero-arc--1" />
            <span className="flags-hero-arc flags-hero-arc--2" />
            <span className="flags-hero-dots" />
          </div>

          <Container className="flags-hero-shell">
            <div className="flags-hero-copy">
              <p className="flags-hero-eyebrow">Bandeiras</p>
              <h1 id="flags-hero-title" className="flags-hero-title">
                <span className="flags-hero-title-line">Prioridades que nascem</span>
                <span className="flags-hero-title-line">da realidade e</span>
                <em className="flags-hero-title-line">viram compromisso.</em>
              </h1>
              <p className="flags-hero-lead">
                Uma agenda construída a partir da escuta das comunidades, da experiência na área
                social e das necessidades reais de Imperatriz, da Região Tocantina e do Maranhão.
              </p>
            </div>
          </Container>
        </section>

        <div className="flags-hero-chips">
          <Container className="flags-hero-shell">
            <ul className="flags-pillars" aria-label="Pilares da agenda">
              {pillars.map(({ title, tone, Icon }) => (
                <li key={title} className={`flags-pillar flags-pillar--${tone}`}>
                  <span className="flags-pillar-icon" aria-hidden>
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <span className="flags-pillar-label">{title}</span>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </div>

      <section className="flags-grid-section" aria-label="Bandeiras prioritárias">
        <Container className="flags-section-shell">
          <div className="flags-grid">
            {proposals.map((item) => {
              const Icon = getProposalIcon(item.icon);
              return (
                <article key={item.slug} className="flags-card">
                  <div className="flags-card-top">
                    <span className="flags-card-icon" aria-hidden>
                      <Icon size={26} strokeWidth={1.75} />
                    </span>
                    <span className="flags-card-number">{proposalNumber(item.sortOrder)}</span>
                  </div>
                  <p className="flags-card-category">{item.category}</p>
                  <h2 className="flags-card-title">{item.title}</h2>
                  <p className="flags-card-summary">{item.summary}</p>
                  <Link
                    href={`/propostas/${item.slug}`}
                    className="flags-card-cta"
                    aria-label={`Conhecer a proposta: ${item.title}`}
                  >
                    Conhecer a proposta
                    <ArrowRight size={18} aria-hidden className="flags-card-cta-arrow" />
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="flags-closing" aria-labelledby="flags-closing-title">
        <Container className="flags-section-shell">
          <div className="flags-closing-panel">
            <div className="flags-closing-copy">
              <h2 id="flags-closing-title" className="flags-closing-title">
                Sua comunidade também vive uma dessas prioridades?
              </h2>
              <p className="flags-closing-text">
                Participe, envie sua contribuição e ajude a construir uma agenda conectada à
                realidade de Imperatriz, da Região Tocantina e do Maranhão.
              </p>
            </div>
            <div className="flags-closing-actions">
              <Link href="/participe" className="flags-closing-btn flags-closing-btn--primary">
                Enviar uma contribuição
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/agenda" className="flags-closing-btn flags-closing-btn--secondary">
                Acompanhar a agenda
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
