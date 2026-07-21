"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./brand-logo";
import { Container } from "./container";

const desktopLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Biografia" },
  { href: "/propostas", label: "Propostas" },
  { href: "/agenda", label: "Agenda" },
  { href: "/demandas", label: "Participe" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 28);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroMode = onHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "campaign-header z-50 transition-[background-color,box-shadow,color,backdrop-filter] duration-300",
        onHome ? "fixed inset-x-0 top-0" : "sticky top-0",
        heroMode ? "campaign-header-transparent" : "campaign-header-solid",
      )}
    >
      <Container className="campaign-header-bar">
        <Link href="/" className="campaign-brand-link" aria-label="Luzia Mary — Início">
          <BrandLogo size="md" priority />
        </Link>

        <nav className="campaign-nav" aria-label="Navegação principal">
          {desktopLinks.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("campaign-nav-link", active && "campaign-nav-link-active")}
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
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={22} strokeWidth={2.25} /> : <Menu size={22} strokeWidth={2.25} />}
        </button>
      </Container>

      {open && (
        <div id="menu-mobile" className="campaign-mobile-menu">
          <Container>
            <nav className="campaign-mobile-nav" aria-label="Menu mobile">
              {desktopLinks.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

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
              <Link href="/demandas" onClick={() => setOpen(false)} className="campaign-mobile-cta">
                Envie sua demanda
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
