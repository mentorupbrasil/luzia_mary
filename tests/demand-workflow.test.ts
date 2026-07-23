import { describe, expect, it } from "vitest";
import {
  aggregatePublicDemandStats,
  coerceDemandPriority,
  coerceDemandStatus,
  demandPrioritySchema,
  demandStatusSchema,
  isPublicDemandStatus,
  publicDemandStatuses,
  resolveDemandPriority,
  resolveDemandStatus,
} from "@/lib/demand-workflow";

describe("demand workflow enums", () => {
  it("aceita apenas status e prioridades canônicos", () => {
    expect(demandStatusSchema.safeParse("recebida").success).toBe(true);
    expect(demandStatusSchema.safeParse("em análise").success).toBe(true);
    expect(demandStatusSchema.safeParse("inventado").success).toBe(false);

    expect(demandPrioritySchema.safeParse("urgente").success).toBe(true);
    expect(demandPrioritySchema.safeParse("crítica").success).toBe(false);
  });

  it("normaliza aliases legados e rejeita inválidos", () => {
    expect(resolveDemandStatus("Em Analise")).toBe("em análise");
    expect(resolveDemandStatus("ENCAMINHADO")).toBe("encaminhada");
    expect(resolveDemandStatus("xyz")).toBeNull();

    expect(resolveDemandPriority("HIGH")).toBe("alta");
    expect(resolveDemandPriority("crítica")).toBe("urgente");
    expect(resolveDemandPriority("???")).toBeNull();
  });

  it("coerce preserva dados na migration com fallback seguro", () => {
    expect(coerceDemandStatus("respondido")).toBe("respondida");
    expect(coerceDemandStatus("lixo")).toBe("recebida");
    expect(coerceDemandPriority("medium")).toBe("normal");
    expect(coerceDemandPriority("")).toBe("normal");
  });
});

describe("public demand stats", () => {
  it("centraliza apenas status moderados e válidos para o site", () => {
    expect([...publicDemandStatuses]).toEqual(["em análise", "encaminhada", "respondida"]);
    expect(isPublicDemandStatus("recebida")).toBe(false);
    expect(isPublicDemandStatus("arquivada")).toBe(false);
    expect(isPublicDemandStatus("spam")).toBe(false);
    expect(isPublicDemandStatus("rejeitada")).toBe(false);
    expect(isPublicDemandStatus("teste")).toBe(false);
    expect(isPublicDemandStatus("em análise")).toBe(true);
  });

  it("conta só demandas públicas e não expõe dados pessoais", () => {
    const stats = aggregatePublicDemandStats([
      { status: "recebida", city: "Imperatriz", category: "Saúde" },
      { status: "em análise", city: "Imperatriz", category: "Saúde" },
      { status: "encaminhada", city: "Açailândia", category: "Moradia" },
      { status: "respondida", city: "Imperatriz", category: "Saúde" },
      { status: "arquivada", city: "Balsas", category: "Teste" },
      { status: "spam", city: "Spamville", category: "Spam" },
      { status: "rejeitada", city: "X", category: "Y" },
    ]);

    expect(stats.total).toBe(3);
    expect(stats.cities).toBe(2);
    expect(stats.categories).toEqual([
      { category: "Saúde", total: 2 },
      { category: "Moradia", total: 1 },
    ]);
    expect(JSON.stringify(stats)).not.toMatch(/@|protocol|telefone|email|name/i);
  });
});
