import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = [
    "",
    "/sobre",
    "/propostas",
    "/compromissos",
    "/demandas",
    "/agenda",
    "/verdade-ou-boato",
    "/transparencia",
    "/noticias",
    "/privacidade",
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
