import {
  ServiceHero,
  Cards,
  SplitCards,
  Points,
  Compare,
  TextMedia,
  ResultBlock,
  ServiceCTA,
  Lieferung,
  Ergebnis,
} from "./Blocks";
import { Marktkarte } from "./Karte";
import { ContentShowcase } from "./ContentShowcase";
import { ContentResultBand } from "./ContentResultBand";
import { BudgetSplitDiagram, MargenDiagramm } from "./Diagrams";

/* ============ STRATEGIE ============ */
export function StrategieBody() {
  return (
    <>
      <ServiceHero
        eyebrow="Individuelle Amazon-Strategie"
        title={
          <>
            Die Antworten liegen <span className="text-gradient">in eurem Konto.</span>
          </>
        }
        sub="Search Query Bericht, Ads-Performance, Verkäufe und Traffic. Wir werten die Daten aus, die ihr längst bezahlt habt. Daraus entsteht die Reihenfolge der nächsten Schritte."
        image="/bilder/s-strategie.webp"
        imageAlt="Aus den Berichten im Konto entsteht eine Reihenfolge"
      />
      <Points
        tone="blue"
        eyebrow="Das Problem"
        title="Warum im Konto nichts vorangeht."
        points={[
          "Die Berichte liegen im Konto, ausgewertet hat sie zuletzt niemand.",
          "Werbung wird hochgefahren, bevor das Listing konvertiert.",
          "Die Marge wird nie bis auf die einzelne Variante durchgerechnet.",
          "Es fehlt eine Reihenfolge: alles ist wichtig, nichts kommt zuerst.",
        ]}
        bridge="Wer die Berichte nicht auswertet, optimiert nach Geschmack. Das kostet über Monate Marge."
      />
      <Cards
        tone="white"
        eyebrow="Was drinsteckt"
        title="Von der Analyse zum priorisierten Fahrplan."
        cols={2}
        items={[
          {
            title: "Analyse",
            subtitle: "Was in den Berichten steht",
            bullets: [
              "Zu welchen Suchbegriffen ihr gefunden, geklickt und gekauft werdet",
              "Wie viele Besucher jedes Produkt bekommt und wie viele davon kaufen",
              "Wie sich euer Anteil am Markt über die Monate verändert",
              "Was jede einzelne Variante nach allen Gebühren verdient",
            ],
          },
          {
            title: "Strategie & Fahrplan",
            subtitle: "Was daraus folgt",
            bullets: [
              "Welche Produkte wachsen sollen und welche nur gehalten werden",
              "Ein Zielwert für ACoS und TACoS",
              "Die Reihenfolge: was zuerst, was danach, was später",
            ],
          },
        ]}
      />
      <Lieferung
        eyebrow="Was ihr danach in der Hand habt"
        title={<>Zwei Dokumente, mit denen ihr arbeiten könnt.</>}
        stuecke={[
          {
            kicker: "Dokument 1",
            title: "Margenübersicht je Artikel",
            punkte: [
              "Verkaufspreis, Amazon-Gebühren, FBA, Wareneinsatz und Werbung je Variante",
              "Was am Ende übrig bleibt, in Euro und in Prozent",
              "Welche Artikel Wachstum verdienen und welche nur gehalten werden",
            ],
          },
          {
            kicker: "Dokument 2",
            title: "Fahrplan für die nächsten Monate",
            punkte: [
              "Was zuerst kommt, weil es schnell wirkt, und was warten kann",
              "Welche Artikel in den ersten Content-Sprint gehen",
              "Ab wann Kampagnen dazugeschaltet werden und mit welchem Ziel",
              "Wie tief wir ins Tagesgeschäft gehen sollen, von Beobachten bis Übernehmen",
              "Wo der Bestand knapp wird, bevor er die Skalierung ausbremst",
            ],
          },
        ]}
      />
      <Ergebnis
        eyebrow="Aus der Praxis"
        title="Vitaworld, Q1 2025 auf Q1 2026"
        zeile="Erst durchgerechnet, dann skaliert: der Adspend stieg um 39 %, der Umsatz um 147 %."
        werte={[
          { wert: "+147 %", label: "Umsatz", sub: "131k € auf 326k € pro Quartal" },
          { wert: "−44 %", label: "TACoS", sub: "von 10,4 % auf 5,8 %", runter: true },
          { wert: "−19,4 %", label: "PPC-Anteil am Umsatz", sub: "von 36 % auf 29 %", runter: true },
        ]}
        href="/ergebnisse/vitaworld"
      />
      <ServiceCTA
        title="Wisst ihr, wo euer größtes Potenzial liegt?"
        sub="In der kostenlosen Potenzialanalyse werten wir eure Berichte aus und zeigen, welche drei Schritte zuerst kommen."
      />
    </>
  );
}

