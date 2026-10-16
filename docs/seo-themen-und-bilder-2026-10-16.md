# SEO, Themenstruktur und Blogbilder

Auftrag: SEO-Masterprompt Version 1.3 anwenden, Ratgeber nach Kundenfragen strukturieren, Themen direkt in der Fußzeile zugänglich machen und jeden Artikel mit einem individuellen Thumbnail versehen.

## Verbindliche Zielgruppenkorrektur und Kontaktwege

Die Website richtet sich an Marken, Händler und Unternehmen, die auf Amazon verkaufen oder den Einstieg prüfen. Niedrigschwellig bedeutet: Geschäftsbegriffe ohne Vorwissen erklären. Die bloße Erwähnung von Amazon oder ein angehängter Verkäuferhinweis rechtfertigt kein Thema. Die ursprüngliche Aufwertung von Paketproblemen und Geschenkretouren zu einem Footer-Thema war eine falsche redaktionelle Entscheidung.

Aktueller Stand nach Kundenfeedback:

- **77 aktive Artikel je Sprache**, sieben Fachthemen sowie die neuen Einstiege `/blog/grundlagen` und `/blog/vergleiche`.
- **Fünf ausgeschlossene Themen:** Paketdiebstahl, Falschlieferung, Geschenkretoure, Amazon Prints und Unclaimed Packages. Gesteuert über `content/blog-editorial-policy.json`; aus allen Listen, Empfehlungen, Themenwegen und der Sitemap entfernt. Bestehende Einzel-URLs bleiben vorerst erreichbar mit `noindex, follow`. Keine Weiterleitung auf fachlich unpassende Seiten und keine zusätzliche Crawl-Sperre. Das ist keine Behauptung, dass Google bereits URLs entfernt hat.
- „Retouren & Kundenservice“ entfällt als Themenbereich. Der Footer beginnt mit „Amazon-Grundlagen: einfach erklärt“ und nennt ausdrücklich Marken und Händler.
- **Neun einfache Einstiegsfragen:** Was ist ACoS, TACoS, ROAS, FBA, A+ Content oder Brand Registry? Was kostet der Verkauf? Seller oder Vendor? Was bedeutet der BSR? Die Übersicht erschließt vorhandene Fachartikel, ohne konkurrierende neue Definitionsartikel anzulegen.
- B2B-Inhalte wie Verkaufsgebühren, Bestandsplanung, Verkäuferkonten, Rezensionen und Liquidationsbestände bleiben sachlich relevant. Spezielle Geschäftsmodelle werden nicht als vorrangige Einstiege im Footer hervorgehoben.
- **Jeder aktive Artikel und jede Themen-/Grundlagen-/Vergleichsseite erhält einen Kontaktweg im Inhalt und einen Abschluss-CTA.** Grundlage sind vorhandene Leistungen, Falltexte, Fallkennzahlen und das bestehende Gesprächsmodul. Keine erfundenen Erfolgszahlen.
- Der neue `BlogSupport`-Baustein übernimmt passende Leistungslinks aus der vorhandenen Zuordnung. Bei passender Fallzuordnung zeigt er den bestehenden `Ergebnis`-Baustein mit Daten aus `cases.ts`/`cases-en.ts`. Content- und KI-Listingthemen zeigen zusätzlich vorhandene Kemes-Designarbeit und verlinken `/design-beispiele`.

| Einstieg | Passende Leistung | Vorhandener Nachweis / Vertiefung | Kontaktansprache |
|---|---|---|---|
| ACoS / guter ACoS | PPC Advertising | Vitaworld-Case | Passt euer ACoS zu eurer Marge? |
| A+ Content / Listing | Produktbilder & SEO | Bachgold-Case und Designbeispiele | Was könnte euer Amazon-Listing besser verkaufen? |
| FBA / Gebühren | FBA & Inventory; Account Management | Fachliche Leistungsbeschreibung | Passen FBA-Kosten und Bestand zu eurer Marge? |
| Verkäuferkonto gesperrt | Compliance & Account Health | HaA-Case | Braucht eure Marke Unterstützung in Seller Central? |
| Grundlagen / Vergleiche | Full Service | Bestehende Case-Study-Übersicht | Was braucht eure Marke für den nächsten Schritt auf Amazon? |

