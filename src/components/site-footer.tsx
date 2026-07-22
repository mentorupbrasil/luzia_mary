import Link from "next/link";
import { ArrowUpRight, type LucideProps } from "lucide-react";
import { content } from "@/config/site";
import { BrandLogo } from "./brand-logo";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Biografia" },
  { href: "/propostas", label: "Propostas" },
  { href: "/agenda", label: "Agenda" },
  { href: "/demandas", label: "Participe" },
] as const;

type SocialIcon = (props: LucideProps) => React.ReactElement;

function InstagramIcon({ size = 18, strokeWidth = 2.2, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 18, strokeWidth = 2.2, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3.2l.8-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18, strokeWidth = 2.2, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.5 8.2A3.2 3.2 0 0 1 5.6 5.2C8.2 5 15.8 5 18.4 5.2a3.2 3.2 0 0 1 3.1 3c.2 1.5.2 4.6 0 6.1a3.2 3.2 0 0 1-3.1 3c-2.6.2-10.2.2-12.8 0a3.2 3.2 0 0 1-3.1-3c-.2-1.5-.2-4.6 0-6.1z" />
      <path d="m10 9.5 5 2.5-5 2.5v-5z" />
    </svg>
  );
}

function WhatsappIcon({ size = 18, strokeWidth = 2.2, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.4 19.2 5.2 15A7.8 7.8 0 1 1 8.8 19l-4.4.2z" />
      <path d="M9.2 10.2c.3-.3.7-.4 1-.2l1 .6c.3.2.4.6.2.9l-.4.7c.8 1.2 1.8 2 3 2.6l.8-.5c.3-.2.7-.1.9.2l.7 1c.2.3.2.7-.1 1-.7.6-1.7.9-2.8.6-2.5-.7-4.6-2.6-5.7-5.1-.4-1-.3-2.1.4-2.8z" />
    </svg>
  );
}

type SocialItem = {
  label: string;
  handle: string;
  href: string | null;
  Icon: SocialIcon;
  ariaLabel: string;
};

function getSocialItems(): SocialItem[] {
  const whatsappHref = content.contact.whatsapp
    ? `https://wa.me/${content.contact.whatsapp}`
    : null;

  return [
    {
      label: "Instagram",
      handle: content.social.instagram ? "Seguir" : "Em breve",
      href: content.social.instagram || null,
      Icon: InstagramIcon,
      ariaLabel: "Instagram de Luzia Mary",
    },
    {
      label: "Facebook",
      handle: content.social.facebook ? "Seguir" : "Em breve",
      href: content.social.facebook || null,
      Icon: FacebookIcon,
      ariaLabel: "Facebook de Luzia Mary",
    },
    {
      label: "YouTube",
      handle: content.social.youtube ? "Assistir" : "Em breve",
      href: content.social.youtube || null,
      Icon: YoutubeIcon,
      ariaLabel: "YouTube de Luzia Mary",
    },
    {
      label: "WhatsApp",
      handle: content.contact.whatsapp ? "Fale conosco" : "Em breve",
      href: whatsappHref,
      Icon: WhatsappIcon,
      ariaLabel: "WhatsApp de Luzia Mary",
    },
  ];
}

