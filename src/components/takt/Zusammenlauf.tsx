"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Woerterbuch } from "@/lib/woerter";

/* ============================================================
   Zusammenlauf: eine Auswertung, vier Bereiche, ein Fundament.

   Stand vorher als leeres Bildfeld auf der Full-Service-Seite. Ein
   generiertes Bild ginge auch, aber die Aussage ist ein Zusammenhang, und
   Zusammenhaenge zeichnet dieses Theme, statt sie zu bebildern.

   Zweite Fassung. Vorher hingen alle fuenf Bereiche als gleich grosse
   Kacheln nebeneinander, Account Management an vierter Stelle. Das ist
   falsch: die anderen vier sind Arbeiten mit Anfang und Ende, das Account
   Management laeuft vom ersten Tag bis zum letzten durch. Es steht deshalb
   als durchgehendes Band unter den vier Kacheln und nicht mehr neben ihnen.

   Bei prefers-reduced-motion steht alles sofort im Endzustand.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Die vier Kurzformen und die drei Zeilen dieser Grafik stehen im
   Woerterbuch unter `fullService.zusammenlauf`. Kurzformen, weil die Kacheln
   rund achtzig Pixel breit sind; der fuenfte Bereich traegt unten seinen
   vollen Namen. Das weiche Trennzeichen in „Produktbilder" gehoert dazu:
   ohne es steht dort „Produktbil" ueber „der", ohne Bindestrich. */

/** Die kleinen Balken im Kopf der Platte. Anteile, keine Werte. */
const balken = [0.34, 0.42, 0.38, 0.55, 0.62, 0.58, 0.74, 0.88];

export function Zusammenlauf({ w }: { w: Woerterbuch["fullService"]["zusammenlauf"] }) {
  const bereiche = w.bereiche;
  const ref = useRef<HTMLDivElement>(null);
  const drin = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const zeigen = reduce || drin;

  return (
    <div ref={ref} className="panel relative overflow-hidden p-6 md:p-7">
      <span aria-hidden className="halo -right-14 -top-16 h-56 w-56 opacity-70" />

      {/* Die gemeinsame Quelle */}
      <div className="relative">
        <span className="inline-flex items-center gap-2.5">
          <span aria-hidden className="node-glow" />
          <span className="text-label font-bold uppercase text-ink-soft">Eine Auswertung</span>
        </span>

        <div className="mt-4 rounded-[1.25rem] bg-canvas-tint p-4 shadow-[inset_0_0_0_1px_rgba(13,36,57,0.06)]">
          <div className="flex items-end gap-1.5" style={{ height: "3.5rem" }}>
            {balken.map((v, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-[3px]"
                style={{
                  background: i === balken.length - 1 ? "#FF9900" : "rgba(43,108,176,0.28)",
                  height: reduce ? `${v * 100}%` : undefined,
                }}
                initial={reduce ? undefined : { height: 0 }}
                animate={zeigen ? { height: `${v * 100}%` } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
              />
            ))}
          </div>
          <div className="mt-3 border-t border-ink/[0.07] pt-3">
            <span className="text-[0.78rem] font-bold text-ink">{w.quelle}</span>
          </div>
        </div>
      </div>

      {/* Die Verbindungen: leuchten nacheinander auf, von der Quelle nach unten */}
      <div className="relative mt-1 grid grid-cols-4 gap-2">
        {bereiche.map((_, i) => (
          <div key={i} className="flex justify-center">
            <motion.span
              aria-hidden
              className="link-glow-v block"
              style={{ height: "1.6rem" }}
              initial={reduce ? undefined : { opacity: 0, scaleY: 0 }}
              animate={zeigen ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.09, ease: EASE }}
            />
          </div>
        ))}
      </div>

      {/* Die vier Bereiche mit Anfang und Ende */}
      <div className="relative grid grid-cols-4 gap-2">
        {bereiche.map((b, i) => (
          <motion.div
            key={b}
            className="rounded-[0.9rem] bg-white px-1.5 py-3 text-center shadow-[inset_0_0_0_1px_rgba(13,36,57,0.07),0_10px_20px_-14px_rgba(13,36,57,0.35)]"
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            animate={zeigen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.8 + i * 0.09, ease: EASE }}
          >
            <span className="block text-[0.72rem] font-bold leading-tight text-ink [hyphens:auto] break-words">{b}</span>
          </motion.div>
        ))}
      </div>

      {/* Das Fundament: laeuft unter allen vieren durch, vom ersten Tag an.
          Deshalb eine durchgehende Flaeche ueber die volle Breite und keine
          fuenfte Kachel: eine Kachel neben den anderen sagt „danach kommt
          noch das", und genau das stimmt nicht. */}
      <motion.div
        className="relative mt-2.5 flex items-center justify-between gap-3 overflow-hidden rounded-[0.9rem] px-3.5 py-3"
        style={{ background: "linear-gradient(100deg, #0D2439 0%, #17405F 100%)" }}
        initial={reduce ? undefined : { opacity: 0, y: 8 }}
        animate={zeigen ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
      >
        {/* Ein Strich, der von links nach rechts durchlaeuft: das Band hat
            keinen Anfang und kein Ende in der Grafik. */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left"
          style={{ background: "linear-gradient(90deg, rgba(255,153,0,0), #FF9900 30%, #FF9900 70%, rgba(255,153,0,0))" }}
          initial={reduce ? undefined : { scaleX: 0 }}
          animate={zeigen ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
        />
        <span className="min-w-0">
          <span className="block text-[0.72rem] font-bold leading-tight text-white">{w.band}</span>
          <span className="mt-0.5 block text-[0.68rem] font-bold uppercase tracking-[0.08em] text-chalk-muted">
            {w.bandZeile}
          </span>
        </span>
        <span aria-hidden className="shrink-0 text-brand-400">
          <svg width="34" height="10" viewBox="0 0 34 10" fill="none">
            <path
              d="M1 5h28m0 0l-4-3.5M29 5l-4 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </motion.div>
    </div>
  );
}
