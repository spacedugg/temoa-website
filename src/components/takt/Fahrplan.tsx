"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import clsx from "clsx";
import { Eyebrow, StationTitle } from "./Station";
import type { Woerterbuch } from "@/lib/woerter";

/**
 * Fahrplan. Die ersten 90 Tage nach dem Start.
 *
 * Steht auf der Buchungsseite unter dem Kalender und ueber den Kundenstimmen:
 * wer sich gerade einen Termin sucht, sieht direkt darunter, was danach
 * passiert. Auf der Startseite hat die Sektion nichts zu suchen, dort ist die
 * Reihenfolge des Kunden gesetzt.
 *
 * Die Grafik ist ein Kalender ueber 90 Tage, drei Monatsbloecke zu je 30
 * Feldern. Sie fuellt sich mit dem Scrollen: am Ende von Monat eins stehen 30
 * Felder, am Ende von Monat zwei 60, am Ende von Monat drei 90. Die Farbe sagt
 * die Phase: weiss Analyse, orange Umsetzung, gruen Skalierung. Damit stimmt
 * die Legende mit dem ueberein, was zu sehen ist. Die Vorfassung hatte eine
 * Legende (gesichtet, umgebaut, mit Budget), die im Bild nicht vorkam.
 *
 * Die Monate beginnen an verschiedenen Wochentagen, wie in einem echten
 * Kalender. Dadurch faengt kein Block oben links glatt an.
 *
 * Ab lg wird die Sektion angeheftet: der Block der aktiven Phase bleibt
 * stehen, bis sein Monat vollstaendig gefuellt ist, danach wechselt der Text.
 * Vorher lief der Text am Bild vorbei, und die Grafik hing der Aussage nach.
 *
 * Unter lg entfaellt die Grafik ganz. Ein Kalender aus 90 Feldern von 390
 * Pixeln Breite unter drei Textbloecken sagt nichts. Dort stehen die drei
 * Phasen offen untereinander. Dasselbe bei reduzierter Bewegung: dann wird
 * nichts angeheftet, alle Phasen stehen offen und der Kalender ist gefuellt.
 */

const EASE = [0.32, 0.72, 0, 1] as const;

const TAGE = 90;
const PRO_MONAT = 30;

type Farbe = "weiss" | "orange" | "gruen";

/* Farbe und Startwochentag der drei Monatsbloecke. Die Monate beginnen an
   verschiedenen Wochentagen wie in einem echten Kalender, dadurch faengt kein
   Block oben links glatt an. */
const monate: { farbe: Farbe; offset: number }[] = [
  { farbe: "weiss", offset: 3 },
  { farbe: "orange", offset: 5 },
  { farbe: "gruen", offset: 0 },
];

type W = Woerterbuch["buchung"]["fahrplan"];
type Phase = W["phasen"][number];


/* ------------------------------------------------------------------
   Kalender
   ------------------------------------------------------------------ */

const gefuelltKlasse: Record<Farbe, string> = {
  weiss: "bg-white",
  orange: "bg-brand-500",
  gruen: "",
};

/* Gruen kommt als Wert, nicht als Klasse: #6EE7A0 ist der Ton, den die Faelle
   fuer Ergebnisse auf dunklem Grund benutzen, und liegt nicht im Tailwind-Satz. */
const GRUEN = "#6EE7A0";

