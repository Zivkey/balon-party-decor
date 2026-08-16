"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DEKORACIJE_KOLAZ } from "@/data/dekoracije";

// Ručno raspoređen kolaž polaroida — 3 u redu, dva reda, blago nakrivljeni.
// Pozicije u % kontejnera → skalira se proporcionalno na svim ekranima.
//
// zoom = transform kojim se BAŠ TA kartica dovodi u centar kontejnera i uveća.
// Računato iz rasporeda: kartica je široka 33% kontejnera, a visoka 51.67%
// njegove visine (33% × 468/427 podeljeno sa 0.7, jer je kontejner 10/7).
// Pomeraj je u % SOPSTVENE veličine kartice, pa ide pre scale() u transform-u
// (funkcije se primenjuju s desna na levo) da ga uvećanje ne bi umnožilo.
const SLOTS = [
  { left: "0%", top: "0%", rot: -1.5, z: "z-[2]", zoom: "translate(101.5%, 46.8%)" },
  { left: "33.5%", top: "0%", rot: 1.2, z: "z-[4]", zoom: "translate(0%, 46.8%)" },
  { left: "67%", top: "0%", rot: -1, z: "z-[3]", zoom: "translate(-101.5%, 46.8%)" },
  { left: "0%", top: "48%", rot: 1.2, z: "z-[5]", zoom: "translate(101.5%, -46.1%)" },
  { left: "33.5%", top: "48%", rot: -1.4, z: "z-[6]", zoom: "translate(0%, -46.1%)" },
  { left: "67%", top: "48%", rot: 1, z: "z-[4]", zoom: "translate(-101.5%, -46.1%)" },
];

// Uvećanje aktivne kartice na mobilnom. 2.2 je namerno ispod "pune širine":
// veći faktor bi karticu izvukao iz kontejnera toliko da naleti na naslov iznad
// i dugme ispod, jer je kontejner (10/7) niži nego što uvećana kartica traži.
const ZOOM = 2.2;

// Trajanje zuma, na jednom mestu umesto kao Tailwind klasa.
const ZOOM_MS = 500;

/** Rukom crtana strelica ka kolažu (samo mobilni). */
function KlikniMe() {
  return (
    <div className="pointer-events-none mb-2 flex items-start gap-2 pl-2 sm:hidden">
      <span className="font-hand -mt-1 -rotate-6 text-2xl leading-none text-wine/85">
        Klikni me
      </span>
      <svg
        className="h-14 w-20 shrink-0 text-wine/70"
        viewBox="0 0 72 58"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Linija se na sredini uvrne u petlju (treći i četvrti segment se
            preseku), pa nastavi ka karticama. Vrh je u (64,50), a krakovi su
            pod ±30° u odnosu na pravac krive na tom mestu (~0.41, 0.91) —
            inače vrh izgleda kao kukica, a ne kao strelica. */}
        <path d="M4 8C14 4 26 6 30 14C33 20 28 25 24 21C20 17 26 10 36 14C48 19 56 32 64 50" />
        <path d="M64 50L65 36" />
        <path d="M64 50L53 42" />
      </svg>
    </div>
  );
}

export default function DekoracijeKolaz() {
  const [active, setActive] = useState<number | null>(null);
  // Prethodno otvorena kartica. Ostaje podignuta iznad ostalih i pošto se
  // skupi — namerno se NE spušta na tajmer ni na transitionend, jer svako
  // takvo merenje ume da opali pre kraja animacije i tada susedne kartice
  // preskoče preko nje usred skupljanja. U mirovanju se kartice ionako jedva
  // dodiruju, pa jedna trajno podignuta ništa ne kvari.
  const [prevActive, setPrevActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Klik-zum radi samo na mobilnom; na širem ekranu su sve kartice ionako
  // dovoljno velike, pa tamo ostaje samo hover.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setActive(null);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggle = (i: number) => {
    if (!isMobile) return;
    const next = active === i ? null : i;

    // Pokriva i zatvaranje (active → null) i prebacivanje na drugu karticu:
    // stara ostaje na međusloju, nova ide na vrh.
    if (active !== null && active !== next) setPrevActive(active);

    setActive(next);
  };

  return (
    <div>
      <KlikniMe />

      <div className="@container relative mx-auto aspect-[10/7] w-full">
        {SLOTS.map((slot, i) => {
          const d = DEKORACIJE_KOLAZ[i];
          if (!d) return null;
          const isActive = active === i;
          return (
            <div
              key={d.id}
              className={`absolute w-[33%] transition-transform ease-out ${slot.z}`}
              style={{
                left: slot.left,
                top: slot.top,
                transitionDuration: `${ZOOM_MS}ms`,
                // Aktivna se ispravlja (bez rotacije), dolazi u centar i uvećava.
                transform: isActive
                  ? `${slot.zoom} scale(${ZOOM})`
                  : `rotate(${slot.rot}deg)`,
                // 40 = uvećana, 30 = poslednja otvarana (ostaje iznad mirnih).
                zIndex: isActive ? 40 : prevActive === i ? 30 : undefined,
              }}
            >
              {/* Tanji beli okvir (4.5% sa strane i gore) → slika je krupnija,
                  a ispod ostaje pojas za rukom pisan potpis.
                  Senka u tri sloja: hairline ivica + kontaktna + meka ambijentalna —
                  da se preklopljeni polaroidi jasno razdvoje jedan od drugog. */}
              <button
                type="button"
                onClick={() => toggle(i)}
                tabIndex={isMobile ? 0 : -1}
                aria-hidden={!isMobile}
                aria-pressed={isMobile ? isActive : undefined}
                aria-label={isMobile ? `Uvećaj: ${d.caption}` : undefined}
                className="relative block aspect-[427/468] w-full cursor-default rounded-[3px] bg-white shadow-[0_0_0_1px_rgba(124,29,44,0.16),0_2px_5px_rgba(124,29,44,0.22),0_20px_36px_-14px_rgba(124,29,44,0.6)] transition-transform duration-300 max-sm:cursor-pointer sm:hover:z-20 sm:hover:scale-[1.03]"
              >
                <span
                  className="absolute block overflow-hidden rounded-[2px] bg-neutral-200/60 shadow-[inset_0_0_0_1px_rgba(44,34,36,0.12)]"
                  style={{ left: "4.5%", right: "4.5%", top: "4.5%", height: "68%" }}
                >
                  <Image
                    src={d.src}
                    alt={d.alt}
                    fill
                    sizes="(max-width: 640px) 75vw, 440px"
                    className="object-cover"
                  />
                </span>

                {/* Rukom pisan potpis u belom pojasu ispod slike. */}
                <span
                  className="absolute flex items-center justify-center"
                  style={{ left: "4.5%", right: "4.5%", top: "72.5%", bottom: "2.5%" }}
                >
                  <span className="font-hand text-center leading-tight text-[clamp(0.8rem,2cqw,1.4rem)] text-ink/85">
                    {d.caption}
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
