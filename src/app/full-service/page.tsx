import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import {
  FullServiceKopf,
  FuerWen,
  Ausgangslage,
  Bereiche,
  Reporting,
  Unterschied,
  NichtFuerWen,
  Onboarding,
} from "@/components/takt/fullservice";
import { Termin } from "@/components/takt/sections";

export const metadata: Metadata = {
  title: "Full Service · temoa",
  description:
    "Strategie, Content, Advertising, Account-Management und neue Marktplätze für euren Amazon-Account. Fünf Bereiche, ein Team, alle mit denselben Zahlen.",
};

export default function FullServicePage() {
  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <FullServiceKopf />
        <FuerWen />
        {/* Direkt hinter „fuer wen es passt" steht, fuer wen es nicht passt.
            Eine Auswahl, die niemanden ausschliesst, ist keine Auswahl. */}
        <NichtFuerWen />
        <Ausgangslage />
        <Bereiche />
        <Reporting />
        <Unterschied />
        <Onboarding />
        <Termin
          title="Welcher Bereich bremst euer Wachstum?"
          sub="Kostenlose Potenzialanalyse: Wir gehen die fünf Bereiche an eurem Account durch und sagen, wo wir zuerst ansetzen."
        />
      </main>
      <Fusszeile />
    </>
  );
}
