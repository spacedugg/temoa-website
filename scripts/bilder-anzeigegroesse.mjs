#!/usr/bin/env node
/* ============================================================
   Bilder auf ihre Anzeigegroesse rechnen.

     node scripts/bilder-anzeigegroesse.mjs          (rechnet)
     node scripts/bilder-anzeigegroesse.mjs --probe  (zeigt nur, was waere)

   Die Website liefert Bilder als einfache `img`-Elemente aus `public`, ohne
   Bildoptimierung dazwischen. Was in der Datei steht, laedt jeder Besucher,
   egal wie gross das Bild auf der Seite erscheint. Gemessen im Browser ueber
   alle Seiten und ueber 1440 wie 390 Pixel Breite stand da unter anderem:

     bilder/kemes/l-2.webp        700 Pixel Datei,  38 Pixel Anzeige
     case_studies/haa-logo.webp  1200 Pixel Datei, 240 Pixel Anzeige
     case_studies (Bildstrecke)   700 Pixel Datei, 121 Pixel Anzeige

   Das ist keine Frage der Kompressionsstufe. Ein Bild, das achtzehnmal so
   breit ist wie die Stelle, an der es steht, wird nicht dadurch klein, dass
   man die Qualitaet senkt; es wird nur schlechter.

   Zielbreite ist deshalb ueberall das Doppelte der groessten gemessenen
   Anzeigebreite: einfach fuer einen gewoehnlichen Bildschirm, doppelt fuer
   einen mit feiner Punktdichte. Nie mehr als die Datei hergibt.

   Zwei Faelle, und der Unterschied ist der Grund fuer dieses Skript:

   1. Ein Bild, das sich anklicken laesst (`Kachel` in `cases/CaseArbeit`,
      die Kacheln der Designbeispiele), wird in der Lupe bis zu 92 Prozent
      der Fensterbreite gross gezeigt. Die Datei bleibt deshalb, wie sie ist,
      und daneben entsteht eine kleine Fassung `-klein`. Auf der Seite steht
      die kleine, beim Klick laedt die grosse.
   2. Alles andere wird an Ort und Stelle gerechnet. A+ Bahnen, Markenfotos,
      Logos und die Illustrationen der Leistungsseiten lassen sich nicht
      oeffnen, ihre volle Groesse sieht also nie jemand.

   Die Zielbreiten stehen als Tabelle unten. Sie von Hand zu pflegen ist
   Absicht: eine Messung im Browser haengt an der Sektion, in der ein Bild
   gerade steht, und wer eine Sektion umbaut, gehoert an diese Tabelle
   erinnert. Der Messweg steht in der Geschichte des Repos.
   ============================================================ */

import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import sharp from "sharp";

const NUR_ZEIGEN = process.argv.includes("--probe");

/* Zielbreite in Pixeln, dazu ob das Bild anklickbar ist. Der erste passende
   Eintrag gewinnt, die Reihenfolge ist also nicht beliebig. */
const REGELN = [
  // --- Case Studies: die ausgelieferte Arbeit -------------------------------
  // Bildstrecke des Listings, 121 Pixel breit in zwei Spalten neben dem Hauptbild.
  { muster: /^case_studies\/[^/]+\/p\d+-\d+\.webp$/, ziel: 280, klick: true },
  // Hauptbild des Listings, 412 Pixel.
  { muster: /^case_studies\/[^/]+\/p\d+-haupt\.webp$/, ziel: 850, klick: true },
  // Hauptbildvarianten, 292 Pixel in zwei Spalten, 190 in drei.
  { muster: /^case_studies\/[^/]+\/p\d+-var-\d+\.webp$/, ziel: 620, klick: true },
  // Weitere Artikel derselben Marke, 190 Pixel in drei Spalten.
  { muster: /^case_studies\/[^/]+\/p\d+-pal-\d+\.webp$/, ziel: 400, klick: true },
  // A+ Bahnen, 473 Pixel, nicht anklickbar.
  { muster: /^case_studies\/[^/]+\/p\d+-aplus.*\.webp$/, ziel: 960 },
  // Standbild des Videos, so breit wie die Spalte.
  { muster: /^case_studies\/[^/]+\/p\d+-video.*\.(webp|jpg)$/, ziel: 960 },
  // Markenlogo, 240 Pixel im Kopf der Fallseite.
  { muster: /^case_studies\/[^/]+-logo\.webp$/, ziel: 500 },
  // Markenfoto, 600 Pixel.
  { muster: /^case_studies\/[^/]+\.webp$/, ziel: 1200 },

  // --- Designbeispiele -----------------------------------------------------
  // Das Miganeo-Listing traegt die Startseite und den Rueckfall der
  // Designbeispiele. Dort laesst es sich oeffnen.
  // Hauptbild 398 Pixel, die sechs weiteren 193, die A+ Module 450.
  { muster: /^bilder\/miganeo\/l-1\.webp$/, ziel: 820, klick: true },
  { muster: /^bilder\/miganeo\/l-\d+\.webp$/, ziel: 400, klick: true },
  { muster: /^bilder\/miganeo\/a-\d+\.webp$/, ziel: 920, klick: true },
  // Das Kemes-Listing steht im Nachbau der Produktseite auf der Seite
  // Produktbilder & SEO und laesst sich nicht oeffnen. Das Hauptbild ist dort
  // 163 Pixel breit, die sechs Bilder der Strecke 38.
  { muster: /^bilder\/kemes\/l-1\.webp$/, ziel: 340 },
  { muster: /^bilder\/kemes\/l-\d+\.webp$/, ziel: 200 },
  { muster: /^bilder\/futum\/a-\d+\.webp$/, ziel: 660 },
  { muster: /^bilder\/rainfactory\/bs-\d+\.webp$/, ziel: 680 },

  // --- Uebriges Bildmaterial ----------------------------------------------
  // Das Hero-Bild hat ein eigenes Skript (scripts/hero-bild.mjs).
  { muster: /^bilder\/h-listing/, ueberspringen: true },
  { muster: /^bilder\/s-international-kugel\.webp$/, ziel: 1350 },
  { muster: /^bilder\/s-[^/]+\.webp$/, ziel: 1200 },
  { muster: /^bilder\/n-[^/]+\.webp$/, ziel: 1050 },
  { muster: /^team\/(Main|clemens-frei)\.webp$/, ziel: 1200 },
  { muster: /^team\/[^/]+\.webp$/, ziel: 160 },
  { muster: /^clients\/[^/]+\.webp$/, ziel: 200 },
];

