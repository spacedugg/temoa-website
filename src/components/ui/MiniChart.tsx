"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/** Animated area + line chart (SVG), draws itself on view. */
export function AreaChart({
  className,
  stroke = "#FF9900",
  fill = "rgba(255,153,0,0.16)",
  points = [38, 34, 40, 30, 44, 36, 50, 46, 58, 54, 70, 78],
  height = 120,
  width = 320,
}: {
  className?: string;
  stroke?: string;
  fill?: string;
  points?: number[];
  height?: number;
  width?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * (height - 16) - 8;
    return [x, y] as const;
  });

  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g-${stroke}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#g-${stroke})`}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      {coords.map(([x, y], i) =>
        i === coords.length - 1 ? (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="4.5"
            fill={stroke}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 1.2, type: "spring" }}
          />
        ) : null
      )}
    </svg>
  );
}

/** Animated vertical bars. */
export function BarChart({
  values = [40, 55, 48, 70, 62, 85, 78, 96],
  className,
  highlight = 5,
  colorHighlight = "#FF3131",
  color = "rgba(255,153,0,0.35)",
}: {
  values?: number[];
  className?: string;
  highlight?: number;
  colorHighlight?: string;
  color?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const max = Math.max(...values);
  return (
    <div ref={ref} className={`flex items-end gap-2 ${className ?? ""}`}>
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md"
          style={{ background: i === highlight ? colorHighlight : color }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${(v / max) * 100}%` } : {}}
          transition={{ duration: 0.7, delay: i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      ))}
    </div>
  );
}

/** Animated radial progress ring. */
export function Ring({
  value,
  size = 96,
  stroke = 9,
  color = "#FF9900",
  label,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(2,48,71,0.10)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={inView ? { strokeDashoffset: c - (value / 100) * c } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold text-ink">{value}%</span>
        {label && <span className="text-[10px] font-medium text-ink-faint">{label}</span>}
      </div>
    </div>
  );
}
