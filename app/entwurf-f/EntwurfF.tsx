"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Reveal } from "@/components/Reveal";
import {
  cta,
  hero,
  stats,
  clientLogos,
  partnerBadge,
  problem,
  mechanism,
  cases,
  services,
  steps,
  faq,
  closing,
  midCta,
  type BrandShape,
} from "@/lib/content";

// Fotorealistische 3D-Assets (Higgsfield). Slots werden serverseitig in
// page.tsx geprüft — fehlt ein File, rendert die jeweilige CSS-Bühne.
export type Assets3D = {
  hero: string | null;
  stage: string | null;
  shapes: Partial<Record<BrandShape, string>>;
};

const EASE = [0.21, 0.6, 0.35, 1] as const;

// Hydration-sicheres Reduced-Motion: erster Client-Render entspricht dem
// Server (false), erst nach dem Mount greift die echte Nutzer-Präferenz.
function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!reduce : false;
}

/* ------------------------------ Motion-Bausteine -------------------------- */

// Zahl zählt hoch, sobald sie in den Viewport kommt ("60+", "21 Mio. €", "98 %").
function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const m = value.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  const target = m ? parseFloat(m[2].replace(",", ".")) : 0;
  const decimals = m && m[2].includes(",") ? 1 : 0;
  // Startwert muss server-/clientseitig identisch sein (Hydration);
  // reduzierte Bewegung springt im Effekt direkt auf den Zielwert.
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView || !m) return;
    if (reduce) {
      setDisplay(m[2]);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) =>
        setDisplay(decimals ? v.toFixed(decimals).replace(".", ",") : Math.round(v).toString()),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  if (!m) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {m[1]}
      {display}
      {m[3]}
    </span>
  );
}

// SVG-Pfad zeichnet sich beim Scrollen in den Viewport selbst.
function DrawPath({
  d,
  stroke,
  strokeWidth = 2.5,
  delay = 0,
}: {
  d: string;
  stroke: string;
  strokeWidth?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduce ? { duration: 0 } : { duration: 1.6, delay, ease: [0.3, 0.8, 0.3, 1] }}
    />
  );
}

// Karte kippt der Maus entgegen (echte Perspektive statt Hover-Schatten).
function Tilt({
  children,
  max = 5,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 22 });
  const sry = useSpring(ry, { stiffness: 180, damping: 22 });

  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// Einschweben mit Perspektive: Panels kippen aus der Tiefe nach vorn,
// statt nur zu faden. Im Grid-Parent muss `perspective` gesetzt sein.
function RiseIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 64, rotateX: 28 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EASE }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------- Gerüst --------------------------------- */

function CtaButton({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={cta.href}
      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_-10px_rgba(255,138,0,0.65),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {label}
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
        <path
          d="M2 8h11M9 3.5L13.5 8 9 12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/60 bg-white/80 px-5 py-2.5 shadow-[0_16px_40px_-20px_rgba(2,48,71,0.35)] backdrop-blur-xl">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-6 w-auto sm:h-7" />
        <nav className="hidden items-center gap-6 text-sm font-bold text-ink lg:flex">
          <span className="cursor-default">Leistungen</span>
          <span className="cursor-default">Case Studies</span>
        </nav>
        <a
          href={cta.href}
          className="rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white shadow-[0_10px_24px_-8px_rgba(255,138,0,0.7)] sm:px-5 sm:text-sm"
        >
          {cta.short}
        </a>
      </div>
    </header>
  );
}

// Eine Sektion = ein Viewport. Helle Sektionen bekommen Studio-Licht.
function Viewport({
  id,
  studio = false,
  className = "",
  children,
}: {
  id?: string;
  studio?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative flex items-center overflow-hidden py-16 lg:min-h-svh lg:py-20 ${className}`}>
      {studio && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% -10%, #ffffff 0%, rgba(255,255,255,0) 60%), radial-gradient(ellipse 45% 35% at 88% 105%, rgba(255,138,0,0.1) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 35% 30% at 8% 100%, rgba(2,48,71,0.06) 0%, rgba(2,48,71,0) 70%)",
            }}
          />
        </div>
      )}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">{children}</div>
    </section>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.22em] ${dark ? "text-brand-orange" : "text-ink-soft"}`}
    >
      {children}
    </p>
  );
}

