// Lädt ein generiertes Higgsfield-Asset in einen 3D-Slot des Repos:
//
//   node scripts/fetch-asset.mjs <rawUrl> <slot>
//
// Slots: hero-stage, stage-steps, shape-square, shape-circle, shape-u,
// shape-hexagon  →  public/assets/img/3d/<slot>.webp
//
// Aus der Remote-Umgebung heraus muss der Higgsfield-CDN
// (d8j0ntlcm91z4.cloudfront.net) in den Netzwerk-Einstellungen der
// Claude-Code-Umgebung freigegeben sein; Job-URLs siehe docs/hero-asset.md.

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [url, slot] = process.argv.slice(2);
const SLOTS = ["hero-stage", "stage-steps", "shape-square", "shape-circle", "shape-u", "shape-hexagon"];
if (!url || !SLOTS.includes(slot)) {
  console.error(`Aufruf: node scripts/fetch-asset.mjs <rawUrl> <${SLOTS.join("|")}>`);
  process.exit(1);
}

const res = await fetch(url);
if (!res.ok) {
  console.error(`Download fehlgeschlagen: HTTP ${res.status}`);
  process.exit(1);
}
const buf = Buffer.from(await res.arrayBuffer());

const outDir = path.resolve("public/assets/img/3d");
await mkdir(outDir, { recursive: true });
const out = path.join(outDir, `${slot}.webp`);
await writeFile(out, await sharp(buf).webp({ quality: 88 }).toBuffer());
console.log(`Gespeichert: ${out}`);
