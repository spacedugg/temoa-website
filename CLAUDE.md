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

## Sechste Feedbackrunde (verbindlich)

- **Die Marktplatzkarte ist eine echte Landkarte.** Umrisse aus Natural Earth,
  `node scripts/europa-karte.mjs` rechnet sie in eine Lambert-Projektion und
  schreibt `src/components/service/europa-geo.ts`. Ausschnitt Portugal bis
  Polen, kein Globus und keine Weltansicht. Gezeigt werden die Pan-EU-Maerkte
  (DE, FR, IT, ES, NL, BE, PL, SE), dazu Grossbritannien und ein Verweis auf
  die USA. Kein Kanada, kein Mexiko. Jede Flagge sitzt auf ihrem Land, von
  Deutschland laufen Lichtpunkte dauerhaft in die anderen Maerkte.
- **Keine Kasten-in-Kasten-Sektionen.** Wenn eine Sektion eine eigene Farbe
  traegt, laeuft der Inhalt ueber die Breite und liegt nicht noch einmal in
  einer Box darin. Das Kennzahlenband ist deshalb eine Navy-Sektion ohne
  Innenkarte.
- **Der Abschluss-CTA darf hoch sein**, aber Bild, Ueberschrift, Knopf und
  Zusagen muessen zusammen in einen Bildschirm passen, am Telefon wie am
  Rechner.
- **Weisse Kacheln tragen ein bewegtes Piktogramm** aus
  `service/Piktogramme.tsx`, keine leeren Kacheln und nichts aus dem
  allgemeinen Strich-Satz. Auf der Startseite und der Full-Service-Seite
  bleiben die bestehenden Grafiken, dort sind die Zeichen schon eigene
  Zeichnungen.
- **Der Hero zeigt Wachstum, kein Produkt.** Rechts die freigestellte
  Wachstumsszene (`bilder/h-wachstum.webp`), die leise schwebt und zum Zeiger
  kippt. Der Listing-Nachbau ist raus.
- **Im Hero steht sozialer Beleg, keine Kennzahlkarten.** Drei echte
  Kundengesichter aus den Kundenstimmen, fuenf Sterne, eine Zeile. Die drei
  dunklen Kennzahlkarten sind weg: sie setzten drei weitere Farbakzente neben
  den Knopf, der der einzige Blickfang sein soll. Portraits sind nur die
  Bilder mit `art: "person"`, zwei der Kundenbilder sind Buchstabenkacheln.

## Siebte Feedbackrunde (verbindlich)

- **Keine Kachel in der Kachel, nirgends.** Eine Sektion mit eigener Farbe
  traegt ihren Inhalt direkt, nicht noch einmal in einem Kasten, und darin
  nicht noch einmal in Kacheln. Umgestellt: Kennzahlenband (Startseite und
  Case Studies), Zahlenband und Kalender auf der Buchungsseite, die 98 %
  mit der Kundenstimme, das Kundenband auf der Startseite. Wo eine weisse
  Flaeche noetig ist (Kalender-Einbettung), traegt die Sektion denselben
  hellen Ton wie die Nachbarn, damit die Flaeche nicht als Kasten liest.
  Ausnahme mit Absicht: der Abschluss-CTA ist eine Karte, das ist so
  beschlossen.
- **Die Marktplatzgrafik ist eine Kugel.** Orthografische Projektion mit Blick
  auf den Nordatlantik (`scripts/europa-karte.mjs`), dadurch sind Europa und
  die Ostkueste der USA gleichzeitig zu sehen und der Bogen ueber den Atlantik
  ergibt Sinn. Gitternetz, Lichtkante und Schattenseite machen aus der Scheibe
  eine Kugel. Die Schilder stehen neben der Kugel mit einer Linie auf ihren
  Punkt: auf der Kugel ist Europa zu klein fuer neun Beschriftungen. Die
  Aufzaehlung der Laender unter dem Text ist raus, die Namen stehen an den
  Schildern.
- **Die Hero-Grafik ist eine Komposition**, kein einzelnes Bild: Produktseite
  im Vordergrund, zwei belegte Kennzahlen als Karten darueber, die
  Wachstumsszene dahinter. Keine Amazon-Oberflaeche, keine erfundenen Zahlen,
  keine Schrift aus dem Bildmodell.

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

