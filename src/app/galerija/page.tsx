import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { BALONI } from "@/data/baloni";
import { DEKORACIJE } from "@/data/dekoracije";
import { SITE, OG_IMAGE, abs } from "@/data/site";

const NASLOV = "Galerija radova - baloni i dekoracije";
const OPIS =
  "Fotografije naših buketa od balona, poklon kutija i dekoracija za rođendane, baby shower, gender reveal i krštenja. Balon Party Decor, Niš.";

export const metadata: Metadata = {
  // Brend se dodaje automatski iz template-a u layout.tsx.
  title: NASLOV,
  description: OPIS,
  alternates: { canonical: "/galerija" },
  openGraph: {
    type: "website",
    title: `${NASLOV} | ${SITE.name}`,
    description: OPIS,
    url: abs("/galerija"),
    siteName: SITE.name,
    locale: SITE.locale,
    images: [OG_IMAGE],
  },
};

// Breadcrumb da Google u rezultatu ispiše „balonpartydecor.rs › Galerija“
// umesto golog URL-a.
const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Početna", item: abs("/") },
    { "@type": "ListItem", position: 2, name: "Galerija", item: abs("/galerija") },
  ],
};

export default function GalerijaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
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
              Buketi od balona, poklon kutije i dekoracije. Sve naše kreacije na
              jednom mestu.
            </p>
          </Reveal>

          {/* — Buketi od balona — */}
          <section id="baloni" className="scroll-mt-8">
            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-bold text-wine sm:text-3xl">
                Buketi od balona
              </h2>
            </Reveal>

            <Reveal
              className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              // Sitan stagger — uz ovoliko slika veći korak bi razvukao uvod na više sekundi.
              stagger={0.04}
            >
              {BALONI.map((img, i) => (
                <div
                  key={img.id}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-pink-soft shadow-[0_16px_30px_-12px_rgba(124,29,44,0.3)]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    // Prvih 6 je iznad preloma — ostalo se učitava lenjo.
                    priority={i < 6}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </Reveal>
          </section>

          {/* — Dekoracije — */}
          <section id="dekoracije" className="scroll-mt-8">
            <Reveal stagger={0.1}>
              <h2 className="mt-16 font-display text-2xl font-bold text-wine sm:text-3xl">
                Dekoracije
              </h2>
              <p className="mt-2 max-w-2xl text-wine/70">
                Balonske dekoracije po meri za rođendane, krštenja, baby shower,
                gender reveal i sve druge proslave.
              </p>
            </Reveal>

            <Reveal
              className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2"
              stagger={0.06}
            >
              {DEKORACIJE.map((d) => (
                <figure key={d.id}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-pink-soft shadow-[0_16px_30px_-12px_rgba(124,29,44,0.3)]">
                    <Image
                      src={d.src}
                      alt={d.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 font-hand text-lg text-ink/80">
                    {d.caption}
                  </figcaption>
                </figure>
              ))}
            </Reveal>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
