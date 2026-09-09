import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { Rechtstext } from "@/components/legal/Rechtstext";
import { DienstTabelle } from "@/components/consent/DienstTabelle";
import { DATENSCHUTZ } from "@/lib/recht/datenschutz";

export const metadata: Metadata = {
  title: "Datenschutz · temoa",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei der Temoa GmbH.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Kopfzeile />
      <main>
        <PageHero
          eyebrow="Rechtliches"
          title={<>Datenschutz&shy;erklärung</>}
          description="Wie wir mit euren personenbezogenen Daten umgehen, nach DSGVO."
        />
        {/* Die Liste der eingebundenen Dienste steht unter Ziffer 10.2 und
            kommt aus `lib/consent.ts`: dieselbe Quelle, aus der auch das
            Banner seine Kategorien nimmt. Zwei Listen koennten auseinander
            laufen, eine kann es nicht. */}
        <Rechtstext quelle={DATENSCHUTZ} bausteine={{ DIENSTE: <DienstTabelle /> }} />
      </main>
      <Fusszeile />
    </>
  );
}
