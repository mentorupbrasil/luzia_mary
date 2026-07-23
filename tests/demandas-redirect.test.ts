import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";

describe("redirecionamento /demandas → /participe", () => {
  it("mantém redirect permanente (308/301) para a rota oficial", async () => {
    const redirects = nextConfig.redirects;
    expect(typeof redirects).toBe("function");

    const rules = await redirects!();
    const rule = rules.find((item) => item.source === "/demandas");

    expect(rule).toEqual({
      source: "/demandas",
      destination: "/participe",
      permanent: true,
    });
  });
});
