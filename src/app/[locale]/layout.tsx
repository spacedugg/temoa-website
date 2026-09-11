import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { StrukturierteDaten } from "@/components/seo/StrukturierteDaten";
import { TagManager } from "@/components/messung/TagManager";
import { htmlLang, istSprache, ogLocale, pfad, sprachen } from "@/lib/i18n";
import { SEITE } from "@/lib/seite";
import { woerter } from "@/lib/woerter";
import { rahmenWoerter } from "@/lib/woerter/rahmen";

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

  /* Das Vorschaubild liegt unter dem Sprachsegment, also auch fuer Deutsch
     unter `/de/...`. Die Sprachweiche laesst diese Adresse ausdruecklich
     durch, siehe den Kommentar am `matcher` in `middleware.ts`. */
  const vorschau = `/${locale}/opengraph-image`;

  return {
    /* Ohne `template`: jede Unterseite schreibt ihren Titel vollstaendig
       selbst, einschliesslich des Namens am Ende. Eine Vorlage haengte ihn ein
       zweites Mal an. */
    title: w.meta.titel,
    description: w.meta.beschreibung,
    metadataBase: new URL(SEITE.url),
    applicationName: SEITE.name,
    authors: [{ name: SEITE.firma, url: SEITE.url }],
    creator: SEITE.firma,
    publisher: SEITE.firma,
    /* Ausdruecklich indexierbar, einschliesslich Impressum, Datenschutz und
       AGB. `max-image-preview: large` erlaubt das grosse Vorschaubild im
       Suchergebnis, `max-snippet: -1` einen Textausschnitt ohne Laengengrenze:
       beides entscheidet mit, wie ein Treffer aussieht. */
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
    /* Das Zeichen im Reiter. SVG zuerst: nur damit wechselt die dunkle U-Form
       im Dunkelmodus auf Hellblau, PNG kann das nicht. Die uebrigen Eintraege
       sind die Rueckfallebene fuer Browser ohne SVG-Symbole. */
    icons: {
      icon: [
        { url: "/icon/zeichen.svg", type: "image/svg+xml" },
        { url: "/icon/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon.ico", sizes: "48x48" },
      ],
      apple: [{ url: "/icon/apple-touch.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    /* Kein `hreflang` hier. Es wird pro Seite gesetzt (`sprachAngaben` in
       lib/i18n), weil das Layout den Pfad nicht kennt und eine geerbte
       Angabe fuer jede Unterseite die Startseite als Entsprechung
       behaupten wuerde. */
    openGraph: {
      title: w.meta.titel,
      description: w.meta.ogBeschreibung,
      type: "website",
      siteName: SEITE.name,
      url: pfad(locale, "/"),
      locale: ogLocale[locale],
      images: [{ url: vorschau, width: 1200, height: 630, alt: w.meta.titel }],
    },
    twitter: {
      card: "summary_large_image",
      title: w.meta.titel,
      description: w.meta.ogBeschreibung,
      images: [vorschau],
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
      {/* Faerbt die Systemleiste auf dem Telefon. Steht hier und nicht in den
          Metadaten, weil `themeColor` dort veraltet ist. */}
      <meta name="theme-color" content="#0D2439" />
      <StrukturierteDaten sprache={locale} />
      <body className="font-sans antialiased">
        <a href="#inhalt" className="skip-link">
          {rahmenWoerter[locale].rahmen.zumInhalt}
        </a>
        {children}
        {/* Liegt unter dem Inhalt im Markup und oben auf dem Bildschirm: so
            liest ein Vorleseprogramm erst die Seite und dann den Hinweis, und
            der Sprung zum Inhalt bleibt der erste Halt. */}
        <CookieBanner />
        {/* Lädt erst nach Zustimmung, siehe den Kommentar in der Komponente. */}
        <TagManager />
      </body>
    </html>
  );
}
