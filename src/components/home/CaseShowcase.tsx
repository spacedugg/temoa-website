"use client";

import { cases, type CaseStudy } from "@/lib/cases";
import { Reveal } from "../ui/Reveal";

function mesh(accent: string) {
  return {
    backgroundColor: "#0A1E2B",
    backgroundImage: `radial-gradient(130% 120% at 12% 0%, ${accent} 0%, ${accent}00 48%), radial-gradient(120% 120% at 100% 100%, ${accent}55 0%, transparent 55%), linear-gradient(155deg, #0A1E2B 35%, #021C2B 100%)`,
  } as React.CSSProperties;
}

function LogoBadge({ c, size = "md" }: { c: CaseStudy; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-9 w-9 text-base" : "h-11 w-11 text-lg";
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`grid ${dim} shrink-0 place-items-center rounded-xl font-extrabold text-white ring-1 ring-white/25`}
        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}
      >
        {c.mono}
      </span>
      <span className="truncate text-sm font-bold text-white">{c.displayName}</span>
    </div>
  );
}

/* ---------- Desktop: interactive split panels ---------- */
function Panels() {
  return (
    <div className="hidden h-[30rem] gap-3 lg:flex">
      {cases.map((c) => (
        <a
          key={c.slug}
          href={`/ergebnisse#${c.slug}`}
          className="group relative isolate flex min-w-0 flex-1 overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-black/5 transition-[flex] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:flex-[2.6]"
          style={mesh(c.accent)}
        >
          {/* real case background image + legibility overlay */}
          {c.bgImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.bgImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: `linear-gradient(155deg, ${c.accent}59 0%, rgba(10,30,43,0.30) 40%, rgba(2,28,43,0.92) 100%)` }}
          />
          {/* texture + giant monogram */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
          />
          <span className="pointer-events-none absolute -right-6 -top-10 select-none text-[12rem] font-black leading-none text-white/[0.06]">
            {c.mono}
          </span>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />

          {/* content */}
          <div className="relative z-10 flex w-full flex-col p-6">
            <div className="flex items-start justify-between gap-2">
              <LogoBadge c={c} />
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                {c.marketplaces.join(" · ")}
              </span>
            </div>

            <div className="mt-auto">
              {/* big metric, always visible */}
              <div className="text-4xl font-extrabold leading-none tracking-tight text-white whitespace-nowrap">
                {c.preview.value}
              </div>
              <div className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/70">
                {c.preview.label}
              </div>

              {/* revealed on hover */}
              <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                <div className="overflow-hidden">
                  <h3 className="mt-4 max-w-md text-balance text-xl font-bold leading-snug text-white">
                    {c.headline}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.heroStats.slice(0, 2).map((s) => (
                      <span key={s.label} className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                        <span className="font-extrabold">{s.value}</span> {s.label}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-white">
                    Case Study ansehen
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ---------- Mobile: stacked cards ---------- */
function MobileCards() {
  return (
    <div className="grid gap-4 lg:hidden">
      {cases.map((c) => (
        <a
          key={c.slug}
          href={`/ergebnisse#${c.slug}`}
          className="relative isolate flex h-52 flex-col overflow-hidden rounded-3xl p-5 shadow-lift ring-1 ring-black/5"
          style={mesh(c.accent)}
        >
          {c.bgImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.bgImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: `linear-gradient(155deg, ${c.accent}59 0%, rgba(10,30,43,0.30) 40%, rgba(2,28,43,0.92) 100%)` }}
          />
          <span className="pointer-events-none absolute -right-4 -top-6 select-none text-[8rem] font-black leading-none text-white/[0.06]">
            {c.mono}
          </span>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="relative z-10 flex h-full flex-col">
            <LogoBadge c={c} size="sm" />
            <div className="mt-auto">
              <div className="text-4xl font-extrabold leading-none tracking-tight text-white">{c.preview.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{c.preview.label}</div>
              <h3 className="mt-2 text-balance text-base font-bold leading-snug text-white">{c.headline}</h3>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export function CaseShowcase() {
  return (
    <section id="case-studies" className="relative scroll-mt-24 bg-white py-20 md:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Case Studies
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
              Marken, die mit uns <span className="text-gradient">gewachsen sind.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <Panels />
            <MobileCards />
          </div>
        </Reveal>

        <p className="mt-6 hidden text-center text-sm text-ink-faint lg:block">
          Fahrt über eine Marke, um mehr zu sehen, oder klickt für die ganze Case Study.
        </p>
      </div>
    </section>
  );
}
