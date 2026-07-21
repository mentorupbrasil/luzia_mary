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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[.07] bg-[rgba(245,241,233,.92)] backdrop-blur-2xl">
      <Container className="flex h-[78px] items-center justify-between gap-5">
        <SiteLogo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[13px] font-semibold text-black/56 transition hover:bg-white/80 hover:text-[var(--ink)]",
                pathname === item.href && "bg-white text-[var(--brand-dark)] shadow-sm",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/demandas"
          className="hidden items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_28px_rgba(22,87,200,.2)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-dark)] sm:inline-flex"
        >
          Fale com a equipe <ArrowUpRight size={16} aria-hidden />
        </Link>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </Container>

      {open && (
        <div id="menu-mobile" className="fixed inset-x-0 top-[112px] h-[calc(100dvh-112px)] overflow-y-auto border-t border-black/5 bg-[var(--background)] px-5 py-6 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Menu mobile">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-black/[.07] px-1 py-4 font-display text-2xl font-medium tracking-[-.03em]",
                  pathname === item.href ? "text-[var(--brand)]" : "text-[var(--ink)]",
                )}
              >
                <span><span className="mr-3 font-sans text-[10px] font-bold text-black/30">0{index + 1}</span>{item.label}</span>
                <ArrowUpRight size={18} className="text-black/30" aria-hidden />
              </Link>
            ))}
            <Link href="/demandas" onClick={() => setOpen(false)} className="mt-5 rounded-2xl bg-[var(--brand)] px-5 py-4 text-center text-sm font-bold text-white">
              Enviar uma demanda
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