function H2({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <h2 className={`text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl ${dark ? "text-white" : "text-ink"} ${className}`}>
      {children}
    </h2>
  );
}

// Schwebendes Panel: Material-Gradient, Glanzkante, Bodenschatten.
const floatSurface =
  "relative h-full rounded-2xl bg-gradient-to-b from-white to-[#f6f9fb] ring-1 ring-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_5px_rgba(2,48,71,0.06),0_36px_70px_-34px_rgba(2,48,71,0.45)]";

function FloatTile({
  className = "",
  inner = "",
  children,
}: {
  className?: string;
  inner?: string;
  children: ReactNode;
}) {
  return (
    <div className={`group relative h-full transition-transform duration-300 hover:-translate-y-1.5 ${className}`}>
      <div
        aria-hidden
        className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/15 blur-md transition-all duration-300 group-hover:-bottom-4 group-hover:opacity-70"
      />
      <div className={`${floatSurface} ${inner}`}>{children}</div>
    </div>
  );
}

/* ---------------------------------- Hero --------------------------------- */

// CSS-Bühne hinter dem Foto: Studio-Verlauf, Podium, zentrales Glas-Panel
// mit selbstzeichnender Kurve. Die äußeren KPI-Panels schweben als eigene
// Parallax-Ebenen über dem Bühnenrahmen (siehe HeroStage).
function StageFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f3f6f8]" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 62% 38%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(ellipse 45% 35% at 70% 78%, rgba(255,138,0,0.18) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 30% 25% at 40% 85%, rgba(255,49,49,0.08) 0%, rgba(255,49,49,0) 70%)",
        }}
      />
      <div className="absolute left-1/2 top-[70%] h-10 w-72 -translate-x-1/2 rounded-[100%] bg-[#023047]/15 blur-xl" />
      <div className="absolute left-1/2 top-[34%] w-48 -translate-x-1/2 rounded-2xl border border-white/70 bg-white/55 p-3.5 shadow-[0_24px_50px_-20px_rgba(2,48,71,0.35)] backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">Organischer Anteil</p>
        <p className="mt-0.5 text-xl font-extrabold text-brand-orange">
          <CountUp value="80 %" />
        </p>
        <svg viewBox="0 0 120 36" className="mt-1 w-full">
          <DrawPath d="M2 30 C25 28 45 22 65 16 C85 10 100 8 118 4" stroke="#ff8a00" delay={0.4} />
        </svg>
      </div>
    </div>
  );
}

