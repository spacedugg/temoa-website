import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { Rechtstext } from "@/components/legal/Rechtstext";
import { AGB } from "@/lib/recht/agb";

export const metadata: Metadata = {
  title: "AGB · temoa",
  description: "Allgemeine Geschäftsbedingungen der Temoa GmbH.",
  /* Rechtstexte gibt es nur auf Deutsch. Die englische Adresse zeigt
     denselben Text und verweist deshalb auf die deutsche: zwei Adressen mit
     identischem Inhalt konkurrieren sonst miteinander. */
  alternates: { canonical: "/agb" },
};

export default function AgbPage() {
  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <PageHero
          eyebrow="Rechtliches"
          title={<>Allgemeine Geschäfts&shy;bedingungen</>}
          description="Für alle Verträge zwischen der Temoa GmbH und ihren Kunden."
        />
        <Rechtstext quelle={AGB} />
      </main>
      <Fusszeile />
    </>
  );
}
