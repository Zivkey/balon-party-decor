// Google Maps embed centriran na radnju (Balon party decor, Niš).
const MAPS_EMBED =
  "https://maps.google.com/maps?q=43.3199802,21.9053382&z=16&hl=sr&output=embed";

/**
 * Živa Google mapa — uvek učitana (bez lazy zamene slike/loadera pri hoveru).
 */
export default function ContactMap({ alt }: { alt: string }) {
  return (
    <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl shadow-[0_24px_50px_-28px_rgba(124,29,44,0.45)] ring-1 ring-wine/10">
      <iframe
        title={alt}
        src={MAPS_EMBED}
        className="block h-[300px] w-full border-0 sm:h-[380px]"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
