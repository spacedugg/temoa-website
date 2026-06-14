"use client";

// Stil 12 — AWARD / LIGHT / TECHNISCH. Heller, technischer Look mit:
// kontextuellen Amazon-Graphen (z.B. sinkender TACoS-Verlauf), einer
// mausdrehbaren, ausklappbaren 3D-Umkehrpyramide der Leistungen, frei
// schwebenden Objekten mit Schlagschatten, Glasmorphismus + in den Raum
// geneigten Elementen, sparsamen Glow-Rändern, Countern & sequentiell
// aufbauenden Diagrammen, ausklappbaren Inhalten gegen Textwüste.
// Inhalte: vollständiger Erst-Entwurf (lib/contentFull).

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ListingMock } from "@/components/mockups/ListingMock";
import { DashboardMock } from "@/components/mockups/DashboardMock";
import {
  cta, hero, stats, clientLogos, partnerBadge, problem, mechanism,
  cases, services, steps, faq, closing, midCta, type ServiceItem,
} from "@/lib/contentFull";

const PRODUCT =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";
// Echter Freisteller (remove_background) — Slot, sobald freigegeben/eingecheckt.
const CUTOUT = "";
const EASE = [0.21, 0.6, 0.35, 1] as const;

/* ---------- Motion-Helfer ---------- */
function useReduced() { const r = useReducedMotion(); const [m, setM] = useState(false); useEffect(() => setM(true), []); return m ? !!r : false; }

function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const m = value.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  const target = m ? parseFloat(m[2].replace(",", ".")) : 0;
  const dec = m && m[2].includes(",") ? 1 : 0;
  const [d, setD] = useState("0");
  useEffect(() => {
    if (!inView || !m) return;
    if (reduce) { setD(m[2]); return; }
    const c = animate(0, target, { duration: 1.7, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setD(dec ? v.toFixed(dec).replace(".", ",") : Math.round(v).toString()) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  if (!m) return <span className={className}>{value}</span>;
  return <span ref={ref} className={className}>{m[1]}{d}{m[3]}</span>;
}

function Float({ children, dur = 6, dist = 12, delay = 0, className = "" }: { children: ReactNode; dur?: number; dist?: number; delay?: number; className?: string }) {
  const reduce = useReduced();
  return <motion.div className={className} animate={reduce ? undefined : { y: [0, -dist, 0] }} transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}>{children}</motion.div>;
}

/* ---------- Kontextuelle Amazon-Graphen ---------- */
// Mini-Liniendiagramm, das sich beim Scrollen aufbaut. points: 0..1 (unten..oben)
function Spark({ points, color, area = false, className = "" }: { points: number[]; color: string; area?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const n = points.length;
  const X = (i: number) => (i / (n - 1)) * 100;
  const Y = (v: number) => 44 - v * 38;
  const line = points.map((v, i) => `${i === 0 ? "M" : "L"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const fill = `${line} L100 46 L0 46 Z`;
  return (
    <svg viewBox="0 0 100 48" preserveAspectRatio="none" className={className} aria-hidden>
      {[12, 24, 36].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(2,48,71,0.06)" strokeWidth="0.5" />)}
      {area && <motion.path d={fill} fill={color} fillOpacity="0.12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} />}
      <motion.path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-40px" }} transition={reduce ? { duration: 0 } : { duration: 1.4, ease: [0.3, 0.8, 0.3, 1] }} />
      <motion.circle cx={X(n - 1)} cy={Y(points[n - 1])} r="2.4" fill={color} vectorEffect="non-scaling-stroke" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.4, type: "spring", stiffness: 300, damping: 14 }} />
    </svg>
  );
}

// Organisch-vs-Ads-Flächenchart (sequentiell)
function OrganicChart() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 380 150" className="w-full" aria-hidden>
      <defs><linearGradient id="og12" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff8a00" stopOpacity="0.4" /><stop offset="100%" stopColor="#ff8a00" stopOpacity="0.02" /></linearGradient></defs>
      {[30, 60, 90, 120].map((y) => <line key={y} x1="0" x2="380" y1={y} y2={y} stroke="rgba(2,48,71,0.06)" />)}
      <motion.path d="M0 112 C50 108 90 98 140 86 C200 72 260 52 380 22 L380 150 L0 150 Z" fill="url(#og12)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.7 }} />
      <motion.path d="M0 112 C50 108 90 98 140 86 C200 72 260 52 380 22" fill="none" stroke="#ff8a00" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={reduce ? { duration: 0 } : { duration: 1.8 }} />
      <motion.path d="M0 82 C60 88 120 96 180 104 C250 113 320 120 380 124" fill="none" stroke="#9fb3c0" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={reduce ? { duration: 0 } : { duration: 1.8, delay: 0.2 }} />
    </svg>
  );
}

const glass = "rounded-3xl border border-white/70 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_30px_60px_-32px_rgba(2,48,71,0.4)] backdrop-blur-2xl";
const glow = "shadow-[0_0_0_1px_rgba(255,138,0,0.35),0_30px_60px_-28px_rgba(255,138,0,0.5),inset_0_1px_0_rgba(255,255,255,0.9)]";

function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft ${className}`}>{children}</span>;
}
function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft"><span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />{children}</span>;
}
function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-[clamp(1.8rem,3.8vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink ${className}`}>{children}</h2>;
}
function Cta({ label = cta.label }: { label?: string }) {
  return <a href={cta.href} className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] px-7 py-3.5 text-sm font-bold text-white ${glow} transition-transform hover:-translate-y-0.5`}>{label}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span></a>;
}

function Aurora() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#f5f7f9]">
      <div className="absolute -left-40 -top-32 h-[640px] w-[640px] rounded-full opacity-55 blur-[120px]" style={{ background: "radial-gradient(circle,#ffd9ad,transparent 70%)" }} />
      <div className="absolute right-[-15%] top-[12%] h-[520px] w-[520px] rounded-full opacity-45 blur-[120px]" style={{ background: "radial-gradient(circle,#ffc6bf,transparent 70%)" }} />
      <div className="absolute bottom-[4%] left-[28%] h-[600px] w-[600px] rounded-full opacity-40 blur-[130px]" style={{ background: "radial-gradient(circle,#bcd9ec,transparent 70%)" }} />
    </div>
  );
}

