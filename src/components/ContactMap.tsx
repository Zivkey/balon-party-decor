import { SITE, KONTAKT } from "@/data/site";

// Google Maps embed. Namerno se traži po NAZIVU I ADRESI, a ne po koordinatama:
// upit sa koordinatama prikaže bezimenu crvenu kapljicu, dok ovakav upit pogodi
// Google Business Profile i prikaže karticu sa nazivom radnje i ocenom.
// Gradi se iz istih podataka kao schema, da adresa ne može da se raziđe.
const MAPS_EMBED =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent(`${SITE.name}, ${KONTAKT.address}`) +
  "&z=16&hl=sr&output=embed";

/**
 * Živa Google mapa — uvek učitana, i cela je jedan link.
 *
 * Iframe je namerno `pointer-events-none` (i van tab reda): inače bi prvi klik
 * otišao Google-ovom embedu (pomeranje mape), pa bi tek "View larger map"
 * unutar njega vodio na Maps — dakle dva klika. Ovako prvi klik bilo gde na
 * mapi otvara Google Maps.
 */
export default function ContactMap({
  alt,
  href,
}: {
  alt: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${alt}, otvori u Google Maps`}
      className="group relative mx-auto mt-8 block max-w-4xl overflow-hidden rounded-3xl shadow-[0_24px_50px_-28px_rgba(124,29,44,0.45)] ring-1 ring-wine/10 transition duration-200 hover:shadow-[0_28px_60px_-26px_rgba(124,29,44,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
    >
      <iframe
        title={alt}
        src={MAPS_EMBED}
        className="pointer-events-none block h-[300px] w-full border-0 sm:h-[380px]"
        loading="eager"
        tabIndex={-1}
        aria-hidden="true"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Oznaka da je mapa klikabilna */}
      <span className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-wine shadow-[0_6px_16px_-6px_rgba(124,29,44,0.5)] transition duration-200 group-hover:bg-white">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
        </svg>
        Otvori u Google Maps
      </span>
    </a>
  );
}
