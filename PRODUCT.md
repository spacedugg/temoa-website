# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primäre Zielgruppe sind etablierte Marken mit eigenem Sortiment auf Amazon, ab etwa 50.000 € Amazon-Umsatz im Monat. Unterhalb dieser Schwelle läuft zu wenig Traffic über die Produkte, um belastbare Schlüsse aus den Berichten zu ziehen.

Entscheider sind Inhaber, Geschäftsführung oder die Leitung E-Commerce. Amazon ist ihr Kanal, nicht ihr Beruf. Sie kennen ACoS, TACoS, Buy-Box und FBA, sind also nicht ahnungslos. Halbwissen entsteht bei Kampagnentypen, Kampagnenstruktur und der Auswertung der Amazon-Berichte.

Situation: mehrere hundert SKUs liegen bei ein bis zwei Personen, die daneben Shop, Handel, Einkauf und Messen machen. Niemand betreut das Sortiment hauptberuflich. Der Content steht deshalb so da, wie er beim Launch angelegt wurde. Zuständig ist entweder eine kleine interne Abteilung oder eine frühere Agentur.

Verhalten auf der Website: liest nicht, scannt. Entscheidet in wenigen Minuten, ob sich ein Gespräch lohnt. Die erste Reaktion auf Ansprache ist „brauchen wir nicht", oft mit Verweis auf gute Rankings.

## Product Purpose

temoa übernimmt den kompletten Amazon-Account einer Marke: Strategie und Analyse, Content und Listings, Advertising, Account-Management sowie den Aufbau weiterer Marktplätze. Der Kunde entscheidet über die Marke, das Tagesgeschäft liegt bei temoa.

Erfolg heißt: profitables Wachstum. Der Umsatz steigt, während der Anteil der Werbekosten am Gesamtumsatz sinkt und die Marge erhalten bleibt.

Erfolg der Website: eine gebuchte Potenzialanalyse. Ein kostenloses Gespräch von etwa 30 Minuten, für das temoa vorab in den Account schaut.

## Positioning

Zwei Aussagen, die nur temoa in dieser Kombination führt:

1. **Organic First, PPC Second.** Klickrate und Conversion entscheiden, wo Amazon ein Produkt zeigt. Deshalb wird zuerst das Listing auf Klick und Kauf ausgerichtet, danach skaliert Werbung das, was ohnehin konvertiert. Werbung läuft während des Umbaus weiter, sie wird umgebaut und nicht ausgesetzt.
2. **Amazon ist ein Datenspiel.** Sobald Listings online sind und Werbung läuft, kauft die Marke Daten ein. Search Query Bericht, Amazon Ads Performance sowie die Berichte zu Verkäufen und Traffic liegen bereits im Konto. Sie müssen ausgewertet werden, sonst wird nach Geschmack optimiert.

temoa vergleicht sich nicht mit anderen Anbietern und argumentiert nie gegen das interne Team des Kunden. Der Grund für Stillstand ist Zeit und Routine mit den Berichten, nicht fehlendes Können.

## Operating Context

- Zusammenarbeit im Seller Central des Kunden. temoa arbeitet als Benutzer mit den Rechten, die die Betreuung braucht. Konto, Zugriff und Daten bleiben beim Kunden.
- Vendor Central ist nicht Teil des Angebots.
- Onboarding ist bewusst schlank: gemeinsamer Google Drive für Assets, die nicht auf Amazon liegen, Abstimmung von Umfang und Ziel, dann Start. Wettbewerbs-, Produkt- und Zielgruppenanalyse laufen intern bei temoa, ohne zusätzliche Termine beim Kunden.
- Laufende Zusammenarbeit: monatlicher Report, Strategie- und Performance-Calls, quartalsweise kündbar.
- Verkaufsprozess: Website führt auf die Potenzialanalyse, Terminbuchung über einen Cal.com-Kalender, Gespräch mit Clemens, einem der drei Gründer.

## Capabilities and Constraints

Leistungen ausschließlich in diesen fünf Bereichen:

1. Strategie und Analyse: Search Query Performance je Suchbegriff, Verkäufe und Traffic je ASIN, Wettbewerbs- und Marktanteilsanalyse, Margen- und Deckungsbeitragsrechnung je Variante, ACoS- und TACoS-Ziele, priorisierter Maßnahmenplan.
2. Content und Listings: Hauptbild, Listingbilder, A+ und Premium A+ Content, Brand Store, Brand Story, Titel, Bullets, Backend-Felder und Attribute. KI-ready für Rufus, COSMO und A10.
3. Advertising: Sponsored Products, Sponsored Brands, Sponsored Display. Kampagnenstruktur, Keywordmanagement, Gebots- und Platzierungssteuerung, Steuerung über ACoS und TACoS.
4. Account-Management: Buy-Box-Monitoring, Forecasting und Inventar, Account Health und Cases, Pricing und Margenschutz.
5. Internationalisierung: weitere Amazon-Marktplätze weltweit, je Markt eigene Keyword-Recherche, eigener Content, eigene Kampagnen.

