import {
  Building2,
  HeartHandshake,
  HeartPulse,
  Home,
  MessagesSquare,
  Shield,
  type LucideIcon,
} from "lucide-react";

/**
 * Mapa único de ícones das propostas/bandeiras.
 * Chaves = campo `icon` da fonte única (getProposals / fallbackProposals).
 */
export const proposalIconMap = {
  "heart-handshake": HeartHandshake,
  home: Home,
  "heart-pulse": HeartPulse,
  "building-2": Building2,
  shield: Shield,
  "messages-square": MessagesSquare,
} as const satisfies Record<string, LucideIcon>;

export type ProposalIconName = keyof typeof proposalIconMap;

export function isProposalIconName(value: string): value is ProposalIconName {
  return Object.prototype.hasOwnProperty.call(proposalIconMap, value);
}

/** Resolve o ícone da proposta. Sem fallback genérico para HeartPulse. */
export function getProposalIcon(name: string | null | undefined): LucideIcon {
  if (name && isProposalIconName(name)) return proposalIconMap[name];
  throw new Error(
    `Ícone de proposta desconhecido: "${name ?? ""}". Use uma das chaves: ${Object.keys(proposalIconMap).join(", ")}.`,
  );
}
