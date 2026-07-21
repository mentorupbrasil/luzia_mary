"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navPrimary, navSecondary } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const onHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onDown(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    }

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    if (!onHome) return;

    function onScroll() {
      setScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const moreActive = navSecondary.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <header
      className={cn(
        "z-50 transition-[background-color,border-color,box-shadow] duration-300",
        onHome
          ? cn(
              "fixed inset-x-0 top-0",
              scrolled || open
                ? "border-b border-white/10 bg-[color-mix(in_srgb,var(--navy)_92%,transparent)] shadow-[0_12px_34px_rgba(3,14,31,0.24)] backdrop-blur-xl"
                : "border-b border-white/10 bg-transparent",
            )
          : "sticky top-0 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_92%,white)] backdrop-blur-lg",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-3">
        <SiteLogo light={onHome} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {navPrimary.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-[12px] font-extrabold uppercase tracking-[0.07em] transition",
                  onHome
                    ? active
                      ? "text-white"
                      : "text-white/65 hover:text-white"
                    : active
                      ? "text-[var(--navy)] underline decoration-[var(--coral)] decoration-2 underline-offset-8"
                      : "text-[var(--muted)] hover:text-[var(--ink)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 px-3 py-2 text-[12px] font-extrabold uppercase tracking-[0.07em]",
                onHome
                  ? moreActive || moreOpen
                    ? "text-white"
                    : "text-white/65"
                  : moreActive || moreOpen
                    ? "text-[var(--navy)]"
                    : "text-[var(--muted)]",
              )}
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((value) => !value)}
            >
              Mais
              <ChevronDown
                size={14}
                className={cn("transition-transform", moreOpen && "rotate-180")}
                aria-hidden
              />
            </button>

            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 min-w-[210px] border border-[var(--line)] bg-white p-1.5 shadow-[var(--lift)]"
              >
                {navSecondary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className="block px-3 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--bg-soft)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/demandas"
            className={cn(
              "hidden h-10 items-center px-5 text-sm font-extrabold transition sm:inline-flex",
              onHome
                ? "bg-[var(--sky)] text-[var(--navy)] hover:-translate-y-0.5 hover:brightness-110"
                : "bg-[var(--coral)] text-white hover:-translate-y-0.5 hover:brightness-95",
            )}
          >
            Envie sua demanda
          </Link>

          <button
            type="button"
            className={cn(
              "grid h-10 w-10 place-items-center lg:hidden",
              onHome
                ? "border border-white/30 text-white"
                : "border border-[var(--line)] bg-white text-[var(--ink)]",
            )}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-[var(--navy)] px-5 py-6 lg:hidden"
        >
          <nav className="grid gap-1" aria-label="Menu mobile">
            {[...navPrimary, ...navSecondary].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-2xl font-extrabold tracking-[-0.04em] text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/demandas"
              onClick={() => setOpen(false)}
              className="mt-5 bg-[var(--sky)] px-5 py-4 text-center text-sm font-extrabold text-[var(--navy)]"
            >
              Envie sua demanda
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
