import { desc } from "drizzle-orm";
import { AdminCheckbox, AdminFormShell } from "@/components/admin-form-shell";
import { AdminPageHeader } from "@/components/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getDb, hasDatabase } from "@/db";
import { posts } from "@/db/schema";
import { formatShortDate } from "@/lib/utils";
import { createPostAction } from "../actions";

export default async function AdminPostsPage(){const items=hasDatabase()?await getDb().select().from(posts).orderBy(desc(posts.publishedAt)).catch(()=>[]):[];return <><AdminPageHeader title="Notícias e posicionamentos" description="Mantenha título, resumo e texto coerentes. Dados, números e afirmações relevantes devem ter fonte e revisão antes da publicação."/><div className="grid gap-7 xl:grid-cols-[.8fr_1.2fr]"><AdminFormShell title="Nova publicação"><form action={createPostAction} className="grid gap-4"><F label="Título" name="title"/><F label="Slug opcional" name="slug" required={false}/><F label="Categoria" name="category" defaultValue="Notícias"/><div><Label>Resumo</Label><Textarea name="excerpt" required/></div><div><Label>Conteúdo</Label><Textarea name="body" required className="min-h-48"/></div><F label="URL de imagem opcional" name="imageUrl" type="url" required={false}/><AdminCheckbox name="published" label="Publicada"/><Button type="submit">Cadastrar publicação</Button></form></AdminFormShell><div className="grid gap-4 content-start">{items.map(item=><Card key={item.id}><CardContent className="p-5"><div className="flex items-center justify-between"><Badge>{item.category}</Badge><span className="text-xs text-black/35">{formatShortDate(item.publishedAt)}</span></div><h2 className="mt-3 text-lg font-bold">{item.title}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-black/50">{item.excerpt}</p></CardContent></Card>)}{items.length===0&&<Empty/>}</div></div></>};
function F(p:{label:string;name:string;type?:string;required?:boolean;defaultValue?:string}){return <div><Label>{p.label}</Label><Input name={p.name} type={p.type} defaultValue={p.defaultValue} required={p.required!==false}/></div>};function Empty(){return <Card><CardContent className="py-10 text-center text-sm text-black/40">Nenhuma publicação no banco.</CardContent></Card>}
