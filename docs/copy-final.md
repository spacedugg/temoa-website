# TEMOA — Finales Website-Copywriting (alle Seiten)

**Stand:** 2026-06-17 · Feintuning + Erweiterung auf Basis von `src/lib/copy.ts`,
`docs/copywriting.md`, `docs/messaging-startseite.md` und der Wettbewerber-Recherche
(`docs/competitors/`).

**Lesehilfe für die Übernahme:**
- Pro Seite eine `##`-Überschrift, Sektionen in Seitenreihenfolge.
- Jede Sektion nennt das **Block-kind** (`rows` / `grid` / `numbered` / `compare` /
  `checklist` / `callout` / `bridge` / `qa`) bzw. **Hero** (eyebrow/lead/accent/sub/chips)
  oder **Komponente** (Homepage-Sektionen sind eigene React-Komponenten, keine Blocks).
- Heroes folgen dem Typ `{ eyebrow; lead; accent; sub; chips? }` — die Headline ist
  visuell `lead` + hervorgehobener `accent`.
- Nicht belegte Zahlen sind als `[PLATZHALTER: …]` markiert.
- Erlaubte Proof-Points (durchgängig konsistent): **60+ Marken · 21 Mio € betreuter
  Umsatz p. a. · 5+ Länder/Marktplätze · 98 % Kundenbindung**; Cases: **FUTUM**
  (80 % organischer Anteil im Peak), **HaA** (+439 % Conversion in 17 Wochen),
  **Gartenmarke** (−35 % TACoS / 4 Marktplätze); bereits genutzte Richtwerte:
  14 % TACoS-Ziel, 4,8× ROAS, −30 % ACoS.

---

# 1. Homepage

> Die Homepage besteht aus eigenständigen React-Komponenten (kein `Block[]`). Pro
> Sektion ist unten die **Komponente** genannt und der finale Text für ihre Felder
> (Eyebrow, Title, Description, Body, Karten-Texte, Stat-Labels). Reihenfolge wie in
> `src/app/page.tsx`: Hero → MobileStats/Clients → WhyTemoa → OrganicFirst → TwoLevers
> → FullService → ServicesDetail → Results → DataAI → ProofPoint → Process → Team → CTA.

## 1.1 Hero  ·  Komponente `Hero.tsx`

- **eyebrow (Badge):** „Full-Service" + „Amazon-Agentur" (wie bisher)
- **Headline (lead + accent):**
  „Amazon-Wachstum ist keine Frage des **Werbebudgets.**"
  *(beibehalten — sitzt, ist scharf und on-message; `Werbebudgets.` bleibt der
  hervorgehobene Teil)*
- **sub:**
  „Wir führen euren kompletten Amazon-Account — Strategie, Listing & SEO, Advertising
  und Betrieb. Mehr Umsatz **bei besserer Marge**, weil zuerst das **Listing trägt**
  und dann die **Ads skalieren.**"
- **Primär-CTA:** „Gespräch vereinbaren"  ·  **Sekundär-CTA:** „Ergebnisse ansehen"
- **Microcopy unter CTA (neu, dezent):** „30 Minuten mit der Geschäftsführung. Kein
  Pitch, keine Folien."
- **Stat-Band (4 Werte) — finalisiert, nur belegte Zahlen:**
  - `+30 %` · „mehr Profitabilität" · Note: „⌀ über betreute Marken" *(Richtwert aus
    copy.ts beibehalten — siehe Annahmen)*
  - `60+` · „betreute Marken" · Note: „in 5+ Ländern aktiv"
  - `21 Mio €` · „betreuter Umsatz p. a." · Note: „verwaltetes Volumen"
  - `98 %` · „Kundenbindung" · Note: „Marken, die bleiben"

**Hinweis Dashboard-Mock:** Die Kachel-Werte (`€1,8M`, `TACoS 9,4 %`, `CVR +12,5 %`,
Peak `€19.740`) sind illustrative Mock-Daten ohne Außenaussage — beibehalten, aber als
generisches Beispiel verstehen (siehe Annahmen).

---

## 1.2 Social Proof  ·  Komponenten `MobileStats.tsx` / `Clients.tsx` / `StatsBand.tsx`

- **Logoleiste — Überzeile:** „Marken, die uns ihren Account anvertrauen"
- **Kennzahlen-Band (4 Werte, EU):**
  - `60+` betreute Marken
  - `21 Mio €` betreuter Umsatz p. a.
  - `98 %` Kundenbindung — ohne lange Vertragslaufzeiten
  - `5+` Amazon-Marktplätze (DE · FR · IT · ES · NL)

---

## 1.3 Warum TEMOA  ·  Komponente `WhyTemoa.tsx`

- **eyebrow:** „Warum TEMOA"
- **title:** „Warum Marken mit uns arbeiten — **und bleiben.**"
- **description:** „Kein Dienstleister für Einzelteile, sondern ein Team, das euren
  Account wie ein eigenes Geschäft führt — auf Marge, mit System und voller
  Transparenz."
- **Karte 1 — Marge:** Titel „Marge statt Vanity-Umsatz" · Body „Wir steuern auf
  Profitabilität und TACoS — nicht auf Umsatz, der die Marge auffrisst." *(Donut-Werte
  sind Mock — siehe Annahmen)*
- **Karte 2 — Ein Team:** Titel „Ein Team für alles" · Body „Strategie, Listing &
  SEO, Advertising und Betrieb greifen ineinander — statt euch an drei Dienstleistern
  aufzureiben. Ein Ansprechpartner, ein System." *(„Ein Team" statt „Ein Partner" —
  stärker auf die Full-Service-Klammer eingezahlt; Node-Flow-Metric „1 Team")*
- **Karte 3 — Planbar:** Titel „Planbar & transparent" · Body „Klare KPIs,
  regelmäßige Reports und ein fester Ansprechpartner. Kein Blindflug, keine Blackbox."
  *(KPI-Kacheln sind Mock — siehe Annahmen)*

---

## 1.4 Organic First  ·  Komponente `OrganicFirst.tsx`

- **eyebrow (Badge):** „Unser Prinzip"
- **Headline (zweizeilig):** „Organic First." / „**PPC Second.**"
- **Body 1:** „Die meisten Marken starten mit Ads. Wir bauen zuerst das Fundament,
  das Werbung überhaupt profitabel macht."
- **Body 2:** „Erst wenn euer Listing nachweislich konvertiert, drehen wir den
  Traffic auf — jeder Klick trifft dann auf ein Listing, das verkauft. Das Ziel:
  ein Großteil des Umsatzes läuft organisch, die Ads verstärken, statt zu tragen."
- **Flywheel-Knoten (4 Stufen, beibehalten):** 01 Besseres Listing · 02 Höhere
  Conversion · 03 Besseres Ranking · 04 Mehr organische Sales

---

## 1.5 Zwei Hebel  ·  Komponente `TwoLevers.tsx`

- **eyebrow:** „Zwei Hebel"
- **title:** „Ranking und Conversion — **wir drehen an beiden.**"
- **description:** „Sichtbarkeit ohne Conversion verbrennt Budget. Conversion ohne
  Sichtbarkeit bleibt unsichtbar. Wir bewegen beide Hebel gleichzeitig — das ist der
  Unterschied zwischen teurem Traffic und profitablem Wachstum."
- **Stat-Karte 1:** `+12,5 %` „Conversion Rate" · „Bilder, A+ und Listings, die aus
  Klicks Käufer machen." *(Richtwert — siehe Annahmen)*
- **Stat-Karte 2:** `+147 %` „Organisches Wachstum" · „Sichtbarkeit, die bleibt —
  ohne dauerhaft Budget nachzuschieben."
  > ⚠️ **PLATZHALTER/PRÜFEN:** Die `+147 %` stammen aus dem alten Vitaworld-Beispiel
  > (nicht in der erlaubten Proof-Point-Liste). Empfehlung: durch einen belegten Wert
  > ersetzen, z. B. die FUTUM-Aussage **„80 % organischer Anteil im Peak"** (passt zur
  > danebenstehenden 80-%-KPI-Kachel) — dann Label „Organischer Umsatzanteil". Bis zur
  > Klärung: `[PLATZHALTER: +147 % organisches Wachstum — durch belegten Wert ersetzen]`.

---

## 1.6 Full Service 360°  ·  Komponente `FullService.tsx` (Pinned-Tabs)

- **eyebrow:** „Full Service 360°"
- **title:** „Fünf Bereiche, **ein System.**"
- **description:** „Einzelne Dienstleister lösen immer nur die Hälfte. Bei uns greifen
  Strategie, Listing & SEO, Advertising, Betrieb und Internationalisierung ineinander
  — mehr als die Summe der Teile."
