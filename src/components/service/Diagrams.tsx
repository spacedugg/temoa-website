"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        <span className="text-xs font-bold uppercase tracking-[0.13em] text-ink-soft">Jeder Marktplatz, die komplette Arbeit</span>
      </div>

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

function Track({
  label,
  segments,
  delay = 0,
}: {
  label: string;
  segments: { w: string; color: string; text?: string; light?: boolean }[];
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <div ref={ref}>
      <span className="text-xs font-bold uppercase tracking-[0.13em] text-ink-faint">{label}</span>
      <div className="mt-2 flex h-12 w-full overflow-hidden rounded-xl ring-1 ring-black/[0.05]">
        {segments.map((s, i) => (
          <motion.div
            key={i}
            className={`flex items-center justify-center px-2 text-[11px] font-semibold ${s.light ? "text-ink-muted" : "text-white"}`}
            style={{ background: s.color }}
            initial={{ width: 0 }}
            animate={inView ? { width: s.w } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="truncate">{s.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function BudgetSplitDiagram() {
  return (
    <div className="surface p-6 md:p-7">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        <span className="text-xs font-bold uppercase tracking-[0.13em] text-ink-soft">Wohin das Budget fließt</span>
      </div>
      <div className="mt-6 space-y-6">
        <Track
          label="Ohne Steuerung"
          segments={[
            { w: "68%", color: "linear-gradient(135deg,#FF6B5E,#E11414)", text: "Streuverlust" },
            { w: "32%", color: "linear-gradient(135deg,#FF9900,#FF6B1F)", text: "Profit" },
          ]}
        />
        <Track
          label="Mit sauberer Struktur"
          delay={0.25}
          segments={[
            { w: "76%", color: "linear-gradient(135deg,#FF9900,#FF6B1F)", text: "Profit" },
            { w: "24%", color: "#E6EDF3", text: "Test", light: true },
          ]}
        />
      </div>
      <p className="mt-6 text-xs leading-relaxed text-ink-faint">
        Schematische Darstellung. Dasselbe Budget, sauber strukturiert: weniger Streuverlust, mehr Anteil auf
        Suchbegriffen, die nach allen Kosten Gewinn bringen.
      </p>
    </div>
  );
}
