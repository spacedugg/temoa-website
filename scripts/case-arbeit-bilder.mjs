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
import { execFileSync } from "node:child_process";
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
 * `palette` sind Hauptbilder verschiedener Artikel derselben Marke, im selben
 * Bildstil. `video` ist das Listing-Video.
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
        /* Sechs weitere Artikel, alle im selben Hauptbildstil. */
        palette: [
          "B004V0328M.MAIN.jpg",
          "B004V032Z0.MAIN.jpg",
          "B0721Q6GFQ.MAIN.jpg",
          "B076CKSNFX.MAIN.jpg",
          "B07QC2FRVR.MAIN.jpg",
          "B08FQVPZN4.MAIN.jpg",
        ],
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
  futum: {
    ordner: "",
    produkte: [
      {
        /* Maulwurfskugeln steht vorn: dazu gibt es vier Hauptbildvarianten,
           und das ist die Aussage der Reihe. */
        id: "p1",
        haupt: "Maulwurfskugel Listing Bilder/Futum_Maulwurfskugeln_01A.jpg",
        strecke: [2, 3, 4, 5, 6, 7].map(
          (n) => `Maulwurfskugel Listing Bilder/Futum_Maulwurfskugeln_0${n}.jpg`,
        ),
        varianten: ["01A", "01B", "01C", "01D"].map(
          (v) => `Maulwurfskugel Listing Bilder/Futum_Maulwurfskugeln_${v}.jpg`,
        ),
        aplusModule: [
          "Maulwurfskugeln A++/Futum_Maulwurfskugeln_01 07.59.49.jpg",
          "Maulwurfskugeln A++/Futum_Maulwurfskugeln_02.jpg",
          "Maulwurfskugeln A++/Futum_Maulwurfskugeln_03_Regimen_A.jpg",
          "Maulwurfskugeln A++/Futum_Maulwurfskugeln_04.jpg",
          "Maulwurfskugeln A++/Futum_Maulwurfskugeln_05.jpg",
          "Maulwurfskugeln A++/Futum_Maulwurfskugeln_06.jpg",
        ],
      },
      {
        id: "p2",
        haupt: "Futum Wühlmaus/Wühlmausgranulat Listing/Futum_Wühlmausgranulat_01A.jpg",
        strecke: [2, 3, 4, 5, 6, 7].map(
          (n) => `Futum Wühlmaus/Wühlmausgranulat Listing/Futum_Wühlmausgranulat_0${n}.jpg`,
        ),
        varianten: ["01A", "01B"].map(
          (v) => `Futum Wühlmaus/Wühlmausgranulat Listing/Futum_Wühlmausgranulat_${v}.jpg`,
        ),
        aplusModule: [
          "Futum Wühlmaus/Wühlmaus A++/Futum_Wühlmausgranulat_A+_Premium_01.jpg",
          "Futum Wühlmaus/Wühlmaus A++/Futum_Wühlmausgranulat_A+_Premium_02.jpg",
          "Futum Wühlmaus/Wühlmaus A++/Futum_Wühlmausgranulat_A+_Premium_03_Slide1.jpg",
          "Futum Wühlmaus/Wühlmaus A++/Futum_Wühlmausgranulat_A+_Premium_04.jpg",
          "Futum Wühlmaus/Wühlmaus A++/Futum_Wühlmausgranulat_A+_Premium_05.jpg",
          "Futum Wühlmaus/Wühlmaus A++/Futum_Wühlmausgranulat_A+_Premium_06.jpg",
        ],
      },
      {
        id: "p3",
        haupt: "Futum Spot on/Spot On Hund Listing/Futum Dog - 1 v2.jpg",
        strecke: ["02", "03", "04 2", "05", "06 2", "07"].map(
          (n) => `Futum Spot on/Spot On Hund Listing/Futum_Hund_${n}.jpg`,
        ),
        varianten: [
          "Futum Spot on/Spot On Hund Listing/Futum Dog - 1 v2.jpg",
          "Futum Spot on/Spot On Hund Listing/Futum Dog - 1 v3.jpg",
        ],
        aplusModule: ["01 2", "02 2", "03A", "04 2", "05 2", "06 2"].map(
          (n) => `Futum Spot on/Spot on Hund A++/Futum_Hund_${n}.jpg`,
        ),
        video: "Futum Spot On Dog-2_compressed.mp4",
      },
      {
        /* Silberfischspray hat keinen A+ Content in der Lieferung. */
        id: "p4",
        haupt: "Futum Silberfisch/Silberfischspray Listing/Futum_Silberfischspray_01.jpg",
        strecke: [2, 3, 4, 5, 6, 7].map(
          (n) => `Futum Silberfisch/Silberfischspray Listing/Futum_Silberfischspray_0${n}.jpg`,
        ),
        varianten: ["01", "01A"].map(
          (v) => `Futum Silberfisch/Silberfischspray Listing/Futum_Silberfischspray_${v}.jpg`,
        ),
      },
    ],
  },
  haa: {
    ordner: "",
    produkte: [
      {
        /* Ein Produkt, aber sechs Hauptbilder: eines je Bundle-Groesse. Genau
           das ist hier die Aussage, derselbe Bildstil laeuft ueber die ganze
           Staffelung. */
        id: "p1",
        haupt: "haa/Listing/HaA_Bioethanol_01B.jpg",
        strecke: [2, 3, 4, 5, 6, 7, 8].map((n) => `haa/Listing/HaA_Bioethanol_0${n}.jpg`),
        varianten: [
          "haa/Listing/HaA_Bioethanol_01B.jpg",
          "haa/Listing/HaA_Bioethanol 2er Set_01B.jpg",
          "haa/Listing/HaA_Bioethanol 3er Set_01B.jpg",
          "haa/Listing/HaA_Bioethanol 6er Set_01B.jpg",
          "haa/Listing/HaA_Bioethanol 12er Set_01B.jpg",
          "haa/Listing/HaA_Bioethanol 30er Set_01B.jpg",
        ],
        aplusSeite: "haa/A++ Haa.jpg",
        video: "Haa Video.mp4",
      },
    ],
  },
};

