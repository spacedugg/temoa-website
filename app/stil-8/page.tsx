"use client";

// Stil 8 — LANDEROS. Dunkle Premium-Agentur-Ästhetik nach Referenz
// (landeros.framer.website), in TEMOA-Farben: warmes Anthrazit, riesige enge
// Display-Typo, gerundete Karten mit Haarlinien-Rändern, rotierendes Rund-
// Badge, volle Service-Zeilen zum Aufklappen, große Work-Cards, sanfte Reveals.

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260613_175013_2ebf36f7-df9f-4bb0-9431-17f5545a64cf.png";
const HERO_FALLBACK =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

const BASE = "#0c0d10"; // warmes Anthrazit
const CARD = "rounded-3xl border border-white/10 bg-white/[0.035]";

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

// Rotierendes Rund-Badge (Landeros-Signatur)
function SpinBadge({ id, className = "" }: { id: string; className?: string }) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_18s_linear_infinite]" aria-hidden>
        <defs><path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <text className="fill-white/55 text-[9px] uppercase tracking-[0.28em]"><textPath href={`#${id}`}>· Potenzial-Gespräch · 30 Min mit Clemens </textPath></text>
      </svg>
      <span className="absolute grid h-9 w-9 place-items-center rounded-full bg-brand-orange text-white"><svg viewBox="0 0 16 16" className="h-3.5 w-3.5"><path d="M3 13L13 3M6 3h7v7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />{children}</span>;
}

