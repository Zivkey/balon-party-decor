// Jedan izvor istine za fotografije dekoracija.
// Koristi ih kolaž polaroida na početnoj (Dekoracije.tsx) i /galerija#dekoracije.
//
// DODAVANJE NOVE DEKORACIJE: ubaci sliku u public/dekoracije/ i dodaj red ovde.
// Prvih 6 ide u kolaž polaroida na početnoj (toliko ima mesta u rasporedu),
// a SVE se prikazuju u galeriji.

export type Dekoracija = {
  id: string;
  src: string;
  alt: string;
  /** Rukom pisan potpis ispod slike u polaroidu. */
  caption: string;
};

/** Koliko dekoracija stane u kolaž polaroida na početnoj strani. */
export const KOLAZ_COUNT = 6;

export const DEKORACIJE: Dekoracija[] = [
  { id: "danilo", src: "/dekoracije/danilo.jpg", alt: "Safari džungla dekoracija za Danilov prvi rođendan", caption: "Danilo, 1. rođendan" },
  { id: "tijana", src: "/dekoracije/tijana.jpg", alt: "Roze i zlatna dekoracija za devojačko veče sa natpisom Kiss the miss", caption: "Tijana, devojačko veče" },
  { id: "ohh-baby", src: "/dekoracije/ohh-baby.jpg", alt: "Pastelna Ohh Baby dekoracija za baby shower", caption: "Baby shower" },
  { id: "lenka", src: "/dekoracije/lenka.jpg", alt: "Roze labud dekoracija za Lenkin prvi rođendan", caption: "Lenka, 1. rođendan" },
  { id: "mateo", src: "/dekoracije/mateo.jpg", alt: "Safari dekoracija sa plišanim životinjama za Mateov prvi rođendan", caption: "Mateo, 1. rođendan" },
  { id: "andreana", src: "/dekoracije/andreana.jpg", alt: "Crno-zlatna rođendanska dekoracija za Andreanu", caption: "Andreana, rođendan" },
];

/** Dekoracije koje idu u kolaž polaroida na početnoj strani. */
export const DEKORACIJE_KOLAZ = DEKORACIJE.slice(0, KOLAZ_COUNT);
