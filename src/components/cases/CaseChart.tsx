"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ChartPoint } from "@/lib/cases";

/** Revenue (area) + TACoS (line) on independent scales, draws on view. */
export function CaseChart({ points, accent }: { points: ChartPoint[]; accent: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const W = 760;
  const H = 280;
  const padX = 28;
  const padTop = 24;
  const padBottom = 40;

  const revs = points.map((p) => p.revenueEur);
  const maxRev = Math.max(...revs);
  const tacos = points.map((p) => p.tacosPct ?? 0);
  const maxT = Math.max(...tacos) * 1.15 || 1;

  const stepX = (W - padX * 2) / (points.length - 1);
  const x = (i: number) => padX + i * stepX;
  const yRev = (v: number) => padTop + (1 - v / maxRev) * (H - padTop - padBottom);
  const yT = (v: number) => padTop + (1 - v / maxT) * (H - padTop - padBottom);

  const revLine = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${yRev(p.revenueEur).toFixed(1)}`).join(" ");
  const revArea = `${revLine} L${x(points.length - 1).toFixed(1)},${H - padBottom} L${padX},${H - padBottom} Z`;
  const tLine = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${yT(p.tacosPct ?? 0).toFixed(1)}`)
    .join(" ");

  const labelEvery = Math.ceil(points.length / 8);

  return (
    <div ref={ref} className="surface p-5 md:p-7">
      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-ink-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-4 rounded-sm" style={{ background: accent }} />
          Umsatz pro Monat
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4 rounded-sm bg-navy" />
          TACoS
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Umsatz- und TACoS-Verlauf">
        <defs>
          <linearGradient id={`rev-${accent.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* baseline */}
        <line x1={padX} y1={H - padBottom} x2={W - padX} y2={H - padBottom} stroke="rgba(2,48,71,0.12)" strokeWidth="1" />

        {/* revenue area + line */}
        <motion.path
          d={revArea}
          fill={`url(#rev-${accent.replace("#", "")})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.path
          d={revLine}
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        {/* tacos line */}
        <motion.path
          d={tLine}
          fill="none"
          stroke="#0A1E2B"
          strokeWidth="2"
          strokeDasharray="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
        />

        {/* annotations */}
        {points.map((p, i) =>
          p.annotation ? (
            <g key={i}>
              <circle cx={x(i)} cy={yRev(p.revenueEur)} r="4" fill={accent} />
            </g>
          ) : null
        )}

        {/* x labels */}
        {points.map((p, i) =>
          i % labelEvery === 0 ? (
            <text key={i} x={x(i)} y={H - padBottom + 18} textAnchor="middle" className="fill-ink-faint" style={{ fontSize: 11 }}>
              {p.label}
            </text>
          ) : null
        )}
      </svg>

      {points.some((p) => p.annotation) && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-faint">
          {points
            .filter((p) => p.annotation)
            .map((p) => (
              <span key={p.label} className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                {p.label}: {p.annotation}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
