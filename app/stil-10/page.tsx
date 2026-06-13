"use client";

// Stil 10 — MIX (Briefing). Ruhiges, typografie-getriebenes Grundgerüst mit
// kursiven Serif-Akzenten + rotierendem Hero-Wort (Hanzo), getragen von einem
// dunklen Premium-Theme mit Glow + feinem Grid + Noise (ConsultTitans),
// angereichert mit gezielten Animationen: Marquees, Zähler, Bento (Scrollix).
// TEMOA-Copy + Markenfarben. Keine Fake-Preistabelle (Copy-Deck).

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260613_175013_2ebf36f7-df9f-4bb0-9431-17f5545a64cf.png";
const HERO_FALLBACK =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

const BASE = "#070b11"; // dunkles Premium (leicht navy-getönt)
const EASE = [0.21, 0.6, 0.35, 1] as const;
const gridBg = "bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:46px_46px]";
const cardBorder = "border border-white/10";

/* Noise-Overlay (feine Körnung) */
function Noise() {
  return (
    <svg aria-hidden className="pointer-events-none fixed inset-0 -z-0 h-full w-full opacity-[0.04] mix-blend-overlay">
      <filter id="n10"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#n10)" />
    </svg>
  );
}
function Glow({ className = "", color = "rgba(255,138,0,0.35)" }: { className?: string; color?: string }) {
  return <div aria-hidden className={`pointer-events-none absolute rounded-full blur-[90px] ${className}`} style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }} />;
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
    const c = animate(0, target, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setD(dec ? v.toFixed(dec).replace(".", ",") : Math.round(v).toString()) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  if (!m) return <span className={className}>{value}</span>;
  return <span ref={ref} className={className}>{m[1]}{d}{m[3]}</span>;
}

