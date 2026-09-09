"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { Station, StationTitle, StationLead, Karte, Eyebrow } from "./Station";
import { Icon, type IconName } from "./Icons";
import { Verlauf } from "./Verlauf";
import { Gespraech } from "./Gespraech";
import { Stempel } from "./Stempel";
import { Zahl, ZahlText } from "./Zahl";
import { cases } from "@/lib/cases";
import { Markenlogo } from "../ui/Markenlogo";
import { testimonials, initials } from "@/lib/testimonials";

/* ============================================================
   Kundenband. Zwei dünne Bänder von vorher zu einem verschmolzen:
   Logos und die beiden verbliebenen Kennzahlen.
   ============================================================ */

/* Alle vierzehn Logos stehen als weisse Silhouetten auf dem Navy. Zwoelf sind
   dunkle Schriftzuege auf transparentem Grund, bei denen `brightness-0 invert`
   genau das ergibt.

   Zwei sind „Knockout": der Schriftzug steht weiss in einer gefuellten
   farbigen Flaeche (Kijimea in einem Rechteck, Nicotinell in einer Ellipse).
   Dasselbe Rezept macht daraus einen weissen Klecks, und in ihrer eigenen
   Farbe stehen zu lassen ist auch keine Loesung: dann sind zwei von vierzehn
   blau. `scripts/logos-knockout.mjs` dreht sie um, die Helligkeit wird zur
   Deckkraft, und liefert `1-weiss.webp` und `2-weiss.webp`. Die kommen fertig
   weiss aus der Datei und brauchen keinen Filter. */
const KNOCKOUT = new Set([1, 2]);
const logos = Array.from({ length: 14 }, (_, i) => {
  const n = i + 1;
  const knockout = KNOCKOUT.has(n);
  return { src: `/clients/${knockout ? `${n}-weiss` : n}.webp`, knockout };
});
const logoRows = [logos.slice(0, 7), logos.slice(7, 14)];

type Logo = (typeof logos)[number];

