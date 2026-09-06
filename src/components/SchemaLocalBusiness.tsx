import { SITE, KONTAKT, abs } from "@/data/site";

/**
 * JSON-LD schema koju Google čita da bi znao da je ovo prava radnja u Nišu,
 * a ne bilo koji sajt. Ovo je ono što povezuje sajt sa Google Business
 * Profilom i što omogućava da se u rezultatu pojave adresa, telefon i mapa.
 *
 * Naziv, adresa i telefon (NAP) MORAJU biti slovo u slovo isti kao na GBP-u —
 * svako razilaženje slabi lokalni ranking.
 */
export default function SchemaLocalBusiness() {
  const schema = {
    "@context": "https://schema.org",
    // GiftShop je najprecizniji schema.org tip za poklon radnju
    // (GiftShop → Store → LocalBusiness), a Google ga tretira kao LocalBusiness.
    "@type": "GiftShop",
    "@id": `${SITE.url}/#radnja`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: KONTAKT.phoneHref.replace("tel:", ""),
    image: [
      abs("/baloni/IMG_1675.jpg"),
      abs("/dekoracije/lenka.jpg"),
      abs("/dekoracije/ohh-baby.jpg"),
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: KONTAKT.mapsUrl,
    // Zvanični profili istog biznisa — vezuju sajt, Instagram i Google Business
    // Profil kao jedan entitet. Isti URL stoji i u hasMap, to je u redu.
    sameAs: [KONTAKT.instagram, KONTAKT.mapsUrl],
    areaServed: {
      "@type": "City",
      name: "Niš",
    },
    currenciesAccepted: "RSD",
    // Radno vreme ide samo ako je stvarno poznato (vidi komentar u site.ts).
    ...(SITE.opening
      ? {
          openingHoursSpecification: SITE.opening.map((o) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: o.days,
            opens: o.open,
            closes: o.close,
          })),
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ponuda",
      itemListElement: [
        "Buketi od balona",
        "Poklon kutije",
        "Dekoracije za rođendane",
        "Baby shower dekoracije",
        "Gender reveal dekoracije",
        "Dekoracije za krštenja",
      ].map((usluga) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: usluga },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
