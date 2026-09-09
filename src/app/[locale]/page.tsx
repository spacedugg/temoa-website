import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { Auftrag } from "@/components/takt/Auftrag";
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
        <Termin />
        <Mannschaft />
      </main>
      <Fusszeile />
    </>
  );
}
