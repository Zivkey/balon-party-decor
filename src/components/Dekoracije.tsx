import Reveal from "./Reveal";

// Ručno raspoređen kolaž polaroida — razmaknuti, blago nakrivljeni (kao u Figmi).
// Pozicije u % kontejnera → skalira se proporcionalno na svim ekranima.
const POLAROIDS = [
  { left: "3%", top: "2%", rot: -2, z: "z-[2]" },
  { left: "34%", top: "0%", rot: 2, z: "z-[4]" },
  { left: "65%", top: "3%", rot: -1, z: "z-[3]" },
  { left: "4%", top: "48%", rot: 2, z: "z-[5]" },
  { left: "34%", top: "50%", rot: -2, z: "z-[6]" },
  { left: "64%", top: "47%", rot: 1, z: "z-[4]" },
];

export default function Dekoracije() {
  return (
    <section
      id="dekoracije"
      className="relative z-10 mt-10 bg-pink-mid py-16 sm:py-20"
    >
      {/* Gornja scallop ivica + blaga senka po zaobljenoj ivici svakog kruga
          (filter na wrapper-u, mask na detetu — jer filter ide PRE mask-a). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-full"
        style={{ filter: "drop-shadow(0 -3px 2px rgba(124,29,44,0.38))" }}
      >
        <div className="scallop-shape scallop-shape-top" />
      </div>
      {/* Donja scallop ivica + blaga senka po zaobljenoj ivici svakog kruga */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-full"
        style={{ filter: "drop-shadow(0 3px 2px rgba(124,29,44,0.38))" }}
      >
        <div className="scallop-shape scallop-shape-bottom" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal stagger={0.12}>
          <h2 className="font-display text-3xl font-bold text-wine sm:text-4xl">
            Dekoracije
          </h2>
          <p className="mt-2 max-w-xl text-wine/70">
            Balonske dekoracije za rođendane, krštenja, proslave i sve posebne
            trenutke — osmišljene za vaš prostor.
          </p>
        </Reveal>

        <Reveal className="relative mx-auto mt-10 aspect-16/11 w-full">
          {POLAROIDS.map((p, i) => (
            <div
              key={i}
              className={`absolute w-[32%] ${p.z}`}
              style={{ left: p.left, top: p.top, transform: `rotate(${p.rot}deg)` }}
            >
              {/* Frame 427×468, slika 363×270 → bočni border 7.5%, gornji 6.84%, donji ~35.5% */}
              <div className="relative aspect-[427/468] rounded-[3px] bg-white shadow-[0_16px_30px_-12px_rgba(124,29,44,0.55)] transition-transform duration-300 hover:z-20 hover:scale-[1.03]">
                <div
                  className="absolute rounded-[2px] bg-pink-soft/70"
                  style={{ left: "7.5%", right: "7.5%", top: "6.84%", height: "57.7%" }}
                />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
