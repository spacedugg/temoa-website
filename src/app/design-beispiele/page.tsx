import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { DesignGallery } from "@/components/design/DesignGallery";
import { getReferences } from "@/lib/references";
import { Testimonials } from "@/components/home/Testimonials";
import { ServiceCTA } from "@/components/service/Blocks";

// Read the blob references at request time so the token is picked up
// from the runtime env even if it was added after the last build.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Designbeispiele · temoa",
  description:
    "So bauen wir Amazon-Content: Hauptbild, Bilderstrecke, A+ und Premium A+, Brand Store und Brand Story, jeweils so angeordnet, wie es auf Amazon verkauft.",
};

export default async function DesignBeispielePage() {
  const references = await getReferences();
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
        <DesignGallery data={references} />
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
