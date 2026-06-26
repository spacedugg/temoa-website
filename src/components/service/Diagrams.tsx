"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* Schematic, claim-free diagrams that illustrate a mechanism.
   Relative widths only, no invented numbers. */

/** Rollout visual: one proven home market expands to several marketplaces. */
export function MarketRollout() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const targets = ["FR", "IT", "ES", "NL", "US", "UK"];
  return (
    <div ref={ref} className="surface p-6 md:p-7">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        <span className="text-xs font-bold uppercase tracking-[0.13em] text-ink-soft">Ein Setup, mehrere Marktplätze</span>
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-2xl p-4 text-white shadow-lift" style={{ backgroundImage: "var(--brand-gradient)" }}>
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/20 text-lg font-extrabold ring-1 ring-white/30">DE</span>
        <div>
          <div className="text-sm font-extrabold">Heimatmarkt</div>
          <div className="text-xs text-white/85">Erprobtes Setup, das verkauft</div>
        </div>
      </div>

      <div className="flex justify-center py-3 text-ink-faint">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 4v14m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {targets.map((t, i) => (
          <motion.div
            key={t}
            className="rounded-xl bg-navy/[0.04] py-3 text-center text-sm font-extrabold text-ink ring-1 ring-black/[0.05]"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
          >
            {t}
          </motion.div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-ink-faint">
        Erprobtes Setup als Basis, je Markt lokalisiert: eigene Keywords, eigener Content, eigene Kampagnen.
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
