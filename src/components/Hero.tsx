"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import HeroSticker from "./HeroSticker";
import PhotoBalloon from "./PhotoBalloon";
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
      className="relative -mt-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #f2c4cf 0%, #f2c4cf 54%, #ffffff 84%)",
      }}
    >
      {/* Suptilna tekstura papira preko pink dela */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] mix-blend-multiply"
        style={{ backgroundImage: "url(/hero/papir-tekstura.png)", backgroundSize: "cover" }}
      />

      {/* Vertikalne roze/bele pruge — samo preko roze dela, nestaju pre bele zone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 22px, transparent 22px, transparent 44px)",
          // Prati pink→belo gradijent sekcije: pruge ostaju na celom roze delu i
          // nestaju tek kad se roze pretapa u belo.
          maskImage: "linear-gradient(to bottom, #000 54%, transparent 84%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 54%, transparent 84%)",
        }}
      />

      <div className="relative mx-auto aspect-[10/12] w-full max-w-[1440px] sm:aspect-[4/3] lg:aspect-[1440/1000]">
        {/* DEVOJKA — iza papira (z-10), izranja iznad pocepane ivice */}
        <span
          data-hero
          className="pointer-events-none absolute z-10 block"
          style={{ left: "-2%", top: "20%", width: "39%" }}
        >
          <Parallax speed={-40} anchor="top">
            <Image
              src="/hero/devojka-buket.png"
              alt="Devojka drži buket od teddy medveda, Kinder jaja i balona u obliku srca"
              width={3275}
              height={4019}
              priority
              sizes="(max-width: 768px) 55vw, 560px"
              className="h-auto w-full select-none"
            />
          </Parallax>
        </span>

        {/* POCEPANI PAPIR — puna širina ekrana, horizontalno preslikan kao u
            Figmi (pocepana ivica niža levo, viša desno). */}
        <img
          src="/hero/pocepan-papir.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[26%] z-20 w-screen max-w-none select-none"
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
          className="pointer-events-none absolute inset-x-0 top-[13%] z-30 mx-auto flex max-w-[820px] flex-col items-center px-6 text-center"
        >
          <h1 className="font-display text-[9vw] leading-[0.9] font-extrabold tracking-[-0.02em] text-[#801026] md:text-[56px] lg:text-[80px] lg:leading-[72px]">
            Tražite poklon —
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

        {/* Sivi balon — gore levo */}
        <span
          data-hero
          className="pointer-events-none absolute z-30 block"
          style={{ left: "12%", top: "4%", width: "10%" }}
        >
          <Parallax speed={-90} anchor="top">
            <span className="block" style={{ transform: "rotate(-8deg)" }}>
              <PhotoBalloon color="srebrna" />
            </span>
          </Parallax>
        </span>

        {/* Ferrero srce buket — gore desno */}
        <span
          data-hero
          className="pointer-events-none absolute z-30 block"
          style={{ left: "79%", top: "6%", width: "18%" }}
        >
          <Parallax speed={55} anchor="top">
            <span className="block" style={{ transform: "rotate(6deg)" }}>
              <HeroSticker
                src="/hero/ferrero-srce.png"
                alt="Poklon buket sa Ferrero i Kinder čokoladama i medom"
                width={1200}
                height={1600}
                dieCut
                priority
                sizes="300px"
              />
            </span>
          </Parallax>
        </span>

        {/* Zlatni balon — desno, na papiru */}
        <span
          data-hero
          className="pointer-events-none absolute z-30 block"
          style={{ left: "69%", top: "40%", width: "13%" }}
        >
          <Parallax speed={-110} anchor="top">
            <span className="block" style={{ transform: "rotate(10deg)" }}>
              <PhotoBalloon color="zlatna" />
            </span>
          </Parallax>
        </span>

        {/* Zvezda balon sa medom — centar, na papiru */}
        <span
          data-hero
          className="pointer-events-none absolute z-30 block"
          style={{ left: "48%", top: "51%", width: "18%" }}
        >
          <Parallax speed={65} anchor="top">
            <span className="block" style={{ transform: "rotate(-8deg)" }}>
              <HeroSticker
                src="/hero/zvezda-meda.png"
                alt="Crveni balon u obliku zvezde sa plišanim medom"
                width={648}
                height={898}
                dieCut
                sizes="280px"
              />
            </span>
          </Parallax>
        </span>

        {/* Crveni balon — preko devojke, dole levo */}
        <span
          data-hero
          className="pointer-events-none absolute z-30 block"
          style={{ left: "5%", bottom: "6%", width: "10%" }}
        >
          <Parallax speed={-80} anchor="top">
            <span className="block" style={{ transform: "rotate(6deg)" }}>
              <PhotoBalloon color="crvena" />
            </span>
          </Parallax>
        </span>
      </div>
    </section>
  );
}
