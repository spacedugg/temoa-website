#!/usr/bin/env node
/* ============================================================
   Ein Bild mit weissem Grund freistellen.

     node scripts/weiss-freistellen.mjs <quelle> <ziel.png> [--schutz x,y,b,h ...]

   Die Sektionen dieser Website sind nie reinweiss. `.ground` laeuft von
   #ffffff nach #f6f9fd und traegt oben rechts einen orangen Lichtkern, genau
   dort, wo das Hero-Bild steht. Ein Bild mit weissem Grund steht darauf als
   Kasten. Die Regel lautet: entweder nahtlos auf dem Grund oder klar in
   einer Kachel.

   Weiss einfach global durchsichtig zu machen geht nicht: in diesen Bildern
   sind grosse Flaechen innen weiss, eine Produktseite, eine Verpackung, ein
   Kissen. Die waeren danach Loecher. Gefuellt wird deshalb vom Rand her:
   durchsichtig wird nur, was vom Bildrand aus ueber helle Pixel erreichbar
   ist.

   Zwei Schwellen, weil ein weicher Schatten langsam ins Weiss auslaeuft:
   HART sagt, was sicher Grund ist, WEICH, wie weit die Fuellung ueberhaupt
   laufen darf. Dazwischen steigt die Deckkraft an, damit der Schatten nicht
   an einer Kante abreisst.

   Dazu Schutzzonen. Manche Bilder haben weisse Flaechen, die ohne Kante an
   den Grund stossen: eine Kachel mit weissem Grund, deren Oberkante nur durch
   die Schrift darin zu erkennen ist. Gemessen liegt beides bei 254 bis 255,
   kein Schwellenwert der Welt trennt das. Die Fuellung laeuft dort hinein und
   reisst der Kachel den halben Grund heraus. `--schutz x,y,b,h` sperrt einen
   Bereich, in dem nicht gefuellt wird. Die Masse werden am Bild gemessen,
   nicht geschaetzt.
   ============================================================ */

import sharp from "sharp";

/** Ab hier gilt ein Pixel als Grund, Deckkraft null. */
const HART = 252;
/** Bis hierher laeuft die Fuellung, mit ansteigender Deckkraft. */
const WEICH = 236;

/** Trennt die beiden Dateinamen von den `--schutz x,y,b,h`. */
function aufruf(args) {
  const pfade = [];
  const zonen = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== "--schutz") {
      pfade.push(args[i]);
      continue;
    }
    const teile = (args[++i] ?? "").split(",").map(Number);
    if (teile.length !== 4 || teile.some((n) => !Number.isFinite(n))) {
      console.error(`--schutz braucht vier Zahlen: x,y,b,h (bekommen: ${args[i]})`);
      process.exit(1);
    }
    const [x, y, b, h] = teile;
    zonen.push({ x, y, bis_x: x + b, bis_y: y + h });
  }
  return { quelle: pfade[0], ziel: pfade[1], zonen };
}

async function main() {
  const { quelle, ziel, zonen } = aufruf(process.argv.slice(2));
  if (!quelle || !ziel) {
    console.error("Aufruf: node scripts/weiss-freistellen.mjs <quelle> <ziel.png> [--schutz x,y,b,h ...]");
    process.exit(1);
  }

  const { data, info } = await sharp(quelle)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: b, height: h, channels: k } = info;
  const anzahl = b * h;

  /* Wie hell ist der dunkelste Kanal? Ein warmer Schatten ist im Blau am
     dunkelsten, ein blauer im Rot. Das Minimum faengt beides. */
  const hell = new Uint8Array(anzahl);
  for (let i = 0; i < anzahl; i++) {
    const p = i * k;
    hell[i] = Math.min(data[p], data[p + 1], data[p + 2]);
  }

  /* Fuellung vom Rand. Eine Schlange statt Rekursion: bei einer Million
     Pixeln laeuft der Aufrufstapel sonst ueber. */
  const grund = new Uint8Array(anzahl);
  const schlange = new Int32Array(anzahl);
  let kopf = 0;
  let ende = 0;

  /* Die Schutzzonen einmal als Karte, statt bei jedem Pixel durch die Liste
     zu laufen. Bei einer Million Pixeln und vier Nachbarn je Pixel macht das
     den Unterschied zwischen Sekunden und Minuten. */
  const gesperrt = new Uint8Array(anzahl);
  for (const z of zonen) {
    for (let y = Math.max(0, z.y); y < Math.min(h, z.bis_y); y++) {
      for (let x = Math.max(0, z.x); x < Math.min(b, z.bis_x); x++) {
        gesperrt[y * b + x] = 1;
      }
    }
  }

  const setzen = (i) => {
    if (grund[i] || gesperrt[i] || hell[i] < WEICH) return;
    grund[i] = 1;
    schlange[ende++] = i;
  };

  for (let x = 0; x < b; x++) {
    setzen(x);
    setzen((h - 1) * b + x);
  }
  for (let y = 0; y < h; y++) {
    setzen(y * b);
    setzen(y * b + b - 1);
  }

  while (kopf < ende) {
    const i = schlange[kopf++];
    const x = i % b;
    const y = (i - x) / b;
    if (x > 0) setzen(i - 1);
    if (x < b - 1) setzen(i + 1);
    if (y > 0) setzen(i - b);
    if (y < h - 1) setzen(i + b);
  }

  let weg = 0;
  for (let i = 0; i < anzahl; i++) {
    if (!grund[i]) continue;
    const v = hell[i];
    /* Zwischen WEICH und HART steigt die Deckkraft linear an. Darueber ist
       der Pixel Grund und faellt ganz weg. */
    const a = v >= HART ? 0 : Math.round(((HART - v) / (HART - WEICH)) * 255);
    data[i * k + 3] = a;
    if (a === 0) weg++;
  }

  await sharp(data, { raw: { width: b, height: h, channels: k } })
    .png({ compressionLevel: 9 })
    .toFile(ziel);

  console.log(`${quelle} -> ${ziel}`);
  console.log(`${b} x ${h}, ${((weg / anzahl) * 100).toFixed(1)} % des Bildes sind jetzt durchsichtig.`);
  if (zonen.length) {
    console.log(`${zonen.length} Schutzzone(n) blieben unangetastet.`);
  }
}

main();
