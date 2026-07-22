import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Agentation } from "agentation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Balon Party Decor — buketi od balona, pokloni i dekoracije | Niš",
  description:
    "Buketi od balona, poklon kutije i dekoracije za rođendane i proslave. Dostava na teritoriji Niša.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={inter.variable}>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
