"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  Clock3,
  Landmark,
  MapPin,
  Megaphone,
  MessageCircle,
  Mic2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AgendaEventActions } from "@/components/agenda-event-actions";
import { Container } from "@/components/container";
import type { AgendaEvent, AgendaRegion } from "@/config/agenda";
import { agendaFilterOptions } from "@/config/agenda";
import {
  filterByRegion,
  formatAgendaDayParts,
  formatAgendaTime,
} from "@/lib/agenda";

const categoryIcons: Record<string, LucideIcon> = {
  Convenção: Landmark,
  "Convenção partidária": Landmark,
  "Encontro comunitário": Users,
  Visita: MapPin,
  Reunião: MessageCircle,
  Entrevista: Mic2,
  Audiência: Building2,
  Mobilização: Megaphone,
  "Evento institucional": CalendarDays,
};

function CategoryIcon({ category }: { category: string }) {
  const Icon = categoryIcons[category] ?? CalendarDays;
  return <Icon size={18} strokeWidth={2.2} aria-hidden />;
}

export function AgendaUpcomingSection({
  featured,
  events,
}: {
  featured: AgendaEvent | null;
  events: AgendaEvent[];
}) {
  const [region, setRegion] = useState<AgendaRegion | "todos">("todos");
  const showFilters = events.length + (featured ? 1 : 0) >= 4;
  const filtered = useMemo(
    () => filterByRegion(events, region),
    [events, region],
  );

  if (!featured && events.length === 0) {
    return <AgendaEmptyUpcoming />;
  }

  return (
    <>
      {featured ? <AgendaFeatured event={featured} /> : null}

      {(filtered.length > 0 || showFilters) && (
        <section className="agenda-upcoming" aria-labelledby="agenda-upcoming-title">
          <Container className="agenda-shell">
            <div className="agenda-section-head">
              <p className="agenda-section-eyebrow">PRÓXIMOS COMPROMISSOS</p>
              <h2 id="agenda-upcoming-title" className="agenda-section-title">
                Compromissos confirmados
              </h2>
            </div>

            {showFilters ? (
              <div className="agenda-filters" role="group" aria-label="Filtrar por região">
                {agendaFilterOptions.map((option) => {
                  const active = region === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`agenda-filter${active ? " is-active" : ""}`}
                      aria-pressed={active}
                      onClick={() => setRegion(option.id as AgendaRegion | "todos")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {filtered.length === 0 ? (
              <p className="agenda-filter-empty">
                Nenhum compromisso confirmado neste filtro.
              </p>
            ) : (
              <div className="agenda-grid">
                {filtered.map((event) => (
                  <AgendaEventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </Container>
        </section>
      )}
    </>
  );
}

function AgendaFeatured({ event }: { event: AgendaEvent }) {
  const parts = formatAgendaDayParts(event.date);

  return (
    <section className="agenda-featured" aria-labelledby="agenda-featured-title">
      <Container className="agenda-shell">
        <p className="agenda-section-eyebrow">PRÓXIMO COMPROMISSO</p>
        <article id={`evento-${event.id}`} className="agenda-featured-card">
          <div className="agenda-featured-date" aria-hidden>
            <span className="agenda-featured-day">{parts.day}</span>
            <span className="agenda-featured-month">{parts.month}</span>
            <span className="agenda-featured-year">{parts.year}</span>
          </div>

          <div className="agenda-featured-body">
            <div className="agenda-featured-meta">
              <span className="agenda-chip">{event.category}</span>
              <span className="agenda-status">CONFIRMADO</span>
            </div>
            <h2 id="agenda-featured-title" className="agenda-featured-title">
              {event.title}
            </h2>
            <ul className="agenda-featured-facts">
              <li>
                <CalendarDays size={16} aria-hidden />
                {formatAgendaLongDateSafe(event.date)}
              </li>
              <li>
                <Clock3 size={16} aria-hidden />
                {formatAgendaTime(event.time, event.endTime)}
              </li>
              <li>
                <MapPin size={16} aria-hidden />
                {event.location}
                {event.city ? ` · ${event.city}` : ""}
              </li>
            </ul>
            {event.description ? (
              <p className="agenda-featured-text">{event.description}</p>
            ) : null}
          </div>

          <div className="agenda-featured-actions">
            <AgendaEventActions event={event} variant="featured" />
          </div>
        </article>
      </Container>
    </section>
  );
}

function AgendaEventCard({ event }: { event: AgendaEvent }) {
  const parts = formatAgendaDayParts(event.date);

  return (
    <article id={`evento-${event.id}`} className="agenda-card">
      <div className="agenda-card-top">
        <div className="agenda-card-date">
          <span className="agenda-card-day">{parts.day}</span>
          <span className="agenda-card-month">{parts.month}</span>
        </div>
        <span className="agenda-card-icon" aria-hidden>
          <CategoryIcon category={event.category} />
        </span>
      </div>
      <p className="agenda-card-category">{event.category}</p>
      <h3 className="agenda-card-title">{event.title}</h3>
      <p className="agenda-card-fact">
        {formatAgendaTime(event.time, event.endTime)}
      </p>
      <p className="agenda-card-fact">
        {event.location}
        {event.city ? ` · ${event.city}` : ""}
      </p>
      {event.description ? (
        <p className="agenda-card-text">{event.description}</p>
      ) : null}
      <a href={`#evento-${event.id}`} className="agenda-card-link">
        VER DETALHES
      </a>
    </article>
  );
}

function AgendaEmptyUpcoming() {
  return (
    <section className="agenda-empty" aria-labelledby="agenda-empty-title">
      <Container className="agenda-shell">
        <div className="agenda-empty-panel">
          <div className="agenda-empty-deco" aria-hidden>
            <span className="agenda-empty-orb agenda-empty-orb--cal">
              <CalendarDays size={22} strokeWidth={2.1} />
            </span>
            <span className="agenda-empty-orb agenda-empty-orb--pin">
              <MapPin size={20} strokeWidth={2.1} />
            </span>
            <span className="agenda-empty-orb agenda-empty-orb--chat">
              <MessageCircle size={20} strokeWidth={2.1} />
            </span>
          </div>
          <h2 id="agenda-empty-title" className="agenda-empty-title">
            Novos compromissos serão anunciados em breve.
          </h2>
          <p className="agenda-empty-text">
            A agenda está sendo atualizada pela equipe. Acompanhe o site e as redes oficiais
            para conferir os próximos encontros e atividades públicas.
          </p>
          <a href="/participe" className="agenda-btn agenda-btn--primary">
            RECEBER ATUALIZAÇÕES
          </a>
        </div>
      </Container>
    </section>
  );
}

function formatAgendaLongDateSafe(date: string) {
  const anchor = new Date(`${date}T12:00:00-03:00`);
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Fortaleza",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(anchor);
}
