"use client";

import { motion } from "framer-motion";
import { KpiTile, Donut, BarsCard, Orbit, Sparkline } from "../ui/MockKit";
import { Icon } from "../ui/Icon";

/* =====================================================================
   Premium Amazon-Style Mock-Visuals (Code, light-mode, Orange/Navy).
   Eingesetzt in Blocks "rows" über das Feld `visual`.
   ===================================================================== */

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-navy/[0.08] bg-gradient-to-br from-white to-canvas-alt p-6 shadow-lift">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Chip({ label, dir }: { label: string; dir?: "up" | "down" }) {
  const up = dir !== "down";
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink shadow-soft ring-1 ring-navy/[0.06]">
      {label}
      {dir && (
        <span className="flex h-4 w-4 items-center justify-center rounded" style={{ background: up ? "rgba(14,124,160,0.12)" : "rgba(225,20,20,0.1)", color: up ? "#0E7CA0" : "#E11414" }}>
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" className={up ? "" : "rotate-180"}><path d="M6 2v8M3 5l3-3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      )}
    </span>
  );
}

/* Benchmark — Deine Marke vs Kategorie, mit Schwellen-Linie */
function Benchmark() {
  return (
    <Frame>
      <div className="relative flex h-56 items-end justify-center gap-8 px-4">
        <div className="absolute left-2 right-2 top-[34%] z-10 border-t-2 border-dashed border-ink/30" />
        <div className="flex w-28 flex-col items-center">
          <motion.div initial={{ height: 0 }} whileInView={{ height: "90%" }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="w-full rounded-t-2xl" style={{ background: "var(--brand-gradient)" }} />
          <span className="mt-2 text-xs font-semibold text-ink">Deine Marke</span>
        </div>
        <div className="flex w-28 flex-col items-center">
          <motion.div initial={{ height: 0 }} whileInView={{ height: "52%" }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease }} className="w-full rounded-t-2xl bg-gradient-to-t from-red/70 to-red" />
          <span className="mt-2 text-center text-xs font-semibold text-ink-muted">Kategorie-Schnitt</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Chip label="CVR" dir="up" />
        <Chip label="Sales" dir="up" />
        <Chip label="Market Share" dir="down" />
      </div>
    </Frame>
  );
}

