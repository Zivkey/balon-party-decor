"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { BALONI_SLIDER } from "@/data/baloni";

// Kartice slidera — 8 fotografija je dovoljno široko za neprekidan (seamless)
// marquee, pa se sekvenca ne mora dodatno duplirati.
const CARDS = BALONI_SLIDER;

const AUTO_SPEED = 0.05; // px po ms — stalno klizanje ulevo

export default function Baloni() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);
  const draggedRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const s = {
      offset: 0,
      momentum: 0, // px po ms, zadržan posle puštanja
      dragging: false,
      lastX: 0,
      lastT: 0,
      startX: 0,
      moved: false,
      half: 0, // širina jedne sekvence kartica — razdaljina za seamless wrap
    };

    const measure = () => {
      s.half = seqRef.current ? seqRef.current.offsetWidth : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (seqRef.current) ro.observe(seqRef.current);

    let last = performance.now();
    let raf = 0;
    let running = false;
    const tick = (now: number) => {
      let dt = now - last;
      last = now;
      if (dt > 32) dt = 32; // ograniči velike pauze (promena taba i sl.)

      if (!s.dragging) {
        if (Math.abs(s.momentum) > AUTO_SPEED) {
          // Nastavi po inerciji, opadajući ka osnovnoj brzini.
          s.offset += s.momentum * dt;
          s.momentum *= Math.pow(0.95, dt / 16.67);
        } else {
          s.momentum = 0;
          s.offset -= AUTO_SPEED * dt; // vrati se na auto-scroll
        }
      }

      if (s.half > 0) {
        while (s.offset <= -s.half) s.offset += s.half;
        while (s.offset > 0) s.offset -= s.half;
      }
      track.style.transform = `translate3d(${s.offset}px,0,0)`;
      if (running) raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    // Vrti animaciju samo dok je slider na (ili blizu) ekrana.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px 0px" },
    );
    io.observe(viewport);

    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const now = performance.now();
      const dx = e.clientX - s.lastX;
      const dtt = Math.max(now - s.lastT, 1);
      s.offset += dx;
      s.momentum = dx / dtt;
      s.lastX = e.clientX;
      s.lastT = now;
      if (Math.abs(e.clientX - s.startX) > 5) s.moved = true;
    };
    const onUp = () => {
      if (!s.dragging) return;
      s.dragging = false;
      if (s.moved) draggedRef.current = true;
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      draggedRef.current = false;
      s.dragging = true;
      s.moved = false;
      s.momentum = 0;
      s.startX = e.clientX;
      s.lastX = e.clientX;
      s.lastT = performance.now();
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
      document.addEventListener("pointercancel", onUp);
    };

    viewport.addEventListener("pointerdown", onDown);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      viewport.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section id="baloni" className="bg-white pt-4 pb-16 sm:pt-6 sm:pb-20">
      <Reveal className="mx-auto max-w-6xl px-6" stagger={0.12}>
        <h2 className="font-display text-3xl font-bold text-wine sm:text-4xl">
          Baloni i pokloni u Nišu
        </h2>
        <p className="mt-3 text-muted">
          U radnji Balon Party Decor naći ćete balone za svaku priliku, ukrasne
          poklon kutije i bukete od balona. Buket sastavljamo po vašoj želji, sa
          imenom, mašnicama i slatkišima koje voli osoba kojoj ga poklanjate.
        </p>
        <p className="mt-3 text-muted">
          Kod nas birate poklon za rođendan, godišnjicu, krštenje, Dan
          zaljubljenih ili bilo koji drugi povod kada želite da obradujete
          voljenu osobu. Dostavljamo na teritoriji Niša.
        </p>
      </Reveal>

      {/* Beskonačni slider — auto-scroll + prevlačenje */}
      <div
        ref={viewportRef}
        onClickCapture={(e) => {
          if (draggedRef.current) {
            e.preventDefault();
            e.stopPropagation();
            draggedRef.current = false;
          }
        }}
        className="mt-8 cursor-grab touch-pan-y overflow-hidden py-3 active:cursor-grabbing"
      >
        <div
          ref={trackRef}
          onDragStart={(e) => e.preventDefault()}
          className="flex w-max select-none will-change-transform"
        >
          {[0, 1].map((dup) => (
            <div
              key={dup}
              ref={dup === 0 ? seqRef : undefined}
              className="flex shrink-0 gap-6 pr-6"
              aria-hidden={dup === 1}
            >
              {CARDS.map((p) => (
                <div
                  key={`${dup}-${p.id}`}
                  className="relative h-[420px] w-[300px] shrink-0 overflow-hidden rounded-3xl bg-gradient-to-b from-pink-soft to-pink-mid sm:h-[440px] sm:w-[320px]"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    draggable={false}
                    loading="eager"
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mx-auto max-w-6xl px-6">
        <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-pink-soft px-7 py-7 sm:flex-row sm:items-center sm:px-9 sm:py-8">
          <p className="text-xl font-semibold text-wine sm:text-2xl">
            Pogledaj sve balone iz naše ponude!
          </p>
          <Link
            href="/galerija"
            className="inline-flex shrink-0 items-center rounded-full bg-wine px-6 py-3 text-sm font-medium text-white transition hover:bg-wine-dark"
          >
            Pogledaj galeriju
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
