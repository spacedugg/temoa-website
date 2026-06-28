import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CaseGrid } from "@/components/cases/CaseGrid";
import { ServiceCTA } from "@/components/service/Blocks";
import { ProofStrip } from "@/components/sections/SocialProof";
import { Testimonials } from "@/components/home/Testimonials";
import { Stats } from "@/components/home/Stats";
import { Counter } from "@/components/ui/Counter";

export const metadata: Metadata = {
  title: "Case Studies · temoa",
  description:
    "Vier Marken, vier Ausgangslagen, echte Zahlen: profitables Wachstum, sinkende PPC-Abhängigkeit und saisonale Skalierung auf Amazon.",
};

/* 98 % Kundenbindung als ruhiger Abschluss über den Kundenstimmen. */
function RetentionBand() {
  return (
    <section className="relative bg-[#EDF5FB] py-16 md:py-20">
      <div className="container-x text-center">
        <div className="text-5xl font-extrabold tracking-tight text-ink md:text-6xl">
          <Counter to={98} suffix=" %" />
        </div>
        <div className="mx-auto mt-3 h-0.5 w-12 rounded-full" style={{ backgroundImage: "var(--brand-gradient)" }} />
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
          Kundenbindung. Marken bleiben, weil die Zusammenarbeit liefert, ganz ohne lange Laufzeiten.
        </p>
      </div>
    </section>
  );
}

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
        />
        <Stats tone="white" />
        <ProofStrip tone="blue" bare />
        <CaseGrid />
        <RetentionBand />
        <Testimonials tone="white" />
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
