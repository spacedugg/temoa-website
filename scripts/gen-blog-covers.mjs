// Erzeugt die Blog-Thumbnails ueber die OpenAI Image API und legt sie als
// WebP unter public/blog/covers/<slug>.webp ab. Die Website erkennt die Dateien
// selbst (src/lib/blog.ts, findCover), im Code aendert sich nichts.
//
// Quelle der Prompts: content/blog-cover-motive.json. Ein gemeinsamer Stilblock
// (`stil`) plus ein Motiv je Beitrag (`motive[slug]`). Schrift steht nie im Bild.
//
// Aufruf (OPENAI_API_KEY muss in dieser Umgebung stehen, nicht nur in Vercel):
//   ONLY=acos-erklaert,negative-keywords,produkttitel-optimieren node scripts/gen-blog-covers.mjs
//   node scripts/gen-blog-covers.mjs            (alle fehlenden)
//
// Optional: QUALITY=low|medium|high (Standard medium), MODEL (Standard
// gpt-image-2), CONC (Standard 3), FORCE=1 ueberschreibt vorhandene Cover.
// Die Originale (PNG, 1536x1024) landen in blog-cover-originale/, ausserhalb von
// public und nicht im Repo.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("OPENAI_API_KEY fehlt in der Umgebung.");
  process.exit(1);
}
const QUALITY = process.env.QUALITY || "medium";
const MODEL = process.env.MODEL || "gpt-image-2";
const CONC = Number(process.env.CONC || 3);
const FORCE = process.env.FORCE === "1";
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;

const COVERS = path.join(process.cwd(), "public/blog/covers");
const ORIG = path.join(process.cwd(), "blog-cover-originale");
fs.mkdirSync(COVERS, { recursive: true });
fs.mkdirSync(ORIG, { recursive: true });

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
if (proxy) {
  const { ProxyAgent, setGlobalDispatcher } = await import("undici");
  const caPath = "/root/.ccr/ca-bundle.crt";
  const requestTls = fs.existsSync(caPath) ? { ca: fs.readFileSync(caPath) } : undefined;
  setGlobalDispatcher(new ProxyAgent({ uri: proxy, requestTls }));
}

const daten = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/blog-cover-motive.json"), "utf8"));
let slugs = Object.keys(daten.motive);
if (ONLY) slugs = slugs.filter((s) => ONLY.includes(s));

async function erzeuge(slug, versuch = 1) {
  const ziel = path.join(COVERS, `${slug}.webp`);
  if (!FORCE && fs.existsSync(ziel)) return `skip ${slug}`;
  const prompt = `${daten.stil} Scene: ${daten.motive[slug]}`;
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
      body: JSON.stringify({ model: MODEL, prompt, size: "1536x1024", quality: QUALITY, n: 1 }),
    });
    if (!res.ok) {
      const t = await res.text();
      if ((res.status === 429 || res.status >= 500) && versuch <= 4) {
        await new Promise((r) => setTimeout(r, versuch * 4000));
        return erzeuge(slug, versuch + 1);
      }
      return `FAIL ${slug} ${res.status} ${t.slice(0, 160)}`;
    }
    const json = await res.json();
    const png = Buffer.from(json.data[0].b64_json, "base64");
    fs.writeFileSync(path.join(ORIG, `${slug}.png`), png);
    // 1400 Pixel Breite reichen: das Cover steht hoechstens in rund 700 Pixeln,
    // auf feinen Bildschirmen doppelt so breit.
    await sharp(png).resize({ width: 1400 }).webp({ quality: 78, effort: 6 }).toFile(ziel);
    return `ok   ${slug}`;
  } catch (e) {
    if (versuch <= 4) {
      await new Promise((r) => setTimeout(r, versuch * 4000));
      return erzeuge(slug, versuch + 1);
    }
    return `ERR  ${slug} ${e.message}`;
  }
}

let i = 0;
async function worker() {
  while (i < slugs.length) console.log(await erzeuge(slugs[i++]));
}
await Promise.all(Array.from({ length: CONC }, worker));
console.log("fertig");
