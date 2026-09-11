/* ============================================================
   Baut die Icons der Website aus dem Zeichen der Marke.

   node scripts/icons-bauen.mjs

   Erzeugt in `public/icon`:
     zeichen.svg       Das Zeichen mit Hell- und Dunkelfassung in einer Datei.
     icon-192.png      Fuer den Startbildschirm und das Manifest.
     icon-512.png      Dasselbe, gross.
     apple-touch.png   Fuer iOS, auf Navy: iOS legt ein transparentes Icon
                       sonst auf Schwarz, und die dunkle U-Form verschwindet.
   Dazu `public/favicon.ico` als Rueckfallebene fuer alte Browser.

   Warum kein weisser Grund: der Reiter eines Browsers ist im Dunkelmodus
   dunkel, ein weisses Kaestchen darin ist als Fremdkoerper zu sehen. Das
   Zeichen steht deshalb frei, und die dunkle U-Form wechselt im Dunkelmodus
   auf Hellblau. Das kann nur SVG, deshalb ist SVG das Hauptformat und PNG
   die Rueckfallebene.
   ============================================================ */

import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const NAVY = "#023047";
const NAVY_DUNKELMODUS = "#CFE4F2";
const ORANGE = "#FF9900";
const ROT = "#FF3131";
const HELLBLAU = "#A8D8F0";
const NAVY_GRUND = "#0D2439";

/* Das Zeichen misst 228 auf 254. In ein Quadrat von 256 gesetzt, auf 224 Hoehe
   skaliert und zentriert: so bleibt ringsum Luft, und im Reiter steht es nicht
   Kante an Kante. */
const SKALA = 224 / 254;
const VERSATZ_X = (256 - 228 * SKALA) / 2;
const VERSATZ_Y = (256 - 224) / 2;

function formen(navy) {
  return `
    <rect x="0" y="0" width="108" height="108" rx="4" fill="${ORANGE}"/>
    <circle cx="174" cy="54" r="54" fill="${ROT}"/>
    <path d="M2.4,121.7 L107.6,121.7 C108.8,121.7 109.8,122.7 109.8,123.9 L109.8,200.6 C109.5,223.9 94.6,243.7 74.1,251.2 C68.6,253.1 62.3,254.1 56,254.1 C49.7,254.1 43.8,253 38.3,251.2 C17.6,243.8 2.7,224 2.4,200.6 Z" fill="${navy}"/>
    <path d="M176.3,122.9 L226.2,153.6 C227.4,154.3 228.1,155.6 228.1,157 L228.1,218.7 C228.1,220.1 227.4,221.4 226.2,222.1 L176.3,252.9 C175.1,253.6 173.6,253.6 172.5,252.9 L122.6,222.1 C121.4,221.4 120.7,220.1 120.7,218.7 L120.7,157 C120.7,155.6 121.4,154.3 122.6,153.6 Z" fill="${HELLBLAU}"/>`;
}

function huelle(inhalt, grund = "none") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
${grund === "none" ? "" : `  <rect width="256" height="256" rx="56" fill="${grund}"/>\n`}  <g transform="translate(${VERSATZ_X.toFixed(2)} ${VERSATZ_Y}) scale(${SKALA.toFixed(5)})">${inhalt}
  </g>
</svg>
`;
}

/* Die SVG-Fassung traegt beide Modi in einer Datei. `currentColor` waere
   eleganter, ein Icon im Reiter erbt aber keine Farbe: es braucht die
   Medienabfrage im Dokument selbst. */
const zeichenSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <style>
    .u { fill: ${NAVY}; }
    @media (prefers-color-scheme: dark) { .u { fill: ${NAVY_DUNKELMODUS}; } }
  </style>
  <g transform="translate(${VERSATZ_X.toFixed(2)} ${VERSATZ_Y}) scale(${SKALA.toFixed(5)})">
    <rect x="0" y="0" width="108" height="108" rx="4" fill="${ORANGE}"/>
    <circle cx="174" cy="54" r="54" fill="${ROT}"/>
    <path class="u" d="M2.4,121.7 L107.6,121.7 C108.8,121.7 109.8,122.7 109.8,123.9 L109.8,200.6 C109.5,223.9 94.6,243.7 74.1,251.2 C68.6,253.1 62.3,254.1 56,254.1 C49.7,254.1 43.8,253 38.3,251.2 C17.6,243.8 2.7,224 2.4,200.6 Z"/>
    <path d="M176.3,122.9 L226.2,153.6 C227.4,154.3 228.1,155.6 228.1,157 L228.1,218.7 C228.1,220.1 227.4,221.4 226.2,222.1 L176.3,252.9 C175.1,253.6 173.6,253.6 172.5,252.9 L122.6,222.1 C121.4,221.4 120.7,220.1 120.7,218.7 L120.7,157 C120.7,155.6 121.4,154.3 122.6,153.6 Z" fill="${HELLBLAU}"/>
  </g>
</svg>
`;

/** PNG-in-ICO: der Kopf eines ICO mit genau einem Bild, das ein PNG ist. */
function ico(png, kante) {
  const kopf = Buffer.alloc(6 + 16);
  kopf.writeUInt16LE(0, 0); // reserviert
  kopf.writeUInt16LE(1, 2); // Typ: Icon
  kopf.writeUInt16LE(1, 4); // ein Bild
  kopf.writeUInt8(kante >= 256 ? 0 : kante, 6);
  kopf.writeUInt8(kante >= 256 ? 0 : kante, 7);
  kopf.writeUInt8(0, 8); // Farben in der Palette: keine
  kopf.writeUInt8(0, 9); // reserviert
  kopf.writeUInt16LE(1, 10); // Ebenen
  kopf.writeUInt16LE(32, 12); // Bit je Punkt
  kopf.writeUInt32LE(png.length, 14);
  kopf.writeUInt32LE(22, 18); // Versatz der Bilddaten
  return Buffer.concat([kopf, png]);
}

const hell = Buffer.from(huelle(formen(NAVY)));
const aufNavy = Buffer.from(huelle(formen("#ffffff"), NAVY_GRUND));

await mkdir("public/icon", { recursive: true });
await writeFile("public/icon/zeichen.svg", zeichenSvg);

for (const kante of [192, 512]) {
  await sharp(hell, { density: 512 }).resize(kante, kante).png({ compressionLevel: 9 }).toFile(`public/icon/icon-${kante}.png`);
}
await sharp(aufNavy, { density: 512 }).resize(180, 180).png({ compressionLevel: 9 }).toFile("public/icon/apple-touch.png");

const klein = await sharp(hell, { density: 512 }).resize(48, 48).png({ compressionLevel: 9 }).toBuffer();
await writeFile("public/favicon.ico", ico(klein, 48));

console.log("Icons gebaut.");
