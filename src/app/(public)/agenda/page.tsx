import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PublicPageHero } from "@/components/page-hero";
import { getEvents } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Agenda" };

export default async function AgendaPage() {
  const items = await getEvents();

  return (
    <>
      <PublicPageHero
        eyebrow="Agenda"
        title="Compromissos públicos"
        description="Encontros e agendas divulgados pela equipe. Eventos sujeitos a alteração."
      />
      <Container className="py-12">
        {items.length === 0 ? (
          <EmptyState
            title="Agenda em atualização"
            description="Novos compromissos públicos serão publicados aqui."
          />
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]">
                    <CalendarDays size={20} aria-hidden />
                  </span>
                  <div>
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
                      {item.status}
                    </span>
                    <h2 className="mt-3 font-display text-xl font-bold">{item.title}</h2>
                    {item.description && (
                      <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{item.description}</p>
                    )}
                    <div className="mt-4 grid gap-2 text-sm text-[var(--text-muted)]">
                      <span className="flex items-center gap-2">
                        <Clock3 size={15} aria-hidden /> {formatDate(item.startAt, true)}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={15} aria-hidden />
                        {item.location ? `${item.location} · ` : ""}
                        {item.city}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
