// Rechnet die vom Kunden gelieferte Arbeit je Case Study auf Anzeigegroesse
// herunter und schreibt sie als WebP nach public/case_studies/<slug>/.
//
// Anlass: die Dateien kommen als Amazon-Uploads, also 3000 Pixel im Quadrat
// und 2 bis 3 MB je Bild. Ein Listing mit sieben Bildern und sechs A+ Modulen
// waeren so 30 MB fuer eine Seite.
//
// Groessen:
//   Hauptbild eines Listings   1200 px, es steht gross
//   Bilder der Bildstrecke      700 px, sie stehen als Streifen daneben
//   Hauptbildvarianten          700 px, sie stehen in einer Reihe
//   A+ Module                  1400 px Breite, sie laufen ueber die Kachel
//
// Aufruf:
//   node scripts/case-arbeit-bilder.mjs <quellordner>
//
// Der Quellordner enthaelt je Marke einen Ordner mit den Unterordnern
// "Listing" und "A++", so wie der Kunde sie liefert. Die Zuordnung von Datei
// zu Rolle steht in PLAN: raten waere hier falsch, die Dateinamen der Marken
// folgen keinem gemeinsamen Muster.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const quelle = process.argv[2];
if (!quelle) {
  console.error("Aufruf: node scripts/case-arbeit-bilder.mjs <quellordner>");
  process.exit(1);
}

/**
 * Je Marke: welche Datei welche Rolle hat.
 *
 * `listing.haupt` ist das Bild, das im Suchergebnis steht. `listing.strecke`
 * sind die weiteren Bilder in ihrer Reihenfolge auf der Produktseite.
 * `varianten` sind Hauptbildvarianten desselben Produkts, aus denen der Kunde
 * nach Leistung auswaehlt. `aplus` sind die Module von oben nach unten.
 */
const PLAN = {
  bachgold: {
    ordner: "Bachgold",
    listing: {
      haupt: "Listing/Bachgold_WasserfilterXL_Schwarz_01A 2.jpg",
      strecke: [
        "Listing/Bachgold_WasserfilterXL_02.jpg",
        "Listing/Bachgold_WasserfilterXL_03.jpg",
        "Listing/Bachgold_WasserfilterXL_04A.jpg",
        "Listing/Bachgold_WasserfilterXL_05.jpg",
        "Listing/Bachgold_WasserfilterXL_06.jpg",
      ],
    },
    varianten: [
      "Listing/Bachgold_WasserfilterXL_Schwarz_01A 2.jpg",
      "Listing/Bachgold_WasserfilterXL_Schwarz_01C.jpg",
      "Listing/Bachgold_WasserfilterXL_Schwarz_01D.jpg",
    ],
    aplus: [
      "A++/Sektion1.jpg",
      "A++/Sektion2.jpg",
      "A++/Sektion3.jpg",
      "A++/Sektion4.jpg",
      "A++/Sektion5_1.jpg",
      "A++/Sektion5_4.jpg",
    ],
  },
  vitaworld: {
    ordner: "Vitaworld",
    listing: {
      haupt: "Listing/B0DPN5KD2P.MAIN.jpg",
      strecke: [
        "Listing/B0DPN5KD2P.PT01.jpg",
        "Listing/B0DPN5KD2P.PT02.jpg",
        "Listing/B0DPN5KD2P.PT03.jpg",
        "Listing/B0DPN5KD2P.PT04.jpg",
        "Listing/B0DPN5KD2P.PT05.jpg",
        "Listing/B0DPN5KD2P.PT06.jpg",
      ],
    },
    varianten: [],
    aplus: [
      "A++/1.jpg",
      "A++/2a.jpg",
      "A++/2b.jpg",
      "A++/2c.jpg",
      "A++/2d.jpg",
      "A++/3.jpg",
      "A++/5.jpg",
    ],
  },
};

const KANTE = { haupt: 1200, strecke: 700, variante: 700, aplus: 1400 };

async function schreibe(von, nach, kante) {
  await sharp(von).resize({ width: kante, withoutEnlargement: true }).webp({ quality: 82 }).toFile(nach);
  const kb = Math.round(fs.statSync(nach).size / 1024);
  console.log(`  ${path.basename(nach).padEnd(20)} ${kb} kB`);
}

let gesamt = 0;
for (const [slug, plan] of Object.entries(PLAN)) {
  const von = path.join(quelle, plan.ordner);
  if (!fs.existsSync(von)) {
    console.log(`${slug}: ${von} fehlt, uebersprungen`);
    continue;
  }
  const ziel = path.join("public/case_studies", slug);
  fs.mkdirSync(ziel, { recursive: true });
  console.log(`\n${slug}`);

  await schreibe(path.join(von, plan.listing.haupt), path.join(ziel, "l-haupt.webp"), KANTE.haupt);
  for (let i = 0; i < plan.listing.strecke.length; i++) {
    await schreibe(path.join(von, plan.listing.strecke[i]), path.join(ziel, `l-${i + 1}.webp`), KANTE.strecke);
  }
  for (let i = 0; i < plan.varianten.length; i++) {
    await schreibe(path.join(von, plan.varianten[i]), path.join(ziel, `haupt-${i + 1}.webp`), KANTE.variante);
  }
  for (let i = 0; i < plan.aplus.length; i++) {
    await schreibe(path.join(von, plan.aplus[i]), path.join(ziel, `aplus-${i + 1}.webp`), KANTE.aplus);
  }

  const summe = fs
    .readdirSync(ziel)
    .reduce((s, f) => s + fs.statSync(path.join(ziel, f)).size, 0);
  gesamt += summe;
  console.log(`  = ${Math.round(summe / 1024)} kB`);
}
console.log(`\nzusammen ${Math.round(gesamt / 1024)} kB`);
