import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import {
  FullServiceKopf,
  FuerWen,
  Ausgangslage,
  Bereiche,
  Reporting,
  Unterschied,
  NichtFuerWen,
} from "@/components/takt/fullservice";
import { Fahrplan } from "@/components/takt/Fahrplan";
import { Termin } from "@/components/takt/sections";
import { istSprache, sprachAngaben } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  const m = woerter(locale).fullService.meta;
  return {
    title: m.titel,
    description: m.beschreibung,
    alternates: sprachAngaben(locale, "/full-service"),
  };
}

export default async function FullServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const alle = woerter(locale);
  const w = alle.fullService;

  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <FullServiceKopf sprache={locale} w={w.kopf} />
        <FuerWen w={w.fuerWen} />
        {/* Direkt hinter „fuer wen es passt" steht, fuer wen es nicht passt.
            Eine Auswahl, die niemanden ausschliesst, ist keine Auswahl. */}
        <NichtFuerWen w={w.nichtFuerWen} />
        <Ausgangslage w={w.ausgangslage} />
        <Bereiche w={w.bereiche} />
        <Reporting w={w.reporting} />
        <Unterschied w={w.unterschied} zusammenlauf={w.zusammenlauf} />
        {/* Der Fahrplan als letzte Sektion vor dem Abschluss-CTA, dieselbe
            Sektion wie auf der Buchungsseite. Sie ersetzt `Onboarding` mit
            den ersten drei Wochen: der Fahrplan sagt dasselbe ueber 90 Tage
            statt ueber drei Wochen, und zwei Ablaeufe auf einer Website
            waeren zwei Versprechen. */}
        <Fahrplan w={alle.fahrplan} />
        <Termin title={w.cta} />
      </main>
      <Fusszeile />
    </>
  );
}
