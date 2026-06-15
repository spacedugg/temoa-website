"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { AreaChart } from "../ui/MiniChart";
import { Counter } from "../ui/Counter";
import { CASE_ASSETS } from "@/lib/showcase";

// Metriken aus der Copy – mit den echten Case-Bildern aus der Bibliothek kombiniert.
const meta = [
  {
    sector: "Schädlingsbekämpfung · DE",
    metric: 80,
    suffix: " %",
    metricLabel: "organische Verkäufe im Peak",
    quote: "Zum ersten Mal wächst unser Amazon-Umsatz und die Marge gleichzeitig.",
    points: [30, 32, 38, 35, 44, 52, 60, 72],
    color: "#FF9900",
    fill: "rgba(255,153,0,0.16)",
  },
  {
    sector: "Küche & Haushalt · DE",
    metric: 439,
    prefix: "+",
    suffix: " %",
    metricLabel: "Conversion-Steigerung in 17 Wochen",
    quote: "Wir verkaufen heute überwiegend organisch – Werbung ist Kür, nicht Pflicht.",
    points: [20, 28, 25, 40, 55, 62, 80, 96],
    color: "#FF3131",
    fill: "rgba(255,49,49,0.16)",
  },
  {
    sector: "Garten · DE/IT/FR/ES",
    metric: -35,
    suffix: " %",
    metricLabel: "TACoS – über vier Marktplätze",
    quote: "Ein System, vier Länder – endlich vergleichbare Zahlen und planbares Wachstum.",
    points: [80, 72, 68, 58, 50, 46, 40, 34],
    color: "#0E7CA0",
    fill: "rgba(14,124,160,0.16)",
  },
];

const cases = CASE_ASSETS.filter((c) => c.logo && c.preview)
  .slice(0, 3)
  .map((asset, i) => ({ ...asset, ...meta[i] }));

function CaseCard({ c }: { c: (typeof cases)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card group relative flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-lift">
      {/* preview image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas-alt">
        <Image
          src={c.preview!}
          alt={`${c.label} – Case Study`}
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute left-4 top-4 flex h-12 items-center rounded-xl bg-white/95 px-3 shadow-soft backdrop-blur-sm">
          <div className="relative h-7 w-20">
            <Image src={c.logo!} alt={c.label} fill className="object-contain object-left" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <span className="text-xs font-medium text-ink-faint">{c.sector}</span>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-5xl font-extrabold tracking-tight" style={{ color: c.color }}>
            <Counter to={c.metric} prefix={c.prefix} suffix={c.suffix} />
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-ink-muted">{c.metricLabel}</p>
        <p className="mt-5 flex-1 text-[15px] italic leading-relaxed text-ink">„{c.quote}"</p>

        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          {open ? "Details ausblenden" : "Verlauf ansehen"}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-2xl border border-navy/[0.06] bg-canvas-alt p-4">
                <AreaChart className="h-20 w-full" stroke={c.color} fill={c.fill} points={c.points} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Results() {
  return (
    <section id="ergebnisse" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Ergebnisse"
            title={
              <>
                Echte Zahlen, <span className="text-gradient">echte Marken.</span>
              </>
            }
            description="Kein Wachstum auf dem Papier, sondern messbare Resultate: mehr Umsatz, bessere Marge und ein gesundes Konto – ein System, Organic First."
          />
          <a href="/ergebnisse" className="btn-ghost shrink-0">Alle Cases</a>
        </div>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <RevealItem key={c.id}>
              <CaseCard c={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
