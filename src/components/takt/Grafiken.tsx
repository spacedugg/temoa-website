"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Grafiken der Seite, direkt gezeichnet.
 *
 * Keine gerenderten Bilder, kein Icon-Gewimmel. Dünne Linien, viel Fläche,
 * genau ein Orange. Alles skaliert verlustfrei und wiegt wenige Kilobyte.
 *
 * Farben kommen aus dem Tokensatz:
 *   Ink #0A1E2B · Linie #C9D4DB · Orange #FF9900 · Papier #FFFFFF
 */

const EASE = [0.32, 0.72, 0, 1] as const;

/* ============================================================
   Listing-Szene, Kopfbereich.
   Ein Listing als Karte, dahinter die organische Kurve. Die Aussage
   der Seite in ihrer einfachsten Form.
   ============================================================ */
export function ListingSzene() {
  const reduce = useReducedMotion();

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: { duration: 1.4, delay, ease: EASE },
        };

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <svg viewBox="0 0 500 400" className="h-auto w-full" role="img" aria-label="Ein Amazon-Listing mit steigender organischer Kurve">
      {/* Kurve hinter der Karte */}
      <motion.path
        {...draw(0.35)}
        d="M40 330 C 130 322, 190 300, 250 250 S 380 130, 470 70"
        fill="none"
        stroke="#FF9900"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[
        [250, 250],
        [360, 158],
        [470, 70],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={cx}
          {...fade(0.9 + i * 0.12)}
          cx={cx}
          cy={cy}
          r="4.5"
          fill="#FFFFFF"
          stroke="#FF9900"
          strokeWidth="2"
        />
      ))}

      {/* zweite Karte als Tiefenandeutung */}
      <motion.rect
        {...fade(0.12)}
        x="52"
        y="52"
        width="230"
        height="286"
        rx="16"
        fill="#FFFFFF"
        stroke="#E4EAEE"
        strokeWidth="1.5"
      />

      {/* Listing-Karte */}
      <motion.g {...fade(0.05)}>
        <rect x="36" y="36" width="230" height="286" rx="16" fill="#FFFFFF" stroke="#C9D4DB" strokeWidth="1.5" />
        {/* Produktbild */}
        <rect x="56" y="56" width="190" height="140" rx="10" fill="#F1F5F7" />
        {/* Titelzeilen */}
        <rect x="56" y="214" width="150" height="8" rx="4" fill="#DCE4E9" />
        <rect x="56" y="232" width="108" height="8" rx="4" fill="#DCE4E9" />
        {/* Preis */}
        <rect x="56" y="262" width="54" height="12" rx="6" fill="#0A1E2B" />
        {/* Aktion */}
        <rect x="56" y="288" width="120" height="18" rx="9" fill="#FF9900" />
      </motion.g>

      {/* Marke: das Listing sitzt auf einer Grundlinie */}
      <motion.line
        {...draw(0.2)}
        x1="20"
        y1="356"
        x2="480"
        y2="356"
        stroke="#E4EAEE"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============================================================
   Takt-Szene, Station 02.
   Vier Stufen, eine durchlaufende Linie. Die Linie zeichnet sich beim
   Scrollen. Beschriftung liefert die Sektion darunter, hier steht keine.
   ============================================================ */
export function TaktSzene() {
  const reduce = useReducedMotion();
  const stops = [
    { x: 120, y: 200 },
    { x: 400, y: 168 },
    { x: 680, y: 128 },
    { x: 960, y: 72 },
  ];

  return (
    <svg viewBox="0 0 1120 260" className="h-auto w-full" role="img" aria-label="Vier Stufen von Sichtbarkeit über Klickrate und Conversion zum Ergebnis">
      {/* Grundlinie */}
      <line x1="40" y1="228" x2="1080" y2="228" stroke="#1F3846" strokeWidth="1.5" strokeLinecap="round" />

      {/* Stufenpodeste */}
      {stops.map((s, i) => (
        <motion.g
          key={s.x}
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: EASE }}
        >
          <line x1={s.x} y1={s.y} x2={s.x} y2="228" stroke="#1F3846" strokeWidth="1.5" />
          <rect x={s.x - 54} y={s.y - 14} width="108" height="28" rx="14" fill={i === 3 ? "#FF9900" : "#0F2632"} stroke={i === 3 ? "#FF9900" : "#1F3846"} strokeWidth="1.5" />
        </motion.g>
      ))}

      {/* durchlaufende Linie */}
      <motion.path
        initial={reduce ? undefined : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
        d="M120 200 L400 168 L680 128 L960 72 L1064 52"
        fill="none"
        stroke="#FF9900"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pfeilspitze am Ende */}
      <motion.path
        initial={reduce ? undefined : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.5, delay: 1.6 }}
        d="M1046 44 L1068 51 L1052 66"
        fill="none"
        stroke="#FF9900"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
