import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function WhatsAppFloat() {
  if (!siteConfig.contact.whatsapp) return null;
  const text = encodeURIComponent(`Olá! Vim pelo site de ${siteConfig.candidate.ballotName} e gostaria de falar com a equipe.`);
  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#1f8b4c] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_40px_rgba(15,80,45,.35)] transition hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
      aria-label="Falar no WhatsApp com a equipe"
    >
      <MessageCircle size={18} aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