function FooterDecor() {
  return (
    <div className="lm-footer-decor" aria-hidden="true">
      <svg className="lm-footer-decor-svg" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className="lm-footer-watermark" x="110" y="148" textAnchor="middle">
          PARTICIPE
        </text>

        {/* Abstract Maranhão contour */}
        <path
          className="lm-footer-map"
          d="M118 38c18 6 34 22 38 42 4 22-2 40-14 56-8 10-10 22-6 34 4 14-2 28-16 34-12 6-28 4-38-6-14-14-18-34-12-52 4-12 2-24-6-34-10-14-8-34 4-44 14-12 32-18 50-30z"
        />

        {/* Connected circles */}
        <circle className="lm-footer-dot lm-footer-dot--a" cx="52" cy="72" r="7" />
        <circle className="lm-footer-dot lm-footer-dot--b" cx="88" cy="54" r="4.5" />
        <circle className="lm-footer-dot lm-footer-dot--c" cx="168" cy="96" r="5.5" />
        <circle className="lm-footer-dot lm-footer-dot--d" cx="142" cy="168" r="6" />
        <path className="lm-footer-curve" d="M52 72 C72 48, 108 46, 88 54" />
        <path className="lm-footer-curve lm-footer-curve--green" d="M168 96 C156 130, 150 150, 142 168" />

        {/* Speech bubbles */}
        <path
          className="lm-footer-bubble"
          d="M48 118c0-16 14-28 32-28h18c18 0 32 12 32 28s-14 28-32 28h-8l-14 12v-12c-16 0-28-12-28-28z"
        />
        <path
          className="lm-footer-bubble lm-footer-bubble--soft"
          d="M118 178c0-12 10-22 24-22h12c14 0 24 10 24 22s-10 22-24 22h-6l-10 9v-9c-12 0-20-9-20-22z"
        />

        {/* Voice waves */}
        <path className="lm-footer-wave" d="M34 208c18-10 34-10 52 0" />
        <path className="lm-footer-wave" d="M28 222c24-12 46-12 70 0" />
        <path className="lm-footer-wave lm-footer-wave--green" d="M40 236c16-8 30-8 46 0" />
      </svg>
    </div>
  );
}

export function SiteFooter() {
  const socialItems = getSocialItems();
  const year = new Date().getFullYear();

  return (
    <footer className="lm-footer">
      <div className="lm-footer-bg" aria-hidden="true">
        <span className="lm-footer-blob lm-footer-blob--1" />
        <span className="lm-footer-blob lm-footer-blob--2" />
        <span className="lm-footer-blob lm-footer-blob--3" />
        <span className="lm-footer-dots" />
        <span className="lm-footer-arc lm-footer-arc--1" />
        <span className="lm-footer-arc lm-footer-arc--2" />
      </div>

      <div className="lm-footer-inner">
        <div className="lm-footer-grid">
          <div className="lm-footer-brand">
            <Link href="/" className="lm-footer-logo" aria-label={`${content.candidate.ballotName} — início`}>
              <BrandLogo size="lg" variant="dark" className="lm-footer-logo-img" />
            </Link>

            <p className="lm-footer-signature">
              A mulher do povo.
              <br />
              De Imperatriz para todo o{" "}
              <span className="lm-footer-signature-accent">Maranhão</span>.
            </p>

            <p className="lm-footer-lead">
              Presença, escuta e compromisso com quem precisa ser representado de verdade.
            </p>
          </div>

          <div className="lm-footer-mid">
            <FooterDecor />

            <nav className="lm-footer-nav" aria-label="Navegação do rodapé">
              <h2 className="lm-footer-nav-title">Navegue</h2>
              <ul className="lm-footer-nav-list">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="lm-footer-nav-link">
                      <span>{item.label}</span>
                      <ArrowUpRight className="lm-footer-nav-arrow" size={16} strokeWidth={2.4} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lm-footer-social-col">
            <div className="lm-footer-social-card">
              <h2 className="lm-footer-social-title">Redes sociais</h2>
              <ul className="lm-footer-social-list">
                {socialItems.map(({ label, handle, href, Icon, ariaLabel }) => {
                  const inner = (
                    <>
                      <span className="lm-footer-social-icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={2.2} />
                      </span>
                      <span className="lm-footer-social-copy">
                        <span className="lm-footer-social-label">{label}</span>
                        <span className="lm-footer-social-handle">{handle}</span>
                      </span>
                      <ArrowUpRight className="lm-footer-social-arrow" size={15} strokeWidth={2.4} aria-hidden />
                    </>
                  );

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lm-footer-social-link"
                          aria-label={ariaLabel}
                        >
                          {inner}
                        </a>
                      ) : (
                        <span className="lm-footer-social-link lm-footer-social-link--soon" aria-label={`${ariaLabel} — em breve`}>
                          {inner}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lm-footer-legal">
        <div className="lm-footer-legal-inner">
          <p className="lm-footer-copy">
            Luzia Mary © {year} Todos os direitos reservados.
          </p>
          <nav className="lm-footer-legal-links" aria-label="Links legais">
            <Link href="/privacidade">Política de Privacidade</Link>
            <Link href="/privacidade">Termos de Uso</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
