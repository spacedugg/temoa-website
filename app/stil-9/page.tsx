"use client";

// Stil 9 — LANDEROS LIGHT / GLAS. Heller Modus mit echtem Glasmorphismus:
// großflächige, weich verschwommene Farb-Blobs im fixierten Hintergrund;
// darüber durchscheinende Frosted-Glass-Panels (backdrop-blur) mit gestaffelten
// Tiefen-Schatten. Riesige enge Display-Typo, rotierendes Rund-Badge,
// aufklappbare Service-Zeilen, große Work-Cards. TEMOA-Farben.

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";
const HERO_FALLBACK =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260613_175013_2ebf36f7-df9f-4bb0-9431-17f5545a64cf.png";

// Glas-Materialien
const glass = "rounded-3xl border border-white/70 bg-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_6px_rgba(2,48,71,0.05),0_36px_70px_-34px_rgba(2,48,71,0.45)] backdrop-blur-2xl";
const glassSoft = "rounded-2xl border border-white/70 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_50px_-28px_rgba(2,48,71,0.4)] backdrop-blur-xl";

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

function SpinBadge({ id, className = "", tone = "dark" }: { id: string; className?: string; tone?: "dark" | "light" }) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_18s_linear_infinite]" aria-hidden>
        <defs><path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <text className={`text-[9px] uppercase tracking-[0.28em] ${tone === "dark" ? "fill-ink/55" : "fill-white/70"}`}><textPath href={`#${id}`}>· Potenzial-Gespräch · 30 Min mit Clemens </textPath></text>
      </svg>
      <span className="absolute grid h-9 w-9 place-items-center rounded-full bg-brand-orange text-white shadow-[0_8px_20px_-6px_rgba(255,138,0,0.8)]"><svg viewBox="0 0 16 16" className="h-3.5 w-3.5"><path d="M3 13L13 3M6 3h7v7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft"><span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />{children}</span>;
}

