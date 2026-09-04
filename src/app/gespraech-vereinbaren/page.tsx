import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingBody } from "@/components/booking/BookingBody";

export const metadata: Metadata = {
  title: "Potenzialanalyse buchen · temoa",
  description:
    "Kostenlose Potenzialanalyse: Wir sehen uns vorab eure Listings und Kampagnen an und kommen mit konkreten Beobachtungen ins Gespräch. Etwa 30 Minuten, unverbindlich.",
};

export default function GespraechBuchenPage() {
  return (
    <>
      <Navbar />
      <main>
        <BookingBody />
      </main>
      <Footer />
    </>
  );
}
