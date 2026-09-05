// Erzeugt die Länderumrisse für die Europakarte auf der
// Internationalisierungsseite.
//
// Warum ein Skript und keine gezeichnete Karte: eine Karte aus Stützpunkten von
// Hand sieht aus wie ein Klecks, und Flaggen landen auf den falschen Ländern.
// Genau das war der Fehler in der Referenz des Kunden. Die Umrisse kommen
// deshalb aus Natural Earth (world-atlas, Public Domain), die Projektion rechnet
// das Skript, und im Ergebnis liegt jedes Land dort, wo es hingehört.
//
// Aufruf: node scripts/europa-karte.mjs
// Schreibt: src/components/service/europa-geo.ts

import fs from "node:fs";
import path from "node:path";
import * as topojson from "topojson-client";

const ROOT = process.cwd();
const welt = JSON.parse(
  fs.readFileSync(path.join(ROOT, "node_modules/world-atlas/countries-50m.json"), "utf8")
);
const laender = topojson.feature(welt, welt.objects.countries).features;

/* Was gezeichnet wird. `markt` sind die Amazon-Marktplätze, der Rest ist
   Umgebung, damit Europa als Europa lesbar ist und nicht als Inselgruppe. */
const MARKT = {
  Germany: "DE",
  France: "FR",
  Italy: "IT",
  Spain: "ES",
  Netherlands: "NL",
  Belgium: "BE",
  Poland: "PL",
  Sweden: "SE",
  "United Kingdom": "UK",
};

const UMGEBUNG = [
  "Ireland", "Portugal", "Switzerland", "Austria", "Czechia", "Slovakia", "Hungary",
  "Slovenia", "Croatia", "Bosnia and Herz.", "Serbia", "Montenegro", "Kosovo",
  "Albania", "North Macedonia", "Greece", "Bulgaria", "Romania", "Moldova",
  "Ukraine", "Belarus", "Lithuania", "Latvia", "Estonia", "Finland", "Norway",
  "Denmark", "Luxembourg", "Morocco", "Algeria", "Tunisia", "Turkey", "Iceland",
];

/* Lambert konforme Kegelprojektion, die übliche Projektion für Europakarten.
   Die Breitenkreise laufen leicht gebogen, dadurch sieht die Karte aus wie eine
   Karte und nicht wie ein gestrecktes Rechteck. */
const RAD = Math.PI / 180;
const phi1 = 43 * RAD;
const phi2 = 62 * RAD;
const phi0 = 48 * RAD;
const lam0 = 12 * RAD;

const t = (phi) => Math.tan(Math.PI / 4 + phi / 2);
const n = Math.log(Math.cos(phi1) / Math.cos(phi2)) / Math.log(t(phi2) / t(phi1));
const F = (Math.cos(phi1) * Math.pow(t(phi1), n)) / n;
const rho0 = F / Math.pow(t(phi0), n);

function projiziere([lon, lat]) {
  const phi = lat * RAD;
  const lam = lon * RAD;
  const rho = F / Math.pow(t(phi), n);
  const theta = n * (lam - lam0);
  /* Bildschirmkoordinaten: y waechst nach unten. In der Projektion waechst y
     nach Norden, deshalb hier umgedreht, sonst steht die Karte auf dem Kopf. */
  return [rho * Math.sin(theta), rho * Math.cos(theta) - rho0];
}

/* Ausschnitt: Portugal bis Polen, Nordafrika bis Mittelschweden. Alles
   ausserhalb wird abgeschnitten, damit die Karte nah genug herangeholt ist.
   Der Kunde wollte ausdruecklich nicht den ganzen Globus sehen. */
const FENSTER = { lonMin: -12.5, lonMax: 30, latMin: 35.5, latMax: 69.5 };

const ecken = [
  [FENSTER.lonMin, FENSTER.latMin],
  [FENSTER.lonMax, FENSTER.latMin],
  [FENSTER.lonMin, FENSTER.latMax],
  [FENSTER.lonMax, FENSTER.latMax],
  [(FENSTER.lonMin + FENSTER.lonMax) / 2, FENSTER.latMax],
  [(FENSTER.lonMin + FENSTER.lonMax) / 2, FENSTER.latMin],
].map(projiziere);

const minX = Math.min(...ecken.map((p) => p[0]));
const maxX = Math.max(...ecken.map((p) => p[0]));
const minY = Math.min(...ecken.map((p) => p[1]));
const maxY = Math.max(...ecken.map((p) => p[1]));

const BREITE = 1000;
const skala = BREITE / (maxX - minX);
const HOEHE = Math.round((maxY - minY) * skala);

const auf = ([lon, lat]) => {
  const [x, y] = projiziere([lon, lat]);
  return [(x - minX) * skala, (y - minY) * skala];
};

