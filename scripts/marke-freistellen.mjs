/**
 * Ein Markenlogo freistellen, das als weisser Schriftzug auf einer gefuellten
 * farbigen Flaeche geliefert wird.
 *
 * Auf der Website liegen die Markenlogos direkt auf den Kacheln, nicht auf
 * einer weissen Flaeche: sie werden per Filter zu einer weissen Silhouette
 * (auf dunklem Grund) oder zu einer schwarzen (auf hellem). Dafuer muss die
 * Marke auf transparentem Grund liegen. Kommt sie als Weiss auf Blau, macht
 * derselbe Filter daraus einen Klecks: die Flaeche wird weiss und der
 * Schriftzug darin verschwindet.
 *
 * Umgekehrt wird ein Ausschnitt daraus: die Helligkeit wird zur Deckkraft,
 * alle Farbe faellt weg. Was hell war (der Schriftzug), bleibt stehen, was
 * dunkel war (die Flaeche), wird durchsichtig. Danach wird auf den Inhalt
 * beschnitten, sonst steht die Marke klein in der Mitte eines grossen
 * leeren Rechtecks und laesst sich nicht auf eine Hoehe skalieren.
 *
 * Dasselbe Rezept wie `scripts/logos-knockout.mjs` fuer zwei der vierzehn
 * Kundenlogos im Band der Startseite.
 *
 * Der haeufigere Fall ist der umgekehrte: ein schwarzer Schriftzug auf
 * weissem Grund, wie ihn jedes Logo-Paket enthaelt. Dafuer `--dunkel`. Dann
 * wird die Dunkelheit zur Deckkraft und uebrig bleibt der schwarze Zug. Ohne
 * das waere dieselbe Datei nach dem Filter eine weisse Flaeche, in der die
 * Marke verschwindet.
 *
 * Aufruf: node scripts/marke-freistellen.mjs <quelle> <ziel> [unten] [oben] [--dunkel]
 */
import sharp from "sharp";

const args = process.argv.slice(2);
const DUNKEL = args.includes("--dunkel");
const [quelle, ziel, u, o] = args.filter((a) => a !== "--dunkel");
if (!quelle || !ziel) {
  console.error("Aufruf: node scripts/marke-freistellen.mjs <quelle> <ziel> [unten] [oben] [--dunkel]");
  process.exit(1);
}
/* Bei `--dunkel` laeuft die Rampe andersherum: was unter OBEN liegt, wird
   deckend. Die Vorgabewerte spiegeln sich deshalb mit. */
const UNTEN = Number(u ?? (DUNKEL ? "20" : "170"));
const OBEN = Number(o ?? (DUNKEL ? "85" : "235"));

const bild = sharp(quelle).ensureAlpha();
const { width, height } = await bild.metadata();
const roh = await bild.raw().toBuffer();

const aus = Buffer.alloc(width * height * 4);
let x0 = width, y0 = height, x1 = -1, y1 = -1;

for (let i = 0; i < width * height; i++) {
  const r = roh[i * 4];
  const g = roh[i * 4 + 1];
  const b = roh[i * 4 + 2];
  const a = roh[i * 4 + 3];
  const hell = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const roh_deckung = DUNKEL ? (OBEN - hell) / (OBEN - UNTEN) : (hell - UNTEN) / (OBEN - UNTEN);
  const deckung = Math.max(0, Math.min(1, roh_deckung));
  const alpha = Math.round(deckung * (a / 255) * 255);
  const ton = DUNKEL ? 0 : 255;
  aus[i * 4] = ton;
  aus[i * 4 + 1] = ton;
  aus[i * 4 + 2] = ton;
  aus[i * 4 + 3] = alpha;
  if (alpha > 12) {
    const x = i % width;
    const y = (i - x) / width;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
}

/* Zwei Pixel Luft, damit die Kante beim Verkleinern nicht abgeschnitten wird. */
const rand = 2;
const links = Math.max(0, x0 - rand);
const oben = Math.max(0, y0 - rand);
const breite = Math.min(width, x1 + rand + 1) - links;
const hoehe = Math.min(height, y1 + rand + 1) - oben;

const info = await sharp(aus, { raw: { width, height, channels: 4 } })
  .extract({ left: links, top: oben, width: breite, height: hoehe })
  .resize({ width: 800, withoutEnlargement: true })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(ziel);

console.log(`${ziel}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} kB`);
