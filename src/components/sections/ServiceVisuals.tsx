"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { BrowserFrame, KpiTile, BarsCard, Orbit, GlassCard } from "../ui/MockKit";
import { Icon } from "../ui/Icon";
import { Listing3D } from "./Listing3D";

/* =====================================================================
   Hero-Visuals je Leistungsseite — premium, Amazon-Style (Navy/Orange/Rot/Gelb).
   Eingesetzt im PageHero der /leistungen/[slug]-Seiten.
   ===================================================================== */

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/* schwebende Karte (Float + Reveal) */
function FloatCard({ className, children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  return (
    <motion.div
      className={`absolute z-20 ${className ?? ""}`}
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, ease }}
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5 + delay * 3, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* Trend-Pill (CVR ↑ etc.) */
function Pill({ label, dir }: { label: string; dir: "up" | "down" }) {
  const up = dir === "up";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink shadow-lift ring-1 ring-navy/[0.06]">
      {label}
      <span className="flex h-5 w-5 items-center justify-center rounded" style={{ background: up ? "rgba(14,124,160,0.14)" : "rgba(225,20,20,0.12)", color: up ? "#0E7CA0" : "#E11414" }}>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className={up ? "" : "rotate-180"}><path d="M6 2v8M3 5l3-3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </span>
  );
}

/* Status-Marker fürs Keyword-Harvesting */
function Status({ s }: { s: "win" | "cut" | "boost" }) {
  const map = { win: { bg: "rgba(14,124,160,0.12)", fg: "#0E7CA0" }, cut: { bg: "rgba(225,20,20,0.10)", fg: "#E11414" }, boost: { bg: "rgba(255,153,0,0.16)", fg: "#F08400" } } as const;
  const { bg, fg } = map[s];
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: bg, color: fg }}>
      {s === "win" && <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7" /></svg>}
      {s === "cut" && <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>}
      {s === "boost" && <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>}
    </span>
  );
}

/* ---------- Strategie: Benchmark eure Marke vs. Kategorie ---------- */
export function BenchmarkBoard() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-3xl border border-navy/[0.08] bg-gradient-to-br from-white to-canvas-alt p-8 shadow-lift">
        <div className="relative flex h-60 items-end justify-center gap-10">
          <div className="absolute inset-x-4 top-[30%] z-10 border-t-2 border-dashed border-ink/25" />
          <div className="flex w-28 flex-col items-center">
            <motion.div initial={{ height: 0 }} whileInView={{ height: "92%" }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="w-full rounded-t-2xl" style={{ background: "linear-gradient(180deg,#FFB033,#FF9900)" }} />
            <span className="mt-3 text-sm font-bold text-ink">Eure Marke</span>
          </div>
          <div className="flex w-28 flex-col items-center">
            <motion.div initial={{ height: 0 }} whileInView={{ height: "54%" }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease }} className="w-full rounded-t-2xl" style={{ background: "linear-gradient(180deg,#FF6B5E,#FF3131)" }} />
            <span className="mt-3 text-center text-sm font-semibold text-ink-muted">Kategorie-Top</span>
          </div>
        </div>
      </div>
      <FloatCard className="-left-3 top-10" delay={0.25}><Pill label="CVR" dir="up" /></FloatCard>
      <FloatCard className="-right-3 top-1/4" delay={0.45}><Pill label="Share of Voice" dir="down" /></FloatCard>
      <FloatCard className="-right-2 -bottom-3" delay={0.6}>
        <GlassCard className="p-3">
          <div className="flex h-12 items-end gap-1.5">{[44, 28, 56, 36, 48].map((v, i) => <div key={i} className="w-2 rounded-full" style={{ height: `${v}%`, background: i % 2 ? "#FF3131" : "#FF9900" }} />)}</div>
        </GlassCard>
      </FloatCard>
    </div>
  );
}

/* ---------- Listing & SEO: 3D-Listing + schwebende Kennzahl ---------- */
export function ListingHero() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <Listing3D />
      <FloatCard className="right-0 top-4" delay={0.7}>
        <GlassCard className="px-4 py-3">
          <div className="text-[11px] font-medium text-ink-muted">Product Sales</div>
          <div className="text-xl font-extrabold text-emerald-deep">+198 %</div>
        </GlassCard>
      </FloatCard>
    </div>
  );
}

