"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
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

// Eine Sektion = ein Viewport: Inhalte sind bewusst kompakt gehalten und
// werden ab lg vertikal zentriert auf volle Höhe gesetzt.
function Viewport({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative flex items-center overflow-hidden py-16 lg:min-h-svh lg:py-20 ${className}`}>
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

const tileShadow = "shadow-[0_2px_4px_rgba(2,48,71,0.04),0_24px_48px_-24px_rgba(2,48,71,0.28)]";

/* ---------------------------------- Hero --------------------------------- */

// CSS-Bühne hinter dem Foto: heller Studio-Verlauf, Podium, Glas-Panels.
// Sichtbar, solange das fotorealistische Asset noch nicht im Repo liegt.
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
      <div
        className="absolute left-1/2 top-[68%] h-10 w-72 -translate-x-1/2 rounded-[100%] bg-[#023047]/15 blur-xl"
        aria-hidden
      />
      <div className="absolute left-1/2 top-[40%] w-44 -translate-x-1/2 rounded-2xl border border-white/70 bg-white/55 p-3 shadow-[0_24px_50px_-20px_rgba(2,48,71,0.35)] backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">Organischer Anteil</p>
        <p className="mt-0.5 text-xl font-extrabold text-brand-orange">80 %</p>
        <svg viewBox="0 0 120 36" className="mt-1 w-full">
          <path d="M2 30 C25 28 45 22 65 16 C85 10 100 8 118 4" fill="none" stroke="#ff8a00" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute left-[16%] top-[22%] w-36 rotate-[-5deg] rounded-2xl border border-white/70 bg-white/45 p-3 backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">ROAS</p>
        <p className="mt-0.5 text-lg font-extrabold text-ink">4,8</p>
      </div>
      <div className="absolute right-[12%] top-[58%] w-36 rotate-[4deg] rounded-2xl border border-white/70 bg-white/45 p-3 backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">TACoS</p>
        <p className="mt-0.5 text-lg font-extrabold text-brand-red">−35 %</p>
      </div>
    </div>
  );
}

// Kundenlogos als Endlos-Marquee (Muster aus dem Sales-Room: Graustufen,
// Farbe bei Hover, weiche Kanten). Liste verdoppelt für nahtlosen Loop.
function LogoMarquee() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />
      <div
        className="flex w-max items-center"
        style={{ animation: "marquee-left 45s linear infinite" }}
      >
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
                <img
                  src={partnerBadge.src}
                  alt={partnerBadge.alt}
                  className="h-16 w-auto rounded-xl ring-1 ring-line"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={36}>
            <div
              className="relative aspect-[5/4] w-full overflow-hidden rounded-[1.75rem] ring-1 ring-line shadow-[0_3px_6px_rgba(2,48,71,0.05),0_50px_90px_-40px_rgba(2,48,71,0.45)] sm:aspect-[16/10] lg:aspect-[5/4] lg:max-h-[62svh]"
            >
              <StageFallback />
              {image && (
                <img
                  src={image}
                  alt="Produktbühne: schwebendes Produkt mit Performance-Dashboards"
                  className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
                />
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className={`mt-8 rounded-2xl border border-white/70 bg-white/70 px-5 py-4 backdrop-blur-xl lg:mt-10 ${tileShadow}`}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{s.value}</p>
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
    <Viewport className="bg-surface-alt">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <Reveal>
          <H2 className="max-w-md">{problem.headline}</H2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">{problem.intro}</p>
        </Reveal>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {problem.pains.map((p, i) => (
          <Reveal key={p.title} delay={0.08 * i} className="h-full">
            <div className={`h-full rounded-2xl bg-white p-5 ring-1 ring-line transition-transform hover:-translate-y-1 ${tileShadow}`}>
              <span className="text-xs font-extrabold tracking-widest text-brand-orange">0{i + 1}</span>
              <h3 className="mt-2 text-base font-bold leading-snug text-ink">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.24}>
        <p className="mt-8 text-center text-sm font-bold text-ink">
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

function Mechanism() {
  return (
    <Viewport className="bg-brand-navy">
      {/* Bühnenlicht: warmes Glühen auf dunklem Studio-Grund */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 110%, rgba(255,138,0,0.22) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 40% 30% at 85% 0%, rgba(255,49,49,0.1) 0%, rgba(255,49,49,0) 70%)",
          }}
        />
      </div>
      <div className="relative">
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
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {mechanism.steps.map((s, i) => (
            <Reveal key={s.name} delay={0.08 * i} className="h-full">
              <div className="relative h-full rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-widest text-brand-orange">0{i + 1}</span>
                  <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                    {s.name}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.24}>
          <div className="mt-8 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-6 py-4 text-center">
            <p className="text-sm font-bold text-white sm:text-base">{mechanism.target}</p>
          </div>
        </Reveal>
      </div>
    </Viewport>
  );
}

/* --------------------------------- Cases --------------------------------- */

function Cases() {
  return (
    <Viewport className="bg-white">
      <Reveal>
        <H2>{cases.headline}</H2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{cases.subline}</p>
      </Reveal>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {cases.items.map((c, i) => (
          <Reveal key={c.brand} delay={0.08 * i} className="h-full">
            <div className={`flex h-full gap-5 rounded-2xl bg-white p-5 ring-1 ring-line ${tileShadow}`}>
              <div className="relative hidden h-28 w-28 shrink-0 overflow-hidden rounded-xl ring-1 ring-line sm:block">
                <Image src={c.image} alt={c.brand} fill sizes="112px" className="object-cover" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                  {c.brand} · {c.category}
                </p>
                <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-ink">
                  <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                    {c.metric}
                  </span>
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{c.text}</p>
                <p className="mt-2 text-[11px] text-ink-soft/80">{c.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-brand-navy px-6 py-5 sm:flex-row">
          <p className="text-base font-bold text-white">{midCta.question}</p>
          <CtaButton label={midCta.label} />
        </div>
      </Reveal>
    </Viewport>
  );
}

/* -------------------------------- Leistungen ------------------------------ */

// Die vier Subbrand-Formen aus dem TEMOA-Logo-Icon (Pfade aus
// public/assets/logos/logo_icon.svg).
function BrandShapeIcon({ shape, className = "" }: { shape: BrandShape; className?: string }) {
  if (shape === "square")
    return (
      <svg viewBox="0 0 108 108" className={className} aria-hidden>
        <rect width="108" height="108" rx="6" fill="#ff9900" />
      </svg>
    );
  if (shape === "circle")
    return (
      <svg viewBox="0 0 108 108" className={className} aria-hidden>
        <circle cx="54" cy="54" r="54" fill="#ff3131" />
      </svg>
    );
  if (shape === "u")
    return (
      <svg viewBox="0 121 110 134" className={className} aria-hidden>
        <path
          d="M2.25,121.7 L107.6,121.7 C108.8,121.7 109.8,122.7 109.8,123.9 L109.8,200.6 C109.5,223.9 94.6,243.7 74.1,251.2 C68.6,253.1 62.3,254.1 56,254.1 C49.7,254.1 43.8,253 38.3,251.2 C17.6,243.8 2.7,224 2.4,200.6 L2.4,123.9 C2.4,122.7 3.4,121.7 2.25,121.7 Z"
          fill="#023047"
        />
      </svg>
    );
  return (
    <svg viewBox="120 122 109 132" className={className} aria-hidden>
      <path
        d="M176.3,122.9 L226.2,153.6 C227.4,154.3 228.1,155.6 228.1,157 L228.1,218.7 C228.1,220.1 227.4,221.4 226.2,222.1 L176.3,252.9 C175.1,253.6 173.6,253.6 172.5,252.9 L122.6,222.1 C121.4,221.4 120.7,220.1 120.7,218.7 L120.7,157 C120.7,155.6 121.4,154.3 122.6,153.6 L172.5,122.9 C173.6,122.1 175.1,122.1 176.3,122.9 Z"
        fill="#cde6f4"
      />
    </svg>
  );
}

function ServiceTile({
  name,
  subBrand,
  shape,
  title,
  text,
  dark = false,
  className = "",
}: {
  name?: string;
  subBrand?: string;
  shape?: BrandShape;
  title: string;
  text: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`h-full rounded-2xl p-5 transition-transform hover:-translate-y-1 ${
        dark ? "bg-brand-navy text-white shadow-[0_30px_60px_-30px_rgba(2,48,71,0.7)]" : `bg-white ring-1 ring-line ${tileShadow}`
      } ${className}`}
    >
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
        {shape && <BrandShapeIcon shape={shape} className="mt-1 h-6 w-6 shrink-0" />}
      </div>
      <p className={`mt-2 text-[13px] leading-relaxed ${dark ? "text-white/75" : "text-ink-soft"}`}>{text}</p>
    </div>
  );
}

function Services() {
  return (
    <Viewport className="bg-surface-alt">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <Reveal>
          <H2 className="max-w-xl">{services.headline}</H2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">{services.intro}</p>
        </Reveal>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <ServiceTile {...services.foundation} />
        </Reveal>
        {services.levers.map((l, i) => (
          <Reveal key={l.title} delay={0.08 + 0.04 * i}>
            <ServiceTile {...l} />
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <ServiceTile dark {...services.bracket} />
        </Reveal>
      </div>
    </Viewport>
  );
}

/* --------------------------------- Schritte ------------------------------- */

function Steps() {
  return (
    <Viewport className="bg-white">
      <Reveal>
        <H2 className="mx-auto max-w-xl text-center">{steps.headline}</H2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.items.map((s, i) => (
          <Reveal key={s.title} delay={0.08 * i} className="h-full">
            <div className={`relative h-full rounded-2xl bg-white p-5 pt-7 ring-1 ring-line ${tileShadow}`}>
              <span className="absolute -top-4 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] text-sm font-extrabold text-white shadow-[0_10px_20px_-8px_rgba(255,138,0,0.7)]">
                {i + 1}
              </span>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-ink">{s.title}</h3>
                <span className="shrink-0 rounded-full bg-surface-alt px-2.5 py-0.5 text-[10px] font-bold text-ink-soft">
                  {s.duration}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{s.text}</p>
            </div>
          </Reveal>
        ))}
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
    <Viewport className="bg-surface-alt">
      <Reveal>
        <H2 className="mx-auto max-w-xl text-center">{faq.headline}</H2>
      </Reveal>
      <Reveal delay={0.08}>
        <div className={`mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl bg-white ring-1 ring-line ${tileShadow}`}>
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
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/20 sm:h-28 sm:w-28">
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

export default function EntwurfF({ heroImage }: { heroImage: string | null }) {
  return (
    <main>
      <Header />
      <Hero image={heroImage} />
      <Problem />
      <Mechanism />
      <Cases />
      <Services />
      <Steps />
      <Faq />
      <Closing />
    </main>
  );
}
