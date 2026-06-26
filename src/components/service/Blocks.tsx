"use client";

import type { ReactNode } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { Reveal } from "../ui/Reveal";

/* ---------------- shared helpers ---------------- */

function Shell({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="relative isolate bg-white py-20 md:py-24">
      <Ambient />
      <div className="container-x">{children}</div>
    </section>
  );
}

function Media({ className = "", label = "Bild" }: { className?: string; label?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.05] ${className}`}
      style={{ background: "linear-gradient(135deg,#ffffff,#e9edf2)" }}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/70 blur-2xl" />
      <span className="relative text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">{label}</span>
    </div>
  );
}

function Check({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${light ? "bg-white/20 text-white" : "text-white"}`}
      style={light ? undefined : { backgroundImage: "var(--brand-gradient)" }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy/[0.06] text-ink-faint">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.16), rgba(255,49,49,0.07) 45%, transparent 70%)" }}
      />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center md:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundImage: "var(--brand-gradient)" }} />
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[3.25rem]">
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
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  items: Card[];
  cols?: 2 | 3 | 4;
  callout?: string;
}) {
  return (
    <Shell>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} description={description} />
      <div className="mt-12 flex flex-wrap justify-center gap-5">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.05} className={`${colWidth[cols]}`}>
            <div className="glass glass-hover flex h-full flex-col rounded-3xl p-6">
              {(it.n || it.kicker) && (
                <div className="flex items-center justify-between">
                  {it.kicker && (
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{it.kicker}</span>
                  )}
                  {it.n && <span className="text-sm font-extrabold text-gradient">{it.n}</span>}
                </div>
              )}
              {it.title && <h3 className="mt-3 text-balance text-lg font-bold leading-snug text-ink">{it.title}</h3>}
              {it.subtitle && <p className="mt-1 text-sm font-medium text-brand-600">{it.subtitle}</p>}
              {it.body && <p className="mt-3 text-sm leading-relaxed text-ink-muted">{it.body}</p>}
              {it.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {it.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
                      <Check />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
      {callout && (
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-center text-sm font-semibold text-ink md:text-base">
            {callout}
          </p>
        </Reveal>
      )}
    </Shell>
  );
}

/* ---------------- problem points + bridge ---------------- */

export function Points({
  eyebrow,
  title,
  points,
  bridge,
}: {
  eyebrow?: string;
  title: ReactNode;
  points: string[];
  bridge?: string;
}) {
  return (
    <Shell>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
      <div className="mx-auto mt-10 max-w-2xl space-y-3">
        {points.map((p, i) => (
          <Reveal key={p} delay={i * 0.05}>
            <div className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-white/70 px-5 py-4 shadow-soft backdrop-blur">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <svg width="14" height="14" viewBox="0 0 20 14" fill="none">
                  <path d="M2 7h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm leading-snug text-ink md:text-base">{p}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {bridge && (
        <Reveal delay={0.1}>
          <div
            className="mx-auto mt-8 max-w-2xl rounded-2xl px-6 py-4 text-center text-sm font-semibold text-white shadow-lift md:text-base"
            style={{ backgroundImage: "var(--brand-gradient)" }}
          >
            {bridge}
          </div>
        </Reveal>
      )}
    </Shell>
  );
}

/* ---------------- alternating media / text rows ---------------- */

export type Row = { n?: string; title: string; line: string; bullets: string[] };

export function Rows({ eyebrow, title, items }: { eyebrow?: string; title: ReactNode; items: Row[] }) {
  return (
    <Shell>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
      <div className="mt-14 space-y-14 lg:space-y-20">
        {items.map((it, i) => {
          const reverse = i % 2 === 1;
          return (
            <Reveal key={it.title}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <Media className={`aspect-[4/3] w-full ${reverse ? "lg:order-2" : ""}`} />
                <div className={reverse ? "lg:order-1" : ""}>
                  {it.n && <span className="text-sm font-extrabold text-gradient">{it.n}</span>}
                  <h3 className="mt-2 text-balance text-xl font-bold leading-snug text-ink sm:text-2xl">{it.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">{it.line}</p>
                  <ul className="mt-5 space-y-2.5">
                    {it.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
                        <Check />
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
}: {
  eyebrow?: string;
  title: ReactNode;
  left: { label: string; points: string[] };
  right: { label: string; points: string[] };
}) {
  return (
    <Shell>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="glass flex h-full flex-col rounded-3xl p-7">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">{left.label}</span>
            <ul className="mt-5 space-y-3">
              {left.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
                  <Cross />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass flex h-full flex-col rounded-3xl p-7 ring-1 ring-brand-200/70">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{right.label}</span>
            <ul className="mt-5 space-y-3">
              {right.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm font-medium leading-snug text-ink">
                  <Check />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
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
}: {
  eyebrow?: string;
  title: ReactNode;
  text: string;
  reverse?: boolean;
}) {
  return (
    <Shell>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <Media className="aspect-[4/3] w-full" />
        </Reveal>
        <div className={`text-center md:text-left ${reverse ? "lg:order-1" : ""}`}>
          <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
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
}: {
  eyebrow?: string;
  title: ReactNode;
  items: string[];
}) {
  return (
    <Shell>
      <Reveal>
        <div className="glass rounded-3xl p-8 text-center md:p-10">
          {eyebrow && (
            <span className="eyebrow justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {eyebrow}
            </span>
          )}
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {items.map((it) => (
              <span key={it} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                <Check />
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
}: {
  eyebrow?: string;
  title: ReactNode;
  points: string[];
}) {
  return (
    <Shell>
      <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
      <Reveal delay={0.08}>
        <div className="mt-10 grid gap-x-8 gap-y-5 rounded-3xl glass p-8 sm:grid-cols-2 md:p-10">
          {points.map((p) => (
            <div key={p} className="flex items-start gap-3">
              <Check />
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
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                {badge}
              </span>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{title}</h2>
              <ul className="mt-6 space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-base font-medium">
                    <Check light />
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
            <h2 className="relative mx-auto max-w-2xl text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl">
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
