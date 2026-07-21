import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Container } from "./container";
import { SiteLogo } from "./site-logo";
import { navItems, siteConfig } from "@/config/site";

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/15"
      aria-label={label}
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-black/[.06] bg-[#10251d] text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <SiteLogo onDark />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/60">{siteConfig.candidate.shortBio}</p>
          <div className="mt-5 flex gap-2">
            <SocialIcon href={siteConfig.social.instagram} label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon href={siteConfig.social.facebook} label="Facebook">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={siteConfig.social.youtube} label="YouTube">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23 12.2s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C18.5 5.3 12 5.3 12 5.3s-6.5 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 2.3.4 8.8.4 8.8.4s6.5 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM9.8 15.5v-6.6l5.7 3.3-5.7 3.3z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold">Navegação</h3>
          <div className="mt-4 grid gap-2">
            {navItems.map((i) => (
              <Link key={i.href} href={i.href} className="text-sm text-white/60 hover:text-white">
                {i.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold">Contato oficial</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/60">
            <a href={`mailto:${siteConfig.contact.email}`} className="flex gap-2 hover:text-white">
              <Mail size={17} aria-hidden />
              {siteConfig.contact.email}
            </a>
            <span className="flex gap-2">
              <MapPin size={17} aria-hidden />
              {siteConfig.contact.address}
            </span>
          </div>
          <Link href="/privacidade" className="mt-6 inline-block text-sm text-white/60 hover:text-white">
            Política de privacidade
          </Link>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.candidate.ballotName}. Todos os direitos reservados.
          </span>
          <span>
            {siteConfig.legal.cnpj} · {siteConfig.legal.responsible}
          </span>
        </Container>
        <Container className="pb-6">
          <p className="max-w-4xl text-[11px] leading-relaxed text-white/35">{siteConfig.legal.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}