- **Tab/Panel-Texte (5 Säulen):**

  1. **Strategie** · Eyebrow „Strategy Suite" · Tag „Analyse, Margen & KPI-Steuerung"
     · Titel „Wettbewerbs- & Keyword-Analyse" · Metric „Marktanteil" · Body „Wir
     wissen, wer wofür rankt — und zu welchem Preis. So liegt der nächste Hebel offen,
     statt im Bauchgefühl."
  2. **Listing & SEO** · Eyebrow „Content Studio" · Tag „Bilder, A+, SEO & Brand Store"
     · Titel „Listing & A+ Content" · Metric „Retail-ready" · Body „Bilder, A+ und SEO,
     die aus Klicks zahlende Käufer machen — gebaut für Rufus, COSMO und A10."
  3. **Advertising** · Eyebrow „Advertising Engine" · Tag „Sponsored Products, Brands
     & Display" · Titel „PPC Performance" · Metric „ROAS 4,8×" · Body „Kampagnen, die
     profitabel skalieren — Streuverluste runter, Return on Ad Spend rauf."
     *(Tag von „PPC, Sponsored Brands & Video" auf die drei Formate vereinheitlicht —
     siehe PPC-Seite; Video ist Teil von Sponsored Brands.)*
  4. **Account Management** · Eyebrow „Management Hub" · Tag „Inventar, Buy-Box &
     Reporting" · Titel „Inventar & Buy-Box" · Metric „Buy-Box-Anteil hoch halten" ·
     Body „Forecasting, Buy-Box und Reporting — euer Konto läuft, ohne dass ihr ran
     müsst."
     > ⚠️ **PLATZHALTER:** Metric bisher „Buy-Box 100 %". 100 % ist nicht belegbar.
     > Empfehlung: qualitativ „Buy-Box-Anteil hoch halten" **oder**
     > `[PLATZHALTER: Buy-Box-Anteil %]`. Die Buy-Box-Visual-Werte (88→100 %) sind Mock.
  5. **Internationalisierung** · Eyebrow „Markets" · Tag „Lokalisierung & 5+ Marktplätze"
     · Titel „Internationalisierung" · Metric „5+ Marktplätze" · Body „Euer erprobtes
     Setup nativ auf neue Märkte ausgerollt — lokalisiert statt nur übersetzt, zentral
     gesteuert."

---

## 1.7 Was in Full Service steckt  ·  Komponente `ServicesDetail.tsx`

- **eyebrow:** „Im Detail"
- **title:** „Was in **Full Service** steckt."
- **CTA rechts:** „Alle Leistungen" → `/full-service`
- **8 Karten (Kategorie · Titel · Body):**
  1. *Strategie* — „Wettbewerbs- & Keyword-Analyse" — „Wer rankt wofür, zu welchem
     Preis — und wo genau euer Hebel liegt."
  2. *Strategie* — „Margenkalkulation & KPIs" — „Jede Maßnahme wird auf Deckungsbeitrag
     und TACoS durchgerechnet."
  3. *Content* — „Bilder, A+ & Premium A+" — „Hauptbild, Galerie und A+, die in
     Sekunden den Klick gewinnen und Vertrauen schaffen."
  4. *Content* — „SEO & Backend-Keywords" — „Relevante Keywords im Listing und Backend
     — für Rufus, COSMO & A10."
  5. *Advertising* — „PPC Advertising & Reporting" — „Profitable Kampagnen plus
     transparente, regelmäßige Reports mit klaren nächsten Schritten."
  6. *Account* — „Inventar & FBA-Forecasting" — „Forecasting und Nachschub, damit ihr
     nie out-of-stock geht."
  7. *Account* — „Internationalisierung" — „Neue Marktplätze sauber ausrollen — nativ
     in bis zu fünf Ländern."
  8. *Account* — „Compliance & Troubleshooting" — „Cases, Sperren, Buy-Box-Verlust —
     wir lösen es, bevor es weh tut."

  *(Inhaltlich tragfähig — nur „wöchentliche" → „regelmäßige" Reports, um keine fixe
  Kadenz zu versprechen, die nicht überall gilt.)*

---

## 1.8 Ergebnisse  ·  Komponente `Results.tsx`

- **eyebrow:** „Ergebnisse"
- **title:** „Echte Zahlen, **echte Marken.**"
- **description:** „Kein Wachstum auf dem Papier, sondern messbare Resultate: mehr
  Umsatz, bessere Marge und ein gesundes Konto — ein System, Organic First. Einzel­-
  ergebnisse aus laufenden Mandaten."
- **CTA rechts:** „Alle Cases" → `/ergebnisse`
- **3 Case-Karten (belegt, konsistent mit `caseStudies`):**
  - *Schädlingsbekämpfung · DE* — `80 %` „organische Verkäufe im Peak" — Zitat: „Wir
    verkaufen heute überwiegend organisch — Werbung ist Kür, nicht Pflicht." (FUTUM)
  - *Küche & Haushalt · DE* — `+439 %` „Conversion-Steigerung in 17 Wochen" — Zitat:
    „Zum ersten Mal wächst unser Amazon-Umsatz und die Marge gleichzeitig." (HaA)
  - *Garten · DE/IT/FR/ES* — `−35 %` „TACoS — über vier Marktplätze" — Zitat: „Ein
    System, vier Länder — endlich vergleichbare Zahlen und planbares Wachstum."
    (Gartenmarke)

  > ⚠️ **PRÜFEN:** In `Results.tsx` sind die Zitate für FUTUM und HaA aktuell
  > **vertauscht** gegenüber `caseStudies` in copy.ts. Oben steht die korrekte
  > Zuordnung (FUTUM = organisch-Zitat, HaA = Umsatz+Marge-Zitat). Bitte angleichen.

---

## 1.9 Daten & KI  ·  Komponente `DataAI.tsx`

- **eyebrow:** „Daten & KI"
- **title:** „Euer Listing ist nur so gut wie **eure Daten.**"
- **3 Punkte:**
  1. „Wir hören zu, bevor wir optimieren" — „Echte Suchbegriffe und Kundenfragen
     zeigen, wonach eure Käufer wirklich suchen."
  2. „KI erkennt Muster, Menschen entscheiden" — „Search-Query-Reports und KI-Signale
     werten wir aus — die Strategie machen Profis mit Marktplatz-Erfahrung."
  3. „Retail-ready für Rufus & COSMO" — „Content, der für die neue KI-Suche gebaut ist
     — nicht für den Algorithmus von gestern."
- **Daten-Panel-Metriken (4):** `1.240` „Begriffe ausgewertet" · `94 %` „KI-ready
  Content" · `−30 %` „ACoS, profitabler" · `+110 %` „Impressionen n. Suchintention"
  > ⚠️ **PLATZHALTER:** `1.240`, `94 %`, `+110 %` sind illustrative Panel-Werte ohne
  > externe Quelle (`−30 %` ACoS ist als Richtwert ok). Entweder als generisches
  > Beispiel belassen oder markieren: `[PLATZHALTER: Daten-Panel-Demowerte]`.

---

## 1.10 Content-Beweis  ·  Komponente `ProofPoint.tsx`

- **eyebrow:** „Content, der verkauft"
- **title:** „Ein Listing, das die **Kaufentscheidung trägt.**"
- **description:** „Hauptbild plus Infografiken, die jede Kauffrage beantworten —
  Vertrauen, Vorteile, Anwendung. So machen wir aus Sichtbarkeit zahlende Käufer."
- **CTA:** „Alle Designbeispiele ansehen" → `/design-beispiele`

---

## 1.11 So arbeiten wir  ·  Komponente `Process.tsx`

- **eyebrow:** „So arbeiten wir"
- **title:** „Von der ersten Analyse zum **profitablen Konto.**"
- **5 Schritte:**
  1. „Audit & Daten-Analyse" — „Search-Query-Reports, Wettbewerb, Margen und
     Account-Health — wir quantifizieren das Potenzial je ASIN."
  2. „Strategie & Forecast" — „Zielbild, KPI-Korridore für TACoS, Marge und Buy-Box,
     plus eine priorisierte Roadmap mit Impact-Schätzung."
  3. „Retail-Readiness & Content" — „Hauptbild, A+, SEO und Brand Store — jedes Listing
     wird zum konvertierenden Schaufenster, bevor Traffic drauf geht."
  4. „Advertising & Aussteuerung" — „Kampagnen-Setup, Keyword-Harvesting, Gebote und
     Budgets mehrmals pro Woche justiert — profitabel skaliert."
  5. „Betrieb, Reporting & Review" — „FBA-Forecasting, Buy-Box- und Case-Management,
     Monatsreports und Quartals-Reviews gegen die Ziele."
- **CTA:** „Gespräch vereinbaren" *(statt „Assessment starten" — konsistent zur
  CTA-Dramaturgie)*

---

## 1.12 Team  ·  Komponente `Team.tsx`

- **eyebrow:** „Das Team"
- **title:** „Direkter Draht **statt Ticketsystem.**"
- **description:** „Drei Gründer und ein eingespieltes Team betreuen euren Account —
  persönlich, nicht über ein anonymes Support-Postfach. Ein fester Marketplace-Consultant
  betreut nur eine Handvoll Marken."
- **Gründer-Karten:** Clemens — „Founder & Sales" · Christoph — „Founder & Client
  Success" · Eddie — „Founder & Operations" (Texte beibehalten)