/*
 * Anzeigegroessen. Die Kante ist rund das Doppelte der Anzeigebreite, damit
 * die Bilder auf Bildschirmen mit hoher Pixeldichte scharf bleiben.
 *
 * Hauptbild, Bildstrecke und Varianten lassen sich anklicken und gehen in der
 * Lupe bis auf Bildschirmhoehe auf, deshalb brauchen sie mehr. A+ Module und
 * A+ Seiten stehen nur in ihrer Spalte von rund 430 Pixeln: 1400 waeren dort
 * das Dreifache der Anzeigegroesse und damit verschenkt.
 */
const KANTE = { haupt: 1200, strecke: 700, variante: 700, modul: 900, seite: 900 };

/*
 * `effort: 6` ist die langsamste und beste Stufe von WebP, `smartSubsample`
 * haelt harte Farbkanten in Grafiken sauber. Zusammen bringt das gegenueber
 * den Voreinstellungen rund ein Viertel weniger Bytes bei gleicher Qualitaet.
 */
const WEBP = { quality: 80, effort: 6, smartSubsample: true };

/** macOS legt Umlaute zerlegt ab (NFD), Node liest sie so aus dem Zip. Ein
 *  Pfad mit „Wühlmaus" aus dieser Datei (NFC) findet die Datei dann nicht.
 *  Deshalb wird jeder Pfadteil ueber den Ordnerinhalt aufgeloest. */
function loese(basis, rel) {
  let ort = basis;
  for (const teil of rel.split("/")) {
    if (fs.existsSync(path.join(ort, teil))) {
      ort = path.join(ort, teil);
      continue;
    }
    const treffer = fs
      .readdirSync(ort)
      .find((f) => f.normalize("NFC") === teil.normalize("NFC"));
    if (!treffer) return null;
    ort = path.join(ort, treffer);
  }
  return ort;
}

async function schreibe(von, nach, kante) {
  await sharp(von).resize({ width: kante, withoutEnlargement: true }).webp(WEBP).toFile(nach);
  console.log(`  ${path.basename(nach).padEnd(20)} ${Math.round(fs.statSync(nach).size / 1024)} kB`);
}

