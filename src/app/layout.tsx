import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEMOA — Full-Service Amazon-Agentur",
  description:
    "Wir führen euren kompletten Amazon-Account – Strategie, Content, Advertising und Betrieb. Mehr Umsatz und bessere Marge, weil zuerst das Listing trägt und dann die Ads skalieren.",
  metadataBase: new URL("https://temoa.de"),
  openGraph: {
    title: "TEMOA — Full-Service Amazon-Agentur",
    description:
      "Amazon-Wachstum ist keine Frage des Werbebudgets. Organic First. PPC Second.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