/* ---------- 3D-Umkehrpyramide der Leistungen ---------- */
function Pyramid({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const reduce = useReduced();
  const layers = [
    { tag: services.bracket.name, title: services.bracket.title },
    { tag: "Hebel", title: services.levers[0].title },
    { tag: "Hebel", title: services.levers[1].title },
    { tag: "Hebel", title: services.levers[2].title },
    { tag: services.foundation.name, title: services.foundation.title },
  ];
  const widths = [100, 84, 68, 52, 38];
  const rx = useMotionValue(16); const ry = useMotionValue(-14);
  const srx = useSpring(rx, { stiffness: 110, damping: 16 }); const sry = useSpring(ry, { stiffness: 110, damping: 16 });
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 34 - 6);
    rx.set(16 - ((e.clientY - r.top) / r.height - 0.5) * 22);
  };
  const reset = () => { rx.set(16); ry.set(-14); };
  return (
    <div className="[perspective:1200px]" onMouseMove={onMove} onMouseLeave={reset}>
      <motion.div style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }} className="flex flex-col items-center gap-2.5">
        {layers.map((l, i) => {
          const on = active === i;
          return (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: `${widths[i]}%`, transform: `translateZ(${(layers.length - i) * 16}px)` }}
              className={`relative flex h-16 items-center justify-center rounded-2xl border px-4 text-center transition-colors ${on ? `border-brand-orange/50 bg-white ${glow}` : "border-white/70 bg-white/55 shadow-[0_18px_36px_-22px_rgba(2,48,71,0.5)] backdrop-blur-xl hover:bg-white/80"}`}
            >
              <span aria-hidden className="absolute inset-x-3 -bottom-1 h-1 rounded-full bg-brand-navy/10 blur-[2px]" />
              <span>
                <Mono className={on ? "!text-brand-orange" : ""}>{l.tag}</Mono>
                <span className="block text-[13px] font-bold leading-tight text-ink sm:text-sm">{l.title}</span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Stil12() {
  const [openF, setOpenF] = useState<number | null>(0);
  const [layer, setLayer] = useState(0);
  const [imgOk, setImgOk] = useState(true);
  const heroSrc = CUTOUT || PRODUCT;
  const allLayers: ServiceItem[] = [services.bracket, services.levers[0], services.levers[1], services.levers[2], services.foundation];

  return (
    <main className="relative text-ink">
      <Aurora />

      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/80 bg-white/60 px-5 py-2.5 shadow-[0_10px_30px_-14px_rgba(2,48,71,0.3)] backdrop-blur-2xl">
          <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-7 text-sm font-bold text-ink/80 lg:flex"><span>Leistungen</span><a href="#cases">Cases</a><span>Team</span></nav>
          <a href={cta.href} className="rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white">{cta.short}</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-svh items-center px-5 pt-28 pb-12 lg:pt-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[5fr_6fr]">
          <div>
            <Reveal><Eyebrow>{hero.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-[clamp(2.3rem,4.8vw,3.9rem)] font-extrabold leading-[1.0] tracking-[-0.03em]">
                Profitables Wachstum auf Amazon.{" "}
                <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">Nicht teuer erkaufter Umsatz.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}><p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">{hero.subline}</p></Reveal>
            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-4"><Cta /><a href="#cases" className="text-sm font-bold text-ink underline decoration-brand-orange decoration-2 underline-offset-4">Ergebnisse ansehen</a></div>
              <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
            </Reveal>
            <Reveal delay={0.24}><div className="mt-7 flex items-center gap-4"><img src={partnerBadge.src} alt={partnerBadge.alt} className="h-12 w-auto rounded-lg bg-white/70 p-1 ring-1 ring-white" /><span className="text-xs text-ink-soft">Verifizierter Amazon-Partner</span></div></Reveal>
          </div>

          {/* schwebende, in den Raum geneigte Objekte */}
          <Reveal delay={0.12}>
            <div className="relative mx-auto h-[460px] w-full max-w-xl [perspective:1400px]">
              <div aria-hidden className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(circle,rgba(255,138,0,0.3),transparent 70%)" }} />
              <Float dur={8} dist={16} className="absolute left-1/2 top-1/2 w-[74%] -translate-x-1/2 -translate-y-1/2">
                <div className="overflow-hidden rounded-[2rem] shadow-[0_60px_100px_-44px_rgba(2,48,71,0.6)] [transform:rotateY(-16deg)_rotateX(6deg)]" style={{ background: "radial-gradient(circle at 55% 35%, #fff, #e7eef3 70%)" }}>
                  {imgOk && <img src={heroSrc} alt="Produkt im Studio-Licht" className="aspect-square w-full object-cover" onError={() => setImgOk(false)} />}
                </div>
              </Float>
              <Float dur={6} dist={12} delay={0.4} className="absolute -left-3 top-8 w-44">
                <div className={`${glass} p-3.5 [transform:rotateY(10deg)]`}><Mono>TACoS · 12 Monate</Mono><p className="mt-0.5 text-xl font-extrabold text-brand-red">−44 %</p><Spark points={[0.9, 0.72, 0.55, 0.38, 0.2]} color="#ff3131" className="mt-1 h-7 w-full" /></div>
              </Float>
              <Float dur={6.5} dist={12} delay={0.9} className="absolute -right-2 top-1/3 w-40">
                <div className={`${glass} p-3.5 [transform:rotateY(-12deg)]`}><Mono>Umsatz · Quartal</Mono><p className="mt-0.5 text-xl font-extrabold text-brand-orange">+147 %</p><Spark points={[0.2, 0.34, 0.5, 0.72, 0.95]} color="#ff8a00" area className="mt-1 h-7 w-full" /></div>
              </Float>
              <Float dur={7} dist={12} delay={0.2} className="absolute bottom-3 left-4 w-[210px]">
                <div className="[transform:rotateY(8deg)]"><ListingMock image={cases.items[0].image} title="Vitaworld Vitamin D3 + K2, 50 ml" price="19,90 €" reviews="2.314" className="!w-[210px] shadow-[0_44px_80px_-34px_rgba(2,48,71,0.55)]" /></div>
              </Float>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOCIAL PROOF — Counter + Marquee */}
      <section className="relative px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className={`${glass} px-5 py-4 text-center`}><p className="text-3xl font-extrabold tracking-tight text-ink"><CountUp value={s.value} /></p><p className="mt-1 text-[11px] leading-snug text-ink-soft">{s.label}</p></div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">Marken, die uns ihr Amazon-Geschäft anvertrauen</p>
            <div className="relative mt-4 overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f5f7f9] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f5f7f9] to-transparent" />
              <div className="flex w-max items-center" style={{ animation: "marquee-left 45s linear infinite" }}>
                {[...clientLogos, ...clientLogos].map((l, i) => <div key={i} className="grid h-12 w-32 shrink-0 place-items-center px-3"><img src={l.src} alt={l.name} className="max-h-9 w-auto max-w-full object-contain opacity-55 grayscale transition-all hover:opacity-100 hover:grayscale-0" /></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM — mit kontextuellem TACoS/Marge-Graph */}
      <section className="relative px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-end gap-6 lg:grid-cols-[3fr_2fr]">
            <Reveal><H2 className="max-w-xl">{problem.headline}</H2></Reveal>
            <Reveal delay={0.06}><p className="text-sm leading-relaxed text-ink-soft">{problem.intro}</p></Reveal>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {problem.pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className={i === 1 ? "md:mt-8" : i === 2 ? "md:mt-16" : ""}>
                <div className={`${glass} h-full p-6`}>
                  <Mono>{`Symptom 0${i + 1}`}</Mono>
                  <h3 className="mt-2 text-base font-bold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.text}</p>
                  {i === 1 && (
                    <div className="mt-4 rounded-xl bg-white/60 p-3 ring-1 ring-white">
                      <div className="flex items-center justify-between"><Mono>TACoS ↑ · Marge ↓</Mono><span className="text-[10px] font-bold text-brand-red">teuer</span></div>
                      <Spark points={[0.25, 0.38, 0.5, 0.66, 0.82]} color="#ff3131" area className="mt-1 h-10 w-full" />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}><p className="mt-10 text-center text-base font-bold">Das Problem ist selten das Budget. <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">Es ist die Reihenfolge.</span></p></Reveal>
        </div>
      </section>

      {/* MECHANISM — Organic First + Flächenchart */}
      <section className="relative px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{mechanism.eyebrow}</Eyebrow>
            <Reveal><H2 className="mt-4 max-w-lg">{mechanism.headline}</H2></Reveal>
            <Reveal delay={0.06}><p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">{mechanism.intro}</p></Reveal>
            <div className="mt-6 space-y-3">
              {mechanism.steps.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.08}>
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-b from-brand-orange to-[#f57600] text-sm font-extrabold text-white shadow-[0_12px_24px_-8px_rgba(255,138,0,0.7)]">{i + 1}</span>
                    <div><p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">{s.name}</p><h3 className="text-base font-bold">{s.title}</h3><p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{s.text}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15}>
            <div className={`${glass} p-6`}>
              <div className="flex items-center justify-between"><Mono>Umsatzanteile · Zielbild</Mono><span className="flex items-center gap-3 text-[10px] text-ink-soft"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-brand-orange" /> organisch</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#9fb3c0]" /> Ads</span></span></div>
              <div className="mt-2"><OrganicChart /></div>
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-3">
                <p className="text-3xl font-extrabold text-brand-orange"><CountUp value="80 %" /></p>
                <p className="text-[12px] leading-snug text-ink-soft">{mechanism.target}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CASES — Produktfotos + kontextuelle Graphen */}
      <section id="cases" className="relative px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center"><Eyebrow>Beweis</Eyebrow></div>
          <Reveal><H2 className="mt-4 text-center">{cases.headline}</H2></Reveal>
          <Reveal delay={0.06}><p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">{cases.subline}</p></Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {cases.items.map((c, i) => (
              <Reveal key={c.brand} delay={i * 0.1} className={i === 1 ? "lg:mt-10" : ""}>
                <div className={`${glass} h-full p-6`}>
                  <div className="flex items-center gap-5">
                    <Float dur={6} dist={8} delay={i * 0.3} className="shrink-0">
                      <div className="relative h-24 w-24 overflow-hidden rounded-2xl shadow-[0_24px_44px_-20px_rgba(2,48,71,0.55)] ring-1 ring-white [transform:rotateY(-10deg)]"><Image src={c.image} alt={c.brand} fill sizes="96px" className="object-cover" /></div>
                    </Float>
                    <div>
                      <Mono>{c.brand} · {c.category}</Mono>
                      <p className="mt-1 text-3xl font-extrabold tracking-tight text-brand-orange">{c.metricTo}</p>
                      <p className="text-sm font-bold">{c.metric}</p>
                    </div>
                    <div className="ml-auto w-24 shrink-0">
                      <Spark points={i === 0 ? [0.85, 0.68, 0.5, 0.34, 0.2] : [0.8, 0.66, 0.52, 0.38, 0.26]} color={i === 0 ? "#ff8a00" : "#ff3131"} className="h-12 w-full" />
                      <Mono className="!text-[9px]">{i === 0 ? "TACoS ↓" : "TACoS ↓"}</Mono>
                    </div>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">{c.text}</p>
                  <p className="mt-2 text-[11px] text-ink-soft/80">{c.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-between gap-4 rounded-full border border-white/70 bg-white/60 px-7 py-4 text-center backdrop-blur sm:flex-row sm:text-left">
              <p className="text-sm font-bold">{midCta.question}</p><Cta label={midCta.label} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* LEISTUNGEN — 3D-Umkehrpyramide (mausdrehbar, ausklappbar) */}
      <section className="relative px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Das System</Eyebrow>
            <Reveal><H2 className="mt-4">{services.headline}</H2></Reveal>
            <Reveal delay={0.06}><p className="mt-4 text-sm leading-relaxed text-ink-soft">{services.intro}</p></Reveal>
          </div>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <Pyramid active={layer} setActive={setLayer} />
                <p className="mt-6 text-center"><Mono>↕ Ebene wählen · mit der Maus drehen</Mono></p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {/* Detail der gewählten Ebene (ausklappbar statt Textwüste) */}
              <div className={`${glass} ${glow} p-7`}>
                <Mono className="!text-brand-orange">{allLayers[layer].name ?? "Wachstumshebel"}{allLayers[layer].subBrand ? ` · ${allLayers[layer].subBrand}` : ""}</Mono>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{allLayers[layer].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{allLayers[layer].text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {allLayers.map((l, i) => (
                    <button key={i} onClick={() => setLayer(i)} className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${layer === i ? "bg-brand-orange text-white" : "bg-white/70 text-ink-soft ring-1 ring-white hover:text-ink"}`}>{l.title}</button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SO STARTEN WIR */}
      <section className="relative px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center"><Eyebrow>Ablauf</Eyebrow></div>
          <Reveal><H2 className="mx-auto mt-4 max-w-2xl text-center">{steps.headline}</H2></Reveal>
          <div className="relative mt-14 grid gap-10 md:grid-cols-3">
            <svg viewBox="0 0 1000 60" className="absolute -top-7 left-0 hidden w-full md:block" preserveAspectRatio="none" aria-hidden>
              <motion.path d="M60 30 C 300 -10, 360 70, 500 30 C 640 -10, 700 70, 940 30" fill="none" stroke="#ffcf9c" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
            </svg>
            {steps.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="text-center">
                  <Float dur={5 + i} dist={8}><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl font-extrabold text-brand-orange shadow-[0_20px_40px_-18px_rgba(2,48,71,0.4)] ring-1 ring-white">{i + 1}</span></Float>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2"><h3 className="text-base font-bold">{s.title}</h3><span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-bold text-ink-soft">{s.duration}</span></div>
                  <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — ausklappbar */}
      <section className="relative px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center"><Eyebrow>Vertrauen</Eyebrow></div>
          <Reveal><H2 className="mt-4 text-center">{faq.headline}</H2></Reveal>
          <Reveal delay={0.08}>
            <div className={`${glass} mt-8 overflow-hidden`}>
              {faq.items.map((f, i) => (
                <div key={f.q} className={i > 0 ? "border-t border-ink/10" : ""}>
                  <button onClick={() => setOpenF(openF === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"><span className="text-sm font-bold">{f.q}</span><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/70 text-ink transition-transform ${openF === i ? "rotate-45" : ""}`}><svg viewBox="0 0 12 12" className="h-3 w-3"><path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span></button>
                  {openF === i && <p className="px-6 pb-4 text-[13px] leading-relaxed text-ink-soft">{f.a}</p>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABSCHLUSS-CTA */}
      <section id="kontakt" className="relative px-5 pb-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-navy to-[#034d6e] p-10 text-center text-white shadow-[0_60px_120px_-50px_rgba(2,48,71,0.7)] sm:p-16">
          <div aria-hidden className="absolute -left-10 bottom-0 h-72 w-72 rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle,rgba(255,138,0,0.5),transparent 70%)" }} />
          <div className="relative mx-auto max-w-2xl">
            <Float dur={6} dist={8}><div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/20"><Image src={closing.photo} alt={closing.person} fill sizes="96px" className="object-cover" /></div></Float>
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">{closing.headline}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75">{closing.text}</p>
            <p className="mt-5 text-sm font-bold">{closing.person} · {closing.role}</p>
            <div className="mt-6"><Cta /></div>
            <p className="mt-3 text-xs text-white/60">{closing.micro}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
