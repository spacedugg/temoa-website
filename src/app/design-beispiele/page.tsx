import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { DesignGallery } from "@/components/design/DesignGallery";
import { getReferencesRaw } from "@/lib/references";
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

export default async function DesignBeispielePage({
  searchParams,
}: {
  searchParams: Promise<{ debug?: string }>;
}) {
  const { data: references, diag } = await getReferencesRaw();
  const showDebug = (await searchParams)?.debug != null;
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
        {showDebug && (
          <div className="container-x">
            <pre className="overflow-x-auto rounded-2xl bg-navy p-5 text-xs leading-relaxed text-white">
              {JSON.stringify(diag, null, 2)}
            </pre>
          </div>
        )}
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
