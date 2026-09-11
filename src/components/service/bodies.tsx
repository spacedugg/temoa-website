import {
  ServiceHero,
  Cards,
  SplitCards,
  Points,
  Compare,
  TextMedia,
  ResultBlock,
  ServiceCTA,
  Lieferung,
  Ergebnis,
} from "./Blocks";
import { MarktSektion } from "./Weltkugel";
import { Aufgaben } from "./Aufgaben";
import { ContentShowcase } from "./ContentShowcase";
import { ContentResultBand } from "./ContentResultBand";
import { BudgetSplitDiagram, MargenDiagramm } from "./Diagrams";
import { pfad, type Sprache } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";
import type { PiktogrammName } from "./Piktogramme";

/* ============================================================
   Die fuenf Leistungsseiten.

   Die Copy steht im Woerterbuch, hier steht der Aufbau. Diese Datei laeuft
   auf dem Server, sie darf das Woerterbuch deshalb selbst importieren; die
   Bausteine darunter laufen im Browser und bekommen ihre Beschriftungen als
   Prop.

   Was hier im Modul bleibt, ist alles ohne Sprache: Bildpfade, die Namen der
   Piktogramme, die Adressen der Faelle.
   ============================================================ */

/* Die Piktogramme in der Reihenfolge der Karten im Woerterbuch. */
const STRATEGIE_ZEICHEN: PiktogrammName[] = ["analyse", "fahrplan"];
const ADVERTISING_ZEICHEN: PiktogrammName[] = [
  "marge",
  "struktur",
  "marke",
  "suche",
  "pricing",
  "ranking",
];
const INTERNATIONAL_ZEICHEN: PiktogrammName[] = ["sprache", "seite", "kampagne", "wiederholen"];
const KATALOG_ZEICHEN: PiktogrammName[] = ["katalog", "suche", "struktur", "wiederholen"];
const AUFGABEN_ZEICHEN: PiktogrammName[] = [
  "buybox",
  "bestand",
  "ticket",
  "seite",
  "richtlinie",
  "test",
  "pricing",
  "termin",
];

/* ============ STRATEGIE ============ */
export function StrategieBody({ sprache }: { sprache: Sprache }) {
  const alle = woerter(sprache).leistungen;
  const w = alle.strategie;
  const b = alle.bausteine;

  return (
    <>
      <ServiceHero
        eyebrow={w.hero.eyebrow}
        title={
          <>
            {w.hero.titelVor}
            <span className="text-gradient">{w.hero.titelEm}</span>
          </>
        }
        sub={w.hero.lead}
        image="/bilder/s-strategie.webp"
        imageAlt={w.hero.bildAlt}
        knopf={alle.bausteine.knopf}
        knopfHref={pfad(sprache, "/gespraech-vereinbaren")}
      />
      <Points
        tone="blue"
        eyebrow={b.dasProblem}
        title={w.problem.titel}
        points={w.problem.punkte}
        bridge={w.problem.bruecke}
      />
      <Cards
        tone="white"
        eyebrow={w.inhalt.eyebrow}
        title={w.inhalt.titel}
        cols={2}
        items={w.inhalt.karten.map((k, i) => ({
          piktogramm: STRATEGIE_ZEICHEN[i],
          title: k.titel,
          subtitle: k.unterzeile,
          bullets: k.punkte,
        }))}
      />
      <Lieferung
        eyebrow={w.lieferung.eyebrow}
        title={w.lieferung.titel}
        stuecke={w.lieferung.stuecke.map((s) => ({
          kicker: s.kicker,
          title: s.titel,
          punkte: s.punkte,
        }))}
      />
      <Ergebnis
        eyebrow={b.ausDerPraxis}
        title={w.ergebnis.titel}
        zeile={w.ergebnis.zeile}
        /* `runter` steht hier und nicht im Woerterbuch: ob ein gefallener Wert
           gut ist, haengt an der Kennzahl und nicht an der Sprache. */
        werte={w.ergebnis.werte.map((v, i) => ({ ...v, runter: i > 0 }))}
        href={pfad(sprache, "/ergebnisse/vitaworld")}
        mehr={b.fallLesen}
      />
      <ServiceCTA title={w.cta} />
    </>
  );
}

