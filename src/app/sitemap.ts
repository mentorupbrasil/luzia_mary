import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const paths = ["", "/sobre", "/propostas", "/compromissos", "/demandas", "/agenda", "/verdade-ou-boato", "/transparencia", "/noticias", "/privacidade"];
  return paths.map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "daily" : "weekly", priority: path === "" ? 1 : .7 }));
}