/* ---------- PPC: Werbe-Cockpit (Anteil, Platzierungen, Suchbegriffe, Funnel) ---------- */
export function OpsBoard() {
  const terms = [{ s: "win", w: "w-3/4" }, { s: "win", w: "w-2/3" }, { s: "cut", w: "w-1/2" }, { s: "boost", w: "w-3/5" }] as const;
  const funnel = [{ w: "100%", c: "#FF9900", l: "Impressionen" }, { w: "62%", c: "#FF3131", l: "Klicks" }, { w: "36%", c: "#FFC233", l: "Käufe" }];
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="grid grid-cols-2 gap-4 rounded-3xl border border-navy/[0.08] bg-canvas-alt/70 p-4 shadow-lift sm:p-5">
        <div className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="mb-3 text-sm font-semibold text-ink">Anteil profitabel</div>
          <div className="relative mx-auto h-24 w-24 rounded-full" style={{ background: "conic-gradient(#FF9900 0 78%, #FFE2BE 78% 100%)" }}>
            <div className="absolute inset-[24%] flex items-center justify-center rounded-full bg-white text-sm font-extrabold text-ink">78 %</div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="mb-3 text-sm font-semibold text-ink">Platzierungen</div>
          <div className="flex h-24 items-end gap-1.5">
            {[60, 40, 72, 52, 84, 46, 68, 90, 58, 76].map((v, i) => (
              <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${v}%` }} viewport={{ once: true }} transition={{ delay: i * 0.04, ease }} className="flex-1 rounded-t" style={{ background: ["#FF9900", "#FF3131", "#FFC233"][i % 3] }} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="mb-3 text-sm font-semibold text-ink">Suchbegriffe</div>
          <div className="space-y-2.5">
            {terms.map((t, i) => (
              <div key={i} className="flex items-center gap-2.5"><Status s={t.s} /><span className={`h-2 rounded-full bg-navy/[0.12] ${t.w}`} /></div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="mb-3 text-sm font-semibold text-ink">Effizienz</div>
          <div className="space-y-2">
            {funnel.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, ease }} className="h-7 origin-left rounded-lg" style={{ width: r.w, background: r.c }} />
                <span className="text-xs text-ink-muted">{r.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FloatCard className="-right-3 -top-3" delay={0.3}><span className="inline-flex rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white shadow-lift">ROAS 4,8×</span></FloatCard>
      <FloatCard className="-left-3 bottom-8" delay={0.5}><span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-deep shadow-lift ring-1 ring-navy/[0.06]">−30 % ACoS</span></FloatCard>
    </div>
  );
}

/* ---------- Account Management: Account-Cockpit ---------- */
export function SellerBoard() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
        <BrowserFrame>
          <div className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-ink">Account-Cockpit</div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-deep"><span className="h-1.5 w-1.5 rounded-full bg-emerald" />live</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <KpiTile label="Buy-Box" value="98 %" delta="stabil" deltaUp values={[88, 92, 95, 97, 98, 98, 99]} color="#0E7CA0" />
              <KpiTile label="TACoS" value="9,4 %" delta="−4,1 %" deltaUp values={[28, 24, 26, 20, 18, 14, 9]} color="#FF9900" />
              <KpiTile label="Reichweite" value="62 Tg" delta="im Soll" deltaUp values={[20, 30, 28, 40, 52, 58, 62]} color="#2A9BD8" />
            </div>
            <BarsCard values={[12, 15, 11, 18, 14, 20, 16]} highlight={5} labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]} peakLabel="Reorder-Punkt" />
          </div>
        </BrowserFrame>
      </motion.div>
      <FloatCard className="-right-4 top-12" delay={0.45}>
        <GlassCard className="px-4 py-3">
          <div className="text-[11px] font-medium text-ink-muted">Account-Health</div>
          <div className="text-lg font-extrabold text-emerald-deep">248 / 1000</div>
        </GlassCard>
      </FloatCard>
    </div>
  );
}

/* ---------- Internationalisierung: 5 Märkte, ein Reporting ---------- */
export function MarketsBoard() {
  const markets = [{ code: "DE", a: -90 }, { code: "FR", a: -18 }, { code: "IT", a: 54 }, { code: "ES", a: 126 }, { code: "NL", a: 198 }];
  return (
    <div className="relative mx-auto w-full max-w-md">
      <Orbit
        center={
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-brand-700">
            <Icon name="globe" size={26} />
            <span className="mt-1 text-[10px] font-bold leading-tight">1 Reporting</span>
          </div>
        }
        items={markets.map((m, i) => ({
          node: <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-navy/[0.08] bg-white text-sm font-bold text-ink shadow-lift">{m.code}</div>,
          angle: m.a,
          radius: i % 2 ? 52 : 38,
        }))}
      />
    </div>
  );
}

export function ServiceHero({ slug }: { slug: string }) {
  switch (slug) {
    case "strategie": return <BenchmarkBoard />;
    case "listing-seo": return <ListingHero />;
    case "ppc-advertising": return <OpsBoard />;
    case "account-management": return <SellerBoard />;
    case "internationalisierung": return <MarketsBoard />;
    default: return null;
  }
}