// Kundenlogos als Endlos-Marquee: Graustufen, Farbe bei Hover, weiche Kanten.
function LogoMarquee() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max items-center" style={{ animation: "marquee-left 45s linear infinite" }}>
        {row.map((l, i) => (
          <div key={`${l.name}-${i}`} className="group grid h-12 w-28 shrink-0 place-items-center px-3">
            <img
              src={l.src}
              alt={l.name}
              className="max-h-9 w-auto max-w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Die Bühne: Foto/Fallback in einer Tilt-Ebene, davor zwei Glas-Dashboards,
// die per translateZ vor der Karte schweben und beim Scrollen parallax
// gegenläufig wandern — die "umkreisenden Dashboards" der Produktbühne.
function HeroStage({ image }: { image: string | null }) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const chipUp = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [44, -44]);
  const chipDown = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-32, 32]);

  return (
    <div ref={ref} className="relative" style={{ perspective: "1300px" }}>
      <Tilt max={4}>
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[1.75rem] ring-1 ring-line shadow-[0_3px_6px_rgba(2,48,71,0.05),0_50px_90px_-40px_rgba(2,48,71,0.45)] sm:aspect-[16/10] lg:aspect-[5/4] lg:max-h-[62svh]">
          <StageFallback />
          {image && (
            <img
              src={image}
              alt="Produktbühne: schwebendes Produkt mit Performance-Dashboards"
              className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
            />
          )}
        </div>

        {/* Schwebende Glas-Dashboards (eigene Tiefenebene, translateZ) */}
        <motion.div
          style={{ y: chipUp, z: 50 }}
          className="absolute -left-4 top-8 w-40 rounded-2xl border border-white/70 bg-white/70 p-3 shadow-[0_28px_55px_-22px_rgba(2,48,71,0.5)] backdrop-blur-xl sm:-left-8"
        >
          <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">ROAS</p>
          <p className="mt-0.5 text-lg font-extrabold text-ink">
            <CountUp value="4,8" />
          </p>
          <svg viewBox="0 0 130 30" className="mt-1 w-full">
            <DrawPath d="M2 26 C30 24 55 18 80 12 C100 7 115 5 128 3" stroke="#023047" strokeWidth={2} delay={0.3} />
          </svg>
        </motion.div>
        <motion.div
          style={{ y: chipDown, z: 70 }}
          className="absolute -bottom-5 -right-2 w-40 rounded-2xl border border-white/70 bg-white/70 p-3 shadow-[0_28px_55px_-22px_rgba(2,48,71,0.5)] backdrop-blur-xl sm:-right-6"
        >
          <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">TACoS</p>
          <p className="mt-0.5 text-lg font-extrabold text-brand-red">
            <CountUp value="−35 %" />
          </p>
          <svg viewBox="0 0 130 30" className="mt-1 w-full">
            <DrawPath d="M2 5 C30 7 55 13 80 19 C100 24 115 26 128 27" stroke="#ff3131" strokeWidth={2} delay={0.45} />
          </svg>
        </motion.div>
      </Tilt>
    </div>
  );
}

function Hero({ image }: { image: string | null }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-5 pb-8 pt-24 lg:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-[10fr_11fr] lg:gap-12">
          <div>
            <Reveal>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-4xl xl:text-[2.75rem]">
                Profitables Wachstum auf Amazon.{" "}
                <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                  Nicht teuer erkaufter Umsatz.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">{hero.subline}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div>
                  <CtaButton />
                  <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
                </div>
                <img src={partnerBadge.src} alt={partnerBadge.alt} className="h-16 w-auto rounded-xl ring-1 ring-line" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={36}>
            <HeroStage image={image} />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 rounded-2xl border border-white/70 bg-white/70 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_48px_-24px_rgba(2,48,71,0.28)] backdrop-blur-xl lg:mt-10">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 sm:flex-row sm:items-center sm:gap-5">
              <p className="shrink-0 text-[11px] text-ink-soft sm:max-w-[12rem]">
                Marken, die uns ihr Amazon-Geschäft anvertrauen
              </p>
              <LogoMarquee />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Problem -------------------------------- */

function Problem() {
  const [transitionLead, transitionPunch] = problem.transition.split(/\.\s+/);
  return (
    <Viewport studio className="bg-surface-alt">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <Reveal>
          <H2 className="max-w-md">{problem.headline}</H2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">{problem.intro}</p>
        </Reveal>
      </div>
      <div className="mt-10 grid gap-x-4 gap-y-6 md:grid-cols-3" style={{ perspective: "1300px" }}>
        {problem.pains.map((p, i) => (
          <RiseIn key={p.title} delay={0.12 * i} className="h-full">
            <FloatTile className={i === 1 ? "md:-translate-y-3 md:hover:-translate-y-[18px]" : ""} inner="overflow-hidden p-5">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-5 text-[88px] font-extrabold leading-none tracking-tighter text-ink/[0.05]"
              >
                {i + 1}
              </span>
              <span className="text-xs font-extrabold tracking-widest text-brand-orange">0{i + 1}</span>
              <h3 className="mt-2 text-base font-bold leading-snug text-ink">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.text}</p>
            </FloatTile>
          </RiseIn>
        ))}
      </div>
      <Reveal delay={0.24}>
        <p className="mt-9 text-center text-sm font-bold text-ink">
          {transitionLead}.{" "}
          <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
            {transitionPunch}
          </span>
        </p>
      </Reveal>
    </Viewport>
  );
}

/* ------------------------------- Mechanismus ------------------------------ */

