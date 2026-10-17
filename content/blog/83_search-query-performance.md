---
title: "Search Query Performance: Welche Suchanfrage verliert eure Marke wo?"
meta_description: "Amazon Search Query Performance auswerten: Markt- und Markenanteile über Impressionen, Klicks, Warenkörbe und Käufe vergleichen. Mit ASIN-Beispiel und Prüfablauf."
keywords: ["Search Query Performance", "Amazon Suchanfragen auswerten", "Brand Analytics", "Amazon Klickanteil Kaufanteil"]
kategorie: "Amazon Daten & Analyse"
---

# Search Query Performance: Welche Suchanfrage verliert eure Marke wo?

Search Query Performance (SQP) ist ein Bericht in Brand Analytics. Er zeigt zu Suchanfragen unter anderem Suchvolumen, Impressionen, Klicks, Warenkorbzugänge und Käufe. Zu den Stufen erscheinen Werte für den Marktplatz und eure Marke beziehungsweise eine ausgewählte ASIN. Damit könnt ihr feststellen, **bei welcher Suchanfrage eure Position zwischen Sichtbarkeit und Kauf schwächer wird**. Der Bericht erklärt die Ursache nicht von selbst.

Der Zugang hängt an Brand Registry und den passenden Benutzerrechten. Beginnt in Seller Central bei **Marken → Brand Analytics → Search Query Performance**. Wählt Marktplatz, Zeitraum und Marken- oder ASIN-Ansicht bewusst. Die Markenansicht bündelt Produkte; die ASIN-Ansicht eignet sich für eine Entscheidung zu einer konkreten Produktseite. Exportiert die relevanten Queries, bevor ihr Maßnahmen priorisiert.

## SQP und Anzeigen-Suchbegriffe nicht vermischen

Der Suchbegriffsbericht der Ads Console zeigt Suchanfragen, die **eure Anzeigen** ausgelöst haben, samt Werbekosten und zugerechneten Verkäufen. SQP stellt Suchverhalten und eure Position innerhalb des Berichts gegenüber. Ein guter bezahlter ACoS beantwortet nicht, ob euch ein großer Teil der Käufe derselben Query entgeht. Umgekehrt lässt SQP bezahlte und organische Wirkung nicht einfach auseinanderrechnen.

Business Reports betrachten Sitzungen und Verkäufe eurer Produktseiten. Deren Gesamtwerte lassen sich nicht als Summenzeile an eine Query-Auswertung hängen: Ein Bericht ordnet nach Suche, der andere nach Detailseitenbesuch und Angebot. Nutzt den [Business-Reports-Leitfaden](/blog/business-reports) für die zweite Perspektive.

## Eine Zeile lesen: erst die absoluten Werte, dann die Anteile

Das folgende Beispiel ist vollständig fiktiv. Die Query lautet „edelstahl trinkflasche 750 ml schwarz“, die betrachtete ASIN ist eine schwarze 750-ml-Flasche. Verwendet für alle Werte **denselben Marktplatz, dieselbe Query und denselben Berichtszeitraum**.

| Stufe | Im Bericht erfasster Marktplatz | Eigene Marke | Eigener Anteil |
|---|---:|---:|---:|
| Impressionen | 40.000 | 6.000 | 15 % |
| Klicks | 8.000 | 600 | 7,5 % |
| Warenkorbzugänge | 2.000 | 100 | 5 % |
| Käufe | 900 | 36 | 4 % |

<aside class="article-example"><p class="example-label">Fiktive Query · vier Stufen</p><h3>15 % Sichtbarkeit, aber nur 4 % Käufe</h3><p>Die Marke erhält 6.000 von 40.000 Impressionen, 600 von 8.000 Klicks und 36 von 900 Käufen. Der große Abfall von 15 % Impressionenanteil auf 7,5 % Klickanteil macht das Suchergebnis zum ersten Prüfpunkt: Hauptbild, sichtbarer Titel, Preis, Bewertung und Lieferzusage der konkret daneben stehenden Angebote. Die weiteren Verluste bei Warenkorb und Kauf sind eigene Prüfaufträge. Kein Anteil allein beweist, welches Element die Ursache ist.</p></aside>

![Search Query Performance: Markt – 40.000 Impressionen, Marke – 6.000 Impressionen, Diagnose – 15 % Anteil; danach Klicks](/blog/figures/search-query-performance.svg)


Die vier Anteile haben **jeweils einen anderen Nenner**. 7,5 % Klickanteil bedeutet 600 eigene von 8.000 erfassten Klicks auf diese Query. 4 % Kaufanteil bedeutet 36 eigene von 900 erfassten Käufen. Die Differenz von 3,5 Prozentpunkten ist keine beobachtete „Abbruchquote derselben Käufer“.

