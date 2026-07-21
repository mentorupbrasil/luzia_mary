"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/config/site";
import { cn } from "@/lib/utils";
import { SiteLogo } from "./site-logo";
import { Container } from "./container";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-black/[.06] bg-[rgba(247,248,244,.88)] backdrop-blur-xl">
    <Container className="flex h-20 items-center justify-between gap-5">
      <SiteLogo />
      <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegação principal">
        {navItems.map(item => <Link key={item.href} href={item.href} className={cn("rounded-full px-4 py-2 text-sm font-semibold text-black/58 transition hover:bg-white hover:text-[var(--ink)]", pathname === item.href && "bg-white text-[var(--brand)] shadow-sm")}>{item.label}</Link>)}
      </nav>
      <div className="hidden items-center gap-2 sm:flex">
        <Link href="/demandas" className="rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[var(--brand-dark)]">Envie sua demanda</Link>
      </div>
      <button className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </Container>
    {open && <div className="border-t border-black/5 bg-white px-5 py-5 xl:hidden">
      <nav className="mx-auto grid max-w-7xl gap-1">
        {navItems.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("rounded-2xl px-4 py-3 text-sm font-semibold", pathname === item.href ? "bg-[var(--brand-soft)] text-[var(--brand-dark)]" : "text-black/65")}>{item.label}</Link>)}
        <Link href="/demandas" onClick={() => setOpen(false)} className="mt-2 rounded-2xl bg-[var(--brand)] px-4 py-3 text-center text-sm font-bold text-white">Envie sua demanda</Link>
      </nav>
    </div>}
  </header>;
}
