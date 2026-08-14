import Link from "next/link";
import { KONTAKT } from "@/data/kontakt";

const LINKOVI = [
  { href: "/#baloni", label: "Baloni" },
  { href: "/#dekoracije", label: "Dekoracije" },
  { href: "/galerija", label: "Galerija" },
  { href: "/galerija#dekoracije", label: "Galerija dekoracija" },
  { href: "/#kontakt", label: "Kontakt" },
];

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 5c0-.6.4-1 1-1h2.3c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1.1L8 10.3a12 12 0 0 0 5.7 5.7l1.4-1.6c.3-.3.7-.4 1.1-.3l3 .8c.5.1.8.5.8 1V18c0 .6-.4 1-1 1A15 15 0 0 1 4 5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-10 bg-pink-mid text-wine">
      {/* Ista talasasta ivica kao na sekciji Dekoracije (stilovi u globals.css) */}
      <div aria-hidden="true" className="scallop scallop-top">
        <div className="scallop-shadow">
          <div className="scallop-shape scallop-shape-top" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brend */}
          <div>
            <span className="font-display text-xl font-bold tracking-wide uppercase">
              Balon Party Decor
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-wine/70">
              Buketi od balona, poklon kutije i balonske dekoracije po meri.
              Radimo na teritoriji Niša i okoline.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-wine/60 uppercase">
              Kontakt
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={KONTAKT.phoneHref}
                  className="inline-flex items-center gap-3 text-wine/90 transition hover:text-wine"
                >
                  <PhoneIcon />
                  {KONTAKT.phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={KONTAKT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-wine/90 transition hover:text-wine"
                >
                  <InstagramIcon />
                  {KONTAKT.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={KONTAKT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-wine/90 transition hover:text-wine"
                >
                  <PinIcon />
                  {KONTAKT.address}
                </a>
              </li>
            </ul>
          </div>

          {/* Prečice */}
          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-wine/60 uppercase">
              Prečice
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {LINKOVI.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-wine/90 transition hover:text-wine hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-wine/20 pt-6 text-sm text-wine/60">
          © {new Date().getFullYear()} Balon Party Decor · Dostava na teritoriji
          Niša.
        </div>
      </div>
    </footer>
  );
}
