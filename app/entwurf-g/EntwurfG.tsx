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
import { ListingMock } from "@/components/mockups/ListingMock";
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
} from "@/lib/content";

// Fotorealistisches Hero-Asset (Higgsfield, „Produktbühne“): lokales File
// (sobald eingecheckt) > Remote-URL der Generation > CSS-Bühne als Fallback.
export type HeroSource = { local: string | null; remote: string };

const EASE = [0.21, 0.6, 0.35, 1] as const;

/* ------------------------------ Motion-Bausteine -------------------------- */

function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!reduce : false;
}

// Zahl zählt hoch, sobald sie sichtbar wird.
function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const m = value.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  const target = m ? parseFloat(m[2].replace(",", ".")) : 0;
  const decimals = m && m[2].includes(",") ? 1 : 0;
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

// SVG-Pfad zeichnet sich beim Scrollen selbst.
function DrawPath({
  d,
  stroke,
  strokeWidth = 2.5,
  delay = 0,
  duration = 1.6,
}: {
  d: string;
  stroke: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
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
      transition={reduce ? { duration: 0 } : { duration, delay, ease: [0.3, 0.8, 0.3, 1] }}
    />
  );
}

// Element schwebt der Maus entgegen (Tiefenebene). strength in px.
function useMouseLayer(strength: number) {
  const reduce = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      x.set(((e.clientX / window.innerWidth) * 2 - 1) * strength);
      y.set(((e.clientY / window.innerHeight) * 2 - 1) * strength);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, strength, x, y]);
  return { x: sx, y: sy };
}

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
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Eigener Cursor-Punkt (nur feine Zeiger): wächst über interaktiven Elementen.
function CursorDot() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35 });
  const sy = useSpring(y, { stiffness: 400, damping: 35 });
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(!!(e.target as HTMLElement | null)?.closest("a, button"));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);
  if (!mounted) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-ml-3 -mt-3 h-6 w-6 rounded-full border-2 border-brand-orange/70"
        animate={{ scale: active ? 2 : 1, opacity: active ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
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
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/60 bg-white/70 px-5 py-2.5 shadow-[0_16px_40px_-20px_rgba(2,48,71,0.35)] backdrop-blur-xl">
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

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`text-[11px] font-bold uppercase tracking-[0.24em] ${dark ? "text-brand-orange" : "text-ink-soft"}`}>
      {children}
    </p>
  );
}

// Glas-Panel: das wiederkehrende Material für hervorgehobene Einzel-Elemente.
const glass =
  "rounded-2xl border border-white/70 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_28px_55px_-22px_rgba(2,48,71,0.45)] backdrop-blur-xl";

/* ---------------------------------- Hero --------------------------------- */

// CSS-Produktbühne als Fallback hinter dem fotorealistischen Render:
// heller Studio-Verlauf, Podium, warmes Rim-Light.
function StageFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 60% 35%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(ellipse 50% 40% at 65% 80%, rgba(255,138,0,0.22) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 35% 28% at 35% 88%, rgba(255,49,49,0.1) 0%, rgba(255,49,49,0) 70%), linear-gradient(#f4f7f9, #eef3f6)",
        }}
      />
      {/* Podium + schwebende Silhouette */}
      <div className="absolute left-[58%] top-[62%] h-44 w-44 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle at 50% 35%, #ffffff, #dde7ed 70%)", boxShadow: "0 30px 60px -20px rgba(2,48,71,0.35), inset 0 2px 6px rgba(255,255,255,0.9)" }}
      />
      <div className="absolute left-[58%] top-[30%] h-40 w-24 -translate-x-1/2 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #fbbf6b 0%, #b45309 45%, #7c2d12 100%)",
          boxShadow: "0 50px 70px -30px rgba(2,48,71,0.5), -8px 0 24px -12px rgba(255,138,0,0.9), 8px 0 24px -12px rgba(255,49,49,0.7)",
        }}
      />
      <div className="absolute left-[58%] top-[74%] h-6 w-40 -translate-x-1/2 rounded-[100%] bg-[#023047]/20 blur-lg" />
    </div>
  );
}

