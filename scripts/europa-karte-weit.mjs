// WEITER AUSSCHNITT, nur fuer die Entwuerfe der Marktplatzgrafik.
// Gleiche Rechnung wie scripts/europa-karte.mjs, aber mit einem Radius von
// 1020 statt 1750: die Kugel ist nur gut doppelt so gross wie der sichtbare
// Kreis, dadurch stimmt das Verhaeltnis von Land zu Kugel. Faellt weg, sobald
// die Entscheidung fuer einen Entwurf steht.
//
// Erzeugt die Weltkugel für die Internationalisierungsseite: Länderumrisse,
// Gitternetz und die Punkte der Marktplätze.
//
// Warum ein Skript und keine gezeichnete Karte: eine Karte aus Stützpunkten von
// Hand sieht aus wie ein Klecks, und Flaggen landen auf den falschen Ländern.
// Genau das war der Fehler in der Referenz des Kunden. Die Umrisse kommen
// deshalb aus Natural Earth (world-atlas, Public Domain), die Projektion rechnet
// das Skript, und im Ergebnis liegt jedes Land dort, wo es hingehört.
//
// Aufruf: node scripts/europa-karte-weit.mjs
// Schreibt: src/components/service/europa-geo-weit.ts

import fs from "node:fs";
import path from "node:path";
import * as topojson from "topojson-client";

const ROOT = process.cwd();
const welt = JSON.parse(
  fs.readFileSync(path.join(ROOT, "node_modules/world-atlas/countries-50m.json"), "utf8")
);
const laender = topojson.feature(welt, welt.objects.countries).features;

/* Die Amazon-Marktplätze auf der Kugel: Pan-EU und Großbritannien. Die USA
   liegen bei diesem Zoom hinter dem Horizont, ihre Flagge sitzt im Bauteil
   neben der Kugel. */
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

/* Umgebung, damit Europa als Europa lesbar ist und der Rand der Sicht nicht
   leer bleibt. */
const UMGEBUNG = [
  "Ireland", "Portugal", "Switzerland", "Austria", "Czechia", "Slovakia", "Hungary",
  "Slovenia", "Croatia", "Bosnia and Herz.", "Serbia", "Montenegro", "Kosovo",
  "Albania", "North Macedonia", "Greece", "Bulgaria", "Romania", "Moldova",
  "Ukraine", "Belarus", "Lithuania", "Latvia", "Estonia", "Finland", "Norway",
  "Denmark", "Luxembourg", "Turkey", "Iceland", "Russia",
  "Morocco", "Algeria", "Tunisia", "Libya", "W. Sahara", "Mauritania", "Mali",
  "Niger", "Egypt", "Syria", "Iraq", "Iran", "Jordan", "Israel", "Lebanon",
  "Saudi Arabia", "Cyprus", "Malta", "Georgia", "Armenia", "Azerbaijan",
  "Kazakhstan", "Greenland",
];

/* Orthografische Projektion: der Blick auf eine Kugel aus grosser Entfernung.
   Anders als bisher steht die Kugel nicht als ganze Scheibe im Bild, sondern
   der Blick geht nah an Europa heran: der Radius ist ein Vielfaches des
   sichtbaren Kreises, dadurch sind Deutschland, Frankreich und Italien gross
   genug, dass eine Flagge im Land stehen kann. Woelbung und Gitternetz bleiben
   sichtbar, deshalb liest es sich weiter als Kugel und nicht als Landkarte. */
const RAD = Math.PI / 180;
const MITTE_LON = 10 * RAD;
const MITTE_LAT = 44 * RAD;
const R = 1020;
const CX = 500;
const CY = 500;
const BREITE = 1000;
const HOEHE = 1000;
/* Der sichtbare Kreis. Alles ausserhalb schneidet die Maske im Bauteil ab. */
const SICHT = 470;

/** Kosinus des Winkelabstands zum Mittelpunkt der sichtbaren Halbkugel. */
function kosinus(lon, lat) {
  const phi = lat * RAD;
  const lam = lon * RAD;
  return (
    Math.sin(MITTE_LAT) * Math.sin(phi) +
    Math.cos(MITTE_LAT) * Math.cos(phi) * Math.cos(lam - MITTE_LON)
  );
}

function auf([lon, lat]) {
  const phi = lat * RAD;
  const lam = lon * RAD;
  let x = Math.cos(phi) * Math.sin(lam - MITTE_LON);
  let y = Math.cos(MITTE_LAT) * Math.sin(phi) - Math.sin(MITTE_LAT) * Math.cos(phi) * Math.cos(lam - MITTE_LON);
  if (kosinus(lon, lat) < 0) {
    const laenge = Math.hypot(x, y) || 1;
    x /= laenge;
    y /= laenge;
  }
  return [CX + R * x, CY - R * y];
}

/** Liegt der Punkt nah genug am sichtbaren Kreis, um zu zaehlen? */
function nah([x, y], rand) {
  return Math.hypot(x - CX, y - CY) < rand;
}

