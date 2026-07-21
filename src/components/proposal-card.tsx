import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { IconBox } from "./icon-box";

export function ProposalCard({ proposal }: { proposal: { slug: string; title: string; summary: string; category: string; icon?: string | null } }) {
  return <Card className="group h-full transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(27,45,38,.13)]">
    <CardHeader className="flex flex-row items-start justify-between gap-4"><IconBox name={proposal.icon}/><Badge tone="brand">{proposal.category}</Badge></CardHeader>
    <CardContent><h3 className="text-xl font-bold tracking-[-.025em]">{proposal.title}</h3><p className="mt-3 text-sm leading-7 text-black/58">{proposal.summary}</p><Link href={`/propostas/${proposal.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]">Ver proposta <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></Link></CardContent>
  </Card>;
}
