"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { content } from "@/config/site";
import { cn } from "@/lib/utils";

const campaignNav = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Biografia" },
  { href: "/propostas", label: "Propostas" },
  { href: "/agenda", label: "Agenda" },
  { href: "/demandas", label: "Participe" },
] as const;

export function CampaignHomeHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="campaign-header campaign-header-hero">
      <div className="campaign-header-bar">
        <Link href="/" className="campaign-lockup" aria-label={`${content.candidate.ballotName} — início`}>
          <span className="header-logo-name">
            <span className="header-logo-l">LUZIA</span> MARY
          </span>
          <span className="header-logo-subtitle">
            Pré-candidata a Deputada Federal pelo Maranhão
          </span>
        </Link>

        <nav className="campaign-nav" aria-label="Navegação principal">
          {campaignNav.map((item) => {
            const active = item.href === "/";
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
          <div className="campaign-header-bar" style={{ height: "auto", display: "block", paddingTop: "0.5rem", paddingBottom: "1.5rem" }}>
            <nav className="campaign-mobile-nav" aria-label="Menu mobile">
              {campaignNav.map((item) => {
                const active = item.href === "/";
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
