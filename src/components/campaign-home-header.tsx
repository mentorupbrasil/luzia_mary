"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/container";
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
      <Container className="campaign-header-bar">
        <Link href="/" className="campaign-brand" aria-label={`${content.candidate.ballotName} — início`}>
          <Image
            src="/images/luzia-mary-logo.png"
            alt="Luzia Mary"
            width={800}
            height={110}
            priority
            className="campaign-brand-logo"
          />
          <span className="campaign-brand-role">
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
          aria-controls="campaign-mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </Container>

      {open && (
        <div id="campaign-mobile-menu" className="campaign-mobile-menu">
          <Container>
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
              <Link href="/demandas" onClick={() => setOpen(false)} className="campaign-mobile-cta">
                Participe
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
