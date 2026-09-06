"use client";

import { useEffect, useRef } from "react";
import { DIE_CUT } from "./dieCut";

type BalloonColor = "srebrna" | "zlatna" | "crvena" | "plava" | "tirkiz";

// Redosled balona u slici public/hero/baloni.webp (5 komada, sleva nadesno).
const POSITION: Record<BalloonColor, string> = {
  srebrna: "0%",
  zlatna: "25%",
  crvena: "50%",
  plava: "75%",
  tirkiz: "100%",
};

type Props = {
  color: BalloonColor;
  className?: string;
  width?: number;
  /** Širina na mobilnom (< sm); podrazumevano ista kao `width`. */
  mobileWidth?: number;
  rotate?: number;
  /** Koliko px balon "odleti" naviše kroz opseg skrola (veće = brže). */
  speed?: number;
};

/** Balon isečen iz zajedničke slike, sa parallax-om — leti ka nebu pri skrolu. */
export default function SkyBalloon({
  color,
  className,
  width = 64,
  mobileWidth,
  rotate = 0,
  speed = 130,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let active = false;
    const update = () => {
      raf = 0;
      if (!active) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = r.top + r.height / 2;
      // 0 kad je balon pri dnu ekrana, 1 kad je pri vrhu.
      let progress = 1 - center / vh;
      progress = Math.max(-0.3, Math.min(1.3, progress));
      el.style.setProperty("--ty", `${(-progress * speed).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Prati skrol (i troši getBoundingClientRect) samo dok je balon blizu ekrana.
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
  }, [speed]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute block w-[var(--bw)] sm:w-[var(--bw-sm)] ${className ?? ""}`}
      style={{
        // Širina preko CSS promenljivih → responsive bez duplirane logike.
        ["--bw" as string]: `${mobileWidth ?? width}px`,
        ["--bw-sm" as string]: `${width}px`,
        aspectRatio: "1 / 2.14",
        transform: `translate3d(0, var(--ty, 0px), 0) rotate(${rotate}deg)`,
        backgroundImage: "url(/hero/baloni.webp)",
        backgroundSize: "500% auto",
        backgroundPositionX: POSITION[color],
        backgroundPositionY: "top",
        backgroundRepeat: "no-repeat",
        filter: DIE_CUT,
      }}
    />
  );
}
