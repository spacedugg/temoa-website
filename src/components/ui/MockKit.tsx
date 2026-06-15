"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/* =====================================================================
   TEMOA Visual Kit — wiederverwendbare, light-mode Mock-/Diagramm-Bausteine.
   Statt überall dieselbe steigende Kurve: gemischte, hochwertige Visuals.
   ===================================================================== */

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/* ---------- helpers ---------- */
function linePath(values: number[], w: number, h: number, pad = 4) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const step = (w - pad * 2) / (values.length - 1);
  return values
    .map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - ((v - min) / span) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

/* ---------- Sparkline ---------- */
export function Sparkline({
  values,
  color = "#0E7CA0",
  className,
  area = true,
}: {
  values: number[];
  color?: string;
  className?: string;
  area?: boolean;
}) {
  const w = 120;
  const h = 40;
  const d = linePath(values, w, h);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" fill="none">
      {area && (
        <motion.path
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          d={`${d} L${w - 4} ${h} L4 ${h} Z`}
          fill={color}
          fillOpacity={0.1}
        />
      )}
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
        d={d}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- KPI Tile (Dashboard-Kachel) ---------- */
export function KpiTile({
  label,
  value,
  delta,
  deltaUp = true,
  color = "#0E7CA0",
  values = [12, 18, 14, 22, 19, 28, 34],
  icon,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
  color?: string;
  values?: number[];
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-navy/[0.07] bg-white p-4 shadow-soft ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
          {icon}
          {label}
        </span>
        {delta && (
          <span
            className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold"
            style={{ color: deltaUp ? "#0E7CA0" : "#E11414", background: deltaUp ? "rgba(14,124,160,0.1)" : "rgba(225,20,20,0.08)" }}
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" className={deltaUp ? "" : "rotate-90"}>
              <path d="M3 9l4-4 2 2 0-3-3 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {delta}
          </span>
        )}
      </div>
      <div className="mt-1.5 text-2xl font-extrabold tracking-tight text-ink">{value}</div>
      <Sparkline values={values} color={color} className="mt-2 h-9 w-full" />
    </div>
  );
}

/* ---------- Donut (Verteilung mit Legende) ---------- */
export function Donut({
  segments,
  centerValue,
  centerLabel,
  className,
}: {
  segments: { label: string; value: number; color: string; delta?: string; deltaUp?: boolean }[];
  centerValue: string;
  centerLabel?: string;
  className?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 42;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className={`rounded-2xl border border-navy/[0.07] bg-white p-5 shadow-soft ${className ?? ""}`}>
      <div className="flex items-center gap-5">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={r} fill="none" stroke="#EEF1F0" strokeWidth="12" />
            {segments.map((s) => {
              const len = (s.value / total) * c;
              const el = (
                <motion.circle
                  key={s.label}
                  cx="50"
                  cy="50"
                  r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${len} ${c - len}`}
                  initial={{ strokeDashoffset: -offset, opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ strokeDashoffset: -offset }}
                />
              );
              offset += len;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-lg font-extrabold leading-none text-ink">{centerValue}</span>
            {centerLabel && <span className="mt-0.5 text-[10px] text-ink-faint">{centerLabel}</span>}
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
              <span className="flex-1 text-ink-muted">{s.label}</span>
              <span className="font-semibold text-ink">{Math.round((s.value / total) * 100)}%</span>
              {s.delta && (
                <span className="text-[11px] font-semibold" style={{ color: s.deltaUp ? "#0E7CA0" : "#E11414" }}>
                  {s.delta}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Bars card with highlighted peak ---------- */
export function BarsCard({
  values,
  highlight,
  labels,
  peakLabel,
  className,
}: {
  values: number[];
  highlight: number;
  labels?: string[];
  peakLabel?: string;
  className?: string;
}) {
  const max = Math.max(...values);
  return (
    <div className={`rounded-2xl border border-navy/[0.07] bg-white p-5 shadow-soft ${className ?? ""}`}>
      <div className="flex h-32 items-end gap-2">
        {values.map((v, i) => {
          const isHi = i === highlight;
          return (
            <div key={i} className="relative flex flex-1 flex-col items-center justify-end">
              {isHi && peakLabel && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-1 whitespace-nowrap rounded-md bg-ink px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-soft"
                >
                  {peakLabel}
                </motion.span>
              )}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(v / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.06, ease }}
                className="w-full rounded-md"
                style={{
                  background: isHi ? "var(--brand-gradient)" : "#E8ECEA",
                  boxShadow: isHi ? "0 8px 18px -6px rgba(255,107,31,0.5)" : undefined,
                }}
              />
            </div>
          );
        })}
      </div>
      {labels && (
        <div className="mt-2 flex gap-2">
          {labels.map((l, i) => (
            <span key={i} className="flex-1 text-center text-[10px] text-ink-faint">{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Orbit (zentrale Node + Items auf gestrichelten Ringen) ---------- */
export function Orbit({
  center,
  items,
  className,
}: {
  center: ReactNode;
  items: { node: ReactNode; angle: number; radius: number }[];
  className?: string;
}) {
  return (
    <div className={`relative aspect-square w-full ${className ?? ""}`}>
      {[34, 50].map((r) => (
        <div
          key={r}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-navy/15"
          style={{ width: `${r * 2}%`, height: `${r * 2}%` }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        {center}
      </motion.div>
      {items.map((it, i) => {
        const rad = (it.angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * it.radius;
        const y = 50 + Math.sin(rad) * it.radius;
        return (
          <motion.div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
          >
            {it.node}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- NodeFlow (Prozess als verbundene Nodes) ---------- */
export function NodeFlow({
  steps,
  metric,
  className,
}: {
  steps: { label: string; icon?: ReactNode; color?: string }[];
  metric?: { value: string; label: string };
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-navy/[0.07] bg-white p-5 shadow-soft ${className ?? ""}`}>
      <div className="relative flex items-center justify-between gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="relative z-10 flex flex-1 flex-col items-center gap-2 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 240, damping: 16 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-soft"
              style={{ background: s.color ?? "var(--brand-gradient)" }}
            >
              {s.icon}
            </motion.div>
            <span className="text-[11px] font-medium leading-tight text-ink-muted">{s.label}</span>
          </div>
        ))}
        {/* connecting line */}
        <div className="absolute left-[12%] right-[12%] top-[22px] -z-0 h-px">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="h-full origin-left bg-gradient-to-r from-brand-300 via-brand-400 to-emerald"
          />
        </div>
      </div>
      {metric && (
        <div className="mt-5 flex items-baseline gap-2 border-t border-navy/[0.06] pt-4">
          <span className="text-2xl font-extrabold tracking-tight text-ink">{metric.value}</span>
          <span className="text-xs text-ink-faint">{metric.label}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- GradientTile (farbige Hinterlegung für schwebende Snippets) ---------- */
const gradients: Record<string, string> = {
  brand: "linear-gradient(135deg, #FFF3DF 0%, #FFE2BE 45%, #FFD0E4 100%)",
  emerald: "linear-gradient(135deg, #E6F4FA 0%, #CDE6F4 50%, #E9F7FF 100%)",
  warm: "linear-gradient(135deg, #FFF6E8 0%, #FFE9D2 50%, #FFDCE6 100%)",
  cool: "linear-gradient(135deg, #EEF1FF 0%, #E3ECFF 50%, #F3E8FF 100%)",
};
export function GradientTile({
  children,
  variant = "brand",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof gradients;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl p-6 ${className ?? ""}`}
      style={{ background: gradients[variant] }}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
      {children}
    </div>
  );
}

/* ---------- FloatingProduct (freischwebendes Produkt aus der Blob-Bibliothek) ---------- */
export function FloatingProduct({
  src,
  alt,
  className,
  size = 280,
}: {
  src: string;
  alt: string;
  className?: string;
  size?: number;
}) {
  return (
    <motion.div
      className={`relative ${className ?? ""}`}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute bottom-2 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-full bg-navy/20 blur-xl" />
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="relative w-full select-none object-contain drop-shadow-[0_25px_45px_rgba(2,48,71,0.22)]"
        draggable={false}
      />
    </motion.div>
  );
}

/* ---------- BrowserFrame (heller Chrome-Rahmen) ---------- */
export function BrowserFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-navy/[0.08] bg-white shadow-lift ${className ?? ""}`}>
      <div className="flex items-center gap-1.5 border-b border-navy/[0.06] bg-canvas-alt px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
        <span className="ml-3 h-4 flex-1 rounded-md bg-navy/[0.05]" />
      </div>
      {children}
    </div>
  );
}

/* ---------- Avatar bubble (für Orbits/Collab) ---------- */
export function Bubble({ children, color = "#FF9900", className }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full text-white shadow-lift ${className ?? ""}`}
      style={{ background: color }}
    >
      {children}
    </div>
  );
}