/* ============ CONTENT & LISTINGS ============ */
export function ContentBody() {
  return (
    <>
      <ServiceHero
        eyebrow="Content & Listings"
        title={
          <>
            Content, der aus Klicks <span className="text-gradient">Käufer macht.</span>
          </>
        }
        sub="Hauptbild, Listingbilder, Titel, Bullets und A+ Content, ausgerichtet auf die beiden Zahlen, an denen Amazon euch misst: Klickrate und Conversion."
        image="/bilder/s-content.webp"
        imageAlt="Produktseite aus Hauptbild, Textblöcken und weiteren Bildern"
      />
      <ContentResultBand />
      <TextMedia
        tone="blue"
        eyebrow="Unser Ansatz"
        title="Schöner Content allein verkauft nichts."
        text="Wir entwickeln jedes Listing aus den Daten eures Kontos: wonach gesucht wird, an welcher Stelle Besucher abspringen, wo der Wettbewerb an euch vorbeizieht. Daraus entstehen Bilder und Texte, die verkaufen und organisch ranken."
        image="/bilder/s-content-ansatz.webp"
        imageAlt="Vier Treffer nebeneinander, einer leuchtet, darüber eine steigende Kurve"
        imageAspect="aspect-[3/2]"
      />
      <ContentShowcase />
      <Compare
        tone="blue"
        eyebrow="Vorher / Nachher"
        title="Was sich mit starkem Content ändert."
        left={{
          label: "Vor der Zusammenarbeit",
          points: [
            "Traffic kommt, gekauft wird woanders",
            "Das Listing taucht in der Suche kaum auf",
            "Keywords ohne System, Rankings ohne Plan",
            "Werbebudget läuft auf Seiten, die nicht konvertieren",
            "Richtlinienverstöße gefährden das Konto",
          ],
        }}
        right={{
          label: "So arbeiten wir",
          points: [
            "Retail Ready: der Content steht, bevor Budget fließt",
            "Hauptbild auf die Klickrate ausgelegt, nicht nach Geschmack gewählt",
            "Keywords, die tatsächlich zum Kauf führen, gezielt besetzt",
            "A+ Content beantwortet die Fragen, an denen der Kauf sonst scheitert",
            "Richtlinienkonform, ohne Risiko fürs Konto",
          ],
        }}
      />
      <Ergebnis
        eyebrow="Aus der Praxis"
        title="HaA, Launch über 17 Wochen"
        zeile="Ohne Rankings, ohne Bewertungen gestartet. Das Wachstum kam aus Conversion, nicht aus Budget."
        werte={[
          { wert: "32,5 %", label: "Conversion Rate", sub: "von 5,5 % in der Launch-Woche" },
          { wert: "13,5 %", label: "ACoS", sub: "trotz laufender Skalierung", runter: true },
          { wert: "+46 %", label: "Click-Through-Rate", sub: "nach neuem Hauptbild" },
        ]}
        href="/ergebnisse/haa"
      />
      <ServiceCTA
        title="Wie viel Umsatz verliert ihr an schwachem Content?"
        sub="In der kostenlosen Potenzialanalyse gehen wir eure Listings durch und zeigen, an welcher Stelle Besucher abspringen."
      />
    </>
  );
}

