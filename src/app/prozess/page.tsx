import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Process } from "@/components/sections/Process";
import { DataAI } from "@/components/sections/DataAI";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Prozess · TEMOA",
  description:
    "Von der ersten Analyse zum profitablen Konto: Audit, Strategie, Retail-Readiness, Advertising und laufender Betrieb – datengetrieben und transparent.",
};

export default function ProzessPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="So arbeiten wir"
          title={<>Ein klarer Weg zum <span className="text-gradient">profitablen Konto.</span></>}
          description="Kein Blindflug: Jeder Schritt ist datengetrieben, priorisiert nach Impact und für euch jederzeit transparent."
        />
        <Process />
        <DataAI />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
