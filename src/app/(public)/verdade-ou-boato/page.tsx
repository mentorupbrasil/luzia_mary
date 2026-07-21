import { AlertTriangle, ExternalLink, SearchCheck } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getFactChecks } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

export const metadata = { title: "Verdade ou boato" };

export default async function FactCheckPage() {
  const items = await getFactChecks();
  return <><PageHero eyebrow="Informação oficial" title="Verdade ou boato" description="Consulte esclarecimentos publicados pela equipe e confirme mensagens antes de compartilhar. Esta área deve sempre citar fontes quando a checagem envolver dados externos."/><Container className="py-14">{items.length === 0 ? <EmptyState title="Nenhuma checagem publicada" description="Quando necessário, os esclarecimentos oficiais aparecerão aqui."/> : <div className="grid gap-5">{items.map(item=><Card key={item.id}><CardContent className="p-6 sm:p-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]"><SearchCheck size={21}/></span><Badge tone={item.verdict.toLowerCase().includes("falso") ? "danger" : item.verdict.toLowerCase().includes("verdade") ? "success" : "warning"}>{item.verdict}</Badge></div><span className="text-xs font-semibold uppercase tracking-wider text-black/35">{formatShortDate(item.publishedAt)}</span></div><h2 className="mt-6 text-xl font-bold tracking-[-.025em] sm:text-2xl">“{item.claim}”</h2><p className="mt-4 text-sm leading-7 text-black/60">{item.explanation}</p>{Array.isArray(item.sources) && item.sources.length > 0 && <div className="mt-6 border-t border-black/[.06] pt-5"><p className="text-xs font-bold uppercase tracking-wider text-black/40">Fontes</p><div className="mt-3 flex flex-wrap gap-2">{item.sources.map((source, index)=><a key={index} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-xs font-semibold hover:text-[var(--brand)]">{source.label}<ExternalLink size={13}/></a>)}</div></div>}</CardContent></Card>)}</div>}<div className="mt-8 flex gap-4 rounded-[28px] bg-amber-50 p-6 text-amber-950"><AlertTriangle className="shrink-0"/><p className="text-sm leading-7">Desconfie de pedidos de dinheiro, links encurtados ou formulários enviados por canais não divulgados oficialmente. A campanha nunca deve solicitar senhas, códigos de autenticação ou dados bancários por mensagem.</p></div></Container></>;
}
