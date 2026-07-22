"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { content } from "@/config/site";
import { cn } from "@/lib/utils";

export const campaignNav = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Biografia" },
  { href: "/propostas", label: "Propostas" },
  { href: "/agenda", label: "Agenda" },
  { href: "/demandas", label: "Participe" },
] as const;

type Props = {
  /** `hero` = transparente sobre a arte. `bar` = faixa fixa nas demais páginas. */
  variant?: "hero" | "bar";
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function CampaignHomeHeader({ variant = "hero" }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "campaign-header",
        variant === "hero" ? "campaign-header-hero" : "campaign-header-bar-page",
      )}
    >
      <div className="campaign-header-bar">
        <Link href="/" className="campaign-lockup" aria-label={`${content.candidate.ballotName} — início`}>
          <BrandLogo variant="light" size="md" priority={variant === "hero"} unoptimized className="campaign-logo" />
        </Link>

        <nav className="campaign-nav" aria-label="Navegação principal">
          {campaignNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("header-nav-link", active && "active")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="campaign-menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="campaign-mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>

      {open && (
        <div id="campaign-mobile-menu" className="campaign-mobile-menu">
          <div className="campaign-header-bar campaign-mobile-menu-inner">
            <nav className="campaign-mobile-nav" aria-label="Menu mobile">
              {campaignNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn("campaign-mobile-link", active && "campaign-mobile-link-active")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