Prüfung der Korrektur: Produktions-Build und TypeScript erfolgreich. `scripts/check-blog-seo.py` prüft 226 gebaute HTML-Seiten und 217 Sitemap-URLs ohne Fehler, einschließlich zehn `noindex`-Sprachfassungen, fehlender Verlinkung zu ausgeschlossenen Artikeln, Grundlagen-/Kontaktwegen und passender Leistung/Case/Design-Verknüpfung. Die 82 zuvor erzeugten Bilddateien bleiben erhalten; 77 davon gehören zum aktiven Artikelbestand.

Referenz für `noindex`: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag

## Urteil und wichtigste Maßnahmen

Die bestehende Website hat bereits Artikel-Metadaten, Sprachfassungen, acht Kategorien und Leistungslinks. Ein einzelner Menüpunkt „Blog“ ist für sich kein SEO-Fehler. Der konkrete Verbesserungsbedarf liegt in den fehlenden direkten Themenwegen, der geringen Orientierung auf den Kategorieübersichten und den identischen symbolischen Bildern.

1. Sieben passende bestehende Kategorien zu nützlichen Themeneinstiegen ausbauen und im Footer verlinken.
2. Eine kuratierte Vergleichsübersicht mit eigenem Navigationsnutzen ergänzen.
3. Für alle 82 Artikel individuelle 3D-Motive erzeugen und für Deutsch und Englisch verwenden.
4. Artikelbezogene Social-Metadaten, beschreibende Bildtexte, responsive Bilder und die mehrsprachige Sitemap vervollständigen.
5. Veralteten FBA-Link korrigieren, mobiles Inhaltsverzeichnis ergänzen und die bereits zurückgenommene Angabe „60+ betreute Marken“ aus den verbliebenen Kennzahlenbändern entfernen.

## Umfang und Evidenz

- Ausgangsstand: Git-Commit `69c8061e0fb5fbf415d2154384cb2c16fa0bbfb9`.
- Vollständige Bestandsaufnahme: 82 deutsche Artikel und 82 entsprechende englische Fassungen. Ältere Dokumentation nennt 83; maßgeblich sind die vorhandenen Markdown-Dateien.
- Geprüft: Blog-Datenmodell, Artikel- und Kategorievorlagen, Footer, Sitemap, robots.txt, Sprachrouting, Bildkomponente und strukturierte Daten. Quelltext-Stichprobe der Startseite und Leistungs-/Ergebnisvorlagen. Gerenderte HTML-Prüfung des Produktions-Builds, siehe Prüfprotokoll am Ende.
- Öffentliche Live-Stichprobe zu Beginn: `https://www.temoa.de/blog` liefert HTTP 200. Der HTML-Ausgangsstand wurde lokal gesichert. Ein vollständiger Live-Crawl war nicht Ausgangspunkt dieser Umsetzung.
- Vorhandene Repository-Berichte `seo-audit-2026-10-16.md` und `seo-longtail-2026-10-16.md` sind frühere Dokumentation. Deren Search-Console-Zahlen wurden nicht erneut aus Rohdaten verifiziert und sind keine aktuelle Messung dieser Runde.
- Kein aktueller Search-Console-, Analytics-, Bing- oder Backlinkzugriff. Keine Behauptung über Indexierungsstatus, Suchvolumen, Rankinggewinn, Core Web Vitals oder Conversion-Steigerung.
- Vercel-Connector: HTTP 403 für den angegebenen Team-Scope. Keine alternative Teamzuordnung verwendet. GitHub ist mit dem Konto `spacedugg` erreichbar. Deployment-Ergebnis wird über GitHub-Status und öffentliche URL geprüft, soweit zugänglich.

## Suchabsichten und URL-Entscheidungen

Alle Pfade gelten auch unter `/en`. Die 77 passenden Artikel und sieben Fachkategorien bleiben aktiv. Fünf ausgeschlossene Artikel bleiben unter ihrer bisherigen URL erreichbar, erhalten aber `noindex, follow` und werden nicht mehr intern beworben. Die leere Kategorie `operativ-service` entfällt (404). Die Zuordnung beruht auf Artikelinhalt und Geschäftsmodell, nicht auf behauptetem Suchvolumen.