function Cta({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return <a href={cta.href} className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_-12px_rgba(255,138,0,0.7),inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform hover:-translate-y-0.5 ${className}`}>{label}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span></a>;
}
function Ghost({ label }: { label: string }) {
  return <a href="#cases" className={`inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/40 px-6 py-3.5 text-sm font-bold text-ink backdrop-blur-xl transition-colors hover:bg-white/70`}>{label}</a>;
}

// Fixierter, unscharfer Farb-Hintergrund — gibt den Glas-Panels Tiefe.
function Aurora() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#eceef3]">
      <div className="absolute -left-32 -top-32 h-[620px] w-[620px] rounded-full opacity-70 blur-[100px]" style={{ background: "radial-gradient(circle,#ffd7a8,transparent 70%)" }} />
      <div className="absolute right-[-10%] top-[10%] h-[560px] w-[560px] rounded-full opacity-60 blur-[110px]" style={{ background: "radial-gradient(circle,#ffc2bb,transparent 70%)" }} />
      <div className="absolute bottom-[-15%] left-[20%] h-[640px] w-[640px] rounded-full opacity-55 blur-[120px]" style={{ background: "radial-gradient(circle,#bcdcef,transparent 70%)" }} />
      <div className="absolute right-[15%] bottom-[5%] h-[440px] w-[440px] rounded-full opacity-50 blur-[110px]" style={{ background: "radial-gradient(circle,#ffe7c2,transparent 70%)" }} />
    </div>
  );
}

// Schwebendes Glas-KPI-Chip (Tiefenebene mit Scroll-Parallaxe)
function FloatChip({ children, className = "", from = 40 }: { children: ReactNode; className?: string; from?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [from, -from]);
  return <motion.div ref={ref} style={{ y }} className={`absolute ${glassSoft} p-3.5 ${className}`}>{children}</motion.div>;
}

export default function Stil9() {
  const [open, setOpen] = useState<number | null>(null);
  const [faq, setFaq] = useState<number | null>(0);
  const [src, setSrc] = useState(HERO_IMG);
  return (
    <main className="relative text-ink">
      <Aurora />

      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/70 bg-white/50 px-5 py-2.5 shadow-[0_10px_30px_-14px_rgba(2,48,71,0.3)] backdrop-blur-2xl">
          <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-7 text-sm font-bold text-ink/80 lg:flex"><span className="hover:text-ink">Leistungen</span><a href="#cases" className="hover:text-ink">Cases</a><span className="hover:text-ink">Team</span></nav>
          <a href={cta.href} className="rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white">{cta.short}</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-5 pt-32 pb-16 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal><Label>Full-Service Amazon-Agentur</Label></Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-[15ch] text-[clamp(2.8rem,7.5vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink">
              Wachstum, das <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">Marge</span> übrig lässt.
            </h1>
          </Reveal>
          <div className="mt-9 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <Reveal delay={0.12}><p className="max-w-xl text-base leading-relaxed text-ink-soft">{hero.subline}</p></Reveal>
              <Reveal delay={0.18}><div className="mt-7 flex flex-wrap items-center gap-3"><Cta /><Ghost label={hero.secondary.label} /></div></Reveal>
            </div>
            <Reveal delay={0.2}><SpinBadge id="s9-hero" className="hidden h-28 w-28 lg:grid" /></Reveal>
          </div>

          {/* Produkt-Bühne im Glasrahmen + schwebende Glas-KPIs (Tiefe) */}
          <Reveal delay={0.16}>
            <div className="relative mt-14">
              <div className={`${glass} relative overflow-hidden p-3`}>
                <div className="relative aspect-[21/9] overflow-hidden rounded-[1.4rem]">
                  <img src={src} alt="Produkt-Bühne" className="h-full w-full object-cover object-[58%_35%]" onError={() => setSrc((s) => (s === HERO_IMG ? HERO_FALLBACK : s))} />
                </div>
              </div>
              <FloatChip className="left-[-2%] top-[14%] w-44" from={50}>
                <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">Organischer Anteil</p>
                <p className="mt-0.5 text-xl font-extrabold text-brand-orange"><CountUp value="80 %" /></p>
              </FloatChip>
              <FloatChip className="right-[-1%] top-[40%] w-36" from={-30}>
                <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">TACoS</p>
                <p className="mt-0.5 text-lg font-extrabold text-brand-red"><CountUp value="−44 %" /></p>
              </FloatChip>
              <FloatChip className="bottom-[8%] left-[10%] w-40" from={36}>
                <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">ROAS</p>
                <p className="mt-0.5 text-lg font-extrabold text-ink">4,8</p>
              </FloatChip>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex items-center gap-3">
              <span className="flex -space-x-2.5">{hero.trustPhotos.map((p) => <span key={p} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"><Image src={p} alt="" fill sizes="36px" className="object-cover" /></span>)}</span>
              <span className="text-xs text-ink-soft">{hero.trust.map((t) => <span key={t.text} className="block"><strong className="text-ink">{t.value}</strong> {t.text}</span>)}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Logo marquee — Glasstreifen */}
      <section className="px-5 py-6">
        <div className={`mx-auto max-w-6xl ${glassSoft} overflow-hidden px-6 py-5`}>
          <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">{socialProof.line}</p>
          <div className="relative overflow-hidden">
            <div className="flex w-max items-center" style={{ animation: "marquee-left 45s linear infinite" }}>
              {[...clientLogos, ...clientLogos].map((l, i) => <div key={i} className="grid h-12 w-32 shrink-0 place-items-center px-3"><img src={l.src} alt={l.name} className="max-h-9 w-auto max-w-full object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0" /></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal><h2 className="text-center text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.02em]">{problem.headline}</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problem.pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className={`${glass} h-full p-7`}>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-orange/15 text-lg font-extrabold text-brand-orange backdrop-blur">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <section className="px-5 py-12">
        <div className={`mx-auto max-w-6xl ${glass} overflow-hidden p-8 sm:p-12`}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Label>{mechanism.eyebrow}</Label>
              <Reveal><h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.7rem)] font-extrabold leading-[1.03] tracking-[-0.02em]">{mechanism.headline}</h2></Reveal>
              <Reveal delay={0.06}><p className="mt-4 text-sm leading-relaxed text-ink-soft">{mechanism.core}</p></Reveal>
              <p className="mt-5 border-l-2 border-brand-orange pl-4 text-[13px] leading-relaxed text-ink-soft">{mechanism.model}</p>
            </div>
            <div className="space-y-3">
              {mechanism.steps.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.1}>
                  <div className="rounded-2xl border border-white/70 bg-white/50 p-5 backdrop-blur-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">0{i + 1} · {s.name}</p>
                    <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Label>Ausgewählte Ergebnisse</Label>
          <Reveal><h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.02em]">{cases.headline}</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cases.items.map((c) => (
              <Reveal key={c.brand}>
                <div className={`${glass} h-full p-7`}>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">{c.brand} · {c.category}</p>
                  <p className="mt-5 text-6xl font-extrabold tracking-tight text-brand-orange"><CountUp value={c.metric} /></p>
                  <p className="mt-3 text-sm font-bold">{c.metricLabel}</p>
                  <p className="mt-1 text-sm text-ink-soft">{c.sub}</p>
                </div>
              </Reveal>
            ))}
            <Reveal>
              <a href={cta.href} className="group relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-white/40 p-7 text-white shadow-[0_36px_70px_-30px_rgba(255,138,0,0.6)]" style={{ background: "linear-gradient(135deg, #ff9a2e, #f04438)" }}>
                <p className="text-6xl font-extrabold"><CountUp value={cases.portfolio.value} /></p>
                <p className="mt-3 text-sm font-bold">{cases.portfolio.text}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest">{cases.portfolio.link} ↗</p>
              </a>
            </Reveal>
          </div>
          <p className="mt-4 text-[11px] text-ink-soft/80">{cases.note}</p>
        </div>
      </section>

      {/* Services — aufklappbare Zeilen im Glaspanel */}
      <section className="px-5 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Label>Leistungen</Label>
            <Reveal><h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.7rem)] font-extrabold leading-[1.03] tracking-[-0.02em]">{services.headline}</h2></Reveal>
            <Reveal delay={0.06}><p className="mt-4 text-sm leading-relaxed text-ink-soft">{services.intro}</p></Reveal>
          </div>
          <div className={`${glass} px-7 py-2`}>
            {services.items.map((s, i) => (
              <div key={s.title} className={i > 0 ? "border-t border-ink/10" : ""}>
                <button onClick={() => setOpen(open === i ? null : i)} className="group flex w-full items-center gap-5 py-5 text-left">
                  <span className="text-sm font-bold text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-xl font-bold tracking-tight transition-colors group-hover:text-brand-orange sm:text-2xl">{s.title}</span>
                  <span className={`grid h-7 w-7 place-items-center rounded-full border border-ink/20 transition-transform ${open === i ? "rotate-45" : ""}`}><svg viewBox="0 0 12 12" className="h-3 w-3"><path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
                </button>
                {open === i && <p className="pb-5 pl-9 pr-12 text-sm leading-relaxed text-ink-soft">{s.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Label>Ablauf</Label>
          <Reveal><h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.02em]">{steps.headline}</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className={`${glass} h-full p-7`}>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-b from-brand-orange to-[#f57600] font-extrabold text-white shadow-[0_12px_24px_-8px_rgba(255,138,0,0.7)]">{i + 1}</span>
                  <div className="mt-4 flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{s.title}</h3><span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[10px] font-bold text-ink-soft">{s.duration}</span></div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + FAQ */}
      <section className="px-5 py-12">
        <div className={`mx-auto max-w-6xl ${glass} p-8 sm:p-12`}>
          <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <p className="text-7xl font-extrabold tracking-tight"><CountUp value={trustSection.retention.value} className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent" /></p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{trustSection.retention.headline}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">{trustSection.retention.text}</p>
            </div>
            <div>
              {trustSection.faq.map((f, i) => (
                <div key={f.q} className={i > 0 ? "border-t border-ink/10" : ""}>
                  <button onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-4 text-left"><span className="text-base font-bold">{f.q}</span><span className="text-brand-orange">{faq === i ? "−" : "+"}</span></button>
                  {faq === i && <p className="pb-4 text-sm leading-relaxed text-ink-soft">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" className="px-5 py-16">
        <div className={`mx-auto max-w-6xl ${glass} relative overflow-hidden p-10 text-center sm:p-16`}>
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(255,138,0,0.18), transparent 60%)" }} />
          <div className="relative mx-auto max-w-2xl">
            <SpinBadge id="s9-cta" className="mx-auto h-24 w-24" />
            <h2 className="mt-8 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.03] tracking-[-0.02em]">{banner.headline}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{banner.text}</p>
            <ul className="mt-5 flex flex-col items-center gap-2 text-sm text-ink/80 sm:flex-row sm:justify-center sm:gap-6">{banner.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="text-brand-orange">✓</span>{b}</li>)}</ul>
            <div className="mt-6 flex items-center justify-center gap-3"><Image src={banner.photo} alt={banner.person} width={40} height={40} className="rounded-full object-cover" /><span className="text-sm font-bold">{banner.person} · {banner.role}</span></div>
            <div className="mt-6"><Cta /></div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-ink-soft">{footer.description}</p>
      </section>
    </main>
  );
}
