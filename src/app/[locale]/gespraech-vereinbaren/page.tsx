import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { BookingBody } from "@/components/booking/BookingBody";
import { istSprache } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";
import { stimmenFuer } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Potenzialanalyse buchen · temoa",
  description:
    "Kostenlose Potenzialanalyse: 30 Minuten zum Kennenlernen, danach ein zweiter Termin mit euren aufbereiteten Zahlen. Unverbindlich.",
};

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
        <BookingBody stimmen={w.start.stimmen} stimmenListe={stimmenFuer(locale)} />
      </main>
      <Fusszeile />
    </>
  );
}
