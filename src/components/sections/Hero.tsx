"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { Aurora } from "../ui/Aurora";
import { Counter } from "../ui/Counter";
import { BrowserFrame, KpiTile, BarsCard, FloatingProduct } from "../ui/MockKit";
import { LISTING_SETS } from "@/lib/showcase";

const heroProduct = LISTING_SETS[0]?.images?.[0];

const stats = [
  { value: 30, prefix: "+", suffix: " %", label: "Gewinn pro Marke", note: "⌀ Profit-Plus im Mandat" },
  { value: 60, suffix: "+", label: "Marken im Konto", note: "über 5+ Marktplätze" },
  { value: 21, suffix: " Mio €", label: "Umsatz unter Steuerung", note: "p. a. über alle Konten" },
  { value: 98, suffix: " %", label: "Marken, die bleiben", note: "Retention statt Fluktuation" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });

  // Pronounced 3D rotation that follows the cursor ("drehen & wenden")
  const rotX = useTransform(sy, [-0.5, 0.5], [18, -18]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-24, 24]);
  const shadowX = useTransform(sx, [-0.5, 0.5], [40, -40]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function onMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouse}
      onMouseLeave={onLeave}
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
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/12 px-2.5 py-1 text-xs font-semibold text-brand-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Full-Service
            </span>
            Amazon aus einer Hand
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Wir steuern euer Amazon-Konto auf{" "}
            <span className="relative whitespace-nowrap">
              <span className="text-gradient">Gewinn.</span>
              <motion.svg
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
                    <stop offset="0%" stopColor="#FF9900" />
                    <stop offset="100%" stopColor="#FF3131" />
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
            Ein Team übernimmt das Ganze – Strategie, Listing & SEO, Sponsored Ads und den
            Tagesbetrieb. Erst bringen wir das{" "}
            <span className="font-semibold text-ink">Listing zum Verkaufen</span>, dann skalieren die{" "}
            <span className="font-semibold text-ink">Ads auf Marge</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="/gespraech-vereinbaren" className="btn-primary group">
              Gespräch vereinbaren
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/ergebnisse" className="btn-ghost">Ergebnisse ansehen</a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 text-sm text-ink-faint"
          >
30 Minuten direkt mit einem Gründer. Klartext zu eurem Konto, kein Pitch.
          </motion.p>
        </div>

        {/* Right: interactive 3D dashboard mock */}
        <motion.div style={{ y: yCard, opacity }} className="perspective relative">
          {/* brand glow behind */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,153,0,0.28), rgba(255,49,49,0.12) 45%, transparent 70%)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative mx-auto w-full max-w-[32rem]"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* soft ground shadow that shifts with rotation */}
              <motion.div aria-hidden style={{ x: shadowX }} className="absolute inset-x-10 -bottom-4 h-10 rounded-full bg-navy/25 blur-2xl" />

              <BrowserFrame className="relative" >
                <div className="space-y-3 p-5" style={{ transform: "translateZ(40px)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium text-ink-faint">Konto-Cockpit</div>
                      <div className="text-sm font-bold text-ink">Umsatz trifft Marge</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-deep">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> live
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <KpiTile label="Umsatz" value="€1,8M" delta="+31%" deltaUp values={[10, 14, 13, 18, 22, 27, 33]} color="#FF9900" />
                    <KpiTile label="TACoS" value="9,4%" delta="−4,1%" deltaUp values={[28, 24, 26, 20, 18, 14, 9]} color="#0E7CA0" />
                    <KpiTile label="CVR" value="+12,5%" delta="+2,3%" deltaUp values={[8, 10, 9, 12, 14, 16, 19]} color="#FF3131" />
                  </div>
                  <BarsCard
                    values={[9, 12, 15, 22, 13, 17, 11]}
                    highlight={3}
                    labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                    peakLabel="€19.740"
                  />
                </div>
              </BrowserFrame>

              {/* freestanding product accent (Amazon-Akzent) */}
              {heroProduct && (
                <div className="pointer-events-none absolute -bottom-8 -left-10 w-32 sm:w-40" style={{ transform: "translateZ(80px)" }}>
                  <FloatingProduct src={heroProduct} alt="Beispiel-Produkt" size={180} />
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6 text-center text-xs text-ink-faint"
          >
            ↺ Mit der Maus bewegen
          </motion.p>
        </motion.div>
      </div>

      {/* Stat bar */}
      <div className="container-x absolute inset-x-0 bottom-6 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="glass grid grid-cols-4 divide-x divide-navy/10 rounded-3xl px-2 py-5 shadow-soft"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-6 text-center">
              <div className="text-3xl font-extrabold tracking-tight text-ink">
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
