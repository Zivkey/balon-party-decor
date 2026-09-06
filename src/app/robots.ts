import type { MetadataRoute } from "next";
import { abs } from "@/data/site";

// Generiše /robots.txt. Do sada je vraćao 404, pa Google nije imao
// ni potvrdu da sme da krauluje ni pokazivač na sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