| URL | Hauptabsicht | Seitentyp | Ziel | Entscheidung |
|---|---|---|---|---|
| `/blog` | Passenden Ratgeber finden | Themenübersicht | Auswahl eines Themas oder Vergleichs | Bestehende Übersicht ergänzen |
| `/blog/kategorie/ppc-advertising` | Werbekennzahlen verstehen, Kosten steuern | Themenhub | Ratgeber; passende PPC-Leistung | Einstieg, drei Fragen, Leistungsweg ergänzen |
| `/blog/kategorie/listing-seo` | Listing, Bilder und Conversion verbessern | Themenhub | Ratgeber; Produktbilder & SEO | Überarbeiten |
| `/blog/kategorie/fba-logistik` | Gebühren, Versandmodell und Bestand einordnen | Themenhub | Ratgeber; FBA & Inventory | Überarbeiten |
| `/blog/kategorie/marke-account` | Marke schützen, Kontoproblem klären | Themenhub | Ratgeber; Compliance & Account Health | Überarbeiten |
| `/blog/kategorie/strategie` | Vertriebsmodell und Wachstum planen | Themenhub | Ratgeber; Strategie | Überarbeiten |
| `/blog/grundlagen` | Einfache Begriffe für das Amazon-Geschäft verstehen | Grundlagenübersicht | Vorhandenen Fachartikel lesen; Kontakt aufnehmen | Neu; neun Fragen zu Werbung, Verkauf und Marke |
| `/blog/kategorie/ki-zukunft` | KI-Suche und Produktinformationen verstehen | Themenhub | Überblick mit vertiefenden Listing-Ratgebern | Überarbeiten; sinnvolle Querverweise statt neuer Synonymseiten |
| `/blog/kategorie/zusammenarbeit` | Unterstützung auswählen | Themenhub | Auswahlkriterien; Full Service | Überarbeiten |
| `/blog/vergleiche` | Modelle und Unterstützungsformen vergleichen | Kuratierte Vergleichsübersicht | Passenden vorhandenen Vergleich auswählen | Neu; eigener Navigationsnutzen, keine Kopie der Artikel |
| `/blog/{slug}` | Jeweilige Frage beantworten | Ratgeber | Lesen; passende Leistung oder Fall | Fachtexte und URLs erhalten; Darstellung/Metadaten verbessern |
| `/` und `/ergebnisse` | Anbieter und Nachweise beurteilen | Angebots-/Nachweisseite | Qualifizierte Anfrage | Bereits zurückgenommene Markenanzahl entfernen |
| `/leistungen/fba-inventory-management` | Unterstützung bei FBA/Bestand finden | Leistungsseite | Qualifizierte Anfrage | Inhalt erhalten, neue passende Zugänge |

## Maßnahmen mit Abnahme

