import Link from "next/link";
import Reveal from "./Reveal";
import DekoracijeKolaz from "./DekoracijeKolaz";

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
        <Reveal className="mt-10">
          <DekoracijeKolaz />
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
