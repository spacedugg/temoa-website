"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Pille } from "../ui/SectionHeading";

/* Schematic, claim-free diagrams that illustrate a mechanism.
   Relative widths only, no invented numbers. */

/** Market-agnostic visual: every new marketplace gets the full work,
 *  no country codes named. */
export function MarketWorkStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const chips = ["Keywords", "Content", "Kampagnen"];
  return (
    <div ref={ref} className="surface p-6 md:p-7">
      <Pille>Jeder Marktplatz, die komplette Arbeit</Pille>

      <div className="mt-6 space-y-3">
        {[0, 1, 2].map((m) => (
          <motion.div
            key={m}
            className="flex items-center gap-3 rounded-2xl bg-navy/[0.03] p-3.5 ring-1 ring-black/[0.05]"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + m * 0.12 }}
          >
            <span className="shrink-0 text-brand-600">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16l-1 4a3 3 0 0 1-3 2.4H8A3 3 0 0 1 5 11L4 7Z" />
                <path d="M6 7l1-3h10l1 3M6 20h12M9 20v-5h6v5" />
              </svg>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {chips.map((c) => (
                <span key={c} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink-muted ring-1 ring-black/[0.05]">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-ink-faint">
        Was ein Marktplatz an Recherche, Content und Kampagnen bekommt, bekommt jeder weitere genauso. Ohne Abkürzung.
      </p>
    </div>
  );
}

/**
 * Ein Balken aus zwei Teilen, dazu die Beschriftung unter dem Balken.
 *
 * Vorher stand die Beschriftung im Balken und wurde bei schmalen Segmenten
 * abgeschnitten, die Balken waren duenn und die Farben knallten gegeneinander.
 * Jetzt: ein hoher Balken mit abgesetzten Segmenten, die Anteile darunter als
 * Legende mit Punkt.
 */
function Track({
  label,
  segments,
  delay = 0,
}: {
  label: string;
  segments: { w: number; color: string; text: string }[];
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <div ref={ref}>
      <span className="text-label font-bold uppercase tracking-[0.14em] text-ink-faint">{label}</span>
      <div className="mt-3 flex h-14 w-full gap-1.5">
        {segments.map((s, i) => (
          <motion.div
            key={s.text}
            className="rounded-[0.6rem]"
            style={{ background: s.color }}
            initial={{ width: 0 }}
            animate={inView ? { width: `calc(${s.w}% - ${i === 0 ? 0 : 0.375}rem)` } : {}}
            transition={{ duration: 1, delay: delay + i * 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {segments.map((s) => (
          <span key={s.text} className="inline-flex items-center gap-2 text-small font-bold text-ink-soft">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            {s.text}
            <span className="num text-ink">{s.w} %</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function BudgetSplitDiagram() {
  return (
    <div className="panel p-7 md:p-8">
      <Pille>Wohin dasselbe Budget fließt</Pille>
      <div className="mt-7 space-y-8">
        <Track
          label="Ohne saubere Struktur"
          segments={[
            { w: 68, color: "#D6E1EA", text: "Klicks ohne Kauf" },
            { w: 32, color: "#FF9900", text: "Verkäufe" },
          ]}
        />
        <Track
          label="So bauen wir es auf"
          delay={0.25}
          segments={[
            { w: 76, color: "#FF9900", text: "Verkäufe" },
            { w: 24, color: "#D6E1EA", text: "Test" },
          ]}
        />
      </div>
    </div>
  );
}

/* ============================================================
   Margenrechnung: was von einem Verkauf uebrig bleibt.

   Auf der Advertising-Seite stand unter „Unser Ansatz" dasselbe Bild wie auf
   der Startseite. Bilder sollen nur einmal vorkommen, also ist daraus eine
   gezeichnete Rechnung geworden. Sie zeigt genau das, was der Text sagt:
   erst rechnen, dann skalieren.

   Bewusst ohne Zahlen. Ein Kostenanteil in Prozent waere eine erfundene
   Angabe, die Breiten reichen aus, um die Reihenfolge zu zeigen.
   ============================================================ */

const kosten = [
  { text: "Wareneinsatz", w: 32, color: "#0E3350" },
  { text: "Amazon-Gebühren", w: 17, color: "#1D5A80" },
  { text: "Versand", w: 13, color: "#3E86A8" },
  { text: "Werbung", w: 19, color: "#7FB2C9" },
  { text: "Gewinn", w: 19, color: "#FF9900" },
];

const entscheidung = [
  { produkt: "Produkt A", rest: 74, urteil: "bekommt mehr Budget", stark: true },
  { produkt: "Produkt B", rest: 22, urteil: "wird gehalten", stark: false },
];

export function MargenDiagramm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <div ref={ref} className="panel p-7 md:p-8">
      <Pille>Was von einem Verkauf übrig bleibt</Pille>

      <div className="mt-7 flex h-16 w-full gap-1.5">
        {kosten.map((k, i) => (
          <motion.div
            key={k.text}
            className="rounded-[0.6rem]"
            style={{ background: k.color }}
            initial={{ width: 0 }}
            animate={inView ? { width: `calc(${k.w}% - 0.3rem)` } : {}}
            transition={{ duration: 0.9, delay: i * 0.11, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
        {kosten.map((k) => (
          <span key={k.text} className="inline-flex items-center gap-2 text-small font-bold text-ink-soft">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: k.color }} />
            {k.text}
          </span>
        ))}
      </div>

      <div className="mt-8 space-y-3 border-t border-navy/10 pt-7">
        {entscheidung.map((e, i) => (
          <motion.div
            key={e.produkt}
            className="flex items-center gap-4 rounded-[1rem] bg-navy/[0.035] px-4 py-3.5 ring-1 ring-navy/[0.06]"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.14 }}
          >
            <span className="w-24 shrink-0 text-small font-bold text-ink">{e.produkt}</span>
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-navy/10">
              <motion.span
                className="block h-full rounded-full"
                style={{ background: e.stark ? "#FF9900" : "#9FB4C4" }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${e.rest}%` } : {}}
                transition={{ duration: 0.9, delay: 0.85 + i * 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
            </span>
            <span
              className={`shrink-0 text-small font-bold ${e.stark ? "text-ink" : "text-ink-faint"}`}
            >
              {e.urteil}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