| Prio | Fundstelle / Beobachtung | Evidenz | Interpretation und konkrete Änderung | Wirkprinzip | Aufwand / Risiko | Abnahme |
|---|---|---|---|---|---|---|
| P1 | `Fusszeile.tsx`: unter Unternehmen nur `/blog`, keine Themen | Bestätigt im Quelltext | Neun Themen-/Vergleichslinks in eigenem beschriftetem Navigationsbereich | Kürzere Wege, verständliche Linkziele | Klein / gering | Links in DE/EN vorhanden, Ziele erreichbar |
| P1 | Kategorievorlage: kurzer Beschreibungssatz und Artikelliste | Bestätigt | Eigene Titel, Einleitung, drei beantwortete Einstiegsfragen, passender Leistungslink, Quernavigation | Orientierung und eindeutige Seitenaufgabe | Mittel / gering | Sieben eigenständige Einstiege, alle Verweise auf vorhandene Inhalte |
| P1 | 82 Artikel ohne Raster-Cover in `public/blog/covers` | Bestätigt im Ausgangsstand | Ein Motiv je Artikel, gemeinsamer Stil, WebP und responsive Auslieferung | Inhaltserkennung in Listen und beim Teilen | Hoch / Bildprüfung erforderlich | 82 vorhandene Dateien und korrekte Zuordnung in beiden Sprachen |
| P1 | Artikel-Metadaten erbten Open-Graph-Angaben der Startseite | Bestätigt im Code | Titel, Beschreibung, URL, Typ `article` und individuelles Bild setzen; Twitter-Metadaten ergänzen | Geteilte Vorschau beschreibt den Artikel | Klein / gering | Gerendertes HTML je Artikel prüfen |
| P1 | `sitemap.ts`: nur deutsche `<loc>`-Einträge, trotz EN-Alternates | Bestätigt | Jeder kanonischen Sprachfassung einen eigenen Eintrag geben, gegenseitige Alternates, x-default; keine fehlenden Übersetzungen ausweisen | Konsistente Sprachzuordnung | Mittel / mittel | XML parst; Alternates verweisen auf vorhandene Canonicals |
| P1 | `blog-links.ts`: FBA verlinkt auf gelöschten Abschnitt `/leistungen/account-management#fba` | Bestätigt durch aktuellen Seitenaufbau und Projektprotokoll | Auf `/leistungen/fba-inventory-management` verlinken | Ziel passt zur angekündigten Leistung | Klein / gering | Kein veralteter Fragmentlink mehr |
| P1 | `KENNZAHL_WERTE` enthielt 60; Runde 49 in `CLAUDE.md` bezeichnet diese Angabe als falsch | Bestätigter Widerspruch im Projekt | Eintrag in beiden Sprachen entfernen, Kennzahlenlayout auf drei Werte anpassen | Keine bekannte Falschangabe weiter anzeigen | Klein / gering | Zahl/Label verschwinden aus beiden Kennzahlenbändern |
| P2 | Inhaltsverzeichnis mit `hidden lg:block` nur auf Desktop | Bestätigt | Zusätzlich natives aufklappbares Inhaltsverzeichnis auf Mobilgeräten | Lange Artikel leichter navigieren | Klein / gering | Sichtbar unter lg, Links führen zu eindeutigen IDs |
| P2 | Hero-Bild `loading=lazy`, starkes Banner-Cropping; Alt war Artikeltitel | Bestätigt im Code | Hero priorisieren, 16:9-Motiv zeigen, `next/image` mit sizes; Alt beschreibt Motiv, Kartenbilder dekorativ neben Linktitel | Ladeverhalten, vollständiges Motiv, weniger redundante Vorlesetexte | Mittel / Bilder prüfen | Richtige Bildquelle, responsive Größen, sinnvolle Alt-Texte |
| P2 | Canonical entfiel im Code bei fehlender Übersetzung | Bestätigter latenter Fehler; aktuell alle Artikel übersetzt | Eigenen Canonical auch ohne zweite Fassung ausgeben | Robuste Metadaten für neue Artikel | Klein / gering | Fallback im Code vorhanden |
| P2 | Explizite Bot-Gruppen erlaubten `/api/`, obwohl Wildcard-Gruppe sperrt | Bestätigt im Code | `/api/` auch in den expliziten Gruppen ausschließen | Einheitlicher Crawl-Umfang | Klein / gering | robots.txt-Gruppen konsistent |

## Konkrete Neufassung und Änderungsprotokoll

Die vollständigen veröffentlichten Texte für alle Themen liegen zweisprachig in `src/lib/blog-topics.ts`. Die wichtigste neue Seite ist `/blog/vergleiche`:

- Title: „Amazon-Vergleiche: FBA, Werbung und Partnerwahl · temoa“.
- H1: „Amazon-Vergleiche: FBA, Werbung und Partnerwahl“.
- Description und Einstieg: „FBA oder FBM, Vendor oder Seller, Full Service oder Spezialist: Hier findet ihr die vorhandenen Vergleiche und Entscheidungshilfen nach Fragestellung geordnet. Beginnt mit der Entscheidung, die für eure Marke gerade ansteht.“
- Abschnitt Versand und Vertriebsmodell: „Wer verkauft an wen, wer versendet und wer trägt den operativen Aufwand? Diese Vergleiche helfen bei der Wahl eures Modells.“ Links auf FBM vs. FBA, Vendor vs. Seller Central und FBA vs. Dropshipping.
- Abschnitt Werbung und Kennzahlen: „ACoS und TACoS beantworten unterschiedliche Fragen. Auch Anzeigenformate solltet ihr nach Aufgabe und Ziel vergleichen.“ Links auf TACoS, ROAS und Sponsored Brands/Display.
- Abschnitt Die passende Unterstützung: „Prüft, welche Aufgaben ihr abgeben möchtet und welche im eigenen Team bleiben. Daraus ergibt sich der passende Leistungsumfang.“ Links auf Full Service vs. Spezialist, PPC-Partnerwahl und allgemeine Partnerwahl.
- Handlungsweg: vorhandenen Ratgeber über dessen Titel öffnen; dort thematisch passende Leistung oder Fall auswählen. Allgemeiner Kontakt bleibt im Footer erreichbar.

