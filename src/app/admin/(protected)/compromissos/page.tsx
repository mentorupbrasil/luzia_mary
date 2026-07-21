import { asc } from "drizzle-orm";
import { AdminCheckbox, AdminFormShell } from "@/components/admin-form-shell";
import { AdminPageHeader } from "@/components/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getDb, hasDatabase } from "@/db";
import { commitments } from "@/db/schema";
import { createCommitmentAction } from "../actions";

export default async function AdminCommitmentsPage(){const items=hasDatabase()?await getDb().select().from(commitments).orderBy(asc(commitments.sortOrder)).catch(()=>[]):[];return <><AdminPageHeader title="Compromissos" description="Defina metas mensuráveis. O percentual representa a preparação ou execução e deve ser atualizado com critério."/><div className="grid gap-7 xl:grid-cols-[.8fr_1.2fr]"><AdminFormShell title="Novo compromisso"><form action={createCommitmentAction} className="grid gap-4"><F label="Título" name="title"/><div><Label>Resumo</Label><Textarea name="summary" required/></div><F label="Indicador" name="metric"/><F label="Meta" name="target"/><div><Label>Status</Label><Select name="status"><option>proposto</option><option>em preparação</option><option>em andamento</option><option>concluído</option></Select></div><F label="Progresso (%)" name="progress" type="number" defaultValue="0"/><F label="Ordem" name="sortOrder" type="number" defaultValue="0"/><AdminCheckbox name="published" label="Publicado"/><Button type="submit">Cadastrar compromisso</Button></form></AdminFormShell><div className="grid gap-4 content-start">{items.map(item=><Card key={item.id}><CardContent className="p-5"><div className="flex justify-between gap-4"><div><Badge tone="warning">{item.status}</Badge><h2 className="mt-3 text-lg font-bold">{item.title}</h2><p className="mt-2 text-sm text-black/50">{item.metric} · {item.target}</p></div><span className="font-bold text-[var(--brand)]">{item.progress}%</span></div></CardContent></Card>)}{items.length===0&&<Empty/>}</div></div></>};
function F(p:{label:string;name:string;type?:string;defaultValue?:string}){return <div><Label>{p.label}</Label><Input name={p.name} type={p.type} defaultValue={p.defaultValue} required/></div>};function Empty(){return <Card><CardContent className="py-10 text-center text-sm text-black/40">Nenhum compromisso no banco.</CardContent></Card>}
