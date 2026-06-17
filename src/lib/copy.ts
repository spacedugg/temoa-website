import type { Block } from "@/components/sections/Blocks";

/* Conversion-Copy für TEMOA – komplett neu verfasst (Stand 2026-06-17). Durchgängig „ihr/euch". */

export type Hero = { eyebrow: string; lead: string; accent: string; sub: string; chips?: string[] };

/* Preis-Schwellen (ICP-Filter). null = „individuelles Angebot". */
export const pricing: Record<string, string | null> = {
  "full-service": "3.500 €",
  "listing-seo": "3.000 €",
  "ppc-advertising": "2.500 €",
  strategie: null,
  "account-management": null,
  internationalisierung: null,
};

/* Fünf Leistungen: vier Kernleistungen + Internationalisierung als Erweiterung. */
export const services = [
  { slug: "strategie", label: "Strategie", href: "/leistungen/strategie", core: true },
  { slug: "listing-seo", label: "Listing & SEO", href: "/leistungen/listing-seo", core: true },
  { slug: "ppc-advertising", label: "PPC Advertising", href: "/leistungen/ppc-advertising", core: true },
  { slug: "account-management", label: "Account Management", href: "/leistungen/account-management", core: true },
  { slug: "internationalisierung", label: "Internationalisierung", href: "/leistungen/internationalisierung", core: false },
];

/* „Weitere Leistungen" am Seitenende: die anderen Services + Full Service 360°. */
function weitere(slug: string, title = "Alles greift ineinander."): Block {
  return {
    kind: "bridge",
    eyebrow: "Weitere Leistungen",
    title,
    links: [
      ...services.filter((s) => s.slug !== slug).map((s) => ({ label: s.label, href: s.href })),
      { label: "Full Service 360°", href: "/full-service", body: "Alle Leistungen kombiniert" },
    ],
  };
}