// Radiale Zielbild-Anzeige: Ring füllt sich auf 80 %, Zahl zählt mit.
function TargetGauge() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
        <motion.circle
          cx="32"
          cy="32"
          r="27"
          fill="none"
          stroke="#ff8a00"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 0.8 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={reduce ? { duration: 0 } : { duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-sm font-extrabold text-white">
        <CountUp value="80 %" />
      </span>
    </div>
  );
}

function Mechanism({ stage }: { stage: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <Viewport className="bg-brand-navy">
      {/* Bühne: 3D-Rendering (Glas-Plattformen) bzw. Bühnenlicht mit
          Parallax-Glow und spiegelndem Boden */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {stage && <img src={stage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />}
        <motion.div
          style={{
            y: glowY,
            background:
              "radial-gradient(ellipse 60% 45% at 50% 110%, rgba(255,138,0,0.22) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 40% 30% at 85% 0%, rgba(255,49,49,0.1) 0%, rgba(255,49,49,0) 70%)",
          }}
          className="absolute -inset-y-16 inset-x-0"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(2,48,71,0.55) 0%, rgba(2,48,71,0) 35%)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.06), transparent)" }}
        />
      </div>
      <div className="relative" ref={ref}>
        <Reveal>
          <Eyebrow dark>{mechanism.eyebrow}</Eyebrow>
        </Reveal>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <Reveal delay={0.06}>
            <H2 dark className="max-w-lg">
              {mechanism.headline}
            </H2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-[13px] leading-relaxed text-white/70">{mechanism.intro}</p>
          </Reveal>
        </div>
        {/* Drei Glas-Plattformen kippen nacheinander aus der Tiefe nach vorn */}
        <div className="mt-10 grid gap-x-4 gap-y-5 md:grid-cols-3" style={{ perspective: "1300px" }}>
          {mechanism.steps.map((s, i) => (
            <RiseIn key={s.name} delay={0.16 * i} className="h-full">
              <div
                className={`relative h-full transition-transform duration-300 hover:-translate-y-1.5 ${
                  i === 0 ? "md:translate-y-6" : i === 1 ? "md:translate-y-3" : ""
                }`}
              >
                <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-black/40 blur-md" />
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_30px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md">
                  <motion.div
                    aria-hidden
                    className="absolute inset-x-5 top-0 h-px origin-left"
                    style={{ background: "linear-gradient(to right, transparent, rgba(255,138,0,0.8), transparent)" }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1, delay: 0.3 + 0.16 * i, ease: EASE }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-widest text-brand-orange">0{i + 1}</span>
                    <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                      {s.name}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/70">{s.text}</p>
                </div>
              </div>
            </RiseIn>
          ))}
        </div>
        <Reveal delay={0.24}>
          <div className="mt-9 flex items-center justify-center gap-5 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-6 py-4 shadow-[0_0_60px_-12px_rgba(255,138,0,0.35)] backdrop-blur-sm">
            <TargetGauge />
            <p className="max-w-xl text-left text-sm font-bold text-white sm:text-base">{mechanism.target}</p>
          </div>
        </Reveal>
      </div>
    </Viewport>
  );
}

/* --------------------------------- Cases --------------------------------- */

