import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { BookingBody } from "@/components/booking/BookingBody";

export const metadata: Metadata = {
  title: "Potenzialanalyse buchen · temoa",
  description:
    "Kostenlose Potenzialanalyse: Wir sehen uns vorab eure Listings und Kampagnen an und kommen mit konkreten Beobachtungen ins Gespräch. Etwa 30 Minuten, unverbindlich.",
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
