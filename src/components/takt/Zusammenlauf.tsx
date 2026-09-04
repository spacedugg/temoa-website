"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/* ============================================================
   Zusammenlauf: fuenf Bereiche, eine Quelle.

   Stand vorher als leeres Bildfeld auf der Full-Service-Seite. Ein
   generiertes Bild ginge auch, aber die Aussage ist ein Zusammenhang, und
   Zusammenhaenge zeichnet dieses Theme, statt sie zu bebildern. Dazu
   bewegt sich hier etwas: die Verbindungen leuchten nacheinander auf.

   Bei prefers-reduced-motion steht alles sofort im Endzustand.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

const bereiche = ["Strategie", "Content", "Advertising", "Account", "Märkte"];

/** Die kleinen Balken im Kopf der Platte. Anteile, keine Werte. */
const balken = [0.34, 0.42, 0.38, 0.55, 0.62, 0.58, 0.74, 0.88];

export function Zusammenlauf() {
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
          <span className="text-label font-bold uppercase text-ink-soft">Eine Quelle</span>
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
          <div className="mt-3 flex items-center justify-between border-t border-ink/[0.07] pt-3">
            <span className="text-[0.72rem] font-bold text-ink">Umsatz, Marge, TACoS</span>
            <span className="text-[0.68rem] text-ink-faint">täglich aktuell</span>
          </div>
        </div>
      </div>

      {/* Die Verbindungen: leuchten nacheinander auf, von der Quelle nach unten */}
      <div className="relative mt-1 grid grid-cols-5 gap-2">
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

      {/* Die fuenf Bereiche */}
      <div className="relative grid grid-cols-5 gap-2">
        {bereiche.map((b, i) => (
          <motion.div
            key={b}
            className="rounded-[0.9rem] bg-white px-1.5 py-3 text-center shadow-[inset_0_0_0_1px_rgba(13,36,57,0.07),0_10px_20px_-14px_rgba(13,36,57,0.35)]"
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            animate={zeigen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.8 + i * 0.09, ease: EASE }}
          >
            <span className="block text-[0.66rem] font-bold leading-tight text-ink">{b}</span>
          </motion.div>
        ))}
      </div>

      <p className="relative mt-5 border-t border-ink/[0.07] pt-4 text-[0.72rem] leading-relaxed text-ink-faint">
        Kein Bereich rechnet mit eigenen Zahlen. Wer Content macht, sieht dieselbe Marge wie der,
        der die Gebote setzt.
      </p>
    </div>
  );
}
