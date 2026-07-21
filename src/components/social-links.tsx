import { siteConfig } from "@/config/site";

const socialItems = [
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "YouTube", href: siteConfig.social.youtube },
].filter((item) => Boolean(item.href));

export function SocialLinks({ inverted = false }: { inverted?: boolean }) {
  if (socialItems.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {socialItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            inverted
              ? "inline-flex border border-white/15 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/35 hover:text-white"
              : "inline-flex border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text-muted)] transition hover:text-[var(--ink)]"
          }
          style={{ borderRadius: "999px" }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
