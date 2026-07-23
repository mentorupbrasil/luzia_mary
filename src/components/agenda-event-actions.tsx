"use client";

import { CalendarPlus, MapPin, Share2 } from "lucide-react";
import type { AgendaEvent } from "@/config/agenda";
import { downloadAgendaIcs, getAgendaShareUrl } from "@/lib/agenda";

export function AgendaEventActions({
  event,
  variant = "featured",
}: {
  event: AgendaEvent;
  variant?: "featured" | "compact";
}) {
  const mapUrl = event.mapUrl?.trim();
  const hasConfirmedPlace = Boolean(mapUrl || event.location?.trim());

  async function handleShare() {
    const url = getAgendaShareUrl(event.id);
    const payload = {
      title: event.title,
      text: `${event.title} — ${event.city}`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
    } catch {
      // usuário cancelou ou share indisponível
    }

    try {
      await navigator.clipboard.writeText(url);
      window.alert("Link do compromisso copiado.");
    } catch {
      window.prompt("Copie o link do compromisso:", url);
    }
  }

  const mapHref =
    mapUrl ||
    (event.location?.trim()
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          [event.location, event.city].filter(Boolean).join(", "),
        )}`
      : "");

  return (
    <div className={`agenda-actions agenda-actions--${variant}`}>
      {hasConfirmedPlace && mapHref ? (
        <a
          href={mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="agenda-btn agenda-btn--ghost"
        >
          <MapPin size={16} aria-hidden />
          VER LOCAL
        </a>
      ) : null}
      <button
        type="button"
        className="agenda-btn agenda-btn--primary"
        onClick={() => downloadAgendaIcs(event)}
      >
        <CalendarPlus size={16} aria-hidden />
        ADICIONAR À AGENDA
      </button>
      <button type="button" className="agenda-btn agenda-btn--soft" onClick={handleShare}>
        <Share2 size={16} aria-hidden />
        COMPARTILHAR
      </button>
    </div>
  );
}
