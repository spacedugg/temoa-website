#!/usr/bin/env node
/* ============================================================
   Das Hero-Bild der Startseite, in zwei Sprachen und zwei Groessen.

     node scripts/hero-bild.mjs <quelle-deutsch> <quelle-englisch>

   Das Bild ist das erste, was ein Besucher sieht, und damit das Element, an
   dem Google die Ladezeit der Seite misst. Deshalb drei Dinge:

   1. Zwei Sprachfassungen. Dasselbe Bild einmal mit deutscher und einmal mit
      englischer Beschriftung. Welche gezeigt wird, entscheidet die Sprache der
      Seite, nicht der Ort des Besuchers.
   2. Zwei Groessen je Sprache. Die Grafik steht am Rechner in einer Spalte von
      rund 544 Pixeln, auf dem Telefon in rund 340. Ein 1200 Pixel breites Bild
      auf ein Telefon zu schicken ist die Haelfte der Ladezeit fuer nichts.
   3. Zwei Formate je Groesse. AVIF liegt bei dieser Art Bild rund ein Drittel
      unter WebP, und was ein Browser nicht kann, laesst er einfach liegen.

   Die Beschriftung im Bild ist Schrift in einer Grafik, und Schrift ist das
   Erste, was eine zu starke Kompression zerlegt. Deshalb `smartSubsample` und
   nicht die niedrigste Stufe, die noch durchgeht.

   Die Masse schreibt das Skript nach `src/components/takt/hero-bild.ts`. Ohne
   `width` und `height` am Bild springt die Seite beim Laden, und ein von Hand
   gepflegtes Seitenverhaeltnis geht beim naechsten Bild schief.
   ============================================================ */

import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const ZIEL = resolve("public/bilder");
const MASSE = resolve("src/components/takt/hero-bild.ts");

/** Die Breite am Rechner, verdoppelt fuer feine Bildschirme. */
const GROSS = 1200;
/** Die Breite auf dem Telefon, verdoppelt. */
const KLEIN = 760;

const AUSGABEN = [
  { suffix: "", breite: GROSS },
  { suffix: "-klein", breite: KLEIN },
];

async function bytes(pfad) {
  return (await stat(pfad)).size;
}

function kb(n) {
  return `${(n / 1024).toFixed(0)} kB`;
}

async function fassung(quelle, kennung) {
  const bild = sharp(quelle);
  const roh = await bild.metadata();
  const gemacht = [];

  for (const { suffix, breite } of AUSGABEN) {
    const b = Math.min(breite, roh.width);
    const basis = sharp(quelle).resize({ width: b, withoutEnlargement: true, kernel: "lanczos3" });

    const webp = `${ZIEL}/h-listing${kennung}${suffix}.webp`;
    await basis.clone().webp({ quality: 84, effort: 6, smartSubsample: true }).toFile(webp);

    const avif = `${ZIEL}/h-listing${kennung}${suffix}.avif`;
    await basis.clone().avif({ quality: 62, effort: 6, chromaSubsampling: "4:4:4" }).toFile(avif);

    gemacht.push([webp, await bytes(webp)], [avif, await bytes(avif)]);
  }

  return { roh, gemacht };
}

async function main() {
  const [de, en] = process.argv.slice(2);
  if (!de || !en) {
    console.error("Aufruf: node scripts/hero-bild.mjs <quelle-deutsch> <quelle-englisch>");
    process.exit(1);
  }

  await mkdir(ZIEL, { recursive: true });

  const a = await fassung(de, "");
  const b = await fassung(en, "-en");

  /* Beide Fassungen sind dasselbe Bild in zwei Sprachen. Haben sie
     verschiedene Masse, stimmt an einer der beiden Quellen etwas nicht, und
     die Seite wuerde beim Umschalten springen. */
  if (a.roh.width !== b.roh.width || a.roh.height !== b.roh.height) {
    console.warn(
      `Achtung: die Quellen haben verschiedene Masse (${a.roh.width}x${a.roh.height} gegen ${b.roh.width}x${b.roh.height}).`
    );
  }

  const breite = Math.min(GROSS, a.roh.width);
  const hoehe = Math.round((a.roh.height / a.roh.width) * breite);

  await mkdir(dirname(MASSE), { recursive: true });
  await writeFile(
    MASSE,
    `/* Von scripts/hero-bild.mjs erzeugt. Nicht von Hand aendern. */\n` +
      `export const HERO_BILD = { breite: ${breite}, hoehe: ${hoehe} } as const;\n`,
    "utf8"
  );

  for (const [pfad, groesse] of [...a.gemacht, ...b.gemacht]) {
    console.log(`${pfad.replace(resolve("."), ".")}  ${kb(groesse)}`);
  }
  console.log(`\nMasse: ${breite} x ${hoehe}`);
}

main();
