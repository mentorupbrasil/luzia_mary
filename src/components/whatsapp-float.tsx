import { MessageCircle } from "lucide-react";
import { content } from "@/config/site";

function buildWhatsAppHref() {
  const raw = content.contact.whatsapp.trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) {
    const url = new URL(raw);
    const text = encodeURIComponent(
      `Olá! Vim pelo site de ${content.candidate.ballotName} e gostaria de falar com a equipe.`,
    );
    url.searchParams.set("text", text);
    return url.toString();
  }
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const text = encodeURIComponent(
    `Olá! Vim pelo site de ${content.candidate.ballotName} e gostaria de falar com a equipe.`,
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function WhatsAppFloat() {
  const href = buildWhatsAppHref();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
      aria-label="Falar no WhatsApp com a equipe"
    >
      <MessageCircle size={18} aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
