import { FileCheck2, Landmark, ReceiptText, Users } from "lucide-react";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PublicPageHero } from "@/components/page-hero";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Transparência",
  description:
    "Espaço para documentos, compromissos e prestações de contas da pré-candidatura de Luzia Mary.",
  path: "/transparencia",
});

const areas = [
  { icon: ReceiptText, title: "Receitas e despesas", text: "Espaço para links oficiais, relatórios e explicações financeiras da campanha." },
  { icon: Users, title: "Equipe e responsabilidades", text: "Identificação das funções essenciais e responsáveis legais, com proteção de dados." },
  { icon: Landmark, title: "Compromissos e bandeiras", text: "Registro público das prioridades apresentadas, com atualização e justificativa." },
  { icon: FileCheck2, title: "Documentos oficiais", text: "Área para documentos que devam ser disponibilizados publicamente." },
];

export default function TransparencyPage() {
  const hasLegalIds = Boolean(siteConfig.legal.cnpj || siteConfig.legal.responsible);

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Transparência", path: "/transparencia" }])} />
      <PublicPageHero
        eyebrow="Transparência"
        title="Informação pública, de forma simples"
        description="Documentos, compromissos e prestações de contas serão publicados aqui conforme a campanha avance."
      />
      <Container className="py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {areas.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6">
              <Icon className="text-[var(--brand)]" strokeWidth={1.6} aria-hidden />
              <h2 className="mt-4 font-display text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{text}</p>
              <p className="mt-4 text-xs font-semibold text-[var(--text-muted)]">
                Aguardando validação e publicação oficial.
              </p>
            </div>
          ))}
        </div>

        {hasLegalIds && (
          <div className="mt-6 rounded-[1.5rem] bg-[var(--brand-dark)] p-6 text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Identificação</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
