import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { htmlLang, istSprache, ogLocale, sprachen } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";

/* Diese Datei ist das Wurzel-Layout. Es liegt im Sprachsegment und nicht
   darueber, weil `<html lang>` die Sprache kennen muss. Next erlaubt genau
   das, solange es kein `src/app/layout.tsx` daneben gibt. */

const caros = localFont({
  src: [
    { path: "../fonts/Caros-Thin.otf", weight: "200", style: "normal" },
    { path: "../fonts/Caros-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Caros.otf", weight: "400", style: "normal" },
    { path: "../fonts/Caros-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/Caros-ExtraBold.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-caros",
  display: "swap",
});

export function generateStaticParams() {
  return sprachen.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  const w = woerter(locale);

  return {
    title: w.meta.titel,
    description: w.meta.beschreibung,
    metadataBase: new URL("https://temoa.de"),
    icons: { icon: "/logo/logo-icon.svg" },
    /* Kein `hreflang` hier. Es wird pro Seite gesetzt (`sprachAngaben` in
       lib/i18n), weil das Layout den Pfad nicht kennt und eine geerbte
       Angabe fuer jede Unterseite die Startseite als Entsprechung
       behaupten wuerde. */
    openGraph: {
      title: w.meta.titel,
      description: w.meta.ogBeschreibung,
      type: "website",
      locale: ogLocale[locale],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const w = woerter(locale);

  return (
    <html lang={htmlLang[locale]} className={caros.variable}>
      <body className="font-sans antialiased">
        <a href="#inhalt" className="skip-link">
          {w.rahmen.zumInhalt}
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