/* Ringe, die komplett ausserhalb des Fensters liegen, fliegen raus: sonst
   schleppt die Datei Inseln im Atlantik und in der Karibik mit. */
function ringImFenster(ring) {
  return ring.some(([lon, lat]) =>
    lon > FENSTER.lonMin - 6 && lon < FENSTER.lonMax + 6 &&
    lat > FENSTER.latMin - 4 && lat < FENSTER.latMax + 4
  );
}

/* Douglas-Peucker: Punkte, die auf der Verbindung ihrer Nachbarn liegen,
   fallen weg. Bei 1,4 Einheiten Toleranz auf 1000 Breite sieht man den
   Unterschied nicht, die Datei wird aber weniger als halb so gross. */
function vereinfache(punkte, toleranz) {
  if (punkte.length < 3) return punkte;
  const [a] = punkte;
  const b = punkte[punkte.length - 1];
  let weit = 0;
  let index = 0;
  for (let i = 1; i < punkte.length - 1; i++) {
    const p = punkte[i];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const laenge = Math.hypot(dx, dy) || 1;
    const abstand = Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / laenge;
    if (abstand > weit) {
      weit = abstand;
      index = i;
    }
  }
  if (weit <= toleranz) return [a, b];
  return [
    ...vereinfache(punkte.slice(0, index + 1), toleranz).slice(0, -1),
    ...vereinfache(punkte.slice(index), toleranz),
  ];
}

function ringPfad(ring) {
  const roh = ring.map(auf);
  /* Ein geschlossener Ring faengt und endet auf demselben Punkt. Douglas-Peucker
     misst den Abstand zur Verbindung von Anfang und Ende, und die ist bei einem
     Ring null lang: dann faellt der ganze Ring weg. Deshalb am entferntesten
     Punkt in zwei offene Haelften teilen und jede fuer sich vereinfachen. */
  let fern = 0;
  for (let i = 1; i < roh.length; i++) {
    if (Math.hypot(roh[i][0] - roh[0][0], roh[i][1] - roh[0][1]) > Math.hypot(roh[fern][0] - roh[0][0], roh[fern][1] - roh[0][1])) {
      fern = i;
    }
  }
  const vorne = vereinfache(roh.slice(0, fern + 1), 1.4);
  const hinten = vereinfache(roh.slice(fern), 1.4);
  const knapp = [...vorne.slice(0, -1), ...hinten].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`);
  const ohneDoppel = knapp.filter((p, i) => i === 0 || p !== knapp[i - 1]);
  if (ohneDoppel.length < 4) return "";
  return `M${ohneDoppel.join("L")}Z`;
}

function pfad(geometrie) {
  const ringe =
    geometrie.type === "Polygon"
      ? [geometrie.coordinates[0]]
      : geometrie.coordinates.map((poly) => poly[0]);
  return ringe.filter(ringImFenster).map(ringPfad).filter(Boolean).join("");
}

const raus = [];
for (const f of laender) {
  const name = f.properties.name;
  const code = MARKT[name];
  if (!code && !UMGEBUNG.includes(name)) continue;
  const d = pfad(f.geometry);
  if (!d) continue;
  raus.push({ name, code: code ?? null, d });
}

/* Wo die Nadel steht. Bewusst nicht der Flaechenschwerpunkt: der liegt bei
   Frankreich mitten im Zentralmassiv und bei Italien im Meer. */
const NADELN = {
  DE: [10.2, 51.2],
  FR: [2.2, 47.0],
  IT: [12.4, 43.0],
  ES: [-3.7, 40.3],
  NL: [5.6, 52.3],
  BE: [4.6, 50.6],
  PL: [19.4, 52.0],
  SE: [15.2, 59.3],
  UK: [-1.8, 52.8],
};

const nadeln = Object.fromEntries(
  Object.entries(NADELN).map(([k, v]) => [k, auf(v).map((z) => Math.round(z * 10) / 10)])
);

const inhalt = `/* Erzeugt von scripts/europa-karte.mjs. Nicht von Hand aendern.
   Quelle der Umrisse: Natural Earth ueber world-atlas (Public Domain),
   Lambert konforme Kegelprojektion, Ausschnitt Portugal bis Polen. */

export const KARTE_BREITE = ${BREITE};
export const KARTE_HOEHE = ${HOEHE};

export type Land = { name: string; code: string | null; d: string };

export const LAENDER: Land[] = ${JSON.stringify(raus)};

export const NADELN: Record<string, [number, number]> = ${JSON.stringify(nadeln)};
`;

const ziel = path.join(ROOT, "src/components/service/europa-geo.ts");
fs.writeFileSync(ziel, inhalt);
console.log(
  `${raus.length} Laender, ${(inhalt.length / 1024).toFixed(0)} kB -> ${path.relative(ROOT, ziel)} (${BREITE}x${HOEHE})`
);
