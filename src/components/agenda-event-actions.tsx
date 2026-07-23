"use client";

import { useEffect, useState } from "react";
import { CalendarPlus, MapPin, Share2 } from "lucide-react";
import type { AgendaEvent } from "@/config/agenda";
import { downloadAgendaIcs, getAgendaShareUrl } from "@/lib/agenda";

function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => copyTextFallback(text),
    );
  }
  return Promise.resolve(copyTextFallback(text));
}

function copyTextFallback(text: string): boolean {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  field.style.top = "0";
  document.body.appendChild(field);
  field.select();
  field.setSelectionRange(0, text.length);
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
  }
}

export function AgendaEventActions({
  event,
  variant = "featured",
}: {
  event: AgendaEvent;
  variant?: "featured" | "compact";
}) {
  const mapUrl = event.mapUrl?.trim();
  const hasConfirmedPlace = Boolean(mapUrl || event.location?.trim());
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 4500);
    return () => window.clearTimeout(timer);
  }, [feedback]);

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
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }

    const copied = await copyText(url);
    setFeedback(
      copied
        ? "Link do compromisso copiado."
        : "Não foi possível copiar o link automaticamente.",
    );
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
      <p className="agenda-share-feedback" role="status" aria-live="polite" aria-atomic="true">
        {feedback}
      </p>
    </div>
  );
}
