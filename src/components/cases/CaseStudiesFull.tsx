"use client";

import { ZahlText } from "../takt/Zahl";
import {
  markenfotoAlt,
  type CaseStudy,
  type CaseStat,
  type CaseBadge,
  type CaseMetric,
  type Trend,
} from "@/lib/cases";
import type { Woerterbuch } from "@/lib/woerter";
import { Flaggenreihe } from "../ui/Flagge";
import { Markenlogo } from "../ui/Markenlogo";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../takt/Icons";
import { CaseChart } from "./CaseChart";
import { CaseArbeitView } from "./CaseArbeit";

/* Icon je Story-Schritt: Ausgangslage, Vorgehen, Ergebnis. Die Zeichen kommen
   aus dem Satz der Website (`takt/Icons`), nicht aus dem allgemeinen
   Strich-Satz: Lupe, Kompass, Stufen sagen etwas ueber den Schritt, eine
   Rakete sagt nichts. */
const STEP_ICONS: IconName[] = ["lupe", "kompass", "stufen"];

/* Der Trendpfeil traegt die Richtung, nicht die Wertung: bei ACoS und TACoS
   zeigt er nach unten und bleibt trotzdem gruen. Auf hellem Grund ist Gruen
   #1B7F4B (4,6:1), auf dunklem #6EE7A0. */
