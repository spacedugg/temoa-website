import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { Auftrag } from "@/components/takt/Auftrag";
import {
  Kundenband,
  Befund,
  Verfahren,
  Leistungen,
  Nachweis,
  Arbeiten,
  Stimmen,
  Termin,
  Mannschaft,
} from "@/components/takt/sections";
import { istSprache, sprachAngaben } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";
import { stimmenFuer } from "@/lib/testimonials";
import { vorschauFuer } from "@/lib/cases";

/**
 * Startseite.
 *
 * Reihenfolge nach der zwoelften Feedbackrunde: erst das Angebot, dann der
 * Beleg, dann die Begruendung. Vorher stand die Ausgangslage vor den
 * Leistungen, ein Besucher las also zuerst, was bei ihm schiefliegt, und
 * erfuhr erst danach, was wir tun.
 *
 * Der Blog-Streifen ist raus. Vier Beitragskacheln am Fuss der Startseite
 * haben niemanden zum Gespraech gebracht, den Blog gibt es weiter unter
 * /blog und in der Kopfzeile.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  /* `hreflang` pro Seite, nicht im Layout: siehe `sprachAngaben`. */
  return { alternates: sprachAngaben(locale, "/") };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const w = woerter(locale);

  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <Auftrag sprache={locale} w={w.start.hero} />
        <Kundenband w={w.start.kundenband} />
        <Leistungen sprache={locale} w={w.start.leistungen} />
        <Nachweis sprache={locale} w={w.start.nachweis} faelle={vorschauFuer(locale)} />
        <Befund w={w.start.befund} />
        <Verfahren w={w.start.verfahren} />
        <Arbeiten sprache={locale} w={w.start.arbeiten} />
        <Stimmen w={w.start.stimmen} liste={stimmenFuer(locale)} />
        <Termin />
        <Mannschaft w={w.start.mannschaft} />
      </main>
      <Fusszeile />
    </>
  );
}
