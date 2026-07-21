"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { content, navPrimary, navSecondary } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "./container";

const desktopLinks = navPrimary.slice(0, 5);

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
        "people-header z-50 transition-all duration-300",
        onHome ? "fixed inset-x-0 top-0" : "sticky top-0",
        heroMode ? "people-header-transparent" : "people-header-solid",
      )}
    >
      <Container className="flex h-[82px] items-center justify-between gap-4">
        <Link href="/" className="people-brand" aria-label={`${content.candidate.ballotName} — Início`}>
          <span className="people-brand-name">
            <strong>L</strong><span>uzia</span>
            <strong>M</strong><span>ary</span>
          </span>
          <span className="people-brand-tagline">A mulher do povo!</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {desktopLinks.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("people-nav-link", active && "people-nav-link-active")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/demandas" className="people-header-cta hidden sm:inline-flex">
            Envie sua demanda
          </Link>

          <button
            type="button"
            className="people-menu-button lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="menu-mobile" className="people-mobile-menu lg:hidden">
          <Container>
            <nav className="grid" aria-label="Menu mobile">
              {[...navPrimary, ...navSecondary].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="people-mobile-link"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/demandas" onClick={() => setOpen(false)} className="people-mobile-cta">
                Envie sua demanda
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