function LogoRow({ row, duration, reverse }: { row: Logo[]; duration: number; reverse?: boolean }) {
  /* Die Kanten laufen ueber eine Maske aus, nicht ueber zwei Verlaufsflaechen
     in der Farbe des Grundes. Der Grund ist ein Verlauf: eine einzelne Farbe
     daruebergelegt trifft ihn nie genau und zeichnet eine Kante. */
  const maske =
    "linear-gradient(to right, transparent 0, #000 4rem, #000 calc(100% - 4rem), transparent 100%)";
  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: maske, WebkitMaskImage: maske }}
    >
      <div
        className="flex w-max animate-marquee items-center gap-14 md:gap-20"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...row, ...row].map((l, i) => (
          <div
            key={`${l.src}-${i}`}
            className={clsx(
              "relative h-9 w-28 shrink-0 transition duration-300 hover:opacity-100 md:h-10 md:w-32",
              l.knockout ? "opacity-70" : "opacity-70 brightness-0 invert"
            )}
          >
            <Image src={l.src} alt="" fill sizes="128px" className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Kundenband.
 *
 * Vier Fassungen: eine weisse Bahn zwischen zwei Haarlinien, dann eine weisse
 * Platte auf getoentem Grund, dann derselbe helle Ton wie der Hero darueber.
 * Der letzte Fehler war der schwerste: Hero und Kundenband gingen ineinander
 * ueber, der Hero hatte damit keine Unterkante. Jetzt traegt das Band Navy.
 * Damit endet der Hero sichtbar, und die Logos stehen als weisse Silhouetten
 * darauf, alle vierzehn im selben Ton.
 *
 * Rot waere der noch staerkere Kontrast, ist hier aber falsch: Rot ist auf
 * dieser Website die Farbe fuer Probleme, und das hier sind die Kunden.
 */
export function Kundenband() {
  return (
    <section className="on-dark ground-deep relative overflow-hidden">
      {/* Feine Lichtkante oben, damit die Sektion nicht wie ein
          abgeschnittener Block unter dem Hero sitzt. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,153,0,0.55) 30%, rgba(255,153,0,0.55) 70%, transparent)",
        }}
      />
      <div className="container-x py-12 md:py-14">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="inline-flex items-center gap-2.5">
            <span aria-hidden className="node-glow" />
            <span className="text-label font-bold uppercase text-chalk-muted">
              Täglich in unserer Verantwortung
            </span>
          </span>
          <span className="text-small font-bold text-white">
            <Zahl bis={60} nach="+" /> Marken
          </span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-white/30" />
          <span className="text-small font-bold text-white">
            <Zahl bis={5} nach="+" /> Marktplätze
          </span>
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
    ({
          initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] as const },
        });

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
    ({
          initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] as const },
        });

  return (
    <Station label="Unser Vorgehen" tone="warm">
      {/* Ueberschrift und Einleitung links, das Diagramm rechts daneben.
          Vorher stand die Ueberschrift ueber die ganze Breite, darunter ein
          zweiter Block „Was sich verschiebt" mit drei Zeilen Text, und erst
          rechts daneben das Diagramm. Das war ein Absatz zu viel: das
          Diagramm sagt dasselbe, und zwar in einem Blick. */}
      <div className="grid items-center gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div className="min-w-0">
          <StationTitle className="!max-w-none">
            Organic First,
            <br />
            <span className="em mark">PPC Second.</span>
          </StationTitle>
          <p className="mt-6 max-w-[30ch] text-pretty text-lead text-ink-muted">
            Klickrate und Conversion bestimmen, wo Amazon euer Produkt zeigt. Deshalb kommt zuerst
            das Listing, dann die Kampagne.
          </p>
        </div>
        <motion.div {...auf(0.12)}>
          <Verlauf />
        </motion.div>
      </div>

      {/* Erster Block: kuehle Platte. Zweiter Block: Navy. Dazwischen das
          Ergebnisband als Scharnier. Drei verschiedene Werte, damit die
          Reihenfolge zu sehen ist. */}
      <motion.div {...auf(0.05)} className="panel-cool mt-14 p-6 md:p-8">
        <div className="grid gap-7 md:grid-cols-[1.12fr_0.88fr] md:items-center md:gap-10">
          <div className="min-w-0">
            <div className="flex items-center gap-3.5">
              <span className="schritt schritt-navy">1</span>
              <div className="min-w-0">
                <div className="text-[1.05rem] font-extrabold leading-tight text-ink">Organic First</div>
                <div className="text-small text-ink-muted">Das Listing bringen wir auf Klickrate und Conversion.</div>
              </div>
            </div>

            {/* Die drei Stufen stehen untereinander statt nebeneinander: so
                bleibt rechts Platz fuer das Bild in einer Groesse, in der man
                es auch sieht. */}
            <div className="mt-6 space-y-3">
              {stufen.map((s, i) => (
                <div
                  key={s.name}
                  className={clsx(
                    "flex items-start gap-4 rounded-[1.1rem] bg-white p-4 md:p-5",
                    s.signal
                      ? "shadow-[inset_0_0_0_1.5px_rgba(255,153,0,0.5),0_1px_2px_rgba(13,36,57,0.05),0_14px_28px_-16px_rgba(13,36,57,0.2)]"
                      : "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(13,36,57,0.05),0_14px_28px_-18px_rgba(13,36,57,0.2)]"
                  )}
                >
                  <span className="num shrink-0 text-[1.5rem] leading-none text-ink/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[1.02rem] font-bold leading-snug text-ink">{s.name}</span>
                      {s.signal && (
                        <span className="rounded-full bg-navy px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-brand-400">
                          Ranking-Signal
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-small text-ink-muted">{s.meaning}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Das Bild stand vorher klein in der Ecke neben der Ueberschrift.
              Jetzt traegt es eine eigene Spalte. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/bilder/n-organic.webp"
            alt="Drei Stufen, durch Pfeile verbunden: Suche, Klick, Kauf."
            width={1600}
            height={896}
            loading="lazy"
            className="mx-auto w-full max-w-[28rem] md:max-w-none"
            animate={reduce ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Das Scharnier zwischen den beiden Bloecken.

          Vier Fassungen: Orange mit dunkler Schrift, dann eine Navy-Pille auf
          der Navy-Platte (unsichtbar), dann Weiss mit orangem Ring. Weiss war
          zu leise: die Platte darueber ist hell und der Grund ist hell, ein
          weisses Band dazwischen ist nur eine weitere helle Flaeche.

          Jetzt gruen. Das ist auf dieser Website die Farbe fuer Ergebnisse,
          und genau das steht darauf. Weisse Schrift auf dem tiefen Gruen kommt
          auf 5,4:1, ein oranger Ring waere hier eine dritte Farbe und ist
          deshalb weg. */}
      <motion.div
        {...auf(0.12)}
        className="relative z-10 mx-auto -mt-5 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full px-8 py-4"
        style={{
          background: "linear-gradient(135deg, #17A55B 0%, #0B6B3C 100%)",
          boxShadow:
            "inset 0 0 0 1.5px rgba(180,255,213,0.5), 0 0 0 6px rgba(22,163,74,0.16), 0 22px 44px -16px rgba(11,107,60,0.75)",
        }}
      >
        <span className="inline-flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-white"
            style={{ boxShadow: "0 0 0 4px rgba(255,255,255,0.22)" }}
          />
          <span className="text-label font-bold uppercase text-white/80">Ergebnis</span>
        </span>
        <span className="text-center text-[1.05rem] font-extrabold leading-snug text-white md:text-[1.15rem]">
          Das Listing verkauft ohne Werbung.
        </span>
      </motion.div>

      <motion.div {...auf(0.05)} className="on-dark panel-navy relative -mt-4 p-6 pt-9 md:p-8 md:pt-11">
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

      {/* Gegenueberstellung als zwei Karten.

          Vorher standen die beiden Karten ohne Ueberschrift unter der
          Navy-Platte und gingen unter: zwei weisse Flaechen auf hellem Grund,
          ohne Ansage, worum es geht. Jetzt tragen sie eine eigene Zeile
          darueber, und die rechte Karte ist die betonte: oranger Lichtsaum,
          kraeftigerer Schatten, dunkle Schrift.

          Die Haken waren orange auf Navy in einem Kreis von 20 Pixeln. In der
          Groesse ist ein oranges Zeichen auf dunklem Grund nur ein Fleck. Jetzt
          traegt der Kreis Navy und der Haken Weiss, das ist auch klein noch
          eindeutig. */}
      {/* Die Gegenueberstellung stand mit `mt-16` direkt unter der
          Navy-Platte und las sich als deren Fortsetzung. Jetzt liegt ein
          deutlicher Abstand dazwischen, und die beiden Karten sind nicht mehr
          gleich gebaut: links eine eingelassene Flaeche ohne Schatten, rechts
          eine weisse Platte, die aufliegt. Der Unterschied ist damit auch ohne
          Lesen zu sehen. */}
      <div className="mt-24 md:mt-28">
        <motion.div {...auf(0)} className="mx-auto max-w-[44ch] text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_20px_-14px_rgba(13,36,57,0.3)]">
            <span aria-hidden className="node-glow" />
            <span className="text-label font-bold uppercase text-ink-soft">Der Unterschied</span>
          </span>
          <h3 className="title mt-5 text-[1.5rem] text-ink md:text-[1.9rem]">
            Vier Punkte, an denen sich die Arbeit trennt.
          </h3>
        </motion.div>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_1.08fr] lg:gap-5">
          {/* Links: eingelassen. Kein Weiss, kein Schatten, gestrichelte
              Kante. Das Uebliche liegt unter der Oberflaeche. */}
          <motion.div
            {...auf(0.06)}
            className="flex flex-col rounded-[1.6rem] border border-dashed border-ink/[0.18] bg-ink/[0.035] p-5 sm:p-7 md:p-8"
          >
            <span className="text-label font-bold uppercase text-ink-faint">Wie es meistens läuft</span>
            <ul className="mt-6 space-y-4">
              {gegenueber.map((r) => (
                <li key={r.alt} className="flex gap-3.5">
                  <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/[0.08] text-ink-faint">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="text-small leading-snug text-ink-faint">{r.alt}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Rechts: liegt auf. Weiss, oranger Saum, kraeftiger Schatten, und
              die Zeilen stehen fett. */}
          <motion.div
            {...auf(0.12)}
            className="panel relative flex flex-col overflow-hidden p-7 shadow-[inset_0_0_0_1.5px_rgba(255,153,0,0.6),0_1px_2px_rgba(13,36,57,0.05),0_34px_60px_-26px_rgba(13,36,57,0.42)] md:p-9"
          >
            <span aria-hidden className="halo -right-20 -top-24 h-[18rem] w-[18rem] opacity-80" />
            <span className="relative inline-flex w-fit items-center rounded-full bg-navy px-3.5 py-1.5 text-label font-bold uppercase tracking-[0.12em] text-white">
              Wie temoa arbeitet
            </span>
            <ul className="relative mt-6 space-y-4">
              {gegenueber.map((r) => (
                <li key={r.neu} className="flex gap-3.5">
                  <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-white">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4.5 4.5L19 7" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-small font-bold leading-snug text-ink">{r.neu}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Station>
  );
}

/* ============================================================
   03 · Leistungen
   ============================================================ */

const leistungen: { icon: IconName; title: string; body: string; href: string }[] = [
  { icon: "kompass", title: "Strategie", body: "Erst die Daten, dann der Plan.", href: "/leistungen/strategie" },
  { icon: "lupe", title: "Produktbilder & SEO", body: "Aus Klicks werden Käufe.", href: "/leistungen/listing-seo" },
  { icon: "ziel", title: "PPC Advertising", body: "Profitabel skalieren.", href: "/leistungen/ppc-advertising" },
  { icon: "schild", title: "Account Management", body: "Bestand, Buy-Box, Cases im Griff.", href: "/leistungen/account-management" },
  { icon: "globus", title: "Internationalisierung", body: "Lokalisieren statt übersetzen.", href: "/leistungen/internationalisierung" },
];

/**
 * Leistungen.
 *
 * Vorher fuenf weisse Karten in einem Raster, die aussahen wie jede andere
 * Kartenreihe der Seite. Der Kunde hat gesagt, die fuenf Bereiche gehen unter,
 * obwohl sie das Angebot sind. Zwei Sachen sind deshalb anders: die Karten
 * sind dunkel, fuenf Navy-Platten auf hellem Grund sind ein Block, den man
 * nicht ueberliest, und die Sektion steht jetzt an erster Stelle nach dem
 * Kundenband. Wer auf der Seite landet, liest zuerst, was wir machen, und
 * nicht, was bei ihm schiefliegt.
 */
export function Leistungen() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    ({
          initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] as const },
        });

  return (
    <Station label="Leistungen" tone="tint">
      <StationTitle>
        Fünf Leistungen, in der <span className="em mark">richtigen Reihenfolge.</span>
      </StationTitle>
      {/* Ohne Unterzeile. „Jeder Bereich hat jemanden, der ihn hauptberuflich
          macht" stand hier und sagte nichts, was die fuenf Karten darunter
          nicht schon sagen. */}

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {leistungen.map((l, i) => (
          <motion.a
            key={l.title}
            {...auf(i * 0.06)}
            href={l.href}
            className="panel-navy on-dark group relative flex h-full flex-col overflow-hidden p-5 transition-transform duration-500 ease-temoa hover:-translate-y-1 md:p-8"
          >
            {/* Der Lichthof zieht beim Zeigen an, damit die Karte reagiert,
                ohne dass sich das Layout bewegt. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full opacity-60 blur-[50px] transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(circle, rgba(255,153,0,0.5), transparent 70%)" }}
            />
            {/* Die Ziffer steht in beiden Fassungen oben rechts, deshalb
                absolut und nicht in der Reihe neben der Kachel. */}
            <span
              aria-hidden
              className="num absolute right-5 top-4 text-[1.4rem] leading-none text-white/20 md:right-8 md:top-7 md:text-[1.6rem]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* Auf dem Telefon steht das Symbol neben dem Text. Gestapelt
                war jede der fuenf Karten rund 265 Pixel hoch, zusammen mehr
                als anderthalb Bildschirme fuer fuenf Zeilen Inhalt. */}
            <div className="relative flex items-start gap-4 md:block">
              <span className="tile-dark shrink-0">
                <Icon name={l.icon} className="h-8 w-8" />
              </span>
              <div className="min-w-0 flex-1 md:mt-6">
                <div className="pr-9 text-[1.1rem] font-bold leading-snug tracking-[-0.015em] text-white md:pr-10 md:text-[1.4rem]">
                  {l.title}
                </div>
                <div className="mt-2 text-small leading-relaxed text-chalk-muted md:mt-2.5">{l.body}</div>
              </div>
            </div>
            <span className="relative mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-brand-400 transition-transform duration-300 group-hover:translate-x-1 md:mt-auto md:pt-6">
              Mehr dazu
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.a>
        ))}

        {/* Die Grafik sitzt freigestellt in der sechsten Zelle, ohne Platte. */}
        <motion.div {...auf(0.3)} className="relative flex items-center justify-center">
          <span aria-hidden className="halo left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bilder/n-leistungen.webp"
            alt="Fünf Bereiche liegen im Ring um eine gemeinsame Mitte und sind mit ihr verbunden."
            width={1408}
            height={1408}
            loading="lazy"
            className="relative w-full max-w-[14rem] sm:max-w-[19rem]"
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

/**
 * Gruener Trendpfeil neben einer Kennzahl.
 *
 * `runter` heisst: der Wert soll sinken. Eine gefallene ACoS ist ein gutes
 * Ergebnis, deshalb bleibt der Pfeil auch dann gruen, er zeigt nur nach unten.
 */
function TrendPfeil({ runter = false, klein = false }: { runter?: boolean; klein?: boolean }) {
  return (
    <span
      aria-hidden
      className={clsx(
        "grid shrink-0 place-items-center rounded-[0.6rem]",
        klein ? "h-6 w-6" : "h-7 w-7"
      )}
      style={{ background: "rgba(34,197,94,0.22)", color: "#6EE7A0" }}
    >
      <svg width={klein ? 13 : 15} height={klein ? 13 : 15} viewBox="0 0 24 24" fill="none">
        <path
          d={runter ? "M18 6L6 18m0 0h7m-7 0v-7" : "M6 18L18 6m0 0h-7m7 0v7"}
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Case Studies.
 *
 * Drei Fassungen. Erst Zeilen zwischen Haarlinien mit einem kleinen Bild
 * links. Dann fuenf grosse Karten in zwei Spalten, eine davon ueber die volle
 * Breite: die Sektion war damit ueber zweitausend Pixel hoch und der Besucher
 * scrollte an fuenf fast gleichen Kacheln vorbei.
 *
 * Jetzt ein Band: fuenf Streifen, die sich die Breite teilen. Wer mit der Maus
 * ueber einen faehrt, bekommt ihn breiter, die anderen weichen zurueck, und im
 * breiten Streifen kommt die Ueberschrift des Falls dazu. Ohne Maus sind alle
 * gleich. Auf dem Telefon stehen sie untereinander, dort gibt es kein Hover
 * und der Text steht ohnehin sichtbar.
 *
 * Bewegt wird `flex-grow`. Eine Breite in Prozent zu animieren rechnet der
 * Browser gegen die Elternbreite, dadurch springen die Nachbarn; `flex-grow`
 * verteilt den Platz und alle fuenf laufen gemeinsam.
 */
export function Nachweis() {
  const reduce = useReducedMotion();

  return (
    <Station label="Case Studies" tone="dark" id="nachweis">
      {/* „Fuenf Marken, fuenf Ausgangslagen" sagte nichts: es zaehlte, was
          darunter ohnehin steht. Die Ueberschrift traegt jetzt die Aussage,
          auf die es ankommt, und die Unterzeile entfaellt. */}
      <StationTitle>
        Jede Zahl kommt aus einem <span className="em text-brand-400">Konto, das wir betreuen.</span>
      </StationTitle>

      <div className="mt-12 flex flex-col gap-4 md:h-[27rem] md:flex-row md:gap-3">
        {cases.map((c, i) => (
          <motion.a
            key={c.slug}
            href={`/ergebnisse/${c.slug}`}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
            /* Der Rahmen liegt als `outline` mit negativem Versatz innen und
                 folgt damit der Rundung sauber. Er ist immer da, nur die Farbe
                 wechselt: das erspart die hellen Ecken, die entstehen, wenn
                 erst beim Zeigen ein Ring dazukommt. Zwei Pixel, sonst sieht er
                 nach Zufall aus.

                 Die Breite laeuft ueber 700 ms mit einer weichen Kurve, damit
                 das Auseinandergehen nicht springt. */
            style={{ backgroundColor: "#08192b" }}
            className="group relative block overflow-hidden rounded-[1.4rem] shadow-[0_24px_50px_-30px_rgba(4,16,28,0.9)] transition-[flex-grow,box-shadow] duration-700 ease-[cubic-bezier(0.22,0.61,0.24,1)] md:min-w-0 md:basis-0 md:grow md:hover:grow-[2.6] md:hover:shadow-[0_30px_60px_-28px_rgba(4,16,28,1)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.bgImage}
              alt=""
              loading={i < 2 ? undefined : "lazy"}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.24,1)] group-hover:scale-[1.05]"
            />
            {/* Zwei Schichten: der Farbschimmer der Marke oben, darunter der
                Verlauf, der die Schrift traegt. Ohne den Verlauf steht weisse
                Schrift auf hellen Fotos. */}
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ background: `radial-gradient(120% 80% at 50% 0%, ${c.accent}55, transparent 62%)` }}
            />
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(6,22,36,0.94) 0%, rgba(6,22,36,0.88) 28%, rgba(6,22,36,0.58) 58%, rgba(6,22,36,0.2) 82%, rgba(6,22,36,0.08) 100%)",
              }}
            />

            <div className="relative flex h-full min-h-[15rem] flex-col justify-end p-5">
              {/* Das Logo der Marke, auf einer weissen Kachel: die Logos sind
                  dunkel und wuerden auf dem abgedunkelten Foto verschwinden.
                  Wo keins vorliegt (anonymisierte Marke), steht der Name. */}
              {c.logo ? (
                <Markenlogo logo={c.logo} name={c.displayName} auf="dunkel" className="h-11 w-28" />
              ) : (
                <span className="truncate text-label font-bold uppercase tracking-[0.12em] text-white/55">
                  {c.displayName}
                </span>
              )}

              <span className="mt-2 flex items-center gap-2">
                {/* `whitespace-nowrap` und eine kleinere Groesse: im schmalen
                    Streifen brach „+37,3 %" sonst hinter dem Komma um und das
                    Prozentzeichen stand allein in der zweiten Zeile. */}
                <ZahlText
                  text={c.preview.value}
                  className="num block whitespace-nowrap text-[1.65rem] leading-none text-[#6EE7A0] md:text-[1.8rem]"
                />
                <TrendPfeil runter={c.preview.trend === "down"} klein />
              </span>
              <span className="mt-2 block text-[0.82rem] font-bold leading-tight text-white">
                {c.preview.label}
              </span>

              {/* Die Ueberschrift des Falls kommt im breiten Streifen dazu.
                  Auf dem Telefon steht sie immer da. */}
              <span className="mt-3 block overflow-hidden text-small leading-snug text-white/75 transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.24,1)] md:max-h-0 md:opacity-0 md:group-hover:max-h-28 md:group-hover:opacity-100">
                {c.headline}
              </span>

              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-bold text-brand-400 transition-transform duration-300 group-hover:translate-x-1">
                Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            {/* Der Rahmen liegt als eigene Ebene ueber den Bildern. Als
                `outline` am Streifen selbst waere er unter dem Foto und damit
                unsichtbar. Er ist immer da, nur die Farbe wechselt: sonst
                blitzen beim Zeigen die Ecken auf. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 rounded-[1.4rem] border-2 border-white/[0.12] transition-colors duration-700 ease-[cubic-bezier(0.22,0.61,0.24,1)] group-hover:border-[#FF9900]"
            />
          </motion.a>
        ))}
      </div>

      <a href="/ergebnisse" className="btn-text-hell mt-10">
        Alle Case Studies ansehen
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </Station>
  );
}

/* ============================================================
   05 · Arbeiten (Designbeispiele)
   ============================================================ */

/* Ein komplettes Listing aus der Produktion fuer Miganeo: sieben Bilder und
   sechs Module Premium A+ Content. Bis hierher stand an dieser Stelle ein
   erfundenes Produkt, weil noch keine freigegebene Arbeit vorlag. Jetzt liegt
   sie vor, und dann hat ein erfundenes Beispiel hier nichts mehr zu suchen.

   Die Bilder tragen ihre Beschriftung selbst: sie sind so an Amazon
   ausgeliefert worden. Die Regel, dass Schrift nie ins Bild gehoert, gilt fuer
   erzeugte Grafiken, nicht fuer ausgelieferte Arbeit. */
const bildstrecke = [
  { src: "/bilder/miganeo/l-1.webp", alt: "Hauptbild: die Poolabdeckung freigestellt, gefaltet und ausgelegt" },
  { src: "/bilder/miganeo/l-2.webp", alt: "Bis zu 8 Grad wärmeres Wasser, Pool zur Hälfte abgedeckt" },
  { src: "/bilder/miganeo/l-3.webp", alt: "Die Wärme im Pool behalten, Durchmesser 457 Zentimeter" },
  { src: "/bilder/miganeo/l-4.webp", alt: "Handhabung in vier Schritten" },
  { src: "/bilder/miganeo/l-5.webp", alt: "Bis zu 70 Prozent weniger Heizkosten" },
  { src: "/bilder/miganeo/l-6.webp", alt: "Hält groben Schmutz vom Wasser fern" },
  { src: "/bilder/miganeo/l-7.webp", alt: "Familie am Pool, Abdeckung wird abgezogen" },
];

/* Die sechs Module des Premium A+ Contents. Sie sitzen ohne Abstand
   untereinander in einer Kachel: auf der Produktseite laufen sie ebenfalls
   nahtlos ineinander, und mit Luft dazwischen fielen der Kopf und das erste
   Bild auseinander. */
const aplus = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `/bilder/miganeo/a-${n}.webp`,
  alt: `Premium A+ Modul ${n} von 6`,
}));

/**
 * Designbeispiele.
 *
 * Das Layout folgt dem Aufbau eines echten Listings, nicht einem freien
 * Bildraster: links das Hauptbild gross, darunter die sechs weiteren Bilder in
 * zwei Spalten und drei Zeilen. Rechts der Premium A+ Content, sechs Module
 * ohne Abstand untereinander.
 *
 * Die Spaltenbreite ist gerechnet, nicht geschaetzt, damit beide Spalten unten
 * auf derselben Hoehe enden: links ergibt sich die Hoehe aus 1,25 Breiten fuer
 * das Hauptbild (4:5) und drei halben Breiten fuer die sechs Quadrate, rechts
 * aus sechs Modulen im Verhaeltnis 1400:574. Gleichgesetzt fuehrt das auf
 * 0,884 zu 1.
 */
export function Arbeiten() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    ({
          initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: reduce ? { duration: 0 } : { duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] as const },
        });

  const [haupt, ...weitere] = bildstrecke;

  return (
    /* Ohne `label`: die Bezeichnung steht in der linken Spalte und bleibt
       damit zusammen mit dem Text stehen. Ueber der Sektion waere sie beim
       ersten Scrollen weg. */
    <Station tone="dark">
      {/* Der Text bleibt stehen, die Arbeit laeuft daran vorbei.

          Vorher stand die Ueberschrift oben und darunter zwei sehr hohe
          Bildspalten: die Sektion bot viel Platz und der Inhalt lief trotzdem
          weit nach unten weg. Jetzt haengt die linke Spalte fest, solange die
          Sektion im Bild ist, rechts scrollt das Listing durch. Ist es
          durchgelaufen, geht die ganze Sektion mit. */}
      <div className="grid gap-10 lg:grid-cols-[0.52fr_1.48fr] lg:items-start lg:gap-12">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow label="Designbeispiele" dark />
          <StationTitle className="!max-w-none">
            So sieht
            <br />
            {/* Die beiden Woerter gehoeren in eine Zeile. */}
            <span className="em whitespace-nowrap text-brand-400">Retail Ready</span> aus.
          </StationTitle>
          <p className="mt-6 max-w-[34ch] text-pretty text-lead text-chalk-muted">
            Ein komplettes Listing aus unserer Produktion für Miganeo.
            <br />
            Sieben Bilder und sechs Module Premium A+ Content, in dieser Form auf Amazon
            veröffentlicht.
          </p>

          {/* Zwei Zahlen, eine Zeile. Drei brachen in der schmalen Spalte um,
              und jede Zeile hier kostet Weg, den der Text stehen bleibt. */}
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/[0.12] pt-6">
            {[
              ["7", "Bilder"],
              ["6", "Module Premium A+"],
            ].map(([zahl, text]) => (
              <div key={text}>
                <dt className="num text-[1.6rem] leading-none text-brand-400">{zahl}</dt>
                <dd className="mt-1 text-[0.75rem] leading-snug text-chalk-muted">{text}</dd>
              </div>
            ))}
          </dl>

          <a href="/design-beispiele" className="btn-text-hell mt-8">
            Mehr Designbeispiele
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Rechts das Listing. Beide Spalten enden auf derselben Hoehe: die
            Bildstrecke gibt die Hoehe vor, die A+ Spalte wird darauf gezogen
            und teilt sie unter ihren sechs Modulen auf. Der Rest, den `cover`
            dabei abschneidet, liegt bei rund einem Prozent. Ueber eine
            gerechnete Spaltenbreite allein ging es nie genau auf, weil die
            Abstaende feste Pixel sind und die Bilder nicht. */}
        <div className="grid min-w-0 items-stretch gap-4 sm:grid-cols-[0.884fr_1fr]">
          <div className="flex min-w-0 flex-col">
            <BereichsKopf label="Listing" note="1 + 6 Bilder" dunkel />

            <motion.figure {...auf(0)} className="listing-kachel m-0 mt-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={haupt.src}
                alt={haupt.alt}
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.figure>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {weitere.map((b, i) => (
                <motion.figure key={b.src} {...auf(0.05 + i * 0.04)} className="listing-kachel m-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.src}
                    alt={b.alt}
                    width={700}
                    height={700}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </motion.figure>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <BereichsKopf label="Premium A+ Content" note="6 Module" dunkel />

            <motion.div {...auf(0.08)} className="listing-kachel mt-3.5 flex flex-1 flex-col">
              {aplus.map((m) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={m.src}
                  src={m.src}
                  alt={m.alt}
                  width={1400}
                  height={574}
                  loading="lazy"
                  className="block w-full sm:min-h-0 sm:flex-1 sm:object-cover"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Station>
  );
}

/** Kopf eines der beiden Bereiche: Bezeichnung links, Umfang rechts. */
function BereichsKopf({ label, note, dunkel = false }: { label: string; note: string; dunkel?: boolean }) {
  return (
    <div
      className={clsx(
        "flex items-baseline justify-between gap-4 border-b pb-2.5",
        dunkel ? "border-white/15" : "border-ink/[0.09]"
      )}
    >
      <span className={clsx("text-label font-bold uppercase", dunkel ? "text-chalk" : "text-ink-soft")}>
        {label}
      </span>
      <span className={clsx("text-[0.7rem]", dunkel ? "text-chalk-faint" : "text-ink-faint")}>{note}</span>
    </div>
  );
}

/* ============================================================
   06 · Stimmen
   ============================================================ */

/**
 * Eine einzelne Stimme.
 *
 * Vorher lagen alle Karten in einem Mauerwerk-Raster (CSS columns). Das
 * bricht die Spalten unterschiedlich hoch um, dadurch stand oben rechts eine
 * Karte allein und ihr Schatten sah aus wie ein Fehler. Jetzt haben alle
 * Karten dieselbe Breite und laufen in zwei Baendern.
 */
function Stimme({ t }: { t: (typeof testimonials)[number] }) {
  return (
    /* Auf dem Telefon so breit wie der Container, damit eine Stimme ganz im
       Bild steht statt zur Haelfte hinter dem Rand. */
    <figure className="panel m-0 flex w-[calc(100vw-3rem)] shrink-0 snap-center flex-col p-5 sm:w-[19rem] sm:p-6 md:w-[22rem]">
      <div className="flex gap-0.5" aria-label="5 von 5 Sternen">
        {Array.from({ length: 5 }).map((_, s) => (
          <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#FF9900" aria-hidden>
            <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-4 text-pretty text-[0.9rem] leading-relaxed text-ink">
        „{t.quote}"
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-5">
        <span
          className={clsx(
            "relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full text-[0.7rem] font-bold text-ink",
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
          <span className="block truncate text-[0.82rem] font-bold text-ink">{t.name}</span>
          <span className="block truncate text-[0.74rem] text-ink-faint">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Ein Band aus Stimmen, das von allein laeuft.
 *
 * Die Liste steht zweimal hintereinander, deshalb springt sie bei -50 % nicht.
 * Beim Zeigen haelt sie an, damit man in Ruhe lesen kann, und weil der Rahmen
 * horizontal scrollbar ist, kann man auch selbst durchwischen. Bei
 * prefers-reduced-motion steht das Band still, siehe globals.css.
 */
/**
 * Ein Band mit Kundenstimmen.
 *
 * Auf dem Rechner laeuft es von allein und haelt an, sobald der Zeiger
 * darauf liegt. Auf dem Telefon gibt es keinen Zeiger: dort lief der Text
 * einfach weiter, und wer eine Stimme zu Ende lesen wollte, kam nicht
 * hinterher. Ab `md` laeuft es, darunter steht es still und wird gewischt,
 * mit Einrastpunkten, damit immer eine ganze Karte im Bild steht.
 */
function StimmenBand({ liste, dauer, rueckwaerts }: { liste: typeof testimonials; dauer: number; rueckwaerts?: boolean }) {
  return (
    <div className="group relative snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        className="flex w-max items-stretch gap-4 md:animate-marquee md:group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${dauer}s`, animationDirection: rueckwaerts ? "reverse" : "normal" }}
      >
        {[...liste, ...liste].map((t, i) => (
          <Stimme key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Stimmen() {
  const mitte = Math.ceil(testimonials.length / 2);
  const oben = testimonials.slice(0, mitte);
  const unten = testimonials.slice(mitte);

  return (
    <Station label="Kundenstimmen" tone="tint">
      <StationTitle>
        Im Wortlaut, <span className="em mark">mit Zahlen.</span>
      </StationTitle>

      {/* Zwei Baender, gegenlaeufig. Der Verlauf an den Kanten muss den
          getoenten Sektionsgrund treffen, nicht Weiss, sonst zeichnet sich
          eine Kante ab. */}
      <div className="relative mt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 md:w-20"
          style={{ background: "linear-gradient(90deg, #eef4fb, rgba(238,244,251,0))" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 md:w-20"
          style={{ background: "linear-gradient(270deg, #eef4fb, rgba(238,244,251,0))" }}
        />
        <div className="space-y-4">
          <StimmenBand liste={oben} dauer={72} />
          <StimmenBand liste={unten} dauer={88} rueckwaerts />
        </div>
      </div>
    </Station>
  );
}

/* ============================================================
   07 · Termin
   ============================================================ */

/**
 * Abschluss-CTA der Startseite.
 *
 * Der Block liegt in `takt/Gespraech` und ist auf allen Seiten derselbe.
 * Hier steht nur noch die Formulierung fuer die Startseite.
 */
export function Termin({ title }: { title?: React.ReactNode } = {}) {
  return <Gespraech title={title} />;
}

/* ============================================================
   08 · Mannschaft
   ============================================================ */

/**
 * Team auf der Startseite.
 *
 * Drei Fassungen. Erst fuenfzehn Bilder: drei Aufnahmen, drei Gruender, neun
 * Portraits. Dann drei Aufnahmen und eine weisse Platte mit den Bereichen im
 * Haus. Beides war zu viel fuer den Fuss einer langen Seite, und die Platte
 * sagte nichts, was nicht schon oben stand.
 *
 * Jetzt: links Bezeichnung, Ueberschrift, drei Zeilen und der Weg zur
 * Team-Seite, rechts das Bild der drei Gruender. Darauf sitzt der Stempel,
 * halb auf dem Foto und halb auf dem Grund.
 */
export function Mannschaft() {
  const reduce = useReducedMotion();
  const auf = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: reduce ? { duration: 0 } : { duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] as const },
  });

  return (
    <Station label="Team" tone="warm" id="team">
      <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="min-w-0">
          <StationTitle>Das Team hinter temoa.</StationTitle>
          <StationLead>
            Kein Konto liegt bei einer Person. An eurem Sortiment arbeiten mehrere gleichzeitig,
            jeder in seinem Bereich, mit denselben Zahlen vor sich.
          </StationLead>
        </div>

        <motion.div {...auf(0.08)} className="relative">
          <div className="overflow-hidden rounded-[1.5rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_34px_60px_-32px_rgba(13,36,57,0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/Main.webp"
              alt="Die Gründer von temoa"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          {/* Auf dem Telefon genau bis an den Rand des Containers und nicht
              darueber hinaus: `px-6` sind 1,5 rem, ein groesserer negativer
              Rand schiebt den Stempel aus dem Bildschirm, und der Body
              schneidet ihn dann ab. */}
          <Stempel className="absolute -bottom-8 -left-6 h-[6.5rem] w-[6.5rem] md:-bottom-10 md:-left-10 md:h-[9rem] md:w-[9rem]" />
        </motion.div>
      </div>
    </Station>
  );
}
