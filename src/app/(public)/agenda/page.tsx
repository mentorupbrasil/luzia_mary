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
        eyebrow="Agenda pública"
        title="Onde a candidata estará"
        description="Compromissos públicos, encontros e transmissões divulgados em um único lugar. Eventos sujeitos a alteração são atualizados pela equipe."
      />

      <Container className="py-14 sm:py-16">
        {items.length === 0 ? (
          <EmptyState
            title="Agenda em atualização"
            description="Novos compromissos públicos serão publicados aqui."
          />
        ) : (
          <div className="border-t border-[var(--border)]">
            {items.map((item) => (
              <article
                key={item.id}
                className="grid gap-5 border-b border-[var(--border)] py-9 sm:grid-cols-[72px_1fr]"
              >
                <span className="grid h-12 w-12 place-items-center bg-[var(--brand-soft)] text-[var(--brand)]" style={{ borderRadius: "var(--radius)" }}>
                  <CalendarDays size={22} aria-hidden />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ink)]"
                      style={{ borderRadius: "999px" }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.025em]">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--text-muted)]">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-5 grid gap-3 text-sm text-[var(--text-muted)]">
                    <span className="flex items-center gap-3">
                      <Clock3 size={16} className="text-[var(--brand)]" aria-hidden />
                      {formatDate(item.startAt, true)}
                    </span>
                    <span className="flex items-center gap-3">
                      <MapPin size={16} className="text-[var(--brand)]" aria-hidden />
                      {item.location ? `${item.location} · ` : ""}
                      {item.city}
                    </span>
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
