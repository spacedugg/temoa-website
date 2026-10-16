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
  Verweise,
} from "./Blocks";
import { MarktSektion } from "./Weltkugel";
import { Aufgaben } from "./Aufgaben";
import { Ablauf, Spalten } from "./Strecken";
import { ContentShowcase } from "./ContentShowcase";
import { ContentResultBand } from "./ContentResultBand";
import { BudgetSplitDiagram, MargenDiagramm } from "./Diagrams";
import { pfad, type Sprache } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";
import type { PiktogrammName } from "./Piktogramme";
import { Stimmen } from "../takt/sections";
import { stimmenFuer } from "@/lib/testimonials";

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
const COMPLIANCE_KERN_ZEICHEN: PiktogrammName[] = ["richtlinie", "zertifikat", "ticket", "katalog"];
const PFLICHT_ZEICHEN: PiktogrammName[] = ["verpackung", "schutz", "zertifikat"];
const SPERRE_ZEICHEN: PiktogrammName[] = ["sperre", "richtlinie", "ticket", "buybox"];
/* Die drei Seiten, die aus dem Account Management herausgewachsen sind, in
   der Reihenfolge der Verweise im Woerterbuch. */
const VERWEIS_SEITEN = [
  "/leistungen/compliance-account-health",
  "/leistungen/fba-inventory-management",
  "/leistungen/katalog-listing-management",
];

