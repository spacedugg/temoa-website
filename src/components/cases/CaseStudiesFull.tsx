"use client";

import { cases, type CaseStudy, type CaseStat, type CaseBadge } from "@/lib/cases";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { CaseChart } from "./CaseChart";

function TrendArrow({ trend }: { trend: "up" | "down" | "neutral" }) {
  if (trend === "neutral") return null;
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
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
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  if (icon === "award")
    return (
      <svg {...common}>
        <circle cx="12" cy="9" r="5" />
        <path d="M9 13l-1.5 8L12 18l4.5 3L15 13" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M6 4h12v3a6 6 0 0 1-12 0V4Z" />
      <path d="M6 5H4v1a3 3 0 0 0 3 3M18 5h2v1a3 3 0 0 1-3 3M9 20h6M12 13v7" />
    </svg>
  );
}

function StatCard({ stat, accent, big }: { stat: CaseStat; accent: string; big?: boolean }) {
  return (
    <div className="surface flex h-full flex-col p-5">
      <div className="flex items-center gap-1.5" style={{ color: accent }}>
        <span className={`font-extrabold leading-none tracking-tight ${big ? "text-3xl md:text-[2.5rem]" : "text-2xl"}`}>
          {stat.value}
        </span>
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
        {/* header */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-ink shadow-soft ring-1 ring-black/[0.05]">
              <span className="h-2 w-2 rounded-full" style={{ background: c.accent }} />
              {c.displayName}
            </span>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink-muted ring-1 ring-black/[0.05]">
              {c.industry}
            </span>
            {c.marketplaces.map((m) => (
              <span key={m} className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-ink-muted ring-1 ring-black/[0.05]">
                {m}
              </span>
            ))}
            <span className="ml-auto text-xs font-medium text-ink-faint">{c.timeframe}</span>
            {c.anonymized && (
              <span className="rounded-full bg-navy/[0.06] px-2.5 py-1 text-xs font-medium text-ink-faint">anonymisiert</span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-balance text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl md:text-4xl">
            {c.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">{c.subheadline}</p>
        </Reveal>

        {/* hero stats */}
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3" stagger={0.06}>
          {c.heroStats.map((s) => (
            <RevealItem key={s.label} className="h-full">
              <StatCard stat={s} accent={c.accent} big />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* chart */}
        {c.chart && (
          <Reveal delay={0.1}>
            <div className="mt-6">
              <CaseChart points={c.chart} accent={c.accent} />
            </div>
          </Reveal>
        )}

        {/* story: three steps */}
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.07}>
          {c.sections.map((s, i) => (
            <RevealItem key={s.heading} className="h-full">
              <div className="relative flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/[0.05]">
                <span className="text-sm font-extrabold" style={{ color: c.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-bold text-ink">{s.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* sub stats + badges */}
        {(c.subStats.length > 0 || c.badges.length > 0) && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.subStats.map((s) => (
              <Reveal key={s.label} className="h-full">
                <StatCard stat={s} accent={c.accent} />
              </Reveal>
            ))}
          </div>
        )}

        {c.badges.length > 0 && (
          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap gap-3">
              {c.badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft ring-1 ring-black/[0.05]"
                >
                  <span style={{ color: c.accent }}>
                    <BadgeIcon icon={b.icon} />
                  </span>
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
