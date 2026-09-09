// Rechnet die Fotos unter public auf die Groesse herunter, in der sie
// tatsaechlich angezeigt werden, und schreibt sie als WebP.
//
// Anlass: die Teamfotos lagen als Kamera-JPG mit bis zu 2,5 MB je Datei im
// Repo, zusammen 22 MB. Die Homepage laedt fuenfzehn davon und zeigt sie als
// Quadrate von rund hundert Pixeln. Das war der Grund fuer die Ladezeit, nicht
// die generierten Illustrationen (zusammen unter einem Megabyte).
//
// Aufruf:
//   node scripts/bilder-optimieren.mjs          rechnet und zeigt das Ergebnis
//   node scripts/bilder-optimieren.mjs --pruefen  zeigt nur, was passieren wuerde
//
// Die Originale bleiben unter fotos-original erhalten, ausserhalb von public,
// damit sie nicht mitdeployt werden und trotzdem im Repo liegen.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const ARCHIV = path.join(ROOT, "fotos-original");
const nurPruefen = process.argv.includes("--pruefen");

/**
 * Was wo angezeigt wird. Die Kantenlaenge ist die doppelte Anzeigegroesse,
 * damit die Bilder auf Bildschirmen mit hoher Pixeldichte scharf bleiben.
 */
const auftraege = [
  { ordner: "public/team", kante: 900, hinweis: "Portraits und Teamszenen" },
  { ordner: "public/case_studies", kante: 1200, hinweis: "Case-Study-Aufmacher" },
  { ordner: "public/clients", kante: 400, hinweis: "Kundenlogos" },
];

const fotoEndungen = new Set([".jpg", ".jpeg", ".png"]);

function kb(bytes) {
  return Math.round(bytes / 1024);
}

let vorher = 0;
let nachher = 0;
const zeilen = [];

for (const auftrag of auftraege) {
  const verzeichnis = path.join(ROOT, auftrag.ordner);
  if (!fs.existsSync(verzeichnis)) continue;

  for (const name of fs.readdirSync(verzeichnis)) {
    const endung = path.extname(name).toLowerCase();
    if (!fotoEndungen.has(endung)) continue;

    const quelle = path.join(verzeichnis, name);
    const grosse = fs.statSync(quelle).size;
    const basis = path.basename(name, endung);
    const ziel = path.join(verzeichnis, `${basis}.webp`);

    // Logos brauchen Transparenz, deshalb bleiben PNG-Logos verlustfrei.
    const istLogo = auftrag.ordner.endsWith("clients") || auftrag.ordner.endsWith("logo");
    const bild = sharp(quelle);
    const { width, height } = await bild.metadata();
    const langsteKante = Math.max(width ?? 0, height ?? 0);

    if (nurPruefen) {
      zeilen.push(`  ${auftrag.ordner}/${name}  ${kb(grosse)} kB  ${width}x${height} -> ${auftrag.kante}px`);
      vorher += grosse;
      continue;
    }

    const bearbeitet = bild.rotate();
    if (langsteKante > auftrag.kante) {
      bearbeitet.resize({ width: auftrag.kante, height: auftrag.kante, fit: "inside", withoutEnlargement: true });
    }
    await bearbeitet.webp(istLogo ? { quality: 92, nearLossless: true } : { quality: 78 }).toFile(ziel);

    const neu = fs.statSync(ziel).size;
    vorher += grosse;
    nachher += neu;

    // Original wegsichern, dann aus public entfernen.
    const archivOrdner = path.join(ARCHIV, path.relative("public", auftrag.ordner));
    fs.mkdirSync(archivOrdner, { recursive: true });
    fs.renameSync(quelle, path.join(archivOrdner, name));

    zeilen.push(`  ${basis}${endung}  ${kb(grosse)} kB -> ${basis}.webp  ${kb(neu)} kB`);
  }
}

console.log(nurPruefen ? "Vorschau:" : "Umgerechnet:");
console.log(zeilen.join("\n"));
if (nurPruefen) {
  console.log(`\nGesamt vorher: ${kb(vorher)} kB`);
} else {
  console.log(`\nGesamt vorher: ${kb(vorher)} kB, jetzt: ${kb(nachher)} kB`);
  console.log("Originale liegen unter fotos-original, ausserhalb von public.");
  console.log("Die Dateiendungen im Code muessen jetzt auf .webp zeigen.");
}
