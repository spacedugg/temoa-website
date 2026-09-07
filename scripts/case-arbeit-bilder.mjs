// Rechnet die vom Kunden gelieferte Arbeit je Case Study auf Anzeigegroesse
// herunter und schreibt sie als WebP nach public/case_studies/<slug>/.
//
// Anlass: die Dateien kommen als Amazon-Uploads, also 2000 bis 3000 Pixel je
// Kante und 2 bis 9 MB je Bild. Ein Fall mit drei Produkten waeren so 70 MB
// fuer eine Seite.
//
// Groessen:
//   Hauptbild eines Listings   1200 px, es steht gross
//   Bilder der Bildstrecke      700 px, sie stehen als Streifen daneben
//   Hauptbildvarianten          700 px, sie stehen in einer Reihe
//   A+ Module                  1400 px Breite, sie laufen ueber die Kachel
//   A+ als ganze Seite         1000 px Breite, sie steht in einer Spalte
//
// Aufruf:
//   node scripts/case-arbeit-bilder.mjs <quellordner>
//
// Der Quellordner enthaelt je Marke einen Ordner, so wie der Kunde ihn
// liefert. Die Zuordnung von Datei zu Rolle steht in PLAN: raten waere hier
// falsch, die Dateinamen folgen bei jeder Marke einem anderen Muster.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const quelle = process.argv[2];
if (!quelle) {
  console.error("Aufruf: node scripts/case-arbeit-bilder.mjs <quellordner>");
  process.exit(1);
}

/**
 * Je Marke eine Liste von Produkten.
 *
 * `haupt` ist das Bild, das im Suchergebnis steht. `strecke` sind die weiteren
 * Bilder in ihrer Reihenfolge auf der Produktseite. `varianten` sind weitere
 * Fassungen des Hauptbilds, aus denen der Kunde nach Klickrate auswaehlt.
 * `aplusModule` sind einzelne liegende Bahnen, `aplusSeite` ist die ganze
 * A+ Seite als ein Bild. Beides gibt es, weil der Kunde beides liefert.
 */
const PLAN = {
  bachgold: {
    ordner: "Bachgold",
    produkte: [
      {
        id: "p1",
        haupt: "Listing/Bachgold_WasserfilterXL_Schwarz_01A 2.jpg",
        strecke: [
          "Listing/Bachgold_WasserfilterXL_02.jpg",
          "Listing/Bachgold_WasserfilterXL_03.jpg",
          "Listing/Bachgold_WasserfilterXL_04A.jpg",
          "Listing/Bachgold_WasserfilterXL_05.jpg",
          "Listing/Bachgold_WasserfilterXL_06.jpg",
        ],
        varianten: [
          "Listing/Bachgold_WasserfilterXL_Schwarz_01A 2.jpg",
          "Listing/Bachgold_WasserfilterXL_Schwarz_01C.jpg",
          "Listing/Bachgold_WasserfilterXL_Schwarz_01D.jpg",
        ],
        aplusModule: [
          "A++/Sektion1.jpg",
          "A++/Sektion2.jpg",
          "A++/Sektion3.jpg",
          "A++/Sektion4.jpg",
          "A++/Sektion5_1.jpg",
          "A++/Sektion5_4.jpg",
        ],
      },
    ],
  },
  vitaworld: {
    ordner: "Vitaworld",
    produkte: [
      {
        id: "p1",
        haupt: "Listing/B0DPN5KD2P.MAIN.jpg",
        strecke: [
          "Listing/B0DPN5KD2P.PT01.jpg",
          "Listing/B0DPN5KD2P.PT02.jpg",
          "Listing/B0DPN5KD2P.PT03.jpg",
          "Listing/B0DPN5KD2P.PT04.jpg",
          "Listing/B0DPN5KD2P.PT05.jpg",
          "Listing/B0DPN5KD2P.PT06.jpg",
        ],
        /* 2a bis 2d sind vier Fassungen desselben Moduls, dieselbe Aufnahme
           mit einer anderen Aussage. In die Reihe gehoert eine davon. */
        aplusModule: ["A++/1.jpg", "A++/2a.jpg", "A++/3.jpg", "A++/5.jpg"],
      },
    ],
  },
  miganeo: {
    ordner: "",
    produkte: [
      {
        id: "p1",
        haupt: "Miganeo Trampolin/Komplett-Trampolin/AMZ Listing Images/Miganeo_Trampolin_01A 07.59.39.jpg",
        strecke: [2, 3, 4, 5, 6, 7].map(
          (n) =>
            `Miganeo Trampolin/Komplett-Trampolin/AMZ Listing Images/Miganeo_Trampolin_0${n} 07.59.${
              n === 4 || n === 6 ? "54" : "39"
            }.jpg`,
        ),
        varianten: [
          "Miganeo Trampolin/Komplett-Trampolin/AMZ Listing Images/Miganeo_Trampolin_01A 07.59.39.jpg",
          "Miganeo Trampolin/Komplett-Trampolin/AMZ Listing Images/Miganeo_Trampolin_01B 07.59.39.jpg",
        ],
        aplusSeite: "Miganeo Trampolin/Komplett-Trampolin/AMZ A+ Premium /Miganeo_Trampolin_A+_Desktop_Preview.jpg",
      },
      {
        id: "p2",
        haupt: "Miganeo Elektromotor/Elektromotoren/AMZ Listing Images/Miganeo_TRS32_01.jpg",
        strecke: [2, 3, 4, 5, 6, 7].map(
          (n) => `Miganeo Elektromotor/Elektromotoren/AMZ Listing Images/Miganeo_TRS32_0${n}.jpg`,
        ),
        varianten: [
          "Miganeo Elektromotor/Elektromotoren/AMZ Listing Images/Miganeo_TRS32_01.jpg",
          "Miganeo Elektromotor/Elektromotoren/AMZ Listing Images/Miganeo_TRS32_01A.jpg",
        ],
        aplusSeite: "Miganeo Elektromotor/Elektromotoren/Miganeo_Bootsmotoren_A+ Desktop_Preview.jpg",
      },
      {
        id: "p3",
        haupt: "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_01A.jpg",
        /* 03 fehlt im Grundsatz, dafuer liegt 244_03 daneben: dasselbe Modul
           fuer die 244er Groesse. Es steht an dieser Stelle. */
        strecke: [
          "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_02.jpg",
          "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_244_03.jpg",
          "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_04.jpg",
          "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_05.jpg",
          "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_06.jpg",
          "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_07.jpg",
        ],
        varianten: [
          "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_01A.jpg",
          "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_01B.jpg",
          "Miganeo Poolabdeckung/Miganeo_Solarfolie_schwarz_schwarz_rund_244_01.jpg",
        ],
        aplusSeite:
          "Miganeo Poolabdeckung A++/Miganeo_Solarfolie_schwarz_schwarz_rund_A+_desktop_preview.jpg",
      },
    ],
  },
};

