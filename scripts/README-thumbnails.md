# Blog-Thumbnails (Cover-Bilder)

Jeder Blogartikel hat ein Cover. Aktuell rendert die Website automatisch ein
einheitliches, markengerechtes SVG-Cover (Kategorie-Akzentfarbe + Icon), siehe
`src/components/blog/BlogCover.tsx`. Dadurch gibt es nie einen Stilbruch, auch
ohne generierte Bilder.

## Echte (KI-)Thumbnails einsetzen

1. Prompts liegen fertig in `content/thumbnail-prompts.json` (ein Eintrag je
   Artikel, alle im selben Premium-Stil, Format 16:9). Neu erzeugen mit:
   `node scripts/gen-thumbnail-prompts.mjs`
2. Bilder generieren (Higgsfield / Pletor / ChatGPT) und als
   `public/blog/covers/<slug>.jpg` (oder .webp/.png) ablegen, exakt der
   `filename` aus der JSON.
3. Fertig: `src/lib/blog.ts` erkennt vorhandene Cover automatisch und zeigt sie
   statt des SVG-Covers an. Kein Code-Change nötig.

Hinweis: Die KI-Bildgenerierung war in der Cloud-Session nicht möglich, weil das
Bild-Tool (Pletor) eine erneute Anmeldung verlangte. Sobald das Tool wieder
autorisiert ist, lassen sich alle 82 Cover aus der Prompt-Liste erzeugen.
