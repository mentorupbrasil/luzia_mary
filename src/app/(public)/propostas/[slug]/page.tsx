import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { IconBox } from "@/components/icon-box";
import { Badge } from "@/components/ui/badge";
import { getProposalBySlug, getProposals } from "@/lib/data";

export async function generateStaticParams() { const items = await getProposals(); return items.map(item => ({ slug: item.slug })); }

export default async function ProposalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proposal = await getProposalBySlug(slug);
  if (!proposal) notFound();
  return <><section className="border-b border-black/[.06] py-14"><Container><Link href="/propostas" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]"><ArrowLeft size={16}/> Voltar às propostas</Link><div className="mt-8 flex items-center gap-4"><IconBox name={proposal.icon}/><Badge tone="brand">{proposal.category}</Badge></div><h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-.045em] sm:text-6xl">{proposal.title}</h1><p className="mt-6 max-w-3xl text-xl leading-8 text-black/60">{proposal.summary}</p></Container></section><Container className="grid gap-10 py-14 lg:grid-cols-[1fr_.4fr]"><article className="prose-public"><p>{proposal.body}</p><h2>Como esta proposta deve funcionar</h2><ul><li>Definição clara do problema e do resultado esperado.</li><li>Uso de instrumentos compatíveis com o mandato federal: legislação, fiscalização, orçamento e articulação institucional.</li><li>Publicação de indicadores e atualizações em linguagem acessível.</li><li>Revisão com base em evidências e contribuições recebidas.</li></ul></article><aside><div className="sticky top-28 rounded-[28px] bg-[#10251d] p-6 text-white"><CheckCircle2 className="text-[var(--accent)]"/><h2 className="mt-4 text-xl font-bold">Ajude a aperfeiçoar</h2><p className="mt-3 text-sm leading-7 text-white/60">Envie uma experiência, necessidade ou sugestão relacionada a este tema.</p><Link href={`/demandas?tema=${encodeURIComponent(proposal.category)}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-bold text-[#10251d]">Participar <ArrowRight size={16}/></Link></div></aside></Container></>;
}