Die Fachtexte der 82 Artikel und die vom Kunden freigegebene Hero-Copy der Startseite bleiben erhalten. Es wurden keine Veröffentlichungsdaten, Preisangaben, Kundenstimmen oder neuen Ergebnisse erfunden. Bestehende Kategorieabsichten bleiben bestehen. Die schwach besetzte KI-Kategorie erhält passende Querverweise auf Kundenfragen und visuelle Suche; die Artikel behalten ihre primäre Kategorie.

Keine vollständige Neufassung bestehender Artikel: deren Wortzahlen ändern sich nicht. Neue Vergleichsübersicht: vorher keine Seite; neue Texte stehen vollständig oben und im Code. Der Nutzen liegt in der Auswahlhilfe, nicht in einer Wortzahlvorgabe.

## Interne Links

| Quelle | Ziel | Ankertext / Auswahl | Zweck |
|---|---|---|---|
| Footer aller Seiten | Acht `/blog/kategorie/*`-Seiten | Themenname, z. B. „Amazon PPC & Werbekosten“ | Direkter Einstieg |
| Footer und `/blog` | `/blog/vergleiche` | „Amazon-Vergleiche & Entscheidungshilfen“ / „Zu den Vergleichen“ | Modelle vergleichen |
| PPC-Themenhub | `/blog/acos-erklaert`, `/blog/guter-acos-benchmarks`, `/blog/tacos-erklaert` | Konkrete Frage plus kurze Antwort | Fachbegriff verstehen und vertiefen |
| FBA-Themenhub und FBA-Artikel | `/leistungen/fba-inventory-management` | „FBA und Bestandsplanung bei temoa“ / „FBA und Inventory bei temoa“ | Passende Unterstützung |
| KI-Themenhub | `/blog/kundenfragen-seo`, `/blog/visual-search-optimierung` | Kundenfragen / Produktsuche mit Bildern | Zusammenhang mit Listing-Arbeit |
| Themenhub | Weitere Themen und Vergleichsübersicht | Beschreibender Themenname | Benachbarte Fragen erschließen |
| Artikel | Bestehende Leistung und passender Fall | Bestehende `beitragsLinks` | Entscheidungsweg erhalten |

## Bildbriefing und Pflege

- 82 einzeln generierte Bilder, keine bloß umgefärbte Kategoriegrafik.
- Stil: matte, weiche 3D-Objekte auf hellem kühlblauem Grund; Navy, Weiß und Orange; ruhige Studiobeleuchtung; keine Logos oder Leistungszahlen.
- Motiv und gemeinsamer Prompt: `content/blog-cover-motive.json`. Zusätzliche Generierungsanweisung: „Use case: stylized-concept. Asset: individual production article thumbnail for temoa Amazon consulting. Article topic: {slug}. {stil} Subject: {motiv} Produce one polished 16:9 landscape image. Same consistent matte 3D studio art direction as a cohesive editorial collection. Objects readable at small thumbnail sizes. No text.“
- Generierung: integrierte Bildgenerierung, ein Aufruf je Motiv. Kein bestehendes API-Batchskript und kein API-Schlüssel verwendet.
- Ausgabe: `public/blog/covers/{slug}.webp`, 1400 × 788 Pixel; Originalmotive als Grundlage, WebP-Optimierung mit sharp.
- Motivalternativtexte in DE/EN: `content/blog-cover-alt.json`. Die Karte hat einen leeren Alt-Text, weil der benachbarte Artikelname bereits das Linkziel bezeichnet. Das große Artikelbild hat eine Motivbeschreibung.
- Neue Artikel benötigen Motiv, Bilddatei und passende Motivalternativtexte. Das Prüfsystem meldet fehlende Dateien.

## Grenzen und Messplan