function Kalender({ tage, w }: { tage: number; w: W }) {
  return (
    <div className="w-[13rem]">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-label font-bold uppercase text-chalk-muted">{w.tage}</span>
        <span className="text-label font-bold tabular-nums text-white">
          {tage} / {TAGE}
        </span>
      </div>

      <div className="mt-3.5 space-y-3" aria-hidden>
        {monate.map((m, i) => {
          const erster = i * PRO_MONAT;
          return (
            <div key={w.monate[i]}>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: m.offset }, (_, k) => (
                  <span key={`leer-${k}`} className="aspect-square" />
                ))}
                {Array.from({ length: PRO_MONAT }, (_, k) => {
                  const tag = erster + k;
                  const voll = tag < tage;
                  return (
                    <span
                      key={tag}
                      style={voll && m.farbe === "gruen" ? { background: GRUEN } : undefined}
                      className={clsx(
                        "aspect-square rounded-[3px] transition-[background-color,box-shadow] duration-300",
                        voll
                          ? gefuelltKlasse[m.farbe]
                          : "bg-white/[0.045] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]"
                      )}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legende. Die drei Toene sind genau die drei Phasen links. */}
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 border-t border-white/[0.1] pt-3.5">
        {monate.map((m, i) => (
          <span key={w.monate[i]} className="flex items-center gap-2.5">
            <span
              aria-hidden
              style={m.farbe === "gruen" ? { background: GRUEN } : undefined}
              className={clsx("h-2 w-2 shrink-0 rounded-[2px]", gefuelltKlasse[m.farbe])}
            />
            <span className="text-label font-bold uppercase text-chalk-muted">{w.monate[i]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Phasenblock
   ------------------------------------------------------------------ */

function Phase({
  phase,
  n,
  offen,
  erreicht,
  reduce,
}: {
  phase: Phase;
  /* Die Ziffer der Schrittmarke folgt aus der Position, nicht aus den Daten:
     eine Uebersetzung soll keine Nummerierung mitschleppen. */
  n: number;
  offen: boolean;
  erreicht: boolean;
  reduce: boolean | null;
}) {
  return (
    <div className="relative pl-12 md:pl-14">
      <span
        aria-hidden
        className={clsx(
          "schritt absolute left-0 top-0 transition-shadow duration-500",
          erreicht ? "schritt-orange" : "bg-white/[0.08] text-chalk-faint"
        )}
      >
        {n}
      </span>

      <span
        className={clsx(
          "block text-label font-bold uppercase transition-colors duration-500",
          offen ? "text-brand-400" : "text-chalk-faint/70"
        )}
      >
        {phase.zeitraum}
      </span>

      <h3
        className={clsx(
          "title mt-1.5 text-[clamp(1.4rem,1.1rem+1.1vw,2rem)] transition-colors duration-500",
          offen ? "text-white" : "text-white/35"
        )}
      >
        {phase.titel}
      </h3>

      <motion.div
        initial={false}
        animate={{ height: offen ? "auto" : 0, opacity: offen ? 1 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="mt-3 max-w-[52ch] text-pretty text-body text-white">{phase.lead}</p>
        <ul className="mt-4 max-w-[54ch]">
          {phase.punkte.map((punkt) => (
            <li
              key={punkt}
              className="flex gap-3 border-t border-white/[0.1] py-2 text-small text-chalk-muted"
            >
              <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{punkt}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function Kopf({ w, klein = false }: { w: W; klein?: boolean }) {
  return (
    <>
      <Eyebrow label={w.eyebrow} dark />
      <StationTitle className={klein ? "!text-[clamp(1.6rem,1.2rem+1.2vw,2.4rem)]" : undefined}>
        {w.titelVor}
        <span className="em mark">{w.titelMark}</span>
      </StationTitle>
    </>
  );
}

function Fussnote({ w }: { w: W }) {
  return (
    <p className="text-small text-chalk-muted">
      <span className="font-bold text-brand-400">{w.fussVor}</span>
      {w.fussRest}
    </p>
  );
}

/* ------------------------------------------------------------------
   Sektion
   ------------------------------------------------------------------ */

/**
 * Angeheftete Fassung.
 *
 * Steht bewusst in einer eigenen Komponente. `useScroll` liest sein Ziel im
 * Layout-Effekt aus dem Ref; haengt der Aufruf in der Elternkomponente, ist
 * das Ziel beim ersten Rendern noch null, und die spaetere Montage des
 * angehefteten Blocks wird nicht mehr gemessen. Der Fortschritt bezog sich
 * dann auf das ganze Dokument: die Sektion begann bei 37 von 90 Tagen und
 * endete bei 57.
 */
function Bahn({ reduce, w }: { reduce: boolean | null; w: W }) {
  const bahnRef = useRef<HTMLDivElement>(null);
  const [tage, setTage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: bahnRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const naechste = Math.max(0, Math.min(TAGE, Math.round(v * TAGE)));
    setTage((vorher) => (vorher === naechste ? vorher : naechste));
  });

  // Der Text wechselt, sobald der naechste Monat anfaengt zu fuellen.
  const aktiv = tage <= PRO_MONAT ? 0 : tage <= 2 * PRO_MONAT ? 1 : 2;

  return (
    <div ref={bahnRef} className="relative h-[240vh]">
      {/* pt-24: die Kopfzeile liegt fest ueber der Seite. Ohne den Abstand
          schneidet sie die Ueberschrift des angehefteten Blocks ab. */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-24">
        <div className="container-x w-full">
          <Kopf w={w} klein />
          <div className="mt-7 grid items-start gap-12 lg:grid-cols-[1fr_13rem] xl:gap-16">
            <div className="space-y-6">
              {w.phasen.map((p, i) => (
                <Phase
                  key={p.titel}
                  phase={p}
                  n={i + 1}
                  offen={i === aktiv}
                  erreicht={i <= aktiv}
                  reduce={reduce}
                />
              ))}
            </div>
            <Kalender tage={tage} w={w} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Fahrplan({ w }: { w: W }) {
  const reduce = useReducedMotion();
  const [breit, setBreit] = useState(false);

  // Angeheftet wird erst ab lg. Der Startwert false heisst: die Fassung, die
  // ohne JavaScript und auf dem Telefon richtig ist, steht zuerst.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const lesen = () => setBreit(mq.matches);
    lesen();
    mq.addEventListener("change", lesen);
    return () => mq.removeEventListener("change", lesen);
  }, []);

  const angeheftet = breit && !reduce;

  return (
    <section id="fahrplan" className="on-dark ground-deep relative scroll-mt-24 text-chalk">
      {angeheftet ? (
        <>
          <Bahn reduce={reduce} w={w} />
          {/* Die Zeile steht hinter den 90 Tagen, nicht daneben. */}
          <div className="container-x pb-16">
            <div className="border-t border-white/[0.1] pt-6">
              <Fussnote w={w} />
            </div>
          </div>
        </>
      ) : (
        /* Ruhende Fassung: Telefon, kein JavaScript, reduzierte Bewegung */
        <div className="container-x py-14 md:py-24">
          <Kopf w={w} />
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1fr_13rem]">
            <div className="space-y-10">
              {w.phasen.map((p, i) => (
                <Phase key={p.titel} phase={p} n={i + 1} offen erreicht reduce={reduce} />
              ))}
            </div>
            {/* Auf dem Telefon entfaellt der Kalender ganz. */}
            <div className="hidden lg:block">
              <Kalender tage={TAGE} w={w} />
            </div>
          </div>
          <div className="mt-10 border-t border-white/[0.1] pt-6">
            <Fussnote w={w} />
          </div>
        </div>
      )}
    </section>
  );
}