/* ---------------- FULL SERVICE (Übersicht) ---------------- */
export const fullService = {
  hero: {
    eyebrow: "Full-Service Amazon-Management",
    lead: "Eure Marke gehört euch.",
    accent: "Den Account übernehmen wir.",
    sub: "Seller Central frisst leise jede freie Stunde – Gebote nachziehen, Forecasts schreiben, Cases beantworten, Listings flicken. Wir setzen ein eingespieltes Team auf euren Account, das den Laden komplett führt. Ihr trefft Entscheidungen zur Marke, wir liefern die Zahlen, gegen die ihr entscheidet.",
    chips: ["Ein Team", "Ein Vertrag", "Gesteuert auf Marge", "5+ Marktplätze"],
  } as Hero,
  blocks: [
    {
      kind: "numbered",
      eyebrow: "Für wen das passt",
      title: "Full Service rechnet sich, wenn …",
      items: [
        { n: "01", title: "ihr zwischen 50k und 500k € im Monat dreht", body: "Das Geschäft läuft. Jetzt entscheidet nicht mehr das Ob, sondern wie profitabel der nächste Sprung wird." },
        { n: "02", title: "euer Team im Klein-Klein verschwindet", body: "Cases, Bid-Anpassungen und Listing-Pflege fressen genau die Stunden, die ihr für Wachstum bräuchtet." },
        { n: "03", title: "Umsatz nur noch über mehr Budget kommt", body: "Jeder Euro Mehrumsatz kostet einen Euro Werbung mehr. Der organische Hebel liegt brach." },
        { n: "04", title: "ihr über die Grenze wachsen wollt", body: "Ein Setup, das in DE funktioniert, sauber auf FR, IT, ES und NL ausgerollt – nativ, nicht durch den Übersetzer." },
      ],
    },
    {
      kind: "numbered",
      eyebrow: "Die Statik",
      title: "Vier Leistungen, die sich gegenseitig tragen.",
      description: "Full Service ist keine Aufgabenliste, die wir abarbeiten. Es ist ein Tragwerk: ein Fundament, darauf zwei Wachstumshebel, eine Klammer ringsum, die alles zusammenhält.",
      items: [
        { n: "01", title: "Fundament · Strategie", body: "Sortiment, Marge, Preis – durchgerechnet, bevor der erste Euro in Bilder oder Gebote fließt." },
        { n: "02", title: "Conversion · Listing & SEO", body: "Bilder, A+ und Keywords, die aus Klicks Käufer machen und organisch ranken – Sichtbarkeit, die nichts pro Klick kostet." },
        { n: "03", title: "Hebel · PPC & International", body: "Werbung erst auf Listings, die konvertieren – und dasselbe Setup auf weitere Märkte gespiegelt." },
        { n: "04", title: "Klammer · Account Management", body: "Bestand, Buy-Box, Compliance, Reporting. Keine Stufe in der Treppe, sondern der Rahmen, der die anderen drei zusammenhält." },
      ],
    },
    {
      kind: "compare",
      eyebrow: "Die Rechnung",
      title: "Selbst stemmen ist teurer, als die Gehaltsliste zeigt.",
      description:
        "Amazon ernsthaft zu führen heißt 20 bis 40 Stunden die Woche – Listings, Kampagnen, Forecasts, Cases. Wer mittendrin steckt, kommt nie zum Optimieren. Ein eigenes Team mit dieser Bandbreite landet schnell bei 15.000 bis 30.000 € im Monat. Die Alternative – weiter nebenbei – kostet keine Gehälter, dafür Rankings, Marge und teure Anfängerfehler.",
      left: { label: "Eigenes Team aufbauen", value: "15–30k €", points: ["Monat für Monat an Gehältern", "20–40 Std./Woche gebunden", "Ein Fehler kann den Account kosten", "Kündigt jemand, geht das Wissen mit"] },
      right: { label: "Mit TEMOA", value: "Ein eingespieltes Team", points: ["Hat dieselben Hebel hundertfach gezogen", "Ein Vertrag statt vier Dienstleister", "Auf Marge gesteuert, planbar skaliert", "Spürbar günstiger als eigene Stellen"] },
    },
    {
      kind: "rows",
      eyebrow: "Alles aus einer Hand",
      title: "Strategie, Content, Advertising, Betrieb – aus einem Guss.",
      items: [
        { kicker: "Strategie", title: "Erst durchrechnen, dann Geld in die Hand nehmen.", body: "Wettbewerbs- und Keyword-Analyse, Deckungsbeitrag je Produkt, Preis-Korridore, Zielmarken. Wir wissen, wer wofür rankt – und an welchem Hebel bei euch der meiste Umsatz hängt. Diese Lücken werden zur Roadmap für Content und Ads.", icon: "strategy", visual: "benchmark", cta: { label: "Zur Strategie", href: "/leistungen/strategie" } },
        { kicker: "Content", title: "Listings, die für euch verkaufen, während ihr schlaft.", body: "Hauptbild, Galerie, A+ und Premium A+, Titel, Bullets, Backend-Keywords – gebaut für Menschen, die kaufen, und für Rufus, COSMO und A10, die ranken. Der Klick allein zahlt keine Rechnung; der Kauf tut es.", icon: "content", visual: "serp", cta: { label: "Zu Listing & SEO", href: "/leistungen/listing-seo" } },
        { kicker: "Advertising", title: "Werbung, die auf den Deckungsbeitrag gerechnet ist.", body: "Kampagnenarchitektur, Bid- und Budget-Steuerung, Reporting – Sponsored Products, Brands und Display, sauber nach Ziel getrennt. Streuverluste fallen, der Return on Ad Spend steigt, gesteuert auf TACoS statt auf Bruttoumsatz.", icon: "ads", visual: "funnel", cta: { label: "Zum Advertising", href: "/leistungen/ppc-advertising" } },
        { kicker: "Account Management", title: "Der Account läuft – und ihr merkt es nur am Report.", body: "Inventar-Forecasting und FBA-Planung, Buy-Box- und Pricing-Monitoring, Cases und Compliance. Eine Person, die euren Account im Kopf hat, statt einer Ticketnummer, die niemand kennt.", icon: "account", visual: "dashboard", cta: { label: "Zum Account Management", href: "/leistungen/account-management" } },
        { kicker: "Erweiterung", title: "Internationalisierung über fünf Marktplätze.", body: "Euer bewährtes DE-Setup nativ auf FR, IT, ES und NL gespiegelt – lokal recherchiert statt durchgenudelt, zentral gesteuert. Andockbar an die vier Kernleistungen, wenn ihr über die Grenze wollt.", icon: "globe", visual: "markets", cta: { label: "Zur Internationalisierung", href: "/leistungen/internationalisierung" } },
      ],
    },
    {
      kind: "checklist",
      eyebrow: "Im Detail",
      title: "Was in Full Service drinsteckt.",
      description: "Vier Bereiche, ein Team, ein Vertrag. Hier aufgeschlüsselt, damit ihr Posten für Posten seht, was abgedeckt ist – und nichts zwischen den Gewerken liegen bleibt.",
      groups: [
        { title: "Strategie", items: ["Wettbewerbs- & Keyword-Analyse", "Deckungsbeitrag je Produkt", "Preis-Korridore", "Zielmarken für TACoS & Marge", "Wachstums-Roadmap"] },
        { title: "Content", items: ["Hauptbild & Galerie", "A+ / Premium A+", "Titel, Bullets, Beschreibung", "SEO & Backend-Keywords", "Brand Store & Brand Story", "A/B-Tests"] },
        { title: "Advertising", items: ["Sponsored Products & Brands", "Sponsored Display", "Sponsored Brands Video", "Bid- & Budget-Steuerung", "Keyword- & Wettbewerbsanalyse"] },
        { title: "Account Management", items: ["Inventar-Forecasting & FBA", "Buy-Box-Monitoring", "Case-Management", "Compliance & Account-Health", "Reporting & Reviews"] },
      ],
    },
    {
      kind: "callout",
      eyebrow: "Quer durch alle Bereiche",
      title: "Reporting, mit dem ihr entscheiden könnt.",
      body: "Monatliche Reports und Live-Dashboards über alle vier Bereiche. Wir liefern keine Rohdaten zum Selbstdeuten, sondern die zwei, drei Schritte, die als Nächstes den meisten Hebel bringen – und sagen auch, was nicht funktioniert hat.",
    },
    {
      kind: "compare",
      eyebrow: "Ein Bild aus der Praxis",
      title: "Wie sich ein Account drehen kann.",
      description: "Skizziert nach einem Kundenprojekt – kein Versprechen, sondern wie wir arbeiten: zuerst das Fundament tragfähig machen, dann erst skalieren.",
      left: { label: "Vorher", value: "Wachstum auf Pump", points: ["Mehr Umsatz nur gegen mehr Budget", "Werbung trägt das Geschäft, statt es zu verstärken", "Jeder Marktplatz läuft anders"] },
      right: { label: "Nach dem Umbau", value: "Organisch zuerst, profitabel skaliert", points: ["ROAS 4,8×", "−35 % TACoS", "4 Marktplätze, ein Reporting"] },
    },
    {
      kind: "grid",
      eyebrow: "Warum aus einer Hand",
      title: "Vier Dienstleister lösen je ein Viertel. Wir lösen das Ganze.",
      description: "Wer Strategie, Content, Advertising und Betrieb auf vier Anbieter verteilt, bezahlt die Lücken dazwischen – mit verbranntem Budget und mit Wochen, in denen niemand zuständig ist.",
      items: [
        { title: "Marge schlägt Umsatz", body: "Wir steuern auf Deckungsbeitrag und TACoS, nicht auf Umsatz, der die Marge auffrisst.", icon: "margin" },
        { title: "Ein Räderwerk", body: "Strategie, Content, Ads und Betrieb greifen ineinander, statt sich gegenseitig zu blockieren.", icon: "puzzle" },
        { title: "Organisch als Basis", body: "Erst trägt das Listing, dann legt die Werbung nach – Wachstum, das planbar bleibt.", icon: "layers" },
        { title: "Gebaut für Rufus & COSMO", body: "Content für die KI-Suche, die gerade übernimmt – nicht für den Algorithmus von vorgestern.", icon: "spark" },
      ],
    },
    {
      kind: "qa",
      eyebrow: "Bevor ihr fragt",
      title: "Full Service – ohne Marketing-Nebel.",
      items: [
        { q: "Wie viel Arbeit ist die Übergabe für uns?", a: "Ein paar Stunden, verteilt auf die ersten Wochen: Zugänge freischalten, ein Kickoff, ein paar Rückfragen zu Sortiment und Lieferkette. Wir führen euch an einer festen Onboarding-Checkliste durch – ihr bereitet nichts vor, was wir nicht konkret anfragen. Im Betrieb bleiben rund zwei bis vier Stunden im Monat für Calls und Reviews." },
        { q: "Wo verläuft die Grenze zwischen euch und uns?", a: "Wir verantworten die Umsetzung über alle vier Bereiche. Bei euch bleiben die Entscheidungen, die nur ihr treffen könnt: was ins Sortiment kommt, wie die Lieferkette läuft, wo die Preis-Leitplanken stehen, wofür die Marke steht. Account, Kampagnen und Daten gehören durchgehend euch." },
        { q: "Wann sehen wir die ersten Effekte?", a: "In den ersten 30 bis 60 Tagen die schnellen Hebel: Streuverluste raus, liegengebliebene Optimierungen nachgeholt. Nach 60 bis 90 Tagen ziehen Rankings und Effizienz spürbar an. Der eigentliche Umbau zu nachhaltig profitablem Wachstum braucht sechs bis zwölf Monate – alles andere wäre gelogen." },
        { q: "Warum nicht einfach selbst ein Team aufbauen?", a: "Weil dieselbe Bandbreite intern mehrere Vollzeitstellen plus Tools und Einarbeitung bedeutet – und das Risiko, dass das Wissen kündigt, wenn die Person kündigt. Bei uns bekommt ihr für jeden Hebel jemanden, der ihn beherrscht, ohne dass ihr einstellen, einarbeiten und halten müsst." },
        { q: "Wie sicher ist unser Account bei euch?", a: "Wir arbeiten als Benutzer in eurem Seller Central, mit genau den Rechten, die die Betreuung braucht. Ihr behaltet die volle Kontrolle und könnt den Zugriff jederzeit mit einem Klick entziehen." },
        { q: "Wie lange bindet uns der Vertrag?", a: "Quartalsweise kündbar. Keine Jahresbindung, keine Ausstiegsgebühr. 98 % unserer Kunden bleiben – aber wegen der Zahlen, nicht wegen einer Klausel." },
        { q: "Wann lohnt sich Full Service nicht?", a: "Unter rund 50.000 € Monatsumsatz auf Amazon steht unser Honorar in keinem guten Verhältnis zum Hebel – das sagen wir im ersten Gespräch offen. Und wer nur einen einzelnen Baustein braucht, etwa reines Kampagnenmanagement, ist mit einer unserer Einzelleistungen besser bedient." },
      ],
    },
    {
      kind: "bridge",
      eyebrow: "Einzeln statt komplett?",
      title: "Lieber an einer Stelle tiefer gehen?",
      links: services.map((s) => ({ label: s.label, href: s.href })),
    },
  ] as Block[],
};

