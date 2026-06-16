import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { Cases, CasesClosing } from "@/components/sections/Cases";
import { Clients } from "@/components/sections/Clients";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Case Studies · TEMOA",
  description:
    "Versprechen kann jeder. Hier sind Zahlen: Vitaworld +147 % Umsatz, FUTUM 8 von 10 Verkäufe ohne Klickkosten, Gartenmarke −35 % TACoS – Kundenbeispiele.",
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
        <Cases />
        <Clients />
        <CasesClosing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
