"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { Station, StationTitle, StationLead, Karte } from "./Station";
import type { IconName } from "./Icons";
import { Bildfeld } from "./Bildfeld";
import { Verlauf } from "./Verlauf";
import { Zahl, ZahlText } from "./Zahl";
import { cases } from "@/lib/cases";
import { testimonials, initials } from "@/lib/testimonials";
import type { PostMeta } from "@/lib/blog";
import { BlogCover } from "../blog/BlogCover";

/* ============================================================
   Kundenband. Zwei dünne Bänder von vorher zu einem verschmolzen:
   Logos und die beiden verbliebenen Kennzahlen.
   ============================================================ */

const logos = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.webp`);
const logoRows = [logos.slice(0, 7), logos.slice(7, 14)];

function LogoRow({ row, duration, reverse }: { row: string[]; duration: number; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      {/* Die Verläufe an den Kanten müssen die Plattenfarbe treffen, nicht den
          Seitengrund, sonst zeichnet sich eine Kante ab. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-24" />
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

/**
 * Kundenband.
 *
 * Lag vorher als weiße Bahn zwischen zwei Haarlinien auf der Seite. Jetzt
 * liegt es als eigene Platte auf dem getönten Grund, damit es als Block
 * gelesen wird und die Logos einen sauberen weißen Untergrund haben.
 */
export function Kundenband() {
  return (
    <section className="ground-tint relative">
      <div className="container-x py-12 md:py-16">
        <div className="panel overflow-hidden px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden className="node-glow" />
              <span className="text-label font-bold uppercase text-ink-soft">
                Täglich in unserer Verantwortung
              </span>
            </span>
            <span className="text-small font-bold text-ink">
              <Zahl bis={60} nach="+" /> Marken
            </span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-ink-line" />
            <span className="text-small font-bold text-ink">
              <Zahl bis={5} nach="+" /> Marktplätze
            </span>
          </div>
          <div className="mt-8 space-y-6">
            <LogoRow row={logoRows[0]} duration={58} />
            <LogoRow row={logoRows[1]} duration={72} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   01 · Befund
   ============================================================ */

const befunde: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "uhr",
    title: "Zu viele Produkte, zu wenig Zeit",
    body: "Mehrere hundert Artikel liegen bei ein, zwei Leuten, die daneben zehn andere Dinge machen.",
  },
  {
    icon: "bild",
    title: "Seit dem Launch nichts verändert",
    body: "Bilder, Titel und A+ Content stehen genau so da wie am ersten Tag.",
  },
  {
    icon: "streuung",
    title: "Kampagnen ohne Struktur",
    body: "Auto, Phrase und Exact laufen nebeneinander und bieten gegeneinander.",
  },
  {
    icon: "bericht",
    title: "Berichte, die niemand auswertet",
    body: "Search Query Bericht und Ads-Performance liegen im Konto und werden nicht gelesen.",
  },
];

export function Befund() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: { duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] as const },
        };

  return (
    <Station label="Ausgangslage" tone="paper">
      <StationTitle>Das Nötigste reicht auf Amazon nicht.</StationTitle>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {befunde.map((b, i) => (
          <motion.div key={b.title} {...auf(i * 0.07)} className="h-full">
            <Karte icon={b.icon} title={b.title} body={b.body} />
          </motion.div>
        ))}
      </div>

      {/* Die Ursache hinter den vier Symptomen, mit dem Trichter daneben. */}
      <motion.div
        {...auf(0.1)}
        className="panel relative mt-6 overflow-hidden lg:mt-8"
      >
        <span aria-hidden className="halo -left-24 -top-28 h-[24rem] w-[24rem] opacity-70" />
        <div className="relative grid items-center gap-8 p-8 md:p-10 lg:grid-cols-[1fr_0.78fr] lg:gap-12">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden className="node-glow" />
              <span className="text-label font-bold uppercase text-ink-soft">Die Ursache</span>
            </span>
            <p className="mt-4 max-w-[46ch] text-balance text-[1.3rem] font-bold leading-[1.35] text-ink md:text-[1.6rem]">
              Vier Symptome, eine Ursache: das Listing überzeugt zu wenige Besucher.
            </p>
            <p className="mt-4 max-w-[50ch] text-body text-ink-muted">
              Amazon rankt nach Klicks und Käufen. Wer dort zurückliegt, muss Sichtbarkeit dauerhaft
              einkaufen.
            </p>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bilder/n-ursache.webp"
              alt="Ein Trichter: viele Besucher laufen oben hinein, unten kommen nur zwei Käufe heraus."
              width={1600}
              height={1200}
              loading="lazy"
              className="w-full"
            />
          </div>
        </div>
      </motion.div>
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
    neu: "Die Sichtbarkeit kommt organisch, Werbung legt sich obendrauf",
  },
  {
    alt: "Umsatz um jeden Preis",
    neu: "Jedes Produkt einzeln durchgerechnet, bevor Budget fließt",
  },
];

/**
 * Organic First, PPC Second.
 *
 * Lag vorher auf dunklem Grund. Die Illustrationen dieses Themes haben einen
 * hellen Studiogrund, auf Navy wären sie als weißer Kasten stehen geblieben.
 * Deshalb ist die Sektion hell. Dunkel bleiben die Ergebnisse und der Termin,
 * damit die Seite trotzdem ihren Wechsel behält.
 */
const ppc = [
  { title: "Skalieren, was konvertiert", body: "Budget geht auf Suchbegriffe, die auf der Detailseite kaufen." },
  { title: "Platz halten", body: "Marke und Bestseller-Begriffe bleiben besetzt, auch gegen Wettbewerber." },
  { title: "Auf Profit steuern", body: "Gemessen am TACoS: was Werbung kostet, gemessen am gesamten Umsatz." },
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
    <Station label="Unser Vorgehen" tone="warm">
      <StationTitle>
        Organic First, <span className="em mark">PPC Second.</span>
      </StationTitle>
      <StationLead>
        Klickrate und Conversion bestimmen, wo Amazon euer Produkt zeigt. Deshalb kommt bei uns
        zuerst das Listing, dann die Kampagne.
      </StationLead>

      {/* Links die Kette Suche, Klick, Kauf als freigestellte Grafik, rechts
          der Verlauf, der sich beim Scrollen aufbaut. Vorher stand hier nur
          das fertige Bild, dadurch war an der Stelle keine Bewegung. */}
      <div className="mt-8 grid items-center gap-6 lg:grid-cols-[0.92fr_1fr] lg:gap-10">
        <motion.div {...auf(0.08)} className="relative min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bilder/n-organic.webp"
            alt="Drei Stufen, durch Pfeile verbunden: Suche, Klick, Kauf. Am Ende eine steigende Kurve."
            width={1600}
            height={896}
            loading="lazy"
            className="w-full"
          />
        </motion.div>
        <motion.div {...auf(0.14)} className="min-w-0">
          <Verlauf />
        </motion.div>
      </div>

      {/* Erster Block: kuehle Platte. Zweiter Block: Navy. Dazwischen das orange
          Ergebnisband als Scharnier. Drei verschiedene Werte, damit die
          Reihenfolge zu sehen ist. Vorher war es weiss, orange, weiss, dann
          sprang das Auge aufs Orange und die Folge ging verloren. */}
      <motion.div {...auf(0.05)} className="panel-cool mt-12 p-6 md:p-8">
        <div className="flex items-center gap-3.5">
          <span className="schritt schritt-navy">1</span>
          <div className="min-w-0">
            <div className="text-[1.05rem] font-extrabold leading-tight text-ink">Organic First</div>
            <div className="text-small text-ink-muted">Das Listing bringen wir auf Klickrate und Conversion.</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stufen.map((s, i) => (
            <div
              key={s.name}
              className={clsx(
                "relative rounded-[1.25rem] bg-white p-5 md:p-6",
                s.signal
                  ? "shadow-[inset_0_0_0_1.5px_rgba(255,153,0,0.5),0_1px_2px_rgba(13,36,57,0.05),0_14px_28px_-16px_rgba(13,36,57,0.2)]"
                  : "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(13,36,57,0.05),0_14px_28px_-18px_rgba(13,36,57,0.2)]"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="num text-[1.7rem] text-ink/20">{String(i + 1).padStart(2, "0")}</span>
                {s.signal && (
                  <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-navy">
                    Ranking-Signal
                  </span>
                )}
              </div>
              <div className="mt-2.5 text-[1.05rem] font-bold leading-snug text-ink">{s.name}</div>
              <div className="mt-1.5 text-small text-ink-muted">{s.meaning}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scharnier zwischen den beiden Bloecken. */}
      <motion.div
        {...auf(0.12)}
        className="relative mx-auto -mt-3 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full bg-brand-500 px-7 py-4 text-navy shadow-[0_14px_34px_-10px_rgba(255,153,0,0.7)]"
      >
        <span className="text-label font-bold uppercase">Ergebnis</span>
        <span className="text-center text-[1.05rem] font-extrabold leading-snug">
          Das Listing verkauft ohne Werbung.
        </span>
      </motion.div>

      <motion.div {...auf(0.05)} className="on-dark panel-navy -mt-3 p-6 md:p-8">
        <div className="flex items-center gap-3.5">
          <span className="schritt schritt-orange">2</span>
          <div className="min-w-0">
            <div className="text-[1.05rem] font-extrabold leading-tight text-white">PPC Second</div>
            <div className="text-small text-chalk-muted">Werbung skaliert erst, was schon konvertiert.</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {ppc.map((p) => (
            <div key={p.title} className="rounded-[1.25rem] bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_0_1px_rgba(255,255,255,0.07)] md:p-6">
              <span aria-hidden className="node-glow block" />
              <div className="mt-4 text-[1.05rem] font-bold leading-snug text-white">{p.title}</div>
              <div className="mt-1.5 text-small text-chalk-muted">{p.body}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Gegenüberstellung als zwei Karten. Die frühere Tabelle mit
          Durchstreichung war schwer zu lesen und trug pro Blick kaum etwas. */}
      <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
        <motion.div {...auf(0)} className="panel p-7 md:p-8">
          <span className="text-label font-bold uppercase text-ink-faint">Wie es meistens läuft</span>
          <ul className="mt-6 space-y-4">
            {gegenueber.map((r) => (
              <li key={r.alt} className="flex gap-3.5">
                <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink-faint">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-small leading-snug text-ink-faint">{r.alt}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          {...auf(0.1)}
          className="panel relative overflow-hidden p-7 md:p-8"
        >
          <span aria-hidden className="halo -right-20 -top-24 h-[18rem] w-[18rem] opacity-80" />
          <span className="relative text-label font-bold uppercase text-ink-soft">Wie temoa arbeitet</span>
          <ul className="relative mt-6 space-y-4">
            {gegenueber.map((r) => (
              <li key={r.neu} className="flex gap-3.5">
                <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-navy">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4.5 4.5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-small font-bold leading-snug text-ink">{r.neu}</span>
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

const leistungen: { icon: IconName; title: string; body: string; href: string }[] = [
  { icon: "kompass", title: "Strategie & Analyse", body: "Erst die Daten, dann der Plan.", href: "/leistungen/strategie" },
  { icon: "lupe", title: "Content & Listings", body: "Aus Klicks werden Käufe.", href: "/leistungen/listing-seo" },
  { icon: "ziel", title: "Advertising", body: "Profitabel skalieren.", href: "/leistungen/ppc-advertising" },
  { icon: "schild", title: "Account-Management", body: "Bestand, Buy-Box, Cases im Griff.", href: "/leistungen/account-management" },
  { icon: "globus", title: "Internationalisierung", body: "Lokalisieren statt übersetzen.", href: "/leistungen/internationalisierung" },
];

/**
 * Leistungen.
 *
 * Aufbau nach der Referenz mit der Nabe: links die fünf Bereiche als Karten,
 * rechts das Bild, das zeigt, dass sie an einer Stelle zusammenlaufen. Vorher
 * war es eine Liste zwischen Haarlinien.
 */
export function Leistungen() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: { duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] as const },
        };

  return (
    <Station label="Leistungen" tone="tint">
      <StationTitle>
        Fünf Leistungen, in der <span className="em mark">richtigen Reihenfolge.</span>
      </StationTitle>
      <StationLead>
        Jeder Bereich hat jemanden, der ihn hauptberuflich macht. Gesteuert wird alles aus einer
        Analyse.
      </StationLead>

      {/* Drei Spalten, zwei Zeilen. Fuenf Karten plus die Grafik in der sechsten
          Zelle: damit geht das Raster auf und Bild und Karten haben dieselbe
          Groesse. Vorher stand links eine hohe Kartenspalte neben einem
          quadratischen Bild, das passte nicht zusammen. */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {leistungen.map((l, i) => (
          <motion.div key={l.title} {...auf(i * 0.06)} className="h-full">
            <Karte icon={l.icon} title={l.title} body={l.body} href={l.href} />
          </motion.div>
        ))}

        {/* Die Grafik sitzt freigestellt in der Zelle, ohne Platte darunter. */}
        <motion.div {...auf(0.3)} className="relative flex items-center justify-center">
          <span aria-hidden className="halo left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bilder/n-leistungen.webp"
            alt="Fünf Bereiche liegen im Ring um eine gemeinsame Mitte und sind mit ihr verbunden."
            width={1408}
            height={1408}
            loading="lazy"
            className="relative w-full max-w-[19rem]"
          />
        </motion.div>
      </div>

      <a href="/full-service" className="btn-text mt-10">
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
        Fünf Marken, <span className="em text-brand-400">fünf Ausgangslagen.</span>
      </StationTitle>
      <StationLead tone="dark">Ausgangslage, Vorgehen, Ergebnis. Mit den Zahlen dahinter.</StationLead>

      {/* Die Fälle als Karten. Vorher waren es Zeilen zwischen Haarlinien:
          das Bild klein links, der Text daneben, viel Leerraum rechts. */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {cases.map((c, i) => {
          /* Fuenf Faelle gehen in zwei Spalten nicht auf, der letzte bliebe
             allein stehen. Der neueste Fall laeuft deshalb ueber die ganze
             Breite: Bild links, Text rechts. */
          const breit = i === 0;
          return (
          <a
            key={c.slug}
            href={`/ergebnisse/${c.slug}`}
            className={clsx(
              "panel-dark group overflow-hidden transition-transform duration-500 ease-temoa hover:-translate-y-1",
              breit ? "flex flex-col sm:col-span-2 md:flex-row" : "flex flex-col"
            )}
          >
            {/* Liegt kein Foto vor, steht statt eines leeren Kastens ein
                Farbfeld in der Akzentfarbe der Marke. */}
            <div
              className={clsx(
                "relative w-full overflow-hidden",
                breit ? "aspect-[16/9] md:aspect-auto md:w-[46%]" : "aspect-[16/9]"
              )}
              style={
                c.bgImage
                  ? undefined
                  : {
                      backgroundImage: `radial-gradient(120% 130% at 18% 0%, ${c.accent} 0%, ${c.accent}00 58%), radial-gradient(110% 120% at 100% 100%, ${c.accent}55 0%, transparent 60%), linear-gradient(155deg, #10314a 30%, #0a2035 100%)`,
                    }
              }
            >
              {c.bgImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.bgImage}
                  alt=""
                  loading={i === 0 ? undefined : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-temoa group-hover:scale-[1.05]"
                />
              )}
              {!c.bgImage && (
                <span className="absolute inset-0 flex items-center justify-center text-[3.5rem] font-extrabold leading-none text-white/25">
                  {c.mono}
                </span>
              )}
              <span
                aria-hidden
                className={clsx(
                  "absolute bg-gradient-to-t from-[#0d2439] to-transparent",
                  breit
                    ? "inset-x-0 bottom-0 h-24 md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-24 md:bg-gradient-to-l"
                    : "inset-x-0 bottom-0 h-24"
                )}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col p-6 md:p-7">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-label font-bold uppercase text-chalk-faint">
                <span>{c.industry}</span>
                <span aria-hidden>·</span>
                <span>{c.marketplaces.join(" ")}</span>
                <span aria-hidden>·</span>
                <span>{c.timeframe}</span>
              </div>
              <h3 className="mt-3 text-balance text-[1.15rem] font-bold leading-snug tracking-[-0.01em] text-white md:text-[1.3rem]">
                {c.headline}
              </h3>

              {/* Kennzahlen als eigene Kacheln. Die wichtigste steht gross und
                  allein, die beiden anderen daneben. Vorher waren alle drei
                  gleich klein, dann liest man keine. */}
              <div className="mt-auto grid gap-2.5 pt-5">
                {c.heroStats.slice(0, 1).map((s) => (
                  <div
                    key={s.label}
                    className="rounded-[1.1rem] bg-white/[0.08] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)]"
                  >
                    <ZahlText
                      text={s.value}
                      className="num block text-[clamp(2rem,1.4rem+1.6vw,2.6rem)] leading-none text-white"
                    />
                    <div className="mt-2 text-[0.78rem] font-bold leading-tight text-white/80">{s.label}</div>
                    {s.sublabel && (
                      <div className="mt-0.5 text-[0.7rem] leading-tight text-chalk-faint">{s.sublabel}</div>
                    )}
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2.5">
                  {c.heroStats.slice(1, 3).map((s) => (
                    <div
                      key={s.label}
                      className="rounded-[0.9rem] bg-white/[0.06] px-3.5 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
                    >
                      <ZahlText
                        text={s.value}
                        className="num block text-[1.35rem] leading-none text-white"
                      />
                      <div className="mt-1.5 text-[0.7rem] leading-tight text-chalk-faint">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-brand-400 transition-transform duration-300 group-hover:translate-x-1">
                Case Study lesen
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </a>
          );
        })}
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

/**
 * Designbeispiele.
 *
 * Das Layout folgt dem Aufbau eines echten Listings, nicht einem freien
 * Bildraster: links das Hauptbild gross, darunter die sechs weiteren Bilder in
 * zwei Spalten und drei Zeilen. Rechts der A+ Content, vertikal gestapelt,
 * jedes Modul selbst im Querformat.
 */
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

  const [haupt, ...weitere] = bildstrecke;

  return (
    <Station label="Designbeispiele" tone="paper">
      <StationTitle>
        So sieht <span className="em mark">Retail Ready</span> aus.
      </StationTitle>
      <StationLead>
        Ein komplettes Listing aus unserer Produktion: sieben Bilder und vier A+ Module. Produkt und
        Marke sind frei erfunden, die Arbeit ist echt.
      </StationLead>

      {/* Beide Spalten schliessen unten auf derselben Hoehe ab.
          Vorher war das ueber die Spaltenbreite geschaetzt, das konnte nie
          genau aufgehen. Jetzt bestimmt die Bildstrecke die Hoehe (ihre Bilder
          haben feste Seitenverhaeltnisse) und die letzte Platte der rechten
          Spalte fuellt den Rest. Die Breite ist so gesetzt, dass links immer
          etwas mehr Hoehe entsteht als rechts an Inhalt braucht. */}
      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[0.84fr_1fr] lg:gap-8">
        {/* Bildstrecke im Aufbau der Produktseite */}
        <div className="flex min-w-0 flex-col">
          <BereichsKopf label="Bildstrecke" note="1 Hauptbild + 6 Listingbilder" />

          <motion.figure {...auf(0)} className="listing-kachel m-0 mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={haupt.src} alt={haupt.alt} width={1024} height={1024} className="aspect-square w-full object-cover" />
            <Rolle text={haupt.rolle} />
          </motion.figure>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {weitere.map((b, i) => (
              <motion.figure key={b.src} {...auf(0.05 + i * 0.04)} className="listing-kachel m-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt} width={1024} height={1024} className="aspect-square w-full object-cover" />
                <Rolle text={b.rolle} />
              </motion.figure>
            ))}
          </div>
        </div>

        {/* A+ Content: vertikal gestapelt, jedes Modul im Querformat */}
        <div className="flex min-w-0 flex-col">
          <BereichsKopf label="A+ Content" note="4 Module, untereinander" />

          <div className="mt-4 flex flex-1 flex-col gap-3">
            <motion.div {...auf(0.05)} className="listing-kachel relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bilder/a-hero.webp" alt="" width={1600} height={608} className="aspect-[1600/608] w-full object-cover" />
              <div className="absolute inset-y-0 left-0 flex w-[58%] flex-col justify-center px-5 md:px-7">
                <p className="text-[clamp(0.9rem,0.5rem+0.9vw,1.3rem)] font-extrabold leading-tight text-navy">
                  24 Stunden kalt.
                  <br />
                  12 Stunden heiß.
                </p>
                <p className="mt-1.5 text-[0.72rem] leading-snug text-navy/70">Doppelwandig, vakuumisoliert</p>
              </div>
            </motion.div>

            {[
              { src: "/bilder/a-nutzen.webp", t: "Hält die Kälte", b: "Auch nach einem Tag im Rucksack.", w: 1024, h: 768, ar: "aspect-[4/3]" },
              { src: "/bilder/a-anwendung.webp", t: "Passt in den Alltag", b: "Schreibtisch, Küche, Tasche.", w: 1024, h: 768, ar: "aspect-[4/3]" },
            ].map((m, i) => (
              <motion.div key={m.src} {...auf(0.1 + i * 0.05)} className="listing-kachel flex items-stretch">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt="" width={m.w} height={m.h} className="w-[46%] shrink-0 object-cover" />
                <div className="flex min-w-0 flex-col justify-center px-4 py-3 md:px-5">
                  <p className="text-[0.9rem] font-bold leading-snug text-ink">{m.t}</p>
                  <p className="mt-1 text-[0.75rem] leading-snug text-ink-muted">{m.b}</p>
                </div>
              </motion.div>
            ))}

            <motion.div {...auf(0.2)} className="listing-kachel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bilder/a-vergleich.webp" alt="" width={1600} height={608} className="aspect-[1600/608] w-full object-cover" />
              <div className="flex items-baseline justify-between gap-3 px-4 py-3">
                <p className="text-[0.85rem] font-bold text-ink">Fünf Farben, eine Form</p>
                <p className="text-[0.7rem] text-ink-faint">Modul: Varianten</p>
              </div>
            </motion.div>

            {/* Die rechte Spalte war unten leer. Statt Luft steht dort, was an so
                einem Listing gearbeitet wird. */}
            {/* Diese Platte fuellt den Rest der Spalte, damit beide Spalten
                unten auf derselben Hoehe enden. */}
            <motion.div {...auf(0.26)} className="on-dark panel-navy flex flex-1 flex-col justify-center p-6 md:p-7">
              <div className="text-[1rem] font-extrabold leading-snug text-white">
                Was an diesem Listing gemacht wurde
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  ["7", "Bilder, jedes mit eigener Aufgabe"],
                  ["4", "A+ Module, aufeinander aufgebaut"],
                  ["1", "Bildsprache über alle Varianten"],
                ].map(([zahl, text]) => (
                  <div key={text} className="min-w-0">
                    <div className="num text-[1.9rem] text-brand-500">{zahl}</div>
                    <div className="mt-1.5 text-[0.75rem] leading-snug text-chalk-muted">{text}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-white/10 pt-4 text-[0.78rem] leading-relaxed text-chalk-muted">
                Titel, Bullets und Backend-Felder gehören dazu, sind hier aber nicht abgebildet: sie
                stehen im Text der Produktseite, nicht im Bild.
              </p>
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

/** Kopf eines der beiden Bereiche: Bezeichnung links, Umfang rechts. */
function BereichsKopf({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/[0.09] pb-2.5">
      <span className="text-label font-bold uppercase text-ink-soft">{label}</span>
      <span className="text-[0.7rem] text-ink-faint">{note}</span>
    </div>
  );
}

/** Rolle eines Listingbildes, unten in der Kachel. */
function Rolle({ text }: { text: string }) {
  return (
    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/75 to-transparent px-3 pb-2 pt-7">
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white">{text}</span>
    </figcaption>
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

      {/* Drei Spalten und kleinere Karten. Vorher standen sie in zwei Spalten
          mit grosser Schrift und wirkten aufdringlich. Als Wand gelesen tragen
          sie mehr, ohne sich vorzudraengen. */}
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {testimonials.map((t) => (
          <figure key={t.name} className="panel break-inside-avoid p-5">
            <div className="flex gap-0.5" aria-label="5 von 5 Sternen">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill="#FF9900" aria-hidden>
                  <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-3.5 text-pretty text-[0.86rem] leading-relaxed text-ink">
              „{t.quote}"
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5 border-t border-ink/[0.07] pt-3.5">
              <span
                className={clsx(
                  "relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full text-[0.7rem] font-bold text-ink",
                  // Logos brauchen weissen Grund und werden eingepasst, Portraits füllen den Kreis.
                  t.art === "logo" ? "bg-white p-1 ring-1 ring-inset ring-ink/[0.08]" : "bg-canvas-tint"
                )}
              >
                <span aria-hidden>{initials(t.name)}</span>
                {t.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.image}
                    alt=""
                    loading="lazy"
                    className={clsx(
                      "absolute inset-0 h-full w-full",
                      t.art === "logo" ? "scale-[0.72] object-contain" : "object-cover"
                    )}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.78rem] font-bold text-ink">{t.name}</span>
                <span className="block truncate text-[0.72rem] text-ink-faint">{t.role}</span>
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
          <div className="panel-dark p-7 md:p-8">
            {[
              ["Keine lange Laufzeit", "Ihr verlängert nach Performance, nicht nach Vertrag."],
              ["98 %", "unserer Marken verlängern die Zusammenarbeit."],
              ["Kostenlos", "Die Analyse selbst kostet euch nichts außer der Zeit."],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 border-t border-white/10 py-4 first:border-t-0 first:pt-0 last:pb-0">
                <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <p className="text-small text-chalk-muted">
                  <ZahlText text={k} className="font-bold text-white" /> {v}
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

/**
 * Die drei Aufnahmen ueber den Portraits. Reihenfolge: Gruppe, Paar,
 * Arbeitsplatz. Vorher stand in der Mitte ein einzelnes Portrait zwischen zwei
 * Gruppenbildern und las sich als versprengter Kopf.
 */
const candids = ["/team/Main.webp", "/team/DSCF2526.webp", "/team/DSCF2749.webp"];

/**
 * Das Team, wie es der Kunde zugeordnet hat.
 *
 * Zwei Ebenen, weil sie zwei verschiedene Dinge sagen: die drei Gruender
 * stehen fuer die Zusammenarbeit selbst und sind die Ansprechpartner, die
 * neun im Team stehen fuer die Bereiche, die im Haus liegen. Ein Raster aus
 * zwoelf gleichen Kacheln haette diesen Unterschied verschluckt.
 *
 * `linkedin` fehlt noch. Erfundene Profil-Adressen wuerden ins Nichts oder auf
 * fremde Profile fuehren, deshalb faellt das Symbol weg, solange die Adresse
 * nicht vorliegt.
 */
type Person = { src: string; name: string; rolle: string; linkedin?: string };

const gruender: Person[] = [
  { src: "/team/Clemens.webp", name: "Clemens", rolle: "Founder & Sales" },
  { src: "/team/Christoph.webp", name: "Christoph", rolle: "Founder & Client Success" },
  { src: "/team/Eddie.webp", name: "Eddie", rolle: "Founder & Operations" },
];

const members: Person[] = [
  { src: "/team/Ole.webp", name: "Ole", rolle: "Content Manager" },
  { src: "/team/Jonas.webp", name: "Jonas", rolle: "Content Manager" },
  { src: "/team/Marvin.webp", name: "Marvin", rolle: "Marketplace Consultant" },
  { src: "/team/Anzelika.webp", name: "Anzelika", rolle: "Marketplace Consultant" },
  { src: "/team/Vadim.webp", name: "Vadim", rolle: "Graphic Designer" },
  { src: "/team/Marina.webp", name: "Marina", rolle: "Graphic Designer" },
  { src: "/team/Dias.webp", name: "Dias", rolle: "3D Artist" },
  { src: "/team/Burak.webp", name: "Burak", rolle: "Marketplace Growth Associate" },
  { src: "/team/Noor.webp", name: "Noor", rolle: "Marketplace Growth Associate" },
];

/** Die Bereiche, die im Haus liegen. Deckungsgleich mit den Leistungen. */
const imHaus = [
  "Strategie & Analyse",
  "Content & Listings",
  "Advertising",
  "Account-Management",
  "Internationalisierung",
];

/** LinkedIn-Symbol. Nur gezeichnet, wenn eine Adresse vorliegt. */
function LinkedIn({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} auf LinkedIn`}
      className="grid h-9 w-9 place-items-center rounded-[0.7rem] bg-canvas-tint text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-white"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.1 8.65 22 10.9 22 14v7h-4v-6.2c0-1.5-.03-3.4-2.1-3.4-2.05 0-2.36 1.6-2.36 3.3V21h-3.9z" />
      </svg>
    </a>
  );
}

/**
 * Team.
 *
 * Vorher: Portraits in Schwarzweiss, darunter nur der Vorname, und am Ende ein
 * Satz („Menschen, kein Tool ...") der frei auf der Flaeche lag und nichts
 * trug. Der Satz ist geloescht.
 *
 * Jetzt zwei Ebenen. Die drei Gruender gross, mit rundem Portrait, Rolle und
 * Platz fuer LinkedIn: sie sind die Ansprechpartner. Darunter das Team in
 * neun Karten mit Rolle. Ein Raster aus zwoelf gleichen Kacheln hat den
 * Unterschied verschluckt und ohne Rollen stand dort nur ein Vorname.
 */
export function Mannschaft() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: { duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] as const },
        };

  return (
    <Station label="Team" tone="warm" id="team">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-14">
        <div className="min-w-0">
          <StationTitle>Das Team hinter temoa.</StationTitle>
          <StationLead>
            Kein Konto liegt bei einer Person. An eurem Sortiment arbeiten mehrere gleichzeitig,
            jeder in seinem Bereich, mit denselben Zahlen vor sich.
          </StationLead>
        </div>

        {/* Die Bereiche, die nicht eingekauft werden. */}
        <motion.div {...auf(0.06)} className="panel p-6 md:p-7">
          <span className="text-label font-bold uppercase text-ink-soft">Alles im Haus</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {imHaus.map((b) => (
              <span
                key={b}
                className="rounded-full bg-canvas-tint px-3 py-1.5 text-[0.75rem] font-bold text-ink shadow-[inset_0_0_0_1px_rgba(13,36,57,0.06)]"
              >
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Drei Teamszenen, in Farbe. Schwarzweiss wirkte trist. */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {candids.slice(0, 3).map((src, i) => (
          <motion.div
            key={src}
            {...auf(i * 0.06)}
            className="overflow-hidden rounded-[1.25rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_20px_38px_-22px_rgba(13,36,57,0.34)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Die drei Gruender. Rundes Portrait, damit sie sich von den
          quadratischen Team-Karten unterscheiden. */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {gruender.map((g, i) => (
          <motion.div
            key={g.src}
            {...auf(0.04 + i * 0.05)}
            className="panel panel-lift flex flex-col items-center px-6 py-7 text-center"
          >
            <span className="relative">
              <span aria-hidden className="halo -left-3 -top-3 h-[7.5rem] w-[7.5rem] opacity-70" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.src}
                alt={g.name}
                loading="lazy"
                className="relative h-[5.5rem] w-[5.5rem] rounded-full object-cover shadow-[0_1px_2px_rgba(13,36,57,0.06),0_14px_28px_-14px_rgba(13,36,57,0.4)]"
              />
            </span>
            <p className="mt-5 text-[1.35rem] font-extrabold leading-tight tracking-tight text-ink">{g.name}</p>
            <p className="mt-1.5 text-small text-ink-muted">{g.rolle}</p>
            {g.linkedin && (
              <div className="mt-5">
                <LinkedIn href={g.linkedin} name={g.name} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Das Team. Die Karte hebt sich beim Zeigen an, Name und Rolle bleiben lesbar. */}
      <motion.p {...auf(0.06)} className="mt-10 flex items-center gap-2.5">
        <span aria-hidden className="node-glow" />
        <span className="text-label font-bold uppercase text-ink-soft">Team</span>
      </motion.p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {members.map((m, i) => (
          <motion.div key={m.src} {...auf(0.04 + i * 0.025)} className="panel panel-lift overflow-hidden p-3">
            <div className="overflow-hidden rounded-[0.85rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={m.name} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
            <p className="mt-3 px-0.5 text-[0.85rem] font-bold leading-tight text-ink">{m.name}</p>
            <p className="mt-1 px-0.5 text-[0.72rem] leading-snug text-ink-faint">{m.rolle}</p>
          </motion.div>
        ))}
      </div>

      {/* Hier standen noch einmal 60+, 5+ und 98 %. Dieselben drei Zahlen
          stehen schon im Kopf der Seite, im Kundenband und im Abschluss.
          Viermal dieselbe Zahl auf einer Seite ueberzeugt nicht, sie nutzt
          sich ab. */}
    </Station>
  );
}

/* ============================================================
   09 · Wissen
   ============================================================ */

export function Wissen({ posts }: { posts: PostMeta[] }) {
  /* Vorher eine Liste zwischen Haarlinien, genau die Form, die dieses Theme
     ueberall sonst abgeloest hat: Nummer, Titel, Pfeil, auf weissem Grund.
     Jetzt drei Karten mit dem Titelbild des Beitrags. */
  return (
    <Station label="Blog" tone="paper">
      <StationTitle>Klartext zu Amazon.</StationTitle>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {posts.slice(0, 3).map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="panel panel-lift group flex h-full flex-col overflow-hidden"
          >
            <BlogCover
              accent={p.accent}
              icon={p.categoryIcon}
              seed={p.slug}
              label={p.categoryShort}
              image={p.image}
              className="aspect-[16/10] w-full"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-balance text-[1.05rem] font-bold leading-snug text-ink md:text-[1.15rem]">
                {p.title}
              </h3>
              <p className="mt-2.5 line-clamp-2 text-small leading-relaxed text-ink-muted">{p.description}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8rem] font-bold text-navy transition-transform duration-300 group-hover:translate-x-1">
                Lesen
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>

      <a href="/blog" className="btn-text mt-10">
        Alle Beiträge
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </Station>
  );
}

