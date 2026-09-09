"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import clsx from "clsx";
import { Station, StationTitle, StationLead } from "./Station";

/**
 * Der Ablauf. Die ersten 90 Tage.
 *
 * Zwischen den Stimmen und dem Termin fehlte die Antwort auf die Frage, was
 * nach der Unterschrift passiert. Die Startseite ging von „das koennen wir"
 * direkt auf „buch einen Termin".
 *
 * Links laufen drei Phasen mit, rechts steht eine Tafel mit dem Sortiment.
 * Beim Scrollen klappt die aktive Phase auf, die Tafel wechselt mit: erst ist
 * alles gesichtet, dann ist ein Teil umgebaut, dann traegt ein Teil davon
 * Budget. Orange sitzt immer innerhalb der weissen Flaeche. Das ist die
 * Aussage von Organic First ohne ein weiteres Wort: Budget geht nur auf das,
 * was vorher umgebaut wurde.
 *
 * Die Tafel fuellt sich nie ganz. In 90 Tagen ist nicht das gesamte Sortiment
 * ueberarbeitet, und die Copy sagt genau das. Die leeren Felder tragen
 * ausserdem die Zeile zu Tag 91.
 *
 * Unter lg gibt es kein Mitlaufen: alle Phasen stehen offen untereinander,
 * die Tafel steht einmal im Endzustand darunter.
 */

const EASE = [0.32, 0.72, 0, 1] as const;

const phasen = [
  {
    n: "1",
    zeitraum: "Tag 1 bis 30",
    titel: "Analyse und Strategie",
    lead: "Ab Tag eins arbeiten vier Bereiche an eurem Sortiment: Strategie, Content, Advertising und Account-Management.",
    punkte: [
      "Search Query Bericht, Verkäufe und Traffic je ASIN, Kampagnenstruktur und Marge je Variante gelesen",
      "Unterdrückte Angebote, verlorene Buy-Box und Kampagnen, die gegeneinander bieten, sofort behoben",
      "Eure Werbung läuft in dieser Zeit weiter",
      "Zum Monatsende ein priorisierter Maßnahmenplan mit Zielwerten für ACoS und TACoS",
    ],
  },
  {
    n: "2",
    zeitraum: "Tag 31 bis 60",
    titel: "Umsetzung",
    lead: "Die umsatzstärksten ASINs kommen zuerst dran.",
    punkte: [
      "Hauptbild, Listingbilder, Titel, Bullets, Backend-Felder und A+ Content neu erstellt",
      "Grundlage: Suchbegriffe aus den Berichten, der Wettbewerb und eure Bewertungen",
      "Neue Kampagnenstruktur, Gebote und Platzierungen auf die Zielwerte gesteuert",
      "Forecast und Bestand an der realen Nachfrage kalibriert",
    ],
  },
  {
    n: "3",
    zeitraum: "Tag 61 bis 90",
    titel: "Skalierung",
    lead: "Budget geht dorthin, wo Klickrate und Conversion stimmen.",
    punkte: [
      "Brand Store und Brand Story kommen dazu",
      "Die nächsten ASINs ziehen nach",
      "Zum Quartalsende das erste Review: was gewirkt hat, was ansteht und ob sich ein weiterer Marktplatz rechnet",
    ],
  },
];

/* ------------------------------------------------------------------
   Tafel. 64 Felder als Sortiment. Feste Reihenfolge statt Zufall, damit
   Server und Client dasselbe rendern, und in Lesereihenfolge, damit eine
   wachsende Flaeche entsteht und kein Flimmern ueber die ganze Tafel.
   ------------------------------------------------------------------ */

const FELDER = 64;
const UMGEBAUT = 22;
const MIT_BUDGET = 9;

/** 1 = gesichtet, 2 = umgebaut, 3 = mit Budget. */
function zustand(feld: number, phase: number) {
  if (phase >= 2 && feld < MIT_BUDGET) return 3;
  if (phase >= 1 && feld < UMGEBAUT) return 2;
  return 1;
}

const feldFarben: Record<number, string> = {
  1: "bg-white/[0.05] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)]",
  2: "bg-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.9)]",
  3: "bg-brand-500 shadow-[inset_0_0_0_1px_rgba(255,153,0,0.9),0_0_12px_-2px_rgba(255,153,0,0.9)]",
};

const legende = [
  { zustand: 1, text: "gesichtet" },
  { zustand: 2, text: "umgebaut" },
  { zustand: 3, text: "mit Budget" },
];

