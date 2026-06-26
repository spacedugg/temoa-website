import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CaseStudiesFull } from "@/components/cases/CaseStudiesFull";
import { ServiceCTA } from "@/components/service/Blocks";
import { ProofStrip, Quotes } from "@/components/sections/SocialProof";

export const metadata: Metadata = {
  title: "Case Studies · temoa",
  description:
    "Vier Marken, vier Ausgangslagen, echte Zahlen: profitables Wachstum, sinkende PPC-Abhängigkeit und saisonale Skalierung auf Amazon.",
};

export default function ErgebnissePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Case Studies"
          title={
            <>
              Ergebnisse aus echten <span className="text-gradient">Amazon-Konten.</span>
            </>
          }
          description="Vier Marken, vier Ausgangslagen. Zahlen aus laufenden Projekten, eine Marke auf Wunsch anonymisiert."
          chips={["Ø +30 % Profitabilität", "21 Mio € betreuter Jahresumsatz", "60+ betreute Marken"]}
        />
        <ProofStrip tone="blue" />
        <CaseStudiesFull />
        <Quotes
          tone="white"
          title={<>Was unsere <span className="text-gradient">Kunden sagen.</span></>}
        />
        <ServiceCTA
          title="Lasst uns über eure Marke sprechen."
          sub="In der kostenlosen Potenzialanalyse zeigen wir, wo in euren Listings und Kampagnen das nächste Umsatzwachstum liegt."
          chips={["Ihr verlängert nach Performance", "98 % Kundenbindung"]}
        />
      </main>
      <Footer />
    </>
  );
}
