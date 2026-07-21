"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/config/site";
import { cn } from "@/lib/utils";
import { SiteLogo } from "./site-logo";
import { Container } from "./container";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-black/[.08] bg-[rgba(238,243,239,.94)] shadow-[0_8px_32px_rgba(11,28,21,.06)] backdrop-blur-2xl"
          : "border-transparent bg-[rgba(238,243,239,.72)] backdrop-blur-xl",
      )}
    >
      <Container className="flex h-[76px] items-center justify-between gap-5">
        <SiteLogo />

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[13px] font-semibold text-black/55 transition hover:bg-white/90 hover:text-[var(--ink)]",
                pathname === item.href && "bg-white text-[var(--brand-dark)] shadow-sm",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/demandas"
          className="hidden items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_28px_rgba(15,107,79,.25)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-dark)] sm:inline-flex"
        >
          Participar <ArrowUpRight size={16} aria-hidden />
        </Link>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white xl:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </Container>

      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-[116px] h-[calc(100dvh-116px)] overflow-y-auto border-t border-black/5 bg-[var(--background)] px-5 py-6 xl:hidden"
        >
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Menu mobile">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between border-b border-black/[.07] px-1 py-4 font-display text-2xl font-medium tracking-[-.03em]",
                  pathname === item.href ? "text-[var(--brand)]" : "text-[var(--ink)]",
                )}
              >
                <span>
                  <span className="mr-3 font-sans text-[10px] font-bold text-black/28">
                    0{index + 1}
                  </span>
                  {item.label}
                </span>
                <ArrowUpRight size={18} className="text-black/25" aria-hidden />
              </Link>
            ))}
            <Link
              href="/demandas"
              className="mt-6 rounded-2xl bg-[var(--brand)] px-5 py-4 text-center text-sm font-bold text-white"
            >
              Enviar uma demanda
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
