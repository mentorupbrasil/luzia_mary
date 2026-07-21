import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { content, navPrimary, navSecondary } from "@/config/site";
import { Container } from "./container";
import { SiteLogo } from "./site-logo";
import { SocialLinks } from "./social-links";

export function SiteFooter() {
  const hasLegal = Boolean(content.legal.cnpj || content.legal.responsible);

  return (
    <footer className="mt-8 bg-[var(--blue-deep)] text-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.9fr]">
        <div>
          <SiteLogo light />
          <p className="mt-4 text-sm leading-7 text-white/55">
            {content.candidate.office}
            <br />
            {content.candidate.city} · {content.candidate.region}
          </p>
          <div className="mt-5">
            <SocialLinks inverted />
          </div>
        </div>
        <div>
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/35">Navegação</h3>
          <div className="mt-4 grid gap-2">
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
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/35">Contato</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            {content.contact.email && (
              <a href={`mailto:${content.contact.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail size={15} aria-hidden /> {content.contact.email}
              </a>
            )}
            {content.contact.address && (
              <span className="flex items-center gap-2">
                <MapPin size={15} aria-hidden /> {content.contact.address}
              </span>
            )}
            {content.contact.whatsapp && (
              <a
                href={`https://wa.me/${content.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-[11px] text-white/35 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {content.candidate.ballotName}</span>
          {hasLegal && <span>{[content.legal.cnpj, content.legal.responsible].filter(Boolean).join(" · ")}</span>}
        </Container>
        <Container className="pb-6">
          <p className="max-w-3xl text-[11px] leading-relaxed text-white/28">{content.legal.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}
