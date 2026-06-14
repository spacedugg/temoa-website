"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { Aurora } from "../ui/Aurora";
import { AreaChart, BarChart, Ring } from "../ui/MiniChart";
import { Counter } from "../ui/Counter";

const stats = [
  { value: 30, prefix: "+", suffix: " %", label: "mehr Profitabilität", note: "⌀ über alle Marken" },
  { value: 60, suffix: "+", label: "betreute Marken", note: "in 5+ Ländern aktiv" },
  { value: 21, suffix: " Mio €", label: "betreuter Umsatz p. a.", note: "verwaltetes Volumen" },
  { value: 98, suffix: " %", label: "Kundenbindung", note: "Marken, die bleiben" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const floatX = useTransform(sx, [-0.5, 0.5], [-14, 14]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function onMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouse}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 md:pt-36"
    >
      <Aurora />
      <div className="absolute inset-0 bg-grid mask-radial opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />

      <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7 }}
            className="glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink shadow-soft"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-semibold text-emerald-deep">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              Full-Service
            </span>
            Amazon-Agentur
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Amazon-Wachstum ist keine Frage des{" "}
            <span className="relative whitespace-nowrap">
              <span className="text-gradient">Werbebudgets.</span>
              <motion.svg
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 w-full"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <motion.path
                  d="M2 8 C 80 2, 220 2, 298 7"
                  fill="none"
                  stroke="url(#hl)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
                <defs>
                  <linearGradient id="hl" x1="0" x2="1">
                    <stop offset="0%" stopColor="#6258F7" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted"
          >
            Wir führen euren kompletten Amazon-Account – Strategie, Content, Advertising und
            Betrieb. Mehr Umsatz und bessere Marge, weil zuerst das{" "}
            <span className="font-semibold text-ink">Listing trägt</span> und dann die{" "}
            <span className="font-semibold text-ink">Ads skalieren</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#kontakt" className="btn-primary group">
              Gespräch vereinbaren
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#ergebnisse" className="btn-ghost">Ergebnisse ansehen</a>
          </motion.div>
        </div>

        {/* Right: floating dashboard */}
        <motion.div style={{ y: yCard, opacity }} className="perspective relative">
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* main glass dashboard */}
            <div className="glass relative rounded-[2rem] p-5 shadow-lift">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-ink-faint">Account-Übersicht</div>
                  <div className="text-sm font-semibold text-ink">Profitables Wachstum</div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-semibold text-emerald-deep">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 8l3-3 2 2 3-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Live
                </div>
              </div>

              <div className="rounded-2xl border border-black/[0.05] bg-white/70 p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-ink-faint">Umsatz · 90 Tage</div>
                    <div className="mt-0.5 text-2xl font-bold tracking-tight text-ink">
                      <Counter to={418} prefix="€ " suffix="k" />
                    </div>
                  </div>
                  <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-600">+147 %</span>
                </div>
                <AreaChart className="mt-3 h-24 w-full" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-black/[0.05] bg-white/70 p-4">
                  <div className="text-xs text-ink-faint">TACoS</div>
                  <div className="text-xl font-bold text-ink"><Counter to={14} suffix=" %" /></div>
                  <BarChart className="mt-2 h-12" values={[60, 52, 48, 40, 34, 30, 26, 22]} highlight={7} color="rgba(98,88,247,0.3)" colorHighlight="#10B981" />
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-black/[0.05] bg-white/70 p-4">
                  <Ring value={80} label="organisch" />
                </div>
              </div>
            </div>

            {/* floating chip: ROAS */}
            <motion.div
              style={{ x: floatX, transform: "translateZ(60px)" }}
              className="absolute -left-6 top-16 hidden rounded-2xl bg-white p-3 shadow-lift sm:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12l4-4 3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="text-[10px] text-ink-faint">ROAS</div>
                  <div className="text-sm font-bold text-ink">4,8×</div>
                </div>
              </div>
            </motion.div>

            {/* floating chip: Buy-Box */}
            <motion.div
              style={{ transform: "translateZ(80px)" }}
              className="absolute -right-4 bottom-10 hidden rounded-2xl bg-white p-3 shadow-lift sm:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald/10 text-emerald-deep">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="text-[10px] text-ink-faint">Buy-Box</div>
                  <div className="text-sm font-bold text-ink">100 %</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stat bar */}
      <div className="container-x absolute inset-x-0 bottom-6 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="glass grid grid-cols-4 divide-x divide-black/[0.06] rounded-3xl px-2 py-5 shadow-soft"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-6 text-center">
              <div className="text-3xl font-bold tracking-tight text-ink">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm font-medium text-ink">{s.label}</div>
              <div className="text-xs text-ink-faint">{s.note}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
