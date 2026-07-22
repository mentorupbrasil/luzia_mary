import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Flag,
  HeartHandshake,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { content } from "@/config/site";

export const metadata = { title: "Biografia" };

const BIO_PHOTO = "/images/Sobre.png";

const pillars: Array<{
  title: string;
  text: string;
  Icon: LucideIcon;
  tone: "yellow" | "blue" | "green";
}> = [
  {
    title: "Escuta",
    text: "das comunidades",
    Icon: MessageCircle,
    tone: "yellow",
  },
  {
    title: "Presença",
    text: "onde o povo está",
    Icon: MapPin,
    tone: "blue",
  },
  {
    title: "Compromisso",
    text: "com resultados",
    Icon: HeartHandshake,
    tone: "green",
  },
];

const trajectory: Array<{ text: string; Icon: LucideIcon }> = [
  {
    text: "Antes de disputar eleições, Luzia Mary já participava da vida pública pela base, ouvindo famílias, acompanhando demandas reais e defendendo melhorias para as comunidades de Imperatriz.",
    Icon: Users,
  },
  {
    text: "Ao longo de sua caminhada, consolidou uma atuação marcada pela proximidade com as pessoas, pela defesa da dignidade social e pelo compromisso com soluções concretas para o cotidiano da população.",
    Icon: HeartHandshake,
  },
  {
    text: "Sua experiência inclui participação em pautas ligadas à assistência social, ao acolhimento de famílias, à defesa de comunidades, ao diálogo com lideranças locais e à busca por melhorias em serviços e direitos básicos.",
    Icon: ShieldCheck,
  },
  {
    text: "Nas eleições municipais de 2024, colocou seu nome à disposição da cidade, ampliando sua rede de diálogo com lideranças, mulheres, jovens e comunidades da Região Tocantina.",
    Icon: Landmark,
  },
  {
    text: "Agora, apresenta sua pré-candidatura a deputada federal com o propósito de transformar escuta em prioridade, presença em trabalho e compromisso em resultado para o Maranhão.",
    Icon: Flag,
  },
];

const experience: Array<{ title: string; text: string; Icon: LucideIcon }> = [
  {
    title: "Liderança comunitária",
    text: "Atuação próxima das comunidades, com escuta ativa e defesa das necessidades reais da população.",
    Icon: Users,
  },
  {
    title: "Gestão social",
    text: "Experiência ligada à área social, com foco em acolhimento, atenção às famílias e compromisso com políticas públicas mais humanas.",
    Icon: HeartHandshake,
  },
  {
    title: "Defesa das comunidades",
    text: "Participação em pautas voltadas à melhoria de serviços, infraestrutura, dignidade e garantia de direitos.",
    Icon: ShieldCheck,
  },
  {
    title: "Diálogo e representação",
    text: "Construção de pontes com lideranças, mulheres, jovens e comunidades da Região Tocantina.",
    Icon: MessageCircle,
  },
];

export default function AboutPage() {
  return (
    <div className="bio-page">
      <section className="bio-open" aria-labelledby="bio-hero-title">
        <Container className="bio-open-shell">
          <div className="bio-open-grid">
            <div className="bio-visual">
              <div className="bio-visual-deco" aria-hidden="true">
                <span className="bio-blob" />
                <span className="bio-arc bio-arc--yellow" />
                <span className="bio-arc bio-arc--green" />
                <span className="bio-soft-blue" />
                <span className="bio-dots bio-dots--a" />
                <span className="bio-dots bio-dots--b" />
              </div>
              <Image
                src={BIO_PHOTO}
                alt={`${content.candidate.ballotName} — biografia`}
                width={1122}
                height={1402}
                priority
                unoptimized
                sizes="(max-width: 899px) 86vw, 52vw"
                className="bio-photo"
              />
            </div>

            <p className="bio-eyebrow">Quem é Luzia Mary</p>

            <h1 id="bio-hero-title" className="bio-title">
              Uma trajetória construída
              <br />
              ouvindo as pessoas e
              <br />
              <span>agindo pela comunidade.</span>
            </h1>

            <p className="bio-lead">
              Luzia Mary construiu sua história pública em Imperatriz a partir da escuta, da presença
              nas comunidades e do compromisso com quem mais precisa. Sua trajetória reúne liderança
              comunitária, experiência em gestão social e atuação próxima das famílias, sempre
              conectada à realidade da Região Tocantina e do Maranhão.
            </p>

            <p className="bio-place">
              Imperatriz <span aria-hidden>•</span> Região Tocantina <span aria-hidden>•</span> Maranhão
            </p>

            <ul className="bio-pillars" aria-label="Pilares">
              {pillars.map(({ title, text, Icon, tone }) => (
                <li key={title} className={`bio-pillar bio-pillar--${tone}`}>
                  <span className="bio-pillar-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={2.2} />
                  </span>
                  <span className="bio-pillar-copy">
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <div className="bio-open-curve" aria-hidden="true" />
      </section>

      <section className="bio-body" aria-label="Trajetória e experiência">
        <Container className="bio-body-grid">
          <div className="bio-timeline-col">
            <p className="bio-eyebrow">Trajetória</p>
            <ol className="bio-timeline">
              {trajectory.map(({ text, Icon }, index) => (
                <li key={text}>
                  <span className="bio-timeline-mark" aria-hidden="true">
                    <Icon size={16} strokeWidth={2.1} />
                  </span>
                  <p>
                    <span className="bio-timeline-num">{String(index + 1).padStart(2, "0")}</span>
                    {text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="bio-cards-col">
            <p className="bio-eyebrow">Experiência e atuação</p>
            <ul className="bio-cards">
              {experience.map(({ title, text, Icon }) => (
                <li key={title} className="bio-card">
                  <span className="bio-card-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bio-cta" aria-labelledby="bio-cta-title">
        <Container className="bio-cta-panel">
          <h2 id="bio-cta-title" className="bio-cta-title">
            Uma trajetória feita com
            <br />
            presença, diálogo e compromisso.
          </h2>
          <p className="bio-cta-lead">
            Conheça as propostas, acompanhe a caminhada e participe da construção de um projeto
            conectado à realidade de Imperatriz, da Região Tocantina e do Maranhão.
          </p>
          <div className="bio-cta-actions">
            <Link href="/propostas" className="bio-cta-btn bio-cta-btn--primary">
              Ver propostas
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
            </Link>
            <Link href="/demandas" className="bio-cta-btn bio-cta-btn--secondary">
              Participar
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
