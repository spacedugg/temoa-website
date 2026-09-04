// Erzeugt die Website-Bilder aus content/bild-prompts.json ueber die OpenAI
// Image API (gpt-image-2). Ergebnis je Bild:
//   public/bilder/<kennung>.webp   wird ausgeliefert, rund 60 kB
//   bilder-original/<kennung>.png  Original aus der API, nicht im Deploy
//
// Aufruf:
//   node scripts/gen-bilder-openai.mjs                 alle aktiven Bilder
//   node scripts/gen-bilder-openai.mjs --only b-02-a   nur dieses Bild
//   node scripts/gen-bilder-openai.mjs --all           auch die inaktiven
//   node scripts/gen-bilder-openai.mjs --force         vorhandene Datei neu erzeugen
//
// Optionen ueber Umgebung: QUALITY=low|medium|high (Standard high),
// MODEL=gpt-image-2, N=1 (Varianten je Prompt).
//
// Voraussetzung: OPENAI_API_KEY in der Umgebung. Kantenlaengen muessen durch 16
// teilbar sein, das Seitenverhaeltnis zwischen 1:3 und 3:1 liegen.
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("OPENAI_API_KEY fehlt in der Umgebung.");
  process.exit(1);
}

const MODEL = process.env.MODEL || "gpt-image-2";
const QUALITY = process.env.QUALITY || "high";
const N = Number(process.env.N || 1);
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1]?.split(",") : null;
const withInactive = args.includes("--all");
const force = args.includes("--force");

const ROOT = process.cwd();
// Das WebP liegt unter public und wird ausgeliefert. Das PNG aus der API ist das
// Original fuer spaetere Nachbearbeitung und liegt bewusst ausserhalb von public,
// damit es nicht mitdeployt wird.
const OUT = path.join(ROOT, "public/bilder");
const ORIGINALE = path.join(ROOT, "bilder-original");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(ORIGINALE, { recursive: true });

// Node hat kein automatisches Proxy-Handling. In der Cloud-Session laeuft der
// Verkehr ueber den Agent-Proxy, deshalb der ProxyAgent samt CA-Bundle.
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
if (proxy) {
  const { ProxyAgent, setGlobalDispatcher } = await import("undici");
  const caPath = "/root/.ccr/ca-bundle.crt";
  const requestTls = fs.existsSync(caPath) ? { ca: fs.readFileSync(caPath) } : undefined;
  setGlobalDispatcher(new ProxyAgent({ uri: proxy, requestTls }));
  console.log("Proxy:", proxy);
}

const spec = JSON.parse(fs.readFileSync(path.join(ROOT, "content/bild-prompts.json"), "utf8"));
let bilder = spec.bilder.filter((b) => (withInactive ? true : b.aktiv !== false));
if (only) bilder = spec.bilder.filter((b) => only.includes(b.kennung));

if (!bilder.length) {
  console.error("Kein Bild ausgewaehlt. Kennungen:", spec.bilder.map((b) => b.kennung).join(", "));
  process.exit(1);
}

// Anteil der Bildbreite bzw. Hoehe, den der Gegenstand einnehmen soll. Die API
// setzt das Motiv oft klein in eine grosse weisse Flaeche. In einer Bildflaeche
// auf der Seite wirkt es dann verloren, deshalb wird nachgerahmt.
const FUELLUNG = Number(process.env.FUELLUNG || 0.84);

/**
 * Das Motiv neu rahmen: Ausschnitt aus dem Original so waehlen, dass der
 * Gegenstand die gewuenschte Fläche einnimmt, dann auf das Zielformat skalieren.
 *
 * Bewusst ohne kuenstliche Fuellfarbe. Der Studiogrund der API hat einen
 * weichen Verlauf, jede aufgefuellte Flaeche wuerde sich als Rahmen abzeichnen.
 * Weil hier nur geschnitten und skaliert wird, bleibt der Verlauf durchgehend.
 */
async function nachrahmen(sharp, rohdaten, breite, hoehe) {
  const original = sharp(rohdaten);
  const { width: ow, height: oh } = await original.metadata();

  // Die Kanten des Motivs ueber trim finden, ohne das Ergebnis zu verwenden:
  // die Versaetze verraten das umschliessende Rechteck im Original.
  const { info } = await sharp(rohdaten).trim({ threshold: 8 }).toBuffer({ resolveWithObject: true });
  const mx = -(info.trimOffsetLeft ?? 0);
  const my = -(info.trimOffsetTop ?? 0);
  const mw = info.width;
  const mh = info.height;

  // Ausschnitt im Zielseitenverhaeltnis, gross genug fuer die gewuenschte Fuellung.
  const seiten = breite / hoehe;
  let aw = Math.max(mw / FUELLUNG, (mh / FUELLUNG) * seiten);
  let ah = aw / seiten;
  // Nicht ueber das Original hinaus.
  const grenze = Math.min(ow / aw, oh / ah, 1);
  aw = Math.round(aw * grenze);
  ah = Math.round(ah * grenze);

  // Auf die Mitte des Motivs zentrieren und in das Original zurueckschieben.
  const links = Math.min(Math.max(Math.round(mx + mw / 2 - aw / 2), 0), ow - aw);
  const oben = Math.min(Math.max(Math.round(my + mh / 2 - ah / 2), 0), oh - ah);

  return sharp(rohdaten)
    .extract({ left: links, top: oben, width: aw, height: ah })
    .resize(breite, hoehe, { fit: "fill" })
    .toBuffer();
}

