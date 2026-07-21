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
import { events } from "@/db/schema";
import { formatDate } from "@/lib/utils";
import { createEventAction } from "../actions";

export default async function AdminAgendaPage(){const items=hasDatabase()?await getDb().select().from(events).orderBy(asc(events.startAt)).catch(()=>[]):[];return <><AdminPageHeader title="Agenda pública" description="Publique apenas compromissos confirmados para divulgação e atualize rapidamente mudanças de horário ou local."/><div className="grid gap-7 xl:grid-cols-[.8fr_1.2fr]"><AdminFormShell title="Novo evento"><form action={createEventAction} className="grid gap-4"><F label="Título" name="title"/><div><Label>Descrição</Label><Textarea name="description"/></div><F label="Município" name="city" defaultValue="Imperatriz"/><F label="Local" name="location"/><F label="Início" name="startAt" type="datetime-local"/><F label="Fim opcional" name="endAt" type="datetime-local" required={false}/><div><Label>Status</Label><Select name="status"><option>confirmado</option><option>a confirmar</option><option>adiado</option><option>cancelado</option></Select></div><AdminCheckbox name="public" label="Evento público"/><Button type="submit">Cadastrar evento</Button></form></AdminFormShell><div className="grid gap-4 content-start">{items.map(item=><Card key={item.id}><CardContent className="p-5"><Badge tone={item.status==="confirmado"?"success":"warning"}>{item.status}</Badge><h2 className="mt-3 text-lg font-bold">{item.title}</h2><p className="mt-2 text-sm text-black/50">{formatDate(item.startAt,true)} · {item.city}</p></CardContent></Card>)}{items.length===0&&<Empty/>}</div></div></>};
function F(p:{label:string;name:string;type?:string;defaultValue?:string;required?:boolean}){return <div><Label>{p.label}</Label><Input name={p.name} type={p.type} defaultValue={p.defaultValue} required={p.required!==false}/></div>};function Empty(){return <Card><CardContent className="py-10 text-center text-sm text-black/40">Nenhum evento no banco.</CardContent></Card>}
