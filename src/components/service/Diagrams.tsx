"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* Schematic, claim-free diagrams that illustrate a mechanism.
   Relative widths only, no invented numbers. */

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
