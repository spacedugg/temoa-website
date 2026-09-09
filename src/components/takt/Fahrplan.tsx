"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import clsx from "clsx";
import { Eyebrow, StationTitle } from "./Station";

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

const monate: { titel: string; farbe: Farbe; offset: number }[] = [
  { titel: "Analyse", farbe: "weiss", offset: 3 },
  { titel: "Umsetzung", farbe: "orange", offset: 5 },
  { titel: "Skalierung", farbe: "gruen", offset: 0 },
];

const phasen = [
  {
    n: "1",
    zeitraum: "Tag 1 bis 30",
    titel: "Analyse",
    lead: "Der erste Monat gehört der Analyse. Am Tag eins beginnt die Strategie.",
    punkte: [
      "Der gesamte Account wird gesichtet: Katalog, ASINs, Kampagnen- und Gebotsstrukturen",
      "PPC-Berichte, Verkäufe, Traffic und der Search Query Report werden ausgewertet",
      "Inventar und Konto-Gesundheit geprüft, offensichtlich verlorenes Werbebudget gestoppt",
      "Zum Monatsende steht die Übersicht: Produkte, Margen, was funktioniert und was nicht",
    ],
  },
  {
    n: "2",
    zeitraum: "Tag 31 bis 60",
    titel: "Umsetzung",
    lead: "Jetzt wird gebaut, auf der Grundlage aus Monat eins.",
    punkte: [
      "Hauptbild, Listingbilder, Titel, Bullets, Backend-Felder und A+ Content neu",
      "Listings auf Suche, Klickrate und Conversion ausgerichtet, lesbar für Rufus, COSMO und A10",
      "Kampagnenstrukturen neu aufgebaut, gesteuert über ACoS und TACoS",
      "Inventar bleibt im Blick, neue Produkte werden eingeplant, wenn sie anstehen",
    ],
  },
  {
    n: "3",
    zeitraum: "Tag 61 bis 90",
    titel: "Skalierung",
    lead: "Was gewinnt, bekommt mehr.",
    punkte: [
      "Budget geht auf die Kampagnen und Suchbegriffe, die konvertieren",
      "Content-Tests: A+ Module und Hauptbilder werden nachgezogen",
      "Zum Quartalsende die Roadmap fürs nächste Quartal, sortiert nach den größten Chancen",
    ],
  },
];

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

function Kalender({ tage }: { tage: number }) {
  return (
    <div className="w-[13rem]">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-label font-bold uppercase text-chalk-muted">90 Tage</span>
        <span className="text-label font-bold tabular-nums text-white">
          {tage} / {TAGE}
        </span>
      </div>

      <div className="mt-3.5 space-y-3" aria-hidden>
        {monate.map((m, i) => {
          const erster = i * PRO_MONAT;
          return (
            <div key={m.titel}>
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
        {monate.map((m) => (
          <span key={m.titel} className="flex items-center gap-2.5">
            <span
              aria-hidden
              style={m.farbe === "gruen" ? { background: GRUEN } : undefined}
              className={clsx("h-2 w-2 shrink-0 rounded-[2px]", gefuelltKlasse[m.farbe])}
            />
            <span className="text-label font-bold uppercase text-chalk-muted">{m.titel}</span>
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
  offen,
  erreicht,
  reduce,
}: {
  phase: (typeof phasen)[number];
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
        {phase.n}
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

function Kopf({ klein = false }: { klein?: boolean } = {}) {
  return (
    <>
      <Eyebrow label="Fahrplan" dark />
      <StationTitle className={klein ? "!text-[clamp(1.6rem,1.2rem+1.2vw,2.4rem)]" : undefined}>
        Die ersten <span className="em mark">90 Tage.</span>
      </StationTitle>
    </>
  );
}

function Fussnote() {
  return (
    <p className="text-small text-chalk-muted">
      <span className="font-bold text-brand-400">Ab Tag 91</span> läuft die Betreuung weiter:
      monatlicher Report, Strategie- und Performance-Calls.
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
function Bahn({ reduce }: { reduce: boolean | null }) {
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
          <Kopf klein />
          <div className="mt-7 grid items-start gap-12 lg:grid-cols-[1fr_13rem] xl:gap-16">
            <div className="space-y-6">
              {phasen.map((p, i) => (
                <Phase key={p.n} phase={p} offen={i === aktiv} erreicht={i <= aktiv} reduce={reduce} />
              ))}
            </div>
            <Kalender tage={tage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Fahrplan() {
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
          <Bahn reduce={reduce} />
          {/* Die Zeile steht hinter den 90 Tagen, nicht daneben. */}
          <div className="container-x pb-16">
            <div className="border-t border-white/[0.1] pt-6">
              <Fussnote />
            </div>
          </div>
        </>
      ) : (
        /* Ruhende Fassung: Telefon, kein JavaScript, reduzierte Bewegung */
        <div className="container-x py-14 md:py-24">
          <Kopf />
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1fr_13rem]">
            <div className="space-y-10">
              {phasen.map((p) => (
                <Phase key={p.n} phase={p} offen erreicht reduce={reduce} />
              ))}
            </div>
            {/* Auf dem Telefon entfaellt der Kalender ganz. */}
            <div className="hidden lg:block">
              <Kalender tage={TAGE} />
            </div>
          </div>
          <div className="mt-10 border-t border-white/[0.1] pt-6">
            <Fussnote />
          </div>
        </div>
      )}
    </section>
  );
}