/* ---------------- SERVICE-DETAILSEITEN ---------------- */
export const serviceDetails: Record<string, { nav: string; hero: Hero; blocks: Block[] }> = {
  strategie: {
    nav: "Strategie",
    hero: {
      eyebrow: "Strategie",
      lead: "Zuerst rechnen.",
      accent: "Dann ausgeben.",
      sub: "Wettbewerb, Keywords, Marge, Zielmarken – wir legen das Fundament, ohne das Content und Advertising nur teuer aussehen. Bevor irgendwo ein Euro fließt, steht fest, welche Produkte das Wachstum tragen und welchen Preis der Markt euch wirklich lässt.",
      chips: ["Wettbewerbsanalyse", "Deckungsbeitrag", "Zielmarken", "Roadmap"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Analyse", title: "Wir legen offen, wo euer Umsatz wirklich liegt.", body: "Wer rankt wofür, zu welchem Preis – und auf welchen Begriffen ihr mit überschaubarem Einsatz nach vorn kommt. Statt Bauchgefühl bekommt ihr eine Landkarte eurer Position im Wettbewerb. Jede Keyword-Lücke darauf wird später zur Aufgabe für Content und Ads.", icon: "search", visual: "serp" },
          { kicker: "Share of Voice", title: "Der Rückstand ist kein Mangel. Er ist eure Reserve.", body: "Eure Sichtbarkeit gegen die fünf stärksten Wettbewerber, dazu CTR und CVR je ASIN. Was die anderen vor euch wegschnappen, ist exakt der Umsatz, der ungenutzt in eurem Account steckt.", icon: "chart", visual: "benchmark" },
          { kicker: "Marge & Preis", title: "Wachstum zählt erst, wenn unten etwas hängen bleibt.", body: "Wir rechnen jede Maßnahme bis auf den Deckungsbeitrag durch: Amazon-Gebühren, FBA, Wareneinsatz, Werbekosten. Daraus werden Preis-Korridore, die Marge und Buy-Box gleichzeitig absichern. So wächst der Umsatz, ohne dass die Profitabilität heimlich abwandert.", icon: "margin", visual: "donut" },
          { kicker: "Zielmarken", title: "Klare Zahlen am Horizont – und ein Weg dorthin.", body: "Wir setzen Zielwerte für TACoS, ACoS und Profitabilität und steuern Monat für Monat dagegen. Daraus entsteht eine priorisierte Roadmap, in der jeder Schritt einen erwarteten Umsatz-Effekt trägt – keine Maßnahme ohne Begründung.", icon: "target", visual: "kpis", bullets: ["14 % TACoS als Richtwert", "Monatlicher Review-Takt", "Roadmap sortiert nach Umsatz-Effekt"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "So läuft es ab",
        title: "Von Lesezugriff zu Zielbild – in drei bis vier Wochen.",
        items: [
          { n: "1", title: "Audit & Analyse", body: "Marge, Keywords, Wettbewerb auf den Tisch – Status quo schwarz auf weiß." },
          { n: "2", title: "Zielbild & Zahlen", body: "Verbindliche Zielwerte für Umsatz, Marge und Effizienz." },
          { n: "3", title: "Roadmap", body: "Maßnahmen sortiert nach erwartetem Umsatz-Effekt." },
          { n: "4", title: "Laufende Steuerung", body: "Monatliche Reviews, Feinjustage gegen die Zielmarken." },
        ],
      },
      {
        kind: "qa",
        eyebrow: "Bevor ihr fragt",
        title: "Strategie – ohne Marketing-Nebel.",
        items: [
          { q: "Bekommen wir am Ende nur ein Foliendeck?", a: "Nein. Ihr bekommt einen Arbeitsplan: Deckungsbeitrag je Produkt, Keyword-Lücken, Preis-Korridore und priorisierte Maßnahmen mit erwartetem Umsatz-Effekt. Etwas, mit dem man am Montag loslegt, keine Präsentation für die Schublade." },
          { q: "Wie lange zieht sich die Strategiephase?", a: "In der Regel drei bis vier Wochen vom Lesezugriff bis zum fertigen Zielbild. Danach steuern wir die Zahlen monatlich nach – Strategie ist bei uns kein Dokument, sondern ein Takt." },
          { q: "Welcher TACoS ist realistisch?", a: "Das hängt an Kategorie, Marge und Wettbewerb – eine Pauschalzahl wäre unseriös. Als Orientierung arbeiten wir oft auf einen Korridor um 14 % hin und leiten den konkreten Zielwert aus eurer echten Marge ab." },
          { q: "Geht Strategie auch ohne den Rest?", a: "Ja, als Einzelleistung mit individuellem Angebot. Ihren vollen Hebel entfaltet sie aber erst, wenn Content und Advertising direkt auf der Roadmap aufsetzen – sonst bleibt der Plan ein Plan." },
        ],
      },
      weitere("strategie", "Strategie ist der Plan. Hier folgt die Umsetzung."),
    ],
  },

  "listing-seo": {
    nav: "Listing & SEO",
    hero: {
      eyebrow: "Content",
      lead: "Euer bester Verkäufer",
      accent: "macht keine Pause.",
      sub: "Ein gutes Listing verkauft rund um die Uhr – ein mittelmäßiges verbrennt Klicks, für die ihr bei den Ads schon bezahlt habt. Wir bauen es für Menschen, die kaufen wollen, und für die KI-Suche von Rufus, COSMO und A10: Bilder, A+ und Keywords, die aus Aufrufen Bestellungen machen.",
      chips: ["Hauptbild & Galerie", "A+ / Premium A+", "SEO & Backend", "Brand Store"],
    },
    blocks: [
      {
        kind: "callout",
        eyebrow: "Warum Listings verlieren",
        title: "Euer Produkt steckt auf Seite 10 fest?",
        body: "Dann liegt es selten am Produkt, fast immer am Listing. Amazon zieht über 750 Datenfelder für Ranking und Conversion heran – die meisten Seller bespielen davon keine zehn Prozent. Genau in dieser Lücke wandert euer Umsatz gerade zu Wettbewerbern, die ihre Hausaufgaben gemacht haben.",
      },
      {
        kind: "grid",
        eyebrow: "Was wir anpacken",
        title: "Vom ersten Blick bis zum Klick auf „Kaufen“.",
        items: [
          { title: "Hauptbild & Galerie", body: "Bilder, die in der Ergebnisliste den Klick holen – mit USP, Maßstab und Anwendung statt Freisteller-Einerlei.", icon: "content" },
          { title: "A+ & Premium A+", body: "Module, die Einwände vorwegnehmen, Vertrauen aufbauen und den Warenkorbwert heben.", icon: "layers" },
          { title: "Titel, Bullets, Beschreibung", body: "Klar, relevant, auf den Kauf geschrieben – kein Datenblatt, sondern Verkauf in Worten.", icon: "search" },
          { title: "SEO & Backend-Keywords", body: "Die richtigen Begriffe sichtbar und im Backend platziert – für Rufus, COSMO und A10.", icon: "target" },
          { title: "Brand Store & Brand Story", body: "Eine Markenwelt, die über alle ASINs zusammenpasst und CI-konform aufgebaut ist.", icon: "globe" },
          { title: "A/B-Tests", body: "Bild gegen Bild, Titel gegen Titel – entschieden wird mit Daten, nicht im Meeting.", icon: "chart" },
        ],
      },
      {
        kind: "rows",
        items: [
          { kicker: "750+ Datenfelder", title: "Worauf Amazon wirklich schaut – nicht nur die Oberfläche.", body: "Ranking entsteht aus weit mehr als Titel und Bild. Wir bespielen alle drei Ebenen: das Sichtbare (Titel, Bullets, Hauptbild), das Verborgene (Backend-Keywords, Browse-Nodes, Attribute) und das Strategische (Kategorie-Wahl, Varianten, Beziehungen zwischen Suchbegriffen). Die meisten optimieren nur, was jeder sieht – und wundern sich über den Rest.", icon: "layers", visual: "fields" },
        ],
      },
      {
        kind: "grid",
        eyebrow: "Wo es klemmt",
        title: "Vier Stellen, an denen Listings Umsatz liegen lassen.",
        cols: 2,
        items: [
          { title: "Hauptbild ohne Aussage", body: "Austauschbar statt klickstark – der erste Eindruck verpufft in der Ergebnisliste.", icon: "content" },
          { title: "Basic-A+ oder Textwüste", body: "Gar kein A+, beliebige Module oder zusammengeschoben statt geführt.", icon: "layers" },
          { title: "Schwache Titel & Bullets", body: "Titel zu knapp, Bullets wie ein Beipackzettel, Long-Tails komplett vergessen.", icon: "search" },
          { title: "Kein Brand Store", body: "Keine Markenwelt, nicht alle ASINs eingebunden, nicht CI-konform.", icon: "globe" },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "So läuft es ab",
        title: "Retail-ready in vier Schritten.",
        items: [
          { n: "01", title: "Retail-Readiness-Audit", body: "Wo Bilder, A+ und SEO heute Conversion verschenken." },
          { n: "02", title: "Content-Konzept", body: "Bildsprache, A+-Story und Keyword-Architektur festgelegt." },
          { n: "03", title: "Produktion", body: "Bilder, A+ und Texte aus einer Hand umgesetzt." },
          { n: "04", title: "SEO & A/B-Tests", body: "Feinschliff über Tests – und danach nicht stehen gelassen." },
        ],
      },
      {
        kind: "qa",
        eyebrow: "Bevor ihr fragt",
        title: "Listing & SEO – ohne Marketing-Nebel.",
        items: [
          { q: "Wie schnell wirkt eine Überarbeitung?", a: "Die Umsetzung – Recherche, Texte, Bilder – dauert meist ein bis zwei Wochen. Bis Amazon die Änderungen indexiert und sich Ranking und Conversion sichtbar bewegen, plant 30 bis 60 Tage ein." },
          { q: "Garantiert ihr uns Platz 1?", a: "Nein – das kann seriös niemand. Zu viele Faktoren liegen außerhalb unserer Reichweite. Wir garantieren saubere Arbeit auf allen drei Ranking-Ebenen und machen jede Verbesserung an Zahlen fest, nicht an Versprechen." },
          { q: "Wie findet ihr heraus, was tatsächlich besser konvertiert?", a: "Über A/B-Tests von Bildern, Titeln und A+-Modulen. Damit ein Ergebnis trägt und nicht der Zufall entscheidet, lassen wir Tests mindestens rund zehn Wochen bzw. ab etwa 400 Produktseiten-Aufrufen laufen." },
          { q: "Schadet eine Überarbeitung dem laufenden Ranking?", a: "Nicht, wenn man behutsam vorgeht. Wir ändern schrittweise und beobachten die Wirkung, statt mit einem Schlag alles umzuwerfen und zu hoffen." },
          { q: "Macht ihr das auch für ausländische Marktplätze?", a: "Ja – und zwar lokalisiert, nicht durch den Übersetzer gejagt. Jeder Markt bekommt eigene Keyword-Recherche und nativ formulierten Content. Mehr dazu unter Internationalisierung." },
        ],
      },
      weitere("listing-seo"),
    ],
  },

  "ppc-advertising": {
    nav: "PPC Advertising",
    hero: {
      eyebrow: "Advertising",
      lead: "Ads verstärken.",
      accent: "Sie ersetzen nichts.",
      sub: "Advertising ist für die meisten der dickste Posten im Budget – und der, in dem am leisesten Geld versickert. Wir drücken die Streuverluste und ziehen den Return on Ad Spend hoch: Werbung verstärkt, was organisch schon zieht, statt es zu beatmen. Gesteuert auf TACoS, nicht auf Bruttoumsatz.",
      chips: ["Sponsored Products", "Sponsored Brands", "Sponsored Display", "Gesteuert auf TACoS"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Architektur", title: "Jeder Euro bekommt eine Aufgabe.", body: "Sponsored Products, Brands und Display – getrennt nach Ziel und Match-Typ. So sehen wir auf einen Blick, welche Kampagne erobert, welche verteidigt und welche skaliert. Keine Black-Box, in der ein Gewinner-Begriff und ein Budget-Fresser sich denselben Topf teilen.", icon: "ads", visual: "adformats" },
          { kicker: "Keyword-Harvesting", title: "Gewinner adoptieren, Verlierer aussperren.", body: "Auto-Kampagnen fischen neue Suchbegriffe an. Was konvertiert, bekommt eine eigene Kampagne mit eigenem Gebot. Was nur Geld kostet, wandert auf die Negativliste. Dieser Kreislauf läuft wöchentlich – und macht den Account mit jeder Woche ein Stück effizienter.", icon: "target", visual: "harvest" },
          { kicker: "Effizienz", title: "Weniger Gießkanne, mehr Rendite.", body: "Wir senken den ACoS, ohne den Umsatz abzuwürgen: schärfere Begriffe, schärfere Gebote, bessere Landing-Listings. Heraus kommt ein ROAS, der nicht zufällig gut aussieht, sondern planbar nach oben läuft.", icon: "chart", visual: "funnel", bullets: ["−30 % ACoS als Richtwert", "4,8× ROAS", "Gesteuert auf TACoS"] },
        ],
      },
      {
        kind: "grid",
        eyebrow: "Die Kampagnen-Architektur",
        title: "Eine Struktur, in der nichts im Sammeltopf landet.",
        items: [
          { title: "Auto & Manual", body: "Auto-Kampagnen entdecken, manuelle skalieren – beide mit klar zugewiesener Rolle.", icon: "target" },
          { title: "Match-Typen sauber getrennt", body: "Exact, Phrase und Broad auseinandergehalten – für jeden Begriff der passende Hebel.", icon: "search" },
          { title: "Sponsored Products", body: "Das Fundament: Platzierungen direkt in der Suche und auf Produktseiten.", icon: "ads" },
          { title: "Sponsored Brands", body: "Markenbanner über den Ergebnissen, inklusive Video – für Sichtbarkeit und Wiedererkennung.", icon: "content" },
          { title: "Sponsored Display", body: "Retargeting und gezielte Platzierung dort, wo Wettbewerber stehen.", icon: "layers" },
          { title: "Brand-Defense & Segmente", body: "Eigene Markenbegriffe halten, Kampagnen nach Produktlinie, Marge und Ziel trennen.", icon: "shield" },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Der Takt",
        title: "Einmal aufsetzen reicht nie. Wir bleiben dran.",
        description: "Performance kommt aus Kadenz, nicht aus einem schönen Setup zum Start. Drei Takte, ein Ziel: jede Woche ein effizienterer Account.",
        items: [
          { n: "01", title: "Täglich · Wache", body: "Kampagnen im Blick – Ausreißer abfangen, bevor sie Budget kosten." },
          { n: "02", title: "Wöchentlich · Feinschliff", body: "Gebote nachziehen, Budgets umschichten, Negativliste pflegen, Gewinner umziehen." },
          { n: "03", title: "Monatlich · Review", body: "Struktur, Zielmarken und Budget-Verteilung kommen auf den Prüfstand." },
          { n: "04", title: "Laufend · Skalieren", body: "Halten, ausbauen, erweitern: Budget dorthin, wo der ROAS stimmt, dann neue Begriffe und Platzierungen erschließen." },
        ],
      },
      {
        kind: "qa",
        eyebrow: "Bevor ihr fragt",
        title: "PPC – ohne Marketing-Nebel.",
        items: [
          { q: "Warum nicht einfach das Budget hochdrehen?", a: "Weil mehr Budget einen schwachen Hebel nur teurer macht. Ads liefern Besucher – verkaufen muss das Listing. Erst wenn Struktur, Begriffe und Conversion sitzen, bringt zusätzliches Budget zusätzlichen profitablen Umsatz statt nur höhere Kosten." },
          { q: "Was ist ein guter TACoS?", a: "Es gibt keinen Wert, der für alle stimmt – er hängt an Marge, Kategorie und Phase. Wir steuern bewusst auf TACoS statt nur auf ACoS, weil TACoS auch den organischen Umsatz mitzählt. Den Zielwert leiten wir aus eurer konkreten Marge ab." },
          { q: "Warum TACoS statt ACoS?", a: "ACoS misst nur die Werbung für sich allein. TACoS setzt die Werbekosten ins Verhältnis zum gesamten Umsatz – organische Verkäufe eingeschlossen. Sinkt der TACoS, heißt das: die Werbung zieht paid und organisch effizient nach oben. Das ist die Kennzahl, an der echte Profitabilität hängt." },
          { q: "Wann sehen wir Ergebnisse?", a: "Erste Effekte – weniger Streuverlust, sauberere Struktur – meist in 30 bis 45 Tagen. Spürbar sinkender ACoS und Wachstum in 60 bis 90 Tagen. Das Beste kommt über die Monate, weil der Harvesting-Kreislauf sich aufaddiert." },
          { q: "Braucht ihr eine lange Vertragslaufzeit?", a: "Nein, quartalsweise kündbar. Wir empfehlen mindestens ein Quartal, damit man fair beurteilen kann – danach bleibt ihr, wenn die Zahlen es hergeben." },
        ],
      },
      weitere("ppc-advertising"),
    ],
  },

  "account-management": {
    nav: "Account Management",
    hero: {
      eyebrow: "Account Management",
      lead: "Der Betrieb, der euren Account",
      accent: "geräuschlos hält.",
      sub: "Eine feste Ansprechperson, die euren Account im Kopf hat und vorausschauend steuert: Bestand, Buy-Box, Compliance und Reporting im Griff, damit ihr euch um die Marke kümmert statt um Tickets. Ein Mensch am Telefon statt einer Nummer im System.",
      chips: ["Inventar-Forecasting", "Buy-Box-Monitoring", "Compliance", "Reporting"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Inventar", title: "Bestand ist Ranking.", body: "Wir prognostizieren die Nachfrage und setzen Nachbestellpunkte, bevor es eng wird. Out-of-stock kostet Ranking, das ihr euch teuer zurückkaufen müsst; Überbestand bindet Kapital, das woanders fehlt. Wir halten die Mitte – und ihr seht jederzeit, wann nachbestellt werden muss, ohne böse Überraschung.", icon: "layers", visual: "dashboard" },
          { kicker: "Buy-Box & Health", title: "Die Buy-Box verliert man im Stillen.", body: "Preis, Verfügbarkeit und Versand steuern wir so, dass die Buy-Box bei euch bleibt – und behalten Account-Health und Policy-Themen im Auge, lange bevor daraus eine Sperre wird. Fällt etwas auf, kümmern wir uns. Nicht ihr.", icon: "shield", visual: "kpis" },
          { kicker: "Reporting", title: "Zahlen, schon in Entscheidungen übersetzt.", body: "Monatliche Reports und Live-Dashboards – und eine feste Ansprechperson, die sie mit euch durchgeht. Keine Rohdaten zum Selbstdeuten, sondern die nächsten konkreten Schritte.", icon: "chart", visual: "donut", bullets: ["Eine feste Ansprechperson", "Monatlich Report & Review", "100 % Einblick in alle Zahlen"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "So läuft es ab",
        title: "Vier Routinen. Ein ruhiger Account.",
        items: [
          { n: "1", title: "Onboarding & Setup", body: "Zugänge, Abläufe und Zuständigkeiten sauber aufgesetzt." },
          { n: "2", title: "Forecasting & Monitoring", body: "Bestand, Buy-Box und Preis laufend im Blick." },
          { n: "3", title: "Compliance & Cases", body: "Account-Health vorausschauend, Fälle zügig gelöst." },
          { n: "4", title: "Reporting & Reviews", body: "Monatliche Reports, regelmäßige Calls, Quartals-Review." },
        ],
      },
      {
        kind: "qa",
        eyebrow: "Bevor ihr fragt",
        title: "Account Management – ohne Marketing-Nebel.",
        items: [
          { q: "Bekommen wir eine feste Person oder ein Ticketsystem?", a: "Eine feste Ansprechperson, die euren Account kennt – erreichbar per Mail, Telefon und Video. Kein anonymes Postfach, in dem ihr jedes Mal bei null anfangt zu erklären." },
          { q: "Wie viel Zeit kostet uns das im Betrieb?", a: "Wenig. Den Betrieb übernehmen wir; bei euch bleiben rund zwei bis vier Stunden im Monat für Calls und Reviews – plus die Entscheidungen, die nur ihr treffen könnt." },
          { q: "Wie sicher ist der Zugriff auf unseren Account?", a: "Wir arbeiten als Benutzer in eurem Seller Central mit genau den Rechten, die die Betreuung braucht. Ihr behaltet die volle Kontrolle und könnt den Zugriff jederzeit entziehen. Account und Daten gehören durchgehend euch." },
          { q: "Was passiert bei einer Sperre oder einem dringenden Fall?", a: "Wir behalten Account-Health und Policy-Themen vorausschauend im Blick und greifen ein, bevor etwas eskaliert. Tritt ein Fall ein, führen wir die Kommunikation mit Amazon – nicht ihr." },
          { q: "Lässt sich Account Management einzeln buchen?", a: "Ja, als Einzelleistung mit individuellem Angebot. Den größten Hebel entfaltet es im Zusammenspiel mit Strategie, Content und Advertising." },
        ],
      },
      weitere("account-management"),
    ],
  },

  internationalisierung: {
    nav: "Internationalisierung",
    hero: {
      eyebrow: "Internationalisierung",
      lead: "Übersetzen kann jedes Tool.",
      accent: "Verkaufen muss man lokalisieren.",
      sub: "Wir übersetzen nicht, wir lokalisieren: Content, PPC und Betrieb nativ pro Marktplatz – lokal recherchiert, lokal getextet, lokal optimiert. Und alles in einem gemeinsamen Reporting zusammengeführt, damit ihr über alle Länder hinweg Zahlen vergleicht, die wirklich vergleichbar sind.",
      chips: ["5+ Marktplätze", "Lokalisierte Listings", "Preis pro Markt", "PPC je Land"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Roll-out", title: "Ein Setup, Markt für Markt gespiegelt.", body: "Wir nehmen euer erprobtes DE-Setup und übertragen es strukturiert auf weitere Marktplätze – mit eigener Markt-Analyse und der lokalen Logistik dahinter. Ihr seht jederzeit, welcher Markt live ist und wie weit der nächste Launch gediehen ist.", icon: "globe", visual: "markets" },
          { kicker: "Lokalisieren statt übersetzen", title: "Wort für Wort übersetzt verkauft niemandem etwas.", body: "Eine reine Übersetzung trifft weder die Suchbegriffe noch den Ton im Zielmarkt – sie wird verstanden, aber nicht gekauft. Wir recherchieren je Land eigene Keywords, texten nativ und bauen Content, der dort rankt und konvertiert, statt nur korrekt zu sein.", icon: "content", visual: "serp", bullets: ["Eigene Keyword-Recherche pro Markt", "Nativ getextet, nicht übersetzt", "4 Marktplätze im Case Gartenmarke"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "So läuft es ab",
        title: "Ein Playbook, mehrfach ausgerollt.",
        description: "Wir schärfen euer Best-Practice-Setup im Heimatmarkt und übertragen es strukturiert auf weitere Länder – nativ lokalisiert, zentral gesteuert.",
        items: [
          { n: "01", title: "Playbook (DE)", body: "Best-Practice-Setup im Heimatmarkt scharf stellen." },
          { n: "02", title: "Lokalisierung", body: "Listings, Keywords und Content nativ pro Markt." },
          { n: "03", title: "Roll-out", body: "Strukturierter Launch in FR, IT, ES und NL." },
          { n: "04", title: "Cross-Market-Steuerung", body: "Ein Reporting über alle Märkte hinweg." },
        ],
      },
      {
        kind: "callout",
        eyebrow: "Fünf Marktplätze",
        title: "Fünf Märkte, zentral gesteuert, ein Reporting.",
        body: "DE, FR, IT, ES und NL – jeder Markt nativ lokalisiert, alle zusammen in einem konsolidierten Reporting. So vergleicht ihr Länder auf einer Datenbasis, statt fünf Insellösungen gegeneinander zu jonglieren.",
      },
      {
        kind: "qa",
        eyebrow: "Bevor ihr fragt",
        title: "Internationalisierung – ohne Marketing-Nebel.",
        items: [
          { q: "Reicht nicht eine gute Übersetzung?", a: "Nein. Eine Übersetzung trifft selten die Suchbegriffe und den Ton im Zielmarkt. Wir recherchieren je Land eigene Keywords und texten nativ – sonst rankt der Content nicht und verkauft schlechter, egal wie sauber die Grammatik ist." },
          { q: "Welche Marktplätze deckt ihr ab?", a: "Die fünf großen EU-Marktplätze: Deutschland, Frankreich, Italien, Spanien und die Niederlande – zentral gesteuert, mit einem gemeinsamen Reporting." },
          { q: "Wie lange dauert ein Markt-Launch?", a: "Das hängt an Sortiment und Logistik. Weil wir euer erprobtes DE-Setup als Playbook nutzen, läuft jeder weitere Markt strukturierter und schneller als der erste – den konkreten Fahrplan legen wir im Projekt fest." },
          { q: "Müssen wir in Deutschland erst stark sein?", a: "Es hilft enorm. Ein im Heimatmarkt geschärftes Setup ist die Vorlage, die wir spiegeln. Steht dieses Fundament noch nicht, fangen wir dort an – sonst skaliert ihr eure Schwächen gleich in vier Länder mit." },
        ],
      },
      weitere("internationalisierung"),
    ],
  },
};

/* ---------------- CASE STUDIES ---------------- */
export const caseStudies = [
  {
    brand: "FUTUM",
    sector: "Schädlingsbekämpfung · DE",
    metric: "80 %",
    metricLabel: "der Verkäufe organisch im Peak",
    ausgangslage: "Am Tropf der bezahlten Klicks: kaum organische Sichtbarkeit, und ein ACoS, der vom Deckungsbeitrag mehr abbiss, als gesund war.",
    quote: "Heute kommt der Großteil unserer Verkäufe organisch – Werbung ist die Kür, nicht das Überleben.",
    color: "#FF9900",
  },
  {
    brand: "HaA",
    sector: "Küche & Haushalt · DE",
    metric: "+439 %",
    metricLabel: "mehr Conversion in 17 Wochen",
    ausgangslage: "Hohe Werbeausgaben, stehender Umsatz, schwache Listings, kein klares Zahlenbild. Der Account wuchs nicht – er wurde nur Monat für Monat teurer.",
    quote: "Zum ersten Mal wachsen Umsatz und Marge bei uns gleichzeitig, statt sich abzuwechseln.",
    color: "#FF3131",
  },
  {
    brand: "Gartenmarke",
    sector: "Garten · DE/IT/FR/ES",
    metric: "−35 %",
    metricLabel: "TACoS über vier Marktplätze",
    ausgangslage: "Expansion ins Ausland mit bloß übersetzten Listings, je Markt eine andere Performance und kein Reporting, das die Länder vergleichbar machte.",
    quote: "Ein System über vier Länder – endlich Zahlen, die man nebeneinanderlegen kann, und Wachstum, das sich planen lässt.",
    color: "#0E7CA0",
  },
];
