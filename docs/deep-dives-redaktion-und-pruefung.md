# Erweiterung: zwölf Deep Dives für etablierte Amazon-Marken

Redaktioneller Prüfstand: 16. Oktober 2026. Diese Erweiterung ergänzt die zuvor neu erstellten Beiträge zu Search Query Performance und Business Reports um zwölf eigenständige Themen. Insgesamt sind damit 14 neue Themen gegenüber dem Ausgangsbestand hinzugekommen. Die fünf aus der Akquise entfernten Verbraucherartikel bleiben aus Indexierung, Empfehlungen und Sitemap ausgeschlossen.

## Auswahl und eigenständige Ausarbeitung

Die Themenprüfung nutzt die öffentlich zugängliche Blogübersicht und den bereits erfassten Artikelbestand von [Amazon Growth Lab](https://www.amazongrowthlab.com/blog) als Recherche zur Themenabdeckung. Der erfasste Bestand enthält 97 Artikeladressen mit 94 unterschiedlichen Titeln. Die neuen temoa-Texte sind eigenständige Ausarbeitungen mit eigenen Modellen, anderen Beispielen und deutschen Marktgrenzen. Es wurden keine fremden Artikel übersetzt oder fremde Bilder übernommen.

| Neuer Beitrag | Entscheidungsnutzen | Kritische Einordnung |
|---|---|---|
| Amazon DSP: Testbudget | Zugang, Media, Betreuung und Messung kalkulieren | 50.000 USD bezieht sich auf Amazons beschriebenen Managed Service, keine allgemeine deutsche Mindestschwelle |
| CPC und Conversion | Gebotsspielraum aus Stückbeitrag ableiten | Mixänderung von veränderten Segmentkosten trennen; gleiche Messgrundlage verwenden |
| Werbe-Inkrementalität | Zugerechneten von zusätzlichem Umsatz unterscheiden | AMC, New-to-Brand und Brand Lift nicht als automatische Kausalnachweise darstellen |
| Featured Offer | Verkaufsfähigkeit, Lieferzusage und Konkurrenz prüfen | EU/UK-Änderung vom 20. Juli 2026 berücksichtigt; keine Gewinnzusage |
| Keyword-Recherche | Produktpassung und Suchintention priorisieren | SQP, Werbereports und Kundenfeedback haben unterschiedliche Grundgesamtheiten |
| Produktlaunch | Freigaben und Entscheidungen über 60 Tage planen | Eigener Planungsrahmen, kein behauptetes Amazon-Rankingfenster |
| Content-Experimente | Kaufhürde, Test und Business Case verbinden | Berechtigung prüfen; Prozent und Prozentpunkte unterscheiden; Unsicherheit beachten |
| Kanalstrategie | Gesamtbeitrag statt isolierten Kanalumsatz betrachten | Verlagerung ist ohne Design nicht kausal nachgewiesen; Vertriebsrecht getrennt prüfen |
| KI-Sichtbarkeit | Produktfakten und Kompatibilität konsistent halten | Google-Dokumentation nur auf Google beziehen; keine KI-Platzierung versprechen |
| Account Health | Hinweise, Nachweise und Verantwortlichkeiten steuern | Rating ersetzt keine Produktprüfung; Szenarioexposition ist kein erwarteter Schaden |
| Vine-Kalkulation | Vollständige Kosten und Lernziel bewerten | Veröffentlichte deutsche Staffel mit Kontoabgleich; keine garantierten Rezensionen |
| AWD | US-Vorlagerung und FBA-Nachschub durchrechnen | Explizit US-Kontext; alle Beispieltarife und Laufzeiten sind Modellannahmen |

Die deutschen Beiträge umfassen jeweils ungefähr 750–900 Wörter einschließlich Metadaten und Quellen. Englische Fassungen decken dieselben Entscheidungen, Rechenmodelle und Einschränkungen in kompakterer Form ab. Quellen stehen direkt bei den jeweiligen Artikeln. Geldbeträge, Conversion-Raten und Zeiträume in Beispielen sind ausdrücklich als Modellannahmen gekennzeichnet; es werden keine erfundenen Kundenresultate verwendet.

## Inhaltliche Prüfpunkte

- DSP-Modell: 6.000 / 12 × 1.000 = 500.000 Impressionen; 0,2 % = 1.000 Klicks; 5 % = 50 Käufe; Gesamtkosten 8.500 Euro.
- CPC-Modell: 8 Euro Werbespielraum × 10 % = 0,80 Euro; Traffic-Mix 80/20 ergibt 0,70 Euro, 50/50 ergibt 1,00 Euro bei unveränderten Segmentpreisen.
- Inkrementalitätsmodell: 100 zusätzliche Bestellungen × 40 Euro = 4.000 Euro; 30 % Beitrag minus 1.000 Euro Media minus 400 Euro Zusatzaufwand = minus 200 Euro. Keine Behauptung statistischer Sicherheit.
- Featured-Offer-Modell: Beitrag 9 auf 6 Euro erfordert 50 % mehr Einheiten, bei vereinfachend konstanten sonstigen Kosten.
- Content-Modell: 20.000 × 0,5 Prozentpunkte = 100 zusätzliche Bestellungen; 900 Euro Monatsbeitrag bei 9 Euro je Bestellung; Rückfluss unter konstanten Annahmen zwei Monate.
- Vine-Modell: 10 × (8 + 4) + 70 = 190 Euro; sechs Rezensionen ergeben rückblickend 31,67 Euro je Rezension; 38 zusätzliche Bestellungen zu 5 Euro Beitrag decken 190 Euro.
- AWD-Modell: 900 gegenüber 830 Dollar; 30 Einheiten × (14 + 7) Tage = 630 Einheiten. Kein Amazon-Tarif und kein behaupteter AWD-Algorithmus.

## Darstellung und Navigation

- Eigene Sammlung `/blog/deep-dives`, deutsch und englisch, mit vier geschäftlichen Entscheidungsfeldern und zwölf Beiträgen.
- Prominente Verlinkung auf der Blogübersicht; fortgeschrittene Themen vor Grundlagen. Neue Beiträge auch innerhalb ihrer Themenkategorie priorisiert.
- Alle zwölf Deep Dives direkt im passenden Footer-Bereich verlinkt. Themen-Einstiege zu Werbung, Content, Account, Strategie und KI aktualisiert.
- Sichtbar hervorgehobene Praxisbeispiele, scrollbare Tabellen, passende Leistungslinks und Kontaktmöglichkeiten. Vorhandene Cases und Designarbeiten werden über die bestehenden Komponenten wiederverwendet.
- Zwölf eigens generierte 3D-Cover, 1.400 × 788 Pixel, WebP. Gemeinsame Palette und individuelle Motive. Exakte Prompts und Assetpfade: `docs/deep-dive-cover-prompts.json`.
- Eigene SEO-Titel, Meta-Beschreibungen, H1, Canonicals, Sprachalternativen, Artikel- und Sammlungsdaten; Sammlung und Artikel in der Sitemap.

## Technische Prüfung

TypeScript-Prüfung ohne Fehler. Produktionsbuild und HTML-Prüfung mit `scripts/check-blog-seo.py` kontrollieren Seiten, interne Links, Bilder, H1, Canonicals, Sprachalternativen, strukturierte Daten, Kontaktwege und Sitemap. Die neue Sammlung wird zusätzlich auf zwölf eindeutige, zweisprachig erreichbare Beiträge geprüft. Das nachfolgende Deployment wird auf dem vorhandenen Preview-Branch bereitgestellt.
