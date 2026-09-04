"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Station, StationTitle, StationLead, Eyebrow, Karte } from "./Station";
import { Icon, type IconName } from "./Icons";
import { Bildfeld } from "./Bildfeld";

/**
 * /full-service in der Welt „Taktplan".
 * Der Text ist der freigegebene Wortlaut und wird nicht verändert.
 */

const EASE = [0.32, 0.72, 0, 1] as const;

const fuerWen: { icon: IconName; title: string; body: string }[] = [
  { icon: "regal", title: "Etabliertes Sortiment", body: "Eigene Marke, ab etwa 50.000 € Amazon-Umsatz im Monat, aber Luft nach oben." },
  { icon: "kompass", title: "Amazon-Wissen fehlt im Haus", body: "Die Produkte sind stark, das Plattform-Know-how noch nicht." },
  { icon: "stufen", title: "Schnelles Wachstum", body: "Das Sortiment wächst schneller als die interne Kapazität." },
  { icon: "globus", title: "Viele SKUs, mehrere Marktplätze", body: "Mehrere hundert Produkte, die niemand einzeln durchgehen kann." },
];

const ausgangslage: { icon: IconName; title: string; body: string }[] = [
  { icon: "uhr", title: "Internes Team zu klein", body: "Eine Person kann Strategie, Content, Werbung und Betrieb nicht in der nötigen Tiefe abdecken." },
  { icon: "streuung", title: "Einzeldienstleister, getrennte Sicht", body: "Einer steuert PPC nur auf Werbeausgaben, einer erstellt Content ohne Blick auf den Bestand. Die Gesamtstrategie verantwortet niemand." },
  { icon: "schild", title: "Amazon ist ein Vollzeitjob", body: "20 bis 40 Stunden pro Woche auf einer Plattform, die sich ständig verändert." },
];

const bereiche = [
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
      "Profitabilität als Ziel, beim Aufbau neuer Suchbegriffe bewusst und befristet darüber hinaus",
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
];

const unterschied = [
  "Dieselbe Keyword- und Margenanalyse liegt Content, Kampagnen und Pricing zugrunde",
  "Was im Search Query Report auffällt, landet in derselben Woche im Listing und in der Kampagne",
  "Wir verantworten das Ergebnis. Kein Verschieben der Verantwortung zwischen Dienstleistern.",
  "Ein Ansprechpartner, ein Report, eine Planung für alle fünf Bereiche",
];

/* ---------- 00 · Kopf ---------- */
export function FullServiceKopf() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.85, delay, ease: EASE } };

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
              <motion.h1 {...rise(0.08)} className="display max-w-[17ch] text-balance text-[clamp(2.4rem,1.6rem+2.6vw,3.75rem)] text-ink">
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

            <motion.div {...rise(0.18)} className="panel overflow-hidden p-3">
              <Bildfeld
                id="B-05"
                aspect="aspect-[4/5]"
                tone="paper"
                priority
                src="/bilder/p-unterwegs.webp"
                alt="Produktaufnahme aus einem Listing, das wir gebaut haben"
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
          <Karte key={r.title} icon={r.icon} title={r.title} body={r.body} />
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
        <p className="max-w-[46ch] text-balance text-[1.2rem] font-bold leading-[1.4] text-ink md:text-[1.4rem]">
          Die größten Verluste entstehen bei Chancen, die intern nie auffallen.
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
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
            className="grid grid-cols-1 gap-y-5 border-t border-white/10 py-10 md:grid-cols-[3.5rem_1fr_1fr] md:gap-x-10"
          >
            <span className="num text-[1.5rem] text-white/25">{b.n}</span>
            <div className="min-w-0">
              <h3 className="max-w-[26ch] text-balance text-[1.25rem] font-bold leading-snug tracking-[-0.015em] text-white md:text-[1.4rem]">
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
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  const punkte: { icon: IconName; title: string; body: string }[] = [
    {
      icon: "bericht",
      title: "Monatlicher Performance-Report",
      body: "Umsatz, Werbekosten und Deckungsbeitrag je Produkt, in einer Ansicht.",
    },
    {
      icon: "stufen",
      title: "Profit- und Verlust-Analyse",
      body: "Welche SKU verdient, welche kostet, und woran es liegt.",
    },
    {
      icon: "lupe",
      title: "Markttrends und Wettbewerb",
      body: "Wo eure Suchbegriffe wandern und wer euch Plätze abnimmt.",
    },
  ];

  return (
    <Station label="Immer enthalten" tone="tint">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.68fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <StationTitle>Reporting, das ihr in fünf Minuten versteht.</StationTitle>
          <StationLead>
            Kein Datenexport zum Selbstauswerten. Ihr bekommt die Zahlen, die eine Entscheidung
            tragen, und dazu unsere Einordnung.
          </StationLead>

          <div className="mt-8 space-y-3">
            {punkte.map((p, i) => (
              <motion.div key={p.title} {...auf(i * 0.07)} className="panel flex items-start gap-4 p-5 md:p-6">
                <span className="tile">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <div className="text-[1.02rem] font-bold leading-snug text-ink">{p.title}</div>
                  <div className="mt-1 text-small leading-relaxed text-ink-muted">{p.body}</div>
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
      <StationTitle>Alle Bereiche arbeiten mit denselben Zahlen.</StationTitle>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:gap-14">
        <ul className="space-y-6">
          {unterschied.map((t, i) => (
            <motion.li
              key={t}
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="grid grid-cols-[2rem_1fr] gap-x-4 border-t border-ink/[0.09] pt-6"
            >
              <span className="num text-[1.1rem] text-ink/25">{String(i + 1).padStart(2, "0")}</span>
              <span className="max-w-[48ch] text-body text-ink">{t}</span>
            </motion.li>
          ))}
        </ul>
        <div className="overflow-hidden rounded-[1.25rem] shadow-[0_40px_70px_-40px_rgba(2,48,71,0.45)]">
          <Bildfeld id="B-06" aspect="aspect-square" tone="paper" />
        </div>
      </div>
    </Station>
  );
}
