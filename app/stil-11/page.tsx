"use client";

// Stil 11 — LIGHT · FLOATING · BILDREICH. Heller Modus, KEINE Rasterlinien,
// KEIN Bento-Kachelraster — frei fliegende, überlappende Elemente mit weichen
// Schatten und sanftem Float/Parallax. Viele Grafiken & Bilder stützen den
// Text (Produkt-Render, Listing-/Dashboard-Mockups, echte Teamfotos,
// Produktfotos, Kundenlogos). Mehr Sektionen, knappere Copy, Serif-Akzente.

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ListingMock } from "@/components/mockups/ListingMock";
import { DashboardMock } from "@/components/mockups/DashboardMock";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism, cases, services,
  steps, trustSection, banner, footer, contentShowcase, reporting, team,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";
const EASE = [0.21, 0.6, 0.35, 1] as const;

/* ---------- Helfer ---------- */
function useReduced() { const r = useReducedMotion(); const [m, setM] = useState(false); useEffect(() => setM(true), []); return m ? !!r : false; }

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

// sanftes Schweben
function Float({ children, dur = 5, dist = 10, delay = 0, className = "" }: { children: ReactNode; dur?: number; dist?: number; delay?: number; className?: string }) {
  const reduce = useReduced();
  return <motion.div className={className} animate={reduce ? undefined : { y: [0, -dist, 0] }} transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}>{children}</motion.div>;
}

