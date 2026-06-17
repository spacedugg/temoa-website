import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { Cases, CasesClosing } from "@/components/sections/Cases";
import { Clients } from "@/components/sections/Clients";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Ergebnisse · TEMOA",
  description:
    "Drei echte Konten, drei Ausgangslagen: FUTUM 80 % organischer Umsatz im Peak, HaA +439 % Conversion in 17 Wochen, eine Gartenmarke −35 % TACoS über vier Marktplätze. Einzelbeispiele aus laufenden Mandaten.",
};

export default function ErgebnissePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Ergebnisse aus echten Konten"
          title={<>Zahlen, die wir <span className="text-gradient">offenlegen.</span></>}
          description="Keine Renderings, keine Wunschwerte. Drei Marken, drei Ausgangslagen, drei Ergebnisse – jeweils so erreicht, wie wir jedes Konto angehen: erst das Listing tragfähig machen, dann die Ads aufdrehen."
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
