"use client";

// Stil 6 — PRODUKT-BÜHNE. Cinematischer 3D-Hero: schwebendes Produkt auf
// glänzendem Podest, Orange/Rot-Lichtkanten, Glas-Dashboards umkreisen das
// Produkt (Float + Maus-Parallaxe). Darunter helle, premium-glatte Sektionen
// (Grovia-Anmutung): viel Luft, weiche gerundete Karten, klare Hierarchie.

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

// Cinematische Produkt-Bühne (Higgsfield). Remote-Render mit CSS-Fallback.
const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260613_175013_2ebf36f7-df9f-4bb0-9431-17f5545a64cf.png";
const HERO_IMG_FALLBACK =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

/* -------- Motion-Helfer -------- */
function useReduced() {
  const r = useReducedMotion();
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m ? !!r : false;
}
function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const m = value.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  const target = m ? parseFloat(m[2].replace(",", ".")) : 0;
  const dec = m && m[2].includes(",") ? 1 : 0;
  const [d, setD] = useState("0");
  useEffect(() => {
    if (!inView || !m) return;
    if (reduce) { setD(m[2]); return; }
    const c = animate(0, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setD(dec ? v.toFixed(dec).replace(".", ",") : Math.round(v).toString()) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  if (!m) return <span className={className}>{value}</span>;
  return <span ref={ref} className={className}>{m[1]}{d}{m[3]}</span>;
}
function DrawPath({ d, stroke, w = 2.5, delay = 0 }: { d: string; stroke: string; w?: number; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.path d={d} fill="none" stroke={stroke} strokeWidth={w} strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-60px" }} transition={reduce ? { duration: 0 } : { duration: 1.6, delay, ease: [0.3, 0.8, 0.3, 1] }} />;
}
// Maus-Parallaxe-Ebene
function useMouse(strength: number) {
  const reduce = useReduced();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 }), sy = useSpring(y, { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (reduce) return;
    const on = (e: MouseEvent) => { x.set(((e.clientX / window.innerWidth) * 2 - 1) * strength); y.set(((e.clientY / window.innerHeight) * 2 - 1) * strength); };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, [reduce, strength, x, y]);
  return { x: sx, y: sy };
}

const glass = "rounded-2xl border border-white/15 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_30px_60px_-25px_rgba(0,0,0,0.7)] backdrop-blur-xl";
const card = "rounded-3xl bg-white ring-1 ring-line shadow-[0_2px_4px_rgba(2,48,71,0.04),0_30px_60px_-32px_rgba(2,48,71,0.3)]";

function Cta({ label = cta.label, dark = false, className = "" }: { label?: string; dark?: boolean; className?: string }) {
  return (
    <a href={cta.href} className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_40px_-6px_rgba(255,138,0,0.7),inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform hover:-translate-y-0.5 ${className}`}>
      {label} <span aria-hidden>→</span>
    </a>
  );
}

/* -------- Orbitierende Glas-Dashboards -------- */
function OrbitCard({ children, className = "", floatDelay = 0, parallax = 10 }: { children: ReactNode; className?: string; floatDelay?: number; parallax?: number }) {
  const reduce = useReduced();
  const layer = useMouse(parallax);
  return (
    <motion.div style={{ x: layer.x, y: layer.y }} className={`absolute ${className}`}>
      <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5 + floatDelay, repeat: Infinity, ease: "easeInOut", delay: floatDelay }} className={`${glass} p-3.5`}>
        {children}
      </motion.div>
    </motion.div>
  );
}

function HeroStage() {
  const [src, setSrc] = useState(HERO_IMG);
  return (
    <div className="relative h-full w-full">
      {/* Glühen hinter dem Produkt */}
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,138,0,0.35), rgba(255,49,49,0.12) 45%, transparent 70%)", filter: "blur(40px)" }} />
      {/* Produkt-Render */}
      <img
        src={src}
        alt="Schwebendes Produkt auf glänzendem Podest, cinematisch beleuchtet"
        className="relative z-10 h-full w-full rounded-[2rem] object-cover"
        onError={() => setSrc((s) => (s === HERO_IMG ? HERO_IMG_FALLBACK : s))}
      />
      {/* Reflexion */}
      <div aria-hidden className="absolute bottom-[8%] left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-[100%] bg-brand-orange/25 blur-2xl" />

      {/* Umkreisende Glas-Dashboards */}
      <OrbitCard className="left-0 top-[18%] w-44" parallax={16} floatDelay={0}>
        <p className="text-[9px] font-bold uppercase tracking-wide text-white/60">Organischer Anteil</p>
        <p className="mt-0.5 text-xl font-extrabold text-brand-orange"><CountUp value="80 %" /></p>
        <svg viewBox="0 0 130 30" className="mt-1 w-full"><DrawPath d="M2 27 C30 25 55 19 80 12 C100 7 116 5 128 3" stroke="#ff8a00" delay={0.5} /></svg>
      </OrbitCard>
      <OrbitCard className="right-0 top-[40%] w-36" parallax={9} floatDelay={1.2}>
        <p className="text-[9px] font-bold uppercase tracking-wide text-white/60">ROAS</p>
        <p className="mt-0.5 text-lg font-extrabold text-white"><CountUp value="4,8" /></p>
      </OrbitCard>
      <OrbitCard className="bottom-[10%] left-[8%] w-36" parallax={13} floatDelay={0.6}>
        <p className="text-[9px] font-bold uppercase tracking-wide text-white/60">TACoS</p>
        <p className="mt-0.5 text-lg font-extrabold text-brand-red"><CountUp value="−44 %" /></p>
      </OrbitCard>
    </div>
  );
}

export default function Stil6() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="bg-white text-ink">
      {/* Header */}
      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#04141d]/70 px-5 py-2.5 text-white backdrop-blur-xl">
          <img src="/assets/logos/logo_full_white.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-6 text-sm font-bold text-white/80 lg:flex"><span>Leistungen</span><a href="#cases">Case Studies</a><span>Team</span></nav>
          <a href={cta.href} className="rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white shadow-[0_0_24px_-4px_rgba(255,138,0,0.8)]">{cta.short}</a>
        </div>
      </header>

      {/* HERO — cinematische Bühne */}
      <section className="relative overflow-hidden bg-[#04141d] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 75% 35%, rgba(255,138,0,0.16), transparent 60%), radial-gradient(ellipse 50% 50% at 20% 100%, rgba(255,49,49,0.08), transparent 60%)" }} />
        <div className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-6 px-5 pt-28 lg:grid-cols-[5fr_6fr] lg:gap-10 lg:pt-20">
          <div>
            <Reveal><p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-orange">{hero.eyebrow}</p></Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.02] tracking-tight">
                Amazon-Wachstum, das{" "}
                <span className="bg-gradient-to-r from-brand-orange via-[#ff6a3d] to-brand-red bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(255,138,0,0.35)]">Marge übrig lässt.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}><p className="mt-5 max-w-md text-base leading-relaxed text-white/65">{hero.subline}</p></Reveal>
            <Reveal delay={0.18}><div className="mt-7 flex flex-wrap items-center gap-5"><Cta /><a href="#cases" className="text-sm font-bold text-white/80 hover:text-brand-orange">{hero.secondary.label} →</a></div></Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex items-center gap-5">
                <span className="flex -space-x-2.5">{hero.trustPhotos.map((p) => <span key={p} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#04141d]"><Image src={p} alt="" fill sizes="36px" className="object-cover" /></span>)}</span>
                <span className="text-xs text-white/60">{hero.trust.map((t) => <span key={t.text} className="block"><strong className="text-white">{t.value}</strong> {t.text}</span>)}</span>
              </div>
            </Reveal>
          </div>
          {/* Bühne */}
          <div className="relative h-[42svh] min-h-[320px] lg:h-[72svh]">
            <HeroStage />
          </div>
        </div>
        {/* sanfter Übergang ins Helle */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Social proof */}
      <section className="border-b border-line bg-white py-8">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">{socialProof.line}</p>
          <div className="relative mt-4 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white to-transparent" />
            <div className="flex w-max items-center" style={{ animation: "marquee-left 45s linear infinite" }}>
              {[...clientLogos, ...clientLogos].map((l, i) => <div key={i} className="group grid h-14 w-32 shrink-0 place-items-center px-3"><img src={l.src} alt={l.name} className="max-h-10 w-auto max-w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" /></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Problem — helle Premium-Karten */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal><h2 className="text-center text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold tracking-tight">{problem.headline}</h2></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className={`${card} h-full p-7`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange/10 text-lg font-extrabold text-brand-orange">{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mechanism — dunkle Bühne (Akzentmoment) */}
      <section className="px-3 pb-4 lg:px-4">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-[#04141d] text-white shadow-[0_60px_120px_-50px_rgba(2,48,71,0.7)]">
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 50% 112%, rgba(255,138,0,0.22), transparent 65%), radial-gradient(ellipse 40% 35% at 85% 0%, rgba(255,49,49,0.1), transparent 65%)" }} />
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-orange">{mechanism.eyebrow}</p>
              <Reveal><h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight">{mechanism.headline}</h2></Reveal>
              <Reveal delay={0.06}><p className="mt-4 text-sm leading-relaxed text-white/70">{mechanism.core}</p></Reveal>
            </div>
            <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="space-y-3">
                {mechanism.steps.map((s, i) => (
                  <Reveal key={s.name} delay={i * 0.1}>
                    <div className={`${glass} relative overflow-hidden p-4 pl-5`}>
                      <motion.div aria-hidden className="absolute inset-y-0 left-0 w-1 origin-bottom bg-gradient-to-t from-brand-orange to-brand-red" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }} />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">0{i + 1} · {s.name}</p>
                      <h3 className="mt-1 text-base font-bold">{s.title}</h3>
                    </div>
                  </Reveal>
                ))}
                <Reveal delay={0.4}><p className="pt-2 text-[13px] leading-relaxed text-white/60">{mechanism.model}</p></Reveal>
              </div>
              <Reveal delay={0.2}>
                <div className={`${glass} p-5`}>
                  <div className="flex items-center justify-between text-[10px] text-white/60">
                    <span className="font-bold text-white/90">Umsatzanteile</span>
                    <span className="flex items-center gap-3"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-brand-orange" /> organisch</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-white/30" /> Ads</span></span>
                  </div>
                  <svg viewBox="0 0 380 140" className="mt-2 w-full">
                    <defs><linearGradient id="og6" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff8a00" stopOpacity="0.45" /><stop offset="100%" stopColor="#ff8a00" stopOpacity="0.02" /></linearGradient></defs>
                    {[28, 56, 84, 112].map((y) => <line key={y} x1="0" x2="380" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />)}
                    <motion.path d="M0 104 C50 100 90 92 140 80 C200 66 260 48 380 20 L380 140 L0 140 Z" fill="url(#og6)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.8 }} />
                    <DrawPath d="M0 104 C50 100 90 92 140 80 C200 66 260 48 380 20" stroke="#ff8a00" w={3} />
                    <DrawPath d="M0 76 C60 82 120 90 180 97 C250 105 320 111 380 115" stroke="rgba(255,255,255,0.35)" w={3} delay={0.15} />
                  </svg>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal><h2 className="text-center text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold tracking-tight">{cases.headline}</h2></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.items.map((c) => (
            <Reveal key={c.brand}>
              <div className={`${card} h-full p-7`}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">{c.brand} · {c.category}</p>
                <p className="mt-4 text-5xl font-extrabold tracking-tight text-brand-orange"><CountUp value={c.metric} /></p>
                <p className="mt-2 text-sm font-bold">{c.metricLabel}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.sub}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <a href={cta.href} className="relative flex h-full flex-col justify-center overflow-hidden rounded-3xl bg-[#04141d] p-7 text-white">
              <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 80% 110%, rgba(255,138,0,0.25), transparent 65%)" }} />
              <p className="relative text-5xl font-extrabold"><CountUp value={cases.portfolio.value} /></p>
              <p className="relative mt-2 text-sm font-bold text-white/90">{cases.portfolio.text}</p>
              <p className="relative mt-3 text-xs font-bold uppercase tracking-widest text-brand-orange">{cases.portfolio.link} →</p>
            </a>
          </Reveal>
        </div>
        <p className="mt-4 text-center text-[11px] text-ink-soft/80">{cases.note}</p>
      </section>

      {/* Services */}
      <section className="bg-[#f7f9fb] py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold tracking-tight">{services.headline}</h2></Reveal>
            <Reveal delay={0.06}><p className="mt-4 text-sm leading-relaxed text-ink-soft">{services.intro}</p></Reveal>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className={`${card} flex items-start gap-4 p-5`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-xs font-extrabold text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-bold">{s.title}</h3><p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{s.text}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Steps + Trust */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal><h2 className="text-center text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold tracking-tight">{steps.headline}</h2></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className={`${card} h-full p-6`}>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-b from-brand-orange to-[#f57600] font-extrabold text-white shadow-[0_12px_24px_-8px_rgba(255,138,0,0.7)]">{i + 1}</span>
                <div className="mt-4 flex flex-wrap items-center gap-2"><h3 className="font-bold">{s.title}</h3><span className="rounded-full bg-[#f2f6f8] px-2.5 py-0.5 text-[10px] font-bold text-ink-soft">{s.duration}</span></div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl items-start gap-10 border-t border-line pt-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <p className="text-6xl font-extrabold tracking-tight"><CountUp value={trustSection.retention.value} className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent" /></p>
            <h3 className="mt-2 text-xl font-extrabold">{trustSection.retention.headline}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{trustSection.retention.text}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              {trustSection.faq.map((f, i) => (
                <div key={f.q} className={i > 0 ? "border-t border-line" : ""}>
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-3.5 text-left"><span className="text-sm font-bold">{f.q}</span><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f2f6f8] text-ink transition-transform ${open === i ? "rotate-45" : ""}`}><svg viewBox="0 0 12 12" className="h-3 w-3"><path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span></button>
                  {open === i && <p className="pb-3.5 pr-8 text-sm leading-relaxed text-ink-soft">{f.a}</p>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Banner — cinematischer Abschluss */}
      <section id="kontakt" className="px-3 pb-4 lg:px-4">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-[#04141d] py-20 text-center text-white shadow-[0_60px_120px_-50px_rgba(2,48,71,0.7)] sm:py-24">
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(255,138,0,0.2), transparent 60%), radial-gradient(ellipse 45% 40% at 15% 105%, rgba(255,49,49,0.12), transparent 65%)" }} />
          <div className="relative mx-auto max-w-2xl px-6">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/10"><Image src={banner.photo} alt={banner.person} fill sizes="96px" className="object-cover" /></div>
            <h2 className="mt-6 text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight">{banner.headline}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">{banner.text}</p>
            <ul className="mt-5 flex flex-col items-center gap-2 text-sm text-white/85 sm:flex-row sm:justify-center sm:gap-6">{banner.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="text-brand-orange">✓</span>{b}</li>)}</ul>
            <p className="mt-5 text-sm font-bold">{banner.person} · {banner.role}</p>
            <div className="mt-6"><Cta /></div>
            <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">{footer.description}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
