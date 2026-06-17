import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const caros = localFont({
  src: [
    { path: "./fonts/Caros-Thin.otf", weight: "200", style: "normal" },
    { path: "./fonts/Caros-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Caros.otf", weight: "400", style: "normal" },
    { path: "./fonts/Caros-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Caros-ExtraBold.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-caros",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TEMOA — Full-Service Amazon-Agentur",
  description:
    "Wir führen euren kompletten Amazon-Account – Strategie, Content, Advertising und Betrieb. Mehr Umsatz und bessere Marge, weil zuerst das Listing trägt und dann die Ads skalieren.",
  metadataBase: new URL("https://temoa.de"),
  icons: { icon: "/logo/logo-icon.svg" },
  openGraph: {
    title: "TEMOA — Full-Service Amazon-Agentur",
    description:
      "Amazon-Wachstum ist keine Frage des Werbebudgets. Organic First. PPC Second.",
    type: "website",
    locale: "de_DE",
    url: "https://temoa.de",
    siteName: "TEMOA",
    images: [{ url: "/mockup.png", width: 1000, height: 1000, alt: "TEMOA — Full-Service Amazon-Agentur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEMOA — Full-Service Amazon-Agentur",
    description: "Amazon-Wachstum ist keine Frage des Werbebudgets. Organic First. PPC Second.",
    images: ["/mockup.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={caros.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
