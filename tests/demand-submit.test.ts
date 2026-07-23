import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildDemandFormData } from "./helpers/demand-form";

vi.mock("@/db", () => ({
  hasDatabase: vi.fn(() => true),
  getDb: vi.fn(() => ({})),
}));

vi.mock("@/lib/request-ip", () => ({
  getDemandRateLimitKey: vi.fn(async () => "test:demand-submit"),
}));

vi.mock("@/lib/persist-demand", () => ({
  createNeonDemandWriter: vi.fn(() => ({
    insertDemandOnly: vi.fn(),
    insertDemandWithContact: vi.fn(),
  })),
  writeDemandSubmission: vi.fn(async () => ({ savedContact: false })),
}));

import { hasDatabase } from "@/db";
import { resetRateLimitBuckets } from "@/lib/rate-limit";
import { writeDemandSubmission } from "@/lib/persist-demand";
import { submitDemand, type DemandState } from "@/app/(public)/participe/actions";

const initial: DemandState = { ok: false, message: "" };

describe("envio de demanda", () => {
  beforeEach(() => {
    resetRateLimitBuckets();
    vi.mocked(writeDemandSubmission).mockClear();
    vi.mocked(writeDemandSubmission).mockResolvedValue({ savedContact: false });
    vi.mocked(hasDatabase).mockReturnValue(true);
  });

  it("rejeita honeypot preenchido sem persistir", async () => {
    const result = await submitDemand(
      initial,
      buildDemandFormData({ website: "http://bot.example" }),
    );

    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/Não foi possível registrar/i);
    expect(writeDemandSubmission).not.toHaveBeenCalled();
  });

  it("exige e-mail ou telefone para retorno", async () => {
    const result = await submitDemand(
      initial,
      buildDemandFormData({ email: "", phone: "" }),
    );

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Revise os campos destacados.");
    expect(result.errors?.email?.[0]).toMatch(/e-mail ou um telefone/i);
    expect(writeDemandSubmission).not.toHaveBeenCalled();
  });

  it("aceita apenas telefone como contato", async () => {
    const result = await submitDemand(
      initial,
      buildDemandFormData({ email: "", phone: "(99) 99220-8000" }),
    );

    expect(result.ok).toBe(true);
    expect(result.protocol).toMatch(/^MA-\d{4}-[A-F0-9]{8}$/);
    expect(writeDemandSubmission).toHaveBeenCalledTimes(1);
  });

  it("persiste demanda válida e devolve protocolo", async () => {
    const result = await submitDemand(initial, buildDemandFormData());

    expect(result.ok).toBe(true);
    expect(result.message).toBe("Demanda registrada com sucesso.");
    expect(result.protocol).toMatch(/^MA-\d{4}-[A-F0-9]{8}$/);
    expect(result.registeredAt).toBeTruthy();
    expect(writeDemandSubmission).toHaveBeenCalledTimes(1);

    expect(vi.mocked(writeDemandSubmission).mock.calls[0]?.[1]).toMatchObject({
      name: "Maria Silva",
      city: "Imperatriz",
      category: "Saúde",
    });
  });

  it("informa quando o banco não está conectado", async () => {
    vi.mocked(hasDatabase).mockReturnValue(false);

    const result = await submitDemand(initial, buildDemandFormData());

    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/Não foi possível registrar agora/i);
    expect(writeDemandSubmission).not.toHaveBeenCalled();
  });
});