// Rotierendes Hero-Wort (Hanzo-Signatur) mit kursivem Serif-Akzent.
const WORDS = ["Marge", "Profit", "Substanz"];
function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2300);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <span className="relative inline-flex h-[1.05em] items-baseline overflow-hidden align-bottom font-serif italic text-brand-orange">
      <span className="invisible">Substanz</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={mounted ? WORDS[i] : "init"}
          className="absolute inset-0"
          initial={mounted ? { y: "70%", opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />{children}</span>;
}
function Cta({ label = cta.label }: { label?: string }) {
  return <a href={cta.href} className="group relative inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_44px_-8px_rgba(255,138,0,0.8)] transition-transform hover:-translate-y-0.5">{label}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span></a>;
}
function Ghost({ label }: { label: string }) {
  return <a href="#cases" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold text-white/90 transition-colors hover:border-white/40">{label}</a>;
}
// Überschrift mit kursivem Serif-Akzent für ein Wort
function H2({ pre, em, post = "", className = "" }: { pre: string; em?: string; post?: string; className?: string }) {
  return (
    <h2 className={`text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.02em] text-white ${className}`}>
      {pre}{em && <> <span className="font-serif italic font-normal text-brand-orange">{em}</span></>}{post}
    </h2>
  );
}

const ICONS = ["M3 12h4l3 8 4-16 3 8h4", "M4 19V5m6 14V9m6 10V3", "M12 2v20M2 12h20", "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M12 7v5l4 2", "M2 7l10 6 10-6M2 7v10l10 6 10-6V7", "M4 20l6-6 4 4 6-8", "M3 12l4 4L21 4"];
function ChipIcon({ d }: { d: string }) {
  return <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-orange/30 bg-brand-orange/10 text-brand-orange"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg></span>;
}

export default function Stil10() {
  const [open, setOpen] = useState<number | null>(0);
  const [src, setSrc] = useState(HERO_IMG);
  return (
    <main style={{ background: BASE }} className="relative overflow-hidden text-[#f5f5f7]">
      <Noise />

      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 backdrop-blur-xl">
          <img src="/assets/logos/logo_full_white.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-7 text-sm font-medium text-white/70 lg:flex"><span className="hover:text-white">Leistungen</span><a href="#cases" className="hover:text-white">Cases</a><span className="hover:text-white">Team</span></nav>
          <a href={cta.href} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#070b11]">{cta.short}</a>
        </div>
      </header>

      {/* HERO */}
      <section className={`relative ${gridBg}`}>
        <Glow className="left-1/2 top-[-10%] h-[560px] w-[760px] -translate-x-1/2" color="rgba(255,138,0,0.18)" />
        <Glow className="right-[-5%] top-[30%] h-[420px] w-[420px]" color="rgba(255,49,49,0.12)" />
        <div className="relative mx-auto max-w-6xl px-5 pt-36 pb-16 text-center lg:pt-44">
          <Reveal><div className="flex justify-center"><Label>Full-Service Amazon-Agentur</Label></div></Reveal>
          <Reveal delay={0.06}>
            <h1 className="mx-auto mt-6 max-w-[18ch] text-[clamp(2.6rem,6.5vw,5.2rem)] font-extrabold leading-[1.0] tracking-[-0.03em]">
              Amazon-Wachstum, das <RotatingWord /> übrig lässt.
            </h1>
          </Reveal>
          <Reveal delay={0.12}><p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65">{hero.subline}</p></Reveal>
          <Reveal delay={0.18}><div className="mt-8 flex flex-wrap items-center justify-center gap-3"><Cta /><Ghost label={hero.secondary.label} /></div></Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex items-center justify-center gap-4">
              <span className="flex -space-x-2.5">{hero.trustPhotos.map((p) => <span key={p} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2" style={{ ["--tw-ring-color" as string]: BASE }}><Image src={p} alt="" fill sizes="36px" className="object-cover" /></span>)}</span>
              <span className="text-left text-xs text-white/55">{hero.trust.map((t) => <span key={t.text} className="block"><strong className="text-white">{t.value}</strong> {t.text}</span>)}</span>
            </div>
          </Reveal>

          {/* Produkt-Bühne mit Glow */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto mt-14 max-w-4xl">
              <Glow className="inset-x-10 -bottom-10 top-10" color="rgba(255,138,0,0.22)" />
              <div className={`relative overflow-hidden rounded-[2rem] ${cardBorder}`}>
                <img src={src} alt="Produkt-Bühne" className="aspect-[16/9] w-full object-cover" onError={() => setSrc((s) => (s === HERO_IMG ? HERO_FALLBACK : s))} />
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap justify-center gap-3">
                  {hero.cockpit.map((k) => <div key={k.label} className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur"><p className="text-lg font-extrabold text-brand-orange"><CountUp value={k.value} /></p><p className="text-[9px] uppercase tracking-wide text-white/55">{k.label}</p></div>)}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social-Proof Marquee + Badge */}
      <section className="border-y border-white/10 py-8">
        <div className="mx-auto mb-5 flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-5 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">{socialProof.line}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/80"><span className="text-brand-orange">98 %</span> Kundenbindung · freiwillig</span>
        </div>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16" style={{ background: `linear-gradient(90deg, ${BASE}, transparent)` }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16" style={{ background: `linear-gradient(270deg, ${BASE}, transparent)` }} />
          <div className="flex w-max items-center" style={{ animation: "marquee-left 45s linear infinite" }}>
            {[...clientLogos, ...clientLogos].map((l, i) => <div key={i} className="grid h-12 w-32 shrink-0 place-items-center px-3"><img src={l.src} alt={l.name} className="max-h-8 w-auto max-w-full object-contain opacity-40 brightness-0 invert transition-opacity hover:opacity-90" /></div>)}
          </div>
        </div>
      </section>

      {/* Problem-Agitation */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="text-center"><Label>Diagnose</Label></div>
        <Reveal><div className="mt-5 text-center"><H2 pre="Kommt euch das" em="bekannt" post=" vor?" /></div></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className={`group relative h-full overflow-hidden rounded-2xl ${cardBorder} bg-white/[0.03] p-7`}>
                <Glow className="-right-10 -top-10 h-40 w-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative text-3xl font-extrabold text-brand-orange/40">0{i + 1}</span>
                <h3 className="relative mt-3 text-lg font-bold">{p.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/60">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leistungen — Bento-Grid mit Glow + Icons */}
      <section className={`relative ${gridBg} py-24`}>
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <Label>Leistungen</Label>
            <Reveal><div className="mt-5"><H2 pre="Strategie, Content, Ads und Betrieb" em="greifen" post=" ineinander." /></div></Reveal>
            <Reveal delay={0.06}><p className="mt-4 text-sm leading-relaxed text-white/60">{services.intro}</p></Reveal>
          </div>
          <div className="mt-12 grid auto-rows-[minmax(0,1fr)] gap-4 md:grid-cols-3">
            {services.items.map((s, i) => {
              // Bento: erste Karte breit (2 Spalten), Rest gleichmäßig
              const wide = i === 0 ? "md:col-span-2" : "";
              return (
                <Reveal key={s.title} delay={i * 0.05} className={wide}>
                  <div className={`group relative h-full overflow-hidden rounded-2xl ${cardBorder} bg-white/[0.03] p-6 transition-colors hover:border-white/25`}>
                    <Glow className="-bottom-12 -right-12 h-44 w-44 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold">{s.title}</h3>
                        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/60">{s.text}</p>
                      </div>
                      <ChipIcon d={ICONS[i % ICONS.length]} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mechanism — Differenzierung + Chart */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Label>{mechanism.eyebrow}</Label>
            <Reveal><div className="mt-5"><H2 pre="Eine Leistung trägt die" em="nächste." /></div></Reveal>
            <Reveal delay={0.06}><p className="mt-4 text-sm leading-relaxed text-white/65">{mechanism.core}</p></Reveal>
            <div className="mt-6 space-y-3">
              {mechanism.steps.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.1}>
                  <div className={`rounded-2xl ${cardBorder} bg-white/[0.03] p-4`}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">0{i + 1} · {s.name}</p>
                    <h3 className="mt-1 text-base font-bold">{s.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15}>
            <div className={`relative overflow-hidden rounded-3xl ${cardBorder} bg-white/[0.03] p-6`}>
              <Glow className="-right-10 -top-10 h-48 w-48" color="rgba(255,138,0,0.2)" />
              <div className="relative flex items-center justify-between text-[10px] text-white/60">
                <span className="font-bold text-white/90">Umsatzanteile</span>
                <span className="flex items-center gap-3"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-brand-orange" /> organisch</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-white/30" /> Ads</span></span>
              </div>
              <svg viewBox="0 0 380 150" className="relative mt-2 w-full">
                <defs><linearGradient id="o10" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff8a00" stopOpacity="0.45" /><stop offset="100%" stopColor="#ff8a00" stopOpacity="0.02" /></linearGradient></defs>
                {[30, 60, 90, 120].map((y) => <line key={y} x1="0" x2="380" y1={y} y2={y} stroke="rgba(255,255,255,0.07)" />)}
                <motion.path d="M0 112 C50 108 90 98 140 86 C200 72 260 52 380 22 L380 150 L0 150 Z" fill="url(#o10)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6 }} />
                <motion.path d="M0 112 C50 108 90 98 140 86 C200 72 260 52 380 22" fill="none" stroke="#ff8a00" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8 }} />
                <motion.path d="M0 82 C60 88 120 96 180 104 C250 113 320 120 380 124" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.15 }} />
              </svg>
              <p className="relative mt-2 text-[12px] leading-relaxed text-white/55">{mechanism.model}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kennzahlen — Zähler */}
      <section className="border-y border-white/10 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-5 text-center md:grid-cols-4">
          {socialProof.stats.map((s) => (
            <Reveal key={s.label}>
              <p className="text-4xl font-extrabold tracking-tight text-brand-orange [text-shadow:0_0_40px_rgba(255,138,0,0.4)] sm:text-5xl"><CountUp value={s.value} /></p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-white/50">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cases (statt Preistabelle) */}
      <section id="cases" className="mx-auto max-w-6xl px-5 py-24">
        <div className="text-center"><Label>Ausgewählte Ergebnisse</Label></div>
        <Reveal><div className="mt-5 text-center"><H2 pre="Versprechen kann jeder." em="Hier" post=" sind Zahlen." /></div></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cases.items.map((c) => (
            <Reveal key={c.brand}>
              <div className={`group relative h-full overflow-hidden rounded-2xl ${cardBorder} bg-white/[0.03] p-7`}>
                <Glow className="-right-10 -top-10 h-40 w-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="relative text-[11px] font-bold uppercase tracking-widest text-white/45">{c.brand} · {c.category}</p>
                <p className="relative mt-5 text-6xl font-extrabold tracking-tight text-brand-orange"><CountUp value={c.metric} /></p>
                <p className="relative mt-3 text-sm font-bold">{c.metricLabel}</p>
                <p className="relative mt-1 text-sm text-white/55">{c.sub}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <a href={cta.href} className="group relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border border-brand-orange/30 bg-brand-orange/10 p-7">
              <Glow className="-inset-6" color="rgba(255,138,0,0.25)" />
              <p className="relative text-6xl font-extrabold"><CountUp value={cases.portfolio.value} /></p>
              <p className="relative mt-3 text-sm font-bold text-white/90">{cases.portfolio.text}</p>
              <p className="relative mt-4 text-xs font-bold uppercase tracking-widest text-brand-orange">{cases.portfolio.link} ↗</p>
            </a>
          </Reveal>
        </div>
        <p className="mt-4 text-center text-[11px] text-white/35">{cases.note}</p>
      </section>

      {/* Prozess */}
      <section className={`relative ${gridBg} py-24`}>
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center"><Label>Ablauf</Label></div>
          <Reveal><div className="mt-5 text-center"><H2 pre="So" em="starten" post=" wir." /></div></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className={`relative h-full overflow-hidden rounded-2xl ${cardBorder} bg-white/[0.03] p-7`}>
                  <span className="text-5xl font-extrabold text-white/10">0{i + 1}</span>
                  <div className="mt-2 flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{s.title}</h3><span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] font-bold text-white/55">{s.duration}</span></div>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + FAQ */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <div>
            <p className="text-7xl font-extrabold tracking-tight text-brand-orange [text-shadow:0_0_50px_rgba(255,138,0,0.5)]"><CountUp value={trustSection.retention.value} /></p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{trustSection.retention.headline}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">{trustSection.retention.text}</p>
          </div>
          <div className="border-t border-white/10">
            {trustSection.faq.map((f, i) => (
              <div key={f.q} className="border-b border-white/10">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-4 text-left"><span className="text-base font-bold">{f.q}</span><span className="text-brand-orange">{open === i ? "−" : "+"}</span></button>
                {open === i && <p className="pb-4 text-sm leading-relaxed text-white/60">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abschluss-CTA — großer Glow-Block */}
      <section id="kontakt" className="mx-auto max-w-6xl px-5 pb-20">
        <div className={`relative overflow-hidden rounded-[2.5rem] ${cardBorder} bg-white/[0.03] p-10 text-center sm:p-16`}>
          <Glow className="left-1/2 top-[-30%] h-[420px] w-[620px] -translate-x-1/2" color="rgba(255,138,0,0.25)" />
          <div className="relative mx-auto max-w-2xl">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/10"><Image src={banner.photo} alt={banner.person} fill sizes="96px" className="object-cover" /></div>
            <div className="mt-6"><H2 pre="Lasst uns ausrechnen, was in eurem Konto" em="steckt." className="!text-[clamp(1.9rem,4vw,3rem)]" /></div>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/65">{banner.text}</p>
            <ul className="mt-5 flex flex-col items-center gap-2 text-sm text-white/80 sm:flex-row sm:justify-center sm:gap-6">{banner.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="text-brand-orange">✓</span>{b}</li>)}</ul>
            <p className="mt-5 text-sm font-bold">{banner.person} · {banner.role}</p>
            <div className="mt-6"><Cta /></div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-white/35">{footer.description}</p>
      </section>
    </main>
  );
}
