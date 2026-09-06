"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Der Stempel: eine rote Scheibe mit dem Logo darin, die sich langsam dreht.
   Sie sitzt halb auf dem Bild und halb auf dem Grund und ist das einzige
   bewegte Element der Sektion.

   Vorher: Navy mit umlaufender Schrift „temoa · Amazon Full Service". Der
   Kunde will das Rot aus dem Logo und die vier Formen statt der Schrift.

   Das Rot ist das Logo-Rot #FF3131. Damit die rote Kreisform des Logos auf der
   roten Scheibe nicht verschwindet, liegt das Zeichen auf einer weissen
   Innenscheibe. Bei „Bewegung reduzieren" steht der Stempel still.
   ============================================================ */

export function Stempel({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none select-none ${className ?? ""}`}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        {/* Die Scheibe im Logo-Rot, mit einem feinen Ring nach innen. */}
        <circle cx="60" cy="60" r="58" fill="#FF3131" />
        <circle cx="60" cy="60" r="58" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.55" />
        <circle cx="60" cy="60" r="44" fill="#ffffff" />

        {/* Die vier Formen des Zeichens, aus public/logo/logo-icon.svg.
            Das Zeichen ist 228 breit und 254 hoch, deshalb erst in die Mitte
            schieben, dann skalieren. */}
        <g transform="translate(60 60) scale(0.235) translate(-114 -127)">
          <rect x="0" y="0" width="108" height="108" rx="2" fill="#FF9900" />
          <circle cx="174" cy="54" r="54" fill="#FF3131" />
          <path
            d="M2.25,121.7 L107.6,121.7 C108.8,121.7 109.8,122.7 109.8,123.9 L109.8,200.6 C109.5,223.9 94.6,243.7 74.1,251.2 C68.6,253.1 62.3,254.1 56,254.1 C49.7,254.1 43.8,253 38.3,251.2 C17.6,243.8 2.7,224 2.4,200.6 L2.4,123.9 C2.4,122.7 3.4,121.7 2.25,121.7 Z"
            fill="#023047"
          />
          <path
            d="M176.3,122.9 L226.2,153.6 C227.4,154.3 228.1,155.6 228.1,157 L228.1,218.7 C228.1,220.1 227.4,221.4 226.2,222.1 L176.3,252.9 C175.1,253.6 173.6,253.6 172.5,252.9 L122.6,222.1 C121.4,221.4 120.7,220.1 120.7,218.7 L120.7,157 C120.7,155.6 121.4,154.3 122.6,153.6 L172.5,122.9 C173.6,122.1 175.1,122.1 176.3,122.9 Z"
            fill="#7FC4E8"
          />
        </g>
      </svg>
    </motion.div>
  );
}
