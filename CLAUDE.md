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
- **Kennzahlen sind Karten** (`.kpi`), mit gruenem Trendpfeil, nicht nackte Zahlen unter einer Linie.
- **Illustrationen sind freigestellt.** Die `szene3d`-Bilder werden mit `background: "transparent"` erzeugt und sitzen ohne Platte direkt auf dem Grund. Vorher hatten sie einen Studiogrund, der als Kasten auf der Flaeche stand und die Grafik abgeschnitten wirken liess. Entweder nahtlos auf dem Grund oder klar in einer Kachel, nie ein Bild mit eigenem hellgrauen Grund auf Weiss.
- **Farbe traegt die Reihenfolge.** Wenn zwei Bloecke verschiedene Dinge sagen, unterscheiden sie sich auch farblich: `.panel-cool` fuer den ersten, das orange Band als Scharnier, `.panel-navy` fuer den zweiten. Dazu Schrittmarken (`.schritt`). Vorher war es weiss, orange, weiss, dann sprang das Auge aufs Orange und die Folge war nicht zu sehen.
- **Der CTA ist der hellste Punkt der Sektion.** `btn-primary` ist groesser als ein normaler Button und traegt einen orangen Lichthof. Orange wird nie zur Buttonflaeche.
- **Designbeispiele folgen dem Aufbau eines Listings**, nicht einem freien Raster: Hauptbild gross, darunter die sechs weiteren Bilder in zwei Spalten und drei Zeilen, rechts der A+ Content vertikal gestapelt mit Modulen im Querformat.
- **Fotos gehoeren nicht in Kameragroesse ins Repo.** `node scripts/bilder-optimieren.mjs` rechnet die Fotos unter `public` auf Anzeigegroesse herunter und schreibt WebP, die Originale wandern nach `fotos-original` ausserhalb von `public`. Die Teamfotos lagen mit bis zu 2,5 MB je Datei im Repo, zusammen 22 MB fuer eine Sektion mit Quadraten von rund hundert Pixeln.

## Design- und Bildregeln (nach Kundenfeedback verbindlich)

