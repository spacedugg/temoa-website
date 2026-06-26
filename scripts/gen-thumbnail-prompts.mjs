// Builds content/thumbnail-prompts.json: one consistent, on-brand image
// prompt per blog article. Run: node scripts/gen-thumbnail-prompts.mjs
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content/blog");

// Shared style preamble — keeps every cover in one premium, on-brand look.
const STYLE =
  "Premium abstract 3D editorial illustration for a high-end Amazon-marketing agency. " +
  "Minimal modern-SaaS aesthetic: glossy frosted-glass and matte ceramic shapes, soft studio lighting, " +
  "gentle depth of field, lots of clean negative space, centered balanced composition. " +
  "Strict brand palette only: Amazon orange #FF9900 to red #FF3131 gradient accents, deep navy #0A1E2B, " +
  "light blue #EDF5FB, on a clean light background. No text, no letters, no numbers, no logos, no people, no brand marks. " +
  "Elegant, calm, expensive looking.";

const catMotif = {
  "Amazon PPC & Advertising": "an upward performance curve, floating glass dashboard cards, target rings",
  "Listing, SEO & Conversion": "a stylised product detail page, magnifier and rising bars, layered glass panels",
  "FBA, Logistik & Inventar": "neatly stacked glossy boxes, a conveyor arc, inventory cubes",
  "Marke schützen & Account-Management": "a glass shield, a checkmark seal, protective concentric rings",
  "Strategie & Geschäftsmodelle": "a chess-like strategy motif, a roadmap path, interlocking geometric blocks",
  "Operativ & Kundenservice": "a support headset abstracted into glass, a returns/refresh arrow loop",
  "KI & Zukunft": "a soft glowing neural orb, abstract search particles, futuristic gradient mesh",
  "Agentur & Zusammenarbeit": "two interlocking glass shapes forming a partnership, a handshake abstracted into geometry",
};

function val(front, key) {
  const line = front.split("\n").find((l) => l.trimStart().startsWith(`${key}:`));
  if (!line) return "";
  let v = line.slice(line.indexOf(":") + 1).trim();
  if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
  return v;
}

const out = [];
for (const file of fs.readdirSync(DIR).filter((f) => /^\d+_.*\.md$/.test(f))) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  const front = fm ? fm[1] : "";
  const title = val(front, "title");
  const kategorie = val(front, "kategorie");
  const kwMatch = val(front, "keywords").match(/\[(.*)\]/);
  let keywords = [];
  if (kwMatch) {
    try {
      keywords = JSON.parse(`[${kwMatch[1]}]`);
    } catch {}
  }
  const slug = file.replace(/^\d+_/, "").replace(/\.md$/, "");
  const motif = catMotif[kategorie] ?? "abstract geometric data shapes";
  const topic = title.split(":")[0];
  const prompt =
    `Cover illustrating the topic "${topic}" (${kategorie}). ` +
    `Suggested visual motifs: ${motif}. ` +
    STYLE;
  out.push({ slug, filename: `${slug}.jpg`, category: kategorie, aspect_ratio: "16:9", prompt });
}

out.sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(
  path.join(process.cwd(), "content/thumbnail-prompts.json"),
  JSON.stringify(out, null, 2) + "\n"
);
console.log(`Wrote ${out.length} prompts to content/thumbnail-prompts.json`);
