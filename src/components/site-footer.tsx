import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Container } from "./container";
import { SiteLogo } from "./site-logo";
import { SocialLinks } from "./social-links";
import { navPrimary, navSecondary, siteConfig } from "@/config/site";

export function SiteFooter() {
  const hasLegalIds = Boolean(siteConfig.legal.cnpj || siteConfig.legal.responsible);

  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--hero)] text-white">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.35fr_.75fr_.9fr]">
        <div>
          <SiteLogo inverted />
          <p className="mt-7 max-w-md font-display text-[1.75rem] font-medium leading-[1.2] tracking-[-0.025em] text-white/88">
            {siteConfig.candidate.manifesto}
          </p>
          <div className="mt-8">
            <SocialLinks inverted />
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Navegação</h3>
          <div className="mt-5 grid gap-2.5">
            {[...navPrimary, ...navSecondary].map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/60 transition hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/privacidade" className="text-sm text-white/60 transition hover:text-white">
              Privacidade
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Contato oficial</h3>
          <div className="mt-5 grid gap-4 text-sm text-white/60">
            {siteConfig.contact.email && (
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-start gap-2.5 hover:text-white">
                <Mail size={16} className="mt-0.5 shrink-0" aria-hidden />
                {siteConfig.contact.email}
              </a>
            )}
            {siteConfig.contact.address && (
              <span className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
                {siteConfig.contact.address}
              </span>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-[11px] leading-relaxed text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.candidate.ballotName}. Todos os direitos reservados.
          </span>
          {hasLegalIds && (
            <span>
              {[siteConfig.legal.cnpj, siteConfig.legal.responsible].filter(Boolean).join(" · ")}
            </span>
          )}
        </Container>
        <Container className="pb-7">
          <p className="max-w-4xl text-[11px] leading-relaxed text-white/28">{siteConfig.legal.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}
