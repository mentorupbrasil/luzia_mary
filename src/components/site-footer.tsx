import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { navPrimary, navSecondary, siteConfig } from "@/config/site";
import { Container } from "./container";
import { SiteLogo } from "./site-logo";
import { SocialLinks } from "./social-links";

export function SiteFooter() {
  const hasLegalIds = Boolean(siteConfig.legal.cnpj || siteConfig.legal.responsible);

  return (
    <footer className="mt-10 border-t border-[var(--border)] bg-[var(--brand-dark)] text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.9fr]">
        <div>
          <SiteLogo inverted />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
            {siteConfig.candidate.office}
            <br />
            {siteConfig.candidate.cityBase} · {siteConfig.candidate.region} · {siteConfig.candidate.state}
          </p>
          <div className="mt-6">
            <SocialLinks inverted />
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Navegação</h3>
          <div className="mt-4 grid gap-2.5">
            {[...navPrimary, ...navSecondary].map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/65 hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/privacidade" className="text-sm text-white/65 hover:text-white">
              Política de privacidade
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Contato</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            {siteConfig.contact.email && (
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail size={15} aria-hidden />
                {siteConfig.contact.email}
              </a>
            )}
            {siteConfig.contact.address && (
              <span className="flex items-center gap-2">
                <MapPin size={15} aria-hidden />
                {siteConfig.contact.address}
              </span>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-[11px] leading-relaxed text-white/35 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.candidate.ballotName}
          </span>
          {hasLegalIds && (
            <span>{[siteConfig.legal.cnpj, siteConfig.legal.responsible].filter(Boolean).join(" · ")}</span>
          )}
        </Container>
        <Container className="pb-6">
          <p className="max-w-3xl text-[11px] leading-relaxed text-white/28">{siteConfig.legal.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}