function Cases() {
  return (
    <Viewport studio className="bg-white">
      <Reveal>
        <H2>{cases.headline}</H2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{cases.subline}</p>
      </Reveal>
      <div className="mt-9 grid gap-x-4 gap-y-6 lg:grid-cols-2" style={{ perspective: "1300px" }}>
        {cases.items.map((c, i) => (
          <RiseIn key={c.brand} delay={0.12 * i} className="h-full">
            <Tilt max={3} className="h-full">
              <FloatTile inner="flex gap-5 p-5">
                {/* Produktfoto als kleines Podium: Lichtkegel + Bodenschatten */}
                <div className="relative hidden w-28 shrink-0 sm:block">
                  <div
                    aria-hidden
                    className="absolute -inset-2 rounded-2xl"
                    style={{
                      background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,138,0,0.12), transparent 70%)",
                    }}
                  />
                  <div className="relative h-28 w-28 overflow-hidden rounded-xl shadow-[0_18px_30px_-14px_rgba(2,48,71,0.5)] ring-1 ring-white">
                    <Image src={c.image} alt={c.brand} fill sizes="112px" className="object-cover" />
                  </div>
                  <div aria-hidden className="mx-auto mt-2 h-2.5 w-20 rounded-[100%] bg-brand-navy/15 blur-[3px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                    {c.brand} · {c.category}
                  </p>
                  <div className="mt-1.5 flex items-end justify-between gap-3">
                    <p className="text-2xl font-extrabold tracking-tight">
                      <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                        {c.metric}
                      </span>
                    </p>
                    <svg viewBox="0 0 72 26" className="mb-1 hidden h-6 w-[72px] shrink-0 sm:block" aria-hidden>
                      <DrawPath
                        d={i === 0 ? "M2 23 C18 21 32 16 46 10 C56 6 64 4 70 3" : "M2 4 C18 6 32 11 46 16 C56 20 64 22 70 23"}
                        stroke={i === 0 ? "#ff8a00" : "#ff3131"}
                        strokeWidth={2.5}
                        delay={0.3}
                      />
                    </svg>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{c.text}</p>
                  <p className="mt-2 text-[11px] text-ink-soft/80">{c.note}</p>
                </div>
              </FloatTile>
            </Tilt>
          </RiseIn>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div className="relative mt-9 overflow-hidden rounded-2xl bg-brand-navy px-6 py-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 90% at 85% 110%, rgba(255,138,0,0.25), transparent 70%), radial-gradient(ellipse 35% 70% at 8% -10%, rgba(255,49,49,0.15), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-base font-bold text-white">{midCta.question}</p>
            <CtaButton label={midCta.label} />
          </div>
        </div>
      </Reveal>
    </Viewport>
  );
}

/* -------------------------------- Leistungen ------------------------------ */

// Die vier Subbrand-Formen aus dem TEMOA-Logo-Icon (Pfade aus
// public/assets/logos/logo_icon.svg). Wird durch fotorealistische
// 3D-Renderings ersetzt, sobald die Assets im Repo liegen.
function BrandShapeIcon({ shape, className = "" }: { shape: BrandShape; className?: string }) {
  if (shape === "square")
    return (
      <svg viewBox="0 0 108 108" className={className} aria-hidden>
        <defs>
          <linearGradient id="sq-3d" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb347" />
            <stop offset="100%" stopColor="#f57600" />
          </linearGradient>
        </defs>
        <rect width="108" height="108" rx="14" fill="url(#sq-3d)" />
      </svg>
    );
  if (shape === "circle")
    return (
      <svg viewBox="0 0 108 108" className={className} aria-hidden>
        <defs>
          <radialGradient id="ci-3d" cx="0.35" cy="0.3" r="0.9">
            <stop offset="0%" stopColor="#ff7a6e" />
            <stop offset="100%" stopColor="#e01f1f" />
          </radialGradient>
        </defs>
        <circle cx="54" cy="54" r="54" fill="url(#ci-3d)" />
      </svg>
    );
  if (shape === "u")
    return (
      <svg viewBox="0 121 110 134" className={className} aria-hidden>
        <defs>
          <linearGradient id="u-3d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a4361" />
            <stop offset="100%" stopColor="#01202f" />
          </linearGradient>
        </defs>
        <path
          d="M2.25,121.7 L107.6,121.7 C108.8,121.7 109.8,122.7 109.8,123.9 L109.8,200.6 C109.5,223.9 94.6,243.7 74.1,251.2 C68.6,253.1 62.3,254.1 56,254.1 C49.7,254.1 43.8,253 38.3,251.2 C17.6,243.8 2.7,224 2.4,200.6 L2.4,123.9 C2.4,122.7 3.4,121.7 2.25,121.7 Z"
          fill="url(#u-3d)"
        />
      </svg>
    );
  return (
    <svg viewBox="120 122 109 132" className={className} aria-hidden>
      <defs>
        <linearGradient id="hx-3d" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef7fd" />
          <stop offset="100%" stopColor="#aed3e8" />
        </linearGradient>
      </defs>
      <path
        d="M176.3,122.9 L226.2,153.6 C227.4,154.3 228.1,155.6 228.1,157 L228.1,218.7 C228.1,220.1 227.4,221.4 226.2,222.1 L176.3,252.9 C175.1,253.6 173.6,253.6 172.5,252.9 L122.6,222.1 C121.4,221.4 120.7,220.1 120.7,218.7 L120.7,157 C120.7,155.6 121.4,154.3 122.6,153.6 L172.5,122.9 C173.6,122.1 175.1,122.1 176.3,122.9 Z"
        fill="url(#hx-3d)"
      />
    </svg>
  );
}

// Schwebendes Objekt mit Bodenschatten: Foto-Render, sonst SVG-Form —
// sanft auf- und abschwebend (Float-Loop).
function ShapeObject({ shape, photo, dark = false }: { shape: BrandShape; photo?: string; dark?: boolean }) {
  const reduce = useReducedMotionSafe();
  return (
    <span className="relative mt-1 block shrink-0">
      <motion.span
        className="block"
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {photo ? (
          <img src={photo} alt="" className="h-12 w-12 object-contain drop-shadow-[0_12px_14px_rgba(2,48,71,0.3)]" aria-hidden />
        ) : (
          <BrandShapeIcon shape={shape} className="h-9 w-9 drop-shadow-[0_10px_10px_rgba(2,48,71,0.3)]" />
        )}
      </motion.span>
      <span
        aria-hidden
        className={`absolute -bottom-2 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-[100%] blur-[2px] ${dark ? "bg-black/50" : "bg-brand-navy/20"}`}
      />
    </span>
  );
}

function ServiceTile({
  name,
  subBrand,
  shape,
  shapePhoto,
  title,
  text,
  dark = false,
}: {
  name?: string;
  subBrand?: string;
  shape?: BrandShape;
  shapePhoto?: string;
  title: string;
  text: string;
  dark?: boolean;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          {name && (
            <span
              className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                dark ? "bg-white/10 text-brand-orange" : "bg-brand-orange/10 text-brand-orange"
              }`}
            >
              {name}
            </span>
          )}
          {subBrand && (
            <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${dark ? "text-white/50" : "text-ink-soft/70"}`}>
              {subBrand}
            </p>
          )}
          <h3 className={`mt-1 text-base font-bold ${dark ? "text-white" : "text-ink"}`}>{title}</h3>
        </div>
        {shape && <ShapeObject shape={shape} photo={shapePhoto} dark={dark} />}
      </div>
      <p className={`mt-2 text-[13px] leading-relaxed ${dark ? "text-white/75" : "text-ink-soft"}`}>{text}</p>
    </>
  );

  if (dark) {
    return (
      <div className="group relative h-full transition-transform duration-300 hover:-translate-y-1.5">
        <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/30 blur-md" />
        <div className="relative h-full overflow-hidden rounded-2xl bg-brand-navy p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_36px_70px_-34px_rgba(2,48,71,0.8)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 60% at 80% 110%, rgba(255,138,0,0.18), transparent 70%)" }}
          />
          <div className="relative">{body}</div>
        </div>
      </div>
    );
  }
  return <FloatTile inner="p-5">{body}</FloatTile>;
}

