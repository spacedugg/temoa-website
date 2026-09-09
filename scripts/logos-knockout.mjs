/**
 * Zwei der vierzehn Kundenlogos sind „Knockout": der Schriftzug steht weiss in
 * einer gefuellten farbigen Flaeche (Kijimea in einem Rechteck, Nicotinell in
 * einer Ellipse). Alle anderen sind dunkle Schriftzuege auf transparentem
 * Grund und werden auf der Website ueber `brightness-0 invert` zu weissen
 * Silhouetten.
 *
 * Bei den beiden Knockout-Dateien fuehrt dasselbe Rezept zu einem weissen
 * Klecks: die Flaeche wird weiss, und die weisse Schrift darin verschwindet.
 * Umgekehrt wird ein Ausschnitt daraus: die Helligkeit des Bildes wird zur
 * Deckkraft, alle Farbe faellt weg. Was hell war (die Schrift) bleibt stehen,
 * was dunkel war (die Flaeche) wird durchsichtig. Das Ergebnis ist ein weisser
 * Schriftzug wie bei den uebrigen zwoelf.
 *
 * Aufruf: node scripts/logos-knockout.mjs
 */
import sharp from "sharp";
import path from "node:path";

const ORDNER = "public/clients";

/* Ab welcher Helligkeit ein Pixel stehen bleibt und ab welcher er voll deckt.
   Je Datei verschieden: Kijimea ist weisse Schrift auf gleichmaessigem
   Dunkelblau und braucht nur eine grobe Trennung. Nicotinell hat einen weichen
   weissen Schein um die Ellipse; ohne die hoehere Schwelle bleibt daraus ein
   grauer Nebel stehen. */
const SCHWELLEN = {
  1: { unten: 150, oben: 232, nurVoll: false },
  2: { unten: 200, oben: 244, nurVoll: true },
};

async function weiss(nummer) {
  const { unten: UNTEN, oben: OBEN, nurVoll } = SCHWELLEN[nummer];
  const quelle = path.join(ORDNER, `${nummer}.webp`);
  const ziel = path.join(ORDNER, `${nummer}-weiss.webp`);

  const bild = sharp(quelle).ensureAlpha();
  const { width, height } = await bild.metadata();
  const roh = await bild.raw().toBuffer();

  const aus = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = roh[i * 4];
    const g = roh[i * 4 + 1];
    const b = roh[i * 4 + 2];
    const a = roh[i * 4 + 3];
    const hell = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let deckung = (hell - UNTEN) / (OBEN - UNTEN);
    deckung = Math.max(0, Math.min(1, deckung));
    /* Der weisse Schein um die Nicotinell-Ellipse ist hell, aber nur
       teilweise deckend; die Ellipse selbst und die Schrift darin sind voll
       deckend. Ueber die Deckkraft der Quelle faellt der Schein damit weg,
       ohne dass die Kanten der Schrift ausfransen. */
    if (nurVoll) {
      const voll = Math.max(0, Math.min(1, (a - 236) / (252 - 236)));
      deckung *= voll;
    }
    aus[i * 4] = 255;
    aus[i * 4 + 1] = 255;
    aus[i * 4 + 2] = 255;
    aus[i * 4 + 3] = Math.round(deckung * (a / 255) * 255);
  }

  const info = await sharp(aus, { raw: { width, height, channels: 4 } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(ziel);
  console.log(`${ziel}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} kB`);
}

for (const n of Object.keys(SCHWELLEN)) await weiss(Number(n));
