import Link from "next/link";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PublicPageHero } from "@/components/page-hero";
import { getFactChecks } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

export const metadata = { title: "Verdade ou boato" };

function verdictTone(verdict: string) {
  const value = verdict.toLowerCase();
  if (value.includes("falso")) return "bg-red-100 text-red-800 border-red-200";
  if (value.includes("verdade") || value.includes("verdadeiro")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (value.includes("impreciso") || value.includes("fora de contexto")) return "bg-amber-100 text-amber-900 border-amber-200";
  return "bg-[var(--accent-soft)] text-[var(--ink)] border-[var(--border)]";
}

export default async function FactCheckPage() {
  const items = await getFactChecks();

  return (
    <>
      <PublicPageHero
        eyebrow="Central de verificação"
        title="Verdade ou boato"
        description="Consulte esclarecimentos publicados pela equipe e confirme mensagens antes de compartilhar. Fontes são citadas quando a checagem envolve dados externos."
      />

      <Container className="py-14 sm:py-16">
        {items.length === 0 ? (
          <EmptyState
            title="Nenhuma checagem publicada"
            description="Quando necessário, os esclarecimentos oficiais aparecerão aqui."
          />
        ) : (
          <div className="grid gap-5">
            {items.map((item) => (
              <article
                key={item.id}
                className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <span
                    className={`inline-flex w-fit border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${verdictTone(item.verdict)}`}
                    style={{ borderRadius: "999px" }}
                  >
                    {item.verdict}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {formatShortDate(item.publishedAt)}
                  </span>
                </div>
                <h2 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                  “{item.claim}”
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">{item.explanation}</p>
                {Array.isArray(item.sources) && item.sources.length > 0 && (
                  <div className="mt-6 border-t border-[var(--border)] pt-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Fontes
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-[var(--surface-muted)] px-4 py-2 text-xs font-semibold hover:text-[var(--brand)]"
                          style={{ borderRadius: "999px" }}
                        >
                          {source.label}
                          <ExternalLink size={13} aria-hidden />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        <div
          className="mt-10 flex gap-4 border border-amber-200 bg-amber-50 p-6 text-amber-950"
          style={{ borderRadius: "var(--radius)" }}
        >
          <AlertTriangle className="shrink-0" aria-hidden />
          <div>
            <p className="text-sm leading-7">
              Desconfie de pedidos de dinheiro, links encurtados ou formulários enviados por canais
              não divulgados oficialmente. A campanha nunca deve solicitar senhas, códigos de
              autenticação ou dados bancários por mensagem.
            </p>
            <Link href="/demandas" className="mt-4 inline-block text-sm font-bold underline">
              Enviar uma dúvida para verificação
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
