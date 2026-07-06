import {
  ServiceHero,
  Cards,
  Points,
  Rows,
  Compare,
  TextMedia,
  AccentStrip,
  BulletPanel,
  ResultBlock,
  ServiceCTA,
} from "./Blocks";
import { ContentShowcase } from "./ContentShowcase";
import { ContentResultBand } from "./ContentResultBand";
import { BudgetSplitDiagram, MarketWorkStrip } from "./Diagrams";
import { Testimonials } from "../home/Testimonials";

/* ============ FULL SERVICE (Übersicht) ============ */
export function FullServiceBody() {
  return (
    <>
      <ServiceHero
        eyebrow="Full Service"
        title={
          <>
            Ein eingespieltes Team für euren{" "}
            <span className="text-gradient">kompletten Amazon-Account.</span>
          </>
        }
        sub="Done-for-you, kein Ratschlag zum Selbermachen. Wir übernehmen jeden Bereich und führen ihn mit einer Tiefe, die intern selten zusammenkommt."
      />
      <Cards
        tone="blue"
        eyebrow="Für wen"
        title="Passt das zu eurer Marke?"
        cols={4}
        items={[
          { title: "Etabliertes Sortiment", body: "Eigene Marke, ernsthafter Umsatz, aber Luft nach oben." },
          { title: "Amazon-Wissen fehlt im Haus", body: "Die Produkte sind stark, das Plattform-Know-how noch nicht." },
          { title: "Schnelles Wachstum", body: "Das Sortiment wächst schneller als die interne Kapazität." },
          { title: "Viele SKUs, mehrere Marktplätze", body: "Komplexität, die nebenher nicht sauber zu führen ist." },
        ]}
      />
      <Cards
        tone="white"
        eyebrow="Die Ausgangslage"
        title="Warum die üblichen Lösungen an Amazon scheitern."
        cols={3}
        callout="Die größten Verluste entstehen bei Chancen, die intern nie auffallen."
        items={[
          { title: "Internes Team zu klein", body: "Das Wissen fehlt oder liegt bei einer Person. Fällt sie aus, steht Amazon." },
          { title: "Einzeldienstleister, getrennte Sicht", body: "Einer steuert PPC nur auf Werbeausgaben, einer baut Content ohne Blick auf den Bestand. Die Gesamtstrategie verantwortet niemand." },
          { title: "Amazon ist ein Vollzeitjob", body: "20 bis 40 Stunden pro Woche auf einer Plattform, die sich ständig verändert." },
        ]}
      />
      <Rows
        tone="blue"
        eyebrow="Was wir übernehmen"
        title="Fünf Bereiche, jeder in voller Tiefe."
        items={[
          {
            n: "01",
            title: "Wir lesen euren Markt bis auf den einzelnen Suchbegriff.",
            line: "Bevor optimiert wird, steht fest, wo eure Umsätze liegen und welche Ziele realistisch sind.",
            bullets: [
              "Search Query Performance je Suchbegriff: Impression-Share, Klickrate, Conversion, Cart-Adds",
              "Wettbewerbs- und Marktanteilsanalyse über die Zeit",
              "Vollständige Margen- und Deckungsbeitragsrechnung je Variante, inklusive aller Fees",
            ],
          },
          {
            n: "02",
            title: "Ein Listing, das auch ohne Werbung verkauft.",
            line: "Aus Sichtbarkeit werden Klicks, aus Klicks Käufe, bis das Listing Retail Ready ist.",
            bullets: [
              "Hauptbild zuerst, optimiert auf die Klickrate, den wichtigsten Faktor im Suchergebnis",
              "Produktbilder, A+ bis Premium A+ Content, Brand Store und Markengeschichte",
              "Titel, Bullets, Backend und alle Attributfelder so aufgebaut, dass Rufus und COSMO sie verstehen",
            ],
          },
          {
            n: "03",
            title: "Saubere Kampagnen, gesteuert am TACoS.",
            line: "Sobald das Listing organisch verkauft, bringt PPC planbaren Umsatz dazu.",
            bullets: [
              "Kampagnenstruktur mit Suchbegriff-Isolation und Harvesting von Auto zu Exact, ohne Kannibalisieren",
              "Platzierungs- und Gebotssteuerung, Top-of-Search gezielt eingesetzt",
              "Profitabilität als Ziel, zum Traffic-Aufbau bewusst auch mal darüber hinaus",
            ],
          },
          {
            n: "04",
            title: "Stabiler Betrieb, geschützte Rankings.",
            line: "Operative Themen, bei denen ein Fehler aufgebaute Sichtbarkeit kostet.",
            bullets: [
              "Buy-Box-Monitoring inklusive Verlust-Ursachen: Preis, Verfügbarkeit, Mehranbieter",
              "Forecasting und Inventar, damit Out-of-Stock keine Rankings zerstört",
              "Account Health, Ticketing und Troubleshooting mit dem Amazon-Support, Uploads über Flat Files",
              "Pricing-Strategien und Profitability Protection",
            ],
          },
          {
            n: "05",
            title: "Jeder neue Marktplatz von Grund auf aufgebaut.",
            line: "Der komplette Service auf weiteren Amazon-Marktplätzen, je Markt neu gemacht.",
            bullets: [
              "Eigene Keyword-Recherche je Marktplatz",
              "Content und Kampagnen für jeden Markt neu aufgesetzt",
              "Lokalisieren statt übersetzen",
            ],
          },
        ]}
      />
      <AccentStrip
        tone="blue"
        eyebrow="Immer enthalten"
        title="Reporting, das ihr in fünf Minuten versteht."
        items={["Monatliche Performance-Reports", "Profit- und Verlust-Analyse", "Markttrends und Wettbewerbsbeobachtung"]}
        icons={["chart", "margin", "search"]}
      />
      <BulletPanel
        tone="white"
        eyebrow="Der Unterschied"
        title="Eine Strategie über alle Bereiche, statt isolierter Einzelmaßnahmen."
        points={[
          "Spezialisten für Strategie, Content, PPC und Operations, abgestimmt auf ein gemeinsames Ziel",
          "Effizienz, weil jeder Bereich auf denselben Daten und derselben Planung arbeitet",
          "Wir verantworten das Ergebnis. Kein Finger-Pointing zwischen Dienstleistern.",
          "Ihr habt den Kopf frei, wir führen das Tagesgeschäft.",
        ]}
      />
      <Testimonials tone="blue" />
      <ServiceCTA
        title="Wir zeigen euch, wo in eurem Account das Wachstum liegt."
        sub="In einer kostenlosen Potenzialanalyse, konkret auf eure Marke bezogen."
        chips={["Ihr verlängert nach Performance", "98 % Kundenbindung"]}
      />
    </>
  );
}