- **Team-Streifen:** Titel „Spezialisten für jeden Hebel." · Body „Strategie, Listing
  & SEO, Advertising und Account Management — abgedeckt von Menschen, die ihr Handwerk
  beherrschen."

---

## 1.13 Abschluss-CTA  ·  Komponente `CTA.tsx` (global, vor Footer)

- **eyebrow (Badge):** „Clemens · Founder & Sales"
- **Headline:** „Lasst uns über euer **Marktplatz-Potenzial** sprechen."
- **Body:** „30 Minuten, kostenfrei, direkt mit Clemens. Wir schauen uns euer Konto,
  eure Marge und eure größten Hebel an — und sagen ehrlich, ob wir helfen können."
- **CTA:** „Gespräch vereinbaren"  ·  Microcopy: „Kostenlos & unverbindlich ·
  quartalsweise kündbar, keine Knebelverträge"
- **3 Schritte:**
  1. „Kurzer Input von euch" — „Ein paar Fragen zu Sortiment, Marktplätzen und Zielen."
  2. „Wir bereiten vor" — „Erste Beobachtungen und konkrete Maßnahmen-Ideen für eure
     Marke."
  3. „Im Call" — „Marktplatz-Potenzial und die nächsten konkreten Schritte."

---

# 2. Full Service 360°  ·  `fullService` in copy.ts

## 2.1 Hero

- **eyebrow:** „Full-Service Amazon-Management"
- **lead:** „Ihr führt die Marke."
- **accent:** „Wir führen das Konto."
- **sub:** „Das Tagesgeschäft auf Amazon füllt schnell eine ganze Woche — PPC,
  Inventarplanung, Listing-Pflege, Compliance. Wir übernehmen euren kompletten Account
  mit einem eingespielten Team, damit ihr wieder an eurer Marke arbeitet statt im Seller
  Central."
- **chips:** `["Ein Team", "Ein Vertrag", "Auf Marge gesteuert", "5+ Marktplätze"]`