// Scroll-Parallaxe
function Parallax({ children, from = 60, className = "" }: { children: ReactNode; from?: number; className?: string }) {
  const reduce = useReduced();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [from, -from]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

const chip = "rounded-2xl border border-white/80 bg-white/70 shadow-[0_18px_40px_-20px_rgba(2,48,71,0.4)] backdrop-blur-xl";

const WORDS = ["Marge", "Profit", "Substanz"];
function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); if (reduce) return; const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2300); return () => clearInterval(t); }, [reduce]);
  return (
    <span className="relative inline-flex h-[1.05em] items-baseline overflow-hidden align-bottom font-serif italic text-brand-orange">
      <span className="invisible">Substanz</span>
      <AnimatePresence initial={false}>
        <motion.span key={mounted ? WORDS[i] : "init"} className="absolute inset-0" initial={mounted ? { y: "70%", opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} exit={{ y: "-70%", opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>{WORDS[i]}</motion.span>
      </AnimatePresence>
    </span>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft"><span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />{children}</span>;
}
// Headline mit kursivem Serif-Akzent
function H2({ pre, em, post = "", className = "" }: { pre: string; em?: string; post?: string; className?: string }) {
  return <h2 className={`text-[clamp(1.9rem,4vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink ${className}`}>{pre}{em && <> <span className="font-serif italic font-normal text-brand-orange">{em}</span></>}{post}</h2>;
}
function Cta({ label = cta.label }: { label?: string }) {
  return <a href={cta.href} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_-12px_rgba(255,138,0,0.7),inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform hover:-translate-y-0.5">{label}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span></a>;
}

function Aurora() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#f7f5f1]">
      <div className="absolute -left-40 -top-32 h-[640px] w-[640px] rounded-full opacity-60 blur-[120px]" style={{ background: "radial-gradient(circle,#ffdcae,transparent 70%)" }} />
      <div className="absolute right-[-15%] top-[8%] h-[560px] w-[560px] rounded-full opacity-50 blur-[120px]" style={{ background: "radial-gradient(circle,#ffc6bf,transparent 70%)" }} />
      <div className="absolute bottom-[2%] left-[25%] h-[600px] w-[600px] rounded-full opacity-45 blur-[130px]" style={{ background: "radial-gradient(circle,#c2dff0,transparent 70%)" }} />
    </div>
  );
}

export default function Stil11() {
  const [open, setOpen] = useState<number | null>(0);
  const [src, setSrc] = useState(HERO_IMG);
  return (
    <main className="relative text-ink">
      <Aurora />

      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/80 bg-white/60 px-5 py-2.5 shadow-[0_10px_30px_-14px_rgba(2,48,71,0.3)] backdrop-blur-2xl">
          <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-7 text-sm font-bold text-ink/80 lg:flex"><span>Leistungen</span><a href="#cases">Cases</a><a href="#team">Team</a></nav>
          <a href={cta.href} className="rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white">{cta.short}</a>
        </div>
      </header>

      {/* HERO — frei fliegende Komposition */}
      <section className="relative px-5 pt-32 pb-12 lg:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[5fr_6fr]">
          <div>
            <Reveal><Eyebrow>Full-Service Amazon-Agentur</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-[clamp(2.5rem,5.2vw,4.3rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
                Amazon-Wachstum,<br />das <RotatingWord /><br />übrig lässt.
              </h1>
            </Reveal>
            <Reveal delay={0.12}><p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">Die meisten Accounts wachsen sich arm. Wir drehen die Reihenfolge um: <strong className="font-bold text-ink">erst verkauft euer Listing, dann skalieren die Ads.</strong></p></Reveal>
            <Reveal delay={0.18}><div className="mt-7 flex flex-wrap items-center gap-4"><Cta /><a href="#cases" className="text-sm font-bold text-ink underline decoration-brand-orange decoration-2 underline-offset-4">Ergebnisse ansehen</a></div></Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex items-center gap-4">
                <span className="flex -space-x-2.5">{hero.trustPhotos.map((p) => <span key={p} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#f7f5f1]"><Image src={p} alt="" fill sizes="36px" className="object-cover" /></span>)}</span>
                <span className="text-xs text-ink-soft">{hero.trust.map((t) => <span key={t.text} className="block"><strong className="text-ink">{t.value}</strong> {t.text}</span>)}</span>
              </div>
            </Reveal>
          </div>

          {/* Rechte Seite: schwebendes Produkt + frei fliegende Elemente */}
          <Reveal delay={0.12}>
            <div className="relative mx-auto h-[440px] w-full max-w-xl">
              <div aria-hidden className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(circle,rgba(255,138,0,0.3),transparent 70%)" }} />
              <Float dur={7} dist={14} className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2">
                <div className="aspect-square overflow-hidden rounded-[2rem] shadow-[0_50px_90px_-40px_rgba(2,48,71,0.55)]" style={{ background: "radial-gradient(circle at 55% 35%, #ffffff, #e7eef3 70%)" }}>
                  {src && <img src={src} alt="Schwebendes Produkt im Studio-Licht" className="h-full w-full object-cover" onError={() => setSrc("")} />}
                </div>
              </Float>
              <Float dur={6} dist={12} delay={0.4} className="absolute -left-2 top-6 w-44"><div className={`${chip} p-3.5`}><p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">Organischer Anteil</p><p className="mt-0.5 text-2xl font-extrabold text-brand-orange"><CountUp value="80 %" /></p></div></Float>
              <Float dur={5.5} dist={10} delay={0.9} className="absolute -right-2 top-1/3 w-32"><div className={`${chip} p-3`}><p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">TACoS</p><p className="mt-0.5 text-xl font-extrabold text-brand-red">−44 %</p></div></Float>
              <Float dur={6.5} dist={12} delay={0.2} className="absolute bottom-2 left-6 w-[230px]"><div className="rotate-[-4deg]"><ListingMock image={hero.listing.image} title={hero.listing.title} price={hero.listing.price} reviews={hero.listing.reviews} className="!w-[230px] shadow-[0_40px_70px_-32px_rgba(2,48,71,0.5)]" /></div></Float>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Logos */}
      <section className="px-5 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">{socialProof.line}</span>
            <span className="rounded-full border border-line bg-white/70 px-3 py-1 text-[11px] font-bold text-ink backdrop-blur"><span className="text-brand-orange">98 %</span> bleiben — freiwillig</span>
          </div>
          <div className="relative mt-5 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f7f5f1] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f7f5f1] to-transparent" />
            <div className="flex w-max items-center" style={{ animation: "marquee-left 45s linear infinite" }}>
              {[...clientLogos, ...clientLogos].map((l, i) => <div key={i} className="grid h-12 w-32 shrink-0 place-items-center px-3"><img src={l.src} alt={l.name} className="max-h-9 w-auto max-w-full object-contain opacity-55 grayscale transition-all hover:opacity-100 hover:grayscale-0" /></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM — frei gestaffelte Karten, keine Rasterordnung */}
      <section className="relative px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center"><Eyebrow>Diagnose</Eyebrow></div>
          <Reveal><div className="mt-4 text-center"><H2 pre="Kommt euch das" em="bekannt" post=" vor?" /></div></Reveal>
          <div className="relative mt-12 grid gap-6 md:grid-cols-3">
            {problem.pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className={i === 0 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""}>
                <div className="group rounded-[1.6rem] border border-white/80 bg-white/70 p-7 shadow-[0_30px_60px_-32px_rgba(2,48,71,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5">
                  <span className="font-serif text-4xl italic text-brand-orange/35">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}><p className="mt-10 text-center text-base font-bold">Das Problem ist selten das Budget. <span className="font-serif italic text-brand-orange">Es ist die Reihenfolge.</span></p></Reveal>
        </div>
      </section>

      {/* MECHANISM — Text + Dashboard-Grafik */}
      <section className="relative px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{mechanism.eyebrow}</Eyebrow>
            <Reveal><div className="mt-4"><H2 pre="Eine Leistung trägt die" em="nächste." /></div></Reveal>
            <Reveal delay={0.06}><p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{mechanism.core}</p></Reveal>
            <div className="mt-7 space-y-4">
              {mechanism.steps.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.08}>
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-b from-brand-orange to-[#f57600] font-extrabold text-white shadow-[0_12px_24px_-8px_rgba(255,138,0,0.7)]">{i + 1}</span>
                    <div><p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">{s.name}</p><h3 className="text-base font-bold">{s.title}</h3></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-6 rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle,rgba(255,138,0,0.2),transparent 70%)" }} />
              <Float dur={7} dist={12} className="relative mx-auto w-fit"><DashboardMock className="!w-full max-w-md shadow-[0_50px_90px_-40px_rgba(2,48,71,0.5)]" /></Float>
              <Float dur={6} dist={10} delay={0.6} className="absolute -bottom-5 -right-2 hidden sm:block"><div className={`${chip} px-4 py-3`}><p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">Zielbild</p><p className="text-xl font-extrabold text-ink">80 % organisch</p></div></Float>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTENT SHOWCASE — Vorher/Nachher, bildlastig */}
      <section className="relative px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center"><Eyebrow>{contentShowcase.eyebrow}</Eyebrow></div>
          <Reveal><div className="mt-4 text-center"><H2 pre="Euer bester Verkäufer" em="schläft" post=" nie." /></div></Reveal>
          <Reveal delay={0.06}><p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-ink-soft">{contentShowcase.text}</p></Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
            <Parallax from={30}>
              <div className="relative">
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">{contentShowcase.beforeLabel}</span>
                <div className="rotate-[-3deg] opacity-90 grayscale"><ListingMock {...contentShowcase.before} className="!w-[240px] shadow-[0_40px_70px_-34px_rgba(2,48,71,0.45)]" /></div>
              </div>
            </Parallax>
            <span className="hidden text-3xl text-brand-orange sm:block" aria-hidden>→</span>
            <Parallax from={-30}>
              <div className="relative">
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">{contentShowcase.afterLabel}</span>
                <Float dur={6} dist={10}><div className="rotate-[3deg]"><ListingMock {...contentShowcase.after} className="!w-[240px] shadow-[0_50px_90px_-36px_rgba(2,48,71,0.55)]" /></div></Float>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* CASES — Produktfotos + Zahlen, frei angeordnet */}
      <section id="cases" className="relative px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center"><Eyebrow>Ausgewählte Ergebnisse</Eyebrow></div>
          <Reveal><div className="mt-4 text-center"><H2 pre="Versprechen kann jeder." em="Hier" post=" sind Zahlen." /></div></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {cases.items.map((c, i) => (
              <Reveal key={c.brand} delay={i * 0.1} className={i === 1 ? "md:mt-12" : ""}>
                <div className="flex items-center gap-6 rounded-[1.6rem] border border-white/80 bg-white/70 p-6 shadow-[0_30px_60px_-32px_rgba(2,48,71,0.35)] backdrop-blur-xl">
                  <Float dur={6} dist={8} delay={i * 0.3} className="shrink-0">
                    <div className="relative h-28 w-28 overflow-hidden rounded-2xl shadow-[0_20px_40px_-18px_rgba(2,48,71,0.5)] ring-1 ring-white">
                      <Image src={i === 0 ? "/assets/img/vitaworld.jpg" : "/assets/img/bachgold.jpg"} alt={c.brand} fill sizes="112px" className="object-cover" />
                    </div>
                  </Float>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">{c.brand} · {c.category}</p>
                    <p className="mt-1 text-5xl font-extrabold tracking-tight text-brand-orange"><CountUp value={c.metric} /></p>
                    <p className="mt-1 text-sm font-bold">{c.metricLabel}</p>
                    <p className="text-sm text-ink-soft">{c.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-between gap-4 rounded-full border border-line bg-white/70 px-7 py-4 text-center backdrop-blur sm:flex-row sm:text-left">
              <p className="text-sm font-bold text-ink"><span className="text-2xl font-extrabold text-brand-orange">{cases.portfolio.value}</span> {cases.portfolio.text}</p>
              <a href={cta.href} className="text-sm font-bold text-brand-orange">{cases.portfolio.link} →</a>
            </div>
          </Reveal>
          <p className="mt-4 text-center text-[11px] text-ink-soft/80">{cases.note}</p>
        </div>
      </section>

      {/* SERVICES — fließende, alternierende Liste (kein Kachelraster) */}
      <section className="relative px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center"><Eyebrow>Leistungen</Eyebrow></div>
          <Reveal><div className="mt-4 text-center"><H2 pre="Alles, was euer Konto braucht —" em="aus einer" post=" Hand." /></div></Reveal>
          <div className="mt-12 space-y-1">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className={`flex items-baseline gap-5 border-b border-line py-4 ${i % 2 ? "md:pl-16" : "md:pr-16"}`}>
                  <span className="font-serif text-2xl italic text-brand-orange/40">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REPORTING — Dashboard-Grafik + Punkte */}
      <section className="relative px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
          <Reveal>
            <div className="relative">
              <div aria-hidden className="absolute -inset-6 rounded-full opacity-50 blur-3xl" style={{ background: "radial-gradient(circle,rgba(194,223,240,0.7),transparent 70%)" }} />
              <Float dur={7} dist={12} className="relative w-fit"><DashboardMock className="!w-full max-w-md shadow-[0_50px_90px_-40px_rgba(2,48,71,0.5)]" /></Float>
            </div>
          </Reveal>
          <div>
            <Eyebrow>{reporting.eyebrow}</Eyebrow>
            <Reveal><div className="mt-4"><H2 pre="Zahlen, die ihr in" em="fünf Minuten" post=" versteht." /></div></Reveal>
            <Reveal delay={0.06}><p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{reporting.text}</p></Reveal>
            <ul className="mt-6 space-y-3">
              {reporting.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm font-medium text-ink"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-orange/10 text-brand-orange"><svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M3 8.5l3.5 3.5 6.5-8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROZESS — Schritte mit fließender Linie */}
      <section className="relative px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center"><Eyebrow>Ablauf</Eyebrow></div>
          <Reveal><div className="mt-4 text-center"><H2 pre="So" em="starten" post=" wir." /></div></Reveal>
          <div className="relative mt-14 grid gap-10 md:grid-cols-3">
            <svg viewBox="0 0 1000 60" className="absolute -top-7 left-0 hidden w-full md:block" preserveAspectRatio="none" aria-hidden>
              <motion.path d="M60 30 C 300 -10, 360 70, 500 30 C 640 -10, 700 70, 940 30" fill="none" stroke="#ffcf9c" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
            </svg>
            {steps.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="text-center">
                  <Float dur={5 + i} dist={8}><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl font-extrabold text-brand-orange shadow-[0_20px_40px_-18px_rgba(2,48,71,0.4)] ring-1 ring-white">{i + 1}</span></Float>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2"><h3 className="text-lg font-bold">{s.title}</h3><span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-bold text-ink-soft">{s.duration}</span></div>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM — schwebende echte Fotos */}
      <section id="team" className="relative px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{team.eyebrow}</Eyebrow>
            <Reveal><div className="mt-4"><H2 pre="Menschen statt" em="Ticketsystem." /></div></Reveal>
            <Reveal delay={0.06}><p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{team.text}</p></Reveal>
            <ul className="mt-6 space-y-3">
              {team.principles.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm font-medium text-ink"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-orange/10 text-brand-orange"><svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M3 8.5l3.5 3.5 6.5-8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>{p}</li>
              ))}
            </ul>
          </div>
          {/* frei verteilte Portraits */}
          <Reveal delay={0.12}>
            <div className="relative mx-auto h-[400px] w-full max-w-md">
              {team.photos.slice(0, 9).map((p, i) => {
                const pos = [
                  "left-[8%] top-[2%] h-24 w-24", "left-[42%] top-0 h-28 w-28", "right-[4%] top-[8%] h-20 w-20",
                  "left-0 top-[40%] h-20 w-20", "left-[34%] top-[38%] h-28 w-28", "right-[2%] top-[44%] h-24 w-24",
                  "left-[14%] bottom-[2%] h-24 w-24", "left-[48%] bottom-0 h-20 w-20", "right-[12%] bottom-[4%] h-24 w-24",
                ][i];
                return (
                  <Float key={p} dur={5 + (i % 4)} dist={8 + (i % 3) * 3} delay={i * 0.25} className={`absolute ${pos}`}>
                    <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_24px_50px_-24px_rgba(2,48,71,0.5)] ring-2 ring-white"><Image src={p} alt="" fill sizes="112px" className="object-cover" /></div>
                  </Float>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST + FAQ */}
      <section className="relative px-5 py-20">
        <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <div>
            <p className="text-7xl font-extrabold tracking-tight"><CountUp value={trustSection.retention.value} className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent" /></p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{trustSection.retention.headline}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">{trustSection.retention.text}</p>
          </div>
          <div>
            {trustSection.faq.map((f, i) => (
              <div key={f.q} className="border-b border-line">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-4 text-left"><span className="text-base font-bold">{f.q}</span><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/70 text-ink transition-transform ${open === i ? "rotate-45" : ""}`}><svg viewBox="0 0 12 12" className="h-3 w-3"><path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span></button>
                {open === i && <p className="pb-4 pr-8 text-sm leading-relaxed text-ink-soft">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" className="relative px-5 pb-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-navy to-[#034d6e] p-10 text-center text-white shadow-[0_60px_120px_-50px_rgba(2,48,71,0.7)] sm:p-16">
          <div aria-hidden className="absolute -left-10 bottom-0 h-72 w-72 rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle,rgba(255,138,0,0.5),transparent 70%)" }} />
          <div className="relative mx-auto max-w-2xl">
            <Float dur={6} dist={8}><div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/20"><Image src={banner.photo} alt={banner.person} fill sizes="96px" className="object-cover" /></div></Float>
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.02em]">Lasst uns ausrechnen, was in eurem Konto <span className="font-serif italic font-normal text-brand-orange">steckt.</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75">{banner.text}</p>
            <ul className="mt-5 flex flex-col items-center gap-2 text-sm text-white/85 sm:flex-row sm:justify-center sm:gap-6">{banner.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="text-brand-orange">✓</span>{b}</li>)}</ul>
            <p className="mt-5 text-sm font-bold">{banner.person} · {banner.role}</p>
            <div className="mt-6"><Cta /></div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-ink-soft">{footer.description}</p>
      </section>
    </main>
  );
}
