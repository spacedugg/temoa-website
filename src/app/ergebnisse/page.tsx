import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { Results } from "@/components/sections/Results";
import { Clients } from "@/components/sections/Clients";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Ergebnisse · TEMOA",
  description:
    "Echte Zahlen, echte Marken: mehr organischer Umsatz, bessere Marge und ein gesundes Amazon-Konto – Resultate aus dem TEMOA-System.",
};

export default function ErgebnissePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Case Studies"
          title={<>Versprechen kann jeder. <span className="text-gradient">Hier sind Zahlen.</span></>}
          description="Beispiele aus laufenden Mandaten – Einzelergebnisse, kein Versprechen, aber ein ehrliches Bild unserer Arbeitsweise: Organic First, profitabel skaliert."
        />
        <StatsBand />
        <Results />
        <Clients />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
