import { describe, expect, it } from "vitest";
import {
  PUBLIC_DATA_REVALIDATE_SECONDS,
  cacheTags,
  getContentInvalidation,
} from "@/lib/cache-tags";

describe("public content cache invalidation", () => {
  it("usa revalidação de segurança e tags estáveis", () => {
    expect(PUBLIC_DATA_REVALIDATE_SECONDS).toBe(300);
    expect(cacheTags.proposals).toBe("public:proposals");
    expect(cacheTags.agenda).toBe("public:agenda");
  });

  it("mapeia publicação/edição de proposta para tags e rotas relacionadas", () => {
    const result = getContentInvalidation("proposal", { slug: "saude-perto" });
    expect(result.tags).toEqual([cacheTags.proposals]);
    expect(result.paths).toEqual([
      "/admin/propostas",
      "/propostas",
      "/",
      "/propostas/saude-perto",
    ]);
  });

  it("mapeia notícia, agenda e compromissos sem invalidar rotas alheias", () => {
    expect(getContentInvalidation("post", { slug: "visita" }).paths).toEqual([
      "/admin/noticias",
      "/noticias",
      "/",
      "/noticias/visita",
    ]);
    expect(getContentInvalidation("event", { id: "evt-1" }).paths).toEqual([
      "/admin/agenda",
      "/agenda",
      "/agenda/evt-1",
    ]);
    expect(getContentInvalidation("commitment").paths).toEqual([
      "/admin/compromissos",
      "/compromissos",
    ]);
    expect(getContentInvalidation("commitment").paths).not.toContain("/propostas");
  });

  it("atualiza stats públicas ao moderar demanda", () => {
    const result = getContentInvalidation("demand");
    expect(result.tags).toEqual([cacheTags.demandStats]);
    expect(result.paths).toContain("/participe");
    expect(result.paths).toContain("/admin/demandas");
  });
});
