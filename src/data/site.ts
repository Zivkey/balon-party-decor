// Jedan izvor istine za sve što čitaju Google i društvene mreže.
// Menjaš samo ovde — layout.tsx, sitemap.ts, robots.ts i JSON-LD schema
// svi povlače podatke odavde, pa nema mesta gde može da se raziđe.

import { KONTAKT } from "./kontakt";

export const SITE = {
  /** Kanonski domen, BEZ kose crte na kraju. Apex (bez www) radi 308 na www. */
  url: "https://www.balonpartydecor.rs",

  /** Naziv radnje. Mora da bude identičan nazivu na Google Business Profilu. */
  name: "Balon Party Decor",

  /** Plavi link u Google rezultatu. Google seče oko 60 karaktera — drži ispod. */
  title: "Buketi od balona i dekoracije, Niš | Balon Party Decor",

  /** Sivi opis ispod linka. Google seče oko 155 karaktera — drži ispod. */
  description:
    "Ručno pravljeni buketi od balona, poklon kutije i dekoracije za rođendane, baby shower i krštenja. Radnja u Nišu - dostava po celom gradu.",

  /** sr_RS govori Fejsbuku/Vajberu da je sadržaj na srpskom. */
  locale: "sr_RS",

  /** Adresa razbijena na delove — schema.org PostalAddress traži ovako. */
  address: {
    street: "Vožda Karađorđa 106a",
    city: "Niš",
    postalCode: "18000",
    country: "RS",
  },

  /** Koordinate radnje — iste kao pin u ContactMap.tsx. */
  geo: { lat: 43.3199802, lng: 21.9053382 },

  /**
   * Kod za potvrdu vlasništva u Google Search Console.
   *
   * KAKO SE DOBIJA: Search Console → Add property → URL prefix →
   * https://www.balonpartydecor.rs → metoda „HTML tag“. Dobiješ tag oblika
   *   <meta name="google-site-verification" content="AbC123..." />
   * Ovde upiši SAMO vrednost content atributa, npr:
   *   googleVerification: "AbC123...",
   * Zatim deploy pa u Search Console klikni „Verify“.
   *
   * Dok je null, tag se uopšte ne ispisuje.
   */
  googleVerification: null as string | null,

  /**
   * Radno vreme za Google. Ostavljeno na null dok se ne potvrdi tačno vreme —
   * netačno radno vreme u schemi je gore nego nikakvo, jer Google ume da ga
   * prikaže kao „Otvoreno / Zatvoreno“ u rezultatu.
   *
   * Kad znaš vreme, popuni ovako (24h format, mora da se poklopi sa GBP-om):
   *   opening: [
   *     { days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], open: "09:00", close: "20:00" },
   *     { days: ["Saturday"], open: "09:00", close: "16:00" },
   *   ],
   */
  opening: null as
    | { days: string[]; open: string; close: string }[]
    | null,
} as const;

/**
 * Deljena OG slika (src/app/opengraph-image.jpg, serviran na /opengraph-image.jpg).
 * Početna je dobija automatski preko Next file-convention-a, ali svaka podstranica
 * koja deklariše svoj `openGraph` blok zameni ceo objekat i izgubi je — zato je
 * ovde, da se doda eksplicitno.
 */
export const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Buketi od balona, poklon kutije i balonske dekoracije - Balon Party Decor, Niš",
} as const;

/** Apsolutni URL iz putanje — npr. abs("/galerija"). */
export const abs = (path = "/") => new URL(path, SITE.url).toString();

/** Isti kontakt podaci, samo prosleđeni dalje da schema ima jedan import. */
export { KONTAKT };
