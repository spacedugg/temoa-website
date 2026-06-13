"use client";

// Stil 7 — STUDIO. Agentur-Look nach Referenz-Template: tiefer Navy-Canvas,
// weiße abgerundete Panels, die darauf „schweben", fließende Wellenlinien als
// Akzentgrafik, kondensierte fette Großbuchstaben-Headlines, nummerierte
// Service-Karten mit Icon-Chips, gestrichelte Eyebrows, Häkchen-Bullets.
// An TEMOA angepasst: Orange/Rot statt Limette.

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

// Kondensierte, fette Display-Headline (Großbuchstaben, enge Spur).
const display = "font-extrabold uppercase tracking-[-0.02em] leading-[0.92] [font-stretch:condensed]";

// Fließende Wellenlinien-Grafik (Akzent, ersetzt das Limette-Topo des Templates).
function Waves({ className = "", opacity = 0.5 }: { className?: string; opacity?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 600 400" className={`pointer-events-none absolute ${className}`} style={{ opacity }}>
      <defs>
        <linearGradient id="wv" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a00" /><stop offset="100%" stopColor="#ff3131" />
        </linearGradient>
      </defs>
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d={`M${-40 + i * 6} 420 C ${120 + i * 10} ${320 - i * 8}, ${320 - i * 6} ${120 + i * 6}, ${640} ${40 + i * 14}`} fill="none" stroke="url(#wv)" strokeWidth="1.1" />
      ))}
    </svg>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] ${light ? "text-white/70" : "text-brand-orange"}`}>
      <span className={`h-px w-6 ${light ? "bg-white/40" : "bg-brand-orange"}`} />{children}
    </span>
  );
}

type ReactNode = React.ReactNode;

function CtaDark({ label = cta.label }: { label?: string }) {
  return <a href={cta.href} className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(2,48,71,0.6)] transition-transform hover:-translate-y-0.5">{label} <span aria-hidden>↗</span></a>;
}
function CtaOutline({ label }: { label: string }) {
  return <a href="#cases" className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-brand-orange hover:text-brand-orange">{label}</a>;
}

// Icon-Chip (kleines gerundetes Quadrat mit Outline-Icon)
function Chip({ d }: { d: string }) {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-lg border border-brand-orange/30 bg-brand-orange/5 text-brand-orange">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
    </span>
  );
}
const ICONS = [
  "M3 12h4l3 8 4-16 3 8h4", // pulse
  "M4 19V5m6 14V9m6 10V3", // bars
  "M12 2v20M2 12h20", // plus/cross
  "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M12 3v9l6 3", // clock
  "M2 7l10 6 10-6M2 7v10l10 6 10-6V7M12 13v10", // box
  "M3 12l4 4L21 4", // check-big
  "M4 20l6-6 4 4 6-8", // trend
];

export default function Stil7() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="bg-brand-navy">
      {/* Navy Canvas + Header */}
      <header className="sticky top-0 z-50">
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 backdrop-blur-xl mx-3 lg:mx-auto">
          <img src="/assets/logos/logo_full_white.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-7 text-sm font-bold text-white/80 lg:flex"><span>Leistungen ↗</span><a href="#cases">Cases ↗</a><span>Team ↗</span></nav>
          <a href={cta.href} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-navy">{cta.short}</a>
        </div>
      </header>

      <div className="px-3 pb-4 pt-3 lg:px-4">
        {/* HERO — weißes Panel auf Navy, Wellenlinien rechts */}
        <section className="relative overflow-hidden rounded-[2rem] bg-white">
          <Waves className="-right-20 -top-10 h-[520px] w-[680px]" opacity={0.55} />
          <div className="relative mx-auto max-w-6xl px-8 py-16 sm:px-12 lg:py-20">
            <Reveal><Eyebrow>Award-fähige Amazon-Agentur</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <h1 className={`${display} mt-6 max-w-[14ch] text-[clamp(2.6rem,7vw,5.6rem)] text-brand-navy`}>
                Amazon-Wachstum,<br />das <span className="text-brand-orange">Marge</span> übrig lässt.
              </h1>
            </Reveal>
            <Reveal delay={0.12}><p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">{hero.subline}</p></Reveal>
            <Reveal delay={0.18}><div className="mt-8 flex flex-wrap items-center gap-3"><CtaDark /><CtaOutline label={hero.secondary.label} /></div></Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
                <span className="flex items-center gap-3">
                  <span className="flex -space-x-2.5">{hero.trustPhotos.map((p) => <span key={p} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"><Image src={p} alt="" fill sizes="36px" className="object-cover" /></span>)}</span>
                  <span className="text-xs text-ink-soft">{hero.trust.map((t) => <span key={t.text} className="block"><strong className="text-ink">{t.value}</strong> {t.text}</span>)}</span>
                </span>
                <span className="flex items-center gap-6">
                  {socialProof.stats.slice(0, 3).map((s) => <span key={s.label}><b className="text-xl font-extrabold text-brand-navy">{s.value}</b> <span className="text-xs text-ink-soft">{s.label}</span></span>)}
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES (oben wie im Template: "WHAT WE OFFER" + nummerierte Karten) */}
        <section className="relative mt-4 overflow-hidden rounded-[2rem] bg-white px-8 py-16 sm:px-12">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>Leistungen</Eyebrow>
            <Reveal><h2 className={`${display} mt-4 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.4rem)] text-brand-navy`}>{services.headline}</h2></Reveal>
            <Reveal delay={0.05}><p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">{services.intro}</p></Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.items.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-[#fafbfc] p-6 transition-colors hover:border-brand-orange/40">
                    <span aria-hidden className="absolute right-4 top-3 text-5xl font-extrabold text-ink/5">{String(i + 1).padStart(2, "0")}</span>
                    <Chip d={ICONS[i % ICONS.length]} />
                    <h3 className="mt-4 text-base font-extrabold uppercase tracking-tight text-brand-navy">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEM — Navy-Panel als Kontrast */}
        <section className="relative mt-4 overflow-hidden rounded-[2rem] bg-brand-navy px-8 py-16 text-white sm:px-12">
          <Waves className="-left-24 bottom-0 h-[420px] w-[600px]" opacity={0.3} />
          <div className="relative mx-auto max-w-6xl">
            <Eyebrow light>Diagnose</Eyebrow>
            <Reveal><h2 className={`${display} mt-4 max-w-[16ch] text-[clamp(1.9rem,4.4vw,3.4rem)]`}>{problem.headline}</h2></Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {problem.pains.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-6">
                    <span className="text-3xl font-extrabold text-brand-orange">0{i + 1}</span>
                    <h3 className="mt-3 text-base font-extrabold uppercase tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* MECHANISM — "OUR METHOD": Bild links, Text rechts (wie OUR MISSION) */}
        <section className="relative mt-4 overflow-hidden rounded-[2rem] bg-white px-8 py-16 sm:px-12">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl">
                <img src={HERO_IMG} alt="" className="aspect-[4/3] w-full object-cover" onError={(e) => (e.currentTarget.style.opacity = "0")} />
                <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/60 bg-white/80 p-3 backdrop-blur">
                  <div className="grid grid-cols-4 gap-2">{hero.cockpit.map((k) => <div key={k.label}><p className="text-sm font-extrabold text-brand-orange">{k.value}</p><p className="text-[8px] uppercase leading-tight text-ink-soft">{k.label}</p></div>)}</div>
                </div>
              </div>
            </Reveal>
            <div>
              <Eyebrow>{mechanism.eyebrow}</Eyebrow>
              <Reveal><h2 className={`${display} mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] text-brand-navy`}>{mechanism.headline}</h2></Reveal>
              <Reveal delay={0.05}><p className="mt-4 text-sm leading-relaxed text-ink-soft">{mechanism.core}</p></Reveal>
              <div className="mt-6 space-y-3">
                {mechanism.steps.map((s, i) => (
                  <Reveal key={s.name} delay={i * 0.08}>
                    <div className="flex items-center gap-4 rounded-xl border border-line bg-[#fafbfc] p-3.5">
                      <span className="text-xl font-extrabold text-brand-orange/40">0{i + 1}</span>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">{s.name}</p><h3 className="text-sm font-bold text-brand-navy">{s.title}</h3></div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US — Häkchen-Liste (wie Template) + Cases */}
        <section className="relative mt-4 overflow-hidden rounded-[2rem] bg-white px-8 py-16 sm:px-12">
          <Waves className="-right-24 -top-10 h-[460px] w-[600px]" opacity={0.4} />
          <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Warum TEMOA</Eyebrow>
              <Reveal><h2 className={`${display} mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] text-brand-navy`}>{cases.headline}</h2></Reveal>
              <ul className="mt-8 space-y-5">
                {cases.items.map((c) => (
                  <li key={c.brand} className="flex gap-4">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-orange/10 text-brand-orange"><svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M3 8.5l3.5 3.5 6.5-8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    <div><p className="font-extrabold text-brand-navy"><span className="text-brand-orange">{c.metric}</span> · {c.metricLabel}</p><p className="mt-0.5 text-sm text-ink-soft">{c.brand} · {c.category} — {c.sub}</p></div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[11px] text-ink-soft/80">{cases.note}</p>
            </div>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-[#fafbfc] p-8">
                <div>
                  <p className="text-7xl font-extrabold tracking-tight text-brand-orange">{cases.portfolio.value}</p>
                  <p className="mt-2 text-lg font-extrabold uppercase tracking-tight text-brand-navy">{cases.portfolio.text}</p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                  {socialProof.stats.slice(1).map((s) => <div key={s.label}><p className="text-2xl font-extrabold text-brand-navy">{s.value}</p><p className="text-[11px] text-ink-soft">{s.label}</p></div>)}
                </div>
                <div className="mt-8"><CtaDark label={cases.portfolio.link} /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STEPS + FAQ */}
        <section className="relative mt-4 overflow-hidden rounded-[2rem] bg-white px-8 py-16 sm:px-12">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Ablauf</Eyebrow>
              <Reveal><h2 className={`${display} mt-4 text-[clamp(1.8rem,4vw,3rem)] text-brand-navy`}>{steps.headline}</h2></Reveal>
              <div className="mt-8 space-y-4">
                {steps.items.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.08}>
                    <div className="flex gap-4 rounded-xl border border-line bg-[#fafbfc] p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-orange text-sm font-extrabold text-white">{i + 1}</span>
                      <div><h3 className="font-bold text-brand-navy">{s.title} <span className="text-xs font-normal text-ink-soft">/ {s.duration}</span></h3><p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.text}</p></div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>Vertrauen</Eyebrow>
              <p className="mt-4 text-7xl font-extrabold tracking-tight text-brand-orange">{trustSection.retention.value}</p>
              <h3 className="mt-1 text-xl font-extrabold uppercase tracking-tight text-brand-navy">{trustSection.retention.headline}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{trustSection.retention.text}</p>
              <div className="mt-6 border-t border-line">
                {trustSection.faq.map((f, i) => (
                  <div key={f.q} className="border-b border-line">
                    <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-3.5 text-left"><span className="text-sm font-bold text-brand-navy">{f.q}</span><span className="text-brand-orange">{open === i ? "−" : "+"}</span></button>
                    {open === i && <p className="pb-3.5 text-sm leading-relaxed text-ink-soft">{f.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BANNER */}
        <section id="kontakt" className="relative mt-4 overflow-hidden rounded-[2rem] bg-brand-navy px-8 py-20 text-center text-white sm:px-12">
          <Waves className="-left-20 -top-10 h-[440px] w-[600px]" opacity={0.3} />
          <Waves className="-right-20 bottom-0 h-[440px] w-[600px]" opacity={0.3} />
          <div className="relative mx-auto max-w-2xl">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/15"><Image src={banner.photo} alt={banner.person} fill sizes="96px" className="object-cover" /></div>
            <h2 className={`${display} mt-6 text-[clamp(1.9rem,4.4vw,3.2rem)]`}>{banner.headline}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">{banner.text}</p>
            <ul className="mt-5 flex flex-col items-center gap-2 text-sm text-white/85 sm:flex-row sm:justify-center sm:gap-6">{banner.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="text-brand-orange">✓</span>{b}</li>)}</ul>
            <div className="mt-7"><a href={cta.href} className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_-10px_rgba(255,138,0,0.6)] transition-transform hover:-translate-y-0.5">{cta.label} ↗</a></div>
            <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">{footer.description}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
