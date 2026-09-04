"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Die Taktlinie ist die eine inszenierte Bewegung der Seite.
 *
 * Am linken Rand läuft eine Linie mit, die sich beim Scrollen füllt. Sie sagt
 * ohne ein Wort, worum es geht: Diese Seite ist eine Reihenfolge, und ihr seid
 * gerade an einer bestimmten Stelle darin. Bei reduzierter Bewegung bleibt die
 * Linie stehen und dient nur noch als Kante.
 */
export function TaktLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-6 z-30 hidden w-px bg-ink/10 lg:block"
      >
        {!reduce && (
          <motion.div
            style={{ scaleY: fill }}
            className="h-full w-px origin-top bg-brand-500"
          />
        )}
      </div>
      {children}
    </div>
  );
}
