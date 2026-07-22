import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Galerija — Balon Party Decor",
  description:
    "Galerija buketa od balona, poklon kutija i dekoracija — Balon Party Decor, Niš.",
};

// Sve slike galerije (za sad iz public/baloni/ — dodaje se lako).
const IMAGES = [
  { src: "/baloni/1.jpg", alt: "Plišani meda u roze poklon torbici sa balonima u obliku srca" },
  { src: "/baloni/2.jpg", alt: "Baby boy korpa sa plišanim medom, Kinder Bueno čokoladama i balonom" },
  { src: "/baloni/3.jpg", alt: "Buket sa crvenim srce-balonom, ružama, Raffaello i medom sa diplomom" },
];

export default function GalerijaPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:py-10">
        {/* Nazad na početnu */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-pink-soft px-4 py-2 text-sm font-medium text-wine transition hover:bg-pink-mid"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Nazad
        </Link>

        <Reveal stagger={0.1}>
          <h1 className="mt-8 font-display text-4xl font-extrabold text-wine sm:text-5xl">
            Galerija
          </h1>
          <p className="mt-2 max-w-xl text-wine/70">
            Buketi od balona, poklon kutije i dekoracije — sve naše kreacije na
            jednom mestu.
          </p>
        </Reveal>

        <Reveal
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.12}
        >
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-pink-soft shadow-[0_16px_30px_-12px_rgba(124,29,44,0.3)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </main>
  );
}
