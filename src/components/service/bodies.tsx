import {
  ServiceHero,
  Cards,
  SplitCards,
  Points,
  Compare,
  TextMedia,
  AccentStrip,
  ResultBlock,
  ServiceCTA,
  SignalSatz,
} from "./Blocks";
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
      <SignalSatz
        eyebrow="Was ihr danach habt"
        title={<>Ihr wisst, was zuerst dran ist. Und warum.</>}
        punkte={[
          "Ihr seht schwarz auf weiß, welches Produkt Geld verdient",
          "Ihr wisst, welcher Schritt am meisten bringt",
          "Ihr habt eine Zahl, an der ihr uns messt",
        ]}
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
          { title: "Proaktives Monitoring", body: "Klare KPIs und Frühwarnsysteme zeigen Risiken, bevor sie Umsatz kosten." },
          { title: "Ein vernetztes System", body: "Bestand, Pricing, Content und Werbung greifen ineinander, gesteuert als Ganzes." },
          { title: "Volle Transparenz", body: "Klare Empfehlungen und priorisierte Maßnahmen, ohne euch durch 20 Tabs zu klicken." },
        ]}
      />
      <Cards
        tone="blue"
        eyebrow="Was wir übernehmen"
        title="Das Tagesgeschäft in unserer Hand."
        cols={3}
        items={[
          { title: "Buy-Box-Monitoring", body: "Verlust sofort erkannt, samt Ursache: Preis, Verfügbarkeit, Mehranbieter." },
          { title: "Bestand und Nachschub", body: "Nachschub geplant, damit kein Bestseller leerläuft." },
          { title: "Konto-Gesundheit", body: "Warnungen früh gesehen, Fälle mit dem Amazon-Support geklärt." },
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
            Jeder Marktplatz ist ein <span className="text-gradient">eigener Markt.</span>
          </>
        }
        sub="Was in Deutschland verkauft, verkauft in Italien nicht automatisch. Eigene Keyword-Recherche, eigener Content, eigene Kampagnen, für jedes Land neu."
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
      <AccentStrip
        tone="blue"
        eyebrow="Aus der Praxis"
        title="Vier Marktplätze parallel aufgebaut."
        items={["Saisonstart auf allen Märkten vorbereitet", "TACoS im Hauptmarkt −35 %", "Zweitmarkt: Klicks +110 % bei sinkendem ACoS"]}
        icons={["rocket", "margin", "target"]}
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