- **Amazon muss above the fold ankommen.** Ein Besucher darf nach zwei Sekunden nicht raten, worum es geht. Frueher stand dort nur „Wachstum ist keine Frage des Werbebudgets", das konnte jede Marketingfirma sein.
- **Keine Stationsnummerierung, keine Bauplan-Sprache.** Verboten als Sektionsbezeichnung: „Der Auftrag", „Der Befund", „Das Verfahren", „Der Umfang", „Der Nachweis", „Die Arbeiten", „Die Mannschaft", „Das Wissen", „Fuer wen", „Die Ausgangslage" in Verbindung mit einer Nummer 00 bis 09. So redet in diesem Geschaeft niemand. Sektionen tragen eine kurze normale Bezeichnung ueber der Ueberschrift (Ausgangslage, Unser Vorgehen, Leistungen, Ergebnisse, Designbeispiele, Kundenstimmen, Team, Blog) oder gar keine.
- **Kein dunkles Orange als Schriftfarbe.** `brand-700` (#C96D00) und `brand-800` (#9E5600) sind als Text verboten, das liest sich als Gold und wirkt schmutzig. Betonte Woerter in Ueberschriften bleiben dunkel und bekommen die Klasse `mark`, die einen orangen Balken unter die Grundlinie setzt. Auf dunklem Grund darf `brand-400` Text sein.
- **Kein dunkler Text auf oranger Flaeche bei Buttons.** Primaerbutton ist Navy mit weisser Schrift, die Pfeilscheibe traegt das Orange (`btn-primary`). Auf dunklem Grund kehrt es sich um: weisse Flaeche, Navy-Text (`btn-on-dark`). Orange bleibt Akzent, nie Buttonflaeche.
- **Keine schwebenden Textbloecke auf Weiss.** Inhalte sitzen in abgesetzten Flaechen: Karten, getoente Baender, dunkle Sektionen. Zwei Textbausteine ohne sichtbare Trennung nebeneinander sind ein Fehler.
- **Keine nackten Tabellen und keine Durchstreichungslisten.** Gegenueberstellungen laufen als zwei Karten, links das Uebliche gedaempft mit Kreuz, rechts die temoa-Fassung betont mit Haken.
- **Drei Bildfamilien, klar getrennt** (siehe `content/bild-prompts.json`):
  1. `szene3d`: weiche 3D-Illustrationen nach den Kundenreferenzen, freigestellt auf transparentem Grund. Leitfamilie fuer Argumentationssektionen.
  2. `produkt`: fotorealistische Produktaufnahmen fuer Hero, Designbeispiele und A+ Module. Ein durchgaengiges, frei erfundenes Produkt ohne Marke und ohne Schrift.
  3. `objekt`: die frueheren matten Einzelgegenstaende, abgeloest, nur noch Archiv.
- **Schrift gehoert nie ins generierte Bild.** Bildmodelle setzen Schrift fehlerhaft. Der Bildgrund kommt aus der Datei, jede Beschriftung zeichnet der Code darueber. Gilt auch fuer A+ Module und Listing-Nachbauten.
- **Listing-Nachbauten ohne Amazon-Oberflaeche.** Kein Amazon-Logo, kein Prime, keine Amazon-Chrome. Nur der Aufbau einer Produktseite. Beispiel-Listings werden als erfunden gekennzeichnet.
- **Keine erfundenen Leistungszahlen im Bild.** Kennzahlen stehen als belegte Angabe im Text (Ø +30 %, 21 Mio. EUR, 60+ Marken, 5+ Marktplaetze, 98 % Kundenbindung), nicht als Fantasiewert in einer Grafik.

## Farben und Sektionsfarben (Stand nach der zweiten Feedbackrunde)

- **Die farbige Sektion ist Rot, nicht Orange.** Erste Fassung war die
  Markenfarbe #FF9900 mit dunklem Text darauf. Der Kunde hat das als
  anstrengend zurueckgewiesen: dunkelbraun auf Orange kommt auf 6:1, das ist
  messbar in Ordnung und flimmert trotzdem, weil beide Toene fast gleich hell
  sind. `.ground-signal` ist jetzt ein tiefes Rot (#b81f14 bis #8f150f) mit
  weisser Schrift, 7,4:1. Damit kommt endlich das Rot aus dem Logo vor.
- **Rot heisst Problem, Gruen heisst Ergebnis.** Die Problem-Sektion jeder
  Leistungsseite ist dunkel mit rot getoenten Nummern und roter Kante oben.
  Kennzahlen, die sich verbessert haben, stehen in Gruen (#6EE7A0 auf
  dunklem Grund) mit gruenem Trendpfeil. Bei ACoS und TACoS zeigt der Pfeil
  nach unten und bleibt gruen, weil ein gefallener Wert dort gut ist.
- **Der Abschluss-CTA liegt auf der roten Flaeche**, nicht auf Navy: die
  Fusszeile ist Navy, und zwei gleiche Toene direkt uebereinander lassen
  nicht erkennen, wo die Seite endet.
- **Der Knopf in der Kopfzeile traegt die Markenflaeche**, weil Navy auf
  einer Seite voller Navy nicht als Aktion auffaellt.
- **Kein farbiger Strich oben links auf weissen Kacheln.** Das Muster stand
  auf jeder zweiten Kachel der Website und hat sie alle gleich aussehen
  lassen. Reihenfolge tragen Ziffern, Farbe sitzt auf Aufzaehlungszeichen.
- **Diagramme tragen keine erfundene Zeitachse.** „Vor der Ueberarbeitung"
  bis „Nach zwoelf Monaten" ist ein Versprechen, das niemand einloesen kann.
  Ein Schema zeigt den Mechanismus, ein Fall zeigt Zahlen, nichts dazwischen.
- **Kleingedruckte Hinweise unter Diagrammen entfallen.** Dass eine
  Darstellung schematisch ist, sieht man ihr an, wenn keine Zahl daran steht.
- **Zahlenwiederholung vermeiden.** Ø +30 %, 21 Mio. EUR und 98 % standen
  viermal auf der Startseite. Eine Zahl, die viermal dasteht, ueberzeugt
  nicht mehr, sie nutzt sich ab.
- **Jede Leistungsseite endet mit einem belegten Fall** (Komponente
  `Ergebnis` in `service/Blocks`), verlinkt auf die zugehoerige Case Study.
  Die Zahlen stammen aus `src/lib/cases.ts`, nicht aus der Fantasie.

## Bausteine der dritten Feedbackrunde

- **Es gibt genau einen Abschluss-CTA**, die Komponente `takt/Gespraech`.
  Startseite (`Termin`) und Unterseiten (`ServiceCTA`) sind nur noch Huellen
  darum. Zwei Fassungen bedeuteten, dass jede Aenderung doppelt gemacht
  werden musste und die Seiten trotzdem verschieden aussahen.
- **Der CTA ist eine Karte, keine hohe Sektion.** Links Clemens freigestellt,
  formatfuellend bis an die Unterkante, mit einer Glasplatte „Hi, ich bin
  Clemens." und einem handgezeichneten Pfeil zum Gesicht. Rechts Aussage,
  Knopf und zwei Zusagen. Vorher stand er klein in der Ecke einer sehr hohen
  Flaeche.
- **Keine Chips wie „Ohne lange Laufzeit" oder „Kostenlos und
  unverbindlich".** Der Platz traegt Zusagen mit Inhalt: was in den 30 Minuten
  passiert, was danach bei der Marke bleibt. Aussagen ueber Vertragslaufzeiten
  stehen nirgends, solange der Vertrag nicht danebenliegt.
- **`framer-motion` ueberschreibt Tailwind-Transforms.** Ein `motion.img` mit
  `-translate-x-1/2` sitzt eine halbe Breite zu weit rechts, weil das Element
  beim Einlaufen ein eigenes `transform` bekommt. Mittig wird ueber
  `inset-x-0 mx-auto` gesetzt.
- **`max-w-[NNch]` gehoert an das Textelement, nicht an die Huelle.** `ch`
  rechnet mit der Schrift des Elements; an einem `div` mit Grundschrift ergibt
  `30ch` rund 240 Pixel, und jede Ueberschrift brach in vier kurze Zeilen.
- **Die Problem-Sektion fuellt beide Spalten.** Ohne Diagramm: links Kopf und
  Schlusszeile, rechts die Punkte untereinander. Mit Diagramm: links Kopf und
  Schlusszeile, rechts das Diagramm, die Punkte darunter in zwei Spalten.
  `text-balance` bleibt in schmalen Spalten aus, es macht aus zwei vollen
  Zeilen vier Fetzen.
- **Icons zeigen die Sache selbst.** Fuer die acht Aufgaben im
  Account-Management gibt es eigene Piktogramme (`service/Aufgaben`):
  Navy-Kachel, helle Formen, ein oranges Detail, das sich beim Zeigen bewegt.
  Allgemeine Strich-Icons (Zielscheibe, Schild, Sternchen) sind dort raus, sie
  passten zum Teil gar nicht zum Text.
- **Der Globus dreht sich und traegt Flaggen** (`service/Karte`). Die
  Marktplaetze laufen als Ring um die Kugel, vorne gross und hell, hinten
  klein und blass. Flaggen sitzen bewusst nicht auf Laendern: genau das war
  der Fehler in der Referenz, dort standen Flaggen auf den falschen Laendern.
  Alles gezeichnet, kein Bildmodell.
- **Der Knopf in der Kopfzeile ist wieder Navy** (`.btn-kopf`), mit orangem
  Lichthof, einem Lichtsweep beim Hover und einer Scheibe, die von Weiss auf
  Orange umschlaegt. Rot ist auf dieser Website die Farbe fuer Probleme, nicht
  fuer die wichtigste Aktion.
- **Trendpfeile nur, wenn alle Zahlen einer Reihe einen haben.** Im
  Kennzahlenband stand der gruene Pfeil an einer von vier Zahlen und sass
  optisch vor der naechsten. Jetzt traegt die Steigerung die Farbe (gruen),
  die drei Bestandszahlen bleiben weiss, dazwischen feine Trennlinien.

## Vierte Feedbackrunde (verbindlich)

- **Die Signalfarbe ist das Logo-Rot #FF3131.** Zwei Vorfassungen waren zu
  dunkel: erst ein Rot mit Stich ins Braune, dann ein tiefes Weinrot. Beide
  waren kontraststark und trotzdem nicht die Farbe der Marke. `.ground-signal`
  laeuft jetzt von #FF3131 oben rechts nach #BD0D19 unten links, die Textzone
  liegt in der tieferen Ecke.
- **Nichts liegt als Kachel auf einem Gesicht.** Die Glasplatte mit „Hi, ich
  bin Clemens." ist vom Foto verschwunden. Die Zeile steht im Text, wo sie
  Kontrast hat, auf der Buchungsseite unter dem Bild.
- **Der handgezeichnete Pfeil endet auf dem Knopf**, nicht auf einem Kinn. Er
  haengt am Knopf (`absolute` im Knopf-Wrapper) und ragt nach links ueber das
  Bild hinaus, dadurch sitzt er auf jeder Seite richtig, egal wie lang die
  Ueberschrift ist.
- **Der Globus ist ein 3D-Bild plus Code.** Die Kugel kommt freigestellt aus
  `bilder/s-international-globus.webp`, die Marktplaetze zeichnet der Code als
  Flaggenschilder mit Leitlinie auf den Punkt. Kein Ring, nichts wird
  angeschnitten, und die Laenderliste unter der Grafik entfaellt: der Name
  steht am Land. Auf dem Telefon steht die Kugel allein, darunter die Flaggen
  mit Namen, weil Schrift in der Grafik dort fuenf Pixel gross waere.
- **Der Ablauf des Erstgespraechs stimmt jetzt.** 25 Minuten zum
  Kennenlernen, kein Blick in den Account vorab. Erst wenn es fuer beide
  Seiten passt, folgt ein zweiter Termin mit aufbereiteten Zahlen. „45
  Minuten", „30 Minuten" und „wir schauen vorab in eure Listings" sind
  ueberall raus.
- **Bewegte Piktogramme** (`service/Aufgaben`) sind das Vorbild fuer Icons in
  Kacheln. Auf der Startseite und der Full-Service-Seite bleiben die
  bestehenden Grafiken, dort sind die Icons bereits eigene Zeichnungen
  (`takt/Icons`). Aus dem allgemeinen Strich-Satz (`ui/Icon`) kommt nichts
  Neues mehr dazu.

## Fuenfte Feedbackrunde (verbindlich)

- **Rot nur fuer Probleme.** `.ground-signal` steht ausschliesslich dort, wo
  es um Fehler und Missstaende geht. Der Abschluss-CTA und die Sektion
  „Was ihr danach in der Hand habt" (`Lieferung`) sind raus aus dem Rot: der
  CTA liegt als dunkle Karte auf hellem Grund, `Lieferung` ist eine helle
  Sektion mit zwei weissen Platten.
- **Der Abschluss-CTA traegt nur das Noetigste**: Ueberschrift, Knopf, zwei
  Zusagen. Kein Absatz unter der Ueberschrift, keine Vorstellungszeile im
  Text. Wer spricht, steht am Bild, ohne Platte darunter, nur mit Schatten
  unter der Schrift.
- **Der handgezeichnete Pfeil ist geloescht.** Drei Fassungen, dreimal
  danebengegangen. Er kommt nicht zurueck.
- **Rundungen gehoeren auch an die Bildspalte.** Ein Bild mit `filter`
  bricht in manchen Browsern aus dem `overflow-hidden` der Karte aus, dadurch
  stand unten links eine eckige Ecke an einer sonst runden Karte.
- **`whileInView` niemals auf Elementen im SVG.** Ein Element im SVG hat keine
  eigene Box, der Beobachter loest dort in manchen Browsern nie aus, und die
  Grafik bleibt auf Deckkraft null stehen: die Sektion ist dann leer. Der
  Zustand haengt an der Huelle (`useInView` auf einem `div`) und wird nach
  hoechstens zwei Sekunden ohnehin gesetzt. Eine leere Flaeche ist der
  schlimmste Fehler, den eine Animation machen kann.
- **Die Globus-Sektion ist zweispaltig**: links die Grafik, rechts der Text.
  Grafik oben und Text darunter machte aus einer kurzen Aussage eine sehr
  hohe Sektion.

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
- Kundenstimmen/Reviews: Es gibt GENAU EINE Bewertungssektion (die Homepage-Section), keine abgespeckte 3-Karten-Variante. Sie steht nur noch auf der Homepage und auf der Buchungsseite. Auf allen anderen Seiten ist sie entfernt: der Kunde findet Bewertungen auf jeder Seite zu viel.
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

## Unterseiten (Stand nach dem Theme-Wechsel)

- **Eine Kopf- und Fusszeile fuer alle Seiten**: `takt/Kopfzeile` und
  `takt/Fusszeile`. Die alten `Navbar` und `Footer` sind geloescht.
- **Sektionsbezeichnung** ist ueberall die Komponente `Pille`
  (`ui/SectionHeading`): Pille mit Leuchtpunkt, keine nackte Zeile.
- **Sektionstoene** kommen aus `ground` und `ground-tint`. `bg-white` und
  `bg-[#EDF5FB]` als Sektionsgrund sind raus.
- **Abschluss-CTA** ist ueberall dasselbe dunkle Podest (`ground-deep`,
  orange Lichtkante oben, `btn-on-dark`). Die frueheren Flaechen in tiefem
  Orange-Rot (`--brand-gradient-deep`) sind weg.
- **Bilder in Sektionen** laufen ueber `SzeneBild` in `service/Blocks`:
  Pfade unter `/bilder` sind freigestellt und bekommen keinen Rahmen, Fotos
  bekommen die Platte. Fehlt ein Bild, entfaellt die Bildspalte. Es gibt
  keine grauen Kaesten mit der Aufschrift „Bild" mehr.
- **Kein Orange als Schriftfarbe**, auch nicht `brand-600` (#F08400, rund
  2,6:1 auf Weiss). Links sind Navy mit oranger Unterlaenge. Auf oranger
  Flaeche steht immer dunkler Text.
- **Leistungsseiten** haben je eine eigene freigestellte Illustration:
  `s-strategie`, `s-content`, `s-advertising`, `s-account`,
  `s-international`.
- **Designbeispiele**: solange die Referenz-Bibliothek
  (`src/data/references.json`) leer ist, zeigt die Seite den Aufbau am
  erfundenen Beispielprodukt, sichtbar gekennzeichnet. Der Aufbau ist
  links das Hauptbild, rechts die sechs Listingbilder (`listing-raster`,
  auf dem Telefon gestapelt).
- **Alte Sektionen sind geloescht.** `components/home` und
  `components/sections` enthielten 37 Vorfassungen, auf die keine Seite
  mehr zeigte. Sie kommen nicht zurueck; erhalten bleiben nur
  `sections/ComingSoon`, `sections/SocialProof` und `home/Stats`.
  Im zweiten Durchgang sind auch `lib/copy.ts`, `sections/Blocks`,
  `sections/Mocks`, `sections/Listing3D` und `ui/MockKit` gefallen: sie
  zeigten nur noch aufeinander, und `copy.ts` war voller verbotener
  Woerter (Hebel, erprobt, Gedankenstriche). Toter Code mit falschem
  Wortschatz ist gefaehrlich, weil man ihn beim naechsten Mal
  wiederverwendet.

## Branch

Entwicklung auf `claude/copy-shaerfen-website-redesign-j2lnui`.