/**
 * Video auf Anzeigegroesse rechnen und ein Standbild dazu.
 *
 * 1280 Pixel breit, H.264 mit CRF 27: das ist rund das Dreifache der
 * Anzeigebreite und reicht auch auf einem grossen Bildschirm. `+faststart`
 * legt den Index an den Anfang, damit die Wiedergabe startet, bevor die Datei
 * vollstaendig geladen ist.
 *
 * Das Standbild ist wichtiger als die Kompression: mit `poster` und
 * `preload="none"` laedt die Seite vom Video kein Byte, bis jemand auf
 * Abspielen drueckt.
 */
function video(von, nach, poster) {
  const ruf = (befehl) => execFileSync("ffmpeg", befehl, { stdio: ["ignore", "ignore", "pipe"] });
  ruf(["-y", "-i", von, "-vf", "scale=1280:-2", "-c:v", "libx264", "-profile:v", "high",
       "-crf", "27", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
       "-c:a", "aac", "-b:a", "96k", "-ac", "2", nach]);
  ruf(["-y", "-i", von, "-ss", "1", "-frames:v", "1", "-vf", "scale=1280:-2", poster]);
  for (const f of [nach, poster]) {
    console.log(`  ${path.basename(f).padEnd(20)} ${Math.round(fs.statSync(f).size / 1024)} kB`);
  }
}

let gesamt = 0;
for (const [slug, plan] of Object.entries(PLAN)) {
  const von = path.join(quelle, plan.ordner);
  if (!fs.existsSync(von)) {
    console.log(`${slug}: ${von} fehlt, uebersprungen`);
    continue;
  }
  const fehlend = plan.produkte
    .flatMap((p) => [p.haupt, ...p.strecke, ...(p.varianten ?? []), ...(p.palette ?? []),
                     ...(p.aplusModule ?? []), p.aplusSeite, p.video])
    .filter(Boolean)
    .filter((f) => !loese(von, f));
  if (fehlend.length > 0) {
    console.log(`${slug}: uebersprungen, diese Dateien fehlen:`);
    fehlend.forEach((f) => console.log(`  ${f}`));
    continue;
  }

  const ziel = path.join("public/case_studies", slug);
  fs.mkdirSync(ziel, { recursive: true });
  console.log(`\n${slug}`);

  for (const p of plan.produkte) {
    await schreibe(loese(von, p.haupt), path.join(ziel, `${p.id}-haupt.webp`), KANTE.haupt);
    for (let i = 0; i < p.strecke.length; i++) {
      await schreibe(loese(von, p.strecke[i]), path.join(ziel, `${p.id}-${i + 1}.webp`), KANTE.strecke);
    }
    for (let i = 0; i < (p.varianten ?? []).length; i++) {
      await schreibe(loese(von, p.varianten[i]), path.join(ziel, `${p.id}-var-${i + 1}.webp`), KANTE.variante);
    }
    for (let i = 0; i < (p.palette ?? []).length; i++) {
      await schreibe(loese(von, p.palette[i]), path.join(ziel, `${p.id}-pal-${i + 1}.webp`), KANTE.variante);
    }
    for (let i = 0; i < (p.aplusModule ?? []).length; i++) {
      await schreibe(loese(von, p.aplusModule[i]), path.join(ziel, `${p.id}-aplus-${i + 1}.webp`), KANTE.modul);
    }
    if (p.aplusSeite) {
      await schreibe(loese(von, p.aplusSeite), path.join(ziel, `${p.id}-aplus.webp`), KANTE.seite);
    }
    if (p.video) {
      video(
        loese(von, p.video),
        path.join(ziel, `${p.id}-video.mp4`),
        path.join(ziel, `${p.id}-video.webp`),
      );
    }
  }

  const summe = fs.readdirSync(ziel).reduce((s, f) => s + fs.statSync(path.join(ziel, f)).size, 0);
  gesamt += summe;
  console.log(`  = ${Math.round(summe / 1024)} kB`);
}
console.log(`\nzusammen ${Math.round(gesamt / 1024)} kB`);
