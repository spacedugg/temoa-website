"use client";

import type { ReactNode } from "react";
import { SectionHeading, Pille } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";
import { Logo } from "../Logo";
import { motion } from "framer-motion";
import { KachelVerlaufDefs, Piktogramm, type PiktogrammName } from "./Piktogramme";
import { ZahlText } from "../takt/Zahl";
import { Gespraech } from "../takt/Gespraech";

/* ---------------- palette / tones ---------------- */

/* Zwei Sektionstoene. Die Namen bleiben, damit die Aufrufe in bodies.tsx
   unveraendert weiterlaufen; dahinter liegen jetzt die Gruende des Themes
   „Studio". Reinweiss kommt auf den Unterseiten nicht mehr vor. */
type Tone = "white" | "blue";

const toneBg: Record<Tone, string> = {
  white: "ground",
  blue: "ground-tint",
};

/* Rotating accent colours so nothing reads as all-orange. */
const ACCENTS = [
  { bar: "bg-brand-500", chip: "bg-brand-500/10 text-brand-600", text: "text-brand-600" },
  { bar: "bg-cyan", chip: "bg-cyan/10 text-cyan", text: "text-cyan" },
  { bar: "bg-red", chip: "bg-red/10 text-red", text: "text-red" },
  { bar: "bg-emerald", chip: "bg-emerald/10 text-emerald", text: "text-emerald" },
  { bar: "bg-navy", chip: "bg-navy/10 text-navy", text: "text-navy" },
];
const accent = (i: number) => ACCENTS[i % ACCENTS.length];

/* ---------------- shared helpers ---------------- */

function Shell({ children, id, tone = "white" }: { children: ReactNode; id?: string; tone?: Tone }) {
  return (
    <section id={id} className={`relative isolate ${toneBg[tone]} py-20 md:py-24`}>
      <KachelVerlaufDefs />
      {tone === "white" && <Ambient />}
      <div className="container-x">{children}</div>
    </section>
  );
}

/**
 * Bild in einer Sektion.
 *
 * Die Illustrationen unter /bilder sind freigestellt und haben keinen eigenen
 * Grund. Ein Rahmen mit Radius und Schatten darum wuerde sie als Kasten auf
 * der Flaeche zeigen, genau der Fehler, der auf der Startseite schon
 * behoben ist. Fotos dagegen brauchen die Kante. Deshalb entscheidet der
 * Pfad: /bilder = freigestellt, alles andere = Platte.
 */