/* SERP — Amazon-Suchergebnis mit Aufstieg */
function Serp() {
  const rows = [
    { hi: true, w: "w-3/4", stars: 5, price: "29,99 €", badge: "Bestseller" },
    { w: "w-2/3", stars: 4 },
    { w: "w-1/2", stars: 4 },
  ];
  return (
    <Frame>
      <div className="rounded-2xl border border-navy/[0.07] bg-white p-4">
        <div className="flex items-center gap-2 border-b border-navy/[0.06] pb-3">
          <span className="h-3 w-3 rounded-full bg-brand-500" />
          <div className="h-6 flex-1 rounded-md bg-canvas-alt" />
          <span className="rounded bg-emerald/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-deep">#14 → #1</span>
        </div>
        <div className="mt-3 space-y-2.5">
          {rows.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className={`flex items-center gap-3 rounded-xl p-2.5 ${r.hi ? "bg-brand-50 ring-1 ring-brand-200" : ""}`}>
              <div className={`h-11 w-11 shrink-0 rounded-lg ${r.hi ? "bg-white ring-1 ring-brand-200" : "bg-canvas-alt"}`} />
              <div className="min-w-0 flex-1">
                <div className={`h-2.5 rounded-full ${r.hi ? "bg-ink/80" : "bg-navy/[0.12]"} ${r.w}`} />
                <div className="mt-1.5 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s < r.stars ? "#FF9900" : "#E3E7E5"}><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" /></svg>
                  ))}
                  {r.badge && <span className="ml-1 rounded bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold text-white">{r.badge}</span>}
                </div>
              </div>
              {r.price && <span className="shrink-0 text-sm font-bold text-ink">{r.price}</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* Funnel — Effizienz */
function Funnel() {
  const rows = [
    { w: "100%", c: "var(--brand-gradient)", label: "Impressionen" },
    { w: "70%", c: "linear-gradient(90deg,#FF6B5E,#FF3131)", label: "Klicks" },
    { w: "44%", c: "linear-gradient(90deg,#FFC266,#FF9900)", label: "Käufe" },
  ];
  return (
    <Frame>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-4">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12, ease }} className="h-12 origin-left rounded-xl" style={{ width: r.w, background: r.c }} />
            <span className="text-sm font-medium text-ink-muted">{r.label}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* KPI-Cluster */
function Kpis() {
  return (
    <Frame>
      <div className="grid grid-cols-2 gap-3">
        <KpiTile label="Umsatz" value="€1,8M" delta="+31%" deltaUp values={[10, 14, 13, 18, 22, 27, 33]} color="#FF9900" />
        <KpiTile label="TACoS" value="9,4%" delta="−4,1%" deltaUp values={[28, 24, 26, 20, 18, 14, 9]} color="#0E7CA0" />
        <KpiTile label="ROAS" value="4,8×" delta="+0,9" deltaUp values={[12, 14, 16, 19, 22, 26, 30]} color="#FF3131" />
        <KpiTile label="Buy-Box" value="100%" delta="stabil" deltaUp values={[88, 92, 95, 98, 99, 100, 100]} color="#2A9BD8" />
      </div>
    </Frame>
  );
}

/* Dashboard — KPI + Bars */
function Dashboard() {
  return (
    <Frame>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <KpiTile label="Organisch" value="80%" delta="+31%" deltaUp values={[20, 28, 34, 42, 55, 68, 80]} color="#0E7CA0" />
          <KpiTile label="CVR" value="+12,5%" delta="+2,3%" deltaUp values={[8, 10, 9, 12, 14, 16, 19]} color="#FF9900" />
        </div>
        <BarsCard values={[9, 12, 15, 22, 13, 17, 11]} highlight={3} labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]} peakLabel="Peak" />
      </div>
    </Frame>
  );
}

/* Donut */
function DonutVisual() {
  return (
    <Donut
      centerValue="34 %"
      centerLabel="Netto-Marge"
      segments={[
        { label: "Deckungsbeitrag", value: 34, color: "#0E7CA0", delta: "+6,2 %", deltaUp: true },
        { label: "Werbekosten", value: 18, color: "#FF9900" },
        { label: "COGS & Gebühren", value: 48, color: "#E8ECEA" },
      ]}
    />
  );
}

/* Ad-Formate — Sponsored Products vs Brands */
function AdFormats() {
  return (
    <Frame>
      <div className="grid grid-cols-2 gap-3">
        {[
          { t: "Sponsored Products", slots: "inline" },
          { t: "Sponsored Brands", slots: "top" },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-navy/[0.07] bg-white p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
              <div className="h-3 flex-1 rounded bg-canvas-alt" />
            </div>
            {c.slots === "top" && <div className="mb-2 flex gap-1.5">{[0, 1, 2].map((i) => <div key={i} className="h-6 flex-1 rounded bg-brand-300" />)}</div>}
            <div className="space-y-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-4 rounded ${c.slots === "inline" && i === 1 ? "bg-brand-300" : "bg-canvas-alt"}`} />
              ))}
            </div>
            <p className="mt-2 text-center text-[11px] font-semibold text-ink-muted">{c.t}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* Märkte — Orbit */
function Markets() {
  const chips = [
    { code: "DE", angle: -90, radius: 34 },
    { code: "FR", angle: -10, radius: 50 },
    { code: "IT", angle: 60, radius: 34 },
    { code: "ES", angle: 140, radius: 50 },
    { code: "NL", angle: 200, radius: 34 },
  ];
  return (
    <Frame>
      <div className="mx-auto max-w-xs">
        <Orbit
          center={
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-brand-700">
              <Icon name="globe" size={22} />
              <span className="mt-0.5 text-[10px] font-bold">EU</span>
            </div>
          }
          items={chips.map((m) => ({
            node: <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-navy/[0.08] bg-white text-sm font-bold text-ink shadow-lift">{m.code}</div>,
            angle: m.angle,
            radius: m.radius,
          }))}
        />
      </div>
    </Frame>
  );
}

export type VisualName =
  | "benchmark" | "serp" | "funnel" | "kpis" | "dashboard" | "donut" | "adformats" | "markets";

export function RowVisual({ name }: { name: VisualName }) {
  switch (name) {
    case "benchmark": return <Benchmark />;
    case "serp": return <Serp />;
    case "funnel": return <Funnel />;
    case "kpis": return <Kpis />;
    case "dashboard": return <Dashboard />;
    case "donut": return <DonutVisual />;
    case "adformats": return <AdFormats />;
    case "markets": return <Markets />;
  }
}
