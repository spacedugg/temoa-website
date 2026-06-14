"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Ring, BarChart, AreaChart } from "../ui/MiniChart";
import { Counter } from "../ui/Counter";

const pillars = [
  {
    key: "strategie",
    icon: "/icons/strategy.png",
    product: "Strategy Suite",
    label: "Strategie",
    tag: "Analyse, Margen & KPI-Steuerung",
    title: "Wettbewerbs- & Keyword-Analyse",
    metric: "Marktanteil",
    body: "Wir wissen, wer wofür rankt – und zu welchem Preis. So liegt der nächste Hebel offen, statt im Bauchgefühl.",
    tint: "bg-brand-50",
    color: "#FF9900",
    visual: "share",
  },
  {
    key: "content",
    icon: "/icons/content.png",
    product: "Content Studio",
    label: "Content",
    tag: "Bilder, A+, SEO & Brand Store",
    title: "Listing & A+ Content",
    metric: "Retail-ready",
    body: "Bilder, A+ und SEO, die aus Klicks zahlende Käufer machen – optimiert für Rufus, COSMO und A10.",
    tint: "bg-red/[0.08]",
    color: "#FF3131",
    visual: "conversion",
  },
  {
    key: "advertising",
    icon: "/icons/advertising.png",
    product: "Advertising Engine",
    label: "Advertising",
    tag: "PPC, DSP & Sponsored Video",
    title: "PPC Performance",
    metric: "ROAS 4,8×",
    body: "Kampagnen, die profitabel skalieren – Streuverluste runter, Return on Ad Spend rauf.",
    tint: "bg-navy/[0.07]",
    color: "#023047",
    visual: "roas",
  },
  {
    key: "account",
    icon: "/icons/management.png",
    product: "Management Hub",
    label: "Account",
    tag: "Inventar, Buy-Box & Reporting",
    title: "Inventar & Buy-Box",
    metric: "Buy-Box 100 %",
    body: "Forecasting, Buy-Box und Reporting – euer Konto läuft, ohne dass ihr ran müsst.",
    tint: "bg-cyan/[0.10]",
    color: "#2A9BD8",
    visual: "buybox",
  },
];

function PillarVisual({ type }: { type: string }) {
  switch (type) {
    case "share":
      return (
        <div className="space-y-2.5">
          {[
            { n: "TEMOA-Marke", v: 68, c: "#FF9900" },
            { n: "Wettbewerber A", v: 44, c: "rgba(2,48,71,0.18)" },
            { n: "Wettbewerber B", v: 31, c: "rgba(2,48,71,0.18)" },
          ].map((row, i) => (
            <div key={row.n}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-medium text-ink">{row.n}</span>
                <span className="text-ink-faint">{row.v}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-navy/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.v}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.12 }}
                  className="h-full rounded-full"
                  style={{ background: row.c }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    case "conversion":
      return (
        <div className="flex items-center justify-around">
          <Ring value={12} label="CVR +" color="#FF3131" size={104} />
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-500" /> Hauptbild</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red" /> A+ Module</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan" /> SEO-Text</div>
          </div>
        </div>
      );
    case "roas":
      return (
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-ink"><Counter to={4.8} decimals={1} suffix="×" /></span>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">ROAS</span>
          </div>
          <BarChart className="mt-4 h-16" values={[40, 48, 44, 56, 62, 70, 84, 96]} highlight={7} colorHighlight="#FF9900" color="rgba(2,48,71,0.18)" />
        </div>
      );
    case "buybox":
      return (
        <div>
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-ink">Buy-Box · 6 Monate</span>
            <span className="font-bold text-emerald">100 %</span>
          </div>
          <AreaChart className="h-20 w-full" stroke="#2A9BD8" fill="rgba(42,155,216,0.18)" points={[88, 92, 95, 98, 97, 99, 100, 100]} />
        </div>
      );
    default:
      return null;
  }
}

export function FullService() {
  const [active, setActive] = useState(0);

  return (
    <section id="full-service" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Full Service 360°"
          title={
            <>
              Vier Bereiche, <span className="text-gradient">ein System.</span>
            </>
          }
          description="Einzelne Dienstleister lösen immer nur die Hälfte. Bei uns greifen Strategie, Content, Advertising und Betrieb ineinander – mehr als die Summe der Teile."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Tabs */}
          <div className="flex flex-col gap-3">
            {pillars.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.06}>
                <button
                  onClick={() => setActive(i)}
                  className={`group w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active === i
                      ? "border-transparent bg-white shadow-lift"
                      : "border-navy/[0.07] bg-white/40 hover:bg-white/70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${p.tint}`}>
                      <Image src={p.icon} alt={p.product} width={32} height={32} className="h-8 w-8 object-contain" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2">
                        <span className="font-bold text-ink">{p.label}</span>
                        <span className="text-xs font-medium text-brand-600">{p.product}</span>
                      </div>
                      <span className="text-xs text-ink-faint">{p.tag}</span>
                      <AnimatePresence initial={false}>
                        {active === i && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden text-sm text-ink-muted"
                          >
                            <span className="mt-1.5 block">{p.body}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Active panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="card noise relative flex h-full min-h-[20rem] flex-col justify-between overflow-hidden p-8"
              >
                <div
                  className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-50 blur-3xl"
                  style={{ background: pillars[active].color }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <Image src={pillars[active].icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                    <span className="eyebrow !text-ink-muted">{pillars[active].product}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-ink">{pillars[active].title}</h3>
                  <p className="mt-1 text-sm font-semibold text-gradient">{pillars[active].metric}</p>
                  <p className="mt-4 max-w-md leading-relaxed text-ink-muted">{pillars[active].body}</p>
                </div>
                <div className="relative mt-8 rounded-2xl border border-navy/[0.06] bg-white/60 p-5">
                  <PillarVisual type={pillars[active].visual} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
