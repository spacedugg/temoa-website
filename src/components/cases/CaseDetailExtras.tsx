"use client";

import { useState } from "react";
import { cases, type CaseStudy } from "@/lib/cases";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Flagge } from "../ui/Flagge";
import { Markenlogo } from "../ui/Markenlogo";
import { Kachel, Lupe } from "./CaseArbeit";

/* Das einfache Raster fuer Faelle, zu denen einzelne Aufnahmen vorliegen,
   aber kein vollstaendiges Listing. Wo ausgelieferte Arbeit vorliegt, steht
   sie weiter oben im Fall (`CaseArbeitView`), und diese Sektion entfaellt. */
export function CaseGallery({ c }: { c: CaseStudy }) {
  const [offen, setOffen] = useState<string | null>(null);
  if (c.arbeit || !c.images || c.images.length === 0) return null;
  return (
    <section className="relative ground py-12 md:py-16">
      <div className="container-x">
        <Reveal>
          <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Mehr aus diesem Projekt
          </h2>
        </Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
          {c.images.map((src) => (
            <Kachel key={src} src={src} onClick={() => setOffen(src)} className="aspect-square rounded-2xl" />
          ))}
        </div>
      </div>
      {offen && <Lupe src={offen} onClose={() => setOffen(null)} />}
    </section>
  );
}

/**
 * Die anderen Faelle am Fuss einer Fallseite.
 *
 * Vorher waren das fuenf gleiche Kacheln von 160 Pixeln Hoehe auf hellem
 * Grund, mit einer Zahl darauf: sie sahen aus wie ein Nachtrag und niemand
 * hat sie geoeffnet.
 *
 * Jetzt dieselbe Sprache wie das Band auf der Startseite, weil der Kunde die
 * dort mag: dunkler Grund, Foto mit dem Farbschimmer der Marke, weisse
 * Kachel mit dem Logo, die Kennzahl in Gruen, ein Rahmen, der beim Zeigen von
 * Weiss auf Orange wechselt. Der Rahmen liegt als eigene Ebene ueber dem
 * Bild: als `outline` an der Karte selbst laege er unter dem Foto.
 *
 * Zwei Zeilen statt drei gleicher: die ersten drei Karten teilen sich die
 * Breite, die letzten beiden sind breiter. Bei genau fuenf Faellen geht das
 * auf, sonst laufen alle in der schmalen Form.
 */
function AndererFall({ c }: { c: CaseStudy }) {
  return (
    <a
      href={`/ergebnisse/${c.slug}`}
      className="group relative isolate block h-60 overflow-hidden rounded-[1.4rem] shadow-[0_28px_60px_-34px_rgba(4,16,28,0.95)] transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.24,1)] hover:-translate-y-1 md:h-64"
      style={{ backgroundColor: "#08192b" }}
    >
      {c.bgImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={c.bgImage}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.24,1)] group-hover:scale-[1.06]"
        />
      )}
      {/* Der Farbschimmer der Marke oben, darunter der Verlauf, der die
          Schrift traegt. Ohne den Verlauf steht weisse Schrift auf hellen
          Fotos. */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 80% at 50% 0%, ${c.accent}55, transparent 62%)` }}
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,22,36,0.95) 0%, rgba(6,22,36,0.86) 30%, rgba(6,22,36,0.5) 62%, rgba(6,22,36,0.12) 100%)",
        }}
      />

      <div className="relative flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          {c.logo ? (
            <Markenlogo logo={c.logo} name={c.displayName} auf="dunkel" className="h-9" />
          ) : (
            <span className="text-label font-bold uppercase tracking-[0.12em] text-white/60">{c.displayName}</span>
          )}
          <span className="ml-auto flex items-center gap-1 rounded-full bg-black/35 px-2 py-1.5 backdrop-blur-sm">
            {c.marketplaces.slice(0, 6).map((code) => (
              <Flagge key={code} code={code} className="h-3.5 w-[1.2rem] text-white" />
            ))}
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-[1.7rem] font-extrabold leading-none tracking-tight" style={{ color: "#6EE7A0" }}>
              {c.preview.value}
            </span>
            <TrendPfeil runter={c.preview.trend === "down"} />
          </div>
          <div className="mt-1.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white/65">
            {c.preview.label}
          </div>
          <h3 className="mt-2.5 text-pretty text-[0.95rem] font-bold leading-snug text-white">{c.headline}</h3>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 rounded-[1.4rem] border-2 border-white/[0.12] transition-colors duration-500 ease-[cubic-bezier(0.22,0.61,0.24,1)] group-hover:border-[#FF9900]"
      />
    </a>
  );
}

/** Der kleine Trendpfeil in der Scheibe, wie im Band der Startseite. */
function TrendPfeil({ runter }: { runter: boolean }) {
  return (
    <span
      aria-hidden
      className="grid h-6 w-6 shrink-0 place-items-center rounded-[0.5rem]"
      style={{ background: "rgba(34,197,94,0.22)", color: "#6EE7A0" }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path
          d={runter ? "M18 6L6 18m0 0h7m-7 0v-7" : "M6 18L18 6m0 0h-7m7 0v7"}
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function OtherCases({ slug }: { slug: string }) {
  const others = cases.filter((c) => c.slug !== slug);
  /* Bei genau fuenf Faellen: drei schmale Karten oben, zwei breite darunter.
     Damit bleibt keine Luecke in der Reihe. Bei jeder anderen Anzahl laufen
     alle in der schmalen Form, drei je Zeile. */
  const zweiReihen = others.length === 5;

  return (
    <section className="on-dark ground-deep relative isolate overflow-hidden py-16 md:py-20">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px]" style={{ background: "#FF9900" }} />
      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Weitere Marken
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Andere Konten, dieselbe Arbeit.
              </h2>
            </div>
            <a href="/ergebnisse" className="btn-text-hell">
              Alle Case Studies
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>

        <RevealGroup className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6" stagger={0.06}>
          {others.map((c, i) => (
            <RevealItem key={c.slug} className={`h-full ${zweiReihen && i >= 3 ? "lg:col-span-3" : "lg:col-span-2"}`}>
              <AndererFall c={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
