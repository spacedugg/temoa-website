"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Station, StationTitle, StationLead, Eyebrow, Karte } from "./Station";
import { Icon, type IconName } from "./Icons";
import { Zusammenlauf } from "./Zusammenlauf";

/**
 * /full-service in der Welt „Taktplan".
 * Der Text ist der freigegebene Wortlaut und wird nicht verändert.
 */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Vorher stand hier je eine kurze Ueberschrift und ein Satz darunter. Das las
   sich als viel Text auf wenig Flaeche. Jetzt traegt die Ueberschrift die
   Aussage allein, dafuer ein paar Woerter laenger, und das Icon wird gross. */
const fuerWen: { icon: IconName; title: string }[] = [
  { icon: "regal", title: "Eigene Marke, ab 50.000 € Umsatz im Monat" },
  { icon: "kompass", title: "Starke Produkte, aber wenig Amazon-Wissen im Haus" },
  { icon: "stufen", title: "Das Sortiment wächst schneller als das Team" },
  { icon: "globus", title: "Mehrere hundert Artikel auf mehreren Marktplätzen" },
];

const ausgangslage: { icon: IconName; title: string; body: string }[] = [
  { icon: "uhr", title: "Internes Team zu klein", body: "Eine Person kann Strategie, Content, Werbung und Betrieb nicht in der nötigen Tiefe abdecken." },
  { icon: "streuung", title: "Einzeldienstleister, getrennte Sicht", body: "Einer steuert PPC nur auf Werbeausgaben, einer erstellt Content ohne Blick auf den Bestand. Die Gesamtstrategie verantwortet niemand." },
  { icon: "schild", title: "Amazon ist ein Vollzeitjob", body: "20 bis 40 Stunden pro Woche auf einer Plattform, die sich ständig verändert." },
];

/* Jeder Bereich traegt jetzt seinen Namen. Vorher stand ueber Block 01 nur
   „Wir lesen euren Markt bis auf den einzelnen Suchbegriff." Wer nicht schon
   wusste, dass das die Strategie ist, hat es an dieser Stelle nicht erfahren. */
const bereiche = [
  {
    n: "01",
    bereich: "Strategie",
    title: "Wir lesen euren Markt bis auf den einzelnen Suchbegriff.",
    line: "Bevor optimiert wird, steht fest, wo eure Umsätze liegen und welche Ziele realistisch sind.",
    bullets: [
      "Welche Suchbegriffe euch Umsatz bringen und welche nur Geld kosten",
      "Wo ihr im Markt steht, Monat für Monat",
      "Was bei jeder Variante nach allen Gebühren übrig bleibt",
    ],
  },
  {
    n: "02",
    bereich: "Produktbilder & SEO",
    title: "Ein Listing, das auch ohne Werbung verkauft.",
    line: "Aus Sichtbarkeit werden Klicks, aus Klicks Käufe, bis das Listing Retail Ready ist.",
    bullets: [
      "Zuerst das Hauptbild: es entscheidet, ob im Suchergebnis geklickt wird",
      "Alle Produktbilder, A+ bis Premium A+ Content, Brand Store und Markengeschichte",
      "Titel, Bullets und die Felder im Hintergrund, verständlich für Rufus und COSMO",
    ],
  },
  {
    n: "03",
    bereich: "PPC Advertising",
    title: "Saubere Kampagnen, gesteuert am TACoS.",
    line: "Sobald das Listing organisch verkauft, bringt PPC planbaren Umsatz dazu.",
    bullets: [
      "Jede Kampagne mit einer klaren Aufgabe, keine bietet gegen die andere",
      "Gebote und Platzierungen getrennt gesteuert, Top-of-Search gezielt",
      "Beim Aufbau neuer Suchbegriffe bewusst teurer, danach zurück auf Profit",
    ],
  },
  {
    n: "04",
    bereich: "Account Management",
    title: "Stabiler Betrieb, geschützte Rankings.",
    line: "Operative Themen, bei denen ein Fehler aufgebaute Sichtbarkeit kostet.",
    bullets: [
      "Buy-Box weg? Wir sehen es am selben Tag, samt Ursache",
      "Nachschub geplant, damit kein Bestseller leerläuft und Rankings kippen",
      "Konto-Gesundheit im Blick, Fälle laufen über uns zum Amazon-Support",
      "Preise so gesteuert, dass Wachstum die Marge nicht auffrisst",
    ],
  },
  {
    n: "05",
    bereich: "Internationalisierung",
    title: "Jeder neue Marktplatz von Grund auf aufgebaut.",
    line: "Der komplette Service auf weiteren Amazon-Marktplätzen, je Markt neu gemacht.",
    bullets: [
      "Eigene Keyword-Recherche je Marktplatz",
      "Content und Kampagnen für jeden Markt neu aufgesetzt",
      "Lokalisieren statt übersetzen",
    ],
  },
];

