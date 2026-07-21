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
    function onDown(e: MouseEvent) {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const moreActive = navSecondary.some((i) => pathname === i.href || pathname.startsWith(`${i.href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,white)] backdrop-blur-xl">
      <Container className="flex h-[70px] items-center justify-between gap-3">
        <SiteLogo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navegação principal">
          {navPrimary.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[13px] font-bold transition",
                  active ? "bg-[var(--bg-soft)] text-[var(--blue-deep)]" : "text-[var(--muted)] hover:text-[var(--ink)]",
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
                "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-bold",
                moreActive || moreOpen ? "bg-[var(--bg-soft)] text-[var(--blue-deep)]" : "text-[var(--muted)]",
              )}
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              Mais <ChevronDown size={14} className={cn(moreOpen && "rotate-180")} aria-hidden />
            </button>
            {moreOpen && (
              <div role="menu" className="absolute right-0 top-full mt-2 min-w-[200px] rounded-2xl border border-[var(--line)] bg-white p-2 shadow-[var(--glow)]">
                {navSecondary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-[var(--bg-soft)]"
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
            className="hidden h-11 items-center rounded-full bg-[var(--coral)] px-5 text-sm font-extrabold text-white transition hover:brightness-95 sm:inline-flex"
          >
            Envie sua demanda
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="menu-mobile" className="fixed inset-x-0 top-[70px] z-40 h-[calc(100dvh-70px)] overflow-y-auto border-t border-[var(--line)] bg-[var(--bg)] px-5 py-6 lg:hidden">
          <nav className="grid gap-1" aria-label="Menu mobile">
            {[...navPrimary, ...navSecondary].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--line)] py-4 font-display text-2xl font-bold tracking-[-0.03em]"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/demandas" onClick={() => setOpen(false)} className="mt-5 rounded-2xl bg-[var(--coral)] px-5 py-4 text-center text-sm font-extrabold text-white">
              Envie sua demanda
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
