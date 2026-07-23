import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  EyeOff,
  FileText,
  LockKeyhole,
  MapPin,
  MessageCircle,
  ShieldCheck,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { DemandForm } from "@/components/demand-form";
import { getPublicDemandStats } from "@/lib/data";
import { resolveDemandCategory } from "@/lib/demand-category";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Participe",
  description:
    "Envie uma demanda, sugestão ou proposta da sua comunidade e receba um protocolo de registro.",
  path: "/participe",
});

const heroSignals = [
  { label: "Envio seguro", Icon: ShieldCheck },
  { label: "Protocolo de acompanhamento", Icon: FileText },
  { label: "Dados protegidos", Icon: LockKeyhole },
] as const;

const steps: Array<{
  number: string;
  title: string;
  text: string;
  Icon: LucideIcon;
  tone: "yellow" | "green" | "blue";
}> = [
  {
    number: "01",
    title: "Conte o que está acontecendo",
    text: "Descreva a necessidade, o problema ou a sugestão da sua comunidade com clareza.",
    Icon: MessageCircle,
    tone: "yellow",
  },
  {
    number: "02",
    title: "A equipe registra e organiza",
    text: "A contribuição é classificada por tema e localidade para facilitar o encaminhamento.",
    Icon: MapPin,
    tone: "green",
  },
  {
    number: "03",
    title: "Você recebe um protocolo",
    text: "Guarde o número gerado para identificar e acompanhar o registro junto à equipe.",
    Icon: CheckCircle2,
    tone: "blue",
  },
];

const trustItems: Array<{ title: string; Icon: LucideIcon }> = [
  { title: "Dados não publicados", Icon: EyeOff },
  { title: "Uso restrito ao atendimento", Icon: UserRoundCheck },
  { title: "Protocolo após o envio", Icon: FileText },
  { title: "Solicitação de correção ou exclusão", Icon: ShieldCheck },
];

export default async function ParticipatePage({
  searchParams,
}: {
  searchParams: Promise<{ tema?: string }>;
}) {
  const [{ tema }, stats] = await Promise.all([searchParams, getPublicDemandStats()]);
  const defaultCategory = resolveDemandCategory(tema) ?? "";

  return (
    <div className="participate-page">
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Participe", path: "/participe" }])} />
      <section className="participate-hero" aria-labelledby="participate-hero-title">
        <div className="participate-hero-atmosphere" aria-hidden>
          <span className="participate-hero-glow participate-hero-glow--blue" />
          <span className="participate-hero-glow participate-hero-glow--green" />
          <span className="participate-hero-arc participate-hero-arc--1" />
          <span className="participate-hero-arc participate-hero-arc--2" />
        </div>

        <Container className="participate-shell">
          <div className="participate-hero-grid">
            <div className="participate-hero-copy">
              <p className="participate-hero-eyebrow">PARTICIPE</p>
              <h1 id="participate-hero-title" className="participate-hero-title">
                Sua voz ajuda a transformar
                <br />
                necessidades em <em>prioridades.</em>
              </h1>
              <p className="participate-hero-lead">
                Envie uma demanda, sugestão ou proposta da sua comunidade. A equipe registra,
                organiza e acompanha cada contribuição com segurança e transparência.
              </p>
              <ul className="participate-signals">
                {heroSignals.map(({ label, Icon }) => (
                  <li key={label}>
                    <Icon size={16} strokeWidth={2.2} aria-hidden />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="participate-hero-visual" aria-hidden>
              <div className="participate-orbit">
                <span className="participate-orbit-core">
                  <MessageCircle size={28} strokeWidth={1.8} />
                </span>
                <span className="participate-orbit-node participate-orbit-node--1">
                  <MapPin size={18} />
                </span>
                <span className="participate-orbit-node participate-orbit-node--2">
                  <FileText size={18} />
                </span>
                <span className="participate-orbit-node participate-orbit-node--3">
                  <CheckCircle2 size={18} />
                </span>
                <span className="participate-orbit-ring" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="participate-steps" aria-labelledby="participate-steps-title">
        <Container className="participate-shell">
          <div className="participate-section-head">
            <h2 id="participate-steps-title" className="participate-section-title">
              Como funciona
            </h2>
          </div>
          <div className="participate-steps-grid">
            {steps.map((step) => (
              <article
                key={step.number}
                className={`participate-step participate-step--${step.tone}`}
              >
                <div className="participate-step-top">
                  <span className="participate-step-number">{step.number}</span>
                  <span className="participate-step-icon" aria-hidden>
                    <step.Icon size={18} strokeWidth={2.2} />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="participate-main" aria-label="Formulário de participação">
        <Container className="participate-shell">
          <div className="participate-layout">
            <div className="participate-form-panel">
              <div className="participate-form-intro">
                <h2 className="participate-form-title">Envie sua contribuição</h2>
                <p className="participate-form-lead">
                  Preencha as informações abaixo. Campos com asterisco são obrigatórios.
                </p>
              </div>
              <DemandForm defaultCategory={defaultCategory} />
            </div>

            <aside className="participate-aside">
              <div className="participate-trust">
                <p className="participate-trust-eyebrow">PRIVACIDADE</p>
                <h2 className="participate-trust-title">Sua contribuição está protegida</h2>
                <p className="participate-trust-text">
                  As informações enviadas são utilizadas para registrar, organizar e responder sua
                  demanda. Os dados pessoais não serão exibidos publicamente.
                </p>
                <ul className="participate-trust-list">
                  {trustItems.map(({ title, Icon }) => (
                    <li key={title}>
                      <span aria-hidden>
                        <Icon size={16} strokeWidth={2.2} />
                      </span>
                      {title}
                    </li>
                  ))}
                </ul>
                <Link href="/privacidade" className="participate-trust-link">
                  LER POLÍTICA DE PRIVACIDADE
                </Link>
              </div>

              <div className="participate-tips">
                <h3>Antes de enviar</h3>
                <ul>
                  <li>não informe senhas;</li>
                  <li>evite documentos pessoais;</li>
                  <li>não envie dados sensíveis de terceiros;</li>
                  <li>descreva o problema de forma objetiva.</li>
                </ul>
              </div>

              {(stats.total > 0 || stats.cities > 0) && (
                <div className="participate-stats">
                  <p className="participate-trust-eyebrow">PARTICIPAÇÃO</p>
                  <div className="participate-stats-grid">
                    {stats.total > 0 ? (
                      <div>
                        <strong>{stats.total}</strong>
                        <span>demandas registradas</span>
                      </div>
                    ) : null}
                    {stats.cities > 0 ? (
                      <div>
                        <strong>{stats.cities}</strong>
                        <span>municípios</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>

      <section className="participate-closing" aria-labelledby="participate-closing-title">
        <Container className="participate-shell">
          <div className="participate-closing-panel">
            <div>
              <h2 id="participate-closing-title" className="participate-closing-title">
                A participação começa pela escuta.
              </h2>
              <p className="participate-closing-text">
                Cada contribuição ajuda a compreender melhor as necessidades de Imperatriz, da
                Região Tocantina e do Maranhão.
              </p>
            </div>
            <Link href="/propostas" className="participate-closing-btn">
              CONHECER AS BANDEIRAS
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
