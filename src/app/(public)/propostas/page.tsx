import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProposalCard } from "@/components/proposal-card";
import { getProposals } from "@/lib/data";

export const metadata = { title: "Propostas" };

export default async function ProposalsPage() {
  const proposals = await getProposals();
  const categories = [...new Set(proposals.map(item => item.category))];
  return <><PageHero eyebrow="Propostas" title="Prioridades construídas para serem acompanhadas" description="Mais do que títulos: cada proposta apresenta um caminho de atuação compatível com o mandato de deputada federal e poderá evoluir com contribuições da população."/><Container className="py-14"><div className="mb-8 flex flex-wrap gap-2">{categories.map(category=><span key={category} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/60">{category}</span>)}</div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{proposals.map(proposal=><ProposalCard key={proposal.id} proposal={proposal}/>)}</div></Container></>;
}