## Siebte Feedbackrunde (verbindlich)

- **Die Marktplatzgrafik ist ein Ausschnitt einer Kugel, keine Scheibe.**
  Die Kugel ist groesser als der Rahmen und deckt ihn ab: oben, unten und
  links laeuft sie hinaus, es gibt keinen sichtbaren Rand und keine
  Lichtkante. Ein Rechteck im aeussersten Ton des Verlaufs liegt hinter der
  Kugel, damit in den Ecken kein Stueck helle Seite steht.
- **Der Ausschnitt reicht bis an den Bildschirmrand**, ohne dass etwas
  abgeschnitten wird: der negative Rand links ist genau der Rand des
  Containers (`-ml-[calc(max(2rem,(100vw-80rem)/2+2rem))]`). Ein glatter
  `-ml-[18vw]` sieht auf einem Bildschirm richtig aus und schneidet auf dem
  naechsten die USA ab.
- **Weiche Kanten statt harter.** Die Grafik laeuft oben, unten und zum Text
  hin ueber eine Maske aus. Zwei verschachtelte Huellen, weil ein Element nur
  eine Maske traegt: aussen senkrecht, innen waagerecht. `mask-composite`
  kann nicht jeder Browser.
- **In einem Ausschnitt liegen die Schilder auf der Kugel**, nicht daneben:
  neben der Woelbung waere kein Platz, ohne dass die Kugel wieder klein wird.
  Die neun europaeischen Schilder stehen als Spalte ueber dem Atlantik, die
  USA tragen ihres neben dem Punkt. Leitlinien sind hell, nicht dunkel: sie
  laufen ueber dunkles Blau.
- **Ringe, die groesstenteils hinter dem Horizont liegen, fallen weg.** Punkte
  auf der Rueckseite werden auf den Rand gezogen, damit Kuesten nicht
  abreissen. Aus einer Inselkette hinter dem Horizont wird dadurch ein
  Schmierstreifen am Rand, wenn ein einziger sichtbarer Punkt schon reicht.
- **Kein dunkles Zeichen auf oranger Flaeche, nirgends.** Betroffen waren die
  Schrittmarke `.schritt-orange` (dunkle Ziffer auf Orange, jetzt Navy mit
  weisser Ziffer und orangem Ring), die Bruecke und die Haken in
  `Lieferung`, das Kennzahlenband, der Einkaufswagen im Hero und die Scheiben
  der Knoepfe. Geprueft wird das nicht per Auge, sondern indem man jede Seite
  im Browser nach Elementen mit oranger Flaeche durchgeht und deren Text-,
  `stroke`- und `fill`-Farbe auf Helligkeit prueft.
- **Ausgenommen ist der Textmarker `.mark`**: der orange Balken sitzt unter
  der Grundlinie, die Schrift steht nicht darauf.

## Achte Feedbackrunde (verbindlich, ersetzt die Ausschnitt-Regeln)

- **Die Marktplatzgrafik ist eine runde Kugel auf dem Grund der Seite.** Kein
  rechteckiger Ausschnitt, keine Maske, kein weiches Auslaufen an den Kanten.
  Der Kunde hat den Ausschnitt mit Auslauf verworfen: er sah aus wie ein
  schlecht freigestelltes Bild. Der Kreis steht mit einem Schatten darunter
  frei auf der Flaeche, sonst nichts.
- **Die Kugel ist nah an Europa herangefahren.** Der Radius (1750) ist ein
  Vielfaches des sichtbaren Kreises (470), dadurch sind Deutschland,
  Frankreich, Spanien und Italien gross genug, dass eine Flagge im Land
  stehen kann. Gitternetz, Lichtkante und Schattenseite machen daraus eine
  Kugel und keine Landkarte.
- **Die Flagge steckt im Land.** Keine Pillen am Bildrand, keine Leitlinien
  vom Schild auf ein Land. Wo zwei Laender zu klein und zu nah beieinander
  liegen (Niederlande, Belgien), sitzt die Flagge daneben, ohne Linie. Der
  Name erscheint beim Zeigen ueber der Flagge.
