// Lädt das fotorealistische Hero-Asset (Higgsfield-Generation) nach
// public/assets/img/hero-stage.webp. Aus der Remote-Umgebung heraus ist der
// Higgsfield-CDN (d8j0ntlcm91z4.cloudfront.net) per Netzwerk-Policy gesperrt —
// das Skript daher lokal ausführen oder den Host in den Egress-Einstellungen
// der Claude-Code-Umgebung freigeben:
//
//   node scripts/fetch-hero.mjs [<url>]
//
// Ohne Argument wird die unten hinterlegte ausgewählte Generation geladen.

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Higgsfield-Job: siehe docs/hero-asset.md
const DEFAULT_URL = process.env.HERO_URL ?? "";

const url = process.argv[2] || DEFAULT_URL;
if (!url) {
  console.error("Keine URL: node scripts/fetch-hero.mjs <rawUrl der Higgsfield-Generation>");
  process.exit(1);
}

const res = await fetch(url);
if (!res.ok) {
  console.error(`Download fehlgeschlagen: HTTP ${res.status}`);
  process.exit(1);
}
const buf = Buffer.from(await res.arrayBuffer());

const outDir = path.resolve("public/assets/img");
await mkdir(outDir, { recursive: true });
const out = path.join(outDir, "hero-stage.webp");
await writeFile(out, await sharp(buf).webp({ quality: 88 }).toBuffer());
console.log(`Gespeichert: ${out}`);
