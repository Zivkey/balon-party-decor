"use client";

import { useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Vertikalni pomak (px) sa kog element "uleti". */
  y?: number;
  /** Trajanje (s). */
  duration?: number;
  /** Kašnjenje (s). */
  delay?: number;
  /** Ako je postavljeno, animira DECU redom (stagger, s). */
  stagger?: number;
  /** HTML tag omotača (podrazumevano div). */
  as?: ElementType;
};

/**
 * Suptilan "appear" na skrol — fade + blagi pomak nagore, jednom.
 * Poštuje prefers-reduced-motion. useGSAP čisti ScrollTrigger na unmount.
 */
export default function Reveal({
  children,
  className,
  style,
  y = 24,
  duration = 0.7,
  delay = 0,
  stagger,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power2.out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
