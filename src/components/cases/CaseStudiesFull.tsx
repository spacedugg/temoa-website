"use client";

import { useState } from "react";
import { cases, type CaseStudy, type CaseStat, type CaseBadge } from "@/lib/cases";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { CaseChart } from "./CaseChart";

/** Brand logo in a white chip, overlaid on the case thumbnail. Renders
 *  nothing for anonymised brands and hides itself until the logo loads,
 *  so a missing file never shows a broken image. */
function LogoChip({ c }: { c: CaseStudy }) {
  const [ok, setOk] = useState(false);
  if (!c.logo) return null;
  return (
    <span
      className="inline-flex items-center rounded-lg bg-white/95 px-3 py-2 shadow-soft ring-1 ring-black/[0.06] backdrop-blur"
      style={{ display: ok ? undefined : "none" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.logo} alt={c.displayName} className="h-6 w-auto object-contain" onLoad={() => setOk(true)} onError={() => setOk(false)} />
    </span>
  );
}

function mesh(accent: string) {
  return {
    backgroundColor: "#0A1E2B",
    backgroundImage: `radial-gradient(120% 130% at 8% 0%, ${accent} 0%, ${accent}00 46%), radial-gradient(120% 120% at 100% 100%, ${accent}44 0%, transparent 55%), linear-gradient(155deg, #0A1E2B 35%, #021C2B 100%)`,
  } as React.CSSProperties;
}

function TrendArrow({ trend, light }: { trend: "up" | "down" | "neutral"; light?: boolean }) {
  if (trend === "neutral") return null;
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className={light ? "text-white/80" : ""}>
      {trend === "up" ? (
        <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function BadgeIcon({ icon }: { icon: CaseBadge["icon"] }) {
  const common = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (icon === "shield")
    return (<svg {...common}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></svg>);
  if (icon === "award")
    return (<svg {...common}><circle cx="12" cy="9" r="5" /><path d="M9 13l-1.5 8L12 18l4.5 3L15 13" /></svg>);
  return (<svg {...common}><path d="M6 4h12v3a6 6 0 0 1-12 0V4Z" /><path d="M6 5H4v1a3 3 0 0 0 3 3M18 5h2v1a3 3 0 0 1-3 3M9 20h6M12 13v7" /></svg>);
}

function HeroStat({ stat }: { stat: CaseStat }) {
  return (
    <div className="rounded-2xl bg-white/[0.08] p-5 ring-1 ring-white/12 backdrop-blur">
      <div className="flex items-center gap-1.5 text-white">
        <span className="text-3xl font-extrabold leading-none tracking-tight md:text-4xl">{stat.value}</span>
        <TrendArrow trend={stat.trend} light />
      </div>
      <div className="mt-2 text-sm font-bold text-white">{stat.label}</div>
      {stat.sublabel && <div className="mt-0.5 text-xs leading-snug text-white/65">{stat.sublabel}</div>}
    </div>
  );
}

function SubStat({ stat, accent }: { stat: CaseStat; accent: string }) {
  return (
    <div className="surface flex h-full flex-col p-5 text-center">
      <div className="flex items-center justify-center gap-1.5" style={{ color: accent }}>
        <span className="text-2xl font-extrabold leading-none tracking-tight">{stat.value}</span>
        <TrendArrow trend={stat.trend} />
      </div>
      <div className="mt-2 text-sm font-bold text-ink">{stat.label}</div>
      {stat.sublabel && <div className="mt-0.5 text-xs leading-snug text-ink-muted">{stat.sublabel}</div>}
    </div>
  );
}

function CaseBlock({ c, index }: { c: CaseStudy; index: number }) {
  const tone = index % 2 === 1 ? "bg-[#EDF5FB]" : "bg-white";
  return (
    <section id={c.slug} className={`relative scroll-mt-28 ${tone} py-16 md:py-24`}>
      <div className="container-x">
        {/* Premium branded hero panel */}
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] p-7 shadow-[0_40px_90px_-45px_rgba(2,48,71,0.6)] md:p-12" style={mesh(c.accent)}>
            <div className="relative">
              {/* case thumbnail (same image as the homepage) with logo overlay */}
              {c.bgImage && (
                <div className="relative mb-7 overflow-hidden rounded-2xl ring-1 ring-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.bgImage} alt="" className="h-48 w-full object-cover md:h-60" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <LogoChip c={c} />
                  </div>
                </div>
              )}

              {/* meta: industry + marketplaces (no brand name, no timeframe) */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-center">
                <span className="text-sm text-white/65">{c.industry}</span>
                <span className="text-sm text-white/40">·</span>
                <span className="text-sm text-white/65">{c.marketplaces.join(", ")}</span>
              </div>

              <h2 className="mx-auto mt-5 max-w-3xl text-balance text-center text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                {c.headline}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-base leading-relaxed text-white/75 md:text-lg">
                {c.subheadline}
              </p>

              <RevealGroup className="mx-auto mt-9 grid max-w-3xl gap-4 sm:grid-cols-3" stagger={0.07}>
                {c.heroStats.map((s) => (
                  <RevealItem key={s.label} className="h-full">
                    <HeroStat stat={s} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Reveal>

        {/* chart */}
        {c.chart && (
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-5xl">
              <CaseChart points={c.chart} accent={c.accent} />
            </div>
          </Reveal>
        )}

        {/* story: three steps */}
        <RevealGroup className="mx-auto mt-6 grid max-w-5xl gap-5 md:grid-cols-3" stagger={0.07}>
          {c.sections.map((s, i) => (
            <RevealItem key={s.heading} className="h-full">
              <div className="relative flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/[0.05]">
                <span className="text-sm font-extrabold" style={{ color: c.accent }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-base font-bold text-ink">{s.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* sub stats */}
        {c.subStats.length > 0 && (
          <div className="mx-auto mt-5 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.subStats.map((s) => (
              <Reveal key={s.label} className="h-full">
                <SubStat stat={s} accent={c.accent} />
              </Reveal>
            ))}
          </div>
        )}

        {/* badges */}
        {c.badges.length > 0 && (
          <Reveal delay={0.08}>
            <div className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-3">
              {c.badges.map((b) => (
                <span key={b.label} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft ring-1 ring-black/[0.05]">
                  <span style={{ color: c.accent }}><BadgeIcon icon={b.icon} /></span>
                  {b.label}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function CaseStudiesFull() {
  return (
    <>
      {cases.map((c, i) => (
        <CaseBlock key={c.slug} c={c} index={i} />
      ))}
    </>
  );
}
