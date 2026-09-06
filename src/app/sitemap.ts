import type { MetadataRoute } from "next";
import { SITE, abs } from "@/data/site";

// Generiše /sitemap.xml — spisak strana koje Google treba da indeksira.
// Sajt ima dve strane; kad se doda nova ruta, dopiši je ovde.
export default function sitemap(): MetadataRoute.Sitemap {
  const azurirano = new Date();

  return [
    {
      // SITE.url (bez kose crte) da bude slovo u slovo isti kao canonical.
      url: SITE.url,
      lastModified: azurirano,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: abs("/galerija"),
      lastModified: azurirano,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
