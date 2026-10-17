---
title: "Amazon Business Reports: Welches Angebot bremst den Umsatz?"
meta_description: "Business Reports auf Child-ASIN-Ebene auswerten: Sitzungen, Einheiten je Sitzung und Featured Offer verbinden. Mit einem konkreten Variantenfall und Diagnoseweg."
keywords: ["Amazon Business Reports", "Detail Page Sales and Traffic", "Unit Session Percentage", "Featured Offer"]
kategorie: "Amazon Daten & Analyse"
---

# Amazon Business Reports: Welches Angebot bremst den Umsatz?

Ein Rückgang im Gesamtumsatz sagt eurem Team noch nicht, wo es handeln soll. Die Business Reports in Seller Central erlauben den Einstieg auf **Child-ASIN-Ebene**: Wie viele Sitzungen bekam eine Variante, wie viele Einheiten wurden bestellt und wie oft war euer Angebot bei Aufrufen die Featured Offer? Diese Werte helfen, einen konkreten Vorfall einzugrenzen.

Öffnet in Seller Central unter Berichte die Detailseitenverkäufe und Traffic **nach Child ASIN**. Exportiert einen passenden Zeitraum und eine Vergleichsperiode mit denselben Wochentagen. Schließt unvollständige aktuelle Tage aus. Notiert parallel Rabattaktionen, Preis- und Bestandswechsel, bevor ihr Unterschiede interpretiert.

## Was die vier Kernwerte bedeuten

| Wert | Aussage | Grenze |
|---|---|---|
| Sitzungen | Besuche der Produktdetailseite gemäß Amazon-Definition | Bezahlte und organische Herkunft nicht getrennt |
| Unit Session Percentage | Bestellte Einheiten geteilt durch Sitzungen | Einheitenquote, nicht Anteil eindeutiger Käufer |
| Featured Offer Percentage | Anteil der Detailseitenaufrufe mit eigenem hervorgehobenen Angebot gemäß Report | Ursache eines Verlusts steht nicht im Prozentwert |
| Ordered Product Sales | Im Bericht erfasster Bestellumsatz | Noch kein Nettoerlös oder Deckungsbeitrag |

Ein Käufer kann mehr als eine Einheit bestellen. Deshalb sollten 12 % Unit Session Percentage nicht als „12 % der Besucher kaufen“ umformuliert werden. Ebenso enthält Umsatz keine Warenkosten, Werbung, Retouren oder alle zeitlichen Korrekturen.

## Der Fall: Zwei Varianten desselben Produkts

Eine fiktive Marke verkauft dieselbe Edelstahlflasche als schwarze und blaue Child-ASIN. Im Vergleich zweier vierwöchiger Zeiträume bleibt der Preis der schwarzen Variante unverändert. Die Tabelle zeigt absichtlich die Werte pro Variante; die Parent-ASIN würde die Abweichung verdecken.

| Variante | Sitzungen vorher → nachher | Einheiten vorher → nachher | Unit Session % | Featured Offer % |
|---|---:|---:|---:|---:|
| Schwarz, 750 ml | 2.200 → 2.180 | 242 → 153 | 11,0 → 7,0 | 98 → 72 |
| Blau, 750 ml | 1.400 → 1.450 | 154 → 163 | 11,0 → 11,2 | 99 → 99 |

<aside class="article-example"><p class="example-label">Fiktiver Variantenfall · Diagnose vor Maßnahme</p><h3>Die schwarze ASIN verliert Bestellungen trotz stabiler Sitzungen</h3><p>Die schwarze Variante bekommt nahezu gleich viele Besuche, verkauft aber 89 Einheiten weniger. Gleichzeitig fällt ihr Featured-Offer-Wert von 98 auf 72 %. Die blaue Variante bleibt stabil. Der nächste Schritt ist eine Angebotschronik für Schwarz: Verkäuferwechsel, kaufbarer FBA-/FBM-Bestand, Lieferzusage und Endpreis prüfen. Ein neuer A+-Entwurf wäre zu diesem Zeitpunkt unbegründet.</p></aside>

