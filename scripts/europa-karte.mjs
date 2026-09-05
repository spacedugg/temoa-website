// Erzeugt die Weltkugel für die Internationalisierungsseite: Länderumrisse,
// Gitternetz und die Punkte der Marktplätze.
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

/* Die Amazon-Marktplätze, die gezeigt werden: Pan-EU, Großbritannien und die
   USA. Kein Kanada und kein Mexiko, die stehen nur als Umgebung auf der Kugel. */
const MARKT = {
  "United States of America": "US",
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

/* Umgebung, damit die Kugel bewohnt aussieht und Europa als Europa lesbar ist. */
const UMGEBUNG = [
  "Ireland", "Portugal", "Switzerland", "Austria", "Czechia", "Slovakia", "Hungary",
  "Slovenia", "Croatia", "Bosnia and Herz.", "Serbia", "Montenegro", "Kosovo",
  "Albania", "North Macedonia", "Greece", "Bulgaria", "Romania", "Moldova",
  "Ukraine", "Belarus", "Lithuania", "Latvia", "Estonia", "Finland", "Norway",
  "Denmark", "Luxembourg", "Turkey", "Iceland",
  "Morocco", "Algeria", "Tunisia", "Libya", "Egypt", "W. Sahara", "Mauritania",
  "Mali", "Niger", "Senegal", "Guinea", "Nigeria", "Chad", "Sudan",
  "Canada", "Greenland", "Mexico", "Cuba", "Bahamas", "Haiti", "Dominican Rep.",
  "Jamaica", "Guatemala", "Honduras", "Nicaragua", "Costa Rica", "Panama",
  "Venezuela", "Colombia", "Brazil", "Guyana", "Suriname",
];

/* Orthografische Projektion: der Blick auf eine Kugel aus grosser Entfernung.
   Damit sieht die Grafik aus wie ein Globus und nicht wie ein gestrecktes
   Rechteck, und der Bogen ueber den Atlantik in die USA ergibt geografisch
   Sinn. Der Mittelpunkt liegt im Nordatlantik, dadurch sind Europa und die
   Ostkueste Nordamerikas gleichzeitig zu sehen. */
const RAD = Math.PI / 180;
const MITTE_LON = -26 * RAD;
const MITTE_LAT = 45 * RAD;
const R = 460;
const CX = 500;
const CY = 500;

/** Kosinus des Winkelabstands zum Mittelpunkt der sichtbaren Halbkugel. */
function kosinus(lon, lat) {
  const phi = lat * RAD;
  const lam = lon * RAD;
  return (
    Math.sin(MITTE_LAT) * Math.sin(phi) +
    Math.cos(MITTE_LAT) * Math.cos(phi) * Math.cos(lam - MITTE_LON)
  );
}

/**
 * Punkte auf der Rueckseite werden auf den Rand der Kugel gezogen, statt sie
 * wegzulassen: sonst reisst eine Kueste, die ueber den Rand laeuft, mitten im
 * Land ab.
 */
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

/* Ringe, die komplett auf der Rueckseite liegen, fliegen raus. */
function ringSichtbar(ring) {
  return ring.some(([lon, lat]) => kosinus(lon, lat) > 0.02);
}

/* Douglas-Peucker: Punkte, die auf der Verbindung ihrer Nachbarn liegen,
   fallen weg. Bei 1,2 Einheiten Toleranz auf 1000 Breite sieht man den
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
    const d = Math.hypot(roh[i][0] - roh[0][0], roh[i][1] - roh[0][1]);
    const bisher = Math.hypot(roh[fern][0] - roh[0][0], roh[fern][1] - roh[0][1]);
    if (d > bisher) fern = i;
  }
  const vorne = vereinfache(roh.slice(0, fern + 1), 1.2);
  const hinten = vereinfache(roh.slice(fern), 1.2);
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

/* Wo die Nadel steht. Bewusst nicht der Flaechenschwerpunkt: der liegt bei
   Frankreich mitten im Zentralmassiv und bei Italien im Meer. */
const NADELN = {
  US: [-88, 39],
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

/* Gitternetz: Laengen- und Breitenkreise. Sie machen aus einer Scheibe eine
   Kugel, weil sie sich zum Rand hin zusammenschieben. */
const gitter = [];
function linie(punkte) {
  if (punkte.length > 1) gitter.push(`M${punkte.join("L")}`);
}
for (let lon = -180; lon < 180; lon += 20) {
  let punkte = [];
  for (let lat = -80; lat <= 80; lat += 2) {
    if (kosinus(lon, lat) <= 0.02) {
      linie(punkte);
      punkte = [];
      continue;
    }
    const [x, y] = auf([lon, lat]);
    punkte.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  linie(punkte);
}
for (let lat = -60; lat <= 80; lat += 20) {
  let punkte = [];
  for (let lon = -180; lon <= 180; lon += 2) {
    if (kosinus(lon, lat) <= 0.02) {
      linie(punkte);
      punkte = [];
      continue;
    }
    const [x, y] = auf([lon, lat]);
    punkte.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  linie(punkte);
}

const inhalt = `/* Erzeugt von scripts/europa-karte.mjs. Nicht von Hand aendern.
   Quelle der Umrisse: Natural Earth ueber world-atlas (Public Domain),
   orthografische Projektion mit Blick auf den Nordatlantik: Europa rechts,
   Nordamerika links. */

export const KARTE_BREITE = 1000;
export const KARTE_HOEHE = 1000;
export const KUGEL = { cx: ${CX}, cy: ${CY}, r: ${R} };

export type Land = { name: string; code: string | null; d: string };

export const LAENDER: Land[] = ${JSON.stringify(raus)};

export const GITTER: string[] = ${JSON.stringify(gitter)};

export const NADELN: Record<string, [number, number]> = ${JSON.stringify(nadeln)};
`;

const ziel = path.join(ROOT, "src/components/service/europa-geo.ts");
fs.writeFileSync(ziel, inhalt);
console.log(
  `${raus.length} Laender, ${gitter.length} Gitterlinien, ${(inhalt.length / 1024).toFixed(0)} kB -> ${path.relative(ROOT, ziel)}`
);