- **Die USA stehen als eigener Punkt unter der Kugel**, mit einem gestrichelten
  Bogen vom westlichen Rand dorthin. Bei diesem Zoom liegt Amerika hinter dem
  Horizont; eine Flagge im Atlantik waere schlicht falsch.
- **Das Schweben liegt auf der ganzen Grafik**, nicht auf der Kugel allein:
  sonst wandert die Kugel unter den Flaggen weg.

## Neunte Feedbackrunde (verbindlich)

- **Der Hero traegt ein freigestelltes 3D-Bild, keinen Nachbau aus Code.**
  Der Listing-Nachbau war eine weisse Karte auf hellem Grund: er stand nicht im
  Bild, er fiel hinein, und die Sektion darunter ist ebenfalls hell. Jetzt
  `bilder/h-buehne.webp` im Stil der uebrigen Bilder, dunkle Koerper auf hellem
  Grund. Die beiden schwebenden Kennzahlkarten sind ersatzlos raus.
- **Bewegung macht der Code, nicht das Bild**: schweben, zum Zeiger kippen
  (`Neigung`), ein Lichthof, der leise atmet.
- **Generierte Bilder brauchen `"transparent": true`** in
  `content/bild-prompts.json`. Ohne das Feld malt das Modell das Karomuster als
  Hintergrund ins Bild, und auf der Seite steht ein Schachbrett.
- **Der Verlauf ist ein isometrischer Stapel auf dunklem Grund**, nicht eine
  flache Flaeche ueber die ganze Breite. Er steht neben der Aussage, nicht
  darunter. Unten der Umsatz ueber Werbung, ueberall gleich hoch, darueber der
  organische Umsatz, der waechst, dazu eine waagerechte Hoehenlinie hinter den
  Saeulen. Kein Zeitstrahl, keine Werte.
- **Das Ergebnisband zwischen den beiden Schritten ist weiss mit orangem Ring
  und orangem Lichthof**, dazu `z-10`. Vorher war es Navy und lag damit auf
  derselben Farbe wie die Platte darunter, davor Orange mit dunkler Schrift.
- **Kleine Haken sind weiss auf Navy.** Ein oranges Zeichen in einem Kreis von
  20 Pixeln auf dunklem Grund ist nur ein Fleck. Orange bleibt Akzent auf
  Flaechen und Ringen, nicht auf kleinen Zeichen.
- **Gegenueberstellungen tragen eine eigene Ueberschrift.** Zwei weisse Karten
  ohne Ansage auf hellem Grund gehen unter. Die temoa-Karte ist die betonte:
  oranger Lichtsaum und kraeftigerer Schatten.
- **Bilder in Kacheln bekommen eine eigene Spalte**, wenn sie etwas zeigen
  sollen. In der Ecke neben einer Ueberschrift sind sie Dekoration.

## Zehnte Feedbackrunde (verbindlich, ersetzt alle Globus-Regeln davor)

Der Kunde hat neun Fassungen der Marktplatzgrafik verworfen und dann eine
Referenz geschickt. Der Fehler in allen neun war derselbe: die Kugel war
dunkel und damit eine andere Bildfamilie als die uebrigen Illustrationen.

- **Die Kugel ist hell**, matt, auf hellem Grund: Verlauf von fast Weiss oben
  links nach gedaempftem Blaugrau unten rechts. Kein dunkles Blau, kein Glas,
  kein Glanzpunkt. Das Land ist eine helle Silhouette mit feinem Punktraster,
  das gibt der Flaeche Material, ohne dass eine zweite Farbe dazukommt.
- **Keine Bewegung.** Die Grafik steht still. Ohne Animation sieht sie besser
  aus, und sie muss nichts vorfuehren.
- **Der Blick geht weit in den Atlantik hinaus** (Mitte 50 Grad West, 36 Grad
  Nord). Dadurch liegt Europa rechts am Rand und Nordamerika in der Mitte,
  beides ist gleichzeitig zu sehen, und der Bogen ueber den Atlantik ergibt
  Sinn. Europa ist dabei stark verkuerzt, das gehoert zu dieser Ansicht.
