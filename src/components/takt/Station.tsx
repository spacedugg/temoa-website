"use client";

import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

/**
 * Welt „Taktplan", helle Fassung.
 *
 * Die Seite ist ein Plan, der von oben nach unten gelesen wird. Jede Sektion
 * ist eine Station mit Nummer und Bezeichnung. Der Grund ist weiß, einzelne
 * Stationen tragen Farbe: getönt, dunkel oder orange.
 *
 * Typografische Regel: groß wird leicht gesetzt, klein wird fett gesetzt.
 */

export type Tone = "paper" | "tint" | "dark";

const grounds: Record<Tone, string> = {
  paper: "bg-white text-ink",
  tint: "bg-canvas-tint text-ink",
  dark: "on-dark bg-navy text-chalk",
};

export function Station({
  n,
  label,
  tone = "paper",
  id,
  children,
  className,
}: {
  n: string;
  label: string;
  tone?: Tone;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <section id={id} className={clsx("relative scroll-mt-24", grounds[tone], className)}>
      <div className="container-x">
        <div className="grid gap-y-10 py-24 md:grid-cols-[8rem_1fr] md:gap-x-14 md:py-32 lg:grid-cols-[10rem_1fr]">
          <StationMark n={n} label={label} dark={dark} />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

function StationMark({ n, label, dark }: { n: string; label: string; dark: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-4 md:sticky md:top-28 md:h-fit md:flex-col md:items-start md:gap-4">
      <motion.span
        initial={reduce ? undefined : { opacity: 0, y: 8 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className={clsx("num text-[3.5rem] md:text-[4.5rem]", dark ? "text-white/15" : "text-ink/10")}
      >
        {n}
      </motion.span>
      <span
        className={clsx(
          "text-label font-bold uppercase md:border-t md:pt-4",
          dark ? "border-white/15 text-brand-400" : "border-ink/10 text-brand-800"
        )}
      >
        {label}
      </span>
    </div>
  );
}

/** Stationsüberschrift. Leichter Schnitt, das betonte Wort im fetten. */
export function StationTitle({
  children,
  className,
  as: As = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <As className={clsx("title max-w-[22ch] text-balance text-[clamp(2rem,1.3rem+2.1vw,3.25rem)]", className)}>
      {children}
    </As>
  );
}

export function StationLead({
  children,
  tone = "paper",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "mt-6 max-w-[56ch] text-pretty text-lead",
        tone === "dark" ? "text-chalk-muted" : "text-ink-muted",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Messwert im leichten Schnitt, Bezeichnung im fetten. */
export function Reading({
  value,
  label,
  note,
  tone = "paper",
  size = "md",
}: {
  value: string;
  label: string;
  note?: string;
  tone?: Tone;
  size?: "md" | "lg";
}) {
  const dark = tone === "dark";
  return (
    <div className="min-w-0">
      <div
        className={clsx(
          "num",
          size === "lg" ? "text-[clamp(2.4rem,1.8rem+1.9vw,3.4rem)]" : "text-[clamp(2rem,1.6rem+1.1vw,2.6rem)]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {value}
      </div>
      <div className={clsx("mt-4 text-small font-bold", dark ? "text-white" : "text-ink")}>{label}</div>
      {note && (
        <div className={clsx("mt-1.5 text-small", dark ? "text-chalk-faint" : "text-ink-faint")}>{note}</div>
      )}
    </div>
  );
}

/** Zeile einer gerissenen Liste. Ersetzt die Kartenreihe. */
export function RuledRow({
  index,
  title,
  body,
  href,
  tone = "paper",
}: {
  index: string;
  title: string;
  body: string;
  href?: string;
  tone?: Tone;
}) {
  const dark = tone === "dark";
  const inner = (
    <>
      <span className={clsx("num text-[1.5rem]", dark ? "text-white/25" : "text-ink/20")}>{index}</span>
      <span className="min-w-0">
        <span
          className={clsx(
            "block text-[1.25rem] font-bold leading-snug tracking-[-0.015em] md:text-[1.4rem]",
            dark ? "text-white" : "text-ink"
          )}
        >
          {title}
        </span>
        <span className={clsx("mt-2.5 block max-w-[54ch] text-body", dark ? "text-chalk-muted" : "text-ink-muted")}>
          {body}
        </span>
      </span>
      {href && (
        <span
          className={clsx(
            "hidden shrink-0 self-center transition-all duration-300 md:grid md:h-10 md:w-10 md:place-items-center md:rounded-[0.625rem]",
            dark
              ? "text-brand-400 group-hover:bg-white/10"
              : "text-brand-700 group-hover:bg-brand-500 group-hover:text-ink"
          )}
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  );

  const shared = clsx(
    "group grid grid-cols-[2.5rem_1fr] items-start gap-x-5 gap-y-1 border-t py-8 transition-colors duration-300 md:grid-cols-[3.5rem_1fr_auto] md:py-9",
    dark ? "border-white/10" : "border-ink/[0.09]"
  );

  return href ? (
    <a href={href} className={clsx(shared, "-mx-5 px-5 hover:bg-ink/[0.025]")}>
      {inner}
    </a>
  ) : (
    <div className={shared}>{inner}</div>
  );
}
