import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { content } from "@/config/site";

export const metadata = { title: "Biografia" };

const BIO_PHOTO = "/images/luzia-mary-biografia.png";

const pillars: Array<{ label: string; Icon: LucideIcon }> = [
  { label: "Escuta", Icon: MessageCircle },
  { label: "Presença", Icon: MapPin },
  { label: "Compromisso", Icon: HeartHandshake },
];

const trajectory = [
  "Antes de disputar eleições, Luzia Mary já participava da vida pública pela base, ouvindo famílias, acompanhando demandas reais e defendendo melhorias para as comunidades de Imperatriz.",
  "Ao longo de sua caminhada, consolidou uma atuação marcada pela proximidade com as pessoas, pela defesa da dignidade social e pelo compromisso com soluções concretas para o cotidiano da população.",
  "Sua experiência inclui participação em pautas ligadas à assistência social, ao acolhimento de famílias, à defesa de comunidades, ao diálogo com lideranças locais e à busca por melhorias em serviços e direitos básicos.",
  "Nas eleições municipais de 2024, colocou seu nome à disposição da cidade, ampliando ainda mais sua rede de diálogo com lideranças, mulheres, jovens e comunidades da Região Tocantina.",
  "Agora, apresenta sua pré-candidatura a deputada federal com o propósito de transformar escuta em prioridade, presença em trabalho e compromisso em resultado para o Maranhão.",
] as const;

const experience: Array<{
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
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
      <section className="bio-hero" aria-labelledby="bio-hero-title">
        <Container className="bio-hero-grid">
          <div className="bio-photo-col">
            <figure className="bio-photo-stage">
              <span className="bio-photo-glow" aria-hidden />
              <span className="bio-photo-arc" aria-hidden />
              <span className="bio-photo-dot" aria-hidden />
              <Image
                src={BIO_PHOTO}
                alt={`${content.candidate.ballotName} — biografia`}
                width={1024}
                height={1536}
                priority
                unoptimized
                sizes="(max-width: 768px) 88vw, (max-width: 1200px) 42vw, 460px"
                className="bio-photo-img"
              />
            </figure>
          </div>

          <div className="bio-hero-copy">
            <p className="bio-eyebrow">Quem é Luzia Mary</p>
            <h1 id="bio-hero-title" className="bio-hero-title">
              Uma trajetória construída ouvindo as pessoas e agindo pela comunidade.
            </h1>
            <p className="bio-hero-lead">
              Luzia Mary construiu sua história pública em Imperatriz a partir da escuta, da presença
              nas comunidades e do compromisso com quem mais precisa. Sua trajetória reúne liderança
              comunitária, experiência em gestão social e atuação próxima das famílias, sempre
              conectada à realidade da Região Tocantina e do Maranhão.
            </p>
            <p className="bio-hero-place">
              Imperatriz <span aria-hidden>•</span> Região Tocantina <span aria-hidden>•</span> Maranhão
            </p>
            <ul className="bio-pillars" aria-label="Pilares">
              {pillars.map(({ label, Icon }) => (
                <li key={label}>
                  <Icon size={16} strokeWidth={2.2} aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bio-trajectory" aria-labelledby="bio-trajectory-title">
        <Container className="bio-trajectory-inner">
          <p className="bio-eyebrow">Caminhada</p>
          <h2 id="bio-trajectory-title" className="bio-section-title">
            Trajetória
          </h2>
          <div className="bio-trajectory-copy">
            {trajectory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bio-experience" aria-labelledby="bio-experience-title">
        <Container>
          <div className="bio-experience-header">
            <p className="bio-eyebrow">Atuação</p>
            <h2 id="bio-experience-title" className="bio-section-title">
              Experiência e atuação
            </h2>
          </div>
          <ul className="bio-experience-grid">
            {experience.map(({ title, text, Icon }) => (
              <li key={title} className="bio-experience-card">
                <span className="bio-experience-icon" aria-hidden>
                  <Icon size={22} strokeWidth={1.9} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bio-cta" aria-labelledby="bio-cta-title">
        <div className="bio-cta-bg" aria-hidden>
          <span className="bio-cta-glow" />
          <span className="bio-cta-arc" />
          <span className="bio-cta-dots" />
        </div>
        <Container className="bio-cta-inner">
          <h2 id="bio-cta-title" className="bio-cta-title">
            Uma trajetória feita com presença, diálogo e compromisso.
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
