import { desc } from "drizzle-orm";
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
import { factChecks } from "@/db/schema";
import { createFactCheckAction } from "../actions";

export default async function AdminFactChecksPage(){const items=hasDatabase()?await getDb().select().from(factChecks).orderBy(desc(factChecks.publishedAt)).catch(()=>[]):[];return <><AdminPageHeader title="Verdade ou boato" description="Publique esclarecimentos somente após verificar fatos e fontes. Evite classificações absolutas quando a evidência não for conclusiva."/><div className="grid gap-7 xl:grid-cols-[.8fr_1.2fr]"><AdminFormShell title="Nova checagem"><form action={createFactCheckAction} className="grid gap-4"><div><Label>Alegação ou mensagem</Label><Textarea name="claim" required/></div><F label="Slug opcional" name="slug" required={false}/><div><Label>Veredito</Label><Select name="verdict"><option>Verdadeiro</option><option>Falso</option><option>Impreciso</option><option>Fora de contexto</option><option>Atenção</option></Select></div><div><Label>Explicação</Label><Textarea name="explanation" required className="min-h-36"/></div><F label="Nome da fonte" name="sourceLabel" required={false}/><F label="Link da fonte" name="sourceUrl" type="url" required={false}/><AdminCheckbox name="published" label="Publicada"/><Button type="submit">Publicar checagem</Button></form></AdminFormShell><div className="grid gap-4 content-start">{items.map(item=><Card key={item.id}><CardContent className="p-5"><Badge tone={item.verdict==="Falso"?"danger":"warning"}>{item.verdict}</Badge><h2 className="mt-3 text-lg font-bold">{item.claim}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-black/50">{item.explanation}</p></CardContent></Card>)}{items.length===0&&<Empty/>}</div></div></>};
function F(p:{label:string;name:string;type?:string;required?:boolean}){return <div><Label>{p.label}</Label><Input name={p.name} type={p.type} required={p.required!==false}/></div>};function Empty(){return <Card><CardContent className="py-10 text-center text-sm text-black/40">Nenhuma checagem no banco.</CardContent></Card>}
