"use client";

import type { ReactNode } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";
import { Logo } from "../Logo";

/* ---------------- palette / tones ---------------- */

// Two section tones only: white and light blue. Nothing else.
type Tone = "white" | "blue";

const toneBg: Record<Tone, string> = {
  white: "bg-white",
  blue: "bg-[#EDF5FB]",
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

function Media({ className = "", label = "Bild" }: { className?: string; label?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.05] ${className}`}
      style={{ background: "linear-gradient(135deg,#ffffff,#e7ecf2)" }}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/70 blur-2xl" />
      <span className="relative text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">{label}</span>
    </div>
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
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        className="pointer-events-none absolute -right-40 -top-44 h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.14), rgba(42,155,216,0.10) 50%, transparent 72%)" }}
      />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center md:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-soft shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance pb-1 text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-muted md:mx-0 md:text-lg">
              {sub}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex justify-center md:justify-start">
              <a href="/gespraech-vereinbaren" className="btn-primary !px-7 !py-4 text-base">
                Potenzialanalyse buchen
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal direction="left" delay={0.1}>
          <Media className="aspect-[4/3] w-full" />
        </Reveal>
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
                  {it.n && <span className={`text-lg font-extrabold ${a.text}`}>{it.n}</span>}
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

/* ---------------- alternating media / text rows ---------------- */

export type Row = { n?: string; title: string; line: string; bullets: string[] };

export function Rows({
  eyebrow,
  title,
  items,
  tone = "white",
}: {
  eyebrow?: string;
  title: ReactNode;
  items: Row[];
  tone?: Tone;
}) {
  return (
    <Shell tone={tone}>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
      <div className="mt-14 space-y-14 lg:space-y-20">
        {items.map((it, i) => {
          const reverse = i % 2 === 1;
          const a = accent(i);
          return (
            <Reveal key={it.title}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <Media className={`aspect-[4/3] w-full ${reverse ? "lg:order-2" : ""}`} />
                <div className={reverse ? "lg:order-1" : ""}>
                  {it.n && <span className={`text-lg font-extrabold ${a.text}`}>{it.n}</span>}
                  <h3 className="mt-2 text-balance text-xl font-bold leading-snug text-ink sm:text-2xl">{it.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">{it.line}</p>
                  <ul className="mt-5 space-y-2.5">
                    {it.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
                        <Lead color={a.text} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
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
                <span className="text-xs font-bold uppercase tracking-[0.13em] text-brand-700">{right.label}</span>
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
}: {
  eyebrow?: string;
  title: ReactNode;
  text: string;
  reverse?: boolean;
  tone?: Tone;
}) {
  return (
    <Shell tone={tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <Media className="aspect-[4/3] w-full" />
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
  tone = "blue",
}: {
  eyebrow?: string;
  title: ReactNode;
  items: string[];
  tone?: Tone;
}) {
  return (
    <Shell tone={tone}>
      <Reveal>
        <div className="surface p-8 text-center md:p-10">
          {eyebrow && (
            <span className="eyebrow justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              {eyebrow}
            </span>
          )}
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {items.map((it) => (
              <span key={it} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                <Lead color="text-cyan" />
                {it}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Shell>
  );
}

/* ---------------- bullet panel (der Unterschied) ---------------- */

export function BulletPanel({
  eyebrow,
  title,
  points,
  tone = "white",
}: {
  eyebrow?: string;
  title: ReactNode;
  points: string[];
  tone?: Tone;
}) {
  return (
    <Shell tone={tone}>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
      <Reveal delay={0.08}>
        <div className="surface mt-10 grid gap-x-8 gap-y-5 p-8 sm:grid-cols-2 md:p-10">
          {points.map((p) => (
            <div key={p} className="flex items-start gap-3">
              <Lead />
              <p className="text-sm leading-snug text-ink md:text-base">{p}</p>
            </div>
          ))}
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
    <section className="relative isolate bg-white py-20 md:py-24">
      <Ambient />
      <div className="container-x">
        <Reveal>
          <div className="grid items-stretch gap-6 overflow-hidden rounded-[2rem] lg:grid-cols-2">
            <Media className="min-h-[18rem] w-full" />
            <div
              className="flex flex-col justify-center p-8 text-white md:p-12"
              style={{ background: "linear-gradient(135deg,#0A1E2B,#053048)" }}
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.13em] text-white/90">
                {badge}
              </span>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{title}</h2>
              <ul className="mt-6 space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-base font-medium">
                    <Tick onDark />
                    <span>{b}</span>
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

export function ServiceCTA({ title, sub, chips }: { title: string; sub: string; chips?: string[] }) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center shadow-glow md:px-12 md:py-20"
          style={{ backgroundImage: "var(--brand-gradient)", backgroundSize: "150% 150%" }}
        >
          <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-white/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-14 -right-10 h-60 w-60 rounded-full bg-white/15 blur-3xl" />
          <Reveal>
            <h2 className="relative mx-auto max-w-2xl text-balance pb-1 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="relative mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-white/90 md:text-lg">
              {sub}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="relative mt-8 flex justify-center">
              <a
                href="/gespraech-vereinbaren"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-ink shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
              >
                Potenzialanalyse buchen
              </a>
            </div>
          </Reveal>
          {chips && (
            <Reveal delay={0.2}>
              <div className="relative mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/90">
                {chips.map((c) => (
                  <span key={c} className="inline-flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-white">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
