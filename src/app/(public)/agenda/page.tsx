import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/container";
import { AgendaUpcomingSection } from "@/components/agenda-upcoming";
import { JsonLd } from "@/components/json-ld";
import { agendaMeta } from "@/config/agenda";
import { content } from "@/config/site";
import { formatAgendaDayParts, partitionAgendaEvents } from "@/lib/agenda";
import { getAgendaEvents } from "@/lib/data";
import { buildBreadcrumbJsonLd, buildEventsJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: agendaMeta.title,
  description: agendaMeta.description,
  path: "/agenda",
});

const inviteMailto = `mailto:${content.contact.email}?subject=${encodeURIComponent(
  "Convite para evento",
)}&body=${encodeURIComponent(
  "Olá,\n\nGostaria de convidar Luzia Mary para uma atividade.\n\nNome do evento:\nData:\nHorário:\nLocal / município:\nDescrição breve:\nContato para retorno:\n\nObrigado(a).",
)}`;

export default async function AgendaPage() {
  const publishable = await getAgendaEvents();
  const { upcomingList, past, featured } = partitionAgendaEvents(publishable);
  const eventSchemas = buildEventsJsonLd(publishable);

  return (
    <div className="agenda-page">
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([{ name: "Agenda", path: "/agenda" }]),
          ...eventSchemas,
        ]}
      />
      <section className="agenda-hero" aria-labelledby="agenda-hero-title">
        <div className="agenda-hero-atmosphere" aria-hidden>
          <span className="agenda-hero-glow agenda-hero-glow--blue" />
          <span className="agenda-hero-glow agenda-hero-glow--green" />
          <span className="agenda-hero-arc agenda-hero-arc--1" />
          <span className="agenda-hero-arc agenda-hero-arc--2" />
          <span className="agenda-hero-icons">
            <span className="agenda-hero-icon agenda-hero-icon--cal">
              <CalendarDays size={22} strokeWidth={1.8} />
            </span>
            <span className="agenda-hero-icon agenda-hero-icon--pin">
              <MapPin size={20} strokeWidth={1.8} />
            </span>
            <span className="agenda-hero-icon agenda-hero-icon--chat">
              <MessageCircle size={20} strokeWidth={1.8} />
            </span>
          </span>
        </div>

        <Container className="agenda-shell">
          <div className="agenda-hero-copy">
            <p className="agenda-hero-eyebrow">AGENDA</p>
            <h1 id="agenda-hero-title" className="agenda-hero-title">
              Compromissos públicos
              <br />
              <em>e encontros com as comunidades.</em>
            </h1>
            <p className="agenda-hero-lead">
              Acompanhe os próximos compromissos, encontros, visitas e atividades públicas de
              Luzia Mary em Imperatriz, na Região Tocantina e no Maranhão.
            </p>
          </div>
        </Container>
      </section>

      <AgendaUpcomingSection featured={featured} events={upcomingList} />

      {past.length > 0 ? (
        <section className="agenda-past" aria-labelledby="agenda-past-title">
          <Container className="agenda-shell">
            <div className="agenda-section-head">
              <p className="agenda-section-eyebrow">AGENDA REALIZADA</p>
              <h2 id="agenda-past-title" className="agenda-section-title">
                Compromissos já realizados
              </h2>
            </div>
            <ul className="agenda-past-list">
              {past.map((event) => {
                const parts = formatAgendaDayParts(event.date);
                return (
                  <li key={event.id} className="agenda-past-item">
                    <div className="agenda-past-date" aria-hidden>
                      <span>{parts.day}</span>
                      <small>{parts.month}</small>
                    </div>
                    <div className="agenda-past-body">
                      <h3>{event.title}</h3>
                      <p>
                        {event.location}
                        {event.city ? ` · ${event.city}` : ""}
                      </p>
                      {event.description ? <p>{event.description}</p> : null}
                      {event.postUrl ? (
                        <Link href={event.postUrl} className="agenda-past-link">
                          VER REGISTRO
                        </Link>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="agenda-cta" aria-labelledby="agenda-cta-title">
        <Container className="agenda-shell">
          <div className="agenda-cta-panel">
            <div>
              <h2 id="agenda-cta-title" className="agenda-cta-title">
                Quer convidar Luzia Mary para uma atividade?
              </h2>
              <p className="agenda-cta-text">
                Envie informações sobre encontros comunitários, reuniões, visitas e eventos
                realizados em Imperatriz, na Região Tocantina e no Maranhão.
              </p>
            </div>
            <a href={inviteMailto} className="agenda-btn agenda-btn--cta">
              ENVIAR UM CONVITE
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
