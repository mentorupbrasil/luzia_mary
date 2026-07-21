import { asc } from "drizzle-orm";
import { AdminFormShell, AdminCheckbox } from "@/components/admin-form-shell";
import { AdminPageHeader } from "@/components/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getDb, hasDatabase } from "@/db";
import { proposals } from "@/db/schema";
import { createProposalAction } from "../actions";

export default async function AdminProposalsPage() {
 const items=hasDatabase()?await getDb().select().from(proposals).orderBy(asc(proposals.sortOrder)).catch(()=>[]):[];
 return <><AdminPageHeader title="Propostas" description="Cadastre conteúdos objetivos, compatíveis com as atribuições de uma deputada federal e revisados pela coordenação e pelo jurídico."/><div className="grid gap-7 xl:grid-cols-[.8fr_1.2fr]"><AdminFormShell title="Nova proposta"><form action={createProposalAction} className="grid gap-4"><Field label="Título" name="title"/><Field label="Slug opcional" name="slug"/><Field label="Categoria" name="category"/><Field label="Ícone" name="icon" placeholder="heart-pulse, route, landmark..."/><div><Label>Resumo</Label><Textarea name="summary" required/></div><div><Label>Texto principal</Label><Textarea name="body" required className="min-h-44"/></div><Field label="Ordem" name="sortOrder" type="number" defaultValue="0"/><div className="flex flex-wrap gap-5"><AdminCheckbox name="featured" label="Destaque" defaultChecked={false}/><AdminCheckbox name="published" label="Publicada"/></div><Button type="submit">Cadastrar proposta</Button></form></AdminFormShell><div className="grid gap-4 content-start">{items.map(item=><Card key={item.id}><CardContent className="p-5"><div className="flex items-start justify-between gap-4"><div><Badge tone="brand">{item.category}</Badge><h2 className="mt-3 text-lg font-bold">{item.title}</h2><p className="mt-2 text-sm leading-6 text-black/50">{item.summary}</p></div><span className="text-xs font-bold text-black/30">#{item.sortOrder}</span></div></CardContent></Card>)}{items.length===0&&<Empty/>}</div></div></>;
}
function Field(props:{label:string;name:string;type?:string;placeholder?:string;defaultValue?:string}){return <div><Label>{props.label}</Label><Input name={props.name} type={props.type} placeholder={props.placeholder} defaultValue={props.defaultValue} required={props.name!=="slug"&&props.name!=="icon"}/></div>}; function Empty(){return <Card><CardContent className="py-10 text-center text-sm text-black/40">Nenhuma proposta no banco.</CardContent></Card>}
