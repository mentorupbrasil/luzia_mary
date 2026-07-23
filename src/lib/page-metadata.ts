import type { Metadata } from "next";
import { content } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

export type PageMetadataInput = {
  /** Título curto da página (o template do layout acrescenta " | Luzia Mary"). */
  title: string;
  description: string;
  /** Caminho canônico, ex.: "/", "/sobre", "/propostas/slug". */
  path: string;
  /** Imagem absoluta ou relativa ao domínio oficial. */
  image?: string | null;
  type?: "website" | "article";
  /**
   * Usa o title sem o template do layout (home e títulos já completos).
   */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

function absoluteUrl(path: string) {
  const base = getSiteUrl().replace(/\/$/, "");
  const normalized = normalizePath(path);
  return normalized === "/" ? base : `${base}${normalized}`;
}

function resolveImageUrl(image?: string | null) {
  if (!image?.trim()) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  const base = getSiteUrl().replace(/\/$/, "");
  return `${base}${image.startsWith("/") ? image : `/${image}`}`;
}

/** Limita description para meta tags sem cortar no meio de palavra. */
export function clipMetaDescription(text: string, max = 160) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const slice = cleaned.slice(0, max - 1);
  const safe = slice.replace(/\s+\S*$/, "").trimEnd();
  return `${safe || slice.trimEnd()}…`;
}

/**
 * Metadados públicos padronizados: title, description, canonical, Open Graph e Twitter.
 * Usa o domínio oficial (`getSiteUrl`) e o nome da candidata em OG/Twitter.
 */
export function createPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const brand = content.candidate.ballotName;
  const canonicalPath = normalizePath(path);
  const url = absoluteUrl(canonicalPath);
  const desc = clipMetaDescription(description);
  const socialTitle = title.includes(brand) ? title : `${title} | ${brand}`;
  const imageUrl = resolveImageUrl(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: socialTitle,
      description: desc,
      url,
      siteName: brand,
      locale: "pt_BR",
      type,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: desc,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

export { absoluteUrl as getAbsoluteUrl };
