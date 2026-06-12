"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ListingMock } from "@/components/mockups/ListingMock";
import {
  cta,
  hero,
  socialProof,
  clientLogos,
  partnerBadge,
  problem,
  mechanism,
  cases,
  services,
  steps,
  trustSection,
  banner,
  footer,
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
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.85, delay, ease: EASE }}
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
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block" style={{ x: sx, y: sy }}>
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
        <path d="M2 8h11M9 3.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          <a href="#cases" className="transition-colors hover:text-brand-orange">Case Studies</a>
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

function H2({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <h2 className={`text-[clamp(1.5rem,2.7vw,2.2rem)] font-extrabold leading-tight tracking-tight ${dark ? "text-white" : "text-ink"} ${className}`}>
      {children}
    </h2>
  );
}

// Glas-Panel: Material für hervorgehobene Einzel-Elemente (kein Raster).
const glass =
  "rounded-2xl border border-white/70 bg-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_28px_55px_-22px_rgba(2,48,71,0.45)] backdrop-blur-xl";

/* ---------------------------------- Hero --------------------------------- */

// CSS-Produktbühne als Fallback hinter dem fotorealistischen Render.
function StageFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 55% 32%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(ellipse 55% 42% at 60% 82%, rgba(255,138,0,0.22) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 35% 28% at 30% 90%, rgba(255,49,49,0.1) 0%, rgba(255,49,49,0) 70%), linear-gradient(#f4f7f9, #eef3f6)",
        }}
      />
      <div
        className="absolute left-1/2 top-[56%] h-40 w-40 -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 35%, #ffffff, #dde7ed 70%)",
          boxShadow: "0 30px 60px -20px rgba(2,48,71,0.35), inset 0 2px 6px rgba(255,255,255,0.9)",
        }}
      />
      <div
        className="absolute left-1/2 top-[22%] h-36 w-[5.5rem] -translate-x-1/2 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #fbbf6b 0%, #b45309 45%, #7c2d12 100%)",
          boxShadow:
            "0 50px 70px -30px rgba(2,48,71,0.5), -8px 0 24px -12px rgba(255,138,0,0.9), 8px 0 24px -12px rgba(255,49,49,0.7)",
        }}
      />
      <div className="absolute left-1/2 top-[66%] h-6 w-36 -translate-x-1/2 rounded-[100%] bg-[#023047]/20 blur-lg" />
    </div>
  );
}

