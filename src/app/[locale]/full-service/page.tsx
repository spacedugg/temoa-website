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
  Onboarding,
} from "@/components/takt/fullservice";
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
  const w = woerter(locale).fullService;

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
        <Onboarding w={w.onboarding} />
        <Termin title={w.cta} />
      </main>
      <Fusszeile />
    </>
  );
}
