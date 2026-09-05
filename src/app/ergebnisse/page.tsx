import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { CaseGrid } from "@/components/cases/CaseGrid";
import { ServiceCTA } from "@/components/service/Blocks";
import { ProofStrip } from "@/components/sections/SocialProof";
import { Stats } from "@/components/home/Stats";
import { Counter } from "@/components/ui/Counter";

export const metadata: Metadata = {
  title: "Case Studies · temoa",
  description:
    "Vier Amazon-Konten mit Ausgangslage, Vorgehen und Ergebnis: profitables Wachstum, weniger PPC-Abhängigkeit, ein Launch von null und vier Marktplätze parallel.",
};

/* 98 % Kundenbindung als ruhiger Abschluss über den Kundenstimmen. */
function RetentionBand() {
  return (
    <section className="ground-tint relative py-16 md:py-20">
      <div className="container-x">
        <div className="panel mx-auto max-w-xl px-8 py-10 text-center">
          <div className="text-5xl font-extrabold tracking-tight text-ink md:text-6xl">
            <Counter to={98} suffix=" %" />
          </div>
          <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-brand-500" />
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-muted">
            Kundenbindung. Marken bleiben, weil die Zahlen stimmen, nicht weil ein Vertrag sie hält.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ErgebnissePage() {
  return (
    <>
      <Kopfzeile />
      <main>
        <PageHero
          eyebrow="Case Studies"
          title={
            <>
              Vier Konten, <span className="text-gradient">vollständig nachgerechnet.</span>
            </>
          }
          description="Ausgangslage, Vorgehen und Ergebnis je Marke, mit Zeitraum und den Zahlen aus dem Konto. Auch dort, wo es zwischendurch nicht rund lief."
        />
        <Stats tone="white" />
        <ProofStrip tone="blue" bare />
        <CaseGrid />
        <RetentionBand />
        <ServiceCTA
          title="Was wäre bei euch möglich?"
          sub="In der kostenlosen Potenzialanalyse rechnen wir das an euren Zahlen durch, nicht an fremden."
          chips={["Ihr verlängert nach Performance", "98 % Kundenbindung"]}
        />
      </main>
      <Fusszeile />
    </>
  );
}
