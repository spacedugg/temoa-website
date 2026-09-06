// Erzeugt die Weltkugel fuer die Internationalisierung.
//
// Blick auf den Atlantik: links Nordamerika, rechts Europa, unten Nordafrika.
// Damit sind der Startmarkt, die europaeischen Marktplaetze und die USA
// gleichzeitig zu sehen, und der Bogen ueber den Atlantik ergibt geografisch
// Sinn.
//
// Die Werte sind auf die Referenz des Kunden gerechnet: die Kugel ist groesser
// als der Rahmen und unten angeschnitten, Europa liegt rechts der Mitte, die
// USA links. Deutschland landet dadurch bei (1060, 450) und ist gross genug,
// dass eine Fahne darin steckt.
//
// Die Umrisse kommen aus Natural Earth (world-atlas, Public Domain). Eine von
// Hand gezeichnete Karte sieht aus wie ein Klecks, und Fahnen landen auf den
// falschen Laendern.
//
// Aufruf: node scripts/welt-karte.mjs
// Schreibt: src/components/service/welt-geo.ts

import fs from "node:fs";
import path from "node:path";
import * as topojson from "topojson-client";

const ROOT = process.cwd();
const welt = JSON.parse(
  fs.readFileSync(path.join(ROOT, "node_modules/world-atlas/countries-50m.json"), "utf8")
);
const laender = topojson.feature(welt, welt.objects.countries).features;

/* Die Amazon-Marktplaetze, die wir betreuen. */
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
  "United States of America": "US",
};

const RAD = Math.PI / 180;
const MITTE_LON = -17 * RAD;
const MITTE_LAT = 25 * RAD;
const R = 795;
const CX = 830;
const CY = 830;
const BREITE = 1660;
const HOEHE = 930;

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
  let y =
    Math.cos(MITTE_LAT) * Math.sin(phi) -
    Math.sin(MITTE_LAT) * Math.cos(phi) * Math.cos(lam - MITTE_LON);
  if (kosinus(lon, lat) < 0) {
    /* Hinter dem Horizont: auf den Rand ziehen, damit keine Linie quer durch
       die Kugel laeuft. */
    const laenge = Math.hypot(x, y) || 1;
    x /= laenge;
    y /= laenge;
  }
  return [CX + R * x, CY - R * y];
}

/* Douglas-Peucker. Die Toleranz ist in Bildpunkten, sie waechst also mit dem
   Radius mit. */
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

function ringPfad(ring, toleranz) {
  const roh = ring.map(auf);
  let fern = 0;
  for (let i = 1; i < roh.length; i++) {
    const d = Math.hypot(roh[i][0] - roh[0][0], roh[i][1] - roh[0][1]);
    const bisher = Math.hypot(roh[fern][0] - roh[0][0], roh[fern][1] - roh[0][1]);
    if (d > bisher) fern = i;
  }
  const vorne = vereinfache(roh.slice(0, fern + 1), toleranz);
  const hinten = vereinfache(roh.slice(fern), toleranz);
  const knapp = [...vorne.slice(0, -1), ...hinten].map(
    ([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`
  );
  const ohneDoppel = knapp.filter((p, i) => i === 0 || p !== knapp[i - 1]);
  if (ohneDoppel.length < 4) return "";
  return `M${ohneDoppel.join("L")}Z`;
}

/* Ringe, die groesstenteils hinter dem Horizont liegen, fallen weg: ihre
   Punkte werden auf den Rand gezogen und wuerden dort schmieren. */
function ringSichtbar(ring) {
  const sichtbar = ring.filter(([lon, lat]) => kosinus(lon, lat) > 0.02).length;
  return sichtbar / ring.length > 0.4;
}

function pfad(geometrie, toleranz) {
  const ringe =
    geometrie.type === "Polygon"
      ? [geometrie.coordinates[0]]
      : geometrie.coordinates.map((poly) => poly[0]);
  return ringe
    .filter(ringSichtbar)
    .map((r) => ringPfad(r, toleranz))
    .filter(Boolean)
    .join("");
}

/* Marktplaetze feiner, alles andere grober: die Laender, in denen eine Fahne
   steckt, sollen ihre Form behalten. */
const raus = [];
for (const f of laender) {
  const name = f.properties.name;
  const code = MARKT[name] ?? null;
  const d = pfad(f.geometry, code ? 0.7 : 1.6);
  if (!d) continue;
  raus.push({ name, code, d });
}

/* Wo die Nadel steckt. Bewusst nicht der Flaechenschwerpunkt: der liegt bei
   Frankreich mitten im Zentralmassiv und bei Italien im Meer. */
const NADELN = {
  DE: [10.4, 51.2],
  FR: [2.4, 46.6],
  IT: [12.5, 42.4],
  ES: [-3.7, 40.2],
  NL: [5.6, 52.3],
  BE: [4.6, 50.6],
  PL: [19.4, 52.0],
  SE: [15.4, 60.3],
  UK: [-1.9, 52.8],
  US: [-96, 39.5],
};

const nadeln = Object.fromEntries(
  Object.entries(NADELN).map(([k, v]) => [k, auf(v).map((z) => Math.round(z * 10) / 10)])
);

const inhalt = `/* Erzeugt von scripts/welt-karte.mjs. Nicht von Hand aendern.
   Quelle der Umrisse: Natural Earth ueber world-atlas (Public Domain),
   orthografische Projektion mit Blick auf den Atlantik. */

export const KARTE_BREITE = ${BREITE};
export const KARTE_HOEHE = ${HOEHE};
export const KUGEL = { cx: ${CX}, cy: ${CY}, r: ${R} };

export type Land = { name: string; code: string | null; d: string };

export const LAENDER: Land[] = ${JSON.stringify(raus)};

export const NADELN: Record<string, [number, number]> = ${JSON.stringify(nadeln)};
`;

const ziel = path.join(ROOT, "src/components/service/welt-geo.ts");
fs.writeFileSync(ziel, inhalt);
console.log(
  `${raus.length} Laender, ${(inhalt.length / 1024).toFixed(0)} kB -> ${path.relative(ROOT, ziel)}`
);
console.log(nadeln);
