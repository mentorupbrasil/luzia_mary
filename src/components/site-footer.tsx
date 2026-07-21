import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Container } from "./container";
import { SiteLogo } from "./site-logo";
import { navItems, siteConfig } from "@/config/site";

const socialItems = [
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "YouTube", href: siteConfig.social.youtube },
].filter((item) => Boolean(item.href));

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[var(--hero)] text-white">
      <div className="aurora pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative grid gap-12 py-16 lg:grid-cols-[1.35fr_.65fr_.65fr]">
        <div>
          <SiteLogo inverted />
          <p className="mt-7 max-w-lg font-display text-3xl font-medium leading-[1.15] tracking-[-.03em] text-white/88">
            {siteConfig.candidate.manifesto}
          </p>
          {socialItems.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-4 py-2 text-xs font-bold text-white/60 transition hover:border-[var(--accent)]/50 hover:text-white"
                >
                  {item.label} <ArrowUpRight size={13} aria-hidden />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[.24em] text-white/35">Navegação</h3>
          <div className="mt-5 grid gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/55 transition hover:translate-x-1 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/verdade-ou-boato"
              className="text-sm text-white/55 transition hover:translate-x-1 hover:text-white"
            >
              Verdade ou boato
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[.24em] text-white/35">Contato oficial</h3>
          <div className="mt-5 grid gap-4 text-sm text-white/55">
            {siteConfig.contact.email && (
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-start gap-2.5 hover:text-white">
                <Mail size={17} className="mt-0.5 shrink-0" aria-hidden />
                {siteConfig.contact.email}
              </a>
            )}
            <span className="flex items-start gap-2.5">
              <MapPin size={17} className="mt-0.5 shrink-0" aria-hidden />
              {siteConfig.contact.address}
            </span>
          </div>
          <Link href="/privacidade" className="mt-8 inline-block text-xs text-white/35 hover:text-white">
            Política de privacidade
          </Link>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-[11px] leading-relaxed text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.candidate.ballotName}. Todos os direitos reservados.
          </span>
          <span>
            {siteConfig.legal.cnpj} · {siteConfig.legal.responsible}
          </span>
        </Container>
        <Container className="pb-7">
          <p className="max-w-4xl text-[10px] leading-relaxed text-white/25">{siteConfig.legal.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}
