import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  FileText,
  HeartHandshake,
  HeartPulse,
  Home,
  Landmark,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { proposalNumber } from "@/config/bandeiras";
import { getProposals } from "@/lib/data";

export const metadata = { title: "Bandeiras" };

const iconMap: Record<string, LucideIcon> = {
  "heart-handshake": HeartHandshake,
  home: Home,
  "heart-pulse": HeartPulse,
  "building-2": Building2,
  shield: Shield,
  "messages-square": MessagesSquare,
};

const pillars: Array<{ title: string; tone: "yellow" | "blue" | "green"; Icon: LucideIcon }> = [
  { title: "Escuta da população", tone: "yellow", Icon: MessageCircle },
  { title: "Atuação federal", tone: "blue", Icon: Landmark },
  { title: "Prestação de contas", tone: "green", Icon: CheckCircle2 },
];

export default async function ProposalsPage() {
  const proposals = await getProposals();

  return (
    <div className="flags-page">
      <section className="flags-hero" aria-labelledby="flags-hero-title">
        <div className="flags-hero-atmosphere" aria-hidden>
          <span className="flags-hero-glow flags-hero-glow--blue" />
          <span className="flags-hero-glow flags-hero-glow--green" />
          <span className="flags-hero-arc flags-hero-arc--1" />
          <span className="flags-hero-arc flags-hero-arc--2" />
          <span className="flags-hero-dots" />
        </div>

        <Container className="flags-hero-shell">
          <div className="flags-hero-grid">
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
            </div>

            <div className="flags-hero-visual" aria-hidden>
              <div className="flags-orbit">
                <svg className="flags-orbit-lines" viewBox="0 0 420 420" fill="none">
                  <circle cx="210" cy="210" r="148" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeDasharray="4 8" />
                  <circle cx="210" cy="210" r="108" stroke="rgba(78,161,255,0.22)" strokeWidth="1.4" />
                  <path d="M78 148 C120 118, 150 132, 178 168" stroke="rgba(255,211,26,0.45)" strokeWidth="1.6" />
                  <path d="M342 132 C300 150, 278 176, 262 204" stroke="rgba(8,166,75,0.42)" strokeWidth="1.6" />
                  <path d="M96 286 C140 300, 168 278, 190 246" stroke="rgba(78,161,255,0.4)" strokeWidth="1.6" />
                  <path d="M330 292 C292 278, 268 254, 248 228" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" />
                  <path d="M210 102 V158" stroke="rgba(255,211,26,0.35)" strokeWidth="1.4" strokeDasharray="3 6" />
                  <path d="M116 250 L168 228" stroke="rgba(255,255,255,0.2)" strokeWidth="1.3" />
                  <path d="M304 250 L252 228" stroke="rgba(255,255,255,0.2)" strokeWidth="1.3" />
                </svg>

                <span className="flags-node flags-node--tl">
                  <MessagesSquare size={18} strokeWidth={1.75} />
                </span>
                <span className="flags-node flags-node--tr">
                  <MapPin size={18} strokeWidth={1.75} />
                </span>
                <span className="flags-node flags-node--bl">
                  <Building2 size={18} strokeWidth={1.75} />
                </span>
                <span className="flags-node flags-node--br">
                  <CheckCircle2 size={18} strokeWidth={1.75} />
                </span>

                <div className="flags-core">
                  <span>Escuta</span>
                  <ArrowDown size={14} strokeWidth={2.4} />
                  <span>Proposta</span>
                  <ArrowDown size={14} strokeWidth={2.4} />
                  <strong>Ação</strong>
                </div>

                <div className="flags-path flags-path--law">
                  <FileText size={15} strokeWidth={1.85} />
                  <span>Legislação</span>
                </div>
                <div className="flags-path flags-path--funds">
                  <Landmark size={15} strokeWidth={1.85} />
                  <span>Recursos</span>
                </div>
                <div className="flags-path flags-path--watch">
                  <Eye size={15} strokeWidth={1.85} />
                  <span>Fiscalização</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="flags-grid-section" aria-label="Bandeiras prioritárias">
        <Container className="flags-section-shell">
          <div className="flags-grid">
            {proposals.map((item) => {
              const Icon = iconMap[item.icon] ?? Landmark;
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
              <Link href="/demandas" className="flags-closing-btn flags-closing-btn--primary">
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
