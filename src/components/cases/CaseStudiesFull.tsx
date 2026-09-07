"use client";

import { useState } from "react";
import { ZahlText } from "../takt/Zahl";
import { cases, type CaseStudy, type CaseStat, type CaseBadge, type CaseMetric } from "@/lib/cases";
import { Flaggenreihe } from "../ui/Flagge";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../takt/Icons";
import { CaseChart } from "./CaseChart";
import { CaseListingView } from "./CaseListingView";

/* Icon je Story-Schritt: Ausgangslage, Vorgehen, Ergebnis. Die Zeichen kommen
   aus dem Satz der Website (`takt/Icons`), nicht aus dem allgemeinen
   Strich-Satz: Lupe, Kompass, Stufen sagen etwas ueber den Schritt, eine
   Rakete sagt nichts. */
const STEP_ICONS: IconName[] = ["lupe", "kompass", "stufen"];

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
      {/* `min-w-0` an der Reihe und `whitespace-nowrap` an der Zahl: ein
          langer Wert wie „1.677.538 €" brach sonst vor dem Eurozeichen um und
          zog die Karte hoeher als ihre Nachbarn. Statt umzubrechen wird die
          Zahl jetzt eine Stufe kleiner gesetzt, wenn sie lang ist. */}
      <div className="flex min-w-0 items-center gap-1.5 text-white">
        <ZahlText
          text={stat.value}
          className={`whitespace-nowrap font-extrabold leading-none tracking-tight ${
            stat.value.length > 9 ? "text-[1.6rem] md:text-[2rem]" : "text-3xl md:text-4xl"
          }`}
        />
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
      <div className="flex min-w-0 items-center justify-center gap-1.5" style={{ color: accent }}>
        <ZahlText
          text={stat.value}
          className={`whitespace-nowrap font-extrabold leading-none tracking-tight ${
            stat.value.length > 9 ? "text-[1.35rem]" : "text-2xl"
          }`}
        />
        <TrendArrow trend={stat.trend} />
      </div>
      <div className="mt-2 text-sm font-bold text-ink">{stat.label}</div>
      {stat.sublabel && <div className="mt-0.5 text-xs leading-snug text-ink-muted">{stat.sublabel}</div>}
    </div>
  );
}

/**
 * Das Kennzahlenband: CTR, CVR, ACoS, TACoS.
 *
 * Das Kuerzel steht zuerst und gross, der Wert daneben. Wer aus dieser Branche
 * kommt, sucht genau nach diesen vier Abkuerzungen, und findet sie in einer
 * Reihe von Karten mit langen Beschriftungen nicht.
 *
 * Bei ACoS und TACoS zeigt der Pfeil nach unten und bleibt gruen: ein
 * gefallener Wert ist dort das gute Ergebnis.
 */
/* Gruen fuer alle vier: eine gestiegene Klickrate und ein gefallener ACoS
   sind dasselbe Ergebnis. #6EE7A0 und nicht das dunkle Signalgruen, auf Navy
   kommt letzteres auf 2,4:1. */
const GRUEN = "#6EE7A0";

function Kennzahl({ m }: { m: CaseMetric }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 px-4 py-4 sm:px-5">
      <div className="flex items-baseline gap-2">
        <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-white/55">
          {m.kuerzel}
        </span>
        <span
          className="flex items-center gap-1 whitespace-nowrap text-[1.45rem] font-extrabold leading-none tracking-tight md:text-[1.7rem]"
          style={{ color: GRUEN }}
        >
          <ZahlText text={m.wert} />
          <TrendArrow trend={m.trend} />
        </span>
      </div>
      <span className="text-[0.8rem] font-bold leading-snug text-white">{m.name}</span>
      {(m.von || m.hinweis) && (
        <span className="text-[0.75rem] leading-snug text-white/55">
          {m.von && m.nach ? `${m.von} auf ${m.nach}` : m.hinweis}
        </span>
      )}
    </div>
  );
}

function Kennzahlenband({ metriken }: { metriken: CaseMetric[] }) {
  if (metriken.length === 0) return null;
  return (
    <Reveal delay={0.06}>
      <div
        className="mx-auto mt-5 max-w-5xl overflow-hidden rounded-[1.4rem] shadow-[0_26px_60px_-40px_rgba(2,48,71,0.7)]"
        style={{ background: "linear-gradient(120deg, #0B4D6B 0%, #023047 55%, #021C2B 100%)" }}
      >
        {/* Feine Trennlinien statt Kacheln in der Kachel: das Band ist eine
            Flaeche, die Kennzahlen stehen darin nebeneinander. */}
        <div className="flex flex-wrap divide-y divide-white/10 sm:divide-y-0 sm:divide-x">
          {metriken.map((m, i) => (
            <div key={`${m.kuerzel}-${i}`} className="flex w-full min-w-0 sm:w-auto sm:flex-1 sm:divide-white/10">
              <Kennzahl m={m} />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function CaseBlock({ c, index }: { c: CaseStudy; index: number }) {
  const tone = index % 2 === 1 ? "ground-tint" : "ground";
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

              {/* Branche und Marktplaetze. Die Laender tragen Fahnen: neun
                  Kuerzel in einer Zeile sagen einem Besucher nichts, eine Reihe
                  Fahnen zeigt auf einen Blick, wie breit die Marke steht. */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm text-white/65">{c.industry}</span>
                <Flaggenreihe codes={c.marketplaces} hell className="justify-center" />
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

        <Kennzahlenband metriken={c.kennzahlen} />

        {/* Die ausgelieferte Arbeit direkt unter den Zahlen: erst sehen, dann
            lesen. */}
        <CaseListingView c={c} />

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
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${c.accent}14`, color: c.accent }}>
                    <Icon name={STEP_ICONS[i % STEP_ICONS.length]} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-extrabold" style={{ color: c.accent }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-ink">{s.heading}</h3>
                <p className="mt-2 text-sm font-bold leading-relaxed text-ink">{s.body}</p>
                {s.punkte && (
                  <ul className="mt-3 space-y-2">
                    {s.punkte.map((punkt) => (
                      <li key={punkt} className="flex gap-2.5 text-sm leading-snug text-ink-muted">
                        {/* Das Aufzaehlungszeichen traegt die Fallfarbe, der
                            Text bleibt dunkel: farbige Schrift auf Weiss ist
                            in dieser Groesse nicht lesbar. */}
                        <span
                          aria-hidden
                          className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: c.accent }}
                        />
                        <span>{punkt}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