/* ============ PRODUKTBILDER & SEO ============ */
export function ContentBody({ sprache }: { sprache: Sprache }) {
  const alle = woerter(sprache).leistungen;
  const w = alle.content;
  const b = alle.bausteine;

  return (
    <>
      <ServiceHero
        eyebrow={w.hero.eyebrow}
        title={
          <>
            {w.hero.titelVor}
            <span className="text-gradient">{w.hero.titelEm}</span>
          </>
        }
        sub={w.hero.lead}
        image="/bilder/s-content.webp"
        imageAlt={w.hero.bildAlt}
        knopf={b.knopf}
        knopfHref={pfad(sprache, "/gespraech-vereinbaren")}
      />
      <ContentResultBand w={alle.contentBand} />
      <TextMedia
        tone="blue"
        eyebrow={b.unserAnsatz}
        title={w.ansatz.titel}
        text={w.ansatz.text}
        image="/bilder/s-content-ansatz.webp"
        imageAlt={w.ansatz.bildAlt}
        imageAspect="aspect-[3/2]"
      />
      <ContentShowcase w={alle.contentSchau} />
      <Compare
        tone="blue"
        eyebrow={b.vorherNachher}
        title={w.vergleich.titel}
        left={{ label: w.vergleich.linksLabel, points: w.vergleich.links }}
        right={{ label: w.vergleich.rechtsLabel, points: w.vergleich.rechts }}
      />
      <Ergebnis
        eyebrow={b.ausDerPraxis}
        title={w.ergebnis.titel}
        zeile={w.ergebnis.zeile}
        werte={w.ergebnis.werte}
        href={pfad(sprache, "/ergebnisse/haa")}
        mehr={b.fallLesen}
      />
      <ServiceCTA title={w.cta} />
    </>
  );
}

/* ============ PPC ADVERTISING ============ */
export function AdvertisingBody({ sprache }: { sprache: Sprache }) {
  const alle = woerter(sprache).leistungen;
  const w = alle.advertising;
  const b = alle.bausteine;

  return (
    <>
      <ServiceHero
        eyebrow={w.hero.eyebrow}
        title={
          <>
            {w.hero.titelVor}
            <span className="text-gradient">{w.hero.titelEm}</span>
          </>
        }
        sub={w.hero.lead}
        image="/bilder/s-advertising.webp"
        imageAlt={w.hero.bildAlt}
        knopf={b.knopf}
        knopfHref={pfad(sprache, "/gespraech-vereinbaren")}
      />
      <Points
        tone="blue"
        eyebrow={b.dasProblem}
        title={w.problem.titel}
        points={w.problem.punkte}
        bridge={w.problem.bruecke}
        aside={<BudgetSplitDiagram w={alle.budgetDiagramm} />}
      />
      <TextMedia
        tone="white"
        eyebrow={b.unserAnsatz}
        title={w.ansatz.titel}
        text={w.ansatz.text}
        aside={<MargenDiagramm w={alle.margenDiagramm} />}
        reverse
      />
      <Cards
        tone="blue"
        eyebrow={b.wasWirUebernehmen}
        title={w.leistung.titel}
        cols={3}
        items={w.leistung.karten.map((k, i) => ({
          piktogramm: ADVERTISING_ZEICHEN[i],
          title: k.titel,
          body: k.text,
        }))}
      />
      <Ergebnis
        eyebrow={b.ausDerPraxis}
        title={w.ergebnis.titel}
        zeile={w.ergebnis.zeile}
        werte={w.ergebnis.werte.map((v, i) => ({ ...v, runter: i === 0 }))}
        href={pfad(sprache, "/ergebnisse/futum")}
        mehr={b.fallLesen}
      />
      <ServiceCTA title={w.cta} />
    </>
  );
}

