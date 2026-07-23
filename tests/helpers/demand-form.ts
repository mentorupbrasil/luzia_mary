/** FormData válido mínimo para submitDemand (ajuste por campo nos testes). */
export function buildDemandFormData(
  overrides: Record<string, string | undefined> = {},
): FormData {
  const values: Record<string, string> = {
    name: "Maria Silva",
    email: "maria@example.com",
    phone: "",
    city: "Imperatriz",
    neighborhood: "Centro",
    category: "Saúde",
    title: "Falta de atendimento no posto",
    description:
      "A comunidade precisa de mais horários de atendimento no posto de saúde do bairro.",
    consent: "on",
    website: "",
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, value]) => value !== undefined) as Array<
        [string, string]
      >,
    ),
  };

  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (key === "website" && value === "") continue;
    if (key === "updates" && value !== "on") continue;
    formData.set(key, value);
  }
  return formData;
}
