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
} from "./Blocks";
import { ContentShowcase } from "./ContentShowcase";
import { ContentResultBand } from "./ContentResultBand";
import { BudgetSplitDiagram } from "./Diagrams";

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
              "Search Query Performance je Suchbegriff: Impressionen, Klickrate, Conversion, Cart-Adds",
              "Verkäufe und Traffic je ASIN: wie viele Besucher kommen und wie viele davon kaufen",
              "Wettbewerbs- und Marktanteilsanalyse über die Zeit",
              "Margen- und Deckungsbeitragsrechnung je Variante inklusive aller Fees",
            ],
          },
          {
            title: "Strategie & Fahrplan",
            subtitle: "Was daraus folgt",
            bullets: [
              "Welche Produkte Wachstum bekommen und welche gehalten werden",
              "ACoS- und TACoS-Ziele als Messlatte",
              "Reihenfolge der Maßnahmen, sortiert nach erwartetem Umsatz-Effekt",
            ],
          },
        ]}
      />
      <TextMedia
        tone="blue"
        title="Damit steht das Fundament."
        text="Content und Werbung bauen auf eurer Strategie auf. Ohne sie skaliert ihr nur die Probleme."
        reverse
        imageAspect="aspect-[3/2]"
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
        image="/bilder/n-organic.webp"
        imageAlt="Sichtbarkeit, Klick und Kauf als Kette, daneben eine steigende Kurve"
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
        text="Wir rechnen jedes Produkt erst auf seine Marge durch. In die Skalierung geht nur, was nach allen Kosten Gewinn bringt. Darauf setzen wir eine saubere Kampagnenarchitektur auf und steuern sie laufend nach."
        image="/bilder/n-ursache.webp"
        imageAlt="Trichter: viel Traffic oben, wenige profitable Verkäufe unten"
        reverse
        imageAspect="aspect-[3/2]"
      />
      <Cards
        tone="blue"
        eyebrow="Was wir steuern"
        title="Von der Struktur bis zum einzelnen Gebot."
        cols={3}
        items={[
          {
            title: "Profit-First",
            subtitle: "Erst analysieren, dann skalieren",
            bullets: [
              "Marge und Deckungsbeitrag je Produkt",
              "Welche Produkte überhaupt profitabel wachsen können",
              "Nur diese bekommen mehr Budget, der Rest wird gehalten",
              "Optimiert wird auf den Gewinn, nicht nur auf den ACoS",
            ],
          },
          {
            title: "Kampagnenstruktur",
            subtitle: "Architektur vor Bid-Management",
            bullets: [
              "Saubere Keyword-Segmentierung, intent-basiertes Clustering",
              "Sponsored Products für direkte Sales, Sponsored Brands für Sichtbarkeit, Sponsored Display fürs Retargeting",
              "Brand Defense: eure Markenbegriffe gegen Wettbewerber geschützt",
            ],
          },
          {
            title: "Keywordmanagement",
            subtitle: "Laufend neue, konvertierende Suchbegriffe",
            bullets: [
              "Strukturierte Research-Kampagnen",
              "Konvertierende Suchbegriffe gezielt übernehmen",
              "Laufende Optimierung statt einmal aufsetzen",
            ],
          },
          {
            title: "Gebotssteuerung",
            subtitle: "Dynamisch, nicht statisch",
            bullets: [
              "Gebote angepasst an Performance, Wettbewerb und Saison",
              "Platzierungen getrennt für Top-of-Search und den Rest",
              "Tägliche Steuerung, nicht monatlich",
            ],
          },
          {
            title: "Paid trifft Organic",
            subtitle: "TACoS als Maßstab",
            bullets: [
              "TACoS als Effizienzmaß für Paid und Organic zusammen",
              "Werbung, die das organische Ranking mitzieht",
              "Budget dorthin, wo es Umsatz und Sichtbarkeit zugleich bringt",
            ],
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
        image="/bilder/n-reporting.webp"
        imageAlt="Schwebendes Dashboard mit Kurve, Balken und zwei Kennzahlkarten"
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