- **Die ganze Kugel steht im Bild**, mit einem weichen Schatten darunter. Kein
  Ausschnitt, keine Maske, kein Rahmen, keine Platte.
- **Die Schilder tragen Flagge und Laenderkuerzel**, nicht den ganzen Namen:
  neun Namen um ein kleines Europa herum sind eine Wand aus Schrift. Sie
  stehen im Kranz um Europa und zeigen mit einem kurzen hellen Stiel auf ihren
  Punkt. Der Punkt ist ein oranger Leuchtpunkt auf dem Land.
- **Auf dem Telefon entfallen die Schilder**: darin waere die Schrift acht
  Pixel gross. Dort tragen Punkte die Kugel und die Namen stehen als Liste
  darunter.
- **Erzeugt wird die Geometrie von `scripts/welt-karte.mjs`** nach
  `src/components/service/welt-geo.ts`. Marktplaetze werden feiner
  vereinfacht als die Umgebung, damit ihre Form stimmt.

## Elfte Feedbackrunde (verbindlich)

- **Die fuenf Leistungen heissen ueberall gleich**: Strategie, Produktbilder &
  SEO, PPC Advertising, Account Management, Internationalisierung. Alte Namen
  („Strategie & Analyse", „Content & Listings", „Advertising / PPC",
  „Account-Management") sind raus, in Kopfzeile, Fusszeile, Startseite,
  Full-Service-Seite, Leistungsseiten und deren Metadaten. Die Adressen der
  Seiten bleiben unveraendert (`/leistungen/listing-seo`,
  `/leistungen/ppc-advertising`), sonst brechen Verweise und Suchergebnisse.
  Ausgenommen sind die Schrittmarken der Grafik `takt/Zusammenlauf`: fuenf
  Kacheln von rund achtzig Pixeln tragen dort weiter Kurzformen.
- **In den Designbeispielen steht echte Arbeit, kein erfundenes Produkt.** Das
  Listing fuer Miganeo (sieben Bilder, sechs Module Premium A+ Content) liegt
  unter `public/bilder/miganeo`. Sobald freigegebene Arbeit vorliegt, hat ein
  erfundenes Beispiel auf der Seite nichts mehr zu suchen. Betroffen sind die
  Startseite (`takt/sections`, `Arbeiten`) und der Rueckfall der Seite
  Designbeispiele (`design/DesignGallery`).
- **Die Bilder tragen ihre Beschriftung selbst.** Die Regel „Schrift gehoert
  nie ins Bild" gilt fuer erzeugte Grafiken. Ausgelieferte Kundenarbeit wird
  gezeigt, wie sie auf Amazon steht.
- **Die Spaltenbreite der Designbeispiele ist gerechnet, nicht geschaetzt.**
  Links ergibt sich die Hoehe aus 1,25 Breiten fuers Hauptbild (4:5) und drei
  halben Breiten fuer die sechs Quadrate, rechts aus sechs Modulen im
  Verhaeltnis 1400:574. Gleichgesetzt fuehrt das auf 0,884 zu 1, und beide
  Spalten enden auf derselben Hoehe. Vorher fuellte eine Platte in der rechten
  Spalte den Rest auf; die Platte steht jetzt ueber die volle Breite unter
  beiden Spalten.
- **A+ Module liegen ohne Abstand untereinander.** Auf der Produktseite laufen
  sie ineinander; mit Luft dazwischen fallen der Kopf und das erste Bild
  auseinander.
- **Clemens steht auf Orange, nicht auf Blau.** Die Portraetspalte des
  Abschluss-CTA lag als dunkelblaues Feld in einer dunkelblauen Karte, damit
  hob sich das Portrait nicht ab. Der Grund ist jetzt orange, im CTA
  (`takt/Gespraech`) und auf der Buchungsseite (`booking/BookingBody`)
  derselbe Verlauf.
- **Die Zeile am Bild bekommt einen Grund, keine Platte.** „Hi, ich bin
  Clemens." stand mit einem Schatten frei auf dem Foto. Der Fuss der Spalte
  laeuft jetzt ueber die unteren 36 Prozent ins Dunkelbraun aus. Braun und
  nicht Navy: auf einer orangen Flaeche liest sich Braun als ihr eigener
  Schatten, Navy als zweite Farbe. Eine Kachel auf dem Gesicht bleibt
  verboten.
- **Kundenbilder kommen als WebP in Anzeigegroesse ins Repo**, nicht in
  Kameragroesse: 1200 px fuers Hauptbild, 700 px fuer die Listingbilder,
  1400 px fuer die A+ Module. Aus 45 MB JPG werden so 1,5 MB.

## Zwoelfte Feedbackrunde (verbindlich, Startseite)

- **Die Reihenfolge der Startseite ist: Hero, Kundenband, Leistungen, Case
  Studies, Ausgangslage mit Ursache, Unser Vorgehen, Designbeispiele,
  Kundenstimmen, Abschluss-CTA, Team.** Vorher stand die Ausgangslage vor den
  Leistungen: ein Besucher las zuerst, was bei ihm schiefliegt, und erfuhr
  erst danach, was wir tun. Der Blog-Streifen am Fuss ist ersatzlos raus, mit
  ihm die Komponente `Wissen`.
- **Das Kundenband traegt Navy.** Es lag im selben hellen Ton wie der Hero,
  damit hatte der Hero keine Unterkante. Die Logos sind weisse Silhouetten
  (`brightness-0 invert`). Zwei der vierzehn Dateien sind „Knockout", der
  Schriftzug ist in eine gefuellte Flaeche gestanzt: als Silhouette werden sie
  zu einem weissen Klecks, deshalb bleiben sie in ihrer Farbe (`KNOCKOUT` in
  `takt/sections`). Rot waere hier falsch, Rot ist die Farbe fuer Probleme.
- **Die Case Studies sind ein Band aus fuenf Streifen**, die sich die Breite
  teilen. Beim Zeigen wird einer breit, die anderen weichen zurueck, und im
  breiten Streifen kommt die Ueberschrift des Falls dazu. Bewegt wird
  `flex-grow`, keine Breite in Prozent: die rechnet der Browser gegen die
  Elternbreite und die Nachbarn springen. Vorher waren es fuenf grosse Karten
  in zwei Spalten, die Sektion war ueber zweitausend Pixel hoch.
- **Zahlen in schmalen Spalten brauchen `whitespace-nowrap`.** „+37,3 %" brach
  sonst hinter dem Komma um und das Prozentzeichen stand allein in der
  zweiten Zeile.
- **Im Vorgehen steht die Ueberschrift zweizeilig links, das Diagramm rechts
  daneben.** Der Block „Was sich verschiebt" mit Ueberschrift und Absatz ist
  raus: das Diagramm sagt dasselbe in einem Blick.
- **Das Ergebnisband ist gruen.** Weiss mit orangem Ring war zu leise
  zwischen zwei hellen Flaechen. Gruen ist auf dieser Website die Farbe fuer
  Ergebnisse, und genau das steht darauf.
- **Die Gegenueberstellung ist nicht mehr zweimal dieselbe Karte**: links eine
  eingelassene Flaeche mit gestrichelter Kante ohne Schatten, rechts eine
  weisse Platte mit orangem Saum, die aufliegt. Dazu deutlich Abstand nach
  oben und eine eigene, mittig stehende Ueberschrift.
- **Die Designbeispiele sind eine dunkle Sektion und deutlich kleiner**
  (`max-w-[44rem]`). Die Listingbilder haben weissen Hintergrund, auf einer
  hellen Seite sind sie nicht als Bilder zu erkennen. Vorher lief das Listing
  ueber die volle Breite, das Hauptbild allein war siebenhundert Pixel hoch.
  Die Platte „Was an diesem Listing gemacht wurde" ist raus.
- **`.btn-text-hell` ist der Textlink auf dunklem Grund.** `.btn-text` faerbt
  sich beim Zeigen dunkel und ist auf Navy dann verschwunden.

## Dreizehnte Feedbackrunde (verbindlich, ersetzt alle Globus-Regeln)

- **Die Marktplatzgrafik ist ein Bild, keine Zeichnung.** Nach elf gezeichneten
  Fassungen hat der Kunde das Bild geliefert:
  `public/bilder/s-international-kugel.webp`, freigestellt, im Stil der uebrigen
  3D-Bilder. Es liegt ohne Platte und ohne Rahmen auf dem Grund und bewegt sich
  nicht. Damit sind `service/welt-geo.ts` und `scripts/welt-karte.mjs`
  geloescht; die gezeichnete Fassung steht in der Geschichte unter
  „Marktplatzgrafik nach der Referenz des Kunden neu gebaut".
- **Neun Maerkte, kein Grossbritannien.** Das Bild zeigt DE, FR, IT, ES, NL, BE,
  PL, SE und die USA. Die Liste auf dem Telefon fuehrt genau diese neun: eine
  Fahne in der Liste, die im Bild fehlt, faellt sofort auf.
- **Bilder aus dem Chat kommen nicht auf der Platte an.** Nur Anhaenge landen in
  `/root/.claude/uploads`. Ein Bild, das im Chat steht, ist sichtbar, aber es
  gibt keine Datei dazu. Wenn ein Bild eingebaut werden soll: als Anhang
  anfordern, nicht raten und nicht nachbauen.

## Vierzehnte Feedbackrunde (verbindlich)

- **Der Hero traegt eine Komposition aus echter Arbeit, kein erzeugtes Bild.**
  Fuenf 3D-Entwuerfe im Stil teurer Produktrenderings hat der Kunde als
  „kindlich" verworfen und Referenzen geschickt: ein echtes Listing auf einem
  Telefon, Listingbilder daneben, schwebende Karten mit Zahlen. `takt/HeroBuehne`
  baut das aus dem Miganeo-Listing, einem Telefonrahmen aus Code und zwei
  belegten Zahlen aus der zugehoerigen Case Study, mit Link dorthin.
- **Kein Amazon-Logo und keine Amazon-Oberflaeche**, auch wenn die Referenzen
  sie zeigen. Der Aufbau einer Produktseite reicht.
- **Keine erfundenen Preise.** Im Listing-Nachbau ist der Preis ein Balken.
  Eine Zahl daraus zu machen hiesse, einen Preis fuer das Produkt eines Kunden
  zu erfinden.
- **„Profitabel skalieren" steht im Hero.** Skalieren kann jeder behaupten, der
  Unterschied liegt in der Marge. Ueberschrift: „Auf Amazon profitabel
  skalieren."
- **`useReducedMotion` darf nie dazu fuehren, dass Animationsangaben
  verschwinden.** Der Wert ist beim ersten Rendern false, framer-motion setzt
  die Deckkraft auf 0, danach wird er wahr, die Angaben fallen weg und das
  Element bleibt unsichtbar stehen. `whileInView` bleibt deshalb immer gesetzt,
  nur der Startwert wechselt.
- **`body` traegt `overflow-x: clip`, nicht `hidden`.** `hidden` macht aus dem
  Body einen Scroll-Container, und darin haelt kein `position: sticky`.
- **Die Designbeispiele sind eine Scroll-Geschichte**: links bleibt der Text
  stehen, rechts laeuft das Listing durch. Die A+ Spalte wird auf die Hoehe der
  Bildstrecke gezogen und teilt sie unter ihren sechs Modulen auf, dadurch enden
  beide Spalten immer gleich. Eine gerechnete Spaltenbreite geht nie genau auf,
  weil die Abstaende feste Pixel sind und die Bilder nicht.
- **Die Team-Sektion der Startseite ist kurz**: drei Aufnahmen, die Bereiche im
  Haus, ein Link auf `/team`. Dort stehen die Gruender, das Team, weitere
  Aufnahmen und eine eigene Grafik. Die Seite steht in der Fusszeile, nicht in
  der Kopfzeile.

## Fuenfzehnte Feedbackrunde (verbindlich)

- **Im Hero steht ausgelieferte Arbeit, kein erzeugtes Produkt.** Acht
  Fassungen sind gescheitert, darunter drei erzeugte Bilder. Das letzte zeigte
  eine erfundene Trinkflasche, und genau das will der Kunde nicht. Jetzt eine
  Fusion seiner drei Referenzen, gebaut aus dem Miganeo-Listing: links das
  Telefon mit der Produktseite, rechts die sechs Listingbilder als Raster,
  darauf zwei Schilder und die belegte Zahl aus der Case Study. Kein
  Bildmodell, keine Bewegung ausser dem einmaligen Einlaufen.
- **Wenn ein Bild gebraucht wird, kommt es aus der Galerie des Kunden.**
  Erfundene Produkte aus dem Bildmodell sind fuer Produktdarstellungen raus.
- **Ueberschrift und Versprechen kommen vom Kunden**: „Profitables Wachstum
  fuer eure Amazon-Marke." und „Mehr Umsatz ist keine Frage des Werbebudgets.
  Es ist eine Frage der Umsetzung." Aus dem Entwurf sind zwei Saetze geworden,
  weil der Anschluss mit „durch Profi-Umsetzung" grammatisch nicht trug, und
  „Profi" ist raus: was wir koennen, zeigen die Faelle darunter. Die Anrede
  bleibt „ihr/euch", auch wenn der Entwurf „deine" sagte.
- **Die Bezeichnung gehoert in die haftende Spalte.** In den Designbeispielen
  steht sie in der linken Spalte und bleibt mit dem Text stehen. Ueber der
  Sektion waere sie beim ersten Scrollen weg. „Retail Ready" traegt
  `whitespace-nowrap`, die beiden Woerter gehoeren in eine Zeile.
- **Die Team-Sektion der Startseite ist ein Block**: Bezeichnung, Ueberschrift,
  drei Zeilen, Link, daneben das Bild der drei Gruender. Die weisse Platte mit
  den Bereichen ist raus, die drei Aufnahmen auch. Auf dem Bild sitzt der
  Stempel (`takt/Stempel`): eine drehende Scheibe mit umlaufender Schrift, halb
  auf dem Foto und halb auf dem Grund. Die Schrift wird auf den Umfang
  gestreckt, sonst laeuft der zweite Durchlauf in den ersten.
- **Die Team-Seite ist eine Aufstellung, keine Inszenierung.** „Wer bei euch am
  Konto sitzt" ist raus: an einem Konto sitzt niemand. Die Trennung in „die,
  mit denen ihr sprecht" und „die, die am Konto arbeiten" ist raus, die
  Gruender arbeiten genauso daran. Die Sektion „Fuenf Bereiche, ein Konto" ist
  ersatzlos gestrichen, sie sagte dasselbe wie die Startseite.
- **Jede Person hat eine eigene Farbe**, bewusst keine Markenfarbe: ein weicher
  Farbfleck hinter dem Portrait, ein farbiger Rand am Bild und die Rolle in
  derselben Farbe. Das bringt Individualitaet in die Seite, ohne die Marke zu
  wiederholen.

## Sechzehnte Feedbackrunde (verbindlich)

- **Hero-Copy steht wortgleich so, wie der Kunde sie vorgibt.** „Profitables
  Wachstum fuer deine Amazon Brand", die ersten beiden Woerter fett und mit dem
  Textmarker. Darunter: „Mehr Umsatz ist keine Frage des Werbebudgets durch
  Profi-Umsetzung in Content, Ads, Account Betreuung & Co." Die Anrede weicht
  hier bewusst von der uebrigen Website ab, das ist zweimal bestaetigt.
- **Rahmen liegen als eigene Ebene ueber dem Bild.** Ein `outline` am Element
  selbst wird vom Foto darin verdeckt, deshalb sah man beim Zeigen nur die
  Ecken aufblitzen. Der Rahmen der Fall-Streifen ist jetzt ein eigenes
  `absolute inset-0` mit `border-2`, immer sichtbar, und wechselt beim Zeigen
  von Weiss auf Orange.
- **Die Bewegung der Fall-Streifen laeuft ueber 700 ms** mit
  `cubic-bezier(0.22,0.61,0.24,1)`, Bild und Text folgen derselben Kurve.
- **Der Stempel traegt das Logo, keine Schrift.** Rote Scheibe im Logo-Rot
  #FF3131, darin eine weisse Innenscheibe mit den vier Formen des Zeichens.
  Die rote Kreisform des Logos wuerde auf der roten Scheibe verschwinden,
  deshalb die weisse Innenflaeche.
- **Auf der Team-Seite traegt die Karte die Farbe**, nicht nur die Rolle. Die
  Farbe wird mit Weiss aufgehellt (86 Prozent), damit die Schrift darauf
  lesbar bleibt.
- **Die Team-Seite hat eine Sektion.** Bezeichnung „12 Amazon-Spezialisten",
  keine Ueberschrift, links die drei Gruender, rechts die vier Aufnahmen aus
  dem Buero, darunter die neun im Team. Das Band mit den Bereichen und die
  Sektion „Bei uns" sind gestrichen: die Bereiche stehen schon auf der
  Startseite.

## Branch

Entwicklung auf `claude/copy-shaerfen-website-redesign-j2lnui`.

## Siebzehnte Feedbackrunde (verbindlich)

- **Das Hero-Bild liefert der Kunde.** `bilder/h-listing.webp`, freigestellt,
  ohne Platte und ohne Rahmen, mit einem warmen Lichthof dahinter. Kein
  Schweben, kein Kippen zum Zeiger: die Grafik laeuft einmal ein und steht
  danach still. Damit sind zehn Fassungen erledigt, darunter fuenf
  3D-Entwuerfe, ein erzeugtes Produkt und die Komposition aus dem
  Miganeo-Listing (`takt/HeroBuehne`, alte Fassung in der Geschichte).
- **Ausnahme mit Ansage: in diesem Bild steht Amazon-Oberflaeche.**
  Amazon-Schriftzug, Suchleiste, „Add to Cart" und ein erfundener Preis von
  299 Dollar an einem erfundenen Produkt. Das widerspricht zwei Regeln dieser
  Datei (keine Amazon-Oberflaeche, keine erfundenen Preise). Es steht so da,
  weil der Kunde genau dieses Bild vorgegeben hat. Nicht eigenmaechtig
  zurueckbauen, aber auch nicht als Vorbild fuer weitere Bilder nehmen.
- **Der Stempel ist ein Ring aus Schrift ohne Flaeche.** Zwei Vorfassungen
  hatten eine gefuellte Scheibe, zuletzt rot mit dem Logo darin. Beide waren
  zu schwer: eine Scheibe deckt das Bild darunter zu, und das Logo steht
  ohnehin in der Kopfzeile. Jetzt bleibt der Grund frei, die Schrift laeuft
  halb durchsichtig um zwei feine Ringe.
- **Schrift, die ueber Foto und Grund zugleich laeuft, braucht eine Kontur.**
  Der Stempel sitzt halb auf einem fast schwarzen Pullover. Dunkle Schrift
  allein verschwindet darin, ein weicher Schein dahinter reicht nicht. Hinter
  jedem Buchstaben liegt deshalb eine weisse Kontur (`paint-order: stroke`):
  auf dem hellen Grund unsichtbar, auf dem Foto traegt sie die Schrift.
- **An der Nahtstelle des Rings steht ein geschuetztes Leerzeichen.** Wo der
  Text in sich selbst laeuft, stiess der Punkt sonst direkt an das naechste
  Wort. Zwei normale Leerzeichen zieht SVG zu einem zusammen.
- **Negative Raender auf dem Telefon nie groesser als der Container-Rand.**
  `px-6` sind 1,5 rem; bei `-left-9` stand der Stempel halb ausserhalb des
  Bildschirms, und weil `body` mit `overflow-x: clip` abschneidet, faellt das
  nicht als waagerechtes Scrollen auf, sondern nur im Bild.
- **Die Team-Seite ist ersatzlos gestrichen.** Mit ihr `src/app/team`,
  `components/team/TeamBody` und `src/lib/team.ts`; der Verweis in der
  Fusszeile und der Link aus der Team-Sektion der Startseite sind weg. Die
  kurze Sektion auf der Startseite bleibt, sie zeigt jetzt nur noch
  Ueberschrift, Absatz und das Bild der Gruender. Die Portraits unter
  `public/team` bleiben liegen, Clemens wird im Abschluss-CTA gebraucht.
