"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/* Impressionsanteil: aufsteigende Balken. */
function BarsViz({ color }: { color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const heights = [34, 48, 58, 76, 100];
  return (
    <div ref={ref} className="flex h-14 items-end gap-2">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-3 rounded-sm"
          style={{ background: i === heights.length - 1 ? color : `${color}55` }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${h}%` } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      ))}
    </div>
  );
}

/* Klickrate: ein Klick mit Cursor und aufploppendem Ring. */
function ClickViz({ color }: { color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref} className="flex h-14 items-center">
      <svg width="64" height="56" viewBox="0 0 64 56" fill="none">
        <motion.circle
          cx="26" cy="22" r="10" stroke={color} strokeWidth="2"
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={inView ? { scale: 1.7, opacity: 0 } : {}}
          transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "26px 22px" }}
        />
        <motion.path
          d="M28 24l16 6-7 2-2 7-7-15Z" fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 }}
          style={{ transformOrigin: "28px 24px" }}
        />
      </svg>
    </div>
  );
}

/* Conversion Rate: ein Kreis, der sich füllt, mit Haken (Kauf erfolgt). */
function ConversionViz({ color }: { color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const C = 2 * Math.PI * 22;
  return (
    <div ref={ref} className="flex h-14 items-center">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="22" stroke={`${color}33`} strokeWidth="4" />
        <motion.circle
          cx="28" cy="28" r="22" stroke={color} strokeWidth="4" strokeLinecap="round"
          transform="rotate(-90 28 28)"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: C * 0.18 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M20 28l6 6 11-12" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </svg>
    </div>
  );
}

const items: { Viz: (p: { color: string }) => React.ReactNode; title: string; body: string; color: string }[] = [
  { Viz: BarsViz, title: "Höherer Impressionsanteil", body: "Sichtbar bei genau den Suchbegriffen, die kaufen.", color: "#FF9900" },
  { Viz: ClickViz, title: "Maximale Klickrate", body: "Das Hauptbild gewinnt den Klick im Suchergebnis.", color: "#FF3131" },
  { Viz: ConversionViz, title: "Conversion Rate Uplift", body: "Die Detailseite überzeugt in Sekunden zum Kauf.", color: "#0E7CA0" },
];

export function ContentResultBand() {
  return (
    <section className="relative bg-white py-12 md:py-16">
      <div className="container-x">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm font-bold uppercase tracking-[0.16em] text-ink-faint">
            Wofür wir Content bauen
          </p>
        </Reveal>
        <RevealGroup className="mx-auto mt-8 grid max-w-5xl items-stretch gap-4 md:grid-cols-3" stagger={0.08}>
          {items.map((it) => (
            <RevealItem key={it.title} className="h-full">
              <div className="surface relative flex h-full flex-col p-6">
                <it.Viz color={it.color} />
                <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{it.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