function SzeneBild({
  src,
  alt = "",
  aspect,
  className = "",
}: {
  src: string;
  alt?: string;
  aspect?: string;
  className?: string;
}) {
  const frei = src.startsWith("/bilder/");
  if (frei) {
    return (
      <div className={`relative ${className}`}>
        <span aria-hidden className="halo left-[14%] top-[16%] h-3/4 w-3/4" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="relative w-full" />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" className={`panel w-full object-cover ${aspect ?? ""} ${className}`} />
  );
}

/** Die orange Pfeilscheibe im Primaerbutton. Das Orange sitzt auf der Scheibe,
 *  nie auf der Buttonflaeche. */
function Pfeil() {
  return (
    <span className="disc" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Quiet lead marker for neutral feature/deliverable lists.
 *  A thin accent chevron, no checkmark. `color` is a text-* class. */
function Lead({ color = "text-brand-500" }: { color?: string }) {
  return (
    <span className={`mt-1 inline-flex shrink-0 ${color}`}>
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
        <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Neutral tick for true positive/negative comparisons (on dark panels). */
function Tick({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        onDark ? "bg-white/15 text-white" : "bg-navy/[0.07] text-navy"
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Comparison ticks with a soft coloured glow: green for the temoa column,
 *  red for the status-quo column. */
function CheckGlow() {
  return (
    <span
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ background: "#16A34A1A", color: "#16A34A", boxShadow: "0 0 10px -1px #16A34A66" }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function CrossGlow() {
  return (
    <span
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ background: "#FF31311A", color: "#E11414", boxShadow: "0 0 10px -1px #FF313155" }}
    >
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const colWidth: Record<number, string> = {
  2: "w-full sm:w-[calc(50%_-_0.625rem)]",
  3: "w-full sm:w-[calc(50%_-_0.625rem)] lg:w-[calc(33.333%_-_0.84rem)]",
  4: "w-full sm:w-[calc(50%_-_0.625rem)] lg:w-[calc(25%_-_0.94rem)]",
};

/* ---------------- hero ---------------- */

export function ServiceHero({
  eyebrow,
  title,
  sub,
  image,
  imageAlt = "",
  imageAspect = "aspect-square",
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  /** Optional hero image; falls back to a neutral placeholder. */
  image?: string;
  imageAlt?: string;
  /** Aspect ratio for the placeholder (service heroes are 1:1). */
  imageAspect?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden ground pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        className="pointer-events-none absolute -right-40 -top-44 h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.14), rgba(42,155,216,0.10) 50%, transparent 72%)" }}
      />
      <div className={`container-x relative grid items-center gap-12 ${image ? "lg:grid-cols-[1.05fr_0.95fr]" : "max-w-3xl text-center"}`}>
        <div className={image ? "text-center md:text-left" : ""}>
          <Reveal>
            <Pille>{eyebrow}</Pille>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance pb-1 text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className={`mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-muted md:text-lg ${image ? "md:mx-0" : ""}`}>
              {sub}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className={`mt-8 flex justify-center ${image ? "md:justify-start" : ""}`}>
              <a href="/gespraech-vereinbaren" className="btn-primary">
                Potenzialanalyse buchen
                <Pfeil />
              </a>
            </div>
          </Reveal>
        </div>
        {/* Ohne Bild entfaellt die Bildspalte. Ein grauer Kasten mit der
            Aufschrift „Bild" ist schlechter als eine mittige Textspalte. */}
        {image && (
          <Reveal direction="left" delay={0.1}>
            <SzeneBild src={image} alt={imageAlt} aspect={imageAspect} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------------- card grid (no-orphan via centered flex) ---------------- */

export type Card = {
  n?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
  /** Zeichen ueber der Ueberschrift. Macht auf einen Blick klar, worum es geht. */
  icon?: IconName;
  /**
   * Bewegtes Piktogramm ueber der Ueberschrift. Vorzugsweise dieses statt
   * `icon`: der allgemeine Strich-Satz sagt zu wenig, und weisse Kacheln ohne
   * jedes Zeichen sehen leer aus.
   */
  piktogramm?: PiktogrammName;
};

export function Cards({
  eyebrow,
  title,
  description,
  items,
  cols = 3,
  callout,
  tone = "white",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  items: Card[];
  cols?: 2 | 3 | 4;
  callout?: string;
  tone?: Tone;
}) {
  return (
    <Shell tone={tone}>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} description={description} />
      <div className="mt-12 flex flex-wrap justify-center gap-5">
        {items.map((it, i) => {
          const a = accent(i);
          return (
            <Reveal key={i} delay={i * 0.05} className={`${colWidth[cols]}`}>
              {/* Der farbige Strich oben links stand auf jeder zweiten Kachel
                  der Website und hat sie alle gleich aussehen lassen. Er ist
                  raus. Die Reihenfolge tragen jetzt Ziffern in der Ecke, die
                  Farbe sitzt auf den Aufzaehlungszeichen. */}
              <motion.div
                className="panel panel-lift flex h-full flex-col p-6 md:p-7"
                initial="ruhe"
                whileInView="an"
                whileHover="zeig"
                viewport={{ once: true, margin: "-10% 0px" }}
              >
                {it.piktogramm && (
                  <span className="mb-5 inline-flex">
                    <Piktogramm name={it.piktogramm} />
                  </span>
                )}
                {(it.n || it.kicker || it.icon) && (
                  <div className="flex items-center justify-between gap-3">
                    {it.icon ? (
                      <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-[1.05rem] ${a.text}`} style={{ background: "rgba(10,30,43,0.04)", boxShadow: "inset 0 0 0 1px rgba(10,30,43,0.06)" }}>
                        <Icon name={it.icon} size={30} />
                      </span>
                    ) : it.kicker ? (
                      <span className="text-label font-bold uppercase tracking-[0.14em] text-ink-soft">
                        {it.kicker}
                      </span>
                    ) : (
                      <span />
                    )}
                    {it.n && <span className="num text-[1.5rem] leading-none text-ink/20">{it.n}</span>}
                  </div>
                )}
                {it.title && (
                  <h3 className={`text-balance text-[1.15rem] font-bold leading-snug text-ink md:text-[1.25rem] ${it.n || it.kicker || it.icon ? "mt-5" : ""}`}>
                    {it.title}
                  </h3>
                )}
                {it.subtitle && <p className="mt-1.5 text-small font-medium text-ink-faint">{it.subtitle}</p>}
                {it.body && <p className="mt-3 text-small leading-relaxed text-ink-muted">{it.body}</p>}
                {it.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {it.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
                        <Lead color={a.text} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </Reveal>
          );
        })}
      </div>
      {callout && (
        <Reveal delay={0.1}>
          <p className="mx-auto mt-9 max-w-2xl text-balance text-center text-base font-semibold text-ink">{callout}</p>
        </Reveal>
      )}
    </Shell>
  );
}

/* ---------------- split: stacked cards beside a square image ---------------- */

export function SplitCards({
  eyebrow,
  title,
  description,
  items,
  image,
  imageAlt = "",
  imageAspect = "aspect-[4/3]",
  callout,
  tone = "white",
  reverse = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  items: Card[];
  image?: string;
  imageAlt?: string;
  imageAspect?: string;
  callout?: string;
  tone?: Tone;
  reverse?: boolean;
}) {
  return (
    <Shell tone={tone}>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} description={description} />
      <div className={`mt-12 grid items-center gap-6 lg:gap-10 ${image ? "lg:grid-cols-2" : "mx-auto max-w-3xl"}`}>
        {/* stacked, compact cards */}
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <div className="flex h-full flex-col justify-center gap-4">
            {items.map((it, i) => (
              /* Auch hier ist der farbige Balken raus. Die Nummer sagt die
                 Reihenfolge, das reicht. */
              <div key={i} className="panel flex items-start gap-5 p-5 md:p-6">
                <span className="num shrink-0 text-[1.4rem] leading-none text-ink/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  {it.title && (
                    <h3 className="text-balance text-[1.05rem] font-bold leading-snug text-ink md:text-[1.15rem]">
                      {it.title}
                    </h3>
                  )}
                  {it.body && <p className="mt-1.5 text-small leading-relaxed text-ink-muted">{it.body}</p>}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        {/* Bild in seinem eigenen Verhaeltnis, ohne Beschnitt. Fehlt es, gibt
            es keine zweite Spalte. */}
        {image && (
          <Reveal direction="left" delay={0.08} className={reverse ? "lg:order-1" : ""}>
            <SzeneBild src={image} alt={imageAlt} aspect={imageAspect} />
          </Reveal>
        )}
      </div>
      {callout && (
        <Reveal delay={0.1}>
          <p className="mx-auto mt-9 max-w-2xl text-balance text-center text-base font-semibold text-ink">{callout}</p>
        </Reveal>
      )}
    </Shell>
  );
}

/* ---------------- Das Problem ---------------- */

/**
 * Die Problem-Sektion jeder Leistungsseite.
 *
 * Vorher: vier weisse Karten in einem Raster, darunter ein blaugruener Kasten
 * mit der Schlussfolgerung. Dieselbe Form wie jede andere Kartenreihe der
 * Seite, nur mit anderem Inhalt, und auf jeder Leistungsseite noch einmal.
 *
 * Jetzt ist es die einzige dunkle Stelle im oberen Drittel einer Leistungs-
 * seite, mit rot getoenten Nummern. Rot steht auf dieser Website fuer das,
 * was schiefgeht, gruen fuer Ergebnisse. Damit hat die Sektion eine eigene
 * Form und man sieht auf jeder Seite sofort, dass hier das Problem steht.
 *
 * `tone` bleibt in der Signatur, damit die Aufrufe unveraendert laufen; die
 * Sektion ist immer dunkel.
 */
export function Points({
  eyebrow,
  title,
  points,
  bridge,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  points: string[];
  bridge?: string;
  tone?: Tone;
  /** Optionales Diagramm neben der Liste. */
  aside?: ReactNode;
}) {
  const liste = (spalten: 1 | 2) => (
    <div className={spalten === 2 ? "mt-10 grid gap-3.5 sm:grid-cols-2 sm:gap-4" : "grid gap-3.5 sm:gap-4"}>
      {points.map((p, i) => {
        const allein = spalten === 2 && points.length % 2 === 1 && i === points.length - 1;
        return (
          <Reveal key={p} delay={i * 0.05} className={allein ? "sm:col-span-2" : ""}>
            <div className="panel-dark flex h-full items-center gap-4 p-5 md:gap-5 md:p-6">
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-[0.85rem] text-[0.9rem] font-extrabold"
                style={{ background: "rgba(224,36,22,0.16)", color: "#FF8C7A" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[1rem] font-bold leading-snug text-white md:text-[1.1rem]">{p}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );

  const schluss = bridge && (
    <Reveal delay={0.1}>
      <div
        className="flex items-center gap-4 rounded-[1.25rem] px-6 py-5 text-left md:px-7"
        style={{
          background: "rgba(255,153,0,0.12)",
          boxShadow: "inset 0 0 0 1px rgba(255,153,0,0.3)",
        }}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
        <p className="text-[1.05rem] font-bold leading-snug text-white md:text-[1.2rem]">{bridge}</p>
      </div>
    </Reveal>
  );

  return (
    <section className="on-dark ground-deep relative isolate overflow-hidden py-20 md:py-24">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px]" style={{ background: "#C0241A" }} />
      <div className="container-x relative">
        {/* Mit Diagramm: Kopf und Diagramm stehen nebeneinander, die Punkte
            laufen darunter ueber die volle Breite in zwei Spalten. Vorher lag
            das Diagramm rechts neben der kompletten Liste; weil die Liste
            fuenf Punkte hat und das Diagramm kurz ist, stand rechts unten
            eine halbe Bildschirmhoehe Leerraum. */}
        {aside ? (
          <>
            {/* Kopf und Schlusszeile tragen die linke Spalte, das Diagramm
                steht daneben. Vorher stand der Kopf allein neben einem hohen
                Diagramm und darunter blieb eine halbe Bildschirmhoehe leer. */}
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
              <div className="flex flex-col gap-9">
                <ProblemKopf eyebrow={eyebrow} title={title} schmal />
                {schluss}
              </div>
              <Reveal direction="left" delay={0.08}>
                {aside}
              </Reveal>
            </div>
            {liste(2)}
          </>
        ) : (
          /* Ohne Diagramm stand der Kopf allein ueber der Sektion und rechts
             daneben blieb die halbe Breite leer. Jetzt tragen Kopf und
             Schlusszeile die linke Spalte, die Punkte laufen rechts
             untereinander: gleiche Menge Inhalt, keine tote Flaeche. */
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="flex flex-col justify-between gap-8">
              <ProblemKopf eyebrow={eyebrow} title={title} schmal kompakt />
              {schluss}
            </div>
            {liste(1)}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Kopf der Problem-Sektion. Die Pille ist hier rot statt orange.
 *
 * `schmal` gilt nur, wenn rechts daneben ein Diagramm steht. Ohne Diagramm
 * lief die Ueberschrift vorher trotzdem gegen dieselbe schmale Grenze und
 * brach in vier kurze Zeilen; das sah aus wie ein Umbruchfehler.
 */
function ProblemKopf({
  eyebrow,
  title,
  schmal,
  kompakt,
}: {
  eyebrow?: string;
  title: ReactNode;
  schmal?: boolean;
  kompakt?: boolean;
}) {
  /* Die Breitengrenze gehoert an die Ueberschrift, nicht an die Huelle:
     `ch` rechnet mit der Schrift des Elements, und die Huelle traegt die
     Grundschrift. `max-w-[30ch]` ergab dort 240 Pixel, dadurch brach jede
     Ueberschrift in vier kurze Zeilen. */
  return (
    <div>
      {eyebrow && (
        <Reveal>
          <span
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white"
            style={{ background: "rgba(224,36,22,0.18)", boxShadow: "inset 0 0 0 1px rgba(224,36,22,0.4)" }}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#FF6B5E", boxShadow: "0 0 0 4px rgba(224,36,22,0.2)" }}
            />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        {/* In der schmalen Spalte ohne Ausgleich umbrechen: `text-balance`
            macht dort aus zwei vollen Zeilen vier kurze Fetzen. */}
        <h2
          className={
            kompakt
              ? "mt-5 max-w-[26ch] text-[clamp(1.75rem,1.2rem+1.3vw,2.4rem)] font-bold leading-tight tracking-tight text-white"
              : `mt-5 text-balance text-[clamp(1.9rem,1.3rem+1.7vw,2.9rem)] font-bold leading-tight tracking-tight text-white ${
                  schmal ? "max-w-[20ch]" : "max-w-[26ch]"
                }`
          }
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

/* ---------------- two-column compare ---------------- */

export function Compare({
  eyebrow,
  title,
  left,
  right,
  tone = "white",
}: {
  eyebrow?: string;
  title: ReactNode;
  left: { label: string; points: string[] };
  right: { label: string; points: string[] };
  tone?: Tone;
}) {
  return (
    <Shell tone={tone}>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {/* status quo: red glow crosses */}
        <Reveal>
          <div className="surface flex h-full flex-col p-7">
            <span className="text-xs font-bold uppercase tracking-[0.13em] text-ink-faint">{left.label}</span>
            <RevealGroup className="mt-5 space-y-3" stagger={0.06}>
              {left.points.map((p) => (
                <RevealItem key={p}>
                  <div className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
                    <CrossGlow />
                    <span>{p}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>
        {/* temoa: logo on our side, green glow checks */}
        <Reveal delay={0.08}>
          <div
            className="flex h-full flex-col rounded-3xl p-7 shadow-lift ring-1 ring-brand-200"
            style={{ background: "linear-gradient(160deg,#FFF8EE,#ffffff 62%)" }}
          >
            <div className="flex items-center gap-2">
              <Logo className="h-5 w-auto" />
              {right.label && (
                <span className="text-xs font-bold uppercase tracking-[0.13em] text-ink-soft">{right.label}</span>
              )}
            </div>
            <RevealGroup className="mt-5 space-y-3" stagger={0.06}>
              {right.points.map((p) => (
                <RevealItem key={p}>
                  <div className="flex items-start gap-2.5 text-sm font-medium leading-snug text-ink">
                    <CheckGlow />
                    <span>{p}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

/* ---------------- text + media ---------------- */

export function TextMedia({
  eyebrow,
  title,
  text,
  reverse = false,
  tone = "white",
  image,
  imageAlt = "",
  imageAspect = "aspect-[4/3]",
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  text: string;
  reverse?: boolean;
  tone?: Tone;
  image?: string;
  imageAlt?: string;
  imageAspect?: string;
  /** Steht anstelle des Bildes. Fuer gezeichnete Diagramme. */
  aside?: ReactNode;
}) {
  // Ohne Bild entfaellt die Bildspalte. Ein leerer grauer Kasten mit der
  // Aufschrift „Bild" ist schlechter als eine ruhig gesetzte Textsektion.
  if (!image && !aside) {
    return (
      <Shell tone={tone}>
        <div className="panel mx-auto max-w-3xl px-8 py-10 text-center md:px-12 md:py-12">
          <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-muted md:text-lg">
              {text}
            </p>
          </Reveal>
        </div>
      </Shell>
    );
  }

  return (
    <Shell tone={tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          {aside ?? <SzeneBild src={image!} alt={imageAlt} aspect={imageAspect} />}
        </Reveal>
        <div className={`text-center md:text-left ${reverse ? "lg:order-1" : ""}`}>
          <SectionHeading eyebrow={eyebrow} size="compact" align="left" title={title} className="md:mx-0" />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-muted md:mx-0 md:text-lg">
              {text}
            </p>
          </Reveal>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- result block (Ihr bekommt, dark accent) ---------------- */

export function ResultBlock({
  badge,
  title,
  benefits,
}: {
  badge: string;
  title: ReactNode;
  benefits: string[];
}) {
  return (
    <section className="relative isolate ground py-20 md:py-24">
      <Ambient />
      <div className="container-x">
        <Reveal>
          {/* Vorher zwei Spalten: links ein leerer weisser Kasten mit der
              Aufschrift „Bild", rechts das dunkle Feld. Ein halb leerer
              Zweispalter ist schlechter als ein durchgehendes Podest,
              deshalb steht die Aussage jetzt auf der ganzen Breite und die
              Punkte laufen zweispaltig. */}
          <div className="on-dark ground-deep relative overflow-hidden rounded-panel p-8 md:p-12">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand-500" />
            <div className="relative">
              <span className="inline-flex w-fit items-center gap-2.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.13em] text-white/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                <span aria-hidden className="node-glow" />
                {badge}
              </span>
              <h2 className="mt-5 max-w-[24ch] text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                {title}
              </h2>
              <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {benefits.map((b) => (
                  // Auf dem dunklen Podest stand die Liste in Grau. Technisch
                  // lesbar, optisch kraftlos: die Aussage der Sektion darf
                  // nicht blasser sein als die Ueberschrift darueber.
                  <li key={b} className="flex items-start gap-3 text-[1.05rem] font-bold leading-snug text-white">
                    <Tick onDark />
                    <span className="min-w-0">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- final CTA ---------------- */

/**
 * Abschluss-CTA der Unterseiten.
 *
 * Vorher: eine Flaeche in tiefem Orange-Rot mit einer weissen Pille darin. Das
 * war der lauteste Punkt der Seite, ohne der wichtigste zu sein, und Orange lag
 * als Buttonumgebung statt als Akzent. Jetzt dasselbe dunkle Podest wie der
 * Homepage-Abschluss: Navy, orange Lichtkante oben, weisser Button mit oranger
 * Pfeilscheibe.
 */
/**
 * Abschluss-CTA jeder Unterseite.
 *
 * Die Sektion selbst liegt in `takt/Gespraech`, damit Startseite und
 * Unterseiten wirklich denselben Block zeigen. Vorher waren es zwei Fassungen,
 * und jede Aenderung musste man zweimal machen, was man den Seiten ansah.
 */
export function ServiceCTA({ title, zusagen }: { title: string; zusagen?: string[] }) {
  return <Gespraech title={title} zusagen={zusagen} />;
}

/* ---------------- Lieferung: was am Ende in der Hand liegt ---------------- */

/**
 * Was der Kunde nach einer Leistung konkret bekommt.
 *
 * Vorher stand hier eine Sektion in voller Markenfarbe mit drei Zeilen der
 * Art „Ihr wisst, welcher Schritt am meisten bringt". Das ist ein Gefuehl,
 * kein Ergebnis. Wer eine Analyse kauft, will wissen, was danach auf dem
 * Tisch liegt: welches Dokument, mit welchem Inhalt.
 *
 * Danach lag die Sektion auf der roten Flaeche. Rot heisst auf dieser Website
 * aber „hier laeuft etwas schief", und hier geht es um das, was am Ende in der
 * Hand liegt. Jetzt heller Grund mit zwei weissen Platten und einer oranger
 * Lichtkante oben. Die Haken sind weiss auf Navy: orange in einem Kreis von
 * 20 Pixeln war auf dem dunklen Kreis nur ein Fleck.
 */
export function Lieferung({
  eyebrow,
  title,
  stuecke,
}: {
  eyebrow?: string;
  title: ReactNode;
  stuecke: { kicker: string; title: string; punkte: string[] }[];
}) {
  return (
    <section className="ground-tint relative isolate overflow-hidden py-16 md:py-24">
      <div className="container-x relative">
        {eyebrow && <Pille>{eyebrow}</Pille>}
        <Reveal delay={0.06}>
          <h2 className="title mt-6 max-w-[22ch] text-balance text-[clamp(2rem,1.3rem+2.2vw,3.2rem)] text-ink">
            {title}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6" stagger={0.08}>
          {stuecke.map((d, i) => (
            <RevealItem key={d.title} className="h-full">
              {/* Kein farbiger Strich oben auf der Kachel: dieses Muster stand
                  auf der halben Website und hat alle Kacheln gleich aussehen
                  lassen. Die Reihenfolge traegt eine Ziffer. */}
              <div className="panel panel-lift relative flex h-full flex-col p-7 md:p-8">
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.7rem] text-[0.85rem] font-extrabold"
                    style={{ background: "rgba(255,153,0,0.14)", color: "#0A1E2B" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-label font-bold uppercase tracking-[0.14em] text-ink-faint">
                    {d.kicker}
                  </span>
                </span>
                <h3 className="mt-3 text-[1.3rem] font-bold leading-snug text-ink md:text-[1.5rem]">
                  {d.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {d.punkte.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        /* Weisser Haken auf Navy. Orange in einem Kreis von
                           20 Pixeln ist auf dunklem Grund nur ein Fleck, man
                           erkennt die Form nicht mehr. Orange bleibt Akzent
                           auf Flaechen und Ringen. */
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-white"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-small leading-relaxed text-ink-muted">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------- Ergebnis: ein belegter Fall je Leistungsseite ---------------- */

/**
 * Ein Fall aus der Praxis, direkt auf der Leistungsseite.
 *
 * Der Kunde hat zu Recht gesagt, dass auf den Unterseiten ueberall erklaert
 * wird, was wir tun, aber nirgends steht, was dabei herausgekommen ist. Die
 * Case Studies liegen zwei Klicks entfernt, und dorthin geht niemand mitten
 * im Lesen.
 *
 * Die Zahlen kommen aus den Faellen, die auf /ergebnisse stehen, und der Block
 * verlinkt dorthin. Gruen heisst auch hier: hat sich verbessert. Bei ACoS und
 * TACoS zeigt der Pfeil nach unten und bleibt gruen, weil ein gefallener Wert
 * dort das gute Ergebnis ist.
 */
export function Ergebnis({
  eyebrow,
  title,
  zeile,
  werte,
  href,
}: {
  eyebrow: string;
  title: string;
  zeile: string;
  werte: { wert: string; label: string; sub?: string; runter?: boolean }[];
  href: string;
}) {
  return (
    <section className="on-dark ground-deep relative isolate overflow-hidden py-20 md:py-24">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px]" style={{ background: "#22C55E" }} />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white"
                style={{ background: "rgba(34,197,94,0.18)", boxShadow: "inset 0 0 0 1px rgba(74,222,128,0.32)" }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "#6EE7A0", boxShadow: "0 0 0 4px rgba(34,197,94,0.2)" }}
                />
                {eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance text-[clamp(1.8rem,1.3rem+1.5vw,2.6rem)] font-bold leading-tight tracking-tight text-white">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[42ch] text-pretty text-lead text-chalk-muted">{zeile}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <a href={href} className="btn-text mt-8 !text-brand-400">
                Ganze Case Study lesen
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-3" stagger={0.08}>
            {werte.map((w) => (
              <RevealItem key={w.label} className="h-full">
                <div
                  className="flex h-full flex-col rounded-[1.25rem] p-6"
                  style={{
                    background: "linear-gradient(150deg, rgba(34,197,94,0.2), rgba(34,197,94,0.07))",
                    boxShadow: "inset 0 0 0 1px rgba(74,222,128,0.32), 0 14px 34px -20px rgba(34,197,94,0.7)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <ZahlText
                      text={w.wert}
                      className="num text-[clamp(1.9rem,1.3rem+1.5vw,2.5rem)] leading-none text-[#6EE7A0]"
                    />
                    <span
                      aria-hidden
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-[0.5rem]"
                      style={{ background: "rgba(34,197,94,0.22)", color: "#6EE7A0" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path
                          d={w.runter ? "M18 6L6 18m0 0h7m-7 0v-7" : "M6 18L18 6m0 0h-7m7 0v7"}
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-3 text-[0.85rem] font-bold leading-tight text-white">{w.label}</div>
                  {w.sub && <div className="mt-1 text-[0.74rem] leading-tight text-white/60">{w.sub}</div>}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
