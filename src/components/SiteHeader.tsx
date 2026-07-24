"use client";

import { useEffect, useRef, useState } from "react";

const PHONE_HREF = "tel:+381616588353";
const INSTAGRAM = "https://www.instagram.com/balon_party_decor/";

export default function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (Math.abs(diff) > 6) {
        // Skrol nadole (posle malog praga) → sakrij; nagore → prikaži.
        setHidden(diff > 0 && y > 120);
        lastY.current = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`sticky top-4 z-50 px-4 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-[150%]" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full bg-white px-4 py-3 shadow-[0_10px_30px_-12px_rgba(124,29,44,0.35)] sm:px-6">
        {/* Logo — levo */}
        <span className="text-lg font-bold uppercase tracking-wide text-wine sm:text-xl">
          Balon Party Decor
        </span>

        {/* Instagram + Pozovi — desno */}
        <div className="flex items-center gap-3">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-pink-soft text-wine transition hover:bg-pink-mid"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
            </svg>
          </a>

          <a
            href={PHONE_HREF}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-wine px-4 py-2.5 text-sm font-medium text-white transition hover:bg-wine-dark sm:px-5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 5c0-.6.4-1 1-1h2.3c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1.1L8 10.3a12 12 0 0 0 5.7 5.7l1.4-1.6c.3-.3.7-.4 1.1-.3l3 .8c.5.1.8.5.8 1V18c0 .6-.4 1-1 1A15 15 0 0 1 4 5Z"
                fill="currentColor"
              />
            </svg>
            <span className="hidden sm:inline">Pozovi</span>
          </a>
        </div>
      </div>
    </header>
  );
}
