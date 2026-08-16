"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DEKORACIJE_KOLAZ } from "@/data/dekoracije";

// Ručno raspoređen kolaž polaroida, blago nakrivljenih.
// Na telefonu 2 u redu (3 reda), od sm naviše 3 u redu (2 reda). Raspored ide
// kroz Tailwind klase, a ne kroz JS, da se pri učitavanju ne vidi preskakanje
// iz jednog rasporeda u drugi. Klase moraju biti ispisane cele jer ih Tailwind
// traži kao doslovan tekst u fajlu.
//
// zoom = transform kojim se BAŠ TA kartica dovodi u centar kontejnera i uveća.
// Vrednosti važe za MOBILNI raspored, jer se zumira samo tamo. Kartica je tu
// široka 49% kontejnera, a visoka 35.7% njegove visine (49% × 468/427 podeljeno
// sa 1.5, jer je kontejner 2/3). Pomeraj je u % SOPSTVENE veličine kartice, pa
// ide pre scale() u transform-u (funkcije se primenjuju s desna na levo) da ga
// uvećanje ne bi umnožilo.
const SLOTS = [
  { pos: "left-[0%] top-[0%] sm:left-[0%] sm:top-[0%]", rot: -1.5, z: "z-[2]", zoom: "translate(52%, 90.1%)" },
  { pos: "left-[51%] top-[0%] sm:left-[33.5%] sm:top-[0%]", rot: 1.2, z: "z-[4]", zoom: "translate(-52%, 90.1%)" },
  { pos: "left-[0%] top-[32%] sm:left-[67%] sm:top-[0%]", rot: -1, z: "z-[3]", zoom: "translate(52%, 0.4%)" },
  { pos: "left-[51%] top-[32%] sm:left-[0%] sm:top-[48%]", rot: 1.2, z: "z-[5]", zoom: "translate(-52%, 0.4%)" },
  { pos: "left-[0%] top-[64%] sm:left-[33.5%] sm:top-[48%]", rot: -1.4, z: "z-[6]", zoom: "translate(52%, -89.2%)" },
  { pos: "left-[51%] top-[64%] sm:left-[67%] sm:top-[48%]", rot: 1, z: "z-[4]", zoom: "translate(-52%, -89.2%)" },
];

// Uvećanje aktivne kartice na mobilnom (≈88% širine kontejnera).
// Uz 2 u redu kartica je i u miru krupna (49% širine), pa je dovoljno 1.8×.
// Na 375px ekranu kontejner je 327×490, kartica u miru 160×175 → zumirana
// 288×315, što staje unutar kontejnera i po visini, tako da ne naleće ni na
// strelicu iznad ni na dugme ispod.
const ZOOM = 1.8;

// Trajanje zuma, na jednom mestu umesto kao Tailwind klasa.
const ZOOM_MS = 500;

// Otvaranje: kreće mekano, ubrza i na kraju malo prebaci pa se slegne (y > 1 u
// drugoj kontrolnoj tački). Prebačaj ide do ~1.88× umesto 1.8×, pa kartica i u
// tom trenutku staje u kontejner.
const EASE_OPEN = "cubic-bezier(0.34, 1.5, 0.64, 1)";
// Zatvaranje: bez prebačaja, jer bi kartica prvo "propala" ispod svoje mirne
// veličine pa se vraćala. Klasičan ease-in-out, mekan na oba kraja.
const EASE_CLOSE = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Rukom crtana strelica ka kolažu (samo mobilni). */
function KlikniMe() {
  return (
    <div className="pointer-events-none mb-3 flex items-start gap-2 pl-2 sm:hidden">
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

      <div className="@container relative mx-auto aspect-[2/3] w-full sm:aspect-[10/7]">
        {SLOTS.map((slot, i) => {
          const d = DEKORACIJE_KOLAZ[i];
          if (!d) return null;
          const isActive = active === i;
          return (
            <div
              key={d.id}
              className={`absolute w-[49%] transition-transform sm:w-[33%] ${slot.pos} ${slot.z}`}
              style={{
                transitionDuration: `${ZOOM_MS}ms`,
                transitionTimingFunction: isActive ? EASE_OPEN : EASE_CLOSE,
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