function Services({ shapes }: { shapes: Assets3D["shapes"] }) {
  return (
    <Viewport studio className="bg-surface-alt">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <Reveal>
          <H2 className="max-w-xl">{services.headline}</H2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">{services.intro}</p>
        </Reveal>
      </div>
      <div className="mt-10 grid gap-x-4 gap-y-6 md:grid-cols-3" style={{ perspective: "1300px" }}>
        <RiseIn className="md:col-span-2">
          <ServiceTile {...services.foundation} shapePhoto={services.foundation.shape && shapes[services.foundation.shape]} />
        </RiseIn>
        {services.levers.map((l, i) => (
          <RiseIn key={l.title} delay={0.1 + 0.08 * i}>
            <ServiceTile {...l} shapePhoto={l.shape && shapes[l.shape]} />
          </RiseIn>
        ))}
        <RiseIn delay={0.34}>
          <ServiceTile dark {...services.bracket} shapePhoto={services.bracket.shape && shapes[services.bracket.shape]} />
        </RiseIn>
      </div>
    </Viewport>
  );
}

/* --------------------------------- Schritte ------------------------------- */

function Steps() {
  return (
    <Viewport studio className="bg-white">
      <Reveal>
        <H2 className="mx-auto max-w-xl text-center">{steps.headline}</H2>
      </Reveal>
      {/* Verbindungslinie zeichnet sich, die Schritte kippen nacheinander rein */}
      <div className="relative mt-12">
        <svg
          viewBox="0 0 1000 8"
          className="absolute -top-6 left-0 hidden w-full md:block"
          preserveAspectRatio="none"
          aria-hidden
        >
          <DrawPath d="M10 4 H990" stroke="#e3e9ee" strokeWidth={2} />
          <DrawPath d="M10 4 H990" stroke="#ff8a00" strokeWidth={2} delay={0.2} />
        </svg>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-3" style={{ perspective: "1300px" }}>
          {steps.items.map((s, i) => (
            <RiseIn key={s.title} delay={0.14 * i} className="h-full">
              <FloatTile inner="p-5 pt-7">
                <span className="absolute -top-4 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_20px_-8px_rgba(255,138,0,0.8)]">
                  {i + 1}
                </span>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-ink">{s.title}</h3>
                  <span className="shrink-0 rounded-full bg-surface-alt px-2.5 py-0.5 text-[10px] font-bold text-ink-soft">
                    {s.duration}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{s.text}</p>
              </FloatTile>
            </RiseIn>
          ))}
        </div>
      </div>
      <Reveal delay={0.24}>
        <div className="mt-10 text-center">
          <CtaButton />
          <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
        </div>
      </Reveal>
    </Viewport>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Viewport studio className="bg-surface-alt">
      <Reveal>
        <H2 className="mx-auto max-w-xl text-center">{faq.headline}</H2>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="relative mx-auto mt-9 max-w-3xl">
          <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/15 blur-md" />
          <div className={`${floatSurface} overflow-hidden`}>
            {faq.items.map((item, i) => (
              <div key={item.q} className={i > 0 ? "border-t border-line" : ""}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-3.5 text-left"
                >
                  <span className="text-sm font-bold text-ink">{item.q}</span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-alt text-ink transition-transform ${
                      open === i ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3">
                      <path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {open === i && <p className="px-6 pb-4 text-[13px] leading-relaxed text-ink-soft">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Viewport>
  );
}

/* --------------------------------- Abschluss ------------------------------ */

function Closing() {
  return (
    <section id="kontakt" className="relative flex items-center overflow-hidden bg-brand-navy py-16 lg:min-h-svh">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(255,138,0,0.16) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 45% 35% at 15% 100%, rgba(255,49,49,0.1) 0%, rgba(255,49,49,0) 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.05), transparent)" }}
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full shadow-[0_24px_50px_-16px_rgba(0,0,0,0.6)] ring-4 ring-white/20 sm:h-28 sm:w-28">
              <Image src={closing.photo} alt={`${closing.person}, ${closing.role}`} fill sizes="112px" className="object-cover" />
            </div>
            <H2 dark className="mt-6">
              {closing.headline}
            </H2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">{closing.text}</p>
            <p className="mt-3 text-sm font-bold text-white">
              {closing.person} · {closing.role}
            </p>
            <div className="mt-7">
              <CtaButton />
              <p className="mt-3 text-xs text-white/60">{closing.micro}</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center">
          <img src="/assets/logos/logo_full_white.svg" alt="TEMOA" className="h-6 w-auto" />
          <p className="max-w-md text-xs leading-relaxed text-white/50">
            Entwurf F — „Produktbühne kompakt“. Navigation und Unterseiten folgen in der Umsetzungsphase.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function EntwurfF({ assets }: { assets: Assets3D }) {
  return (
    <main>
      <Header />
      <Hero image={assets.hero} />
      <Problem />
      <Mechanism stage={assets.stage} />
      <Cases />
      <Services shapes={assets.shapes} />
      <Steps />
      <Faq />
      <Closing />
    </main>
  );
}