const KANTE = { haupt: 1200, strecke: 700, variante: 700, modul: 1400, seite: 1000 };

async function schreibe(von, nach, kante) {
  await sharp(von).resize({ width: kante, withoutEnlargement: true }).webp({ quality: 82 }).toFile(nach);
  console.log(`  ${path.basename(nach).padEnd(20)} ${Math.round(fs.statSync(nach).size / 1024)} kB`);
}

let gesamt = 0;
for (const [slug, plan] of Object.entries(PLAN)) {
  const von = path.join(quelle, plan.ordner);
  if (!fs.existsSync(von)) {
    console.log(`${slug}: ${von} fehlt, uebersprungen`);
    continue;
  }
  const fehlend = plan.produkte
    .flatMap((p) => [p.haupt, ...p.strecke, ...(p.varianten ?? []), ...(p.aplusModule ?? []), p.aplusSeite])
    .filter(Boolean)
    .filter((f) => !fs.existsSync(path.join(von, f)));
  if (fehlend.length > 0) {
    console.log(`${slug}: uebersprungen, diese Dateien fehlen:`);
    fehlend.forEach((f) => console.log(`  ${f}`));
    continue;
  }

  const ziel = path.join("public/case_studies", slug);
  fs.mkdirSync(ziel, { recursive: true });
  console.log(`\n${slug}`);

  for (const p of plan.produkte) {
    await schreibe(path.join(von, p.haupt), path.join(ziel, `${p.id}-haupt.webp`), KANTE.haupt);
    for (let i = 0; i < p.strecke.length; i++) {
      await schreibe(path.join(von, p.strecke[i]), path.join(ziel, `${p.id}-${i + 1}.webp`), KANTE.strecke);
    }
    for (let i = 0; i < (p.varianten ?? []).length; i++) {
      await schreibe(path.join(von, p.varianten[i]), path.join(ziel, `${p.id}-var-${i + 1}.webp`), KANTE.variante);
    }
    for (let i = 0; i < (p.aplusModule ?? []).length; i++) {
      await schreibe(path.join(von, p.aplusModule[i]), path.join(ziel, `${p.id}-aplus-${i + 1}.webp`), KANTE.modul);
    }
    if (p.aplusSeite) {
      await schreibe(path.join(von, p.aplusSeite), path.join(ziel, `${p.id}-aplus.webp`), KANTE.seite);
    }
  }

  const summe = fs.readdirSync(ziel).reduce((s, f) => s + fs.statSync(path.join(ziel, f)).size, 0);
  gesamt += summe;
  console.log(`  = ${Math.round(summe / 1024)} kB`);
}
console.log(`\nzusammen ${Math.round(gesamt / 1024)} kB`);
