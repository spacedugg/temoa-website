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
        <Ausgangslage />
        <Bereiche />
        <Reporting />
        <Unterschied />
        <Termin
          title="Welcher Bereich bremst euer Wachstum?"
          sub="Kostenlose Potenzialanalyse: Wir gehen die fünf Bereiche an eurem Account durch und sagen, wo wir zuerst ansetzen."
        />
      </main>
      <Fusszeile />
    </>
  );
}
