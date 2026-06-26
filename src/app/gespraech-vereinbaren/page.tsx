import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingBody } from "@/components/booking/BookingBody";

export const metadata: Metadata = {
  title: "Potenzialanalyse buchen · temoa",
  description:
    "Kostenlose, unverbindliche Potenzialanalyse: In etwa 30 Minuten zeigen wir euch konkret, wo in eurem Amazon-Account Umsatz und Marge liegen.",
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
