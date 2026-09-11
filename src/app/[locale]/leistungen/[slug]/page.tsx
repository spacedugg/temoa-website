import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import {
  StrategieBody,
  ContentBody,
  AdvertisingBody,
  AccountBody,
  InternationalisierungBody,
} from "@/components/service/bodies";
import { istSprache, sprachAngaben, sprachen, type Sprache } from "@/lib/i18n";
import { woerter, type Woerterbuch } from "@/lib/woerter";

/* Die Adressen bleiben deutsch, auch auf der englischen Seite. Sie sind
   gesetzt, ein Wechsel bricht Verweise und Suchergebnisse; die Sprache steckt
   allein im Praefix. Der Schluessel daneben zeigt in das Woerterbuch. */
const SEITEN: Record<string, keyof Woerterbuch["leistungen"]["meta"]> = {
  strategie: "strategie",
  "listing-seo": "content",
  "ppc-advertising": "advertising",
  "account-management": "account",
  internationalisierung: "international",
};

export function generateStaticParams() {
  return sprachen.flatMap((locale) => Object.keys(SEITEN).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const schluessel = SEITEN[slug];
  if (!istSprache(locale) || !schluessel) return {};
  const m = woerter(locale).leistungen.meta[schluessel];
  return {
    title: `${m.name} · temoa`,
    description: m.beschreibung,
    alternates: sprachAngaben(locale, `/leistungen/${slug}`),
  };
}

/* Kein Zweig fuer unbekannte Adressen: die Seite ruft vorher `notFound`. Ein
   „folgt in Kuerze" darunter waere toter Code, den beim naechsten Mal jemand
   fuer erreichbar haelt. */
function Body({ slug, sprache }: { slug: string; sprache: Sprache }) {
  switch (slug) {
    case "strategie":
      return <StrategieBody sprache={sprache} />;
    case "listing-seo":
      return <ContentBody sprache={sprache} />;
    case "ppc-advertising":
      return <AdvertisingBody sprache={sprache} />;
    case "account-management":
      return <AccountBody sprache={sprache} />;
    case "internationalisierung":
      return <InternationalisierungBody sprache={sprache} />;
    default:
      return null;
  }
}

export default async function LeistungPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!istSprache(locale) || !SEITEN[slug]) notFound();
  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <Body slug={slug} sprache={locale} />
      </main>
      <Fusszeile />
    </>
  );
}
