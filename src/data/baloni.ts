// Jedan izvor istine za sve fotografije balona.
// Koristi ga i slider na početnoj (Baloni.tsx) i stranica /galerija.
// Fajlovi su u public/baloni/ — ime je IMG_<broj>.jpg (broj sa telefona).
// Puni originali (i snimci) stoje van git-a, u /originals/baloni/.

export type BalonFoto = {
  /** Broj sa originalne fotografije — npr. "1027" za IMG_1027.jpg */
  id: string;
  src: string;
  alt: string;
};

/** Prvih 8 idu i u slider na početnoj; ostatak samo u galeriju. */
export const SWIPER_COUNT = 8;

export const BALONI: BalonFoto[] = [
  // — slider (redosled kako je naručen) —
  { id: "1027", src: "/baloni/IMG_1027.jpg", alt: "Buket sa crvenim srce-balonima, Ferrero Rocher pralinama i ružama" },
  { id: "1113", src: "/baloni/IMG_1113.jpg", alt: "Devojka drži crveni buket sa plišanim medom i srce-balonima" },
  { id: "1386", src: "/baloni/IMG_1386.jpg", alt: "Par sa buketom crvenih srce-balona i plišanim medom" },
  { id: "1675", src: "/baloni/IMG_1675.jpg", alt: "Buket crvenih balona i crna poklon kutija sa plišanim medama ispred radnje" },
  { id: "2746", src: "/baloni/IMG_2746.jpg", alt: "Plavi zvezda-balon sa natpisom „Srećan 1. rođendan Filipe“" },
  { id: "3339", src: "/baloni/IMG_3339.jpg", alt: "Srebrni balon sa brojem 18 za proslavu punoletstva" },
  { id: "3826", src: "/baloni/IMG_3826.jpg", alt: "Baby shower dekoracija u dvorištu sa roze i plavim balonima" },
  { id: "1493", src: "/baloni/IMG_1493.jpg", alt: "Devojka drži veliki buket crvenih srce-balona i zlatnih balona" },

  // — ostatak galerije —
  { id: "0502", src: "/baloni/IMG_0502.jpg", alt: "Bubble balon „Happy Birthday“ sa zlatnim balonima i medom od ruža" },
  { id: "0691", src: "/baloni/IMG_0691.jpg", alt: "Crni bubble balon „Happy Birthday“ na buketu Ferrero Rocher pralina" },
  { id: "0876", src: "/baloni/IMG_0876.jpg", alt: "Crveni srce-balon „Happy 18“ sa zlatnim balonima u buketu" },
  { id: "0953", src: "/baloni/IMG_0953.jpg", alt: "Buket sa zlatnim i braon hrom balonima i crvenim srcem" },
  { id: "1102", src: "/baloni/IMG_1102.jpg", alt: "Crna poklon kutija sa Raffaello pralinama, ružama i zlatnim balonima" },
  { id: "1106", src: "/baloni/IMG_1106.jpg", alt: "Devojka drži buket sa crvenim srce-balonima i pralinama" },
  { id: "1127", src: "/baloni/IMG_1127.jpg", alt: "Devojka drži bubble balon sa plišanim medom i crvenim ukrasima" },
  { id: "1133", src: "/baloni/IMG_1133.jpg", alt: "Dve devojke sa buketima od zlatnih balona i pralina" },
  { id: "1143", src: "/baloni/IMG_1143.jpg", alt: "Devojka sa buketom crvenih balona i Ferrero Rocher pralina" },
  { id: "1174", src: "/baloni/IMG_1174.jpg", alt: "Bubble balon buket sa zlatnim i crvenim balonima" },
  { id: "1200", src: "/baloni/IMG_1200.jpg", alt: "Par drži buket sa crvenim srce-balonima i pralinama" },
  { id: "1262", src: "/baloni/IMG_1262.jpg", alt: "Crna poklon kutija sa plišanim medama, crvenim i zlatnim balonima" },
  { id: "1359", src: "/baloni/IMG_1359.jpg", alt: "Devojka drži bubble balon buket sa crvenim srcem i pralinama" },
  { id: "1424", src: "/baloni/IMG_1424.jpg", alt: "Bubble balon i buket sa plišanim medom i crvenim ružama" },
  { id: "1455", src: "/baloni/IMG_1455.jpg", alt: "Devojka drži buket sa plišanim medom i crvenim srce-balonom" },
  { id: "1488", src: "/baloni/IMG_1488.jpg", alt: "Devojka drži veliki bubble balon buket sa zlatnim balonima" },
  { id: "1604", src: "/baloni/IMG_1604.jpg", alt: "Devojka drži poklon kesu i bubble balon sa plišanim medom" },
  { id: "2309", src: "/baloni/IMG_2309.jpg", alt: "Devojka drži bubble balon buket sa crvenim i zlatnim balonima" },
  { id: "3405", src: "/baloni/IMG_3405.jpg", alt: "Baloni „Welcome little Princess“ u roze i zlatnoj boji" },
];

/** Fotografije koje idu u slider na početnoj strani. */
export const BALONI_SLIDER = BALONI.slice(0, SWIPER_COUNT);
