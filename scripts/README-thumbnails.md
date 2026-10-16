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

## Motivbasierte Cover (aktueller Weg)

Die frueheren Prompts in `content/thumbnail-prompts.json` sind generisch. Besser
passt `content/blog-cover-motive.json`: ein gemeinsamer Stilblock (weiches 3D in
Navy und Orange auf hellem Grund, ohne Schrift, Szene mittig und kompakt, damit
der Zuschnitt auf 2:1 und 16:10 nichts abschneidet) plus ein Motiv je Beitrag.

    ONLY=acos-erklaert,negative-keywords,produkttitel-optimieren node scripts/gen-blog-covers.mjs
    node scripts/gen-blog-covers.mjs

Das Skript schreibt WebP (1400 Pixel breit) nach `public/blog/covers/<slug>.webp`
und legt die PNG-Originale in `blog-cover-originale/` ab (nicht im Repo).
Neuer Beitrag: Motiv in der JSON ergaenzen und das Skript erneut laufen lassen.
