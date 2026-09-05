import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { DesignGallery } from "@/components/design/DesignGallery";
import { getReferencesRaw } from "@/lib/references";
import { ServiceCTA } from "@/components/service/Blocks";

// Read the blob references at request time so the token is picked up
// from the runtime env even if it was added after the last build.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Designbeispiele · temoa",
  description:
    "Amazon-Content von temoa: Hauptbild, Bilderstrecke, A+ und Premium A+, Brand Store und Brand Story, jeweils so angeordnet, wie es auf Amazon verkauft.",
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
      <Kopfzeile />
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
        <ServiceCTA
          title="Und wie sieht euer Listing aus?"
        />
      </main>
      <Fusszeile />
    </>
  );
}
