import { desc } from "drizzle-orm";
import { AdminPageHeader } from "@/components/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getDb, hasDatabase } from "@/db";
import { demands } from "@/db/schema";
import { formatDate } from "@/lib/utils";
import { updateDemandAction } from "../actions";

export default async function AdminDemandsPage() {
  const items = hasDatabase() ? await getDb().select().from(demands).orderBy(desc(demands.createdAt)).limit(100).catch(()=>[]) : [];
  return <><AdminPageHeader title="Demandas recebidas" description="Analise os registros, atribua prioridade e mantenha notas internas. Dados pessoais não devem ser publicados sem base legal e necessidade."/><div className="grid gap-5">{items.map(item=><Card key={item.id}><CardContent className="p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-xs font-bold text-[var(--brand)]">{item.protocol}</span><Badge tone="warning">{item.status}</Badge><Badge>{item.priority}</Badge></div><h2 className="mt-3 text-xl font-bold">{item.title}</h2><p className="mt-2 text-sm text-black/50">{item.category} · {item.city}{item.neighborhood ? ` / ${item.neighborhood}` : ""} · {formatDate(item.createdAt,true)}</p></div><div className="text-sm text-black/45"><p>{item.name}</p><p>{item.email || item.phone || "Sem contato informado"}</p></div></div><p className="mt-5 rounded-2xl bg-[var(--surface)] p-4 text-sm leading-7 text-black/65">{item.description}</p><form action={updateDemandAction} className="mt-5 grid gap-4 lg:grid-cols-[.6fr_.6fr_1fr_1.5fr_auto]"><input type="hidden" name="id" value={item.id}/><div><Label>Status</Label><Select name="status" defaultValue={item.status}><option value="recebida">Recebida</option><option value="em análise">Em análise</option><option value="encaminhada">Encaminhada</option><option value="respondida">Respondida</option><option value="arquivada">Arquivada</option></Select></div><div><Label>Prioridade</Label><Select name="priority" defaultValue={item.priority}><option value="baixa">Baixa</option><option value="normal">Normal</option><option value="alta">Alta</option><option value="urgente">Urgente</option></Select></div><div><Label>Responsável</Label><Input name="assignedTo" defaultValue={item.assignedTo || ""}/></div><div><Label>Notas internas</Label><Textarea name="internalNotes" defaultValue={item.internalNotes || ""} className="min-h-12"/></div><div className="flex items-end"><Button type="submit">Salvar</Button></div></form></CardContent></Card>)}{items.length===0&&<Card><CardContent className="py-12 text-center text-sm text-black/40">Nenhuma demanda cadastrada ou banco ainda não conectado.</CardContent></Card>}</div></>;
}
