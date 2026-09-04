# temoa Website (Neuaufbau)

Wir bauen die Website der Amazon-Agentur **temoa** von Grund auf neu. Der bestehende Repo-Inhalt wird bewusst ignoriert; Copy und Inhalte entstehen komplett neu.

**Arbeitsweise:** Schritt für Schritt, Sektion für Sektion. Vor dem Weiterbauen holt sich Claude die Freigabe des Kunden. Bilder sind zunächst Platzhalter (keine generierten Bilder, solange nicht anders gewünscht). Claude agiert als Copywriter und Stratege, fordert den Kunden heraus wie ein Mentor und redet ihm nicht nach dem Mund.

## Globale Schreib- und Stilregeln

Gelten fuer ALLES: Website-Texte UND Chat-Antworten an den Kunden.

1. **Keine Gedankenstriche (em dash "—"). Niemals.** Stattdessen Komma, Punkt oder Doppelpunkt. Nach jedem fertigen Deliverable das gesamte Ergebnis nach em dashes durchsuchen und ersetzen.
2. **Keine KI-typischen Floskeln.** Verboten u. a.: "unlock your potential", "elevate your journey", die "nicht X, sondern Y"-Konstruktion ("not because of this, but because of that"), "transform your life", "dive deep", "game-changer", "here's the thing", "let's be honest", "it's no secret", "navigate", "leverage", "landscape", "holistic". Wenn ein Satz klingt, als haette ihn ChatGPT geschrieben: neu schreiben.
3. **Die Stimme des Kunden treffen.** Tonalitaet wird aus den Kundenantworten abgeleitet und hier ergaenzt, sobald sie feststeht.

## Tonalitaet & Stimme (temoa)

- Anrede in Website-Texten: "ihr/euch". Im Chat mit dem Kunden: "du".
- Ton: premium-souveraen, ruhig, sachlich. Keine Hype-Sprache, keine Ausrufezeichen-Rhetorik.
- KEINE umgangssprachlichen oder vulgaeren Ausdruecke. Verboten z. B.: "Geld in Werbung pumpen", "ins Werbebudget pumpen". Stattdessen nuechtern formulieren.
- Above-the-fold/Hero: knapp halten. Kein unnoetiger Text, keine Microcopy unter dem Haupt-CTA.

## Theme „Studio" (verbindlich, ersetzt „Taktplan")

Das frühere Theme hiess „Taktplan": eine mitlaufende orange Linie am linken Rand, Stationsnummern 00 bis 09, flache weisse Sektionen. Der Kunde hat es verworfen. Referenz sind die von ihm gelieferten Beispielbilder: weiche 3D-Renderings, Glasplatten, gluehende orange Verbindungen, isometrische Navy-Podeste.

- **Kein Balken am linken Rand.** Die Komponente `TaktLine` ist geloescht und darf nicht zurueckkommen.
- **Der Grund ist nie reinweiss.** Drei Toene, in `globals.css` definiert: `.ground` (heller Verlauf mit warmem Lichtkern), `.ground-tint` (kraeftiger getoent), `.ground-deep` (dunkles Navy-Podest, immer mit `.on-dark`). Die Toene wechseln ueber die Seite, damit Sektionen als Bloecke lesbar sind.
- **Inhalte liegen auf Platten, nie frei im Weissraum.** `.panel` (weiss, gestaffelter Schatten, Lichtkante oben), `.panel-lift` (Hover), `.panel-dark` und `.panel-dark-accent` auf dunklem Grund. Grosse Radien, 1,75 rem an Platten.
- **Keine Haarlinien-Listen.** Die frueheren Zeilen zwischen zwei Linien (`RuledRow`) sind durch `Karte` ersetzt: Icon-Kachel, kurze Ueberschrift, ein Satz. Icons kommen aus `src/components/takt/Icons.tsx`, Navy-Form mit einem orangen Detail.
- **Zusammenhaenge werden gezeichnet, nicht beschrieben.** `.link-glow`, `.link-glow-v`, `.node-glow`, `.halo` und die Podest-Illustrationen. Kein Fliesstext, der erklaert, was ein Bild zeigen kann.
- **Sektionsbezeichnung** ist eine Pille mit Leuchtpunkt (`Eyebrow`), keine nackte Zeile.
- **Illustrationen der Familie `szene3d` brauchen eine weisse Platte.** Ihr Studiogrund ist nicht exakt weiss und stuende auf getoentem Grund als Kasten. Deshalb immer in ein `.panel` setzen und mit `[mix-blend-mode:multiply]` einbinden.
- **Kennzahlen sind Karten** (`.kpi`), mit gruenem Trendpfeil, nicht nackte Zahlen unter einer Linie.

