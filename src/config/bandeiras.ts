/**
 * Textos editoriais compartilhados das páginas de bandeiras.
 * O conteúdo das propostas (título, resumo, detalhe etc.) vive em
 * getProposals / getProposalBySlug (banco → fallback).
 */

export const bandeirasPilares = [
  { title: "Escuta da população", tone: "yellow" as const },
  { title: "Atuação federal", tone: "blue" as const },
  { title: "Prestação de contas", tone: "green" as const },
] as const;

export const federalAtuacaoResumo =
  "A deputada federal não executa diretamente obras ou serviços municipais. A atuação pode ocorrer por emendas parlamentares, projetos de lei, fiscalização, articulação institucional, defesa de programas federais e acompanhamento de recursos — sempre em parceria com municípios, Estado e União.";

export const transparenciaCompromisso =
  "Os encaminhamentos, recursos defendidos, votações e resultados relacionados a esta bandeira deverão ser apresentados à população em linguagem clara e acessível.";

export function proposalNumber(sortOrder: number) {
  return String(sortOrder).padStart(2, "0");
}