function TrendArrow({ trend, className = "" }: { trend: Trend; className?: string }) {
  if (trend === "neutral") return null;
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className={className}>
      {trend === "up" ? (
        <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function BadgeIcon({ icon }: { icon: "trophy" | "award" | "shield" }) {
  const common = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (icon === "shield")
    return (<svg {...common}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></svg>);
  if (icon === "award")
    return (<svg {...common}><circle cx="12" cy="9" r="5" /><path d="M9 13l-1.5 8L12 18l4.5 3L15 13" /></svg>);
  return (<svg {...common}><path d="M6 4h12v3a6 6 0 0 1-12 0V4Z" /><path d="M6 5H4v1a3 3 0 0 0 3 3M18 5h2v1a3 3 0 0 1-3 3M9 20h6M12 13v7" /></svg>);
}

/**
 * Die beiden Abzeichen, die Amazon selbst vergibt, so gezeichnet, wie sie im
 * Suchergebnis stehen: „Bestseller" weiss auf Orange, „Amazons Tipp" weiss
 * auf Schwarz, kleine Rundung, fette Schrift.
 *
 * Beide Farben tragen weisse Schrift, das Orange kommt auf 5,0:1. Es ist das
 * Orange von Amazon und nicht die Markenfarbe der Website: das Abzeichen soll
 * wie ein Zitat aussehen, nicht wie eine Auszeichnung, die temoa vergibt.
 */
/* Die Farben von Amazon, nicht die der Website. Der Wortlaut steht im
   Woerterbuch: auf den englischen Marktplaetzen heissen die beiden
   Abzeichen „Best Seller" und „Amazon's Choice". */
const ABZEICHEN_GRUND = { bestseller: "#C7511F", tipp: "#131A22" } as const;

function AmazonAbzeichen({
  art,
  wort,
}: {
  art: "bestseller" | "tipp";
  wort: string;
}) {
  return (
    <span
      className="inline-flex items-center rounded-[0.3rem] px-2.5 py-[0.35rem] text-[0.74rem] font-bold leading-none text-white"
      style={{ backgroundColor: ABZEICHEN_GRUND[art] }}
    >
      {wort}
    </span>
  );
}

/**
 * Eine Kennzahl im Fuss der Fallkarte.
 *
 * Keine eigene Kachel: die Karte ist die Flaeche, die drei Zahlen stehen
 * darin nebeneinander und sind nur durch feine Linien getrennt. Kachel in der
 * Kachel ist auf dieser Website verboten.
 *
 * Der Wert steht in Navy und nicht in der Fallfarbe: zwei der sechs Farben
 * sind #FF9900 und #FF3131, und Orange ist als Schriftfarbe raus, Rot ist auf
 * dieser Website die Farbe fuer Probleme.
 */
function HeroStat({ stat }: { stat: CaseStat }) {
  return (
    <div className="px-6 py-5 md:px-7">
      {/* `whitespace-nowrap` an der Zahl: „1.677.538 €" brach sonst vor dem
          Eurozeichen um. Lange Werte werden stattdessen eine Stufe kleiner
          gesetzt. */}
      <div className="flex min-w-0 items-center gap-1.5 text-ink">
        <ZahlText
          text={stat.value}
          className={`whitespace-nowrap font-extrabold leading-none tracking-tight ${
            stat.value.length > 9 ? "text-[1.5rem] md:text-[1.8rem]" : "text-[1.7rem] md:text-[2.1rem]"
          }`}
        />
        <TrendArrow trend={stat.trend} className="text-signal-pos" />
      </div>
      <div className="mt-2 text-sm font-bold text-ink">{stat.label}</div>
      {stat.sublabel && <div className="mt-0.5 text-xs leading-snug text-ink-muted">{stat.sublabel}</div>}
    </div>
  );
}

function SubStat({ stat, accent }: { stat: CaseStat; accent: string }) {
  return (
    <div className="surface flex h-full flex-col p-5 text-center">
      <div className="flex min-w-0 items-center justify-center gap-1.5" style={{ color: accent }}>
        <ZahlText
          text={stat.value}
          className={`whitespace-nowrap font-extrabold leading-none tracking-tight ${
            stat.value.length > 9 ? "text-[1.35rem]" : "text-2xl"
          }`}
        />
        <TrendArrow trend={stat.trend} />
      </div>
      <div className="mt-2 text-sm font-bold text-ink">{stat.label}</div>
      {stat.sublabel && <div className="mt-0.5 text-xs leading-snug text-ink-muted">{stat.sublabel}</div>}
    </div>
  );
}

/**
 * Das Kennzahlenband: CTR, CVR, ACoS, TACoS.
 *
 * Das Kuerzel steht zuerst und gross, der Wert daneben. Wer aus dieser Branche
 * kommt, sucht genau nach diesen vier Abkuerzungen, und findet sie in einer
 * Reihe von Karten mit langen Beschriftungen nicht.
 *
 * Bei ACoS und TACoS zeigt der Pfeil nach unten und bleibt gruen: ein
 * gefallener Wert ist dort das gute Ergebnis.
 */
/* Gruen fuer alle vier: eine gestiegene Klickrate und ein gefallener ACoS
   sind dasselbe Ergebnis. #6EE7A0 und nicht das dunkle Signalgruen, auf Navy
   kommt letzteres auf 2,4:1. */
const GRUEN = "#6EE7A0";

function Kennzahl({ m }: { m: CaseMetric }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 px-4 py-4 sm:px-5">
      <div className="flex items-baseline gap-2">
        <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-white/55">
          {m.kuerzel}
        </span>
        <span
          className="flex items-center gap-1 whitespace-nowrap text-[1.45rem] font-extrabold leading-none tracking-tight md:text-[1.7rem]"
          style={{ color: GRUEN }}
        >
          <ZahlText text={m.wert} />
          <TrendArrow trend={m.trend} />
        </span>
      </div>
      <span className="text-[0.8rem] font-bold leading-snug text-white">{m.name}</span>
      {(m.von || m.hinweis) && (
        <span className="text-[0.75rem] leading-snug text-white/55">
          {m.von && m.nach ? `${m.von} auf ${m.nach}` : m.hinweis}
        </span>
      )}
    </div>
  );
}

function Kennzahlenband({ metriken }: { metriken: CaseMetric[] }) {
  if (metriken.length === 0) return null;
  return (
    <Reveal delay={0.06}>
      <div
        className="mx-auto mt-5 max-w-5xl overflow-hidden rounded-[1.4rem] shadow-[0_26px_60px_-40px_rgba(2,48,71,0.7)]"
        style={{ background: "linear-gradient(120deg, #0B4D6B 0%, #023047 55%, #021C2B 100%)" }}
      >
        {/* Feine Trennlinien statt Kacheln in der Kachel: das Band ist eine
            Flaeche, die Kennzahlen stehen darin nebeneinander. */}
        <div className="flex flex-wrap divide-y divide-white/10 sm:divide-y-0 sm:divide-x">
          {metriken.map((m, i) => (
            <div key={`${m.kuerzel}-${i}`} className="flex w-full min-w-0 sm:w-auto sm:flex-1 sm:divide-white/10">
              <Kennzahl m={m} />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Der Kopf eines Falls.
 *
 * Vorfassung war eine dunkle Karte mit einem dunkel abgedeckten Foto darin,
 * weisser Schrift und drei Glaskacheln. Der Kunde hat sie als „extrem
 * kontrastreich" zurueckgewiesen, und sie war es: eine fast schwarze Flaeche
 * mitten in einer hellen Seite, direkt ueber dem ebenfalls dunklen
 * Kennzahlenband.
 *
 * Jetzt eine helle Karte: links das Logo, die Ueberschrift und die Maerkte,
 * rechts das Bild ohne dunklen Schleier, darunter die drei Zahlen als Fuss
 * der Karte. Die Fallfarbe kommt nur noch als leiser Lichtkern hinter der
 * Ecke vor. Das Dunkle traegt danach das Kennzahlenband, und damit hat die
 * Seite eine Abfolge statt zweier schwerer Bloecke.
 */
/* `fotoAlt` ist der fertige Text, nicht das Muster: den Fall kennt der
   Aufrufer ohnehin. */
function Fallkopf({ c, fotoAlt }: { c: CaseStudy; fotoAlt: string }) {
  return (
    <Reveal>
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-white shadow-[0_44px_90px_-52px_rgba(2,48,71,0.5)] ring-1 ring-navy/[0.07]">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-36 h-[22rem] w-[22rem] rounded-full opacity-[0.14] blur-[80px]"
          style={{ background: c.accent }}
        />
        <div className="relative grid gap-8 p-6 sm:p-8 md:p-11 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            {/* Nur das Logo, und gross. Die Branche stand vorher daneben und
                war die kleinste Information auf der Seite: welche Marke es
                ist, sagt das Logo, was sie verkauft, sagt die Ueberschrift.
                Wo kein Logo vorliegt (die Marke aus Gartenzubehoer ist
                anonymisiert), steht der Name. */}
            {c.logo ? (
              <Markenlogo
                logo={c.logo}
                name={c.displayName}
                className="h-16 w-[12rem] md:h-24 md:w-[15rem]"
              />
            ) : (
              <span className="text-[0.95rem] font-extrabold uppercase tracking-[0.14em] text-ink">
                {c.displayName}
              </span>
            )}
            {/* Die Ueberschrift des Falls ist die h1 der Seite. Vorher war
                sie eine h2, und die Seite hatte damit gar keine h1: fuer eine
                Suchmaschine ist das die Angabe, worum es hier geht. */}
            <h1 className="mt-5 text-[1.55rem] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-3xl md:text-[2.4rem]">
              {c.headline}
            </h1>
            <p className="mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed text-ink-muted md:text-base">
              {c.subheadline}
            </p>
            {/* Maerkte und Zeitraum in einer Zeile: die Fahnen sagen auf einen
                Blick, wie breit die Marke steht, das Kuerzel allein sagt das
                nicht. */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Flaggenreihe codes={c.marketplaces} />
              <span className="text-[0.8rem] font-semibold text-ink-faint">{c.timeframe}</span>
            </div>
          </div>

          {c.bgImage && (
            <div className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-[2rem] opacity-[0.13] blur-2xl"
                style={{ background: c.accent }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.bgImage}
                alt={fotoAlt}
                className="relative aspect-[16/11] w-full rounded-[1.4rem] object-cover shadow-[0_30px_60px_-34px_rgba(2,48,71,0.55)] ring-1 ring-navy/[0.08]"
              />
            </div>
          )}
        </div>

        {/* Die drei Zahlen als Fuss der Karte, getrennt durch feine Linien.
            Keine Kacheln darin: die Karte ist schon die Flaeche. */}
        {c.heroStats.length > 0 && (
          <div className="relative grid divide-y divide-navy/[0.08] border-t border-navy/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {c.heroStats.map((s) => (
              <HeroStat key={s.label} stat={s} />
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

/** Die drei Schritte des Falls: Ausgangslage, Vorgehen, Ergebnis. */
function Geschichte({ c }: { c: CaseStudy }) {
  return (
    <RevealGroup className="mx-auto mt-6 grid max-w-5xl gap-5 md:grid-cols-3" stagger={0.07}>
      {c.sections.map((s, i) => (
        <RevealItem key={s.heading} className="h-full">
          <div className="relative flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/[0.05]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${c.accent}14`, color: c.accent }}>
                <Icon name={STEP_ICONS[i % STEP_ICONS.length]} className="h-5 w-5" />
              </span>
              <span className="text-sm font-extrabold" style={{ color: c.accent }}>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-3 text-base font-bold text-ink">{s.heading}</h3>
            <p className="mt-2 text-sm font-bold leading-relaxed text-ink">{s.body}</p>
            {s.punkte && (
              <ul className="mt-3 space-y-2">
                {s.punkte.map((punkt) => (
                  <li key={punkt} className="flex gap-2.5 text-sm leading-snug text-ink-muted">
                    {/* Das Aufzaehlungszeichen traegt die Fallfarbe, der Text
                        bleibt dunkel: farbige Schrift auf Weiss ist in dieser
                        Groesse nicht lesbar. */}
                    <span
                      aria-hidden
                      className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: c.accent }}
                    />
                    <span>{punkt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/**
 * Die Reihenfolge eines Falls: Kopf, Zahlen, was wir gemacht haben, dann die
 * ausgelieferte Arbeit.
 *
 * Die Geschichte stand vorher unter den Bildern. Wer bei drei Produkten mit
 * Listing, Varianten und A+ ankommt, hat bis dahin ueber tausend Pixel Bilder
 * hinter sich und liest den Text nicht mehr. Was gemacht wurde, gehoert nach
 * oben; die Bilder belegen es danach.
 */
export function CaseBlock({
  c,
  index,
  w,
}: {
  c: CaseStudy;
  index: number;
  w: Woerterbuch["faelle"];
}) {
  const tone = index % 2 === 1 ? "ground-tint" : "ground";
  return (
    <section id={c.slug} className={`relative scroll-mt-28 ${tone} py-16 md:py-24`}>
      <div className="container-x">
        <Fallkopf c={c} fotoAlt={markenfotoAlt(c, w.altMarkenfoto)} />

        <Kennzahlenband metriken={c.kennzahlen} />

        {c.chart && (
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-5xl">
              <CaseChart points={c.chart} accent={c.accent} w={w.diagramm} />
            </div>
          </Reveal>
        )}

        <Geschichte c={c} />

        {c.subStats.length > 0 && (
          <div className="mx-auto mt-5 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.subStats.map((s) => (
              <Reveal key={s.label} className="h-full">
                <SubStat stat={s} accent={c.accent} />
              </Reveal>
            ))}
          </div>
        )}

        {c.badges.length > 0 && (
          <Reveal delay={0.08}>
            <div className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-3">
              {c.badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-ink shadow-soft ring-1 ring-black/[0.05]"
                >
                  {b.art === "hinweis" ? (
                    <span className="pl-2.5" style={{ color: c.accent }}>
                      <BadgeIcon icon={b.icon} />
                    </span>
                  ) : (
                    <AmazonAbzeichen art={b.art} wort={w.abzeichen[b.art]} />
                  )}
                  {b.label}
                </span>
              ))}
            </div>
          </Reveal>
        )}

        {/* Die ausgelieferte Arbeit steht am Schluss des Falls: erst lesen,
            was gemacht wurde, dann sehen, wie es aussieht. */}
        <CaseArbeitView c={c} w={w.arbeit} />
      </div>
    </section>
  );
}

