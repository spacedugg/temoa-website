import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { BookingBody } from "@/components/booking/BookingBody";
import { istSprache, sprachAngaben } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";
import { stimmenFuer } from "@/lib/testimonials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  const m = woerter(locale).buchung.meta;
  return {
    title: m.titel,
    description: m.beschreibung,
    alternates: sprachAngaben(locale, "/gespraech-vereinbaren"),
  };
}

export default async function GespraechBuchenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const w = woerter(locale);

  return (
    <>
      <Kopfzeile />
      <main>
        <BookingBody w={w.buchung} stimmen={w.start.stimmen} stimmenListe={stimmenFuer(locale)} />
      </main>
      <Fusszeile />
    </>
  );
}
