"use client";

import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { Icon, type IconName } from "./Icons";

/**
 * Sektionsgerüst im Theme „Studio".
 *
 * Zwei Fassungen liegen hinter dieser: erst ein „Taktplan" mit mitlaufender
 * Linie am linken Rand und Stationsnummern, dann dieselbe Struktur ohne
 * Nummern. Beide hatten flache weiße Sektionen, auf denen Text frei schwebte.
 *
 * Jetzt trägt jede Sektion einen eigenen Grund: heller Verlauf mit warmem
 * Lichtkern, kräftiger getönt, oder ein dunkles Podest. Inhalte liegen darauf
 * auf Platten. Die Töne wechseln über die Seite, damit Sektionen als Blöcke
 * lesbar sind und nicht als eine lange weiße Bahn.
 *
 * Typografische Regel bleibt: groß wird leicht gesetzt, klein wird fett.
 */

export type Tone = "paper" | "tint" | "warm" | "dark" | "signal";

const grounds: Record<Tone, string> = {
  paper: "ground text-ink",
  tint: "ground-tint text-ink",
  warm: "ground-warm text-ink",
  dark: "on-dark ground-deep text-chalk",
  signal: "on-signal ground-signal",
};

export function Station({
  label,
  tone = "paper",
  id,
  children,
  className,
}: {
  /** Kurze Bezeichnung über der Überschrift. Weglassen, wenn die Überschrift reicht. */
  label?: string;
  tone?: Tone;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  const signal = tone === "signal";
  return (
    <section id={id} className={clsx("relative scroll-mt-24", grounds[tone], className)}>
      <div className="container-x">
        <div className="py-20 md:py-28">
          {label && <Eyebrow label={label} dark={dark} signal={signal} />}
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

/**
 * Bezeichnung über der Überschrift.
 *
 * Sitzt als kleine Pille auf dem Grund, mit einem Leuchtpunkt davor. Das
 * bindet sie an die Glow-Sprache des Themes und hebt sie vom Grund ab, statt
 * sie als nackte Zeile daraufzulegen.
 */
export function Eyebrow({
  label,
  dark = false,
  signal = false,
}: {
  label: string;
  dark?: boolean;
  /** Auf der orangen Signalfläche: dunkle Pille statt weißer. */
  signal?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 8 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className={clsx(
        "mb-6 inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4",
        signal
          ? "bg-navy/[0.14] shadow-[inset_0_0_0_1px_rgba(42,20,0,0.14)]"
          : dark
            ? "bg-white/[0.07] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)]"
            : "bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(13,36,57,0.05),0_10px_20px_-14px_rgba(13,36,57,0.2)]"
      )}
    >
      <span
        aria-hidden
        className={clsx("node-glow", signal && "!bg-navy !shadow-[0_0_0_4px_rgba(10,30,43,0.12)]")}
      />
      <span
        className={clsx(
          "text-label font-bold uppercase",
          signal ? "text-navy" : dark ? "text-chalk" : "text-ink-soft"
        )}
      >
        {label}
      </span>
    </motion.div>
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
        tone === "dark" ? "text-chalk-muted" : tone === "signal" ? "signal-leise" : "text-ink-muted",
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

/**
 * Inhaltskarte.
 *
 * Ersetzt die frühere `RuledRow`, eine Zeile zwischen zwei Haarlinien. Die
 * hat den Text frei auf dem weißen Grund liegen lassen und pro Blick kaum
 * etwas getragen. Jetzt ist es eine Platte mit Icon-Kachel, wie in den
 * Referenzen: Symbol, kurze Überschrift, ein Satz.
 */
/**
 * Karte mit Icon.
 *
 * `body` ist absichtlich freiwillig. Der Kunde fand die Kacheln zu textlastig
 * und wollte stattdessen laengere Ueberschriften ohne Unterzeile und deutlich
 * groessere Icons. Ohne `body` schaltet die Karte genau in diese Fassung: das
 * Icon wird gross, die Ueberschrift traegt die Aussage allein.
 */
export function Karte({
  icon,
  title,
  body,
  href,
  tone = "paper",
  className,
}: {
  icon: IconName;
  title: string;
  /** Weglassen, wenn die Ueberschrift die Aussage allein traegt. */
  body?: string;
  href?: string;
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "dark";
  const nurTitel = !body;
  const inner = (
    <>
      <span
        className={clsx(
          dark ? "tile-dark" : "tile",
          nurTitel ? "mb-6 !h-[4.5rem] !w-[4.5rem] !rounded-[1.4rem]" : "mb-5"
        )}
      >
        <Icon name={icon} className={nurTitel ? "h-9 w-9" : "h-8 w-8"} />
      </span>
      <span
        className={clsx(
          "block font-bold leading-snug tracking-[-0.015em]",
          nurTitel
            ? "text-[1.2rem] md:text-[1.35rem]"
            : "text-[1.1rem] md:text-[1.2rem]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </span>
      {body && (
        <span className={clsx("mt-2.5 block text-small leading-relaxed", dark ? "text-chalk-muted" : "text-ink-muted")}>
          {body}
        </span>
      )}
      {href && (
        <span
          className={clsx(
            "mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-bold transition-transform duration-300 group-hover:translate-x-1",
            dark ? "text-brand-400" : "text-navy"
          )}
        >
          Mehr dazu
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  );

  const shared = clsx(
    "group flex h-full flex-col p-7 md:p-8",
    dark ? "panel-dark" : "panel panel-lift",
    className
  );

  return href ? (
    <a href={href} className={shared}>
      {inner}
    </a>
  ) : (
    <div className={shared}>{inner}</div>
  );
}
