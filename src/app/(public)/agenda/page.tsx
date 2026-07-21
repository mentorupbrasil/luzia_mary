import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getEvents } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Agenda" };

export default async function AgendaPage() {
  const items = await getEvents();
  return <><PageHero eyebrow="Agenda pública" title="Onde a candidata estará" description="Compromissos públicos, encontros e transmissões divulgados em um único lugar. Eventos sujeitos a alteração devem ser atualizados pela equipe."/><Container className="py-14">{items.length === 0 ? <EmptyState title="Agenda em atualização" description="Novos compromissos públicos serão publicados aqui."/> : <div className="grid gap-5 lg:grid-cols-2">{items.map(item=><Card key={item.id}><CardContent className="p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]"><CalendarDays size={22}/></span><Badge tone={item.status === "confirmado" ? "success" : "warning"}>{item.status}</Badge></div><h2 className="mt-5 text-2xl font-bold tracking-[-.03em]">{item.title}</h2>{item.description && <p className="mt-3 text-sm leading-7 text-black/58">{item.description}</p>}<div className="mt-6 grid gap-3 text-sm text-black/60"><span className="flex items-center gap-3"><Clock3 size={17} className="text-[var(--brand)]"/>{formatDate(item.startAt, true)}</span><span className="flex items-center gap-3"><MapPin size={17} className="text-[var(--brand)]"/>{item.location ? `${item.location} · ` : ""}{item.city}</span></div></CardContent></Card>)}</div>}</Container></>;
}
