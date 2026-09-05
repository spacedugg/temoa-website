"use client";

import type { ReactNode } from "react";
import { SectionHeading, Pille } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";
import { Logo } from "../Logo";

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
              <div className="surface surface-hover flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className={`block h-1.5 w-10 rounded-full ${a.bar}`} />
                  {it.n && <span className="text-lg font-extrabold text-ink-soft">{it.n}</span>}
                </div>
                {it.kicker && (
                  <span className={`mt-4 text-xs font-bold uppercase tracking-[0.13em] ${a.text}`}>{it.kicker}</span>
                )}
                {it.title && <h3 className="mt-3 text-balance text-lg font-bold leading-snug text-ink">{it.title}</h3>}
                {it.subtitle && <p className="mt-1 text-sm font-medium text-ink-muted">{it.subtitle}</p>}
                {it.body && <p className="mt-3 text-sm leading-relaxed text-ink-muted">{it.body}</p>}
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
              </div>
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
            {items.map((it, i) => {
              const a = accent(i);
              return (
                <div key={i} className="surface flex items-start gap-3.5 p-5">
                  <span className={`mt-1 block h-8 w-1 shrink-0 rounded-full ${a.bar}`} />
                  <div>
                    {it.title && <h3 className="text-balance text-base font-bold leading-snug text-ink">{it.title}</h3>}
                    {it.body && <p className="mt-1 text-sm leading-relaxed text-ink-muted">{it.body}</p>}
                  </div>
                </div>
              );
            })}
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

/* ---------------- problem points (two columns) + bridge ---------------- */

const POINT_ICONS: IconName[] = ["margin", "ads", "search", "target", "chart", "spark"];

export function Points({
  eyebrow,
  title,
  points,
  bridge,
  tone = "white",
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  points: string[];
  bridge?: string;
  tone?: Tone;
  /** Optional diagram/visual rendered beside the points. */
  aside?: ReactNode;
}) {
  const list = (
    <div className={`grid gap-4 ${aside ? "mt-8" : "mt-10 sm:grid-cols-2"}`}>
      {points.map((p, i) => {
        const a = accent(i);
        const orphan = !aside && points.length % 2 === 1 && i === points.length - 1;
        return (
          <Reveal key={p} delay={i * 0.05} className={orphan ? "sm:col-span-2" : ""}>
            <div className="surface relative flex h-full items-start gap-3.5 p-5">
              <span className={`mt-0.5 shrink-0 ${a.text}`}>
                <Icon name={POINT_ICONS[i % POINT_ICONS.length]} size={24} />
              </span>
              <p className="text-sm leading-snug text-ink md:text-[0.95rem]">{p}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );

  const takeaway = bridge && (
    <Reveal delay={0.1}>
      <div
        className={`flex items-center gap-4 rounded-2xl px-6 py-5 text-left shadow-lift ${aside ? "mt-8" : "mx-auto mt-10 max-w-2xl"}`}
        style={{ background: "linear-gradient(135deg,#0A1E2B,#0B4D6B)" }}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ backgroundImage: "var(--brand-gradient)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
        <p className="text-base font-semibold leading-snug text-white md:text-lg">{bridge}</p>
      </div>
    </Reveal>
  );

  return (
    <Shell tone={tone}>
      {aside ? (
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.82fr] lg:gap-14">
          <div>
            <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
            {list}
            {takeaway}
          </div>
          <Reveal direction="left" delay={0.08} className="lg:sticky lg:top-28">
            {aside}
          </Reveal>
        </div>
      ) : (
        <>
          <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
          {list}
          {takeaway}
        </>
      )}
    </Shell>
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
}: {
  eyebrow?: string;
  title: ReactNode;
  text: string;
  reverse?: boolean;
  tone?: Tone;
  image?: string;
  imageAlt?: string;
  imageAspect?: string;
}) {
  // Ohne Bild entfaellt die Bildspalte. Ein leerer grauer Kasten mit der
  // Aufschrift „Bild" ist schlechter als eine ruhig gesetzte Textsektion.
  if (!image) {
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
          <SzeneBild src={image} alt={imageAlt} aspect={imageAspect} />
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

/* ---------------- accent strip (reporting) ---------------- */

export function AccentStrip({
  eyebrow,
  title,
  items,
  icons,
  tone = "blue",
}: {
  eyebrow?: string;
  title: ReactNode;
  items: string[];
  /** Optional animated icon per item, replacing the plain chevron marker. */
  icons?: IconName[];
  tone?: Tone;
}) {
  return (
    <Shell tone={tone}>
      <Reveal>
        <div className="surface p-8 text-center md:p-10">
          {eyebrow && <Pille>{eyebrow}</Pille>}
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          {icons ? (
            <div className="mt-8 grid gap-7 sm:grid-cols-3">
              {items.map((it, i) => {
                const a = accent(i);
                return (
                  <Reveal key={it} delay={i * 0.08}>
                    <div className="flex flex-col items-center gap-3">
                      <span className={a.text}>
                        <Icon name={icons[i % icons.length]} size={32} />
                      </span>
                      <span className="max-w-[16rem] text-sm font-medium leading-snug text-ink">{it}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {items.map((it) => (
                <span key={it} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                  <Lead color="text-cyan" />
                  {it}
                </span>
              ))}
            </div>
          )}
        </div>
      </Reveal>
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
                  <li key={b} className="flex items-start gap-3 text-base font-medium text-chalk-muted">
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
 * Abschluss-CTA.
 *
 * Vorher stand hier nur zentrierter Text auf dunklem Grund: dieselbe Form wie
 * jede andere Sektion, nur dunkler. Der Kunde hat zu Recht gesagt, dass der
 * wichtigste Block der Seite dann untergeht. Jetzt steht links die Aussage mit
 * dem Knopf, rechts das Gesicht, mit dem das Gespraech stattfindet. Ein Foto
 * an dieser Stelle macht aus einer Aufforderung eine Verabredung.
 */
export function ServiceCTA({ title, sub, chips }: { title: string; sub: string; chips?: string[] }) {
  return (
    <section className="on-dark ground-deep relative overflow-hidden py-20 md:py-28">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand-500" />
      {/* Lichtkern hinter dem Portraet, damit die rechte Seite Gewicht bekommt. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full opacity-70 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.34), transparent 68%)" }}
      />
      <div className="container-x relative">
        <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <div>
            <Reveal>
              <h2 className="title max-w-[22ch] text-balance text-[clamp(2rem,1.3rem+2vw,3.1rem)] text-white">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-[48ch] text-pretty text-lead text-chalk-muted">{sub}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-9">
                <a href="/gespraech-vereinbaren" className="btn-on-dark">
                  Potenzialanalyse buchen
                  <Pfeil />
                </a>
              </div>
            </Reveal>
            {chips && (
              <Reveal delay={0.2}>
                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="panel-dark flex items-center gap-2.5 px-4 py-3.5 text-small text-chalk-muted"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.12}>
            <figure className="relative mx-auto max-w-[22rem] md:mx-0 md:ml-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team/Clemens.webp"
                alt="Clemens, Founder und Sales bei temoa"
                loading="lazy"
                className="w-full rounded-[1.75rem] object-cover shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)]"
              />
              <figcaption className="panel-dark absolute -bottom-6 left-4 right-4 px-5 py-4">
                <div className="text-[0.95rem] font-bold text-white">Clemens</div>
                <div className="mt-0.5 text-small text-chalk-faint">
                  Founder &amp; Sales. Er führt das Gespräch selbst.
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
