"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Station, StationTitle } from "../takt/Station";
import { Gespraech } from "../takt/Gespraech";
import { gruender, members, candids, candidsWeiter, imHaus, type Person } from "@/lib/team";

/* ============================================================
   Die Team-Seite.

   Zwei Fassungen liegen dahinter. Die erste hatte drei Sektionen mit je einer
   eigenen Ansage: „Die drei, mit denen ihr sprecht", „Neun, die taeglich an
   euren Konten arbeiten", „Fuenf Bereiche, ein Konto". Der Kunde hat das
   verworfen, und zu Recht: an einem Konto sitzt niemand, die Gruender arbeiten
   genauso daran, und die dritte Sektion sagte dasselbe wie die Startseite.

   Jetzt eine Aufstellung: alle zwoelf in einem Raster, die Gruender zuerst und
   groesser, jede Person mit einer eigenen Farbe. Die Farben kommen bewusst
   nicht aus dem Logo. Sie sollen die Seite auflockern, nicht die Marke
   wiederholen.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Eine Farbe je Person, in der Reihenfolge der Aufstellung. Keine
   Markenfarbe, keine Wiederholung. */
const FARBEN = [
  "#2AA79B",
  "#6C7BE0",
  "#E4715F",
  "#3C8DDE",
  "#43BE8E",
  "#D9749F",
  "#8C6BD8",
  "#C79A2E",
  "#4FB3C9",
  "#5AA65E",
  "#DC6A8C",
  "#4E8FB8",
];

function Karte({ p, farbe, gross = false }: { p: Person; farbe: string; gross?: boolean }) {
  return (
    <div className={`panel panel-lift relative overflow-hidden ${gross ? "p-6 md:p-7" : "p-4"}`}>
      {/* Die Farbe liegt als weiche Flaeche hinter dem Portrait, nicht auf
          dem Gesicht. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-[26px]"
        style={{ background: farbe, opacity: 0.28 }}
      />
      <div className="relative">
        <span
          className="block overflow-hidden rounded-[1rem]"
          style={{ boxShadow: `inset 0 0 0 2px ${farbe}` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt={p.name}
            loading="lazy"
            className={`w-full object-cover ${gross ? "aspect-[4/5]" : "aspect-square"}`}
          />
        </span>
        <p className={`mt-4 font-bold leading-tight text-ink ${gross ? "text-[1.3rem]" : "text-[0.95rem]"}`}>
          {p.name}
        </p>
        <p
          className={`mt-1 leading-snug ${gross ? "text-small" : "text-[0.75rem]"}`}
          style={{ color: farbe }}
        >
          {p.rolle}
        </p>
      </div>
    </div>
  );
}

export function TeamBody() {
  const reduce = useReducedMotion();
  const auf = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
  });


  return (
    <>
      {/* Kopf: links die Ansage, rechts das Bild der drei Gruender. */}
      <section className="ground relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <span aria-hidden className="halo pointer-events-none -right-32 -top-40 h-[38rem] w-[38rem]" />
        <div className="container-x relative">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_20px_-14px_rgba(13,36,57,0.3)]">
                <span aria-hidden className="node-glow" />
                <span className="text-label font-bold uppercase text-ink-soft">Team</span>
              </span>
              <h1 className="display mt-6 max-w-[14ch] text-balance text-[clamp(2.2rem,1.5rem+2.3vw,3.3rem)] text-ink">
                Das ist <span className="em mark">temoa.</span>
              </h1>
              <p className="mt-7 max-w-[46ch] text-pretty text-lead text-ink-muted">
                Drei Gründer und neun Kolleginnen und Kollegen. Jeder hat einen Bereich, und an jedem
                Sortiment arbeiten mehrere gleichzeitig.
              </p>
            </div>

            <motion.div
              {...auf(0.1)}
              className="overflow-hidden rounded-[1.5rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_34px_60px_-32px_rgba(13,36,57,0.45)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={candids[0]} alt="Die Gründer von temoa" className="aspect-[16/10] w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alle zwoelf in einer Aufstellung. Die Gruender stehen vorn und
          groesser, weil sie die Ansprechpartner sind, aber nicht in einer
          eigenen Sektion mit eigener Ansage. */}
      <Station label="Namen und Rollen" tone="tint">
        <StationTitle>Zwölf, aufgeteilt nach Bereichen.</StationTitle>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gruender.map((g, i) => (
            <motion.div key={g.name} {...auf(i * 0.06)} className="h-full">
              <Karte p={g} farbe={FARBEN[i]} gross />
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {members.map((m, i) => (
            <motion.div key={m.name} {...auf(0.03 + i * 0.03)} className="h-full">
              <Karte p={m} farbe={FARBEN[(i + gruender.length) % FARBEN.length]} />
            </motion.div>
          ))}
        </div>

        {/* Ein schmales Band statt einer eigenen Sektion: die Bereiche, mehr
            nicht. Die Begruendung dazu steht auf der Startseite. */}
        <motion.div
          {...auf(0.1)}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 rounded-[1.25rem] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(13,36,57,0.05),0_18px_34px_-22px_rgba(13,36,57,0.3)]"
        >
          <span className="text-label font-bold uppercase text-ink-soft">Bereiche im Haus</span>
          {imHaus.map((b) => (
            <span key={b} className="rounded-full bg-canvas-tint px-3 py-1.5 text-[0.75rem] font-bold text-ink">
              {b}
            </span>
          ))}
        </motion.div>
      </Station>

      {/* Aufnahmen aus dem Haus, mit der Grafik dazwischen */}
      <Station label="Bei uns" tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
          <div className="grid grid-cols-2 gap-4">
            {[...candids.slice(1), ...candidsWeiter].map((src, i) => (
              <motion.div
                key={src}
                {...auf(i * 0.06)}
                className="overflow-hidden rounded-[1.25rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_20px_38px_-22px_rgba(13,36,57,0.34)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </motion.div>
            ))}
          </div>

          <motion.div {...auf(0.1)} className="relative min-w-0">
            <span aria-hidden className="halo left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bilder/n-haus.webp"
              alt="Ein offener Kasten mit fünf Fächern, in jedem ein Werkzeug, alle mit einer Mitte verbunden."
              width={1536}
              height={1152}
              loading="lazy"
              className="relative mx-auto w-full max-w-[26rem]"
            />
          </motion.div>
        </div>
      </Station>

      <Gespraech title="Lernt uns im Gespräch kennen." />
    </>
  );
}