Ausdrücklich nicht im Angebot: DSP, Bewertungs- und Review-Management, Customer Service, Google Ads, Revenue Recovery, Cloud Ads.

Verbotene Behauptungen: garantierte Rankings, BSR-Versprechen, Umsatz- oder Einkommensgarantien, erfundene Awards oder Fremdmarken. Zahlen-Claims müssen belegbar sein, Profitabilität wird als Durchschnitt ausgewiesen („Ø +30 %"). Es wird nie behauptet, dass ein Produkt automatisch auf dem nächsten Marktplatz verkauft.

Technisch: Next.js 15 App Router, React 18, TypeScript, Tailwind CSS 3, framer-motion. Hausschrift Caros liegt lokal in `src/app/fonts/`. Keine weiteren Abhängigkeiten ohne Freigabe.

## Brand Commitments

- Name: temoa, durchgehend klein geschrieben. Selbstbezeichnung „Amazon Full Service Wachstumspartner". Das Wort „Agentur" wird im Website-Text vermieden.
- Anrede im Website-Text: „ihr/euch".
- Ton: premium-souverän, ruhig, sachlich. Keine Hype-Sprache, keine Ausrufezeichen-Rhetorik, keine Umgangssprache.
- Offizieller Amazon-Advertising-Partner: bestätigt (Kundenauskunft, September 2026). Darf als Vertrauenselement verwendet werden. Hinweis: `CLAUDE.md` führt den Status noch als offen, die Stelle gehört aktualisiert.
- Schrift Caros und die bestehende Farbwelt (Amazon-Orange, Rot, Navy) sind gesetzt.
- Der freigegebene Website-Text steht in `copy/website-copy.md` und im Code. Design ändert ihn nicht.

## Evidence on Hand

- Vier freigegebene Case Studies mit echten Zahlen in `src/lib/cases.ts`: Vitaworld, HaA, FUTUM sowie eine anonymisierte Marke aus dem Gartenzubehör. Inklusive Monatsverlauf für Umsatz und TACoS bei Vitaworld.
- Sieben echte Kundenstimmen im Originalwortlaut in `src/lib/testimonials.ts`, mit Porträtfotos unter `public/clients/`.
- 14 Kundenlogos unter `public/clients/`.
- Echte Teamfotos unter `public/team/`, zwölf namentlich genannte Personen plus Collage.
- Designbeispiele werden zur Laufzeit aus der Sales-Room-Datenbank bzw. einem Snapshot geladen: Produktbilder, A+ Content, Brand Stores, Brand Stories.
- 82 Blogartikel unter `content/blog`.
- Kennzahlen des Unternehmens: Ø +30 % Profitabilitätssteigerung, 21 Mio. € betreuter Amazon-Jahresumsatz, 60+ betreute Marken, 5+ internationale Marktplätze, 98 % Kundenbindung.
- Nicht vorhanden und nicht zu erfinden: Hero-Bild, Sektionsbilder auf Homepage und Leistungsseiten, Header-Bilder der Service-Seiten. Diese Flächen sind bewusst Platzhalter, bis der Kunde Material liefert.

## Product Principles

1. Beweis vor Behauptung. Jede Aussage steht auf einer Zahl, einer benannten Tätigkeit oder einer Kundenstimme.
2. Der Besucher ist überlastet, nicht ahnungslos. Nichts erklären, was die Zielgruppe ohnehin weiß.
3. Struktur vor Text. Seiten sind scannbar: kurze Sektionen, Karten, Spalten, Visuals. Kein Fließtext, wo schnelle Wirkung zählt.
4. Jede Sektion beantwortet genau einen Einwand. Steht keiner dahinter, fehlt der Sektion der Grund.
5. Ruhe ist Teil des Angebots. Ein Anbieter, der Profitabilität über Umsatz stellt, darf nicht wie eine Performance-Anzeige aussehen.

## Accessibility & Inclusion

Keine formale Vorgabe vom Kunden. Als Arbeitsgrundlage gelten trotzdem die Grundlagen: lesbare Kontraste im Fließtext, sichtbare Fokus-Zustände, vollständige Tastaturbedienung und Respekt vor `prefers-reduced-motion`. Wo ein Kontrastwert der gewünschten Optik im Weg steht, wird die Abweichung bewusst entschieden und hier vermerkt.