/* ============ ADVERTISING / PPC ============ */
export function AdvertisingBody() {
  return (
    <>
      <ServiceHero
        eyebrow="Advertising / PPC"
        title={
          <>
            Skalieren, ohne die <span className="text-gradient">Marge zu verlieren.</span>
          </>
        }
        sub="Wir rechnen jedes Produkt darauf durch, was nach Gebühren, FBA und Wareneinsatz übrig bleibt. Mehr Budget bekommt nur, was danach Gewinn bringt."
        image="/bilder/s-advertising.webp"
        imageAlt="Budget geht dorthin, wo nach Kosten Gewinn bleibt"
      />
      <Points
        tone="blue"
        eyebrow="Das Problem"
        title="Wo Amazon-Werbung Geld verbrennt."
        points={[
          "Ein großer Teil des Budgets fließt in Keywords, die nie profitabel werden.",
          "Auto-, Phrase- und Exact-Kampagnen bieten gegeneinander.",
          "Sponsored Products und Sponsored Brands konkurrieren um dieselben Klicks.",
          "Niemand steuert auf Produktebene, also auf den tatsächlichen Gewinn.",
          "Einmal aufgesetzt, dann sich selbst überlassen.",
        ]}
        bridge="Professionelles PPC beginnt bei der Struktur, lange vor dem ersten Gebot."
        aside={<BudgetSplitDiagram />}
      />
      <TextMedia
        tone="white"
        eyebrow="Unser Ansatz"
        title="Mehr Budget ist keine Strategie."
        text="Bevor ein Produkt mehr Budget bekommt, rechnen wir es durch: Wareneinsatz, Amazon-Gebühren, Versand, Werbung. Was danach Gewinn bringt, skalieren wir. Der Rest wird gehalten."
        aside={<MargenDiagramm />}
        reverse
      />
      <Cards
        tone="blue"
        eyebrow="Was wir übernehmen"
        title="Von der Margenrechnung bis zum einzelnen Gebot."
        cols={3}
        items={[
          {
            title: "Erst rechnen, dann skalieren",
            body: "Mehr Budget bekommt nur, was nach allen Kosten Gewinn bringt.",
          },
          {
            title: "Kampagnen sauber aufgebaut",
            body: "Jede Kampagne hat eine Aufgabe. Keine bietet gegen die andere.",
          },
          {
            title: "Eure Marke verteidigt",
            body: "Wer nach eurem Namen sucht, landet bei euch, nicht beim Wettbewerb.",
          },
          {
            title: "Neue Suchbegriffe laufend gesucht",
            body: "Was verkauft, wandert in die eigene Kampagne. Was nicht, fliegt raus.",
          },
          {
            title: "Gebote täglich nachgezogen",
            body: "Angepasst an Wettbewerb, Saison und Platzierung, nicht einmal im Monat.",
          },
          {
            title: "Werbung, die das Ranking mitzieht",
            body: "Gemessen am TACoS: was Werbung kostet, gemessen am gesamten Umsatz.",
          },
        ]}
      />
      <Ergebnis
        eyebrow="Aus der Praxis"
        title="FUTUM, erstes volles Amazon-Jahr"
        zeile="Zwei Produktlaunches in einer Akut-Nische, profitabel skaliert statt Wachstum eingekauft."
        werte={[
          { wert: "−19,7 %", label: "ACoS", sub: "trotz Launch-Skalierung", runter: true },
          { wert: "80 %", label: "organische Verkäufe", sub: "Spitzenanteil am Gesamtumsatz" },
          { wert: "392.327 €", label: "Umsatz 2025", sub: "bei 17.042 Bestellungen" },
        ]}
        href="/ergebnisse/futum"
      />
      <ServiceCTA
        title="Wo versickert euer Werbebudget?"
        sub="In der kostenlosen Potenzialanalyse prüfen wir eure Kampagnen auf Streuverlust und Gewinn."
      />
    </>
  );
}

