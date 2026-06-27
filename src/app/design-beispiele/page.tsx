import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { DesignExamples } from "@/components/design/DesignExamples";
import { Testimonials } from "@/components/home/Testimonials";
import { ServiceCTA } from "@/components/service/Blocks";

export const metadata: Metadata = {
  title: "Designbeispiele · temoa",
  description:
    "So bauen wir Amazon-Content: Hauptbild, Bilderstrecke, A+ und Premium A+, Brand Store und Brand Story, jeweils so angeordnet, wie es auf Amazon verkauft.",
};

export default function DesignBeispielePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Designbeispiele"
          title={
            <>
              So sieht <span className="text-gradient">Retail Ready</span> aus.
            </>
          }
          description="Vom Hauptbild bis zur Brand Story: jedes Format so aufgebaut, wie es auf Amazon konvertiert."
        />
        <DesignExamples />
        <Testimonials tone="blue" />
        <ServiceCTA
          title="Wie viel Umsatz verliert ihr an schwachem Content?"
          sub="In der kostenlosen Potenzialanalyse zeigen wir euch, wo euer Content Käufer verliert."
        />
      </main>
      <Footer />
    </>
  );
}
