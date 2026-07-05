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
        {/* Left: copy (centered on mobile, left from md) */}
        <div className="text-center md:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink shadow-soft sm:text-xs sm:tracking-[0.16em]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundImage: "var(--brand-gradient)" }} />
              <span className="sm:hidden">Amazon Full Service</span>
              <span className="hidden sm:inline">Amazon Full Service Wachstumspartner</span>
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance pb-1 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Wachstum ist keine Frage des{" "}
              <span className="text-gradient">Werbebudgets.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted md:mx-0">
              Wir machen euer Listing organisch so stark, dass es auch ohne Werbung
              verkauft. Erst dann kommt PPC dazu und arbeitet vom ersten Euro an profitabel.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 md:justify-start">
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

          {/* Hero image with a subtle parallax tilt */}
          <motion.div
            style={
              reduce
                ? undefined
                : { x: cardX, y: cardY, rotateX: cardRX, rotateY: cardRY, transformStyle: "preserve-3d" }
            }
            className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-30px_rgba(2,48,71,0.35)] ring-1 ring-black/[0.06]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/graphics/Homepage_Hero.png" alt="temoa Amazon Full Service" className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