function LogoMarquee({ className = "" }: { className?: string }) {
  const row = [...clientLogos, ...clientLogos];
  return (
    <div className={`relative min-w-0 overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white to-transparent" />
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

// Die Produktbühne: full-bleed nach rechts, Headline läuft in die Bühne
// hinein, Glas-Dashboards schweben auf eigenen Tiefenebenen davor.
function Hero({ source }: { source: HeroSource }) {
  const reduce = useReducedMotionSafe();
  const [remoteOk, setRemoteOk] = useState(true);
  const img = source.local ?? (remoteOk ? source.remote : null);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const chipAY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);
  const chipBY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -130]);
  const layerNear = useMouseLayer(14);
  const layerFar = useMouseLayer(7);

  return (
    <section ref={ref} className="relative min-h-svh overflow-hidden bg-[#f4f7f9]">
      {/* Bühne: full-bleed rechte Hälfte, langsamer als der Inhalt (Parallax) */}
      <motion.div style={{ y: stageY }} className="absolute inset-y-0 right-0 w-full lg:w-[60%]">
        <StageFallback />
        {img && (
          <img
            src={img}
            alt="Produktbühne: schwebendes Produkt im Studio-Licht"
            className="absolute inset-0 h-full w-full object-cover object-[55%_center]"
            onError={() => setRemoteOk(false)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f7f9] via-[#f4f7f9]/55 to-transparent lg:via-[#f4f7f9]/25" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f4f7f9] to-transparent" />
      </motion.div>

      {/* Schwebende Glas-Dashboards über der Bühnen-Grenze */}
      <motion.div
        style={{ y: chipAY }}
        className="absolute left-1/2 top-[24%] z-20 hidden lg:block"
      >
        <motion.div style={{ x: layerFar.x, y: layerFar.y }} className={`${glass} w-44 p-3.5`}>
          <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">Organischer Anteil</p>
          <p className="mt-0.5 text-xl font-extrabold text-brand-orange">
            <CountUp value="80 %" />
          </p>
          <svg viewBox="0 0 130 32" className="mt-1 w-full">
            <DrawPath d="M2 27 C30 25 55 19 80 12 C100 7 116 5 128 3" stroke="#ff8a00" delay={0.5} />
          </svg>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ y: chipBY }}
        className="absolute right-[6%] top-[58%] z-20 hidden lg:block"
      >
        <motion.div style={{ x: layerNear.x, y: layerNear.y }} className={`${glass} w-40 rotate-2 p-3.5`}>
          <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">TACoS</p>
          <p className="mt-0.5 text-lg font-extrabold text-brand-red">
            <CountUp value="−35 %" />
          </p>
          <svg viewBox="0 0 130 30" className="mt-1 w-full">
            <DrawPath d="M2 5 C30 7 55 13 80 19 C100 24 116 26 128 27" stroke="#ff3131" strokeWidth={2} delay={0.7} />
          </svg>
        </motion.div>
      </motion.div>

      {/* Inhalt: asymmetrisch links, Headline läuft über die Bühnen-Kante */}
      <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 pb-24 pt-24">
        <RiseIn>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </RiseIn>
        <RiseIn delay={0.08}>
          <h1 className="mt-5 max-w-[16ch] text-[clamp(2.1rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight text-ink lg:max-w-[60%] xl:max-w-[55%]">
            Profitables Wachstum auf Amazon.{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
              Nicht teuer erkaufter Umsatz.
            </span>
          </h1>
        </RiseIn>
        <RiseIn delay={0.16}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">{hero.subline}</p>
        </RiseIn>
        <RiseIn delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div>
              <CtaButton />
              <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
            </div>
            <img src={partnerBadge.src} alt={partnerBadge.alt} className="h-16 w-auto rounded-xl bg-white/80 ring-1 ring-white" />
          </div>
        </RiseIn>
      </div>

      {/* Kennzahlen-Glasband: ragt über die Sektionsgrenze in die nächste Ebene */}
      <RiseIn delay={0.3} className="absolute inset-x-0 bottom-0 z-30 translate-y-1/2 px-5">
        <div className={`${glass} mx-auto grid max-w-4xl grid-cols-2 gap-x-4 gap-y-3 rounded-3xl px-6 py-4 sm:grid-cols-4`}>
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </RiseIn>
    </section>
  );
}

/* -------------------------------- Problem -------------------------------- */

function Problem() {
  const [transitionLead, transitionPunch] = problem.transition.split(/\.\s+/);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);

  return (
    <section ref={ref} className="relative z-10 flex items-center overflow-hidden bg-white pb-16 pt-24 lg:min-h-svh lg:pb-20">
      {/* Riesige Ghost-Ziffern wandern langsam gegen die Scrollrichtung */}
      <motion.p
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[26rem] font-extrabold leading-none tracking-tighter text-ink/[0.035]"
      >
        3×
      </motion.p>
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="mb-4 border-b border-line pb-4">
          <LogoMarquee />
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <RiseIn>
            <h2 className="max-w-md text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-tight text-ink">
              {problem.headline}
            </h2>
          </RiseIn>
          <RiseIn delay={0.08}>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">{problem.intro}</p>
          </RiseIn>
        </div>
        {/* Drei Panels, diagonal gestaffelt statt im Raster */}
        <div className="mt-8 grid gap-x-5 gap-y-5 md:grid-cols-3">
          {problem.pains.map((p, i) => (
            <RiseIn
              key={p.title}
              delay={0.12 * i}
              className={i === 0 ? "md:translate-y-6" : i === 1 ? "" : "md:-translate-y-6"}
            >
              <div className="group relative h-full">
                <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/15 blur-md" />
                <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#f6f9fb] p-5 ring-1 ring-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_36px_70px_-34px_rgba(2,48,71,0.45)] transition-transform duration-300 group-hover:-translate-y-1.5">
                  <span className="text-xs font-extrabold tracking-widest text-brand-orange">0{i + 1}</span>
                  <h3 className="mt-2 text-base font-bold leading-snug text-ink">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </div>
            </RiseIn>
          ))}
        </div>
        <RiseIn delay={0.3}>
          <p className="mt-9 text-center text-sm font-bold text-ink">
            {transitionLead}.{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">{transitionPunch}</span>
          </p>
        </RiseIn>
      </div>
    </section>
  );
}

/* ------------------------- Organic First (Bühne 2) ------------------------ */

// Animierter Flächen-Chart: organischer Anteil wächst, Ads-Anteil sinkt.
function OrganicChart() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between text-[10px] text-white/60">
        <span className="font-bold text-white/90">Umsatzanteile</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <i className="h-2 w-2 rounded-full bg-brand-orange" /> organisch
          </span>
          <span className="flex items-center gap-1">
            <i className="h-2 w-2 rounded-full bg-white/30" /> Ads
          </span>
        </span>
      </div>
      <svg viewBox="0 0 380 150" className="mt-2 w-full" aria-hidden>
        <defs>
          <linearGradient id="g-organic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8a00" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff8a00" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[30, 60, 90, 120].map((y) => (
          <line key={y} x1="0" x2="380" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        ))}
        <motion.path
          d="M0 112 C50 108 90 98 140 86 C200 72 260 52 380 22 L380 150 L0 150 Z"
          fill="url(#g-organic)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
        <DrawPath d="M0 112 C50 108 90 98 140 86 C200 72 260 52 380 22" stroke="#ff8a00" strokeWidth={3} duration={2} />
        <DrawPath d="M0 82 C60 88 120 96 180 104 C250 113 320 120 380 124" stroke="rgba(255,255,255,0.35)" strokeWidth={3} duration={2} delay={0.15} />
        <motion.circle
          cx="380"
          cy="22"
          r="5"
          fill="#ff8a00"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, type: "spring", stiffness: 300, damping: 15 }}
        />
      </svg>
      <p className="mt-2 text-[11px] leading-snug text-white/60">{mechanism.target}</p>
    </div>
  );
}

function Mechanism() {
  return (
    <section className="relative z-20 px-3 pb-3 lg:px-4">
      {/* Dunkle Bühne als eigene, frei stehende Ebene über dem Weiß */}
      <div className="relative mx-auto flex min-h-[calc(100svh-1.5rem)] max-w-[1400px] items-center overflow-hidden rounded-[2.5rem] bg-brand-navy shadow-[0_60px_120px_-50px_rgba(2,48,71,0.8)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 50% 112%, rgba(255,138,0,0.25) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 40% 30% at 88% -5%, rgba(255,49,49,0.12) 0%, rgba(255,49,49,0) 70%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-28" style={{ background: "linear-gradient(to top, rgba(255,255,255,0.06), transparent)" }} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
          <RiseIn>
            <Eyebrow dark>{mechanism.eyebrow}</Eyebrow>
          </RiseIn>
          <div className="mt-4 grid items-start gap-8 lg:grid-cols-[7fr_5fr] lg:gap-14">
            <div>
              <RiseIn delay={0.06}>
                <h2 className="max-w-xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-tight text-white">
                  {mechanism.headline}
                </h2>
              </RiseIn>
              <RiseIn delay={0.12}>
                <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-white/70">{mechanism.intro}</p>
              </RiseIn>
              {/* Drei Stufen als aufsteigende, überlappende Glas-Ebenen */}
              <div className="mt-8 space-y-3">
                {mechanism.steps.map((s, i) => (
                  <RiseIn key={s.name} delay={0.14 * i}>
                    <div
                      className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-md"
                      style={{ marginLeft: `${i * 7}%`, maxWidth: "92%" }}
                    >
                      <motion.div
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-1 origin-bottom rounded-full bg-gradient-to-t from-brand-orange to-brand-red"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, delay: 0.2 + 0.14 * i, ease: EASE }}
                      />
                      <div className="flex items-baseline gap-3 pl-2">
                        <span className="text-xs font-extrabold tracking-widest text-brand-orange">0{i + 1}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">{s.name}</span>
                      </div>
                      <h3 className="mt-1 pl-2 text-base font-bold text-white">{s.title}</h3>
                      <p className="mt-1 pl-2 text-[13px] leading-relaxed text-white/70">{s.text}</p>
                    </div>
                  </RiseIn>
                ))}
              </div>
            </div>
            <RiseIn delay={0.2} className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md">
                <OrganicChart />
              </div>
            </RiseIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Cases --------------------------------- */

// Fliegendes Listing mit aufpoppendem Bestseller-Badge — das „Produkt
// fliegen lassen“ als Beleg-Inszenierung.
function FlyingListing() {
  const reduce = useReducedMotionSafe();
  const layer = useMouseLayer(10);
  return (
    <motion.div style={{ x: layer.x, y: layer.y }} className="relative hidden xl:block">
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-5, -4, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <ListingMock
          image="/assets/img/bachgold.jpg"
          title="Bachgold Original Bachblüten Tropfen Nr. 39, alkoholfrei, 20 ml"
          price="14,90 €"
          reviews="1.872"
          className="!w-[230px] shadow-[0_50px_90px_-35px_rgba(2,48,71,0.55)]"
        />
        <motion.span
          initial={{ scale: 0, rotate: -12 }}
          whileInView={{ scale: 1, rotate: -6 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.6 }}
          className="absolute -left-4 -top-3 rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] px-3 py-1 text-[11px] font-extrabold text-white shadow-[0_12px_24px_-8px_rgba(255,138,0,0.8)]"
        >
          Bestseller
        </motion.span>
      </motion.div>
      <div aria-hidden className="mx-auto mt-4 h-3 w-40 rounded-[100%] bg-brand-navy/15 blur-md" />
    </motion.div>
  );
}

function Cases() {
  return (
    <section className="relative z-10 flex items-center overflow-hidden bg-white py-16 lg:min-h-svh">
      {/* Lichtkegel aus der dunklen Bühne darüber */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{ background: "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(2,48,71,0.07), transparent 70%)" }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="grid items-center gap-10 xl:grid-cols-[8fr_3fr]">
          <div>
            <RiseIn>
              <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-tight text-ink">
                {cases.headline}
              </h2>
            </RiseIn>
            <RiseIn delay={0.06}>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{cases.subline}</p>
            </RiseIn>
            <div className="mt-8 space-y-5">
              {cases.items.map((c, i) => (
                <RiseIn key={c.brand} delay={0.1 * i}>
                  <div className={`relative ${i === 1 ? "lg:ml-16" : "lg:mr-16"}`}>
                    <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/15 blur-md" />
                    <div className="relative flex gap-5 overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#f6f9fb] p-5 ring-1 ring-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_36px_70px_-34px_rgba(2,48,71,0.45)]">
                      <div className="relative hidden h-24 w-24 shrink-0 overflow-hidden rounded-xl shadow-[0_18px_30px_-14px_rgba(2,48,71,0.5)] ring-1 ring-white sm:block">
                        <Image src={c.image} alt={c.brand} fill sizes="96px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                          {c.brand} · {c.category}
                        </p>
                        <div className="mt-1 flex items-end gap-3">
                          <p className="text-xl font-extrabold tracking-tight sm:text-2xl">
                            <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">{c.metric}</span>
                          </p>
                          <svg viewBox="0 0 72 26" className="mb-1 hidden h-5 w-16 shrink-0 sm:block" aria-hidden>
                            <DrawPath
                              d={i === 0 ? "M2 23 C18 21 32 16 46 10 C56 6 64 4 70 3" : "M2 4 C18 6 32 11 46 16 C56 20 64 22 70 23"}
                              stroke={i === 0 ? "#ff8a00" : "#ff3131"}
                              strokeWidth={2.5}
                              delay={0.3}
                            />
                          </svg>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{c.text}</p>
                        <p className="mt-1.5 text-[11px] text-ink-soft/80">{c.note}</p>
                      </div>
                    </div>
                  </div>
                </RiseIn>
              ))}
            </div>
          </div>
          <FlyingListing />
        </div>
        <RiseIn delay={0.2}>
          <div className="mx-auto mt-9 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-full border border-line bg-white px-7 py-3.5 shadow-[0_24px_48px_-24px_rgba(2,48,71,0.35)] sm:flex-row">
            <p className="text-sm font-bold text-ink sm:text-base">{midCta.question}</p>
            <CtaButton label={midCta.label} />
          </div>
        </RiseIn>
      </div>
    </section>
  );
}

/* -------------------------------- Leistungen ------------------------------ */

function Services() {
  return (
    <section className="relative z-10 flex items-center overflow-hidden py-16 lg:min-h-svh">
      {/* Studio-Hintergrundebene mit warmem Schimmer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(#ffffff, #f2f6f8 30%, #f2f6f8 70%, #ffffff), radial-gradient(ellipse 45% 40% at 90% 20%, rgba(255,138,0,0.08), transparent 70%)",
          }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="grid items-start gap-8 lg:grid-cols-[5fr_7fr] lg:gap-14">
          {/* Editorial-Spalte: Fundament + Klammer als Text, keine Boxen */}
          <div className="lg:sticky lg:top-28">
            <RiseIn>
              <h2 className="max-w-md text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-tight text-ink">
                {services.headline}
              </h2>
            </RiseIn>
            <RiseIn delay={0.08}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">{services.intro}</p>
            </RiseIn>
            <RiseIn delay={0.14}>
              <div className="mt-6 border-l-2 border-brand-orange pl-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">{services.foundation.name}</p>
                <h3 className="mt-1 text-base font-bold text-ink">{services.foundation.title}</h3>
                <p className="mt-1 max-w-md text-[13px] leading-relaxed text-ink-soft">{services.foundation.text}</p>
              </div>
            </RiseIn>
            <RiseIn delay={0.2}>
              <div className="mt-5 border-l-2 border-brand-navy pl-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">{services.bracket.name}</p>
                <h3 className="mt-1 text-base font-bold text-ink">{services.bracket.title}</h3>
                <p className="mt-1 max-w-md text-[13px] leading-relaxed text-ink-soft">{services.bracket.text}</p>
              </div>
            </RiseIn>
          </div>
          {/* Hebel als versetzt schwebende Glas-Panels */}
          <div className="space-y-5">
            {services.levers.map((l, i) => (
              <RiseIn key={l.title} delay={0.1 * i} className={i === 1 ? "lg:ml-14" : i === 2 ? "lg:ml-7" : ""}>
                <div className="group relative">
                  <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/15 blur-md" />
                  <div className={`${glass} relative p-5 transition-transform duration-300 group-hover:-translate-y-1.5`}>
                    <span className="text-xs font-extrabold tracking-widest text-brand-orange">0{i + 1}</span>
                    <h3 className="mt-1 text-base font-bold text-ink">{l.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{l.text}</p>
                  </div>
                </div>
              </RiseIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Schritte + FAQ (eine Ebene) -------------------- */

function StepsAndFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative z-10 flex items-center overflow-hidden bg-white py-16 lg:min-h-svh">
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <RiseIn>
              <h2 className="max-w-md text-[clamp(1.4rem,2.3vw,1.9rem)] font-extrabold leading-tight tracking-tight text-ink">
                {steps.headline}
              </h2>
            </RiseIn>
            <div className="relative mt-7">
              {/* Vertikale Linie zeichnet sich entlang der Schritte */}
              <svg className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-1" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden>
                <DrawPath d="M1 0 V100" stroke="#ffd9ad" strokeWidth={2} duration={1.8} />
              </svg>
              <div className="space-y-6">
                {steps.items.map((s, i) => (
                  <RiseIn key={s.title} delay={0.12 * i}>
                    <div className="relative flex gap-4">
                      <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_20px_-8px_rgba(255,138,0,0.8)]">
                        {i + 1}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-ink">{s.title}</h3>
                          <span className="rounded-full bg-[#f2f6f8] px-2.5 py-0.5 text-[10px] font-bold text-ink-soft">{s.duration}</span>
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{s.text}</p>
                      </div>
                    </div>
                  </RiseIn>
                ))}
              </div>
            </div>
          </div>
          <div>
            <RiseIn>
              <h2 className="max-w-md text-[clamp(1.4rem,2.3vw,1.9rem)] font-extrabold leading-tight tracking-tight text-ink">
                {faq.headline}
              </h2>
            </RiseIn>
            <RiseIn delay={0.1}>
              <div className="mt-7">
                {faq.items.map((item, i) => (
                  <div key={item.q} className="border-b border-line">
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
                    >
                      <span className="text-sm font-bold text-ink">{item.q}</span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2f6f8] text-ink transition-transform ${open === i ? "rotate-45" : ""}`}
                        aria-hidden
                      >
                        <svg viewBox="0 0 12 12" className="h-3 w-3">
                          <path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    {open === i && <p className="pb-4 pr-8 text-[13px] leading-relaxed text-ink-soft">{item.a}</p>}
                  </div>
                ))}
              </div>
            </RiseIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Abschluss ------------------------------ */

