import { FileCheck2, Landmark, ReceiptText, Users } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Transparência" };
const areas = [
  { icon: ReceiptText, title: "Receitas e despesas", text: "Área preparada para publicar links oficiais, relatórios e explicações sobre a movimentação financeira da campanha." },
  { icon: Users, title: "Equipe e responsabilidades", text: "Identificação das funções essenciais e dos responsáveis legais, respeitando segurança e proteção de dados pessoais." },
  { icon: Landmark, title: "Compromissos e propostas", text: "Registro público das prioridades apresentadas, com possibilidade de atualização e justificativa." },
  { icon: FileCheck2, title: "Documentos oficiais", text: "Espaço para plano de governo, certidões, registros e documentos que devam ser disponibilizados publicamente." },
];

export default function TransparencyPage() {
  return <><PageHero eyebrow="Transparência" title="Informação pública de forma simples" description="Esta área foi preparada para concentrar documentos, compromissos, canais oficiais e prestações de contas, conforme a campanha avance e os dados sejam validados."/><Container className="py-14"><div className="grid gap-5 md:grid-cols-2">{areas.map(({icon:Icon,title,text})=><Card key={title}><CardContent className="pt-6"><Icon className="text-[var(--brand)]"/><h2 className="mt-5 text-xl font-bold">{title}</h2><p className="mt-3 text-sm leading-7 text-black/58">{text}</p><div className="mt-5 rounded-2xl bg-[var(--surface)] px-4 py-3 text-xs font-semibold text-black/45">Conteúdo aguardando validação e publicação oficial.</div></CardContent></Card>)}</div><div className="mt-8 rounded-[28px] bg-[#10251d] p-7 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--accent)]">Identificação</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><p className="text-xs text-white/40">CNPJ</p><p className="mt-1 font-semibold">{siteConfig.legal.cnpj}</p></div><div><p className="text-xs text-white/40">Responsável</p><p className="mt-1 font-semibold">{siteConfig.legal.responsible}</p></div></div></div></Container></>;
}
