import { content } from "@/config/site";

function whatsappHref() {
  const raw = content.contact.whatsapp?.trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  const digits = raw.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

const items = [
  { label: "Instagram", href: content.social.instagram },
  { label: "Facebook", href: content.social.facebook },
  { label: "WhatsApp", href: whatsappHref() },
  { label: "YouTube", href: content.social.youtube },
].filter((item) => Boolean(item.href));

export function SocialLinks({ inverted = false }: { inverted?: boolean }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            inverted
              ? "rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/70 hover:text-white"
              : "rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs font-bold text-[var(--muted)]"
          }
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