- Suchnachfrage der Themen: plausible redaktionelle Hypothese anhand des Bestands und des Angebots. Keine neue Keyword- oder SERP-Studie und keine Prognose.
- Fachliche Aktualität aller 82 Artikel, insbesondere Gebühren, rechtliche Aussagen, Kontoregeln und aktuelle Amazon-Programme: nicht vollständig neu geprüft. Die jetzige Runde ändert diese Fachtexte nicht. Aktualisierung artikelweise mit offiziellen Quellen und zuständiger fachlicher Prüfung planen.
- Unternehmensnachweise: die bekannte falsche Markenanzahl wird entfernt. Andere vorhandene Unternehmenszahlen wurden nicht unabhängig verifiziert; Belege bleiben Unternehmensaufgabe.
- Lokale Suche und Unternehmensprofil: für den aktuellen B2B-Themen-/Bildauftrag nicht priorisiert. Keine Ortsseiten erstellt.
- Offpage: kein bestätigtes Linkproblem, keine Kontaktaufnahme oder Linkkäufe. Vorhandene Ideen im früheren Audit bleiben Vorschläge.
- Nach Veröffentlichung: neue Vergleichsseite und repräsentative Kategorie-/Artikel-URLs in der Search Console per URL-Prüfung kontrollieren; Sitemap neu abrufen lassen. Ein erfolgreicher Abruf garantiert keine Indexierung.
- Nach vier bis acht Wochen und ausreichenden Daten: Google-Impressionen/Klicks pro Themenhub und zugeordneten Artikeln mit passender Vorperiode vergleichen, Markenanfragen, Land, Gerät und Saison getrennt betrachten. Frühere Dokumentation nicht als neue Rohdatenauswertung ausgeben.
- Conversion: erfolgreiche Terminbuchung/qualifizierte Anfrage als Ziel; Klick auf CTA separat messen. In dieser Runde keine Testbuchung versendet und kein neuer Trackingdienst eingerichtet.
- KI-Sichtbarkeit: nur dokumentierte Stichproben mit Frage, System, Datum und zitierter URL; keine garantierten Zitierungen.

## Offizielle Referenzen

Geprüft am 16.10.2026:

- Google, logische Seitenstruktur und beschreibende interne Links: https://developers.google.com/search/docs/appearance/sitelinks
- Google, Sprachversionen und separate Sitemap-Einträge je URL: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google, Article-/BlogPosting-Markup: https://developers.google.com/search/docs/appearance/structured-data/article
- Google, strukturierte Daten müssen sichtbaren Inhalt abbilden; keine Garantie für Rich Results: https://developers.google.com/search/docs/appearance/structured-data/sd-policies

## Technisches Prüfprotokoll der ersten Fassung (vor Zielgruppenkorrektur)

- Produktions-Build erfolgreich mit Next.js 15.5.19; TypeScript (`npx tsc --noEmit`) und `git diff --check` erfolgreich.
- Lokale Laufzeit benötigt eine temporäre Kompatibilität für eine nicht verfügbare RSS-Speicherabfrage. Diese Datei liegt außerhalb des Repositorys und wird nicht ausgeliefert. Der reguläre Projekt-Build bleibt unverändert.
- `python scripts/check-blog-seo.py`: 82 Artikel pro Sprache, 226 HTML-Dateien eingelesen, 227 Sitemap-Adressen, keine Prüffehler. Prüfungen für die 164 Artikel und 18 Themen-/Vergleichsseiten: Canonical, hreflang, H1, IDs, Beschreibung, Social-Bild, BlogPosting-Bild und interne Zielrouten.
- Alle 82 WebP-Dateien vollständig dekodiert und in vier Kontaktübersichten visuell geprüft. Zusammen 2.164.874 Bytes; größtes Bild 40.976 Bytes. Auflösung je 1400 × 788.
- Lokaler HTTP-Test: 14 repräsentative Seiten/Endpunkte, jeweils HTTP 200. Enthalten: Startseite, Blog, beide Vergleichsseiten, deutsche/englische Themenseite und Artikel, FBA-Leistung, Terminseite, Sitemap, robots.txt, Original-WebP und responsive Next-Bildauslieferung. Host `localhost`; die lokale 127.0.0.1-Variante normalisiert Next beim Sprach-Rewrite anders. Kein Produktionsrouting dafür geändert.
- Browser-Screenshots und mobile Interaktion lokal nicht verifiziert: der isolierte Chromium-Prozess endet mit SIGTRAP. Das ist eine Grenze der lokalen Prüfumgebung, kein bestätigter Websitefehler. Responsive Klassen und semantische `details`-Navigation im Code geprüft. Live-Sichtprüfung nach Deployment, soweit zugänglich.
- Keine Kontaktformulare oder Terminbuchungen abgesendet. Keine Feldmessung der Ladeleistung, kein vollständiger Barrierefreiheitstest und kein externer Google-Rich-Results-Test.

Die automatisierte Prüfung ist mit `python scripts/check-blog-seo.py` nach `npm run build` wiederholbar. Sie ersetzt weder einen vollständigen Browser-Audit noch den Google Rich Results Test.
