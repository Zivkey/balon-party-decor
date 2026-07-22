"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Pomak (px) kroz opseg skrola. Pozitivno = naniže, negativno = naviše. */
  speed?: number;
  /**
   * "view" (podrazumevano): pomak zavisi od pozicije elementa u viewport-u —
   * za elemente na sredini stranice.
   * "top": pomak je 0 na vrhu stranice i raste sa skrolom — za hero (da slike
   * ostanu na tačnoj poziciji pri učitavanju).
   */
  anchor?: "view" | "top";
};

/** Lagan parallax vezan za skrol — pomera sadržaj po Y osi dok prolazi kroz ekran. */
export default function Parallax({ children, className, speed = 40, anchor = "view" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let active = false;
    const update = () => {
      raf = 0;
      if (!active) return;
      const vh = window.innerHeight || 1;
      let progress: number;
      if (anchor === "top") {
        // 0 na vrhu stranice → slike su tačno gde treba pri učitavanju.
        progress = window.scrollY / vh;
      } else {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        progress = 1 - center / vh;
        progress = Math.max(-0.3, Math.min(1.3, progress));
      }
      el.style.setProperty("--ty", `${(progress * speed).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          window.addEventListener("scroll", onScroll, { passive: true });
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, anchor]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: "translate3d(0, var(--ty, 0px), 0)" }}
    >
      {children}
    </div>
  );
}
