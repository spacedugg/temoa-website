import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { DesignGallery } from "@/components/design/DesignGallery";
import { getReferencesRaw } from "@/lib/references";
import { ordneReferenzen, beschreibeOrdnung } from "@/lib/designbeispiele-ordnung";
import { ServiceCTA } from "@/components/service/Blocks";
import { istSprache, sprachAngaben } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";
import { notFound } from "next/navigation";

// Read the blob references at request time so the token is picked up
// from the runtime env even if it was added after the last build.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  const m = woerter(locale).design.meta;
  return {
    title: m.titel,
    description: m.beschreibung,
    alternates: sprachAngaben(locale, "/design-beispiele"),
  };
}

export default async function DesignBeispielePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ debug?: string }>;
}) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const w = woerter(locale).design;
  const { data: roh, diag } = await getReferencesRaw();
  /* Reihenfolge und Auswahl der Listings: siehe `designbeispiele-ordnung`.
     Der Export unter /api/references-snapshot bleibt davon unberuehrt. */
  const references = ordneReferenzen(roh);
  const showDebug = (await searchParams)?.debug != null;
  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <PageHero
          eyebrow={w.kopf.eyebrow}
          title={
            <>
              {w.kopf.titelVor}
              <span className="text-gradient">{w.kopf.titelEm}</span>
              {w.kopf.titelNach}
            </>
          }
          description={w.kopf.lead}
        />
        {showDebug && (
          <div className="container-x">
            <pre className="overflow-x-auto rounded-2xl bg-navy p-5 text-xs leading-relaxed text-white">
              {JSON.stringify(diag, null, 2)}
            </pre>
            {/* Welches Listing steht wo und welches erscheint nicht. `anzeige`
                ist null, wenn die Regel das Listing ausblendet. */}
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-navy p-5 text-xs leading-relaxed text-white">
              {"Sales Room > live > Website | Kennung | Titel | Bilddatei\n" +
                beschreibeOrdnung(roh.main_images)
                  .map(
                    (z) =>
                      `${z.quelle} > ${z.live} > ${z.anzeige ?? "-"} | ${z.id} | ${z.title ?? "(ohne Titel)"} | ${
                        z.bild?.split("?")[0].split("/").pop() ?? ""
                      }`,
                  )
                  .join("\n")}
            </pre>
          </div>
        )}
        <DesignGallery data={references} sprache={locale} w={w} />
        <ServiceCTA title={w.cta} />
      </main>
      <Fusszeile />
    </>
  );
}