function Closing() {
  return (
    <section id="kontakt" className="relative z-20 px-3 pb-3 lg:px-4">
      <div className="relative mx-auto flex min-h-[calc(100svh-1.5rem)] max-w-[1400px] items-center overflow-hidden rounded-[2.5rem] bg-brand-navy shadow-[0_60px_120px_-50px_rgba(2,48,71,0.8)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% -5%, rgba(255,138,0,0.18) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 45% 35% at 12% 105%, rgba(255,49,49,0.12) 0%, rgba(255,49,49,0) 70%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
          <RiseIn>
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full shadow-[0_24px_50px_-16px_rgba(0,0,0,0.6)] ring-4 ring-white/20 sm:h-28 sm:w-28">
                <Image src={closing.photo} alt={`${closing.person}, ${closing.role}`} fill sizes="112px" className="object-cover" />
              </div>
              <h2 className="mt-6 text-[clamp(1.5rem,2.6vw,2.2rem)] font-extrabold leading-tight tracking-tight text-white">
                {closing.headline}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">{closing.text}</p>
              <p className="mt-3 text-sm font-bold text-white">
                {closing.person} · {closing.role}
              </p>
              <div className="mt-7">
                <CtaButton />
                <p className="mt-3 text-xs text-white/60">{closing.micro}</p>
              </div>
            </div>
          </RiseIn>
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-7 text-center">
            <img src="/assets/logos/logo_full_white.svg" alt="TEMOA" className="h-6 w-auto" />
            <p className="max-w-md text-xs leading-relaxed text-white/50">
              Entwurf G — „Produktbühne & Ebenen“. Navigation und Unterseiten folgen in der Umsetzungsphase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EntwurfG({ heroSource }: { heroSource: HeroSource }) {
  return (
    <main className="bg-white">
      <CursorDot />
      <Header />
      <Hero source={heroSource} />
      <Problem />
      <Mechanism />
      <Cases />
      <Services />
      <StepsAndFaq />
      <Closing />
    </main>
  );
}