/* "Alle Bereiche arbeiten mit denselben Zahlen" war zu abgehoben: natuerlich
   tun sie das. Gemeint ist etwas Konkretes, naemlich dass bei euch nicht drei
   Dienstleister nebeneinander arbeiten. Die Punkte sagen das jetzt direkt. */
const unterschied: { icon: IconName; title: string }[] = [
  { icon: "bericht", title: "Ein Ansprechpartner für alle fünf Bereiche, nicht drei Dienstleister" },
  { icon: "uhr", title: "Was in den Zahlen auffällt, ist in derselben Woche im Listing geändert" },
  { icon: "ziel", title: "Eine Zahl gilt für alle: was ein Produkt verdient, steht nicht dreimal verschieden im Raum" },
  { icon: "schild", title: "Läuft etwas schief, sind wir es. Keiner zeigt auf den anderen." },
];

/* ---------- 00 · Kopf ---------- */
export function FullServiceKopf() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    ({ initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: reduce ? { duration: 0 } : { duration: 0.85, delay, ease: EASE } });

  return (
    <section className="ground relative overflow-hidden">
      <span aria-hidden className="halo pointer-events-none -right-32 -top-44 h-[42rem] w-[42rem]" />
      <div className="container-x relative">
        <div className="pb-24 pt-28 md:pb-28 md:pt-32">
          <motion.div {...rise(0)}>
            <Eyebrow label="Amazon Full Service" />
          </motion.div>

          <div className="grid min-w-0 items-center gap-y-12 lg:grid-cols-[1fr_0.8fr] lg:gap-x-16">
            <div className="min-w-0">
              <motion.h1 {...rise(0.08)} className="display max-w-full text-balance text-[clamp(1.95rem,1.35rem+2.3vw,3.25rem)] text-ink">
                Ein eingespieltes Team für euren{" "}
                <span className="em mark">kompletten Amazon-Account.</span>
              </motion.h1>
              <motion.p {...rise(0.16)} className="mt-8 max-w-[52ch] text-pretty text-lead text-ink-muted">
                Wir übernehmen euren Amazon-Account vollständig, von der Analyse bis zum
                Tagesgeschäft. Für jeden Bereich bekommt ihr jemanden, der ihn hauptberuflich macht.
              </motion.p>
              <motion.div {...rise(0.24)} className="mt-10">
                <a href="/gespraech-vereinbaren" className="btn-primary">
                  Potenzialanalyse buchen
                  <span className="disc" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Vorher stand hier eine Produktaufnahme mit einem Rucksack in
                einer Platte. Auf der Uebersichtsseite geht es um fuenf
                Bereiche an einem Konto, nicht um ein einzelnes Produkt.
                Die Illustration ist freigestellt und braucht keine Platte. */}
            <motion.div {...rise(0.18)} className="relative min-w-0">
              <span aria-hidden className="halo left-[10%] top-[12%] h-3/4 w-3/4" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bilder/n-team.webp"
                alt="Fünf Arbeitsplätze auf einem Podest, alle verbunden mit einer gemeinsamen Auswertung"
                className="relative w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 01 · Für wen ---------- */
export function FuerWen() {
  return (
    <Station label="Für wen wir arbeiten" tone="tint">
      <StationTitle>Passt das zu eurer Marke?</StationTitle>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {fuerWen.map((r) => (
          <Karte key={r.title} icon={r.icon} title={r.title} />
        ))}
      </div>
    </Station>
  );
}