/* Douglas-Peucker: Punkte, die auf der Verbindung ihrer Nachbarn liegen,
   fallen weg. Bei diesem Zoom ist die Toleranz kleiner als frueher, sonst
   verliert eine Kueste bei zehnfacher Vergroesserung ihre Form. */
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
    const d = Math.hypot(roh[i][0] - roh[0][0], roh[i][1] - roh[0][1]);
    const bisher = Math.hypot(roh[fern][0] - roh[0][0], roh[fern][1] - roh[0][1]);
    if (d > bisher) fern = i;
  }
  const vorne = vereinfache(roh.slice(0, fern + 1), 0.55);
  const hinten = vereinfache(roh.slice(fern), 0.55);
  const knapp = [...vorne.slice(0, -1), ...hinten].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`);
  const ohneDoppel = knapp.filter((p, i) => i === 0 || p !== knapp[i - 1]);
  if (ohneDoppel.length < 4) return "";
  return `M${ohneDoppel.join("L")}Z`;
}

/* Ringe zaehlen nur, wenn sie den sichtbaren Kreis beruehren. Bei diesem Zoom
   liegt der groesste Teil der Welt weit ausserhalb; ohne diesen Filter waere
   die Datei ein Vielfaches gross und der Browser zeichnet Umrisse, die niemand
   sieht. Etwas Rand ueber den Kreis hinaus bleibt stehen, damit an der Kante
   kein Land mitten im Nichts anfaengt. */
function ringSichtbar(ring) {
  return ring.some((p) => kosinus(p[0], p[1]) > 0 && nah(auf(p), SICHT + 260));
}

function pfad(geometrie) {
  const ringe =
    geometrie.type === "Polygon"
      ? [geometrie.coordinates[0]]
      : geometrie.coordinates.map((poly) => poly[0]);
  return ringe.filter(ringSichtbar).map(ringPfad).filter(Boolean).join("");
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

/* Wo die Flagge steht. Bewusst nicht der Flaechenschwerpunkt: der liegt bei
   Frankreich mitten im Zentralmassiv und bei Italien im Meer. */
const NADELN = {
  DE: [10.4, 51.3],
  FR: [2.2, 46.9],
  IT: [12.3, 42.4],
  ES: [-2.6, 40.3],
  NL: [5.5, 52.4],
  BE: [4.5, 50.5],
  PL: [19.3, 52.1],
  SE: [15.0, 60.0],
  UK: [-2.0, 53.2],
};

const nadeln = Object.fromEntries(
  Object.entries(NADELN).map(([k, v]) => [k, auf(v).map((z) => Math.round(z * 10) / 10)])
);

/* Gitternetz: Laengen- und Breitenkreise. Sie machen aus einer Flaeche eine
   Kugel, weil sie sich zum Rand hin kruemmen. Bei diesem Zoom in feineren
   Schritten als bei einer ganzen Kugel, sonst laeuft nur eine Linie durchs
   Bild. */
const gitter = [];
function linie(punkte) {
  if (punkte.length > 1) gitter.push(`M${punkte.join("L")}`);
}
for (let lon = -40; lon <= 60; lon += 10) {
  let punkte = [];
  for (let lat = 20; lat <= 80; lat += 1) {
    const p = auf([lon, lat]);
    if (kosinus(lon, lat) <= 0 || !nah(p, SICHT + 60)) {
      linie(punkte);
      punkte = [];
      continue;
    }
    punkte.push(`${p[0].toFixed(1)},${p[1].toFixed(1)}`);
  }
  linie(punkte);
}
for (let lat = 25; lat <= 75; lat += 5) {
  let punkte = [];
  for (let lon = -60; lon <= 80; lon += 1) {
    const p = auf([lon, lat]);
    if (kosinus(lon, lat) <= 0 || !nah(p, SICHT + 60)) {
      linie(punkte);
      punkte = [];
      continue;
    }
    punkte.push(`${p[0].toFixed(1)},${p[1].toFixed(1)}`);
  }
  linie(punkte);
}

const inhalt = `/* Erzeugt von scripts/europa-karte.mjs. Nicht von Hand aendern.
   Quelle der Umrisse: Natural Earth ueber world-atlas (Public Domain),
   orthografische Projektion, nah an Europa herangefahren: die Kugel ist ein
   Vielfaches groesser als der sichtbare Kreis. */

export const KARTE_BREITE = ${BREITE};
export const KARTE_HOEHE = ${HOEHE};
export const KUGEL = { cx: ${CX}, cy: ${CY}, r: ${SICHT} };

export type Land = { name: string; code: string | null; d: string };

export const LAENDER: Land[] = ${JSON.stringify(raus)};

export const GITTER: string[] = ${JSON.stringify(gitter)};

export const NADELN: Record<string, [number, number]> = ${JSON.stringify(nadeln)};
`;

const ziel = path.join(ROOT, "src/components/service/europa-geo-weit.ts");
fs.writeFileSync(ziel, inhalt);
console.log(
  `${raus.length} Laender, ${gitter.length} Gitterlinien, ${(inhalt.length / 1024).toFixed(0)} kB -> ${path.relative(ROOT, ziel)}`
);
console.log(nadeln);