function Tafel({ phase }: { phase: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_0_1px_rgba(255,255,255,0.07)] md:p-6">
      <span aria-hidden className="halo -right-20 -top-24 h-[20rem] w-[20rem] opacity-50" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2.5">
          <span aria-hidden className="node-glow" />
          <span className="text-label font-bold uppercase text-chalk-muted">Euer Sortiment</span>
        </span>
        <span className="text-label font-bold uppercase text-brand-400">{phasen[phase].titel}</span>
      </div>

      <div className="relative mt-5 grid grid-cols-8 gap-1.5" aria-hidden>
        {Array.from({ length: FELDER }, (_, feld) => (
          <motion.span
            key={feld}
            /* `whileInView` bleibt immer gesetzt, nur der Startwert wechselt.
               `useReducedMotion` ist beim ersten Rendern false: framer-motion
               setzt die Deckkraft auf 0, danach wird der Wert wahr, und mit
               einem `undefined` an dieser Stelle fielen die Angaben weg. Die
               64 Felder blieben dann unsichtbar stehen, die Tafel waere leer. */
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.4, delay: (feld % 24) * 0.014, ease: EASE },
                    scale: { duration: 0.4, delay: (feld % 24) * 0.014, ease: EASE },
                    default: { duration: 0.45, ease: EASE },
                  }
            }
            className={clsx(
              "aspect-square rounded-[4px] transition-[background-color,box-shadow] duration-500",
              feldFarben[zustand(feld, phase)]
            )}
          />
        ))}
      </div>

      <div className="relative mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.09] pt-4">
        {legende.map((l) => (
          <span key={l.text} className="flex items-center gap-2 text-label font-bold uppercase text-chalk-muted">
            <span aria-hidden className={clsx("h-2.5 w-2.5 rounded-[3px]", feldFarben[l.zustand])} />
            {l.text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Station
   ------------------------------------------------------------------ */

export function Ablauf() {
  const reduce = useReducedMotion();
  const listeRef = useRef<HTMLDivElement>(null);
  const [aktiv, setAktiv] = useState(0);
  const [mitlaufend, setMitlaufend] = useState(false);

  const auf = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-12% 0px" } as const,
    transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
  });

  // Das Mitlaufen gibt es erst ab lg, darunter steht alles offen untereinander.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const lesen = () => setMitlaufend(mq.matches);
    lesen();
    mq.addEventListener("change", lesen);
    return () => mq.removeEventListener("change", lesen);
  }, []);

  const { scrollYProgress } = useScroll({
    target: listeRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.floor(v * phasen.length);
    setAktiv(Math.min(phasen.length - 1, Math.max(0, i)));
  });

  return (
    <Station label="Ablauf" tone="dark" id="ablauf">
      <StationTitle>
        Die ersten <span className="em mark">90 Tage.</span>
      </StationTitle>
      <StationLead tone="dark">
        Ihr wisst vor der Unterschrift, was in Monat eins, zwei und drei passiert.
      </StationLead>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
        {/* Phasen. Unten Luft, damit die Tafel fuer die dritte Phase stehen bleibt. */}
        <div className="relative pl-12 md:pl-14 lg:pb-[16vh]">
          {/* Schiene, fuellt sich mit dem Fortschritt */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[17px] top-3 w-px bg-white/[0.12] md:left-[19px] lg:bottom-[16vh]"
          >
            <motion.div
              className="w-px origin-top bg-brand-500"
              style={reduce ? { height: "100%" } : { scaleY: scrollYProgress, height: "100%" }}
            />
          </div>

          <div ref={listeRef} className="space-y-12 md:space-y-14 lg:space-y-0">
            {phasen.map((p, i) => {
              const offen = !mitlaufend || i === aktiv;
              const gedimmt = mitlaufend && i !== aktiv;
              const erreicht = !mitlaufend || i <= aktiv;
              return (
                <motion.div
                  key={p.n}
                  {...(i === 0 ? auf(0.05) : {})}
                  className="relative lg:flex lg:min-h-[56vh] lg:flex-col lg:justify-center"
                >
                  <div className="relative">
                    <span
                      aria-hidden
                      className={clsx(
                        "schritt absolute -left-12 top-0 transition-shadow duration-500 md:-left-14",
                        erreicht ? "schritt-orange" : "bg-white/[0.08] text-chalk-faint"
                      )}
                    >
                      {p.n}
                    </span>

                    <span
                      className={clsx(
                        "block text-label font-bold uppercase transition-colors duration-500",
                        gedimmt ? "text-chalk-faint/70" : "text-brand-400"
                      )}
                    >
                      {p.zeitraum}
                    </span>

                    <h3
                      className={clsx(
                        "title mt-2 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] transition-colors duration-500",
                        gedimmt ? "text-white/35" : "text-white"
                      )}
                    >
                      {p.titel}
                    </h3>

                    <motion.div
                      initial={false}
                      animate={{ height: offen ? "auto" : 0, opacity: offen ? 1 : 0 }}
                      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 max-w-[52ch] text-pretty text-body text-white">{p.lead}</p>
                      <ul className="mt-5 max-w-[52ch]">
                        {p.punkte.map((punkt) => (
                          <li
                            key={punkt}
                            className="flex gap-3 border-t border-white/[0.09] py-3 text-small text-chalk-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                            />
                            <span>{punkt}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tafel, ab lg mitlaufend */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <Tafel phase={aktiv} />
          </div>
        </div>
      </div>

      {/* Tafel fuer schmale Bildschirme, einmal im Endzustand */}
      <div className="mt-10 lg:hidden">
        <Tafel phase={phasen.length - 1} />
      </div>

      {/* Was danach kommt. Bei den Vorbildern hoert es bei Tag 90 auf, was
          suggeriert, das Projekt sei dann fertig. Hier ist es eine laufende
          Betreuung, und die Kuendbarkeit steht besser hier als im CTA. */}
      <motion.div
        {...auf(0.08)}
        className="mt-12 border-t border-white/[0.09] pt-8 md:mt-14"
      >
        <div className="grid gap-3 md:grid-cols-[11rem_1fr] md:gap-8">
          <span className="inline-flex items-center gap-2.5">
            <span aria-hidden className="node-glow" />
            <span className="text-label font-bold uppercase text-brand-400">Ab Tag 91</span>
          </span>
          <p className="max-w-[54ch] text-body text-chalk-muted">
            Monatlicher Report, Strategie- und Performance-Calls, danach im selben Takt weiter.
            Quartalsweise kündbar.
          </p>
        </div>
      </motion.div>
    </Station>
  );
}