/* ============ ACCOUNT MANAGEMENT ============ */
export function AccountBody({ sprache }: { sprache: Sprache }) {
  const alle = woerter(sprache).leistungen;
  const w = alle.account;
  const b = alle.bausteine;

  return (
    <>
      <ServiceHero
        eyebrow={w.hero.eyebrow}
        title={
          <>
            {w.hero.titelVor}
            <span className="text-gradient">{w.hero.titelEm}</span>
          </>
        }
        sub={w.hero.lead}
        image="/bilder/s-account.webp"
        imageAlt={w.hero.bildAlt}
        knopf={b.knopf}
        knopfHref={pfad(sprache, "/gespraech-vereinbaren")}
      />
      <Points
        tone="blue"
        eyebrow={b.dasProblem}
        title={w.problem.titel}
        points={w.problem.punkte}
        bridge={w.problem.bruecke}
      />
      <SplitCards
        tone="white"
        eyebrow={w.faelle.eyebrow}
        title={w.faelle.titel}
        image="/bilder/s-account-monitor.webp"
        imageAlt={w.faelle.bildAlt}
        imageAspect="aspect-[3/2]"
        items={w.faelle.stuecke.map((s) => ({ title: s.titel, body: s.text }))}
      />
      <Aufgaben
        eyebrow={b.wasWirUebernehmen}
        title={w.aufgaben.titel}
        items={w.aufgaben.liste.map((a, i) => ({
          name: AUFGABEN_ZEICHEN[i],
          title: a.titel,
          body: a.text,
        }))}
      />
      <Cards
        tone="white"
        eyebrow={w.katalog.eyebrow}
        title={w.katalog.titel}
        description={w.katalog.lead}
        cols={2}
        items={w.katalog.karten.map((k, i) => ({
          piktogramm: KATALOG_ZEICHEN[i],
          title: k.titel,
          subtitle: k.unterzeile,
          body: k.text,
        }))}
      />
      <ResultBlock
        badge={w.ergebnisBand.badge}
        title={w.ergebnisBand.titel}
        benefits={w.ergebnisBand.punkte}
      />
      <Ergebnis
        eyebrow={b.ausDerPraxis}
        title={w.ergebnis.titel}
        zeile={w.ergebnis.zeile}
        werte={w.ergebnis.werte.map((v, i) => ({ ...v, runter: i === 0 }))}
        href={pfad(sprache, "/ergebnisse/marke-gartenzubehoer")}
        mehr={b.fallLesen}
      />
      <ServiceCTA title={w.cta} />
    </>
  );
}

/* ============ INTERNATIONALISIERUNG ============ */
export function InternationalisierungBody({ sprache }: { sprache: Sprache }) {
  const alle = woerter(sprache).leistungen;
  const w = alle.international;
  const b = alle.bausteine;

  return (
    <>
      <ServiceHero
        eyebrow={w.hero.eyebrow}
        title={
          <>
            {w.hero.titelVor}
            <span className="text-gradient">{w.hero.titelEm}</span>
          </>
        }
        sub={w.hero.lead}
        image="/bilder/s-international.webp"
        imageAlt={w.hero.bildAlt}
        knopf={b.knopf}
        knopfHref={pfad(sprache, "/gespraech-vereinbaren")}
      />
      <Points
        tone="blue"
        eyebrow={b.dasProblem}
        title={w.problem.titel}
        points={w.problem.punkte}
        bridge={w.problem.bruecke}
      />
      <Cards
        tone="white"
        eyebrow={w.vorgehen.eyebrow}
        title={w.vorgehen.titel}
        cols={2}
        items={w.vorgehen.karten.map((k, i) => ({
          piktogramm: INTERNATIONAL_ZEICHEN[i],
          title: k.titel,
          subtitle: k.unterzeile,
          body: k.text,
        }))}
      />
      <MarktSektion
        eyebrow={w.karte.eyebrow}
        title={w.karte.titel}
        text={w.karte.text}
        w={alle.weltkugel}
      />
      <Ergebnis
        eyebrow={b.ausDerPraxis}
        title={w.ergebnis.titel}
        zeile={w.ergebnis.zeile}
        werte={w.ergebnis.werte.map((v, i) => ({ ...v, runter: i === 1 }))}
        href={pfad(sprache, "/ergebnisse/miganeo")}
        mehr={b.fallLesen}
      />
      <Compare
        tone="white"
        eyebrow={b.vorherNachher}
        title={w.vergleich.titel}
        left={{ label: w.vergleich.linksLabel, points: w.vergleich.links }}
        right={{ label: w.vergleich.rechtsLabel, points: w.vergleich.rechts }}
      />
      <ServiceCTA title={w.cta} />
    </>
  );
}
