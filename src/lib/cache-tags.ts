import { revalidatePath, revalidateTag, updateTag } from "next/cache";

/** Tags do data cache para consultas públicas. */
export const cacheTags = {
  proposals: "public:proposals",
  posts: "public:posts",
  commitments: "public:commitments",
  agenda: "public:agenda",
  factChecks: "public:fact-checks",
  demandStats: "public:demand-stats",
} as const;

export type PublicCacheTag = (typeof cacheTags)[keyof typeof cacheTags];

export type ContentKind =
  | "proposal"
  | "post"
  | "commitment"
  | "event"
  | "factCheck"
  | "demand";

/** Mapa canônico: o que invalidar por tipo de conteúdo (painel → site). */
export function getContentInvalidation(
  kind: ContentKind,
  options?: { slug?: string; id?: string },
): { tags: PublicCacheTag[]; paths: string[] } {
  switch (kind) {
    case "proposal": {
      const paths = ["/admin/propostas", "/propostas", "/"];
      if (options?.slug) paths.push(`/propostas/${options.slug}`);
      return { tags: [cacheTags.proposals], paths };
    }
    case "post": {
      const paths = ["/admin/noticias", "/noticias", "/"];
      if (options?.slug) paths.push(`/noticias/${options.slug}`);
      return { tags: [cacheTags.posts], paths };
    }
    case "commitment":
      return {
        tags: [cacheTags.commitments],
        paths: ["/admin/compromissos", "/compromissos"],
      };
    case "event": {
      const paths = ["/admin/agenda", "/agenda"];
      if (options?.id) paths.push(`/agenda/${options.id}`);
      return { tags: [cacheTags.agenda], paths };
    }
    case "factCheck":
      return {
        tags: [cacheTags.factChecks],
        paths: ["/admin/checagens", "/verdade-ou-boato"],
      };
    case "demand":
      return {
        tags: [cacheTags.demandStats],
        paths: ["/admin/demandas", "/participe"],
      };
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

/**
 * Invalida data cache (tags) e rotas relacionadas.
 * Em Server Actions usa updateTag para refletir a publicação na hora.
 */
export function invalidatePublicContent(
  kind: ContentKind,
  options?: { slug?: string; id?: string },
) {
  const { tags, paths } = getContentInvalidation(kind, options);
  for (const tag of tags) {
    updateTag(tag);
    revalidateTag(tag, "max");
  }
  for (const path of paths) {
    revalidatePath(path);
  }
}

/** Intervalo de segurança (segundos) se o painel não invalidar. */
export const PUBLIC_DATA_REVALIDATE_SECONDS = 300;
