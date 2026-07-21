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
      setScrolled(window.scrollY > 34);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroMode = onHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "campaign-header z-50 transition-all duration-300",
        onHome ? "fixed inset-x-0 top-0" : "sticky top-0",
        heroMode ? "campaign-header-transparent" : "campaign-header-solid",
      )}
    >
      <Container className="campaign-header-bar flex items-center justify-between gap-6">
        <Link href="/" className="campaign-brand-link" aria-label="Luzia Mary — Início">
          <BrandLogo size="lg" priority />
        </Link>

        <nav className="campaign-nav hidden items-center lg:flex" aria-label="Navegação principal">
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
          className="campaign-menu-button lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </Container>

      {open && (
        <div id="menu-mobile" className="campaign-mobile-menu lg:hidden">
          <Container>
            <nav className="grid" aria-label="Menu mobile">
              {desktopLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "campaign-mobile-link",
                    (item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`)) &&
                      "campaign-mobile-link-active",
                  )}
                >
                  {item.label}
                </Link>
              ))}
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