/* Kundenstimmen auf jeder Leistungsseite, vor dem Abschluss. */
function Stimmenband({ sprache }: { sprache: Sprache }) {
  return <Stimmen w={woerter(sprache).start.stimmen} liste={stimmenFuer(sprache)} />;
}

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
      <Stimmenband sprache={sprache} />
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
      <Stimmenband sprache={sprache} />
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
      <Stimmenband sprache={sprache} />
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
        brueckeGruen
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
      {/* FBA, Katalog und Compliance haben eigene Seiten. Hier nur die
          Verweise: derselbe Inhalt an zwei Stellen waere ein Duplikat. */}
      <Verweise
        tone="blue"
        eyebrow={w.verweise.eyebrow}
        title={w.verweise.titel}
        items={w.verweise.eintraege.map((e, i) => ({
          ...e,
          href: pfad(sprache, VERWEIS_SEITEN[i]),
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
      <Stimmenband sprache={sprache} />
      <ServiceCTA title={w.cta} />
    </>
  );
}

/* ============ COMPLIANCE & ACCOUNT HEALTH ============ */
export function ComplianceBody({ sprache }: { sprache: Sprache }) {
  const alle = woerter(sprache).leistungen;
  const w = alle.compliance;
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
        image="/bilder/s-account-monitor.webp"
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
        brueckeGruen
      />
      <Cards
        tone="white"
        eyebrow={w.kern.eyebrow}
        title={w.kern.titel}
        cols={2}
        items={w.kern.karten.map((k, i) => ({
          piktogramm: COMPLIANCE_KERN_ZEICHEN[i],
          title: k.titel,
          subtitle: k.unterzeile,
          bullets: k.punkte,
        }))}
      />
      <Spalten
        eyebrow={w.pflichten.eyebrow}
        title={w.pflichten.titel}
        description={w.pflichten.lead}
        items={w.pflichten.karten.map((k, i) => ({
          piktogramm: PFLICHT_ZEICHEN[i],
          titel: k.titel,
          unterzeile: k.unterzeile,
          text: k.text,
        }))}
      />
      <Ablauf
        dunkel
        endeGruen
        eyebrow={w.sperre.eyebrow}
        title={w.sperre.titel}
        description={w.sperre.lead}
        schritte={w.sperre.schritte.map((k, i) => ({
          piktogramm: SPERRE_ZEICHEN[i],
          titel: k.titel,
          unterzeile: k.unterzeile,
          text: k.text,
        }))}
      />
      <TextMedia tone="blue" eyebrow={w.abgrenzung.eyebrow} title={w.abgrenzung.titel} text={w.abgrenzung.text} />
      <ResultBlock badge={w.nutzen.badge} title={w.nutzen.titel} benefits={w.nutzen.punkte} />
      <Cards
        tone="blue"
        eyebrow={w.expertise.eyebrow}
        title={w.expertise.titel}
        cols={3}
        items={w.expertise.karten.map((k) => ({ title: k.titel, body: k.text }))}
      />
      <Ergebnis
        eyebrow={b.ausDerPraxis}
        title={w.ergebnis.titel}
        zeile={w.ergebnis.zeile}
        werte={w.ergebnis.werte.map((v, i) => ({ ...v, runter: false }))}
        href={pfad(sprache, "/ergebnisse/haa")}
        mehr={b.fallLesen}
      />
      <Stimmenband sprache={sprache} />
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
      <Stimmenband sprache={sprache} />
      <ServiceCTA title={w.cta} />
    </>
  );
}

/* ============ FBA, KATALOG, REPORTING ============ */

/**
 * Die drei Seiten, die aus dem Account Management und der Full-Service-Seite
 * herausgewachsen sind, teilen einen Aufbau: Problem, Leistungen, Ablauf,
 * Abgrenzung, Nutzen, Erfahrung, ein Fall (wenn es einen gibt), Stimmen,
 * Abschluss. Die Copy steht in `woerter/dienste`, hier nur, was ohne Sprache
 * ist: Bilder, Piktogramme, der zugehoerige Fall.
 */
type DienstSchluessel = "fba" | "katalog" | "reporting";

const DIENST_BILD: Record<DienstSchluessel, string> = {
  fba: "/bilder/s-account-monitor.webp",
  katalog: "/bilder/s-content-ansatz.webp",
  reporting: "/bilder/n-reporting.webp",
};

const DIENST_KERN_ZEICHEN: Record<DienstSchluessel, PiktogrammName[]> = {
  fba: ["bestand", "sendung", "weiche", "ticket"],
  katalog: ["katalog", "suche", "struktur", "wiederholen"],
  reporting: ["marge", "pricing", "ranking", "bestand"],
};

const DIENST_ABLAUF_ZEICHEN: Record<DienstSchluessel, PiktogrammName[]> = {
  fba: ["analyse", "vorlage", "sendung", "termin"],
  katalog: ["analyse", "vorlage", "katalog", "test"],
  reporting: ["marge", "analyse", "fahrplan", "termin"],
};

/* Aus welchem Fall der Ergebnisblock kommt. */
const DIENST_FALL: Partial<
  Record<DienstSchluessel, { quelle: "account" | "content" | "advertising"; href: string }>
> = {
  fba: { quelle: "account", href: "/ergebnisse/marke-gartenzubehoer" },
  katalog: { quelle: "content", href: "/ergebnisse/haa" },
  reporting: { quelle: "advertising", href: "/ergebnisse/vitaworld" },
};

function DienstBody({ sprache, art }: { sprache: Sprache; art: DienstSchluessel }) {
  const alle = woerter(sprache).leistungen;
  const w = alle.dienste[art];
  const b = alle.bausteine;
  const fall = DIENST_FALL[art];
  const erg = fall ? alle[fall.quelle].ergebnis : null;

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
        image={DIENST_BILD[art]}
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
        brueckeGruen
      />
      <Cards
        tone="white"
        eyebrow={w.kern.eyebrow}
        title={w.kern.titel}
        description={w.kern.lead}
        cols={2}
        items={w.kern.karten.map((k, i) => ({
          piktogramm: DIENST_KERN_ZEICHEN[art][i],
          title: k.titel,
          subtitle: k.unterzeile,
          bullets: k.punkte,
        }))}
      />
      <Ablauf
        dunkel
        endeGruen
        eyebrow={w.vorgehen.eyebrow}
        title={w.vorgehen.titel}
        description={w.vorgehen.lead}
        schritte={w.vorgehen.schritte.map((k, i) => ({
          piktogramm: DIENST_ABLAUF_ZEICHEN[art][i],
          titel: k.titel,
          unterzeile: k.unterzeile,
          text: k.text,
        }))}
      />
      <TextMedia tone="blue" eyebrow={w.abgrenzung.eyebrow} title={w.abgrenzung.titel} text={w.abgrenzung.text} />
      <ResultBlock badge={w.nutzen.badge} title={w.nutzen.titel} benefits={w.nutzen.punkte} />
      <Cards
        tone="blue"
        eyebrow={w.expertise.eyebrow}
        title={w.expertise.titel}
        cols={3}
        items={w.expertise.karten.map((k) => ({ title: k.titel, body: k.text }))}
      />
      {fall && erg && (
        <Ergebnis
          eyebrow={b.ausDerPraxis}
          title={erg.titel}
          zeile={erg.zeile}
          werte={erg.werte.map((v) => ({ ...v, runter: false }))}
          href={pfad(sprache, fall.href)}
          mehr={b.fallLesen}
        />
      )}
      <Stimmenband sprache={sprache} />
      <ServiceCTA title={w.cta} />
    </>
  );
}

export function FbaBody({ sprache }: { sprache: Sprache }) {
  return <DienstBody sprache={sprache} art="fba" />;
}
export function KatalogBody({ sprache }: { sprache: Sprache }) {
  return <DienstBody sprache={sprache} art="katalog" />;
}
export function ReportingBody({ sprache }: { sprache: Sprache }) {
  return <DienstBody sprache={sprache} art="reporting" />;
}
