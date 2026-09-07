import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { BookingBody } from "@/components/booking/BookingBody";

export const metadata: Metadata = {
  title: "Potenzialanalyse buchen · temoa",
  description:
    "Kostenlose Potenzialanalyse: 30 Minuten zum Kennenlernen, danach ein zweiter Termin mit euren aufbereiteten Zahlen. Unverbindlich.",
};

export default function GespraechBuchenPage() {
  return (
    <>
      <Kopfzeile />
      <main>
        <BookingBody />
      </main>
      <Fusszeile />
    </>
  );
}
