import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { formatAgendaLongDate } from "@/lib/agenda";
import { getAgendaEvents } from "@/lib/data";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

async function getPublishedEvent(id: string) {
  const events = await getAgendaEvents();
  return events.find((event) => event.id === id) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getPublishedEvent(id);
  if (!event) {
    return createPageMetadata({
      title: "Evento",
      description: "Compromisso público na agenda de Luzia Mary.",
      path: `/agenda/${id}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: event.title,
    description:
      event.description ||
      `${event.title} — ${formatAgendaLongDate(event.date)} em ${event.city}.`,
    path: `/agenda/${event.id}`,
  });
}

export default async function AgendaEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getPublishedEvent(id);
  if (!event) notFound();

  const when = formatAgendaLongDate(event.date);
  const timeLabel = event.endTime ? `${event.time} – ${event.endTime}` : event.time;

  return (
    <div className="agenda-page">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Agenda", path: "/agenda" },
          { name: event.title, path: `/agenda/${event.id}` },
        ])}
      />
      <section className="agenda-hero" aria-labelledby="agenda-event-title">
        <div className="agenda-hero-atmosphere" aria-hidden>
          <span className="agenda-hero-glow agenda-hero-glow--blue" />
          <span className="agenda-hero-glow agenda-hero-glow--green" />
        </div>
        <Container className="agenda-shell">
          <Link href="/agenda" className="inline-flex items-center gap-2 text-sm font-bold text-white/90">
            <ArrowLeft size={16} aria-hidden /> Voltar à agenda
          </Link>
          <p className="agenda-hero-eyebrow mt-6">{event.category}</p>
          <h1 id="agenda-event-title" className="agenda-hero-title">
            {event.title}
          </h1>
          <ul className="mt-6 grid gap-3 text-white/85">
            <li className="inline-flex items-center gap-2">
              <CalendarDays size={18} aria-hidden />
              <span>
                {when}
                {timeLabel ? ` · ${timeLabel}` : ""}
              </span>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={18} aria-hidden />
              <span>
                {event.location}
                {event.city ? ` · ${event.city}` : ""}
              </span>
            </li>
          </ul>
          {event.description ? (
            <p className="agenda-hero-lead mt-6 max-w-2xl">{event.description}</p>
          ) : null}
          <p className="mt-8">
            <Link href={`/agenda#evento-${event.id}`} className="agenda-btn agenda-btn--primary">
              Ver na agenda completa
            </Link>
          </p>
        </Container>
      </section>
    </div>
  );
}
