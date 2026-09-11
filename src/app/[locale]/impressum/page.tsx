import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { Rechtstext } from "@/components/legal/Rechtstext";
import { IMPRESSUM } from "@/lib/recht/impressum";

export const metadata: Metadata = {
  title: "Impressum · temoa",
  description: "Anbieterkennzeichnung der Temoa GmbH, Am Brink 2, 23883 Seedorf.",
};

export default function ImpressumPage() {
  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <PageHero
          eyebrow="Rechtliches"
          title={<>Impressum</>}
          description="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)."
        />
        <Rechtstext quelle={IMPRESSUM} />
      </main>
      <Fusszeile />
    </>
  );
}
