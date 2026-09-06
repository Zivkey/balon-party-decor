import type { Metadata, Viewport } from "next";
import { Caveat, Inter } from "next/font/google";
import { Agentation } from "agentation";
import SchemaLocalBusiness from "@/components/SchemaLocalBusiness";
import { SITE } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

// Rukopisni font za potpise ispod polaroida (latin-ext nosi č/ć/ž/š/đ).
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  // Bez ovoga sve relativne putanje (OG slika, canonical) ostaju relativne,
  // a Fejsbuk/Vajber traže apsolutan URL — zato preview ne bi radio.
  metadataBase: new URL(SITE.url),

  title: {
    default: SITE.title,
    // Podstranice pišu samo svoj naziv, brend se dodaje automatski.
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,

  // Govori Google-u koji je „pravi“ URL ove strane (bez www/apex duplikata).
  alternates: { canonical: "/" },

  // Eksplicitno dopuštenje za indeksiranje. max-image-preview:large je bitno —
  // bez toga Google prikazuje sitan thumbnail umesto velike slike.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Preview kad se link deli na Vajberu, WhatsAppu, Fejsbuku, Instagramu.
  // Sliku Next automatski uzima iz src/app/opengraph-image.jpg.
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    locale: SITE.locale,
  },
  // Tag za potvrdu vlasništva u Search Console — ispisuje se tek kad se
  // googleVerification popuni u site.ts.
  ...(SITE.googleVerification
    ? { verification: { google: SITE.googleVerification } }
    : {}),

  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

// Boja adresne trake na mobilnom — brend bordo, kao dugmad i naslovi.
export const viewport: Viewport = {
  themeColor: "#801026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${inter.variable} ${caveat.variable}`}>
      <body>
        {children}
        <SchemaLocalBusiness />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