![Business Reports pro Child-ASIN: Schwarz – 2.180 Sitzungen, Kaufbarkeit – Featured Offer 72 %, Ergebnis – 153 bestellte Einheiten](/blog/figures/business-reports.svg)


Die Zahlen beweisen noch nicht, dass allein die Featured Offer für den Verlust verantwortlich war. Prüft die Zeitpunkte: Wann sank der Angebotsanteil, wann änderte sich die Lieferzeit und wann die Bestellquote? Berücksichtigt mögliche Werbe- und Suchanfragenverschiebungen. Wenn die Angebotslage wieder stabil ist und die Kaufleistung niedrig bleibt, untersucht erst dann Bild, Titel, Variantenführung und Detailseiteninhalt.

## Vier Befundmuster für den Wochenreview

**Sitzungen runter, Einheitenquote stabil:** Prüft Nachfrage der wichtigsten Queries, Kampagnenreichweite, organische Präsenz, Varianten- und Indexierungsstatus. Eine Contentänderung ist nicht automatisch der erste Schritt. [Search Query Performance](/blog/search-query-performance) kann Nachfrage- und Marktanteilsveränderungen bei relevanten Anfragen unterscheiden.

**Sitzungen stabil, Einheitenquote runter:** Prüft Featured Offer, Preis inklusive Versand, Lieferzusage, Bewertungsänderungen und die Genauigkeit der Produktseite. Legt die Ereignisse auf eine Zeitachse. Die zusammengefasste Quote identifiziert keine einzelne Ursache.

**Beide runter:** Kontrolliert zunächst Kaufbarkeit, Lagerbestand, Suppression und Angebotsstatus. Dann trennt ihr Sichtbarkeits- von Conversion-Fragen. Ein großes Budget auf eine nicht lieferbare Variante löst nichts.

**Sitzungen und Einheitenquote stabil, Umsatz runter:** Prüft den realisierten Wert je Einheit, Produktmix, Rabatt und gegebenenfalls Stornos. Bestellte Einheiten und Umsatz können sich unterschiedlich entwickeln. Für die Wirtschaftlichkeit führt anschließend kein Weg am tatsächlichen Nettoerlös und Stückbeitrag vorbei.

## Was in einen brauchbaren Wochenbericht gehört

Zeigt die wichtigsten Child-ASINs mit aktuellen und verglichenen vier Werten, Lieferreichweite und einer Spalte **„Befund / Eigentümer / nächster Beleg“**. Eine zusätzliche Zeile mit „Umsatz minus 20 %“ reicht nicht. Wenn ein Problem auf eine schwarze Variante begrenzt ist, braucht nicht die gesamte Marke neue Anzeigen oder neue Bilder.

Verknüpft den Bericht mit der passenden Datenquelle: Ads Console für Kosten und zugerechnete Verkäufe, SQP für Suchanfragen, Bestands- und Angebotsansichten für Lieferfähigkeit, Zahlungsreports für den Geldfluss. Die Nenner und Zeitpunkte dieser Reports unterscheiden sich. Addiert sie nicht zu einer scheinbar vollständigen „Conversion-Rate“.

Eine sinnvolle Eskalation endet mit einer Entscheidung: Angebot reparieren, Bestand sichern, Produktangaben klären, eine konkrete Content-Hypothese testen oder Werbereichweite anpassen. Unsere Arbeit in [Analytics & Reporting](/leistungen/analytics-reporting), [Account-Management](/leistungen/account-management) und [FBA & Inventory](/leistungen/fba-inventory-management) führt diese Befunde zusammen. Im [Gespräch](/gespraech-vereinbaren) können wir die auffälligsten Varianten eures Reports durchgehen.

## Quellen und Datenstand

[Amazon SP-API: Sales and Traffic Report](https://developer-docs.amazon/sp-api/docs/report-type-values-analytics) und [Amazon: Brand Analytics](https://sell.amazon.com/tools/amazon-brand-analytics). Geprüft am 17. Oktober 2026. Varianten und Werte sind fiktiv; die vier Berichtsspalten stammen aus den beschriebenen Amazon-Ansichten.
