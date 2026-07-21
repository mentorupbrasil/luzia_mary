export function commitmentStatusLabel(status: string, progress = 0) {
  const normalized = status.toLowerCase();

  if (progress >= 100 || normalized.includes("conclu")) {
    return "Compromisso cumprido";
  }

  if (normalized.includes("prepar") || (progress > 0 && progress < 100)) {
    return "Em construção";
  }

  if (normalized.includes("proposto") || normalized.includes("public")) {
    return "Compromisso publicado";
  }

  if (normalized.includes("aguard") || normalized.includes("campanha")) {
    return "Aguardando início da campanha";
  }

  return "Atualização em breve";
}
