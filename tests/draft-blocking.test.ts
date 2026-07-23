import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db", () => ({
  hasDatabase: vi.fn(() => false),
  getDb: vi.fn(() => {
    throw new Error("getDb não deve ser chamado sem DATABASE_URL nos testes");
  }),
}));

import {
  getAllPosts,
  getAllProposals,
  getPostBySlug,
  getPosts,
  getProposalBySlug,
  getProposals,
} from "@/lib/data";

const DRAFT_PROPOSAL = "rascunho-proposta-interna";
const DRAFT_NEWS = "rascunho-noticia-interna";
const PUBLISHED_PROPOSAL = "saude-perto-de-quem-precisa";

describe("bloqueio de rascunhos no site público", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lista pública de propostas omite rascunhos e inclui publicados", async () => {
    const [publicList, adminList] = await Promise.all([getProposals(), getAllProposals()]);

    expect(publicList.every((item) => item.published === true)).toBe(true);
    expect(publicList.some((item) => item.slug === DRAFT_PROPOSAL)).toBe(false);
    expect(adminList.some((item) => item.slug === DRAFT_PROPOSAL)).toBe(true);
    expect(publicList.some((item) => item.slug === PUBLISHED_PROPOSAL)).toBe(true);
  });

  it("getProposalBySlug e getPostBySlug retornam null para rascunho", async () => {
    const [published, draftProposal, draftNews] = await Promise.all([
      getProposalBySlug(PUBLISHED_PROPOSAL),
      getProposalBySlug(DRAFT_PROPOSAL),
      getPostBySlug(DRAFT_NEWS),
    ]);

    expect(published?.published).toBe(true);
    expect(draftProposal).toBeNull();
    expect(draftNews).toBeNull();
  });

  it("lista pública de notícias omite rascunhos", async () => {
    const [publicPosts, adminPosts] = await Promise.all([getPosts(), getAllPosts()]);

    expect(publicPosts.every((item) => item.published === true)).toBe(true);
    expect(publicPosts.some((item) => item.slug === DRAFT_NEWS)).toBe(false);
    expect(adminPosts.some((item) => item.slug === DRAFT_NEWS)).toBe(true);
  });
});
