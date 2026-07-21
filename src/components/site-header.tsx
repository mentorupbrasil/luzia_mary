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
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const moreActive = navSecondary.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_90%,white)] backdrop-blur-xl">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <SiteLogo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navegação principal">
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
                  "rounded-full px-3.5 py-2 text-[13px] font-semibold transition",
                  active
                    ? "bg-[var(--brand-soft)] text-[var(--brand-dark)]"
                    : "text-[var(--text-muted)] hover:text-[var(--ink)]",
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
                "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-semibold transition",
                moreActive || moreOpen
                  ? "bg-[var(--brand-soft)] text-[var(--brand-dark)]"
                  : "text-[var(--text-muted)] hover:text-[var(--ink)]",
              )}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((v) => !v)}
            >
              Mais
              <ChevronDown size={14} className={cn("transition", moreOpen && "rotate-180")} aria-hidden />
            </button>
            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 min-w-[210px] rounded-2xl border border-[var(--border)] bg-white p-2 shadow-[var(--shadow)]"
              >
                {navSecondary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-[var(--surface-muted)]",
                      pathname === item.href ? "text-[var(--brand-dark)]" : "text-[var(--ink)]",
                    )}
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
            className="hidden h-11 items-center rounded-full bg-[var(--accent)] px-5 text-sm font-bold text-white transition hover:brightness-95 sm:inline-flex"
          >
            Envie sua demanda
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] bg-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] overflow-y-auto border-t border-[var(--border)] bg-[var(--background)] px-5 py-6 lg:hidden"
        >
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Menu mobile">
            {[...navPrimary, ...navSecondary].map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-[var(--border)] py-4 font-display text-2xl font-semibold tracking-[-0.03em]",
                    active ? "text-[var(--brand)]" : "text-[var(--ink)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/demandas"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-2xl bg-[var(--accent)] px-5 py-4 text-center text-sm font-bold text-white"
            >
              Envie sua demanda
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
