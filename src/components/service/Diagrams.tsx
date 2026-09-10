"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Pille } from "../ui/SectionHeading";
import type { Woerterbuch } from "@/lib/woerter";

/* Schematic, claim-free diagrams that illustrate a mechanism.
   Relative widths only, no invented numbers. */

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

export function BudgetSplitDiagram({ w }: { w: Woerterbuch["leistungen"]["budgetDiagramm"] }) {
  return (
    <div className="panel p-5 sm:p-7 md:p-8">
      <Pille>{w.eyebrow}</Pille>
      <div className="mt-7 space-y-8">
        <Track
          label={w.ohneLabel}
          segments={[
            { w: 68, color: "#D6E1EA", text: w.ohneVerloren },
            { w: 32, color: "#FF9900", text: w.ohneVerkauf },
          ]}
        />
        <Track
          label={w.mitLabel}
          delay={0.25}
          segments={[
            { w: 76, color: "#FF9900", text: w.mitVerkauf },
            { w: 24, color: "#D6E1EA", text: w.mitTest },
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

/* Breite und Farbe der fuenf Posten, in der Reihenfolge des Woerterbuchs. */
const kostenTeile = [
  { w: 32, color: "#0E3350" },
  { w: 17, color: "#1D5A80" },
  { w: 13, color: "#3E86A8" },
  { w: 19, color: "#7FB2C9" },
  { w: 19, color: "#FF9900" },
];

export function MargenDiagramm({ w }: { w: Woerterbuch["leistungen"]["margenDiagramm"] }) {
  const kosten = kostenTeile.map((k, i) => ({ ...k, text: w.kosten[i] }));
  const entscheidung = [
    { produkt: w.produktA, rest: 74, urteil: w.urteilA, stark: true },
    { produkt: w.produktB, rest: 22, urteil: w.urteilB, stark: false },
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <div ref={ref} className="panel p-5 sm:p-7 md:p-8">
      <Pille>{w.eyebrow}</Pille>

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
            /* `flex-wrap` und `basis-full`: auf 320 Pixel Breite passen
               Produktname, Balken und Urteil nicht in eine Zeile, und weil
               `body` waagerecht abschneidet, verschwand das Urteil einfach
               am Rand. Ab `sm` steht wieder alles nebeneinander. */
            className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[1rem] bg-navy/[0.035] px-4 py-3.5 ring-1 ring-navy/[0.06]"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.14 }}
          >
            <span className="w-24 shrink-0 text-small font-bold text-ink">{e.produkt}</span>
            <span className="h-2.5 min-w-[3.5rem] flex-1 overflow-hidden rounded-full bg-navy/10">
              <motion.span
                className="block h-full rounded-full"
                style={{ background: e.stark ? "#FF9900" : "#9FB4C4" }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${e.rest}%` } : {}}
                transition={{ duration: 0.9, delay: 0.85 + i * 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
            </span>
            <span
              className={`shrink-0 basis-full text-small font-bold sm:basis-auto ${e.stark ? "text-ink" : "text-ink-faint"}`}
            >
              {e.urteil}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
