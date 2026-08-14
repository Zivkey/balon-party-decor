import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { DEKORACIJE_KOLAZ } from "@/data/dekoracije";

// Ručno raspoređen kolaž polaroida — 3 u redu, dva reda, blago nakrivljeni.
// Pozicije u % kontejnera → skalira se proporcionalno na svim ekranima.
// Redosled odgovara redosledu u DEKORACIJE_KOLAZ.
const SLOTS = [
  { left: "0%", top: "0%", rot: -1.5, z: "z-[2]" },
  { left: "33.5%", top: "0%", rot: 1.2, z: "z-[4]" },
  { left: "67%", top: "0%", rot: -1, z: "z-[3]" },
  { left: "0%", top: "48%", rot: 1.2, z: "z-[5]" },
  { left: "33.5%", top: "48%", rot: -1.4, z: "z-[6]" },
  { left: "67%", top: "48%", rot: 1, z: "z-[4]" },
];

export default function Dekoracije() {
  return (
    <section
      id="dekoracije"
      className="relative z-10 mt-10 bg-pink-mid py-16 sm:py-20"
    >
      {/* Gornja i donja scallop ivica (pozicija, senka i oblik su u globals.css) */}
      <div aria-hidden="true" className="scallop scallop-top">
        <div className="scallop-shadow">
          <div className="scallop-shape scallop-shape-top" />
        </div>
      </div>
      <div aria-hidden="true" className="scallop scallop-bottom">
        <div className="scallop-shadow">
          <div className="scallop-shape scallop-shape-bottom" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal stagger={0.12}>
          <h2 className="font-display text-3xl font-bold text-wine sm:text-4xl">
            Balonske dekoracije u Nišu
          </h2>
          <p className="mt-3 text-wine/70">
            Balon Party Decor pravi balonske dekoracije po meri za rođendane,
            krštenja, baby shower, gender reveal, devojačko veče, punoletstva i
            firmske proslave. Boje i izgled dogovaramo po vašoj želji,
            dekoraciju prilagođavamo prostoru i postavljamo je na teritoriji
            Niša i okoline.
          </p>
        </Reveal>
      </div>

      {/* Kolaž je širi od teksta — polaroidi tako dobijaju više prostora. */}
      <div className="mx-auto max-w-[84rem] px-6">
        <Reveal className="@container relative mx-auto mt-10 aspect-[10/7] w-full">
          {SLOTS.map((slot, i) => {
            const d = DEKORACIJE_KOLAZ[i];
            if (!d) return null;
            return (
              <div
                key={d.id}
                className={`absolute w-[33%] ${slot.z}`}
                style={{
                  left: slot.left,
                  top: slot.top,
                  transform: `rotate(${slot.rot}deg)`,
                }}
              >
                {/* Tanji beli okvir (4.5% sa strane i gore) → slika je krupnija,
                    a ispod ostaje pojas za rukom pisan potpis.
                    Senka u tri sloja: hairline ivica + kontaktna + meka ambijentalna —
                    da se preklopljeni polaroidi jasno razdvoje jedan od drugog. */}
                <div className="relative aspect-[427/468] rounded-[3px] bg-white shadow-[0_0_0_1px_rgba(124,29,44,0.16),0_2px_5px_rgba(124,29,44,0.22),0_20px_36px_-14px_rgba(124,29,44,0.6)] transition-transform duration-300 hover:z-20 hover:scale-[1.03]">
                  <div
                    className="absolute overflow-hidden rounded-[2px] bg-neutral-200/60 shadow-[inset_0_0_0_1px_rgba(44,34,36,0.12)]"
                    style={{ left: "4.5%", right: "4.5%", top: "4.5%", height: "68%" }}
                  >
                    <Image
                      src={d.src}
                      alt={d.alt}
                      fill
                      sizes="(max-width: 640px) 45vw, 440px"
                      className="object-cover"
                    />
                  </div>

                  {/* Rukom pisan potpis u belom pojasu ispod slike. */}
                  <div
                    className="absolute flex items-center justify-center"
                    style={{ left: "4.5%", right: "4.5%", top: "72.5%", bottom: "2.5%" }}
                  >
                    <span className="font-hand text-center leading-tight text-[clamp(0.8rem,2cqw,1.4rem)] text-ink/85">
                      {d.caption}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/galerija#dekoracije"
            className="inline-flex items-center gap-2 rounded-full bg-wine px-7 py-3.5 text-sm font-medium text-white transition hover:bg-wine-dark"
          >
            Pogledaj sve dekoracije
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
