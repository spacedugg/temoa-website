"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { Station, StationTitle, StationLead, RuledRow } from "./Station";
import { Bildfeld } from "./Bildfeld";
import { cases } from "@/lib/cases";
import { testimonials, initials } from "@/lib/testimonials";
import type { PostMeta } from "@/lib/blog";

/* ============================================================
   Kundenband. Zwei dünne Bänder von vorher zu einem verschmolzen:
   Logos und die beiden verbliebenen Kennzahlen.
   ============================================================ */

const logos = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.png`);
const logoRows = [logos.slice(0, 7), logos.slice(7, 14)];

function LogoRow({ row, duration, reverse }: { row: string[]; duration: number; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
      <div
        className="flex w-max animate-marquee items-center gap-14 md:gap-20"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...row, ...row].map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-9 w-28 shrink-0 opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-10 md:w-32">
            <Image src={src} alt="" fill sizes="128px" className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Kundenband() {
  return (
    <section className="relative border-y border-ink/[0.08] bg-white py-10 md:py-12">
      <div className="container-x">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <span className="text-label font-bold uppercase text-ink-faint">Täglich in unserer Verantwortung</span>
          <span className="text-small font-bold text-ink [font-variant-numeric:tabular-nums]">60+ Marken</span>
          <span className="text-small font-bold text-ink [font-variant-numeric:tabular-nums]">5+ Marktplätze</span>
        </div>
        <div className="mt-8 space-y-6">
          <LogoRow row={logoRows[0]} duration={58} />
          <LogoRow row={logoRows[1]} duration={72} reverse />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   01 · Befund
   ============================================================ */

const befunde = [
  {
    n: "01",
    title: "Zu viele Produkte, zu wenig Zeit",
    body: "Mehrere hundert Artikel liegen bei ein, zwei Leuten, die daneben zehn andere Dinge machen.",
  },
  {
    n: "02",
    title: "Seit dem Launch nichts verändert",
    body: "Bilder, Titel und A+ Content stehen genau so da wie am ersten Tag.",
  },
  {
    n: "03",
    title: "Kampagnen ohne Struktur",
    body: "Auto, Phrase und Exact laufen nebeneinander und bieten gegeneinander.",
  },
  {
    n: "04",
    title: "Berichte, die niemand auswertet",
    body: "Search Query Bericht und Ads-Performance liegen im Konto und werden nicht gelesen.",
  },
];

export function Befund() {
  return (
    <Station label="Ausgangslage" tone="paper">
      <StationTitle>Das Nötigste reicht auf Amazon nicht.</StationTitle>

      <div className="mt-12">
        {befunde.map((b) => (
          <RuledRow key={b.n} index={b.n} title={b.title} body={b.body} tone="tint" />
        ))}
        <div className="border-t border-paper-rule" />
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-12">
        <div className="border-l-2 border-brand-500 pl-6 md:pl-8">
          <span className="text-label font-bold uppercase text-ink-muted">Die Ursache</span>
          <p className="mt-3 max-w-[52ch] text-balance text-[1.2rem] font-bold leading-[1.4] text-ink md:text-[1.4rem]">
            Vier Symptome, eine Ursache: das Listing überzeugt zu wenige Besucher. Amazon rankt nach
            Klicks und Käufen. Wer dort zurückliegt, muss Sichtbarkeit dauerhaft einkaufen.
          </p>
        </div>
        <div className="overflow-hidden rounded-[1.25rem] shadow-[0_40px_70px_-40px_rgba(2,48,71,0.5)]">
          <Bildfeld
            id="B-02"
            aspect="aspect-[4/3]"
            tone="paper"
            src="/bilder/b-02.webp"
            alt="Ein hoher Stapel gleicher Karten, daneben eine flach liegende Uhr: das Listing steht seit dem Launch unverändert."
          />
        </div>
      </div>
    </Station>
  );
}

/* ============================================================
   02 · Verfahren
   ============================================================ */

const stufen = [
  { name: "Sichtbarkeit", meaning: "im Suchergebnis gefunden werden", signal: false },
  { name: "Klickrate (CTR)", meaning: "der Klick auf euer Produkt", signal: true },
  { name: "Conversion (CVR)", meaning: "der Kauf auf der Detailseite", signal: true },
];

const gegenueber = [
  {
    alt: "Listing einmal erstellt, danach nur noch Werbung",
    neu: "Hauptbild, Titel und A+ nachgeschärft, bis die Conversion steht",
  },
  {
    alt: "Content nach Gefühl, ohne Datenbasis",
    neu: "Content aus Search Query Report, Wettbewerb und Bewertungen",
  },
  {
    alt: "Sichtbarkeit über Gebote gekauft, Klickpreise steigen jedes Jahr",
    neu: "Organische Plätze tragen die Sichtbarkeit, Werbung kommt dazu",
  },
  {
    alt: "Umsatz um jeden Preis",
    neu: "Jede SKU auf Deckungsbeitrag gerechnet",
  },
];

export function Verfahren() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: { duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] as const },
        };

  return (
    <Station label="Unser Vorgehen" tone="dark">
      <StationTitle>
        Organic First, <span className="em text-brand-400">PPC Second.</span>
      </StationTitle>
      <div className="grid gap-10 lg:grid-cols-[1fr_0.62fr] lg:items-center lg:gap-14">
        <StationLead tone="dark" className="mt-6 lg:mt-0">
          Klickrate und Conversion bestimmen, wo Amazon euer Produkt zeigt. Deshalb kommt bei uns
          zuerst das Listing, dann die Kampagne.
        </StationLead>

        {/* Zeigt, wo die Klickrate entsteht: die Kachel im Suchergebnis. */}
        <figure className="m-0">
          <div className="relative mx-auto max-w-[22rem] rounded-card bg-white p-4 ring-2 ring-brand-500">
            <div className="overflow-hidden rounded-inner bg-canvas-tint/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bilder/p-haupt.webp"
                alt="Produktkachel im Suchergebnis: Hauptbild der Isolierflasche"
                width={1024}
                height={1024}
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[0.85rem] font-bold leading-snug text-ink">
              Isolierflasche 750 ml, doppelwandig, 24 h kalt
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FF9900">
                    <path d="M12 2l2.9 6.3 6.9.8-5 4.8 1.2 6.8L12 17.4 6 20.7l1.2-6.8-5-4.8 6.9-.8L12 2z" />
                  </svg>
                ))}
              </span>
              <span className="text-[0.7rem] text-ink-faint">1.284</span>
            </div>
            <p className="mt-1.5 num text-[1.35rem] text-ink">34,90 €</p>
          </div>
          <figcaption className="mt-4 text-center text-small text-chalk-muted">
            Hier entsteht die Klickrate: Hauptbild, Titel, Bewertungen, Preis.
          </figcaption>
        </figure>
      </div>

      {/* Der Ablauf als Kette: drei Stufen, davon zwei Ranking-Signale, dann das Ergebnis. */}
      <div className="mt-16">
        <div className="flex items-center gap-3">
          <span className="text-label font-bold uppercase text-brand-400">Organic First</span>
          <span aria-hidden className="h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stufen.map((s, i) => (
            <motion.div
              key={s.name}
              {...auf(i * 0.09)}
              className={clsx(
                "relative rounded-card p-6 ring-1 ring-inset",
                s.signal ? "bg-white/[0.07] ring-brand-500/40" : "bg-white/[0.035] ring-white/[0.08]"
              )}
            >
              {s.signal && (
                <span className="absolute right-5 top-5 rounded-full bg-brand-500 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-navy">
                  Ranking-Signal
                </span>
              )}
              <div className="num text-[2.2rem] text-white/20">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-3 text-[1.15rem] font-bold leading-snug text-white">{s.name}</div>
              <div className="mt-1.5 text-small text-chalk-muted">{s.meaning}</div>
              {/* Pfeil zur nächsten Stufe, nur auf breiten Fenstern */}
              {i < stufen.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-[1.4rem] top-1/2 hidden -translate-y-1/2 text-brand-500 md:block"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Ergebnis der ersten Phase, trägt in die zweite */}
        <motion.div
          {...auf(0.3)}
          className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-card bg-brand-500 px-6 py-5 text-navy"
        >
          <span className="text-label font-bold uppercase">Ergebnis</span>
          <span className="text-[1.15rem] font-extrabold leading-snug">Das Listing verkauft ohne Werbung.</span>
        </motion.div>

        <div className="mt-10 flex items-center gap-3">
          <span className="text-label font-bold uppercase text-brand-400">PPC Second</span>
          <span aria-hidden className="h-px flex-1 bg-white/10" />
        </div>

        <motion.div {...auf(0.1)} className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Skalieren, was konvertiert", "Budget geht auf Suchbegriffe, die auf der Detailseite kaufen."],
            ["Platz halten", "Marke und Bestseller-Begriffe bleiben besetzt, auch gegen Wettbewerber."],
            ["Auf Profit steuern", "Jede SKU auf Deckungsbeitrag gerechnet, geführt über den TACoS."],
          ].map(([t, b], i) => (
            <div key={t} className="rounded-card bg-white/[0.035] p-6 ring-1 ring-inset ring-white/[0.08]">
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-brand-500" />
              <div className="mt-4 text-[1.05rem] font-bold leading-snug text-white">{t}</div>
              <div className="mt-1.5 text-small text-chalk-muted">{b}</div>
              <span className="sr-only">{`Baustein ${i + 1}`}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gegenüberstellung als zwei Karten. Die frühere Tabelle mit Durchstreichung
          war schwer zu lesen und hat pro Blick kaum Information getragen. */}
      <div className="mt-16 grid gap-5 lg:grid-cols-2 lg:gap-6">
        <motion.div {...auf(0)} className="rounded-card bg-white/[0.03] p-7 ring-1 ring-inset ring-white/[0.07] md:p-8">
          <span className="text-label font-bold uppercase text-chalk-faint">Wie es meistens läuft</span>
          <ul className="mt-6 space-y-4">
            {gegenueber.map((r) => (
              <li key={r.alt} className="flex gap-3.5">
                <span aria-hidden className="mt-1 shrink-0 text-chalk-faint">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-small leading-snug text-chalk-faint">{r.alt}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          {...auf(0.1)}
          className="rounded-card bg-white/[0.08] p-7 ring-1 ring-inset ring-brand-500/35 md:p-8"
        >
          <span className="text-label font-bold uppercase text-brand-400">Wie temoa arbeitet</span>
          <ul className="mt-6 space-y-4">
            {gegenueber.map((r) => (
              <li key={r.neu} className="flex gap-3.5">
                <span aria-hidden className="mt-1 shrink-0 text-brand-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-small font-bold leading-snug text-white">{r.neu}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Station>
  );
}

/* ============================================================
   03 · Leistungen
   ============================================================ */

const leistungen = [
  { n: "01", title: "Strategie & Analyse", body: "Erst die Daten, dann der Plan.", href: "/leistungen/strategie" },
  { n: "02", title: "Content & Listings", body: "Aus Klicks werden Käufe.", href: "/leistungen/listing-seo" },
  { n: "03", title: "Advertising / PPC", body: "Profitabel skalieren.", href: "/leistungen/ppc-advertising" },
  { n: "04", title: "Account-Management", body: "Bestand, Buy-Box, Cases im Griff.", href: "/leistungen/account-management" },
  { n: "05", title: "Internationalisierung", body: "Lokalisieren statt übersetzen.", href: "/leistungen/internationalisierung" },
];

export function Leistungen() {
  return (
    <Station label="Leistungen" tone="paper">
      <StationTitle>
        Fünf Leistungen, in der <span className="em mark">richtigen Reihenfolge.</span>
      </StationTitle>

      <div className="mt-12">
        {leistungen.map((l) => (
          <RuledRow key={l.n} index={l.n} title={l.title} body={l.body} href={l.href} tone="tint" />
        ))}
        <div className="border-t border-paper-rule" />
      </div>

      <a
        href="/full-service"
        className="btn-text mt-10"
      >
        Alle Leistungen ansehen
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </Station>
  );
}

/* ============================================================
   04 · Nachweis
   ============================================================ */

export function Nachweis() {
  return (
    <Station label="Ergebnisse" tone="dark" id="nachweis">
      <StationTitle>
        Vier Marken, <span className="em text-brand-400">vier Ausgangslagen.</span>
      </StationTitle>
      <StationLead tone="dark">Ausgangslage, Vorgehen, Ergebnis. Mit den Zahlen dahinter.</StationLead>

      <div className="mt-12">
        {cases.map((c, i) => (
          <a
            key={c.slug}
            href={`/ergebnisse/${c.slug}`}
            className="group grid grid-cols-1 items-center gap-6 border-t border-board-rule py-8 transition-colors duration-300 hover:bg-board-raised/60 md:grid-cols-[14rem_1fr_auto] md:gap-8"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-inner md:aspect-[4/3]">
              {c.bgImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.bgImage}
                  alt=""
                  loading={i === 0 ? undefined : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-temoa group-hover:scale-[1.04]"
                />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-label font-bold uppercase text-chalk-faint">
                <span>{c.industry}</span>
                <span aria-hidden>·</span>
                <span>{c.marketplaces.join(" ")}</span>
                <span aria-hidden>·</span>
                <span>{c.timeframe}</span>
              </div>
              <h3 className="mt-3 max-w-[32ch] text-balance text-[1.2rem] font-bold leading-snug tracking-[-0.01em] text-chalk md:text-[1.4rem]">
                {c.headline}
              </h3>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {c.heroStats.slice(0, 3).map((s) => (
                  <span key={s.label} className="text-small text-chalk-muted">
                    <span className="font-extrabold text-chalk [font-variant-numeric:tabular-nums]">{s.value}</span>{" "}
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            <span className="hidden shrink-0 self-center text-brand-500 transition-transform duration-300 group-hover:translate-x-1 md:block" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}
        <div className="border-t border-board-rule" />
      </div>
    </Station>
  );
}

/* ============================================================
   05 · Arbeiten (Designbeispiele)
   ============================================================ */

/* Ein komplettes Listing: sieben Bilder plus vier A+ Module.
   Die Bilder liegen als Datei vor, jede Beschriftung zeichnet der Code. */
const bildstrecke = [
  { src: "/bilder/p-haupt.webp", rolle: "Hauptbild", alt: "Hauptbild: Isolierflasche freigestellt auf weißem Grund" },
  { src: "/bilder/p-detail.webp", rolle: "Verschluss", alt: "Detailbild: Schraubverschluss aus gebürstetem Stahl" },
  { src: "/bilder/p-szene.webp", rolle: "Anwendung", alt: "Anwendungsbild: Flasche auf einer Küchenarbeitsplatte" },
  { src: "/bilder/p-gruppe.webp", rolle: "Varianten", alt: "Varianten: drei Farben nebeneinander" },
  { src: "/bilder/p-material.webp", rolle: "Material", alt: "Makrobild: matte Oberfläche und gebürsteter Stahl" },
  { src: "/bilder/p-offen.webp", rolle: "Geöffnet", alt: "Flasche mit abgeschraubtem Verschluss" },
  { src: "/bilder/p-unterwegs.webp", rolle: "Unterwegs", alt: "Flasche in der Seitentasche eines Rucksacks" },
];

export function Arbeiten() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: { duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] as const },
        };

  return (
    <Station label="Designbeispiele" tone="tint">
      <StationTitle>
        So sieht <span className="em mark">Retail Ready</span> aus.
      </StationTitle>
      <StationLead>
        Ein komplettes Listing aus unserer Produktion: sieben Bilder und vier A+ Module. Produkt und
        Marke sind frei erfunden, die Arbeit ist echt.
      </StationLead>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
        {/* Bildstrecke */}
        <div className="min-w-0">
          <div className="text-label font-bold uppercase text-ink-faint">Bildstrecke</div>
          {/* Vier Spalten, das Hauptbild über zwei mal zwei Felder. Mit den sechs
              weiteren Bildern und der Infokachel geht das Raster lückenlos auf. */}
          <div className="mt-4 grid grid-cols-4 gap-2.5">
            {bildstrecke.map((b, i) => (
              <motion.figure
                key={b.src}
                {...auf(i * 0.05)}
                className={clsx(
                  "group relative m-0 overflow-hidden rounded-[0.625rem] bg-white shadow-[0_10px_24px_-16px_rgba(2,48,71,0.5)]",
                  i === 0 ? "col-span-2 row-span-2" : ""
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt} width={1024} height={1024} className="aspect-square w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/75 to-transparent px-2.5 pb-1.5 pt-6">
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-white">{b.rolle}</span>
                </figcaption>
              </motion.figure>
            ))}
            <motion.div
              {...auf(0.35)}
              className="col-span-2 flex flex-col justify-center rounded-[0.625rem] bg-navy p-5"
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-brand-500" />
              <p className="mt-3 text-[0.95rem] font-bold leading-snug text-white">
                Ein Set, sieben Rollen
              </p>
              <p className="mt-1.5 text-[0.78rem] leading-snug text-chalk-muted">
                Jedes Bild beantwortet eine eigene Frage: Was ist es, wie ist es gemacht, wofür ist
                es, welche Varianten gibt es.
              </p>
            </motion.div>
          </div>
        </div>

        {/* A+ Content: Bildgrund aus der Datei, Text aus dem Code */}
        <div className="min-w-0">
          <div className="text-label font-bold uppercase text-ink-faint">A+ Content</div>
          <div className="mt-4 space-y-2.5">
            <motion.div
              {...auf(0.05)}
              className="relative overflow-hidden rounded-[0.625rem] bg-white shadow-[0_10px_24px_-16px_rgba(2,48,71,0.5)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bilder/a-hero.webp" alt="" width={1600} height={608} className="aspect-[1600/608] w-full object-cover" />
              <div className="absolute inset-y-0 left-0 flex w-[58%] flex-col justify-center px-5 md:px-7">
                <p className="text-[clamp(0.85rem,0.5rem+0.9vw,1.25rem)] font-extrabold leading-tight text-navy">
                  24 Stunden kalt.
                  <br />
                  12 Stunden heiß.
                </p>
                <p className="mt-1.5 text-[0.7rem] leading-snug text-navy/70">Doppelwandig, vakuumisoliert</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { src: "/bilder/a-nutzen.webp", t: "Hält die Kälte", b: "Auch nach einem Tag im Rucksack." },
                { src: "/bilder/a-anwendung.webp", t: "Passt in den Alltag", b: "Schreibtisch, Küche, Tasche." },
              ].map((m, i) => (
                <motion.div
                  key={m.src}
                  {...auf(0.1 + i * 0.05)}
                  className="overflow-hidden rounded-[0.625rem] bg-white shadow-[0_10px_24px_-16px_rgba(2,48,71,0.5)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt="" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
                  <div className="px-3 py-2.5">
                    <p className="text-[0.75rem] font-bold leading-snug text-ink">{m.t}</p>
                    <p className="mt-0.5 text-[0.68rem] leading-snug text-ink-faint">{m.b}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...auf(0.2)}
              className="overflow-hidden rounded-[0.625rem] bg-white shadow-[0_10px_24px_-16px_rgba(2,48,71,0.5)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bilder/a-vergleich.webp" alt="" width={1600} height={608} className="aspect-[1600/608] w-full object-cover" />
              <div className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <p className="text-[0.75rem] font-bold text-ink">Fünf Farben, eine Form</p>
                <p className="text-[0.68rem] text-ink-faint">Modul: Varianten</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <a href="/design-beispiele" className="btn-text mt-10">
        Mehr Designbeispiele
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </Station>
  );
}

/* ============================================================
   06 · Stimmen
   ============================================================ */

export function Stimmen() {
  return (
    <Station label="Kundenstimmen" tone="tint">
      <StationTitle>
        Im Wortlaut, <span className="em mark">mit Zahlen.</span>
      </StationTitle>

      <div className="mt-12 columns-1 gap-6 md:columns-2 [&>*]:mb-6">
        {testimonials.map((t) => (
          <figure key={t.name} className="break-inside-avoid rounded-[1.25rem] bg-white p-7 shadow-[0_24px_50px_-30px_rgba(2,48,71,0.4)]">
            <div className="flex gap-0.5" aria-label="5 von 5 Sternen">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FF9900" aria-hidden>
                  <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-5 text-pretty text-body text-ink">„{t.quote}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-canvas-tint text-small font-bold text-ink">
                <span aria-hidden>{initials(t.name)}</span>
                {t.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-small font-bold text-ink">{t.name}</span>
                <span className="block truncate text-small text-ink-faint">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Station>
  );
}

/* ============================================================
   07 · Termin
   ============================================================ */

export function Termin({
  title,
  sub,
}: {
  title?: React.ReactNode;
  sub?: React.ReactNode;
} = {}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-chalk">
      {/* orange Lichtkante oben, damit die Sektion nicht als Block abfällt */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand-500" />
      <div className="container-x">
        <div className="grid items-center gap-y-10 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-16">
          <div className="min-w-0">
            <h2 className="title max-w-[22ch] text-balance text-[clamp(2rem,1.3rem+2.1vw,3.25rem)] text-white">
              {title ?? "Wie viel Umsatz lässt euer Listing liegen?"}
            </h2>
            <p className="mt-6 max-w-[52ch] text-pretty text-lead text-chalk-muted">
              {sub ??
                "In der kostenlosen Potenzialanalyse lesen wir die Berichte aus eurem Konto und zeigen euch, was euer Sortiment noch hergibt."}
            </p>
            <div className="mt-10">
              <a href="/gespraech-vereinbaren" className="btn-on-dark">
                Potenzialanalyse buchen
                <span className="disc" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Risk-Reversal als abgesetzte Platte, nicht als Nebensatz hinter dem Button */}
          <div className="rounded-card bg-white/[0.06] p-7 ring-1 ring-inset ring-white/10 md:p-8">
            {[
              ["Keine lange Laufzeit", "Ihr verlängert nach Performance, nicht nach Vertrag."],
              ["98 %", "unserer Marken verlängern die Zusammenarbeit."],
              ["Kostenlos", "Die Analyse selbst kostet euch nichts außer der Zeit."],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 border-t border-white/10 py-4 first:border-t-0 first:pt-0 last:pb-0">
                <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <p className="text-small text-chalk-muted">
                  <span className="font-bold text-white">{k}</span> {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   08 · Mannschaft
   ============================================================ */

const candids = ["/team/Main.jpg", "/team/DSCF2442.jpg", "/team/DSCF2526.jpg", "/team/DSCF2497-2.jpg", "/team/DSCF2749.jpg"];
const members = [
  { src: "/team/Clemens.jpg", name: "Clemens" },
  { src: "/team/Marvin.jpg", name: "Marvin" },
  { src: "/team/Christoph.jpg", name: "Christoph" },
  { src: "/team/Jonas.jpg", name: "Jonas" },
  { src: "/team/Anzelika.jpg", name: "Anzelika" },
  { src: "/team/Marina.jpg", name: "Marina" },
  { src: "/team/Eddie.jpg", name: "Eddie" },
  { src: "/team/Ole.jpg", name: "Ole" },
  { src: "/team/Vadim.jpg", name: "Vadim" },
  { src: "/team/Dias.jpg", name: "Dias" },
  { src: "/team/Burak.jpeg", name: "Burak" },
  { src: "/team/Noor.jpeg", name: "Noor" },
];

export function Mannschaft() {
  return (
    <Station label="Team" tone="paper" id="team">
      <StationTitle>Das Team hinter temoa.</StationTitle>
      <StationLead>
        Strategie, Design, Advertising und Account-Management, alle im Haus.
      </StationLead>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {candids.slice(0, 3).map((src) => (
          <div key={src} className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-12">
        {members.map((m) => (
          <div key={m.src}>
            <div className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={m.name} loading="lazy" className="aspect-square w-full object-cover grayscale transition duration-500 hover:grayscale-0" />
            </div>
            <p className="mt-2 text-[0.7rem] font-bold text-ink">{m.name}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-[46ch] text-body font-bold text-ink">
        Menschen, kein Tool. An eurem Konto arbeiten mehrere gleichzeitig, jeder in seinem Bereich.
      </p>
    </Station>
  );
}

/* ============================================================
   09 · Wissen
   ============================================================ */

export function Wissen({ posts }: { posts: PostMeta[] }) {
  return (
    <Station label="Blog" tone="paper">
      <StationTitle>Klartext zu Amazon.</StationTitle>

      <div className="mt-12">
        {posts.map((p, i) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group -mx-5 grid grid-cols-[2.5rem_1fr] items-start gap-x-5 border-t border-ink/[0.09] px-5 py-7 transition-colors duration-300 hover:bg-ink/[0.025] md:grid-cols-[3.5rem_1fr_auto]"
          >
            <span className="num text-[1.5rem] text-ink/20">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block max-w-[48ch] text-balance text-[1.05rem] font-bold leading-snug text-ink md:text-[1.15rem]">
                {p.title}
              </span>
              <span className="mt-2 block text-label font-bold uppercase text-ink-faint">{p.categoryShort}</span>
            </span>
            <span className="hidden shrink-0 self-center text-navy transition-all duration-300 md:grid md:h-10 md:w-10 md:place-items-center md:rounded-[0.625rem] md:group-hover:bg-brand-500 md:group-hover:text-ink" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}
        <div className="border-t border-ink/[0.09]" />
      </div>

      <a
        href="/blog"
        className="btn-text mt-10"
      >
        Alle Beiträge
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </Station>
  );
}