*(Schärfung der bisherigen „Euer Amazon-Konto führen sollte nicht euer ganzes Leben
bestimmen." — die neue Linie ist kürzer, aktiver und greift das abgestimmte Messaging
„Ihr führt die Marke. Wir führen das Konto." auf.)*

## 2.2 Für wen wir arbeiten  ·  **kind: numbered** (cols 4)

- **eyebrow:** „Für wen wir arbeiten"
- **title:** „Full Service ist gemacht für …"
- **items:**
  - `01` · „Etablierte Marken, 50–500k €/Monat" — „Ihr habt ein laufendes Geschäft auf
    Amazon — jetzt geht es um Profitabilität und Skalierung."
  - `02` · „Teams, die im Tagesgeschäft feststecken" — „Listing-Pflege, Kampagnen und
    Cases fressen die Zeit für strategisches Wachstum."
  - `03` · „Umsatz wächst nur über mehr Ad-Spend" — „Skalierung wird zunehmend
    unprofitabel — der organische Hebel fehlt."
  - `04` · „Marken, die international wachsen wollen" — „Ein Setup, sauber auf weitere
    Marktplätze ausgerollt — nativ statt übersetzt."

## 2.3 Das System  ·  **kind: numbered** (cols 4) — *NEU*

> Adaptiert das abgestimmte „So bauen die Leistungen aufeinander auf" + die
> Organic-First-Statik (Fundament → Hebel → Klammer). Macht „Full Service" als System
> greifbar, bevor die Einzelleistungen kommen.

- **eyebrow:** „Das System"
- **title:** „So bauen die Leistungen aufeinander auf."
- **description:** „Full Service ist keine Liste von Einzelaufgaben, sondern ein System
  mit klarer Statik: ein Fundament, darauf die Wachstumshebel, außen herum die Klammer."
- **items:**
  - `01` · „Fundament: Strategie" — „Sortiment, Marge und Preis — durchgerechnet, bevor
    irgendwo investiert wird."
  - `02` · „Conversion: Listing & SEO" — „Bilder, A+ und Keywords, die aus Besuchern
    Käufer machen — und organisch ranken, ohne pro Klick zu kosten."
  - `03` · „Skalierung: PPC & Internationalisierung" — „Erst auf konvertierenden
    Listings drehen wir die Ads auf — und rollen das Setup auf neue Märkte aus."
  - `04` · „Klammer: Account Management" — „Bestand, Buy-Box, Compliance und Reporting
    halten den Betrieb zusammen — keine Stufe, sondern die Klammer um alles."

## 2.4 Das Problem  ·  **kind: compare**

- **eyebrow:** „Das Problem"
- **title:** „Selbst machen kostet mehr, als ihr denkt."
- **description:** „Amazon professionell zu führen heißt 20–40 Stunden pro Woche für
  Listings, Kampagnen, Forecasting und Cases. Wer mitten im Tagesgeschäft steckt, kommt
  nicht zur Optimierung. Ein internes Team kostet schnell 15.000–30.000 €+ pro Monat —
  oder ihr macht weiter selbst: zeitintensiv, mit hohem Risiko teurer Fehler."
- **left:** Label „Internes Team aufbauen" · Value „15–30k €" · points: „pro Monat an
  Gehältern" / „20–40 Std./Woche Aufwand" / „Hohes Risiko teurer Fehler" /
  „Wissen geht, wenn Personen gehen"
- **right:** Label „Mit TEMOA" · Value „Ein eingespieltes Team" · points: „Hat es
  hunderte Male gemacht" / „Ein Vertrag statt mehrerer Dienstleister" / „Auf Marge
  gesteuert, planbar skaliert" / „Deutlich unter den Kosten eines eigenen Teams"

## 2.5 Die Leistungen im Detail  ·  **kind: rows**

- **eyebrow:** „Alle Leistungen aus einer Hand"
- **title:** „Strategie, Content, Advertising und Betrieb — ineinander verzahnt."
- **items (5 Zeilen, je icon + visual + CTA wie bisher):**
  - *Strategie* — „Erst wird gerechnet, dann investiert." — „Wettbewerbs- und
    Keyword-Analyse, Margenkalkulation, Preisstrategie und KPI-Steuerung. Wir wissen,
    wer wofür rankt — und wo euer Hebel liegt." → „Mehr zur Strategie"
    (`/leistungen/strategie`)
  - *Content* — „Listings, die aus Klicks Käufer machen." — „Hauptbilder, Galerie, A+
    und Premium A+, SEO-Texte und Backend-Keywords — optimiert für echte Käufer und für
    Rufus, COSMO und A10." → „Mehr zur Listing-Optimierung" (`/leistungen/listing-seo`)
  - *Advertising* — „PPC, das auf Marge gerechnet wird." — „Komplette
    Kampagnen­architektur, Bid-Management, Budget-Allokation und Reporting — Sponsored
    Products, Brands und Display. Streuverluste runter, Return on Ad Spend rauf." →
    „Mehr zu unserem Advertising" (`/leistungen/ppc-advertising`)
  - *Account Management* — „Euer Konto läuft — ohne dass ihr ran müsst." —
    „Inventar-Forecasting und FBA-Planung, Buy-Box- und Pricing-Monitoring,
    Case-Management und Reporting. Ein fester Ansprechpartner statt Ticketsystem." →
    „Mehr zum Account Management" (`/leistungen/account-management`)
  - *Erweiterung* — „Internationalisierung — fünf Marktplätze." — „Euer erprobtes Setup
    nativ auf neue Märkte ausgerollt — lokalisiert statt nur übersetzt, zentral
    gesteuert. Als Erweiterung zu den vier Kernleistungen." → „Mehr zur
    Internationalisierung" (`/leistungen/internationalisierung`)

  *(„Sponsored Brands, Display und Video" → „Sponsored Products, Brands und Display"
  vereinheitlicht; „Return on Ad Spend rauf" beibehalten.)*

## 2.6 Was enthalten ist  ·  **kind: checklist**

- **eyebrow:** „Alle Leistungen im Überblick"
- **title:** „Was in Full Service enthalten ist."
- **description:** „Vier Bereiche, ein Team, ein Vertrag — jede Leistung aufgeschlüsselt,
  damit ihr genau seht, was abgedeckt ist."
- **groups:**
  - **Strategie:** Wettbewerbs- & Keyword-Analyse · Margenkalkulation · Preisstrategie ·
    KPI-Steuerung & Zielmarken · Wachstums-Roadmap
  - **Content:** Hauptbilder & Galeriebilder · A+ / Premium A+ · Listing-Texte (Titel,
    Bullets, Beschreibung) · SEO & Backend-Keywords · Brand Store & Brand Story · A/B-Tests
  - **Advertising:** Sponsored Products & Brands · Sponsored Display · Sponsored Brands
    Video · Bid- & Budget-Management · Keyword- & Wettbewerbsanalyse
  - **Account Management:** Inventar-Management & FBA-Forecasting · Buy-Box-Monitoring ·
    Case-Management · Compliance & Account-Health · Performance-Reports

## 2.7 Analytics & Reporting  ·  **kind: callout**

- **eyebrow:** „Übergreifend"
- **title:** „Analytics & Reporting, das Entscheidungen trägt."
- **body:** „Monatliche Reports und Live-Dashboards über alle Bereiche — Zahlen, die
  wir in konkrete nächste Schritte übersetzen, statt euch mit Rohdaten allein zu lassen."

## 2.8 Aus der Praxis  ·  **kind: compare** — *NEU*

> Adaptiert das abgestimmte „Vorher/Nachher als gekennzeichnetes Kundenbeispiel". Nutzt
> nur belegte/konsistente Werte (4,8× ROAS, −35 % TACoS, 4 Marktplätze; Ausgangs-ROAS
> als Platzhalter).

- **eyebrow:** „Aus der Praxis"
- **title:** „Wie sich das Bild verändern kann."
- **description:** „Ein Beispiel aus einem Kundenprojekt — kein Versprechen, sondern ein
  ehrliches Bild unserer Arbeitsweise: erst das Fundament, dann skalieren."
- **left:** Label „Vorher" · Value „Wachstum nur über Ad-Spend" · points: „ROAS
  `[PLATZHALTER: 2,1]`" / „Umsatz wächst nur gegen mehr Budget" / „Performance je
  Marktplatz uneinheitlich"
- **right:** Label „Nach dem Umbau" · Value „Organic First, profitabel skaliert" ·
  points: „ROAS 4,8×" / „−35 % TACoS" / „4 Marktplätze, ein Reporting"

## 2.9 Warum Full Service  ·  **kind: grid** (cols 4 → Standard 3? siehe Hinweis)

- **eyebrow:** „Warum Full Service"
- **title:** „Alles aus einer Hand — mehr als die Summe der Teile."
- **description:** „Einzelne Dienstleister lösen immer nur die Hälfte. Wer Strategie,
  Content, Advertising und Betrieb verteilt, kämpft mit Lücken zwischen den Gewerken —
  und am Ende mit verbranntem Budget."
- **items:**
  - „Profitabilität vor Umsatz" — „Wir steuern auf Marge und TACoS — nicht auf Umsatz,
    der die Marge auffrisst."
  - „Ein abgestimmtes System" — „Strategie, Content, Ads und Betrieb greifen ineinander
    statt gegeneinander."
  - „Organic First als Fundament" — „Erst trägt das Listing, dann skalieren die Ads —
    planbares Wachstum."
  - „Optimiert für Rufus & COSMO" — „Content für die KI-Suche von morgen — nicht für den
    Algorithmus von gestern."

## 2.10 FAQ  ·  **kind: qa** — *NEU*

> Adaptiert die Substanz der AGL/Canopy-Full-Service-FAQ auf TEMOA (EU, kein
> Review-/Customer-Service-/DSP-Bezug).

- **eyebrow:** „Häufige Fragen"
- **title:** „Full Service — ehrlich beantwortet."
- **items:**
  - **Q:** „Wie viel Aufwand ist die Übergabe für uns?"
    **A:** „Wenige Stunden, verteilt über die ersten Wochen: Zugänge, ein Kickoff-Termin,
    offene Fragen zu Sortiment und Lieferkette. Wir arbeiten mit einer festen
    Onboarding-Checkliste — ihr müsst nichts vorbereiten, was wir nicht konkret anfragen.
    Im laufenden Betrieb bleiben rund 2–4 Stunden pro Monat für Calls und Reviews."
  - **Q:** „Was bleibt bei euch, was liegt bei uns?"
    **A:** „Wir verantworten den Betrieb — Strategie, Content, Advertising und
    Account-Management. Bei euch bleiben die Entscheidungen, die nur ihr treffen könnt:
    Sortiment, Lieferkette, Preis-Leitplanken und Markenführung. Konto, Kampagnen und
    Daten gehören immer euch."
  - **Q:** „Wie schnell sehen wir Ergebnisse?"
    **A:** „In den ersten 30–60 Tagen die schnellen Hebel: Streuverluste raus, offene
    Optimierungen umgesetzt. Nach 60–90 Tagen greifen Rankings und Effizienz spürbar.
    Die eigentliche Transformation — nachhaltiges, profitables Wachstum — braucht
    6–12 Monate."
  - **Q:** „Warum nicht einfach intern aufbauen?"
    **A:** „Ein internes Team mit derselben Abdeckung kostet schnell mehrere
    Vollzeitstellen — plus Tools, Einarbeitung und das Risiko, dass Wissen mit Personen
    geht. Ihr bekommt bei uns Spezialisten für jeden Hebel, ohne selbst einstellen,
    einarbeiten und halten zu müssen."
  - **Q:** „Wie sicher ist der Zugriff auf unser Konto?"
    **A:** „Wir arbeiten als Benutzer in eurem Seller Central, mit den Rechten, die für
    die Betreuung nötig sind. Ihr behaltet die volle Kontrolle und könnt den Zugriff
    jederzeit entziehen."
  - **Q:** „Wie lange bindet uns ein Vertrag?"
    **A:** „Quartalsweise kündbar — keine Jahresbindung, keine Ausstiegsgebühren.
    98 % unserer Kunden bleiben, aber sie bleiben wegen der Ergebnisse, nicht wegen der
    Paragrafen."
  - **Q:** „Für wen lohnt sich Full Service nicht?"
    **A:** „Unter etwa 50.000 € Monatsumsatz auf Amazon steht unser Honorar in keinem
    guten Verhältnis zum Hebel — das sagen wir im ersten Gespräch ehrlich. Und wenn ihr
    nur eine Einzelleistung sucht, etwa reines Kampagnenmanagement, ist eine unserer
    Einzelleistungen der bessere Weg."

## 2.11 Einzelne Leistungen im Detail  ·  **kind: bridge**

- **eyebrow:** „Einzelne Leistungen im Detail"
- **title:** „Lieber tiefer einsteigen?"
- **links:** Strategie · Listing & SEO · PPC Advertising · Account Management ·
  Internationalisierung (alle 5 `services`)

> Danach folgt global der **CTA-Banner** (`CTA.tsx`, siehe 1.13).

---

# 3. Strategie  ·  `serviceDetails.strategie`

## 3.1 Hero

- **eyebrow:** „Strategie"
- **lead:** „Erst wird gerechnet."
- **accent:** „Dann investiert."
- **sub:** „Wettbewerb, Keywords, Margen und KPIs — wir bauen das Fundament, auf dem
  Content und Advertising erst profitabel werden. Bevor irgendwo investiert wird, ist
  klar, welche Produkte das Wachstum tragen und welcher Preis verteidigbar ist."
- **chips:** `["Wettbewerbsanalyse", "Margenkalkulation", "KPI-Steuerung", "Roadmap"]`

*(Headline auf die abgestimmte Linie „Erst wird gerechnet. Dann investiert." geschärft.)*

## 3.2 Analyse & Margen  ·  **kind: rows**

- **items (4 Zeilen, icons/visuals/bullets wie bisher):**
  - *Analyse* — „Wir sehen, wo eure echten Chancen liegen." — „Wer rankt wofür, zu
    welchem Preis — und auf welchen Begriffen ihr mit überschaubarem Aufwand nach oben
    kommt. Statt Bauchgefühl ein klares Bild eurer Position im Wettbewerb. Genau diese
    Keyword-Lücken werden später zur Roadmap für Content und Advertising."
  - *Share of Voice* — „Der Abstand ist kein Problem. Er ist euer Potenzial." — „Eure
    Sichtbarkeit gegen die fünf stärksten Wettbewerber — plus CTR- und CVR-Vergleich je
    ASIN. Was die anderen vor euch holen, ist genau das, was noch in eurem Konto steckt."
  - *Marge & Preis* — „Wachstum ist erst dann gut, wenn es profitabel ist." — „Wir
    rechnen jede Maßnahme bis auf den Deckungsbeitrag durch: Amazon-Gebühren, FBA,
    Wareneinsatz und Werbekosten. Daraus entstehen Preis-Korridore, die Marge und
    Buy-Box gleichzeitig schützen. So skaliert ihr Umsatz, ohne dass die Profitabilität
    still und leise verschwindet."
  - *KPI-Steuerung* — „Klare Zielmarken — und ein Plan dorthin." — „Wir definieren
    Zielwerte für TACoS, ACoS und Profitabilität und steuern Monat für Monat dagegen.
    Daraus wird eine priorisierte Roadmap, in der jeder Schritt einen erwarteten
    Umsatz-Impact hat." · **bullets:** „14 % TACoS-Ziel" / „Monatlicher Review-Takt" /
    „Roadmap nach Umsatz-Impact"
    > ⚠️ **PRÜFEN:** Bisheriger Bullet „−38 % vs. Start" ist nicht in der Proof-Point-Liste
    > belegt. Oben durch belegbaren/qualitativen Bullet ersetzt. Falls „−38 %" ein realer
    > Aggregatwert ist, kann er zurück — sonst `[PLATZHALTER: TACoS-Reduktion vs. Start]`.

## 3.3 Unser Vorgehen  ·  **kind: numbered**

- **eyebrow:** „Unser Vorgehen"
- **title:** „Von null auf Zielbild — in drei bis vier Wochen."
- **items:**
  - `1` · „Audit & Analyse" — „Margen, Keywords und Wettbewerb auf den Tisch — Status
    quo schwarz auf weiß."
  - `2` · „Zielbild & KPIs" — „Klare Zielmarken für Umsatz, Marge und Effizienz."
  - `3` · „Roadmap" — „Priorisierte Maßnahmen nach Umsatz-Impact."
  - `4` · „Laufende Steuerung" — „Monatliche Reviews, nachjustieren gegen die Ziele."

## 3.4 FAQ  ·  **kind: qa** — *NEU*

- **eyebrow:** „Häufige Fragen"
- **title:** „Strategie — ehrlich beantwortet."
- **items:**
  - **Q:** „Bekommen wir nur eine Folienpräsentation?"
    **A:** „Nein. Ihr bekommt eine durchgerechnete Roadmap: Margen je Produkt,
    Keyword-Lücken, Preis-Korridore und priorisierte Maßnahmen mit erwartetem
    Umsatz-Impact — keine Folienshow, sondern ein Arbeitsplan."
  - **Q:** „Wie lange dauert die Strategiephase?"
    **A:** „In der Regel drei bis vier Wochen von Lesezugriff bis fertigem Zielbild.
    Danach steuern wir die KPIs monatlich nach."
  - **Q:** „Was ist ein realistisches TACoS-Ziel?"
    **A:** „Das hängt von Kategorie, Marge und Wettbewerb ab — eine pauschale Zahl wäre
    unseriös. Als Orientierung arbeiten wir oft auf einen TACoS-Korridor um 14 % hin und
    leiten den Zielwert aus eurer konkreten Marge ab."
  - **Q:** „Können wir Strategie ohne den Rest buchen?"
    **A:** „Ja. Strategie ist als Einzelleistung möglich — das Angebot stellen wir
    individuell zusammen. Den größten Hebel entfaltet sie, wenn Content und Advertising
    direkt auf der Roadmap aufsetzen."

## 3.5 Brücke  ·  **kind: bridge**

- **eyebrow:** „Weitere Leistungen"
- **title:** „Die Strategie ist der Plan. Das hier ist die Umsetzung."
- **links:** die 4 anderen Services + „Full Service 360°" (Body „Alle Leistungen
  kombiniert")

> Danach global der **CTA-Banner**.

---

# 4. Listing & SEO  ·  `serviceDetails["listing-seo"]`

## 4.1 Hero

- **eyebrow:** „Content"
- **lead:** „Euer bester Verkäufer"
- **accent:** „schläft nie."
- **sub:** „Euer Listing verkauft rund um die Uhr — wenn es gut ist. Wir bauen es für
  echte Käufer und für die KI-Suche von Rufus, COSMO und A10: Bilder, A+ und Keywords,
  die aus Klicks zahlende Käufer machen."
- **chips:** `["Hauptbild & Galerie", "A+ / Premium A+", "SEO & Backend", "Brand Store"]`

*(Headline auf die abgestimmte Linie „Euer bester Verkäufer schläft nie." gehoben —
stärker als das bisherige „Listings, die aus Klicks Käufer machen.")*

## 4.2 Steht euer Produkt auf Seite 10?  ·  **kind: callout** — *NEU*

> Adaptiert den starken AGL-Hook „Is Your Product Buried on Page 10?" + „750+
> Datenfelder, die meisten optimieren <10 %" — auf Deutsch, ohne fremde Zahlen-Claims.

- **eyebrow:** „Warum Listings unterperformen"
- **title:** „Steht euer Produkt auf Seite 10?"
- **body:** „Dann liegt es selten am Produkt — meist am Listing. Amazon zieht über 750
  Datenfelder für Ranking und Conversion heran; die meisten Seller optimieren keine
  10 % davon. Genau dort liegt der Umsatz, den ihr gerade an besser optimierte
  Wettbewerber verliert."

## 4.3 Was wir machen  ·  **kind: grid**

- **eyebrow:** „Was wir machen"
- **title:** „Vom ersten Klick bis zum Kauf."
- **items (6):**
  - „Hauptbild & Galerie" — „Bilder, die in Sekunden den Klick gewinnen — mit USP,
    Maßstab und Lifestyle."
  - „A+ & Premium A+" — „Markenwelt und Module, die Vertrauen schaffen und den Warenkorb
    heben."
  - „Listing-Texte" — „Titel, Bullets und Beschreibung — klar, relevant und
    konversionsstark."
  - „SEO & Backend-Keywords" — „Relevante Begriffe im Listing und Backend — für Rufus,
    COSMO & A10."
  - „Brand Store & Brand Story" — „Eine konsistente Markenwelt über alle ASINs —
    CI-konform aufgebaut."
  - „A/B-Tests" — „Bilder und Texte gegeneinander getestet — Entscheidungen mit Daten,
    nicht mit Bauchgefühl."

## 4.4 Was Amazon wirklich betrachtet  ·  **kind: numbered** (cols 2 oder 4) — *NEU*

> Adaptiert die AGL-Struktur „The Obvious / The Hidden / The Strategic".

- **eyebrow:** „750+ Datenfelder"
- **title:** „Was Amazon wirklich betrachtet."
- **description:** „Ranking entsteht aus weit mehr als Titel und Bild. Wir optimieren
  alle drei Ebenen — nicht nur die offensichtliche."
- **items:**
  - `01` · „Das Offensichtliche" — „Titel, Bullets, Beschreibung und Hauptbild — das,
    was jeder sieht und die meisten halbherzig pflegen."
  - `02` · „Das Verborgene" — „Backend-Keywords, Browse-Nodes, Attribute und
    Zielgruppen-Felder — unsichtbar für Käufer, entscheidend für die Suche."
  - `03` · „Das Strategische" — „Kategorie-Platzierung, Suchbegriff-Beziehungen und
    Eltern-Kind-Varianten — wie eure ASINs zusammenspielen."

## 4.5 Typische Schwachstellen  ·  **kind: grid** (cols 2)

- **eyebrow:** „Typische Schwachstellen"
- **title:** „Wo Listings Umsatz liegen lassen."
- **items (4):**
  - „Hauptbild ohne USP" — „Austauschbar statt klickstark — der erste Eindruck verpufft."
  - „Nur Basic-A+ oder Textwüsten" — „Kein A+, irrelevante Module oder
    zusammengewürfelt statt geführt."
  - „Titel & Bullets schwach" — „Titel zu kurz, Bullets wie ein Datenblatt, keine
    Long-Tails."
  - „Kein Brand Store" — „Keine Markenwelt, nicht alle ASINs, nicht CI-konform."

## 4.6 Unser Vorgehen  ·  **kind: numbered**

- **eyebrow:** „Unser Vorgehen"
- **title:** „Retail-ready in vier Schritten."
- **items:**
  - `01` · „Retail-Readiness-Audit" — „Wo Bilder, A+ und SEO heute Conversion kosten."
  - `02` · „Content-Konzept" — „Bildsprache, A+-Story und Keyword-Architektur."
  - `03` · „Produktion" — „Bilder, A+ und Texte aus einer Hand umgesetzt."
  - `04` · „SEO & A/B-Tests" — „Feinschliff über Tests — laufend optimiert."

## 4.7 FAQ  ·  **kind: qa** — *NEU*

> Adaptiert AGL/Canopy-Listing-FAQ; Testdauer (10 Wochen / 400 Page-Views),
> Ergebnis-Timeline, „lokalisieren statt übersetzen", keine Ranking-Garantie.

- **eyebrow:** „Häufige Fragen"
- **title:** „Listing & SEO — ehrlich beantwortet."
- **items:**
  - **Q:** „Wie schnell wirkt eine Optimierung?"
    **A:** „Die Umsetzung (Recherche, Texte, Bilder) dauert meist ein bis zwei Wochen.
    Bis Amazon die Änderungen indexiert und sich Rankings und Conversion spürbar bewegen,
    rechnet mit 30–60 Tagen."
  - **Q:** „Könnt ihr Platz 1 garantieren?"
    **A:** „Nein — und keine seriöse Agentur kann das. Zu viele Faktoren liegen außerhalb
    unserer Kontrolle. Wir garantieren saubere Arbeit auf allen Ranking-Ebenen und
    machen jede Verbesserung an Daten fest, nicht an Versprechen."
  - **Q:** „Wie testet ihr, was wirklich besser konvertiert?"
    **A:** „Über A/B-Tests von Bildern, Titeln und A+-Modulen. Damit ein Ergebnis
    belastbar ist, lassen wir Tests mindestens rund 10 Wochen bzw. ab etwa 400
    Produktseiten-Aufrufen laufen — sonst entscheidet der Zufall."
  - **Q:** „Schadet eine Überarbeitung dem bestehenden Ranking?"
    **A:** „Nicht, wenn sie sauber gemacht ist. Wir gehen schrittweise vor und beobachten
    die Wirkung, statt mit einem Schlag alles umzustellen."
  - **Q:** „Optimiert ihr auch internationale Listings?"
    **A:** „Ja — und zwar lokalisiert, nicht nur übersetzt. Jeder Marktplatz bekommt
    eigene Keyword-Recherche und nativ formulierten Content. Mehr dazu unter
    Internationalisierung."

## 4.8 Brücke  ·  **kind: bridge**

- **eyebrow:** „Weitere Leistungen"
- **title:** „Alles greift ineinander."
- **links:** die 4 anderen Services + „Full Service 360°"

> Danach global der **CTA-Banner**.

---

# 5. PPC Advertising  ·  `serviceDetails["ppc-advertising"]`

## 5.1 Hero

- **eyebrow:** „Advertising"
- **lead:** „Ads als Verstärker."
- **accent:** „Nicht als Lebenserhaltung."
- **sub:** „Advertising ist meist der größte Posten im Budget. Wir senken
  Streuverluste und steigern den Return on Ad Spend — Werbung verstärkt, was organisch
  schon trägt, statt es zu ersetzen. Gesteuert auf TACoS, nicht auf Bruttoumsatz."
- **chips:** `["Sponsored Products", "Sponsored Brands", "Sponsored Display",
  "Steuerung auf TACoS"]`

*(Headline auf die abgestimmte Linie „Ads als Verstärker. Nicht als Lebenserhaltung."
gehoben — schärfer und Organic-First-konform.)*

## 5.2 Architektur, Harvesting, Effizienz  ·  **kind: rows**

- **items (3 Zeilen, icons/visuals/bullets wie bisher):**
  - *Architektur* — „Jeder Euro hat eine Aufgabe." — „Sponsored Products, Brands und
    Display — sauber getrennt nach Ziel und Match-Typ. So sehen wir auf einen Blick,
    welche Kampagne erobert, welche verteidigt und welche skaliert. Keine Black-Box, in
    der gut und schlecht laufende Begriffe denselben Topf teilen."
  - *Keyword-Harvesting* — „Gewinner finden, Verlierer ausschließen." — „Auto-Kampagnen
    finden neue Suchbegriffe. Was konvertiert, wandert in eigene Performance-Kampagnen
    mit eigenem Gebot. Was nur Geld kostet, wird zum Negativ-Keyword. Dieser Kreislauf
    läuft wöchentlich — euer Konto wird mit jeder Woche effizienter."
  - *Effizienz* — „Weniger Streuverlust, mehr Rendite." — „Wir senken den ACoS, ohne
    Umsatz abzuwürgen: bessere Begriffe, bessere Gebote, bessere Landing-Listings. Das
    Ergebnis ist ein ROAS, der planbar nach oben geht." · **bullets:** „−30 % ACoS" /
    „4,8× ROAS" / „Steuerung auf TACoS"
    > ⚠️ **PRÜFEN:** Bisheriger Bullet „+62 % Werbeumsatz" ist nicht in der Proof-Point-Liste
    > belegt (stammt aus dem AGL-Beispiel Ecoxall). Oben durch „Steuerung auf TACoS"
    > ersetzt. Falls ein belegter Werbeumsatz-Wert existiert, kann er zurück — sonst
    > `[PLATZHALTER: Werbeumsatz-Steigerung %]`.

## 5.3 Kampagnen-Architektur im Detail  ·  **kind: grid** — *NEU*

> Adaptiert die AGL-„Strategic Campaign Architecture" (Auto/Manual, Match-Types,
> Brand-Defense, Segmentierung) + die drei erlaubten Ad-Formate. KEIN DSP.

- **eyebrow:** „Kampagnen-Architektur"
- **title:** „Eine Struktur, in der nichts im selben Topf landet."
- **items (6):**
  - „Auto & Manual" — „Auto-Kampagnen entdecken, manuelle Kampagnen skalieren — beide
    mit klarer Rolle."
  - „Match-Type-Strategie" — „Exact, Phrase und Broad sauber getrennt — pro Begriff der
    passende Hebel."
  - „Sponsored Products" — „Das Fundament: Platzierungen direkt in Suche und auf
    Produktseiten."
  - „Sponsored Brands" — „Markenbanner über den Ergebnissen — inkl. Video — für
    Sichtbarkeit und Marke."
  - „Sponsored Display" — „Retargeting und gezielte Platzierung auf Wettbewerber-ASINs."
  - „Brand-Defense & Segmentierung" — „Eigene Markenbegriffe verteidigen, Kampagnen
    nach Produktlinie, Marge und Ziel trennen."

## 5.4 Der Optimierungs-Kreislauf  ·  **kind: numbered** — *erweitert/neu*

> Adaptiert die AGL-Monitoring-Kadenz (täglich/wöchentlich/monatlich) + Canopy
> „Control → Dominate → Expand". Ersetzt bzw. ergänzt das bisherige 4-Schritte-Vorgehen
> um die Kadenz-Logik. (Hinweis: aktuell existiert schon ein `numbered`-Block „Konsequent
> optimiert, Woche für Woche" — diesen entweder ersetzen oder als zweiten numbered
> dahinter setzen. Empfehlung: ersetzen durch die folgende, schärfere Version.)

- **eyebrow:** „Der Kreislauf"
- **title:** „Einmal aufsetzen reicht nicht. Wir takten."
- **description:** „Performance entsteht durch Kadenz, nicht durch ein einmaliges Setup.
  Drei Takte, ein Ziel: jede Woche ein effizienteres Konto."
- **items (cols 4):**
  - `Täglich` · „Kontrolle" — „Kampagnen im Blick — Probleme abfangen, bevor sie Budget
    kosten."
  - `Wöchentlich` · „Optimierung" — „Gebote nachziehen, Budgets umschichten,
    Negativ-Keywords ergänzen, Gewinner migrieren."
  - `Monatlich` · „Strategie-Review" — „Struktur, Ziele und Budget-Allokation auf den
    Prüfstand."
  - `Laufend` · „Skalieren" — „Control → Dominate → Expand: Budget dorthin, wo der ROAS
    stimmt, dann neue Begriffe und Platzierungen erschließen."

## 5.5 FAQ  ·  **kind: qa** — *NEU*

> Adaptiert AGL/Canopy-PPC-FAQ (TACoS vs. ACoS, „warum nicht mehr Budget", guter TACoS,
> Timeline). EUR, kein DSP.

- **eyebrow:** „Häufige Fragen"
- **title:** „Drei Fragen, ehrlich beantwortet."
- **items:**
  - **Q:** „Warum nicht einfach das Budget erhöhen?"
    **A:** „Weil mehr Budget einen schwachen Hebel nur teurer macht. Ads bringen
    Besucher — verkaufen muss das Listing. Erst wenn Struktur, Begriffe und Conversion
    stimmen, bringt zusätzliches Budget zusätzlichen profitablen Umsatz."
  - **Q:** „Was ist ein guter TACoS?"
    **A:** „Es gibt keinen universellen Wert — er hängt von Marge, Kategorie und Phase
    ab. Wir steuern bewusst auf TACoS statt nur ACoS, weil TACoS auch den organischen
    Umsatz berücksichtigt. Den Zielwert leiten wir aus eurer konkreten Marge ab."
  - **Q:** „Warum TACoS statt ACoS?"
    **A:** „ACoS misst nur die Effizienz der Werbung für sich. TACoS setzt die
    Werbekosten ins Verhältnis zum gesamten Umsatz — inklusive organischer Verkäufe.
    Ein sinkender TACoS heißt: Werbung treibt paid und organisch effizient. Das ist
    echte Profitabilität."
  - **Q:** „Wie schnell sehen wir Ergebnisse?"
    **A:** „Erste Verbesserungen — weniger Streuverlust, sauberere Struktur — meist in
    30–45 Tagen. Spürbare ACoS-Senkung und Wachstum in 60–90 Tagen. Die beste
    Performance entsteht über die Monate, weil der Harvesting-Kreislauf kompoundiert."
  - **Q:** „Braucht ihr eine lange Vertragslaufzeit?"
    **A:** „Nein. Quartalsweise kündbar. Wir empfehlen mindestens ein Quartal für eine
    faire Bewertung — danach bleibt ihr, wenn die Zahlen stimmen."

## 5.6 Brücke  ·  **kind: bridge**

- **eyebrow:** „Weitere Leistungen"
- **title:** „Alles greift ineinander."
- **links:** die 4 anderen Services + „Full Service 360°"

> Danach global der **CTA-Banner**.

---

# 6. Account Management  ·  `serviceDetails["account-management"]`

## 6.1 Hero

- **eyebrow:** „Account Management"
- **lead:** „Der Betrieb, der euer Konto"
- **accent:** „ruhig hält."
- **sub:** „Ein fester Ansprechpartner, der euer Konto kennt und proaktiv steuert:
  Bestände, Buy-Box, Compliance und Reporting im Blick — damit ihr euch aufs Wesentliche
  konzentriert. Menschen statt Ticketsystem."
- **chips:** `["Inventarmanagement", "Buy-Box-Monitoring", "Compliance", "Reporting"]`

*(Headline auf die abgestimmte Linie „Der Betrieb, der euer Konto ruhig hält." gehoben;
die alte „… ohne Ticketsystem." war ok, aber die neue ist ruhiger und treffender.)*

## 6.2 Inventar, Buy-Box, Reporting  ·  **kind: rows**

- **items (3 Zeilen, icons/visuals/bullets wie bisher):**
  - *Inventar* — „Bestand ist Ranking." — „Wir prognostizieren Nachfrage und setzen
    Reorder-Punkte, bevor der Bestand kritisch wird. Out-of-stock kostet Ranking —
    Überbestand bindet Kapital. Wir halten die Mitte. Ihr seht jederzeit, wann
    nachbestellt werden muss — ohne böse Überraschung."
  - *Buy-Box & Health* — „Die Buy-Box verliert man leise." — „Preis, Verfügbarkeit und
    Versand steuern wir so, dass ihr die Buy-Box haltet — und überwachen Account-Health
    und Policy-Themen, bevor daraus eine Sperre wird. Fällt etwas auf, lösen wir es —
    nicht ihr."
  - *Reporting* — „Zahlen, die in Entscheidungen übersetzt sind." — „Monatliche Reports
    und Live-Dashboards — und ein fester Ansprechpartner, der sie mit euch durchgeht.
    Keine Rohdaten zum Selbstdeuten, sondern klare nächste Schritte." · **bullets:**
    „1 fester Ansprechpartner" / „Monatlich Report & Review" / „100 % Transparenz"

## 6.3 Vier Routinen  ·  **kind: numbered**

- **eyebrow:** „Unser Vorgehen"
- **title:** „Vier Routinen. Ein ruhiges Konto."
- **items:**
  - `1` · „Onboarding & Setup" — „Zugänge, Prozesse und Verantwortlichkeiten sauber
    aufgesetzt."
  - `2` · „Forecasting & Monitoring" — „Bestände, Buy-Box und Pricing laufend im Blick."
  - `3` · „Compliance & Cases" — „Account-Health proaktiv, Fälle schnell gelöst."
  - `4` · „Reporting & Reviews" — „Monatliche Reports, regelmäßige Calls,
    Quartals-Review."

## 6.4 FAQ  ·  **kind: qa** — *NEU*

> Adaptiert AGL/Canopy-Account-FAQ. KEIN Review-/Customer-Service-Management erwähnen
> (HARTE Vorgabe). Fokus: Ansprechpartner, Zugriff/Sicherheit, Eigentum, Kündigung.

- **eyebrow:** „Häufige Fragen"
- **title:** „Account Management — ehrlich beantwortet."
- **items:**
  - **Q:** „Bekommen wir einen festen Ansprechpartner oder ein Ticketsystem?"
    **A:** „Einen festen Ansprechpartner, der euer Konto kennt — erreichbar per Mail,
    Telefon und Video. Kein anonymes Support-Postfach, bei dem ihr jedes Mal von vorn
    erklärt."
  - **Q:** „Wie viel Zeit kostet uns das laufend?"
    **A:** „Wenig. Den Betrieb übernehmen wir; bei euch bleiben rund 2–4 Stunden pro
    Monat für Calls und Reviews — plus die Entscheidungen, die nur ihr treffen könnt."
  - **Q:** „Wie sicher ist der Zugriff auf unser Konto?"
    **A:** „Wir arbeiten als Benutzer in eurem Seller Central mit den Rechten, die für
    die Betreuung nötig sind. Ihr behaltet die volle Kontrolle und könnt den Zugriff
    jederzeit entziehen. Konto und Daten gehören immer euch."
  - **Q:** „Was passiert bei einer Sperre oder einem dringenden Case?"
    **A:** „Wir überwachen Account-Health und Policy-Themen proaktiv und greifen ein,
    bevor etwas eskaliert. Tritt ein Fall auf, übernehmen wir die Kommunikation mit
    Amazon — nicht ihr."
  - **Q:** „Lässt sich Account Management einzeln buchen?"
    **A:** „Ja — als Einzelleistung mit individuellem Angebot. Den größten Hebel
    entfaltet es im Zusammenspiel mit Strategie, Content und Advertising."

## 6.5 Brücke  ·  **kind: bridge**

- **eyebrow:** „Weitere Leistungen"
- **title:** „Alles greift ineinander."
- **links:** die 4 anderen Services + „Full Service 360°"

> Danach global der **CTA-Banner**.

---

# 7. Internationalisierung  ·  `serviceDetails.internationalisierung`

## 7.1 Hero

- **eyebrow:** „Internationalisierung"
- **lead:** „Übersetzen kann jeder."
- **accent:** „Lokalisieren verkauft."
- **sub:** „Wir übersetzen nicht, wir lokalisieren: Content, PPC und Account-Management
  nativ pro Marktplatz — lokal recherchiert, lokal formuliert, lokal optimiert. Und
  alles konsolidiert in einem Gesamtbild, damit ihr über alle Länder hinweg vergleichbare
  Zahlen habt."
- **chips:** `["5+ Marktplätze", "Lokalisierte Listings", "Markt-Pricing",
  "PPC pro Land"]`

*(Headline auf die abgestimmte Linie „Übersetzen kann jeder. Lokalisieren verkauft."
gehoben.)*

## 7.2 Roll-out & Lokalisierung  ·  **kind: rows**

- **items (2 Zeilen, icons/visuals/bullets wie bisher):**
  - *Roll-out* — „Ein Setup, Markt für Markt ausgerollt." — „Wir nehmen euer erprobtes
    Setup aus Deutschland und übertragen es strukturiert auf weitere Marktplätze — mit
    Markt-Analyse und lokaler Logistik. Ihr seht jederzeit, welcher Markt live ist und
    wie weit der nächste Launch ist."
  - *Lokalisieren statt übersetzen* — „Wort für Wort übersetzt verkauft nicht." — „Eine
    reine Übersetzung trifft weder die Suchbegriffe noch den Ton im Zielmarkt. Wir
    recherchieren lokal, formulieren nativ und bauen Content, der dort rankt und
    konvertiert — nicht nur verstanden wird." · **bullets:** „Lokale Keyword-Recherche
    je Markt" / „Nativ formuliert, nicht übersetzt" / „4 Marktplätze (Case Gartenmarke)"
    > ⚠️ **PRÜFEN:** Bisherige Bullets „+110 % Klicks (IT)" und „+21 % Conversion" sind
    > nicht in der Proof-Point-Liste belegt. Oben qualitativ/belegt ersetzt. Falls reale
    > Werte vorliegen, können sie zurück — sonst `[PLATZHALTER: Klicks/Conversion-Uplift
    > je Markt]`.

## 7.3 Vorgehen  ·  **kind: numbered**

- **eyebrow:** „Unser Vorgehen"
- **title:** „Ein Playbook, mehrfach ausgerollt."
- **description:** „Wir schärfen euer Best-Practice-Setup im Heimatmarkt und übertragen
  es strukturiert auf weitere Länder — nativ lokalisiert, zentral gesteuert."
- **items:**
  - `01` · „Playbook (DE)" — „Best-Practice-Setup im Heimatmarkt schärfen."
  - `02` · „Lokalisierung" — „Listings, Keywords und Content nativ pro Markt."
  - `03` · „Roll-out" — „Strukturierter Launch in FR, IT, ES und NL."
  - `04` · „Cross-Market-Steuerung" — „Einheitliches Reporting über alle Märkte."

  *(„IT, FR und ES" → „FR, IT, ES und NL" — deckt die 5 erlaubten EU-Marktplätze
  konsistent ab.)*

## 7.4 Marktplätze  ·  **kind: callout** — *NEU*

- **eyebrow:** „Fünf Marktplätze"
- **title:** „Fünf Märkte, zentral gesteuert, ein Reporting."
- **body:** „DE, FR, IT, ES und NL — jeder Markt nativ lokalisiert, alle zusammen in
  einem konsolidierten Reporting. So vergleicht ihr Länder auf einer Datenbasis, statt
  fünf Insellösungen zu jonglieren."

## 7.5 FAQ  ·  **kind: qa** — *NEU*

> Adaptiert die Listing-/Account-FAQ auf den Internationalisierungs-Kontext. EU only.

- **eyebrow:** „Häufige Fragen"
- **title:** „Internationalisierung — ehrlich beantwortet."
- **items:**
  - **Q:** „Reicht nicht eine gute Übersetzung?"
    **A:** „Nein. Eine Übersetzung trifft selten die Suchbegriffe und den Ton im
    Zielmarkt. Wir recherchieren je Land eigene Keywords und formulieren nativ — sonst
    rankt der Content nicht und konvertiert schlechter."
  - **Q:** „Welche Marktplätze deckt ihr ab?"
    **A:** „Die fünf großen EU-Marktplätze: Deutschland, Frankreich, Italien, Spanien
    und die Niederlande — zentral gesteuert, mit einem gemeinsamen Reporting."
  - **Q:** „Wie lange dauert ein Markt-Launch?"
    **A:** „Das hängt von Sortiment und Logistik ab. Weil wir euer erprobtes DE-Setup als
    Playbook nutzen, läuft jeder weitere Markt strukturiert und schneller als der erste —
    den konkreten Fahrplan legen wir im Projekt fest."
  - **Q:** „Müssen wir vorher in Deutschland stark sein?"
    **A:** „Es hilft. Ein im Heimatmarkt geschärftes Setup ist die Vorlage, die wir
    ausrollen. Steht dieses Fundament noch nicht, beginnen wir dort — sonst skaliert ihr
    Schwächen mit."

## 7.6 Brücke  ·  **kind: bridge**

- **eyebrow:** „Weitere Leistungen"
- **title:** „Alles greift ineinander."
- **links:** die 4 anderen Services + „Full Service 360°"

> Danach global der **CTA-Banner**.

---

# 8. Ergebnisse  ·  Seite `/ergebnisse` (`Cases` / `CasesClosing` + `caseStudies`)

## 8.1 PageHero

- **eyebrow:** „Case Studies"
- **title (lead + accent):** „Versprechen kann jeder. **Hier sind Zahlen.**"
- **description:** „Beispiele aus laufenden Mandaten — Einzelergebnisse, kein
  Versprechen, aber ein ehrliches Bild unserer Arbeitsweise: Organic First, profitabel
  skaliert."

## 8.2 StatsBand  ·  Kennzahlen (belegt)

- `60+` betreute Marken · `21 Mio €` betreuter Umsatz p. a. · `98 %` Kundenbindung ·
  `5+` Marktplätze

## 8.3 Case-Karten  ·  `caseStudies` (3, belegt — finaler Wortlaut)

> Pro Case: `brand`, `sector`, `metric` + `metricLabel`, `ausgangslage`, `quote`.

- **FUTUM** · Sektor „Schädlingsbekämpfung · DE" · Metric `80 %` „organische Verkäufe
  im Peak"
  - **ausgangslage:** „Starke Abhängigkeit von Paid-Traffic, dünner organischer Anteil
    und ein ACoS, der die Marge auffraß."
  - **quote:** „Wir verkaufen heute überwiegend organisch — Werbung ist Kür, nicht
    Pflicht."
- **HaA** · Sektor „Küche & Haushalt · DE" · Metric `+439 %` „Conversion-Steigerung in
  17 Wochen"
  - **ausgangslage:** „Hohe Werbeausgaben bei stagnierendem Umsatz, schwache Listings
    und kein klares KPI-Bild. Das Konto wuchs nicht — es wurde nur teurer."
  - **quote:** „Zum ersten Mal wächst unser Amazon-Umsatz und die Marge gleichzeitig."
- **Gartenmarke** · Sektor „Garten · DE/IT/FR/ES" · Metric `−35 %` „TACoS — über vier
  Marktplätze"
  - **ausgangslage:** „Internationale Expansion ohne lokalisierte Listings,
    inkonsistente Performance je Marktplatz und kein einheitliches Reporting."
  - **quote:** „Ein System, vier Länder — endlich vergleichbare Zahlen und planbares
    Wachstum."

*(Alle drei sind in copy.ts bereits korrekt — unverändert übernehmen. Achtung nur auf
die Zitat-Zuordnung in `Results.tsx` auf der Homepage, siehe 1.8.)*

## 8.4 Intro/Rahmen-Text  ·  über den Karten (optional, falls Sektion einen Lead hat)

- **eyebrow:** „Drei Wege, ein Prinzip"
- **title:** „Mehr organischer Umsatz, bessere Marge, ein Konto, das trägt."
- **description:** „Unterschiedliche Branchen, dieselbe Statik: erst das Listing, dann
  die Ads. Jede Zahl ist ein Einzelbeispiel aus einem Kundenprojekt — kein Versprechen,
  sondern ein Beleg, wie wir arbeiten."

## 8.5 CasesClosing

- **title:** „Wird eure Marke die nächste Case?"
- **body:** „Lasst uns ausrechnen, was in eurem Konto steckt — 30 Minuten, ehrlich,
  ohne Verkaufsdruck."
- **CTA:** „Gespräch vereinbaren"

> Danach global der **CTA-Banner**.

### Case-Detailseite (Template, datengetrieben) — *Wortbausteine*
- Kernzahl groß (metric + metricLabel)
- „Wo [Marke] stand, bevor wir kamen." (ausgangslage)
- „Kein Zufallstreffer. System." (Vorgehen in Schritten — Organic-First-Logik je Case)
- „So sieht das konkret aus." (Bildbeispiele)
- CTA-Banner

---

# Annahmen & Platzhalter (bitte prüfen)

**Belegte Proof-Points (sicher verwendet):** 60+ Marken · 21 Mio € · 98 % Kundenbindung
· 5+ Marktplätze (DE/FR/IT/ES/NL); FUTUM 80 % organisch; HaA +439 % Conversion/17 Wo.;
Gartenmarke −35 % TACoS/4 Märkte; Richtwerte 14 % TACoS-Ziel · 4,8× ROAS · −30 % ACoS.

**Zu prüfende / zu ersetzende Zahlen (nicht in der Proof-Point-Liste belegt):**
1. **Homepage `TwoLevers` — „+147 % organisches Wachstum":** stammt aus altem
   Vitaworld-Beispiel. Empfehlung: durch FUTUM „80 % organischer Anteil im Peak"
   ersetzen (passt zur 80-%-Kachel). → `[PLATZHALTER: +147 % — durch belegten Wert
   ersetzen]`.
2. **Homepage `+30 % mehr Profitabilität` (Hero/Stat-Band):** als „⌀ über betreute
   Marken" markiert. Falls kein belegter Aggregatwert → qualitativ formulieren oder
   `[PLATZHALTER: ⌀ Profitabilitätssteigerung]`.
3. **Strategie-Seite Bullet „−38 % vs. Start":** nicht belegt → ersetzt durch
   qualitative Bullets. Realwert? Sonst `[PLATZHALTER: TACoS-Reduktion vs. Start]`.
4. **PPC-Seite Bullet „+62 % Werbeumsatz":** aus AGL-Beispiel, nicht belegt → ersetzt
   durch „Steuerung auf TACoS". Realwert? Sonst `[PLATZHALTER: Werbeumsatz-Steigerung]`.
5. **Internationalisierung-Bullets „+110 % Klicks (IT)", „+21 % Conversion":** nicht
   belegt → ersetzt durch qualitativ/Gartenmarke. Realwerte? Sonst `[PLATZHALTER]`.
6. **`FullService.tsx` Metric „Buy-Box 100 %":** 100 % nicht belegbar → „Buy-Box-Anteil
   hoch halten" oder `[PLATZHALTER: Buy-Box-Anteil %]`. Buy-Box-Visual (→100 %) ist Mock.
7. **`DataAI.tsx` Panel-Werte „1.240", „94 % KI-ready", „+110 % Impressionen":**
   illustrative Demowerte → als generisches Beispiel belassen oder `[PLATZHALTER:
   Daten-Panel-Demowerte]`.
8. **Hero-Dashboard-Mock & WhyTemoa-Visuals (`€1,8M`, `TACoS 9,4 %`, `CVR +12,5 %`,
   `34 % Netto-Marge`, Peak `€19.740`):** reine Mock-Daten ohne Außenaussage — bewusst
   als generisches Cockpit verstehen, keine konkrete Marke. (Kein Handlungsbedarf, aber
   bewusst so freigeben.)
9. **„Aus der Praxis"-Vergleich (Full Service 2.8): Ausgangs-ROAS „2,1"** ist
   `[PLATZHALTER: 2,1]` (Zielwert 4,8× ist konsistent). Falls realer Case → einsetzen.

**Inhaltliche Korrekturen, die ich vorschlage (über reine Zahlen hinaus):**
- **`Results.tsx` Homepage:** Zitate von FUTUM und HaA sind gegenüber `caseStudies`
  vertauscht — angleichen (FUTUM = „überwiegend organisch", HaA = „Umsatz und Marge
  gleichzeitig"). Siehe 1.8.
- **Ad-Formate vereinheitlicht** auf **Sponsored Products / Brands / Display** (KEIN
  DSP) an allen Stellen; „Video" bleibt als Teil von Sponsored Brands erwähnbar.
- **Kadenz-Wording** auf Homepage `ServicesDetail` von „wöchentlich" auf „regelmäßig"
  entschärft, um keine fixe Kadenz pauschal zu versprechen.
- **CTA-Wording konsistent** „Gespräch vereinbaren" (Process-Seite vorher „Assessment
  starten").

**Bewusst NICHT aufgenommen (HARTE Vorgaben eingehalten):** DSP / Demand-Side-Platform,
Review-/Bewertungs-Management, Customer-Service-Management, Google Ads, Revenue-/
Lost-Inventory-Recovery, Amazon Cloud Ads; keine fremden Marken/Awards/Zahlen
(kein Clutch/Trustpilot, keine US-Marken, keine Dollar-Werte); keine
„studio-quality/award-winning photography"-USPs (Bildtypen werden nur als Leistung
genannt); „Relation" existiert nicht.
