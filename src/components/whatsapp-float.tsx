import { MessageCircle } from "lucide-react";
import { content } from "@/config/site";

export function WhatsAppFloat() {
  if (!content.contact.whatsapp) return null;
  const text = encodeURIComponent(`Olá! Vim pelo site de ${content.candidate.ballotName} e gostaria de falar com a equipe.`);
  return (
    <a
      href={`https://wa.me/${content.contact.whatsapp}?text=${text}`}
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
