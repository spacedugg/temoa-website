"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Reveal } from "../ui/Reveal";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  // Depth layers: each element reacts to the cursor at a different rate.
  const cardX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const cardY = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const cardRX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const cardRY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const nearX = useTransform(sx, [-0.5, 0.5], [42, -42]);
  const nearY = useTransform(sy, [-0.5, 0.5], [30, -30]);
  const farX = useTransform(sx, [-0.5, 0.5], [-28, 28]);
  const farY = useTransform(sy, [-0.5, 0.5], [-20, 20]);

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* Soft warm glow, top-right only, keeps the rest crisp white */}
      <div
        className="pointer-events-none absolute -right-40 -top-44 h-[38rem] w-[38rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,153,0,0.16), rgba(255,49,49,0.07) 45%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-[0.3]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Left: copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundImage: "var(--brand-gradient)" }} />
              Amazon Full Service Wachstumspartner
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Amazon-Wachstum ist keine Frage des{" "}
              <span className="text-gradient">Werbebudgets.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              Wir machen euer Listing organisch so stark, dass es auch ohne Werbung
              verkauft. Erst dann kommt PPC dazu und arbeitet vom ersten Euro an profitabel.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="/gespraech-vereinbaren" className="btn-primary !px-7 !py-4 text-base">
                Potenzialanalyse buchen
              </a>
              <a href="#case-studies" className="btn-ghost !px-6 !py-4 text-base">
                Case Studies ansehen
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: layered floating product mockup */}
        <div className="relative [perspective:1400px]">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,153,0,0.16), transparent 68%)" }}
          />

          {/* Main listing card */}
          <motion.div
            style={
              reduce
                ? undefined
                : { x: cardX, y: cardY, rotateX: cardRX, rotateY: cardRY, transformStyle: "preserve-3d" }
            }
            className="relative mx-auto w-full max-w-md rounded-[1.75rem] border border-black/[0.06] bg-white p-5 shadow-[0_40px_80px_-30px_rgba(2,48,71,0.35)]"
          >
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
              style={{ background: "linear-gradient(135deg,#f3f5f8,#e7ebf1)" }}
            >
              <div className="absolute inset-0 grid place-items-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Produktbild
              </div>
              <span className="absolute left-3 top-3 rounded-md bg-ink px-2 py-1 text-[10px] font-bold text-white">
                Amazon&apos;s Choice
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FF9900">
                    <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-semibold text-ink-muted">4,8</span>
            </div>

            <div className="mt-3 space-y-2">
              <div className="h-3 w-4/5 rounded bg-ink/10" />
              <div className="h-3 w-3/5 rounded bg-ink/10" />
            </div>

            <div className="mt-5 flex items-end justify-between">
              <span className="text-2xl font-extrabold tracking-tight text-ink">
                59,<span className="align-top text-lg">99 €</span>
              </span>
              <span
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lift"
                style={{ backgroundImage: "var(--brand-gradient)" }}
              >
                In den Warenkorb
              </span>
            </div>
          </motion.div>

          {/* Floating chip: Conversion */}
          <motion.div
            style={reduce ? undefined : { x: nearX, y: nearY }}
            className="absolute -left-4 top-4 rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-lift md:-left-10"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Conversion</div>
            <div className="text-lg font-extrabold text-ink">+50 %</div>
          </motion.div>

          {/* Floating chip: organic rank */}
          <motion.div
            style={reduce ? undefined : { x: farX, y: farY }}
            className="absolute -right-3 top-1 rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-lift md:-right-6"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Organisch</div>
            <div className="flex items-center gap-1 text-lg font-extrabold text-ink">
              #1 <span style={{ color: "#10B981" }}>&uarr;</span>
            </div>
          </motion.div>

          {/* Floating chip: TACoS */}
          <motion.div
            style={reduce ? undefined : { x: nearX, y: farY }}
            className="absolute -bottom-5 right-8 rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-lift"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">TACoS</div>
            <div className="text-lg font-extrabold text-ink">5,8 %</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
