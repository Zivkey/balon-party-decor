import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

// Next-ova podrazumevana 404 je na engleskom ("This page could not be found"),
// što na srpskom sajtu vide i posetioci i Google. Ova je na srpskom i vraća
// korisnika na sadržaj umesto u ćorsokak.
export const metadata: Metadata = {
  title: "Stranica nije pronađena",
};

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 py-20 text-center">
        {/* Balon iz favicon-a, uvećan — vizuelni pozdrav umesto gole greške. */}
        <svg
          width="96"
          height="96"
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="mb-8"
        >
          <path
            d="M16 21c2.4 1.9 2.4 3.6 0 5.4s-2.4 3.6 0 5"
            fill="none"
            stroke="#801026"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M16 20.2l-2.3 2.6h4.6z" fill="#a5182a" />
          <ellipse cx="16" cy="11.8" rx="9" ry="10.6" fill="#d21e3a" />
          <ellipse cx="12.2" cy="7.8" rx="2.3" ry="3.3" fill="#fff" opacity="0.45" />
        </svg>

        <h1 className="font-display text-4xl font-extrabold text-wine sm:text-5xl">
          Ova stranica je odletela
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-6 text-wine/75 sm:text-base">
          Stranicu koju tražite nismo pronašli. Možda je link pogrešan ili je
          stranica premeštena.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-wine px-7 py-3.5 text-sm font-medium text-white transition hover:bg-wine-dark md:text-base"
          >
            Nazad na početnu
          </Link>
          <Link
            href="/galerija"
            className="inline-flex items-center rounded-full bg-pink-soft px-7 py-3.5 text-sm font-medium text-wine transition hover:bg-pink-mid md:text-base"
          >
            Pogledaj galeriju
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