/* ============ STRATEGIE ============ */
export function StrategieBody() {
  return (
    <>
      <ServiceHero
        eyebrow="Individuelle Amazon-Strategie"
        title={
          <>
            Bevor ihr skaliert, <span className="text-gradient">wisst ihr, wohin.</span>
          </>
        }
        sub="Wir analysieren Markt, Wettbewerb und eure Zahlen bis auf SKU-Ebene und machen daraus einen Fahrplan, der jede Maßnahme steuert."
      />
      <Points
        tone="blue"
        eyebrow="Das Problem"
        title="Warum viele Marken ihr Potenzial liegen lassen."
        points={[
          "Werbung wird hochgefahren, bevor das Listing überhaupt konvertiert.",
          "Profitabilität wird nie auf SKU-Ebene durchgerechnet.",
          "Es fehlt ein Plan mit klaren Zielen.",
        ]}
        bridge="Kurzfristig mehr Umsatz, langfristig weniger Marge. Eine durchdachte Strategie dreht dieses Muster, bevor es Geld kostet."
      />
      <Cards
        tone="white"
        eyebrow="Was drinsteckt"
        title="Von der Analyse zum priorisierten Fahrplan."
        cols={2}
        items={[
          {
            title: "Analyse",
            subtitle: "Daten treiben Entscheidungen",
            bullets: [
              "Search Query Performance bis auf den einzelnen Suchbegriff",
              "Wettbewerbs- und Marktanteilsanalyse über die Zeit",
              "Margen- und Deckungsbeitragsrechnung je Variante inklusive aller Fees",
            ],
          },
          {
            title: "Strategie & Fahrplan",
            subtitle: "Aus Daten wird ein Plan",
            bullets: [
              "Maßgeschneiderte Amazon-Strategie für eure Marke",
              "ACoS- und TACoS-Ziele als Messlatte",
              "Priorisierter Maßnahmenplan",
            ],
          },
        ]}
      />
      <TextMedia
        tone="blue"
        title="Damit steht das Fundament."
        text="Content und Werbung bauen auf eurer Strategie auf. Ohne sie skaliert ihr nur die Probleme."
        reverse
      />
      <Testimonials tone="white" />
      <ServiceCTA
        title="Wisst ihr, wo euer größtes Potenzial liegt?"
        sub="In der kostenlosen Potenzialanalyse skizzieren wir die ersten Schritte eurer Strategie."
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
        sub="Hauptbilder, Produktbilder, A+ und SEO, gebaut auf Klickrate, Conversion und einen hochwertigen Markenauftritt."
      />
      <ContentResultBand />
      <TextMedia
        tone="blue"
        eyebrow="Unser Ansatz"
        title="Schöner Content allein verkauft nichts."
        text="Wir entwickeln jedes Listing datenbasiert: Was sucht euer Kunde, woran scheitert die Kaufentscheidung, wo schlägt euch der Wettbewerb. Daraus bauen wir Content, der konvertiert und organisch rankt."
      />
      <ContentShowcase />
      <Compare
        tone="blue"
        eyebrow="Vorher / Nachher"
        title="Was sich mit starkem Content ändert."
        left={{
          label: "Vor der Zusammenarbeit",
          points: [
            "Viel Traffic, der nicht zum Kauf führt",
            "Listings, die in der Suche untergehen",
            "Keywords ohne System, Rankings ohne Plan",
            "Werbebudget auf Listings, die nicht konvertieren",
            "Verstöße gegen Richtlinien, die das Konto gefährden",
          ],
        }}
        right={{
          label: "So arbeiten wir",
          points: [
            "Retail Ready: optimierter Content als Basis für profitable Werbung",
            "Aus Besuchern werden Käufer in Sekunden",
            "Keyword-Strategie für gezielt steigende Rankings",
            "Storytelling, das eure Marke unverwechselbar macht",
            "Richtlinienkonform ohne Risiko fürs Konto",
          ],
        }}
      />
      <Testimonials tone="white" />
      <ServiceCTA
        title="Wie viel Umsatz verliert ihr an schwachem Content?"
        sub="In der kostenlosen Potenzialanalyse zeigen wir euch, wo euer Content Käufer verliert."
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
        sub="Wir steuern eure Kampagnen nach dem Deckungsbeitrag jedes Produkts, auf Basis eurer realen Account-Daten statt auf Klick-Metriken. So wächst der Umsatz und die Marge wächst mit."
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
        text="Wir rechnen jedes Produkt erst auf seine Marge durch. Nicht alles gehört in die Skalierung, sondern nur das, was nach allen Kosten Gewinn bringt. Darauf bauen wir eine saubere Kampagnenarchitektur und steuern sie laufend nach."
        reverse
      />
      <Cards
        tone="blue"
        eyebrow="Was wir steuern"
        title="Fünf Bereiche, die über eure Marge entscheiden."
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
      <Testimonials tone="white" />
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
      <Cards
        tone="white"
        eyebrow="Wie wir arbeiten"
        title="So bleibt euer Account stabil."
        cols={3}
        items={[
          { n: "01", title: "Proaktives Monitoring", body: "Klare KPIs und Frühwarnsysteme zeigen Risiken, bevor sie Umsatz kosten." },
          { n: "02", title: "Ein vernetztes System", body: "Bestand, Pricing, Content und Werbung greifen ineinander, gesteuert als Ganzes." },
          { n: "03", title: "Volle Transparenz", body: "Klare Empfehlungen und priorisierte Maßnahmen, ohne euch durch 20 Tabs zu klicken." },
        ]}
      />
      <Cards
        tone="blue"
        eyebrow="Was wir übernehmen"
        title="Das Tagesgeschäft in unserer Hand."
        cols={3}
        items={[
          { title: "Buy-Box-Monitoring", body: "Verlust sofort erkannt, samt Ursache: Preis, Verfügbarkeit, Mehranbieter." },
          { title: "Forecasting & Inventar", body: "Nachschub geplant, damit kein Bestseller leerläuft." },
          { title: "Account Health & Cases", body: "Konto-Gesundheit im Blick, Fälle mit dem Amazon-Support geklärt." },
          { title: "Pricing & Profitability Protection", body: "Preise gesteuert, Marge geschützt." },
          { title: "Strategie- & Performance-Calls", body: "Regelmäßig, mit klaren nächsten Schritten." },
        ]}
      />
      <ResultBlock
        badge="Wir machen die Arbeit"
        title="Ihr bekommt die Ergebnisse."
        benefits={["Planbare Performance", "Transparente KPIs", "Profitables Wachstum", "Volle Entlastung"]}
      />
      <Testimonials tone="blue" />
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
            Neue Länder testen, <span className="text-gradient">profitabel wachsen.</span>
          </>
        }
        sub="Wir entwickeln eure Internationalisierungsstrategie und realisieren den Markteintritt über Amazons internationale Marktplätze, effizient, risikoarm und datenbasiert."
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
        bridge="Jeder Marktplatz hat eigene Käufer, eigene Suche, eigenen Wettbewerb. Also fängt jeder bei uns von vorne an."
        aside={<MarketWorkStrip />}
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
      <Testimonials tone="blue" />
      <ServiceCTA
        title="Welcher Markt ist euer nächster?"
        sub="In der kostenlosen Potenzialanalyse prüfen wir, welche Marktplätze sich für eure Marke lohnen."
      />
    </>
  );
}
