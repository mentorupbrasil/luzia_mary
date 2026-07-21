import { FileCheck2, Landmark, ReceiptText, Users } from "lucide-react";
import { Container } from "@/components/container";
import { PublicPageHero } from "@/components/page-hero";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Transparência" };

const areas = [
  {
    icon: ReceiptText,
    title: "Receitas e despesas",
    text: "Área preparada para publicar links oficiais, relatórios e explicações sobre a movimentação financeira da campanha.",
  },
  {
    icon: Users,
    title: "Equipe e responsabilidades",
    text: "Identificação das funções essenciais e dos responsáveis legais, respeitando segurança e proteção de dados pessoais.",
  },
  {
    icon: Landmark,
    title: "Compromissos e propostas",
    text: "Registro público das prioridades apresentadas, com possibilidade de atualização e justificativa.",
  },
  {
    icon: FileCheck2,
    title: "Documentos oficiais",
    text: "Espaço para plano de governo, certidões, registros e documentos que devam ser disponibilizados publicamente.",
  },
];

export default function TransparencyPage() {
  const hasLegalIds = Boolean(siteConfig.legal.cnpj || siteConfig.legal.responsible);

  return (
    <>
      <PublicPageHero
        eyebrow="Transparência"
        title="Informação pública de forma simples"
        description="Esta área concentra documentos, compromissos, canais oficiais e prestações de contas, conforme a campanha avance e os dados sejam validados."
      />

      <Container className="py-14 sm:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {areas.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="border border-[var(--border)] bg-[var(--surface)] p-6"
              style={{ borderRadius: "var(--radius)" }}
            >
              <Icon className="text-[var(--brand)]" strokeWidth={1.6} aria-hidden />
              <h2 className="mt-5 font-display text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{text}</p>
              <div
                className="mt-5 bg-[var(--surface-muted)] px-4 py-3 text-xs font-semibold text-[var(--text-muted)]"
                style={{ borderRadius: "calc(var(--radius) - 4px)" }}
              >
                Conteúdo aguardando validação e publicação oficial.
              </div>
            </div>
          ))}
        </div>

        {hasLegalIds && (
          <div
            className="mt-8 border border-[var(--border)] bg-[var(--brand-dark)] p-7 text-white"
            style={{ borderRadius: "var(--radius)" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              Identificação
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {siteConfig.legal.cnpj && (
                <div>
                  <p className="text-xs text-white/40">CNPJ</p>
                  <p className="mt-1 font-semibold">{siteConfig.legal.cnpj}</p>
                </div>
              )}
              {siteConfig.legal.responsible && (
                <div>
                  <p className="text-xs text-white/40">Responsável</p>
                  <p className="mt-1 font-semibold">{siteConfig.legal.responsible}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