/* ============ ACCOUNT-MANAGEMENT ============ */
export function AccountBody() {
  return (
    <>
      <ServiceHero
        eyebrow="Account-Management"
        title={
          <>
            Ihr baut die Marke. Das{" "}
            <span className="text-gradient">Tagesgeschäft liegt bei uns.</span>
          </>
        }
        sub="Buy-Box, Bestand, Konto-Gesundheit und Pricing steuern wir wie einen eigenen Geschäftsbereich. So gewinnt ihr Zeit für Produkt und Sortiment."
        image="/bilder/s-account.webp"
        imageAlt="Tagesgeschäft an einem Pult gesteuert"
      />
      <Points
        tone="blue"
        eyebrow="Das Problem"
        title="Die meisten reagieren erst, wenn es brennt."
        points={[
          "Buy-Box verloren, oft tagelang unbemerkt.",
          "Bestände leer, Rankings brechen weg.",
          "Performance bricht ein, niemand sieht den Grund.",
          "Policy-Warnung im Postfach, das Konto in Gefahr.",
        ]}
        bridge="Wir greifen früher ein, bevor es Umsatz kostet."
      />
      <SplitCards
        tone="white"
        eyebrow="Wie wir arbeiten"
        title="So bleibt euer Account stabil."
        image="/bilder/s-account-monitor.webp"
        imageAlt="Buy-Box, Bestand und Konto-Gesundheit nebeneinander, eine Warnleuchte meldet"
        imageAspect="aspect-[3/2]"
        items={[
          {
            title: "Buy-Box weg, 9:40 Uhr",
            body: "Ein Mehranbieter unterbietet euch um 40 Cent. Wir sehen es am Vormittag, prüfen die Marge und entscheiden mit euch: mitgehen oder aussitzen.",
          },
          {
            title: "Noch 18 Tage Bestand vor der Saison",
            body: "Der Nachschub braucht 6 Wochen bis ins Lager. Wir melden das, bevor der Artikel leerläuft und das Ranking mit ihm.",
          },
          {
            title: "Richtlinienwarnung im Postfach",
            body: "Ein Attribut verstößt gegen eine neue Vorgabe. Wir schreiben den Case, korrigieren das Listing und melden zurück, wenn es erledigt ist.",
          },
        ]}
      />
      <Cards
        tone="blue"
        eyebrow="Was wir übernehmen"
        title="Acht Aufgaben, die euch keiner mehr abnimmt."
        cols={3}
        items={[
          { title: "Buy-Box-Monitoring", body: "Verlust sofort erkannt, samt Ursache: Preis, Verfügbarkeit, Mehranbieter." },
          { title: "Bestand und Nachschub", body: "Nachschub geplant, damit kein Bestseller leerläuft." },
          { title: "Cases und Amazon-Support", body: "Wir schreiben die Tickets, hängen hinterher und eskalieren, wenn nichts passiert." },
          { title: "Produkte anlegen und pflegen", body: "Neue Artikel, Varianten und Flat-File-Uploads, inklusive der Attribute, die kaum jemand füllt." },
          { title: "Richtlinien im Blick", body: "Neue Amazon-Vorgaben werden geprüft und umgesetzt, bevor sie zur Warnung werden." },
          { title: "Änderungen und Tests", body: "Hauptbild, Titel oder Preis geändert und gegen den Vorzeitraum gemessen, statt nach Gefühl." },
          { title: "Pricing und Marge", body: "Preise gesteuert, damit Wachstum nicht die Marge frisst." },
          { title: "Feste Termine mit euch", body: "Regelmäßig, mit klaren nächsten Schritten." },
        ]}
      />
      <ResultBlock
        badge="Wir machen die Arbeit"
        title="Ihr bekommt die Ergebnisse."
        benefits={[
          "Buy-Box-Verluste am selben Tag geklärt",
          "Nachschub geplant, bevor der Bestand kippt",
          "Monatsreport mit klaren nächsten Schritten",
          "Anfragen an den Amazon-Support laufen über uns",
        ]}
      />
      <Ergebnis
        eyebrow="Aus der Praxis"
        title="Marke aus Gartenzubehör, Saison 2026"
        zeile="Schon im Herbst vorbereitet, damit die Nachfrage im April auf einen Account trifft, der sie aushält."
        werte={[
          { wert: "−35 %", label: "TACoS im Hauptmarkt", sub: "über die Saison", runter: true },
          { wert: "+21 %", label: "Conversion Rate", sub: "Hauptmarkt DE" },
          { wert: "+110 %", label: "Klicks Italien", sub: "bei sinkendem ACoS" },
        ]}
        href="/ergebnisse/marke-gartenzubehoer"
      />
      <ServiceCTA
        title="Gebt das Tagesgeschäft an uns ab."
        sub="In der kostenlosen Potenzialanalyse zeigen wir, was wir euch abnehmen können."
      />
    </>
  );
}