Auch eine selbst berechnete Größe wie 100 eigene Warenkorbzugänge geteilt durch 600 eigene Klicks ist kein nachverfolgter Personenpfad und nicht automatisch identisch mit einer von Amazon benannten Rate-Spalte. Prüft die aktuelle Definition jeder Spalte im Dashboard, bevor ihr Quoten vergleicht.

## Welcher Abfall führt zu welcher Prüfung?

**Impressionenanteil hoch, Klickanteil deutlich schwächer:** Öffnet die tatsächliche Suchergebnisseite für diese Query. Welches Produktbild, welcher Titel, Preis und welches Lieferdatum stehen neben euch? Ein schwaches Hauptbild lässt sich nicht durch eine schönere A+-Seite ausgleichen, denn der Klick ist bereits verloren. Wenn eure 750-ml-Flasche zu einer 500-ml-Anfrage eingeblendet wird, ist Produktpassung statt Bildqualität das Thema.

**Klickanteil stabil, Warenkorbanteil schwach:** Prüft die Detailseite und die Produktfakten. Bei der Flasche wären Größe, Material, 7,5-cm-Durchmesser, Verschluss und tatsächlich belegte Eignung konkrete Prüfpunkte. Schaut zusätzlich auf Variante, Preis, Bewertungen und Lieferzusage. Ein fehlendes Maßbild ist eine testbare Hypothese; aus SQP allein folgt nicht „Bild 4 verursacht den Abfall“.

**Warenkorbanteil stark, Kaufanteil schwach:** Prüft Angebot, Featured Offer, Endpreis und Verfügbarkeit zum betreffenden Zeitraum. Änderungen zwischen Warenkorb und Bestellung lassen sich aus aggregierten SQP-Stufen nicht als individueller Checkout-Abbruch lesen. Nehmt die Muster als Anlass für eine gezielte Angebotsprüfung.

**Absolute Klicks steigen, Anteil sinkt:** Euer Produkt kann mehr Besucher erhalten und zugleich langsamer wachsen als die Query insgesamt. Stellt beide Zeiträume mit den tatsächlichen Nennern gegenüber. Beispiel: 500 von 5.000 erfassten Klicks sind 10 %, 700 von 10.000 nur 7 %. Der eigene Zuwachs von 200 Klicks verdeckt einen Verlust von drei Anteilspunkten. Ob ein Wettbewerber, eure Lieferfähigkeit oder ein Kampagnenwechsel dahintersteht, muss anschließend untersucht werden.

## Eine Entscheidungsliste aus dem Export erstellen

Beginnt mit Queries, die zum Produkt passen und ein relevantes Kaufvolumen haben. Für jede notiert ihr Query, ASIN oder Marke, Zeitraum, Markt- und Eigenwerte pro Stufe, Preis-/Bestandsstatus, Werbeaktivität und die **nächste überprüfbare Hypothese**. Hohe Nachfrage nach einer Eigenschaft, die euer Produkt nicht erfüllt, ist keine Contentchance. Der Beitrag zur [Keyword-Recherche](/blog/amazon-keyword-recherche) zeigt die Filterung an einer konkreten SKU.

Schreibt in die Aufgabenliste beispielsweise: „Für Query X fällt der Klickanteil bei stabiler Sichtbarkeit. Produktteam prüft, ob die sichtbaren Wettbewerber einen anderen Lieferumfang zeigen. Content entwirft nur dann ein neues Hauptbild, wenn die Produktdarstellung sachlich stimmt.“ Das ist bearbeitbar; „SEO optimieren“ ist es nicht.

Nach einer Änderung zieht ihr wieder dieselbe Query und ASIN-Ansicht heran. Haltet Preis, Bestand, Angebotsstatus und Werbebudget im Vergleichszeitraum fest. Das Ergebnis kann eine bessere Position zeigen; eine einzelne Vorher-nachher-Beobachtung belegt trotzdem keine eindeutige Ursache. Bei berechtigter ASIN kann ein [Content-Experiment](/blog/amazon-content-experimente) eine gezieltere Antwort geben.

Wir verbinden mit [Analytics & Reporting](/leistungen/analytics-reporting) die Diagnose mit [Listing & SEO](/leistungen/listing-seo) und [PPC](/leistungen/ppc-advertising). Für ein konkretes Query-/ASIN-Problem könnt ihr [eure Lage mit uns besprechen](/gespraech-vereinbaren).

## Quellen und Datenstand

[Amazon: Brand Analytics](https://sell.amazon.com/tools/amazon-brand-analytics), [Amazon Seller Central: SQP-Dashboard](https://sellercentral.amazon.com/help/hub/reference/external/G8J4CB5ZBF3NX7TP?locale=en-US) und [Amazon SP-API: Analytics Reports](https://developer-docs.amazon/sp-api/docs/report-type-values-analytics). Geprüft am 17. Oktober 2026. Die Flasche und alle Zahlen sind eigene Beispiele, keine Kundenergebnisse.
