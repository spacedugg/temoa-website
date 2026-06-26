import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Potenzialanalyse buchen · temoa",
  description: "Potenzialanalyse buchen. Diese Seite bauen wir gerade neu.",
};

export default function GespraechBuchenPage() {
  return (
    <>
      <Navbar />
      <main>
        <ComingSoon
          eyebrow="Gespräch buchen"
          title="Potenzialanalyse buchen"
          sub="Die Online-Buchung richten wir gerade ein. Der Prozessablauf und der Kalender folgen in Kürze."
        />
      </main>
      <Footer />
    </>
  );
}