/* Fein genug fuer Schrift in Produktbildern, klein genug, dass sich das
   Rechnen lohnt. `smartSubsample` haelt harte Farbkanten zusammen, `effort`
   kostet nur Rechenzeit beim Erzeugen. */
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

function alle(dir, wurzel = dir, aus = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) alle(p, wurzel, aus);
    else if (/\.webp$/i.test(e.name) && !/-klein\.webp$/i.test(e.name))
      aus.push(p.slice(wurzel.length + 1));
  }
  return aus;
}

function regelFuer(rel) {
  return REGELN.find((r) => r.muster.test(rel));
}

function kb(n) {
  return (n / 1024).toFixed(0).padStart(5) + " kB";
}

async function main() {
  const wurzel = "public";
  const dateien = alle(wurzel).sort();
  let vorher = 0;
  let nachher = 0;
  let gerechnet = 0;
  let paare = 0;
  const ohneRegel = [];

  for (const rel of dateien) {
    const pfad = join(wurzel, rel);
    const alt = statSync(pfad).size;
    vorher += alt;

    const regel = regelFuer(rel);
    if (!regel || regel.ueberspringen) {
      nachher += alt;
      if (!regel) ohneRegel.push(rel);
      continue;
    }

    const m = await sharp(pfad).metadata();
    const breite = Math.min(regel.ziel, m.width);

    /* Anklickbar: die Datei bleibt, daneben entsteht die kleine Fassung.
       Passt die Datei ohnehin schon in die Zielbreite, gibt es nichts zu
       verkleinern, und eine zweite Datei waere nur Ballast. */
    if (regel.klick) {
      if (breite >= m.width) {
        nachher += alt;
        continue;
      }
      const ziel = join(dirname(pfad), basename(pfad, ".webp") + "-klein.webp");
      if (!NUR_ZEIGEN) {
        await sharp(pfad)
          .resize({ width: breite, withoutEnlargement: true, kernel: "lanczos3" })
          .webp(WEBP)
          .toFile(ziel);
      }
      const neu = NUR_ZEIGEN ? Math.round(alt * (breite / m.width) ** 2) : statSync(ziel).size;
      nachher += alt + neu;
      paare++;
      console.log(`Paar    ${kb(alt)} + ${kb(neu)}  ${m.width} -> ${breite}  ${rel}`);
      continue;
    }

    /* Nicht anklickbar: an Ort und Stelle rechnen. Ueber eine Zwischendatei,
       weil sharp nicht in dieselbe Datei schreiben kann, aus der es liest. */
    if (breite >= m.width) {
      nachher += alt;
      continue;
    }
    const zwischen = pfad + ".neu";
    let neu = Math.round(alt * (breite / m.width) ** 2);
    if (!NUR_ZEIGEN) {
      await sharp(pfad)
        .resize({ width: breite, withoutEnlargement: true, kernel: "lanczos3" })
        .webp(WEBP)
        .toFile(zwischen);
      neu = statSync(zwischen).size;
      /* Groesser als vorher kommt vor, wenn eine Datei schon knapp an ihrer
         Zielbreite liegt. Dann bleibt die alte. */
      if (neu < alt) renameSync(zwischen, pfad);
      else {
        unlinkSync(zwischen);
        neu = alt;
      }
    }
    nachher += neu;
    if (neu !== alt) {
      gerechnet++;
      console.log(`Ersetzt ${kb(alt)} -> ${kb(neu)}  ${m.width} -> ${breite}  ${rel}`);
    }
  }

  if (ohneRegel.length) {
    console.log(`\nOhne Regel, unveraendert (${ohneRegel.length}):`);
    for (const r of ohneRegel) console.log("  " + r);
  }
  console.log(
    `\n${gerechnet} Dateien gerechnet, ${paare} kleine Fassungen dazu.` +
      `\nAuf der Platte: ${(vorher / 1048576).toFixed(2)} MB -> ${(nachher / 1048576).toFixed(2)} MB`
  );
}

main();
