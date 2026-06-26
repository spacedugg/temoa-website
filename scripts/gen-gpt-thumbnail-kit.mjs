// Builds content/GPT-Thumbnails-Anleitung.md: a paste-ready kit for
// generating all 82 blog covers in ChatGPT in one consistent style.
import fs from "node:fs";
import path from "node:path";

const prompts = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/thumbnail-prompts.json"), "utf8"));

const STYLE = `Du bist Bildgenerator für eine Premium-Amazon-Marketing-Agentur (temoa). Erzeuge Cover-Bilder in EXAKT diesem, durchgehend gleichen Stil:
- Premium, abstrakte 3D-Editorial-Illustration, minimaler modern-SaaS-Look.
- Glänzendes Frosted-Glass und mattes Keramik, weiches Studiolicht, sanfte Tiefenschärfe, viel saubere Negativfläche, zentrierte, ruhige Komposition.
- NUR diese Markenfarben: Amazon-Orange #FF9900 bis Rot #FF3131 als Akzent-Verlauf, tiefes Navy #0A1E2B, Hellblau #EDF5FB, heller, klarer Hintergrund.
- KEIN Text, keine Buchstaben, keine Zahlen, keine Logos, keine Menschen, keine Markenzeichen.
- Format 16:9, hochwertig, edel, ruhig.
Halte den Stil über alle Bilder identisch. Pro Eintrag genau ein Bild.`;

const lines = prompts.map((p, i) => {
  const topic = p.prompt.match(/Topic "([^"]+)"|Topic der|"([^"]+)"/);
  // pull the readable topic + motif we already encoded
  const m = p.prompt.match(/illustrating the topic "([^"]+)"[^.]*\. Suggested visual motifs: ([^.]+)\./i);
  const topicText = m ? m[1] : p.slug;
  const motif = m ? m[2] : "";
  return `${String(i + 1).padStart(2, "0")}. Datei: ${p.filename}\n    Thema: ${topicText}\n    Motiv: ${motif}`;
}).join("\n\n");

const doc = `# Blog-Cover mit ChatGPT erzeugen (82 Stück, einheitlicher Stil)

So bekommst du alle Cover in einem Rutsch und im gleichen Look.

## Schritt 1: Stil einmal festlegen
Kopiere diesen Block einmal in einen neuen ChatGPT-Chat (Modell mit Bildgenerierung):

\`\`\`
${STYLE}
\`\`\`

## Schritt 2: Bilder anfordern
Schicke ChatGPT die Themen unten (am besten in 5er- bis 10er-Blöcken, damit der Stil stabil bleibt).
Bitte ChatGPT pro Eintrag um ein 16:9-Bild im oben definierten Stil.

## Schritt 3: Benennen und ablegen
Speichere jedes Bild EXAKT unter dem angegebenen Dateinamen und lege alle in den Ordner:
\`public/blog/covers/\`
Die Website erkennt die Cover automatisch und ersetzt das Platzhalter-Design. Kein Code nötig.

(Vollständige Einzel-Prompts liegen zusätzlich maschinenlesbar in \`content/thumbnail-prompts.json\`.)

---

## Die 82 Themen

${lines}
`;

fs.writeFileSync(path.join(process.cwd(), "content/GPT-Thumbnails-Anleitung.md"), doc);
console.log("wrote content/GPT-Thumbnails-Anleitung.md");