## Design- und Bildregeln (nach Kundenfeedback verbindlich)

- **Amazon muss above the fold ankommen.** Ein Besucher darf nach zwei Sekunden nicht raten, worum es geht. Frueher stand dort nur „Wachstum ist keine Frage des Werbebudgets", das konnte jede Marketingfirma sein.
- **Keine Stationsnummerierung, keine Bauplan-Sprache.** Verboten als Sektionsbezeichnung: „Der Auftrag", „Der Befund", „Das Verfahren", „Der Umfang", „Der Nachweis", „Die Arbeiten", „Die Mannschaft", „Das Wissen", „Fuer wen", „Die Ausgangslage" in Verbindung mit einer Nummer 00 bis 09. So redet in diesem Geschaeft niemand. Sektionen tragen eine kurze normale Bezeichnung ueber der Ueberschrift (Ausgangslage, Unser Vorgehen, Leistungen, Ergebnisse, Designbeispiele, Kundenstimmen, Team, Blog) oder gar keine.
- **Kein dunkles Orange als Schriftfarbe.** `brand-700` (#C96D00) und `brand-800` (#9E5600) sind als Text verboten, das liest sich als Gold und wirkt schmutzig. Betonte Woerter in Ueberschriften bleiben dunkel und bekommen die Klasse `mark`, die einen orangen Balken unter die Grundlinie setzt. Auf dunklem Grund darf `brand-400` Text sein.
- **Kein dunkler Text auf oranger Flaeche bei Buttons.** Primaerbutton ist Navy mit weisser Schrift, die Pfeilscheibe traegt das Orange (`btn-primary`). Auf dunklem Grund kehrt es sich um: weisse Flaeche, Navy-Text (`btn-on-dark`). Orange bleibt Akzent, nie Buttonflaeche.
- **Keine schwebenden Textbloecke auf Weiss.** Inhalte sitzen in abgesetzten Flaechen: Karten, getoente Baender, dunkle Sektionen. Zwei Textbausteine ohne sichtbare Trennung nebeneinander sind ein Fehler.
- **Keine nackten Tabellen und keine Durchstreichungslisten.** Gegenueberstellungen laufen als zwei Karten, links das Uebliche gedaempft mit Kreuz, rechts die temoa-Fassung betont mit Haken.
- **Zwei Bildfamilien, klar getrennt** (siehe `content/bild-prompts.json`):
  1. `produkt`: fotorealistische Produktaufnahmen fuer Hero, Designbeispiele und A+ Module. Das ist die Familie, die Amazon-Wirkung erzeugt. Ein durchgaengiges, frei erfundenes Produkt ohne Marke und ohne Schrift.
  2. `objekt`: die reduzierten matten 3D-Gegenstaende, nur noch als Akzent in Argumentationssektionen.
- **Schrift gehoert nie ins generierte Bild.** Bildmodelle setzen Schrift fehlerhaft. Der Bildgrund kommt aus der Datei, jede Beschriftung zeichnet der Code darueber. Gilt auch fuer A+ Module und Listing-Nachbauten.
- **Listing-Nachbauten ohne Amazon-Oberflaeche.** Kein Amazon-Logo, kein Prime, keine Amazon-Chrome. Nur der Aufbau einer Produktseite. Beispiel-Listings werden als erfunden gekennzeichnet.
- **Keine erfundenen Leistungszahlen im Bild.** Kennzahlen stehen als belegte Angabe im Text (Ø +30 %, 21 Mio. EUR, 60+ Marken, 5+ Marktplaetze, 98 % Kundenbindung), nicht als Fantasiewert in einer Grafik.

## No-Gos / Claims (rechtlich + inhaltlich)

- Leistungen ausschliesslich: Sponsored Products, Sponsored Brands, Sponsored Display. KEIN DSP, kein Bewertungs-/Review-Management, kein Customer Service, keine Google Ads, kein Revenue Recovery, keine Cloud Ads.
- Keine garantierten Rankings, keine BSR-Versprechen, keine Umsatz- oder Einkommensgarantien.
- Keine angedeutete Amazon-Partnerschaft ueber das real Zutreffende hinaus. Status "offizieller Amazon-Advertising-Partner" ist offen; bis geklaert nicht behaupten.
- Keine erfundenen Awards, Dollar-Werte oder Fremdmarken.
- Zahlen-Claims muessen belegbar sein. Profitabilitaet wird als Durchschnitt ausgewiesen: "Ø +30 %".

## Copy-Handwerk

- Wort "Agentur" im Website-Text vermeiden. NIE mit anderen Agenturen oder Anbietern vergleichen. temoa steht fuer sich (Wachstumspartner).
- Verbotenes Wort: "traegt" / "traegt sich". Auf Amazon wird verkauft, konvertiert, es werden Verkaeufe generiert. Nichts "traegt sich".
- Verbotenes Wort: "Bildwelt". Stattdessen: Produktbilder, Hauptbild, Amazon A+ / Premium A+ Content, Brand Store, Markengeschichte (Brand Story).
- Verbotenes Wort: "Hebel" und jede Hebel-Analogie. Wir "hebeln" nichts; PPC wird nicht "zum Hebel".
- Verbotene Woerter: "ausrollen" / "Rollout" und "erprobt" / "erprobtes Setup". Wir "rollen" nichts aus und nennen nichts "erprobt".
- Internationalisierung: NIE behaupten, was in einem Markt verkauft, verkaufe automatisch im naechsten (das ist falsch). Kernaussage: Jeder Marktplatz ist ein eigener Markt und bekommt die komplette Arbeit neu (eigene Keyword-Recherche, eigener Content, eigene Kampagnen). Nicht auf Europa/USA begrenzen, es geht um Amazon-Marktplaetze weltweit.
- Kundenstimmen/Reviews: GENAU EINE Bewertungssektion (die Homepage-Section) wird unveraendert auf jede Seite dupliziert. Keine abgespeckte 3-Karten-Variante.
- KI-Suche mitdenken: Content KI-ready fuer Rufus, COSMO und A10 (nicht Keywords stapeln, sondern Relevanz zeigen).
- Kern-Argument Organic First: Listing zuerst auf Klickrate (CTR) und Conversion (CVR) optimieren, das sind die wichtigsten Ranking-Signale. Sonst bleibt PPC-Abhaengigkeit, Klicks werden jaehrlich teurer, Margen enger (Negativspirale).
- Ueberschriften kurz, knackig, konkret. Keine generischen Floskeln, die nach etwas klingen, aber nichts sagen (Negativbeispiele: "Klarheit ueber Zahlen, Markt und Ziele", "Werbung, die Profitabilitaet bringt").
- Satzbau variieren. Die Konstruktion "[Nomen], die/das [Relativsatz]" nur sparsam (nicht in Serie: "Listings, die verkaufen" + "ein Konto, das laeuft" + ...).
- Richtige Kollokation: Symptome werden bekaempft, Ursachen werden behoben.
- Homepage muss sofort catchen. Kein Fliesstext, wo schnelle Wirkung zaehlt. Inhalte veranschaulichen (Listen, Tabellen, Visuals) statt ausformulieren.
- Nichts erklaeren, was die Zielgruppe ohnehin weiss (z. B. PPC = Sponsored Products/Brands/Display nicht ausbuchstabieren).
- Zielgruppe sind etablierte Marken / Brands, NICHT "Seller" (klingt nach FBA-Seller). Wort "Seller" im Website-Text vermeiden.
- Verbotenes Wort: "Niveau". Tiefe und Koennen durch konkrete Taetigkeiten zeigen, nicht behaupten.
- Verbotene Formulierung: "das man sieht" / "etwas, das man sieht".
- Verbotenes Wort: "haengenbleiben" / "haengen bleibt" (salopp, missverstaendlich).
- Verbotenes Wort: "Ausschnitt" fuer einen Verantwortungsbereich. Stattdessen: Bereich, Abteilung, Themenbereich.
- Struktur vor Text: Seiten scannbar und scroll-freundlich bauen (kurze Sektionen, Karten, Spalten, Visuals, Callouts). Kein Fliesstext, keine nackten Tabellen, wenn eine gestaltete Sektion besser passt.
- Verbotenes Wort: "ganzheitlich" (= "holistic", KI-Floskel). Konkret benennen, was abgedeckt ist.
- Verbotene Schluss-Floskeln: "genau hier setzen wir an", "genau das machen wir anders", "genau so", "genau das". Schlussfolgerungen anders formulieren.
- CTA-Sektionen je Seite/Thema unterschiedlich formulieren (Ueberschrift variieren), der Button-Text bleibt "Potenzialanalyse buchen".
- Nur ACoS und TACoS nennen, nicht zusaetzlich ROAS (ROAS = Kehrwert der ACoS, in Amazon-Sprache redundant).
- Niemals ein Komma vor "und".
- Keine Wortwiederholungen, vor allem keine Spezialbegriffe doppelt (z. B. "Deckungsbeitrag je Produkt", "taeglich optimieren", "ueber den TACoS steuern"). Einen Begriff einmal verwenden, danach variieren.
- Keine zwei Sektionen mit derselben Kernaussage (Beispiel-Fehler: "Profit-First" plus "Steuerung auf Profit"). Jede Sektion ein eigener Gedanke.
- Keine leeren Formulierungen (Negativbeispiele: "echter Gewinn", "wenn jeder Werbe-Euro arbeitet"). Konkret werden.
- Nicht "einen Account fuehren" oder "einen Account uebernehmen" (klingt nach Kontrolle abgeben). Stattdessen das operative Tun benennen: Tagesgeschaeft, Buy-Box, Bestand, Pricing, Konto-Gesundheit steuern.

## Homepage-Struktur (aktueller Stand)

Navigation (sticky): Logo · Full Service (Mega-Menue, klappt 5 Services aus, selbst klickbar zur Uebersichtsseite) · Case Studies · Designbeispiele · CTA "Potenzialanalyse buchen"

1. Hero (Amazon in der ersten Zeile, Versprechen, CTA "Potenzialanalyse buchen", Zweit-CTA "Case Studies ansehen", rechts ein Listing-Nachbau mit echten Produktbildern)
2. Credibility-Band (Kundenlogos + Zahlen: Ø +30 % Profitabilitaet, 21 Mio EUR betreuter Jahresumsatz, 60+ betreute Marken, 5+ Marktplaetze)
3. Problem (kurz, knackig, visuell: "Das Noetigste reicht nicht" + Pain-Liste, fuehrt mit Zeitmangel; KEIN "nebenbei")
4. Mechanismus Organic First, PPC Second + Alt/Neu-Tabelle (Spalten "Wie es jetzt laeuft" vs "Wie temoa arbeitet"; kein Wort "Agentur")
5. Full Service (5 Leistungen, Link zur Uebersicht)
6. Case Studies (4 Stueck nebeneinander auf Desktop, untereinander auf Mobile)
7. Designbeispiele (ein komplettes Listing: 1 Hauptbild + 6 Listingbilder, daneben A+ Content schwebend in 3D mit weichen Schatten)
8. Kundenstimmen (animierte, scrollbare Sektion, ca. 5 sichtbar)
9. Finaler CTA (Angebot + Risk-Reversal: ohne lange Laufzeiten, 98 % Kundenbindung)
10. Team-Block (NACH dem CTA, da CTA wichtiger; Teambilder + Ueberschrift + kurzer Nebensatz)
11. Blog-Streifen (schmal, Platzhalter-Themen, Kunde liefert spaeter)
12. Footer

**Call-Buchen-Unterseite:** Prozessablauf, FAQ, Einbindung des Cal.com-Kalenders.

## Branch

Entwicklung auf `claude/pensive-turing-llpu6b`.