/* ============ INTERNATIONALISIERUNG ============ */
export function InternationalisierungBody() {
  return (
    <>
      <ServiceHero
        eyebrow="Internationalisierung"
        title={
          <>
            Jedes Land sucht <span className="text-gradient">anders.</span>
          </>
        }
        sub="Was in Deutschland verkauft, verkauft in Italien nicht automatisch. Andere Suchbegriffe, andere Preise, anderer Wettbewerb. Jedes Land bekommt eigene Recherche, eigenen Content und eigene Kampagnen."
        image="/bilder/s-international.webp"
        imageAlt="Jeder Marktplatz mit eigenem Aufbau um einen gemeinsamen Kern"
      />
      <Points
        tone="blue"
        eyebrow="Das Problem"
        title="Warum neue Marktplätze oft enttäuschen."
        points={[
          "Listings werden übersetzt, statt für den Markt geschrieben.",
          "Jeder Marktplatz hat eigene Suchbegriffe und Kaufgewohnheiten.",
          "Kampagnen aus dem Startmarkt werden eins zu eins übernommen.",
          "Ohne lokale Relevanz bleiben Sichtbarkeit und Conversion aus.",
        ]}
        bridge="Andere Käufer, andere Suchbegriffe, anderer Wettbewerb. Deshalb beginnt bei uns jedes Land mit einer eigenen Recherche, nicht mit einer Übersetzung."
      />
      <Cards
        tone="white"
        eyebrow="Unser Vorgehen"
        title="Was wir für jeden Marktplatz neu machen."
        cols={2}
        items={[
          {
            title: "Eigene Keyword-Recherche",
            subtitle: "Jeder Markt sucht anders",
            body: "Für jeden Marktplatz recherchieren wir die Suchbegriffe neu, statt sie aus dem Startmarkt zu übersetzen.",
          },
          {
            title: "Lokalisierter Content",
            subtitle: "Geschrieben für den Markt",
            body: "Hauptbild, Titel, Bullets und A+ Content je Marktplatz neu erstellt, sprachlich und kulturell. KI-ready für Rufus und COSMO im jeweiligen Markt.",
          },
          {
            title: "Eigene Kampagnen",
            subtitle: "Lokal gesteuert",
            body: "Sponsored Products, Brands und Display je Marktplatz neu aufgesetzt und über den lokalen TACoS gesteuert.",
          },
          {
            title: "Markt für Markt",
            subtitle: "Der gleiche volle Aufwand",
            body: "Die komplette Arbeit, die ein Marktplatz bekommt, bekommt auch der nächste. Ohne Abkürzung.",
          },
        ]}
      />
      <TextMedia
        tone="blue"
        eyebrow="Wie es aussieht"
        title="Ein Konto, jedes Land für sich aufgebaut."
        text="Der Startmarkt bleibt der Startmarkt. Jedes weitere Land bekommt die komplette Arbeit noch einmal, statt eine Übersetzung des ersten."
        aside={<Marktkarte />}
      />
      <Ergebnis
        eyebrow="Aus der Praxis"
        title="Miganeo, Sommer 2026"
        zeile="Fünf Marktplätze in zehn Wochen aufgebaut, aus vier losen Kampagnen wurden 120."
        werte={[
          { wert: "×20", label: "Umsatz im Ausland", sub: "8.967 € auf 179.287 €" },
          { wert: "9,9 %", label: "ACoS", sub: "299.184 € Umsatz bei 29.490 € Einsatz", runter: true },
          { wert: "98,9 %", label: "außerhalb der eigenen Marke", sub: "neu gewonnen, nicht umgebucht" },
        ]}
        href="/ergebnisse/miganeo"
      />
      <Compare
        tone="white"
        eyebrow="Vorher / Nachher"
        title="Übersetzt oder lokalisiert."
        left={{
          label: "Nur übersetzt",
          points: [
            "Titel wörtlich übersetzt, an den Suchbegriffen vorbei",
            "Gleiche Keywords wie im Startmarkt",
            "Kampagnen kopiert, Budget ohne lokalen Bezug",
            "Conversion bleibt hinter dem Startmarkt zurück",
          ],
        }}
        right={{
          label: "Lokalisiert",
          points: [
            "Content je Markt neu geschrieben, auf Klickrate und Conversion",
            "Eigene Keyword-Recherche pro Marktplatz",
            "Kampagnen lokal aufgesetzt und über den TACoS gesteuert",
            "Profitables Wachstum auf jedem neuen Marktplatz",
          ],
        }}
      />
      <ServiceCTA
        title="Welcher Markt ist euer nächster?"
        sub="In der kostenlosen Potenzialanalyse prüfen wir, welche Marktplätze sich für eure Marke lohnen."
      />
    </>
  );
}
