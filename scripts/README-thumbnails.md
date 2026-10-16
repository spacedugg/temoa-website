# Blog-Thumbnails

Alle 82 Artikel besitzen ein individuell generiertes Motiv unter `public/blog/covers/<slug>.webp`. Deutsch und Englisch verwenden dieselben Bilder.

- Bildfamilie: matte 3D-Illustrationen in Navy, Weiß und Orange auf hellem Grund.
- Format: 1400 × 788 Pixel, WebP; responsive Auslieferung über `next/image`.
- Prompts: `content/blog-cover-motive.json`, ein Motiv je Slug und ein gemeinsamer Stil.
- Motivalternativtexte: `content/blog-cover-alt.json`, Deutsch und Englisch.
- Artikelbilder laden priorisiert; Kartenbilder bei Bedarf. Social-Metadaten und Sitemap verwenden das Artikelmotiv.
- Vollständigkeit prüfen: `npm run build`, dann `python scripts/check-blog-seo.py`.

Bei einem neuen Beitrag Motiv, Bild und Alternativtexte ergänzen. Der SVG-Fallback in `BlogCover.tsx` bleibt für noch nicht bebilderte neue Artikel erhalten.

Die vorhandenen API-Skripte sind optionale ältere Werkzeuge. Die aktuelle Serie wurde mit der integrierten Bildgenerierung erstellt; ein erneuter API-Lauf ist für die fertigen Bilder nicht nötig. Vollständiges Briefing und Änderungsprotokoll: `docs/seo-themen-und-bilder-2026-10-16.md`.
