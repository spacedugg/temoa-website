"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/* ============================================================
   Neigung: das Element kippt leicht zum Zeiger und bekommt einen
   Lichtstreifen, der der Maus folgt.

   Gedacht fuer den Listing-Nachbau im Hero. Der Kunde hat gefragt, wo die
   richtig guten Effekte sind: das ist einer, der nicht albern wirkt, weil
   er nur andeutet, dass die Platte im Raum steht.

   Bei prefers-reduced-motion und auf Zeigergeraeten ohne Hover passiert
   nichts, dann bleibt es eine normale Platte.
   ============================================================ */

export function Neigung({
  children,
  className,
  stark = 5,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximaler Kippwinkel in Grad. */
  stark?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const federung = { stiffness: 180, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [0, 1], [stark, -stark]), federung);
  const rotateY = useSpring(useTransform(x, [0, 1], [-stark, stark]), federung);

  // Der Lichtstreifen wird immer berechnet, damit die Hooks nicht bedingt
  // aufgerufen werden. Gezeichnet wird er nur, wenn Bewegung erlaubt ist.
  const scheinX = useTransform(x, [0, 1], ["0%", "100%"]);
  const scheinY = useTransform(y, [0, 1], ["0%", "100%"]);
  const schein = useMotionTemplate`radial-gradient(520px circle at ${scheinX} ${scheinY}, rgba(255,255,255,0.5), transparent 42%)`;

  function bewegen(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }
  function verlassen() {
    x.set(0.5);
    y.set(0.5);
  }

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={bewegen}
      onMouseLeave={verlassen}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      className={`group/neigung relative ${className ?? ""}`}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover/neigung:opacity-100"
        style={{ background: schein, mixBlendMode: "overlay" }}
      />
    </motion.div>
  );
}
