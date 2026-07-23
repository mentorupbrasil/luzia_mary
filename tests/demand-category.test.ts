import { describe, expect, it, vi } from "vitest";
import {
  buildParticipateHref,
  pickDemandCategory,
  resolveDemandCategory,
} from "@/lib/demand-category";

vi.mock("@/db", () => ({
  hasDatabase: vi.fn(() => false),
  getDb: vi.fn(),
}));

import { getProposals } from "@/lib/data";

describe("preenchimento automático de categoria", () => {
  it("resolve apenas temas idênticos à lista oficial", () => {
    expect(resolveDemandCategory("Saúde")).toBe("Saúde");
    expect(resolveDemandCategory("  Saúde  ")).toBe("Saúde");
    expect(resolveDemandCategory("saude")).toBeNull();
    expect(resolveDemandCategory("qualquer coisa")).toBeNull();
    expect(resolveDemandCategory("")).toBeNull();
    expect(resolveDemandCategory(null)).toBeNull();
  });

  it("escolhe o primeiro candidato válido em pickDemandCategory", () => {
    expect(pickDemandCategory("XYZ", "Moradia e comunidades", "Saúde")).toBe(
      "Moradia e comunidades",
    );
    expect(pickDemandCategory(undefined, null, "Outro assunto")).toBe("Outro assunto");
    expect(pickDemandCategory("invalido", "também não")).toBeNull();
  });

  it("monta href canônico de /participe com tema na query", () => {
    expect(buildParticipateHref("Saúde")).toBe(
      `/participe?tema=${encodeURIComponent("Saúde")}`,
    );
    expect(buildParticipateHref("tema inválido")).toBe("/participe");
    expect(buildParticipateHref()).toBe("/participe");
  });

  it("propostas publicadas expõem demandTheme válido para pré-preencher o formulário", async () => {
    const proposals = await getProposals();
    expect(proposals.length).toBeGreaterThan(0);

    for (const proposal of proposals) {
      expect(resolveDemandCategory(proposal.demandTheme)).toBe(proposal.demandTheme);
      expect(buildParticipateHref(proposal.demandTheme)).toContain("tema=");
    }
  });
});
