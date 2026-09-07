import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieBanner } from "@/components/consent/CookieBanner";

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
  title: "temoa · Amazon Full Service Wachstumspartner",
  description:
    "Wir bringen euer Amazon-Listing dahin, dass es auch ohne Werbung verkauft. Danach skaliert PPC, was bereits konvertiert. Organic First, PPC Second.",
  metadataBase: new URL("https://temoa.de"),
  icons: { icon: "/logo/logo-icon.svg" },
  openGraph: {
    title: "temoa · Amazon Full Service Wachstumspartner",
    description:
      "Amazon Full Service: Erst verkauft euer Listing, dann skaliert die Werbung. Organic First, PPC Second.",
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
    <html lang="de" className={caros.variable}>
      <body className="font-sans antialiased">
        <a href="#inhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        {children}
        {/* Liegt unter dem Inhalt im Markup und oben auf dem Bildschirm: so
            liest ein Vorleseprogramm erst die Seite und dann den Hinweis, und
            der Sprung zum Inhalt bleibt der erste Halt. */}
        <CookieBanner />
      </body>
    </html>
  );
}
