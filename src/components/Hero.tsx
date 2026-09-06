"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import HeroSticker from "./HeroSticker";
import SkyBalloon from "./SkyBalloon";
import Parallax from "./Parallax";

gsap.registerPlugin(useGSAP);

/**
 * Hero kao "canvas" verno prema Figmi (frame 1440×~1000).
 * Pozadina sekcije je gradijent roze→belo (puna širina + meko stapanje u belu
 * Baloni sekciju), a beli overlay pri dnu glača prelaz. Pocepani papir je preko
 * CELE širine (w-screen) i daje samo teksturu pocepane ivice.
 */
export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  // Suptilan "appear" pri učitavanju — naslov i stikeri ulete redom.
  // Elementi kreću skriveni preko CSS-a ([data-hero]{opacity:0}) da nema blica.
  useGSAP(
    () => {
      const els = scope.current
        ? Array.from(scope.current.querySelectorAll<HTMLElement>("[data-hero]"))
        : [];
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Bez animacije (reduced-motion ili skrivena/pozadinska kartica) → samo prikaži.
      if (reduce || document.hidden) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        els,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.09 },
      );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      // Roze→belo prati poziciju pocepanog papira, koja se razlikuje po
      // breakpointu (46% / 56% / 26%).
      className="relative -mt-20 overflow-hidden bg-[linear-gradient(to_bottom,#f2c4cf_0%,#f2c4cf_42%,#ffffff_62%)] sm:bg-[linear-gradient(to_bottom,#f2c4cf_0%,#f2c4cf_52%,#ffffff_72%)] lg:bg-[linear-gradient(to_bottom,#f2c4cf_0%,#f2c4cf_54%,#ffffff_84%)]"
    >
      {/* Suptilna tekstura papira preko pink dela */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] mix-blend-multiply"
        style={{ backgroundImage: "url(/hero/papir-tekstura.webp)", backgroundSize: "cover" }}
      />

      {/* Vertikalne roze/bele pruge — samo preko roze dela, nestaju pre bele zone */}
      <div
        aria-hidden="true"
        // Maska prati pink→belo gradijent sekcije: pruge ostaju na celom roze
        // delu i nestaju tek kad se roze pretapa u belo (ranije na mobilnom).
        className="pointer-events-none absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,#000_42%,transparent_62%)] sm:[mask-image:linear-gradient(to_bottom,#000_52%,transparent_72%)] lg:[mask-image:linear-gradient(to_bottom,#000_54%,transparent_84%)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 22px, transparent 22px, transparent 44px)",
        }}
      />

      {/* Do lg-a je layout "složen" (tekst gore, dva velika stikera dole);
          od lg-a je Figma platno 1440×860 sa raspoređenim elementima. */}
      <div className="relative mx-auto aspect-[10/17] w-full max-w-[1440px] sm:aspect-[10/13] md:aspect-[10/11] lg:aspect-[1440/1000] xl:aspect-[1440/860]">
        {/* DEVOJKA — ispod lg-a je levi stiker na papiru (z-30), od lg-a je iza
            papira (z-10) i izranja iznad pocepane ivice, kao u Figmi. */}
        <span
          data-hero
          className="pointer-events-none absolute z-30 block left-[0%] top-[56%] w-[58%] sm:left-[2%] sm:top-[53%] sm:w-[45%] md:top-[52%] md:w-[38%] lg:left-[-2%] lg:top-[20%] lg:z-10 lg:w-[39%]"
        >
          <Parallax speed={-40} anchor="top">
            <Image
              src="/hero/devojka-buket.png"
              alt="Devojka drži buket od teddy medveda, Kinder jaja i balona u obliku srca"
              width={3275}
              height={4019}
              priority
              sizes="(max-width: 1024px) 45vw, 560px"
              className="h-auto w-full select-none"
            />
          </Parallax>
        </span>

        {/* POCEPANI PAPIR — puna širina ekrana, horizontalno preslikan kao u
            Figmi (pocepana ivica niža levo, viša desno). */}
        <img
          src="/hero/pocepan-papir.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[46%] z-20 w-screen max-w-none select-none sm:top-[56%] md:top-[52%] lg:top-[26%]"
          style={{
            transform: "translateX(-50%) scaleX(-1)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 70%)",
          }}
        />
        {/* Beli "bleeding" gradijent — sivkastu teksturu papira pretvara u čisto
            belu i spaja se bez šava sa belom Baloni sekcijom ispod. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-1px] left-1/2 z-20 h-[30%] w-screen max-w-none -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 74%, #ffffff 100%)",
          }}
        />

        {/* NASLOV — vrh, centrirano */}
        <div
          data-hero
          className="pointer-events-none absolute inset-x-0 top-[19%] z-30 mx-auto flex max-w-[820px] flex-col items-center px-6 text-center sm:top-[16%] min-[1440px]:top-[13%]"
        >
          <h1 className="font-display text-[9vw] leading-[0.9] font-extrabold tracking-[-0.02em] text-[#801026] md:text-[56px] lg:text-[80px] lg:leading-[72px]">
            Tražite poklon -
            <br />
            na pravom ste mestu
          </h1>
          <p className="mt-5 max-w-[440px] text-[15px] leading-[22px] text-[#801026]/75 md:text-[18px] md:leading-[24px]">
            Buketi od balona, poklon kutije i dekoracije za rođendane i sve vaše
            proslave. Ručno pravljeno, sa dostavom na teritoriji Niša.
          </p>
          <Link
            href="/galerija"
            className="pointer-events-auto mt-7 inline-flex items-center rounded-full bg-[#801026] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-wine-dark md:text-base"
          >
            Pogledaj galeriju
          </Link>
        </div>

        {/* Lebdeći baloni iz "neba" — iza devojke i proizvoda, vide se samo u praznom roze prostoru */}
        <span data-hero className="pointer-events-none absolute inset-0 z-[6] block">
          {/* Levi ugao (oslobođen) */}
          <SkyBalloon
            color="zlatna"
            width={112}
            mobileWidth={58}
            rotate={-12}
            speed={70}
            className="left-[-5%] top-[21%] sm:left-[0%] sm:top-[17%] lg:left-[1%] lg:top-[13%]"
          />
          {/* Desni ugao (oslobođen) */}
          <SkyBalloon
            color="plava"
            width={118}
            mobileWidth={62}
            rotate={12}
            speed={74}
            className="left-[87%] top-[19%] sm:left-[81%] sm:top-[15%] lg:left-[86%] lg:top-[9%]"
          />
          {/* Sitniji baloni — samo od lg naviše, na užim ekranima prave gužvu */}
          <span className="hidden lg:block">
            <SkyBalloon color="crvena" width={78} rotate={9} speed={116} className="left-[15%] top-[9%]" />
            <SkyBalloon color="srebrna" width={80} rotate={-8} speed={132} className="left-[74%] top-[12%]" />
            <SkyBalloon color="tirkiz" width={68} rotate={-6} speed={120} className="left-[91%] top-[33%]" />
          </span>
        </span>

        {/* Crveni buket sa srcima i Ferrero — ispod lg-a veliki, dole desno */}
        <span
          data-hero
          className="pointer-events-none absolute z-30 block left-[58%] top-[64%] w-[38%] sm:left-[59%] sm:top-[62%] sm:w-[32%] md:top-[60%] md:w-[27%] lg:left-[79%] lg:top-[43%] lg:w-[17%]"
        >
          <Parallax speed={55} anchor="top">
            <span className="block" style={{ transform: "rotate(5deg)" }}>
              <HeroSticker
                src="/hero/products/grad-red.png"
                alt="Crveni buket sa balonima u obliku srca, medom i Ferrero čokoladama"
                width={1017}
                height={1158}
                dieCut
                priority
                sizes="420px"
              />
            </span>
          </Parallax>
        </span>

        {/* Roze korpa sa medom — desno, na papiru. Na mobilnom izbačena (gužva). */}
        <span
          data-hero
          className="pointer-events-none absolute z-30 hidden left-[60%] top-[59%] w-[14%] lg:block"
        >
          <Parallax speed={-110} anchor="top">
            <span className="block" style={{ transform: "rotate(8deg)" }}>
              <HeroSticker
                src="/hero/products/pink-basket.png"
                alt="Roze korpa sa plišanim medom i balonima u obliku srca"
                width={911}
                height={1123}
                dieCut
                sizes="300px"
              />
            </span>
          </Parallax>
        </span>

        {/* Baby girl kofer — dole, centar. Ispod lg-a ga nema (mesto zauzima devojka). */}
        <span
          data-hero
          className="pointer-events-none absolute z-30 hidden left-[39%] top-[61%] w-[18%] lg:block"
        >
          <Parallax speed={65} anchor="top">
            <span className="block" style={{ transform: "rotate(-4deg)" }}>
              <HeroSticker
                src="/hero/products/baby-girl.png"
                alt="Lila kofer Baby girl sa plišanim medom, ružama i balonima u obliku srca"
                width={950}
                height={681}
                dieCut
                sizes="420px"
              />
            </span>
          </Parallax>
        </span>
      </div>
    </section>
  );
}