function Cta({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return <a href={cta.href} className={`group inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_40px_-8px_rgba(255,138,0,0.7)] transition-transform hover:-translate-y-0.5 ${className}`}>{label}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span></a>;
}
function Ghost({ label }: { label: string }) {
  return <a href="#cases" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold text-white/90 transition-colors hover:border-white/40">{label}</a>;
}

export default function Stil8() {
  const [open, setOpen] = useState<number | null>(null);
  const [faq, setFaq] = useState<number | null>(0);
  const [src, setSrc] = useState(HERO_IMG);
  return (
    <main style={{ background: BASE }} className="text-[#f4f2ee]">
      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 backdrop-blur-xl">
          <img src="/assets/logos/logo_full_white.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-7 text-sm font-medium text-white/70 lg:flex"><span className="hover:text-white">Leistungen</span><a href="#cases" className="hover:text-white">Cases</a><span className="hover:text-white">Team</span></nav>
          <a href={cta.href} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0c0d10]">{cta.short}</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-5 pt-32 pb-16 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 70% 20%, rgba(255,138,0,0.12), transparent 60%)" }} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal><Label>Full-Service Amazon-Agentur</Label></Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-[15ch] text-[clamp(2.8rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              Wachstum, das <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">Marge</span> übrig lässt.
            </h1>
          </Reveal>
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <Reveal delay={0.12}><p className="max-w-xl text-base leading-relaxed text-white/65">{hero.subline}</p></Reveal>
              <Reveal delay={0.18}><div className="mt-7 flex flex-wrap items-center gap-3"><Cta /><Ghost label={hero.secondary.label} /></div></Reveal>
            </div>
            <Reveal delay={0.2}><SpinBadge id="badge-hero" className="hidden h-28 w-28 lg:grid" /></Reveal>
          </div>

          {/* Produkt-Bühne als breite Work-Card */}
          <Reveal delay={0.16}>
            <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/10">
              <img src={src} alt="Produkt-Bühne" className="aspect-[21/9] w-full object-cover" onError={() => setSrc((s) => (s === HERO_IMG ? HERO_FALLBACK : s))} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4">
                {hero.cockpit.map((k) => <div key={k.label} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 backdrop-blur"><p className="text-lg font-extrabold text-brand-orange"><CountUp value={k.value} /></p><p className="text-[9px] uppercase tracking-wide text-white/55">{k.label}</p></div>)}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="flex items-center gap-3">
                <span className="flex -space-x-2.5">{hero.trustPhotos.map((p) => <span key={p} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2" style={{ ["--tw-ring-color" as string]: BASE }}><Image src={p} alt="" fill sizes="36px" className="object-cover" /></span>)}</span>
                <span className="text-xs text-white/55">{hero.trust.map((t) => <span key={t.text} className="block"><strong className="text-white">{t.value}</strong> {t.text}</span>)}</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Logo marquee */}
      <section className="border-y border-white/10 py-8">
        <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">{socialProof.line}</p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16" style={{ background: `linear-gradient(90deg, ${BASE}, transparent)` }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16" style={{ background: `linear-gradient(270deg, ${BASE}, transparent)` }} />
          <div className="flex w-max items-center" style={{ animation: "marquee-left 45s linear infinite" }}>
            {[...clientLogos, ...clientLogos].map((l, i) => <div key={i} className="grid h-12 w-32 shrink-0 place-items-center px-3"><img src={l.src} alt={l.name} className="max-h-8 w-auto max-w-full object-contain opacity-40 brightness-0 invert transition-opacity hover:opacity-90" /></div>)}
          </div>
        </div>
      </section>

      {/* Problem — große Zeilen */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Label>Diagnose</Label>
        <Reveal><h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">{problem.headline}</h2></Reveal>
        <div className="mt-12 border-t border-white/10">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="grid gap-3 border-b border-white/10 py-7 md:grid-cols-[auto_1fr_2fr] md:items-baseline md:gap-8">
                <span className="text-sm font-bold text-brand-orange">0{i + 1}</span>
                <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mechanism */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className={`${CARD} overflow-hidden`}>
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Label>{mechanism.eyebrow}</Label>
              <Reveal><h2 className="mt-5 text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">{mechanism.headline}</h2></Reveal>
              <Reveal delay={0.06}><p className="mt-4 text-sm leading-relaxed text-white/65">{mechanism.core}</p></Reveal>
              <p className="mt-5 border-l-2 border-brand-orange pl-4 text-[13px] leading-relaxed text-white/55">{mechanism.model}</p>
            </div>
            <div className="space-y-3">
              {mechanism.steps.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.1}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">0{i + 1} · {s.name}</p>
                    <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases — Work-Cards */}
      <section id="cases" className="mx-auto max-w-6xl px-5 py-24">
        <Label>Ausgewählte Ergebnisse</Label>
        <Reveal><h2 className="mt-5 text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">{cases.headline}</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cases.items.map((c) => (
            <Reveal key={c.brand}>
              <div className={`${CARD} group h-full overflow-hidden p-7 transition-colors hover:border-white/25`}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/45">{c.brand} · {c.category}</p>
                <p className="mt-5 text-6xl font-extrabold tracking-tight text-brand-orange"><CountUp value={c.metric} /></p>
                <p className="mt-3 text-sm font-bold">{c.metricLabel}</p>
                <p className="mt-1 text-sm text-white/55">{c.sub}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <a href={cta.href} className="group relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-brand-orange/30 bg-brand-orange/10 p-7">
              <div aria-hidden className="absolute -inset-6 bg-brand-orange/15 blur-2xl" />
              <p className="relative text-6xl font-extrabold"><CountUp value={cases.portfolio.value} /></p>
              <p className="relative mt-3 text-sm font-bold text-white/90">{cases.portfolio.text}</p>
              <p className="relative mt-4 text-xs font-bold uppercase tracking-widest text-brand-orange">{cases.portfolio.link} ↗</p>
            </a>
          </Reveal>
        </div>
        <p className="mt-4 text-[11px] text-white/35">{cases.note}</p>
      </section>

      {/* Services — aufklappbare volle Zeilen (Landeros-Signatur) */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Label>Leistungen</Label>
            <Reveal><h2 className="mt-5 text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">{services.headline}</h2></Reveal>
            <Reveal delay={0.06}><p className="mt-4 text-sm leading-relaxed text-white/60">{services.intro}</p></Reveal>
          </div>
          <div className="border-t border-white/10">
            {services.items.map((s, i) => (
              <div key={s.title} className="border-b border-white/10">
                <button onClick={() => setOpen(open === i ? null : i)} className="group flex w-full items-center gap-5 py-5 text-left">
                  <span className="text-sm font-bold text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-xl font-bold tracking-tight transition-colors group-hover:text-brand-orange sm:text-2xl">{s.title}</span>
                  <span className={`grid h-7 w-7 place-items-center rounded-full border border-white/20 transition-transform ${open === i ? "rotate-45" : ""}`}><svg viewBox="0 0 12 12" className="h-3 w-3"><path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
                </button>
                {open === i && <p className="pb-5 pl-9 pr-12 text-sm leading-relaxed text-white/60">{s.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Label>Ablauf</Label>
        <Reveal><h2 className="mt-5 text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">{steps.headline}</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className={`${CARD} h-full p-7`}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-orange font-extrabold text-white">{i + 1}</span>
                <div className="mt-4 flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{s.title}</h3><span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] font-bold text-white/55">{s.duration}</span></div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust + FAQ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <div>
            <p className="text-7xl font-extrabold tracking-tight text-brand-orange"><CountUp value={trustSection.retention.value} /></p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{trustSection.retention.headline}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">{trustSection.retention.text}</p>
          </div>
          <div className="border-t border-white/10">
            {trustSection.faq.map((f, i) => (
              <div key={f.q} className="border-b border-white/10">
                <button onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-4 text-left"><span className="text-base font-bold">{f.q}</span><span className="text-brand-orange">{faq === i ? "−" : "+"}</span></button>
                {faq === i && <p className="pb-4 text-sm leading-relaxed text-white/60">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" className="mx-auto max-w-6xl px-5 py-16">
        <div className={`${CARD} relative overflow-hidden p-10 text-center sm:p-16`}>
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(255,138,0,0.18), transparent 60%)" }} />
          <div className="relative mx-auto max-w-2xl">
            <SpinBadge id="badge-cta" className="mx-auto h-24 w-24" />
            <h2 className="mt-8 text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">{banner.headline}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/65">{banner.text}</p>
            <ul className="mt-5 flex flex-col items-center gap-2 text-sm text-white/80 sm:flex-row sm:justify-center sm:gap-6">{banner.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="text-brand-orange">✓</span>{b}</li>)}</ul>
            <div className="mt-7 flex items-center justify-center gap-3"><Image src={banner.photo} alt={banner.person} width={40} height={40} className="rounded-full object-cover" /><span className="text-sm font-bold">{banner.person} · {banner.role}</span></div>
            <div className="mt-6"><Cta /></div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-white/35">{footer.description}</p>
      </section>
    </main>
  );
}