/* ---------- 02 · Die Ausgangslage ---------- */
export function Ausgangslage() {
  return (
    <Station label="Ausgangslage" tone="paper">
      <StationTitle>Warum die üblichen Lösungen an Amazon scheitern.</StationTitle>
      <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
        {ausgangslage.map((r) => (
          <Karte key={r.title} icon={r.icon} title={r.title} body={r.body} />
        ))}
      </div>
      <div className="mt-12 border-l-2 border-brand-500 pl-6 md:pl-8">
        <p className="max-w-[52ch] text-balance text-[1.2rem] font-bold leading-[1.4] text-ink md:text-[1.4rem]">
          Was weh tut, sieht man nicht im Konto: der Suchbegriff, auf dem ihr nie aufgetaucht seid,
          und der Wettbewerber, der euch den Platz abgenommen hat.
        </p>
      </div>
    </Station>
  );
}

/* ---------- 03 · Was wir übernehmen ---------- */
export function Bereiche() {
  const reduce = useReducedMotion();
  return (
    <Station label="Was wir übernehmen" tone="dark">
      <StationTitle>Fünf Bereiche, jeder in voller Tiefe.</StationTitle>

      <div className="mt-14">
        {bereiche.map((b, i) => (
          <motion.div
            key={b.n}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
            className="grid grid-cols-1 gap-y-5 border-t border-white/10 py-10 md:grid-cols-[3.5rem_1fr_1fr] md:gap-x-10"
          >
            <span className="num text-[1.5rem] text-white/25">{b.n}</span>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.07] py-1.5 pl-2.5 pr-3.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)]">
                <span aria-hidden className="node-glow" />
                <span className="text-label font-bold uppercase text-brand-400">{b.bereich}</span>
              </span>
              <h3 className="mt-4 max-w-[26ch] text-balance text-[1.25rem] font-bold leading-snug tracking-[-0.015em] text-white md:text-[1.4rem]">
                {b.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-body text-chalk-muted">{b.line}</p>
            </div>
            <ul className="min-w-0 space-y-3">
              {b.bullets.map((t) => (
                <li key={t} className="grid grid-cols-[0.6rem_1fr] gap-x-3 text-small leading-relaxed text-chalk-muted">
                  <span aria-hidden className="mt-[0.55rem] h-[3px] w-[0.6rem] rounded-full bg-brand-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        <div className="border-t border-white/10" />
      </div>
    </Station>
  );
}

/* ---------- 04 · Immer enthalten ---------- */
/**
 * Reporting.
 *
 * Vorher: die Bezeichnung stand in einer eigenen Spalte links, daneben eine
 * kleine Überschrift und drei fett gesetzte Zeilen ohne erkennbares Verhältnis,
 * alles flach auf Weiß. Die Sektion hatte kein Gewicht und man sah nicht, wie
 * die Texte zueinander stehen.
 *
 * Jetzt: eine Überschrift in Sektionsgröße, darunter drei Karten mit Symbol
 * und einem Satz, daneben das Bild. Damit ist die Hierarchie in einem Blick da.
 */
export function Reporting() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    ({
          initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
        });

  /* Die drei Zeilen hier sagten dreimal dasselbe: Zahlen je Produkt, Gewinn
     je Artikel, Plaetze je Suchbegriff. Alles Rueckblick, alles eine Ebene.
     Ein Report, den eine Geschaeftsfuehrung liest, beantwortet drei
     verschiedene Fragen: Was ist passiert, warum, und was machen wir jetzt.
     Danach sind die drei Punkte gebaut. */
  const punkte: { icon: IconName; title: string; body: string }[] = [
    {
      icon: "bericht",
      title: "Was der Monat gebracht hat",
      body: "Umsatz, Deckungsbeitrag und TACoS je Produktgruppe, gegen den Vormonat und gegen das Vorjahr.",
    },
    {
      icon: "lupe",
      title: "Woran es lag",
      body: "Welche Änderung welchen Ausschlag verursacht hat, dazu was der Wettbewerb im selben Zeitraum gemacht hat.",
    },
    {
      icon: "ziel",
      title: "Was als Nächstes ansteht",
      body: "Die drei Maßnahmen für den kommenden Monat, mit erwartetem Effekt und dem, was wir dafür von euch brauchen.",
    },
  ];

  return (
    <Station label="Immer enthalten" tone="tint">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.68fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <StationTitle>Reporting, das ihr in fünf Minuten versteht.</StationTitle>
          <StationLead>
            Kein Datenexport zum Selbstauswerten. Ihr bekommt die Zahlen, auf die es ankommt,
            und dazu unsere Einordnung.
          </StationLead>

          <div className="mt-8 space-y-3">
            {punkte.map((p, i) => (
              <motion.div key={p.title} {...auf(i * 0.07)} className="panel flex items-start gap-5 p-5 md:p-6">
                <span className="tile !h-[3.75rem] !w-[3.75rem] !rounded-[1.2rem]">
                  <Icon name={p.icon} className="h-8 w-8" />
                </span>
                <div className="min-w-0">
                  <div className="text-[1.05rem] font-bold leading-snug text-ink md:text-[1.12rem]">{p.title}</div>
                  <p className="mt-1.5 text-small leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div {...auf(0.12)} className="relative flex items-center justify-center">
          <span aria-hidden className="halo left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bilder/n-reporting.webp"
            alt="Ein schwebendes Dashboard mit steigender Kurve, Balken und zwei Kennzahlkarten."
            width={1408}
            height={1056}
            loading="lazy"
            className="relative w-full"
          />
        </motion.div>
      </div>
    </Station>
  );
}

/* ---------- 05 · Der Unterschied ---------- */
export function Unterschied() {
  const reduce = useReducedMotion();
  return (
    <Station label="Zusammenarbeit" tone="paper">
      <StationTitle>
        Bei euch arbeitet <span className="em mark">ein Team,</span> nicht drei Firmen.
      </StationTitle>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:gap-14">
        {/* Vorher Zeilen zwischen Haarlinien. Das Theme fuehrt solche Listen
            als Karten, damit sie als Block lesbar sind. */}
        <ul className="grid gap-3 sm:grid-cols-2">
          {unterschied.map((u, i) => (
            <motion.li
              key={u.title}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="panel panel-lift flex h-full items-center gap-5 p-5 md:p-6"
            >
              <span className="tile !h-[3.75rem] !w-[3.75rem] !rounded-[1.2rem]">
                <Icon name={u.icon} className="h-8 w-8" />
              </span>
              <span className="min-w-0 text-[1.02rem] font-bold leading-snug text-ink">{u.title}</span>
            </motion.li>
          ))}
        </ul>
        {/* Hier stand ein leeres Bildfeld. Die Aussage der Sektion ist ein
            Zusammenhang, und den zeichnet dieses Theme statt ihn zu
            bebildern: eine Quelle, fuenf Bereiche, leuchtende Verbindungen. */}
        <div className="min-w-0">
          <Zusammenlauf />
        </div>
      </div>
    </Station>
  );
}

/* ---------- 06 · Fuer wen es nicht passt ---------- */

/**
 * Der Ausschluss.
 *
 * Die Seite sagte bisher nur, fuer wen die Zusammenarbeit passt. Wer beides
 * liest, glaubt das Erste erst richtig: eine Liste, die niemanden ausschliesst,
 * ist keine Auswahl, sondern eine Anzeige. Die vier Punkte hier sind bewusst
 * die Kehrseite der eigenen Argumente, damit sie nicht als Absage klingen,
 * sondern als Haltung.
 */
const nichtFuerWen: { title: string; body: string }[] = [
  {
    title: "Ihr wollt Umsatz, egal was er kostet",
    body: "Wir drehen Kampagnen so lange auf, bis die Zahl stimmt: das können wir, aber davon habt ihr am Jahresende nichts.",
  },
  {
    title: "Das Listing soll bleiben, wie es ist",
    body: "Wenn Bilder und Texte nicht angefasst werden dürfen, bleibt nur Werbung. Dann werden Klicks jedes Jahr teurer und die Marge enger.",
  },
  {
    title: "Ihr sucht den günstigsten Anbieter",
    body: "Fünf Bereiche hauptberuflich zu besetzen, kostet Geld. Unter 50.000 € Monatsumsatz auf Amazon rechnet sich das für euch nicht.",
  },
  {
    title: "Entscheidungen dauern bei euch Monate",
    body: "Ein Hauptbild, das im März freigegeben wird, verkauft nicht mehr in der Saison. Wir brauchen einen Ansprechpartner, der entscheiden darf.",
  },
];

export function NichtFuerWen() {
  const reduce = useReducedMotion();
  return (
    <Station label="Wann es nicht passt" tone="warm">
      <StationTitle>
        Und wann wir <span className="em mark">absagen.</span>
      </StationTitle>
      <StationLead>
        Vier Fälle, in denen wir im ersten Gespräch sagen, dass es keinen Sinn hat. Lieber jetzt als
        nach vier Monaten.
      </StationLead>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
        {nichtFuerWen.map((n, i) => (
          <motion.div
            key={n.title}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            className="panel flex h-full items-start gap-5 p-6 md:p-7"
          >
            <span
              aria-hidden
              className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-[0.9rem]"
              style={{ background: "rgba(224,36,22,0.1)", color: "#C0241A" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="text-[1.08rem] font-bold leading-snug text-ink md:text-[1.18rem]">{n.title}</div>
              <p className="mt-2 text-small leading-relaxed text-ink-muted">{n.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Station>
  );
}

/* ---------- 07 · Onboarding ---------- */

/**
 * Die ersten Tage.
 *
 * Der Kunde wollte an dieser Stelle sehen, wie eine Zusammenarbeit anfaengt,
 * und zwar als Ablauf, der sich aufbaut. Die vier Schritte laufen deshalb
 * nacheinander ein und die Verbindung dazwischen zeichnet sich mit. Bei
 * prefers-reduced-motion steht alles sofort.
 */
const onboarding: { schritt: string; title: string; body: string; icon: IconName }[] = [
  {
    schritt: "Tag 0",
    title: "Das Gespräch",
    body: "30 Minuten mit Clemens zum Kennenlernen. Passt es, folgt ein zweiter Termin mit euren Zahlen.",
    icon: "kompass",
  },
  {
    schritt: "Tag 1",
    title: "Zugänge und Kanal",
    body: "Ihr ladet uns in Seller Central ein, wir öffnen einen gemeinsamen Slack-Kanal und ein Drive für alle Dateien.",
    icon: "schild",
  },
  {
    schritt: "Woche 1",
    title: "Die Analyse",
    body: "Wir rechnen jedes Produkt durch und legen die Reihenfolge fest. Je nach Größe des Sortiments dauert das bis zu zwei Wochen. Ihr bekommt das Ergebnis als Fahrplan, nicht als Datei.",
    icon: "bericht",
  },
  {
    schritt: "Woche 2 bis 3",
    title: "Die Arbeit läuft",
    body: "Content-Sprint für die ersten Artikel, Kampagnen werden umgebaut. Ab hier seht ihr jede Woche, was passiert ist.",
    icon: "ziel",
  },
];

export function Onboarding() {
  const reduce = useReducedMotion();

  return (
    <Station label="Die ersten drei Wochen" tone="dark">
      <StationTitle>
        Vom Gespräch bis <span className="em text-brand-400">zur ersten Optimierung.</span>
      </StationTitle>
      <StationLead tone="dark">
        Kein Kickoff-Workshop über drei Tage. Ihr gebt uns Zugang, wir fangen an.
      </StationLead>

      <div className="relative mt-14">
        {/* Die Bahn, auf der die Schritte liegen. Sie zeichnet sich von links
            nach rechts, bevor die Karten kommen. */}
        <motion.span
          aria-hidden
          className="absolute left-0 top-[2.05rem] hidden h-[2px] origin-left md:block"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, rgba(255,153,0,0.15), #FF9900 45%, rgba(255,153,0,0.15))",
            boxShadow: "0 0 14px rgba(255,153,0,0.5)",
          }}
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
        />

        <div className="grid gap-6 md:grid-cols-4 md:gap-5">
          {onboarding.map((o, i) => (
            <motion.div
              key={o.schritt}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.16, ease: EASE }}
              className="relative flex flex-col"
            >
              <span className="relative z-10 grid h-[4.1rem] w-[4.1rem] place-items-center rounded-[1.3rem] bg-[#0d2439] text-brand-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_0_0_6px_rgba(10,30,43,1)]">
                <Icon name={o.icon} className="h-8 w-8" />
              </span>
              <span className="mt-6 text-label font-bold uppercase tracking-[0.14em] text-brand-400">
                {o.schritt}
              </span>
              <span className="mt-2 text-[1.15rem] font-bold leading-snug text-white md:text-[1.25rem]">
                {o.title}
              </span>
              <p className="mt-2.5 text-small leading-relaxed text-chalk-muted">{o.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Station>
  );
}