// Die Bühne: sauber gefasstes Panel. Account-Cockpit liegt INNERHALB der
// Bühne, das Listing-Mockup schwebt an der Außenkante — nichts überlagert
// den Text.
function HeroStage({ source }: { source: HeroSource }) {
  const reduce = useReducedMotionSafe();
  const [remoteOk, setRemoteOk] = useState(true);
  const img = source.local ?? (remoteOk ? source.remote : null);

  return (
    <div className="relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-[0_3px_6px_rgba(2,48,71,0.05),0_60px_100px_-45px_rgba(2,48,71,0.55)] ring-1 ring-white sm:aspect-[16/10] lg:aspect-[10/11] lg:max-h-[66svh]">
        <StageFallback />
        {img && (
          <img
            src={img}
            alt="Produktbühne: schwebendes Produkt im Studio-Licht"
            className="absolute inset-0 h-full w-full object-cover object-[58%_30%]"
            onError={() => setRemoteOk(false)}
          />
        )}
        {/* Account-Cockpit: Glas-Panel unten in der Bühne */}
        <div className={`${glass} absolute inset-x-4 bottom-4 !rounded-xl p-3.5`}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <img src="/assets/logos/logo_icon.svg" alt="" className="h-3.5 w-auto" />
              <span className="text-[10px] font-bold tracking-wide text-ink">Account-Cockpit</span>
            </span>
            <span className="rounded-md bg-white/70 px-1.5 py-0.5 text-[9px] font-bold text-ink-soft">Kundenbeispiel</span>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {hero.cockpit.map((k) => (
              <div key={k.label}>
                <p className="text-sm font-extrabold leading-none text-ink sm:text-base">
                  <CountUp value={k.value} />
                </p>
                <p className="mt-1 text-[9px] leading-tight text-ink-soft">{k.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Listing-Mockup: schwebt sanft an der Bühnen-Außenkante */}
      <motion.div
        className="absolute -left-10 top-8 hidden xl:block"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ListingMock
          image={hero.listing.image}
          title={hero.listing.title}
          price={hero.listing.price}
          reviews={hero.listing.reviews}
          className="!w-[190px] -rotate-3 shadow-[0_45px_80px_-35px_rgba(2,48,71,0.55)]"
        />
      </motion.div>
    </div>
  );
}

function Hero({ source }: { source: HeroSource }) {
  return (
    <section className="relative overflow-hidden bg-[#f4f7f9]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% -10%, #ffffff 0%, rgba(255,255,255,0) 60%), radial-gradient(ellipse 40% 30% at 95% 90%, rgba(255,138,0,0.08), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid min-h-svh w-full max-w-6xl items-center gap-10 px-5 pb-12 pt-24 lg:grid-cols-[11fr_9fr] lg:gap-16 lg:pt-20">
        <div>
          <RiseIn>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </RiseIn>
          <RiseIn delay={0.08}>
            <h1 className="mt-5 max-w-xl text-[clamp(2.1rem,4.4vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
              Amazon-Wachstum, das{" "}
              <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                Marge übrig lässt.
              </span>
            </h1>
          </RiseIn>
          <RiseIn delay={0.16}>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">{hero.subline}</p>
          </RiseIn>
          <RiseIn delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <CtaButton />
              <a
                href={hero.secondary.href}
                className="text-sm font-bold text-ink underline decoration-brand-orange decoration-2 underline-offset-4 transition-colors hover:text-brand-orange"
              >
                {hero.secondary.label}
              </a>
            </div>
          </RiseIn>
          <RiseIn delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex -space-x-2.5">
                {hero.trustPhotos.map((p) => (
                  <span key={p} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#f4f7f9]">
                    <Image src={p} alt="" fill sizes="36px" className="object-cover" />
                  </span>
                ))}
              </span>
              <span className="space-y-0.5 text-xs text-ink-soft">
                {hero.trust.map((t) => (
                  <span key={t.text} className="block">
                    <strong className="font-extrabold text-ink">{t.value}</strong> {t.text}
                  </span>
                ))}
              </span>
              <img src={partnerBadge.src} alt={partnerBadge.alt} className="h-12 w-auto rounded-lg bg-white ring-1 ring-line" />
            </div>
          </RiseIn>
        </div>
        <RiseIn delay={0.12}>
          <HeroStage source={source} />
        </RiseIn>
      </div>
    </section>
  );
}

/* ------------------------------ Social Proof ------------------------------ */

function LogoMarquee() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <div className="relative min-w-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max items-center" style={{ animation: "marquee-left 45s linear infinite" }}>
        {row.map((l, i) => (
          <div key={`${l.name}-${i}`} className="group grid h-14 w-32 shrink-0 place-items-center px-3">
            <img
              src={l.src}
              alt={l.name}
              className="max-h-10 w-auto max-w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <section className="relative z-10 border-y border-line bg-white py-8">
      <div className="mx-auto w-full max-w-6xl px-5">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">{socialProof.line}</p>
        <div className="mt-4">
          <LogoMarquee />
        </div>
        <div className="mx-auto mt-5 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 text-center sm:grid-cols-4">
          {socialProof.stats.map((s) => (
            <div key={s.label}>
              <p className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-0.5 text-[11px] text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Problem -------------------------------- */

function Problem() {
  return (
    <section className="relative flex items-center overflow-hidden bg-white py-16 lg:min-h-[85svh]">
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <RiseIn>
          <H2 className="text-center">{problem.headline}</H2>
        </RiseIn>
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
          {problem.pains.map((p, i) => (
            <RiseIn key={p.title} delay={0.1 * i} className="h-full">
              <div className="group relative h-full">
                <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/10 blur-md" />
                <div className="relative h-full rounded-2xl bg-gradient-to-b from-white to-[#f6f9fb] p-6 text-center ring-1 ring-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_36px_70px_-34px_rgba(2,48,71,0.4)] transition-transform duration-300 group-hover:-translate-y-1.5">
                  <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/10 text-sm font-extrabold text-brand-orange">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-base font-bold leading-snug text-ink">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </div>
            </RiseIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Organic First (dunkle Bühne) --------------------- */

function OrganicChart() {
  return (
    <div>
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
      <svg viewBox="0 0 380 140" className="mt-2 w-full" aria-hidden>
        <defs>
          <linearGradient id="g-organic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8a00" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff8a00" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[28, 56, 84, 112].map((y) => (
          <line key={y} x1="0" x2="380" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        ))}
        <motion.path
          d="M0 104 C50 100 90 92 140 80 C200 66 260 48 380 20 L380 140 L0 140 Z"
          fill="url(#g-organic)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
        <DrawPath d="M0 104 C50 100 90 92 140 80 C200 66 260 48 380 20" stroke="#ff8a00" strokeWidth={3} duration={2} />
        <DrawPath d="M0 76 C60 82 120 90 180 97 C250 105 320 111 380 115" stroke="rgba(255,255,255,0.35)" strokeWidth={3} duration={2} delay={0.15} />
        <motion.circle
          cx="380"
          cy="20"
          r="5"
          fill="#ff8a00"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, type: "spring", stiffness: 300, damping: 15 }}
        />
      </svg>
    </div>
  );
}

function Mechanism() {
  return (
    <section className="relative z-20 px-3 pb-3 lg:px-4">
      {/* Dunkle Bühne als eigene Ebene über dem Weiß */}
      <div className="relative mx-auto flex min-h-[calc(100svh-1.5rem)] max-w-[1400px] items-center overflow-hidden rounded-[2.5rem] bg-brand-navy shadow-[0_60px_120px_-50px_rgba(2,48,71,0.8)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 50% 112%, rgba(255,138,0,0.25) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 40% 30% at 88% -5%, rgba(255,49,49,0.12) 0%, rgba(255,49,49,0) 70%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <RiseIn>
              <Eyebrow dark>{mechanism.eyebrow}</Eyebrow>
            </RiseIn>
            <RiseIn delay={0.06}>
              <H2 dark className="mt-4">
                {mechanism.headline}
              </H2>
            </RiseIn>
            <RiseIn delay={0.12}>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{mechanism.core}</p>
            </RiseIn>
          </div>
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-3">
              {mechanism.steps.map((s, i) => (
                <RiseIn key={s.name} delay={0.12 * i}>
                  <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-4 pl-5 backdrop-blur-md">
                    <motion.div
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-1 origin-bottom bg-gradient-to-t from-brand-orange to-brand-red"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.8, delay: 0.2 + 0.12 * i, ease: EASE }}
                    />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                      0{i + 1} · {s.name}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-white">{s.title}</h3>
                  </div>
                </RiseIn>
              ))}
              <RiseIn delay={0.4}>
                <p className="pt-2 text-[13px] leading-relaxed text-white/65">{mechanism.model}</p>
              </RiseIn>
            </div>
            <RiseIn delay={0.2}>
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

function Cases() {
  return (
    <section id="cases" className="relative flex items-center overflow-hidden bg-white py-16 lg:min-h-[88svh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56"
        style={{ background: "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(2,48,71,0.06), transparent 70%)" }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <RiseIn>
          <H2 className="text-center">{cases.headline}</H2>
        </RiseIn>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {cases.items.map((c, i) => (
            <RiseIn key={c.brand} delay={0.1 * i} className="h-full">
              <div className="group relative h-full">
                <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/10 blur-md" />
                <div className="relative flex h-full flex-col rounded-2xl bg-gradient-to-b from-white to-[#f6f9fb] p-6 ring-1 ring-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_36px_70px_-34px_rgba(2,48,71,0.4)] transition-transform duration-300 group-hover:-translate-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                    {c.brand} · {c.category}
                  </p>
                  <p className="mt-3 text-3xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                      <CountUp value={c.metric} />
                    </span>
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-ink">{c.metricLabel}</p>
                  <p className="mt-2 text-[13px] text-ink-soft">{c.sub}</p>
                  <svg viewBox="0 0 200 36" className="mt-auto w-full pt-4" aria-hidden>
                    <DrawPath
                      d={i === 0 ? "M2 32 C50 28 90 22 130 14 C160 8 185 5 198 3" : "M2 30 C40 28 70 24 100 18 C140 11 175 6 198 4"}
                      stroke={i === 0 ? "#ff8a00" : "#ff3131"}
                      strokeWidth={3}
                      delay={0.3}
                    />
                  </svg>
                </div>
              </div>
            </RiseIn>
          ))}
          <RiseIn delay={0.2} className="h-full">
            <a href="#kontakt" className="group relative block h-full">
              <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/20 blur-md" />
              <div className="relative flex h-full flex-col items-center justify-center rounded-2xl bg-brand-navy p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_36px_70px_-34px_rgba(2,48,71,0.8)] transition-transform duration-300 group-hover:-translate-y-1.5">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ background: "radial-gradient(ellipse 70% 60% at 80% 110%, rgba(255,138,0,0.2), transparent 70%)" }}
                />
                <p className="text-4xl font-extrabold text-white">
                  <CountUp value={cases.portfolio.value} />
                </p>
                <p className="mt-1 text-sm font-bold text-white/90">{cases.portfolio.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange">
                  {cases.portfolio.link}
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M2 8h11M9 3.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          </RiseIn>
        </div>
        <RiseIn delay={0.26}>
          <p className="mt-6 text-center text-[11px] text-ink-soft/80">{cases.note}</p>
        </RiseIn>
      </div>
    </section>
  );
}

/* -------------------------------- Leistungen ------------------------------ */

function Services() {
  return (
    <section className="relative flex items-center overflow-hidden py-16 lg:min-h-[92svh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(#ffffff, #f2f6f8 25%, #f2f6f8 75%, #ffffff), radial-gradient(ellipse 45% 40% at 92% 15%, rgba(255,138,0,0.07), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <RiseIn>
            <H2>{services.headline}</H2>
          </RiseIn>
          <RiseIn delay={0.08}>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{services.intro}</p>
          </RiseIn>
        </div>
        {/* Leistungen mit je einem Satz — Liste, kein Kachel-Raster */}
        <RiseIn delay={0.14}>
          <div className="mx-auto mt-10 grid max-w-4xl gap-x-12 md:grid-cols-2">
            {services.items.map((s, i) => (
              <div key={s.title} className="group flex items-baseline gap-4 border-b border-line py-4">
                <span className="text-[11px] font-extrabold tracking-widest text-brand-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink transition-colors group-hover:text-brand-orange">{s.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </RiseIn>
      </div>
    </section>
  );
}

/* ------------------------- Schritte + Vertrauen --------------------------- */

function StepsAndTrust() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative flex items-center overflow-hidden bg-white py-16 lg:min-h-svh">
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <RiseIn>
          <H2 className="text-center">{steps.headline}</H2>
        </RiseIn>
        <div className="relative mx-auto mt-10 max-w-5xl">
          <svg viewBox="0 0 1000 8" className="absolute -top-5 left-0 hidden w-full md:block" preserveAspectRatio="none" aria-hidden>
            <DrawPath d="M10 4 H990" stroke="#ffd9ad" strokeWidth={2} duration={1.8} />
          </svg>
          <div className="grid gap-x-8 gap-y-6 md:grid-cols-3">
            {steps.items.map((s, i) => (
              <RiseIn key={s.title} delay={0.1 * i}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_20px_-8px_rgba(255,138,0,0.8)]">
                  {i + 1}
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-ink">{s.title}</h3>
                  <span className="rounded-full bg-[#f2f6f8] px-2.5 py-0.5 text-[10px] font-bold text-ink-soft">{s.duration}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{s.text}</p>
              </RiseIn>
            ))}
          </div>
        </div>
        {/* Vertrauen: Kundenbindung + FAQ */}
        <div className="mx-auto mt-14 grid max-w-5xl items-start gap-10 border-t border-line pt-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <RiseIn>
            <p className="text-5xl font-extrabold tracking-tight">
              <CountUp
                value={trustSection.retention.value}
                className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent"
              />
            </p>
            <h3 className="mt-2 text-lg font-extrabold text-ink">{trustSection.retention.headline}</h3>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ink-soft">{trustSection.retention.text}</p>
          </RiseIn>
          <RiseIn delay={0.1}>
            <div>
              {trustSection.faq.map((item, i) => (
                <div key={item.q} className={i > 0 ? "border-t border-line" : ""}>
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-3 text-left">
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
                  {open === i && <p className="pb-3.5 pr-8 text-[13px] leading-relaxed text-ink-soft">{item.a}</p>}
                </div>
              ))}
            </div>
          </RiseIn>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- CTA-Banner + Footer ---------------------------- */

function ClosingBanner() {
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
                <Image src={banner.photo} alt={`${banner.person}, ${banner.role}`} fill sizes="112px" className="object-cover" />
              </div>
              <h2 className="mt-6 text-[clamp(1.6rem,2.8vw,2.3rem)] font-extrabold leading-tight tracking-tight text-white">
                {banner.headline}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">{banner.text}</p>
              <ul className="mt-5 flex flex-col gap-2 text-sm text-white/85 sm:flex-row sm:gap-6">
                {banner.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden>
                      <path d="M2.5 8.5l3.5 3.5 7-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-bold text-white">
                {banner.person} · {banner.role}
              </p>
              <div className="mt-5">
                <CtaButton />
              </div>
            </div>
          </RiseIn>
          <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-7 text-center">
            <img src="/assets/logos/logo_full_white.svg" alt="TEMOA" className="h-6 w-auto" />
            <p className="max-w-md text-xs leading-relaxed text-white/50">{footer.description}</p>
            <p className="max-w-md text-[11px] leading-relaxed text-white/35">
              Entwurf G — Navigation und Unterseiten folgen in der Umsetzungsphase.
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
      <SocialProof />
      <Problem />
      <Mechanism />
      <Cases />
      <Services />
      <StepsAndTrust />
      <ClosingBanner />
    </main>
  );
}
