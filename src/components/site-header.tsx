"use client";

import { usePathname } from "next/navigation";
import { CampaignHomeHeader } from "./campaign-home-header";

/**
 * Cabeçalho público unificado.
 * Na home o menu fica integrado à arte do Hero (`CampaignHomeHeader` na page).
 * Nas demais páginas, usa o mesmo visual em faixa fixa.
 */
export function SiteHeader() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <CampaignHomeHeader variant="bar" />;
}
