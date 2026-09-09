# Blog-Thumbnails (Cover-Bilder)

Jeder Blogartikel hat ein Cover. Aktuell rendert die Website automatisch ein
einheitliches, markengerechtes SVG-Cover (Kategorie-Akzentfarbe + Icon), siehe
`src/components/blog/BlogCover.tsx`. Dadurch gibt es nie einen Stilbruch, auch
ohne generierte Bilder.

## Echte (KI-)Thumbnails einsetzen

1. Prompts liegen fertig in `content/thumbnail-prompts.json` (ein Eintrag je
   Artikel, alle im selben Premium-Stil, Format 16:9). Neu erzeugen mit:
   `node scripts/gen-thumbnail-prompts.mjs`
2. Bilder generieren und als `public/blog/covers/<slug>.jpg` (oder .webp/.png)
   ablegen, exakt der `filename` aus der JSON:
   `OPENAI_API_KEY=... node scripts/gen-thumbnails-openai.mjs`
   Zum Antesten einzelne Slugs: `ONLY=slug1,slug2 node scripts/gen-thumbnails-openai.mjs`
3. Fertig: `src/lib/blog.ts` erkennt vorhandene Cover automatisch und zeigt sie
   statt des SVG-Covers an. Kein Code-Change nötig.

Die Generierung läuft über die OpenAI Image API und funktioniert auch in der
Cloud-Session, der Proxy wird im Script berücksichtigt. 82 Cover sind ein
kostenpflichtiger Durchlauf, deshalb vorher ein paar Slugs mit `ONLY` prüfen.

Für die Bilder der Website selbst gilt ein eigenes Script,
`scripts/gen-bilder-openai.mjs`, siehe `copy/bildbriefing.md`.
