import Image from "next/image";
import SkyBalloon from "./SkyBalloon";
import Parallax from "./Parallax";
import ContactMap from "./ContactMap";
import Reveal from "./Reveal";

const PHONE_LABEL = "+381 61 6588353";
const PHONE_HREF = "tel:+381616588353";
const INSTAGRAM = "https://www.instagram.com/balon_party_decor/";
const ADDRESS = "Vozdova 48, Niš";
const MAPS_URL = "https://maps.app.goo.gl/U82bvJen3m3tV4c37";

function Ribbon() {
  return (
    // Tačna mašna iz Figme (kompozicija 5 vektora → /hero/cestitka-ribbon.svg).
    // w = 100% + 24px (p-3 čestitke) → repovi trake dosežu do belih ivica.
    <img
      src="/hero/cestitka-ribbon.svg"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[62%] z-20 w-[calc(100%+24px)] max-w-none -translate-x-1/2 select-none"
    />
  );
}

export default function Contact() {
  return (
    <section id="kontakt" className="relative overflow-hidden bg-white">
      {/* Nebo u pozadini, bledi ka beloj */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[880px] bg-cover bg-top"
        style={{
          backgroundImage: "url(/hero/nebo.png)",
          maskImage: "linear-gradient(to bottom, #000 58%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 58%, transparent)",
        }}
      />

      {/* Baloni raštrkani po nebu — lete naviše (parallax) pri skrolu */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[900px]">
        <SkyBalloon color="zlatna" width={125} rotate={-10} speed={94} className="left-[7%] top-[15%]" />
        <SkyBalloon color="crvena" width={101} rotate={8} speed={162} className="left-[19%] top-[42%]" />
        <SkyBalloon color="tirkiz" width={88} rotate={-6} speed={204} className="left-[5%] top-[64%]" />
        <SkyBalloon color="plava" width={140} rotate={12} speed={110} className="left-[83%] top-[12%]" />
        <SkyBalloon color="srebrna" width={96} rotate={-8} speed={187} className="left-[90%] top-[45%]" />
        <SkyBalloon color="crvena" width={117} rotate={6} speed={136} className="left-[76%] top-[67%]" />
        <SkyBalloon color="zlatna" width={78} rotate={-12} speed={238} className="left-[31%] top-[7%]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-20">
        {/* Čestitka */}
        <Reveal className="relative mx-auto max-w-sm" y={32} duration={0.85}>
          <Parallax speed={45}>
            <div className="rotate-[-3deg] bg-[#fff4f8] p-3 shadow-[0_30px_60px_-24px_rgba(124,29,44,0.55)]">
            <div className="relative aspect-[986/1408] w-full">
              {/* Scalloped papir doily — tačan vektor iz Figme (node 2256:459) */}
              <Image
                src="/hero/cestitka-doily.png"
                alt=""
                fill
                sizes="440px"
                className="object-contain"
              />

              <Ribbon />

              {/* Sadržaj čestitke */}
              <div className="absolute inset-0 flex flex-col items-center px-[15%] pt-[12%]">
                <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-wine uppercase">
                  Balon Party Decor
                </span>
                <h3 className="mt-4 text-center font-display text-[2rem] leading-[1.02] font-bold text-wine">
                  Stupi u kontakt sa nama
                </h3>

                <div className="mt-6 w-full space-y-3">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-between rounded-full bg-wine px-4 py-2.5 text-white transition hover:bg-wine-dark"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M4 5c0-.6.4-1 1-1h2.3c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1.1L8 10.3a12 12 0 0 0 5.7 5.7l1.4-1.6c.3-.3.7-.4 1.1-.3l3 .8c.5.1.8.5.8 1V18c0 .6-.4 1-1 1A15 15 0 0 1 4 5Z" />
                      </svg>
                      Pozovi
                    </span>
                    <span className="text-xs font-medium">{PHONE_LABEL}</span>
                  </a>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-full bg-wine px-4 py-2.5 text-white transition hover:bg-wine-dark"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                        <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
                      </svg>
                      Instagram
                    </span>
                    <span className="text-xs font-medium">@balon_party_decor</span>
                  </a>
                </div>
              </div>
            </div>
            </div>
          </Parallax>
        </Reveal>

        {/* Pronađi nas */}
        <Reveal stagger={0.12}>
          <h2 className="mt-16 text-center font-display text-4xl font-bold text-wine">
            Pronađi nas
          </h2>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 text-wine hover:underline"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            {ADDRESS}
          </a>

          <ContactMap alt={`Mapa — ${ADDRESS}`} />
        </Reveal>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-wine/60">
          © {new Date().getFullYear()} Balon Party Decor · Dostava na teritoriji
          Niša.
        </p>
      </div>
    </section>
  );
}