// Das PNG aus der API wiegt ueber zwei Megabyte. Fuer die Website entsteht
// daneben ein nachgerahmtes WebP, das die Seite tatsaechlich ausliefert. Das
// PNG bleibt unangetastet als Original liegen.
async function alsWebp(rohdaten, ziel, size, rahmen = true) {
  try {
    const sharp = (await import("sharp")).default;
    const [breite, hoehe] = size.split("x").map(Number);
    const gerahmt = rahmen
      ? await nachrahmen(sharp, rohdaten, breite, hoehe)
      : await sharp(rohdaten).resize(breite, hoehe, { fit: "cover" }).toBuffer();
    await sharp(gerahmt).webp({ quality: 82 }).toFile(ziel);
    const kb = Math.round(fs.statSync(ziel).size / 1024);
    return `${path.basename(ziel)} (${kb} kB)`;
  } catch (e) {
    console.warn(`  WebP uebersprungen: ${e.message}`);
    return null;
  }
}

function pruefeGroesse(size, kennung) {
  const m = /^(\d+)x(\d+)$/.exec(size || "");
  if (!m) throw new Error(`${kennung}: size "${size}" ist kein WIDTHxHEIGHT`);
  const [w, h] = [Number(m[1]), Number(m[2])];
  if (w % 16 || h % 16) throw new Error(`${kennung}: ${size} ist nicht durch 16 teilbar`);
  const r = w / h;
  if (r < 1 / 3 || r > 3) throw new Error(`${kennung}: Seitenverhaeltnis ${r.toFixed(2)} liegt ausserhalb 1:3 bis 3:1`);
  return size;
}

/** Stilblock zu einem Bild. `stil` wählt die Familie, Standard ist "objekt". */
function stilblock(bild) {
  if (spec.stilblocks) {
    const key = bild.stil || "objekt";
    const block = spec.stilblocks[key];
    if (!block) throw new Error(`${bild.kennung}: Stilblock "${key}" ist nicht definiert`);
    return block;
  }
  return spec.stilblock;
}

async function erzeuge(bild, versuch = 1) {
  const size = pruefeGroesse(bild.size, bild.kennung);
  const prompt = `${bild.prompt.trim()}\n\n${stilblock(bild).trim()}`;
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
      body: JSON.stringify({ model: MODEL, prompt, size, quality: QUALITY, n: N }),
    });
    if (!res.ok) {
      const text = await res.text();
      if ((res.status === 429 || res.status >= 500) && versuch <= 4) {
        await new Promise((r) => setTimeout(r, versuch * 4000));
        return erzeuge(bild, versuch + 1);
      }
      return `FEHLER ${bild.kennung} HTTP ${res.status} ${text.slice(0, 300)}`;
    }
    const json = await res.json();
    const dateien = [];
    for (const [i, eintrag] of json.data.entries()) {
      const basis = json.data.length > 1 ? `${bild.kennung}-${i + 1}` : bild.kennung;
      const rohdaten = Buffer.from(eintrag.b64_json, "base64");
      fs.writeFileSync(path.join(ORIGINALE, `${basis}.png`), rohdaten);
      dateien.push(`bilder-original/${basis}.png`);
      const webp = await alsWebp(rohdaten, path.join(OUT, `${basis}.webp`), size, bild.rahmen !== false);
      if (webp) dateien.push(`public/bilder/${webp}`);
    }
    return `fertig ${bild.kennung} (${size}) -> ${dateien.join(", ")}`;
  } catch (e) {
    if (versuch <= 4) {
      await new Promise((r) => setTimeout(r, versuch * 4000));
      return erzeuge(bild, versuch + 1);
    }
    return `ABBRUCH ${bild.kennung} ${e.message}`;
  }
}

// Nur neu rahmen: nimmt die vorhandenen Originale und schreibt die WebP-Dateien
// neu. Kostet nichts, weil die API nicht angefasst wird. Nuetzlich, wenn die
// Fuellung nicht passt: FUELLUNG=0.9 node scripts/gen-bilder-openai.mjs --nur-rahmen
if (args.includes("--nur-rahmen")) {
  const sharp = (await import("sharp")).default;
  for (const bild of bilder) {
    const original = path.join(ORIGINALE, `${bild.kennung}.png`);
    if (!fs.existsSync(original)) {
      console.log(`kein Original ${bild.kennung}`);
      continue;
    }
    const size = pruefeGroesse(bild.size, bild.kennung);
    const ziel = path.join(OUT, `${bild.kennung}.webp`);
    await alsWebp(fs.readFileSync(original), ziel, size, bild.rahmen !== false);
    console.log(`gerahmt ${bild.kennung} (Fuellung ${FUELLUNG}) -> ${Math.round(fs.statSync(ziel).size / 1024)} kB`);
  }
  process.exit(0);
}

console.log(`Modell ${MODEL}, Qualitaet ${QUALITY}, ${bilder.length} Auftrag/Auftraege`);
for (const bild of bilder) {
  const ziel = path.join(OUT, `${bild.kennung}.webp`);
  if (!force && N === 1 && fs.existsSync(ziel)) {
    console.log(`uebersprungen ${bild.kennung} (Datei liegt schon vor, --force erzwingt neu)`);
    continue;
  }
  console.log(await erzeuge(bild));
}
console.log("Durchlauf beendet.");
