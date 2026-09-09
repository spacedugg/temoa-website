import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { Auftrag } from "@/components/takt/Auftrag";
import { Ablauf } from "@/components/takt/Ablauf";
import {
  Kundenband,
  Befund,
  Verfahren,
  Leistungen,
  Nachweis,
  Arbeiten,
  Stimmen,
  Termin,
  Mannschaft,
} from "@/components/takt/sections";

/**
 * Startseite.
 *
 * Reihenfolge nach der zwoelften Feedbackrunde: erst das Angebot, dann der
 * Beleg, dann die Begruendung. Vorher stand die Ausgangslage vor den
 * Leistungen, ein Besucher las also zuerst, was bei ihm schiefliegt, und
 * erfuhr erst danach, was wir tun.
 *
 * Der Ablauf steht zwischen den Stimmen und dem Termin: erst der Beleg, dann
 * der Plan, dann die Buchung. Der Plan nimmt das Risiko genau dort heraus, wo
 * entschieden wird.
 *
 * Der Blog-Streifen ist raus. Vier Beitragskacheln am Fuss der Startseite
 * haben niemanden zum Gespraech gebracht, den Blog gibt es weiter unter
 * /blog und in der Kopfzeile.
 */
export default function Home() {
  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <Auftrag />
        <Kundenband />
        <Leistungen />
        <Nachweis />
        <Befund />
        <Verfahren />
        <Arbeiten />
        <Stimmen />
        <Ablauf />
        <Termin />
        <Mannschaft />
      </main>
      <Fusszeile />
    </>
  );
}
