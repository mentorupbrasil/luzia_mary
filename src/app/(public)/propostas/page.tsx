import Link from "next/link";
import {
  ArrowRight,
  Building2,
  HeartHandshake,
  HeartPulse,
  Home,
  MessagesSquare,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { bandeiras, bandeirasPilares, type BandeiraIcon } from "@/config/bandeiras";

export const metadata = { title: "Bandeiras" };

const iconMap: Record<BandeiraIcon, LucideIcon> = {
  "heart-handshake": HeartHandshake,
  home: Home,
  "heart-pulse": HeartPulse,
  "building-2": Building2,
  shield: Shield,
  "messages-square": MessagesSquare,
};

export default function ProposalsPage() {
  return (
    <div className="flags-page">
      <section className="flags-hero" aria-labelledby="flags-hero-title">
        <Container className="flags-hero-inner">
          <p className="flags-hero-eyebrow">Bandeiras</p>
          <h1 id="flags-hero-title" className="flags-hero-title">
            Prioridades que nascem da realidade
            <br />
            e <em>viram compromisso</em>.
          </h1>
          <p className="flags-hero-lead">
            Uma agenda construída a partir da escuta das comunidades, da experiência na área social
            e das necessidades reais de Imperatriz, da Região Tocantina e do Maranhão.
          </p>
          <ul className="flags-pillars" aria-label="Pilares da agenda">
            {bandeirasPilares.map((pillar) => (
              <li key={pillar.title} className={`flags-pillar flags-pillar--${pillar.tone}`}>
                <span className="flags-pillar-dot" aria-hidden />
                {pillar.title}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="flags-grid-section" aria-label="Bandeiras prioritárias">
        <Container>
          <div className="flags-grid">
            {bandeiras.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <article key={item.slug} className="flags-card">
                  <div className="flags-card-top">
                    <span className="flags-card-icon" aria-hidden>
                      <Icon size={26} strokeWidth={1.75} />
                    </span>
                    <span className="flags-card-number">{item.number}</span>
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
    </div>
  );
}
