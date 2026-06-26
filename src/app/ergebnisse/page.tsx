import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CaseStudiesFull } from "@/components/cases/CaseStudiesFull";
import { ServiceCTA } from "@/components/service/Blocks";

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
        <CaseStudiesFull />
        <ServiceCTA
          title="Wie sähe euer Fall aus?"
          sub="In der kostenlosen Potenzialanalyse zeigen wir, wo in eurem Account das Wachstum liegt."
          chips={["Ohne lange Vertragslaufzeiten", "98 % Kundenbindung"]}
        />
      </main>
      <Footer />
    </>
  );
}
