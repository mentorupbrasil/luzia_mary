import Link from "next/link";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PublicPageHero } from "@/components/page-hero";
import { getFactChecks } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

export const metadata = { title: "Verdade ou boato" };

function verdictClass(verdict: string) {
  const value = verdict.toLowerCase();
  if (value.includes("falso")) return "bg-red-100 text-red-800";
  if (value.includes("verdade") || value.includes("verdadeiro")) return "bg-emerald-100 text-emerald-800";
  return "bg-amber-100 text-amber-900";
}

export default async function FactCheckPage() {
  const items = await getFactChecks();

  return (
    <>
      <PublicPageHero
        eyebrow="Verificação"
        title="Verdade ou boato"
        description="Consulte esclarecimentos oficiais e confirme mensagens antes de compartilhar."
      />
      <Container className="py-12">
        {items.length === 0 ? (
          <EmptyState
            title="Nenhuma checagem publicada"
            description="Quando necessário, os esclarecimentos oficiais aparecerão aqui."
          />
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${verdictClass(item.verdict)}`}>
                    {item.verdict}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{formatShortDate(item.publishedAt)}</span>
                </div>
                <h2 className="mt-5 font-display text-xl font-bold tracking-[-0.02em]">“{item.claim}”</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{item.explanation}</p>
                {Array.isArray(item.sources) && item.sources.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-semibold"
                      >
                        {source.label} <ExternalLink size={12} aria-hidden />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-4 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <AlertTriangle className="shrink-0" aria-hidden />
          <div>
            <p className="text-sm leading-7">
              Desconfie de pedidos de dinheiro ou formulários por canais não oficiais. A campanha não solicita senhas ou dados bancários por mensagem.
            </p>
            <Link href="/demandas" className="mt-3 inline-block text-sm font-bold underline">
              Enviar uma dúvida
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
