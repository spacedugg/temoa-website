"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import clsx from "clsx";
import { Station, StationTitle, StationLead } from "./Station";

/**
 * Station „Der Ablauf". Die ersten 90 Tage.
 *
 * Links laufen drei Phasen mit, rechts steht eine Tafel mit eurem Sortiment.
 * Beim Scrollen klappt jeweils die aktive Phase auf, die Tafel wechselt mit:
 * erst wird alles gesichtet, dann wird ein Teil umgebaut, dann bekommt ein
 * Teil davon Budget. Die Tafel bleibt bewusst unvollständig, weil in 90 Tagen
 * nicht das gesamte Sortiment umgebaut ist.
 *
 * Unter lg gibt es kein Mitlaufen: alle Phasen stehen offen untereinander,
 * die Tafel steht einmal im Endzustand darunter.
 */

const EASE = [0.32, 0.72, 0, 1] as const;

const phasen = [
  {
    n: "01",
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
    n: "02",
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
    n: "03",
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
   Tafel. 64 Felder als Sortiment, feste Reihenfolge statt Zufall,
   damit Server und Client dasselbe rendern.
   ------------------------------------------------------------------ */

const FELDER = 64;
const UMGEBAUT = 22;
const MIT_BUDGET = 9;

/**
 * 1 = gesichtet, 2 = umgebaut, 3 = mit Budget.
 * Die Felder füllen sich in Lesereihenfolge, damit eine wachsende Fläche
 * entsteht und kein Flimmern über die ganze Tafel.
 */
function zustand(feld: number, phase: number) {
  if (phase >= 2 && feld < MIT_BUDGET) return 3;
  if (phase >= 1 && feld < UMGEBAUT) return 2;
  return 1;
}

const feldFarben: Record<number, string> = {
  1: "bg-white/[0.06] ring-1 ring-inset ring-white/30",
  2: "bg-chalk ring-1 ring-inset ring-chalk",
  3: "bg-brand-500 ring-1 ring-inset ring-brand-500",
};

const legende = [
  { zustand: 1, text: "gesichtet" },
  { zustand: 2, text: "umgebaut" },
  { zustand: 3, text: "mit Budget" },
];

function Tafel({ phase }: { phase: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-inner bg-board p-5 ring-1 ring-board-rule md:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-label font-bold uppercase text-chalk-faint">Euer Sortiment</span>
        <span className="text-label font-bold uppercase text-brand-500">{phasen[phase].titel}</span>
      </div>

      <div className="mt-5 grid grid-cols-8 gap-1.5" aria-hidden>
        {Array.from({ length: FELDER }, (_, feld) => {
          const z = zustand(feld, phase);
          return (
            <motion.span
              key={feld}
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                opacity: { duration: 0.4, delay: (feld % 24) * 0.014, ease: EASE },
                scale: { duration: 0.4, delay: (feld % 24) * 0.014, ease: EASE },
                default: { duration: 0.45, ease: EASE },
              }}
              className={clsx("aspect-square rounded-[3px] transition-colors duration-500", feldFarben[z])}
            />
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-board-rule pt-4">
        {legende.map((l) => (
          <span key={l.text} className="flex items-center gap-2 text-label font-bold uppercase text-chalk-muted">
            <span className={clsx("h-2.5 w-2.5 rounded-[2px]", feldFarben[l.zustand])} />
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

export function Ablauf({ n = "07" }: { n?: string } = {}) {
  const reduce = useReducedMotion();
  const listeRef = useRef<HTMLDivElement>(null);
  const [aktiv, setAktiv] = useState(0);
  const [mitlaufend, setMitlaufend] = useState(false);

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
    <Station n={n} label="Der Ablauf" tone="dark" id="ablauf">
      <StationTitle>
        Die ersten <span className="em text-brand-400">90 Tage.</span>
      </StationTitle>
      <StationLead tone="dark">
        Ihr wisst vor der Unterschrift, was in Monat eins, zwei und drei passiert.
      </StationLead>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
        {/* Phasen. Unten Luft, damit die Tafel für die dritte Phase stehen bleibt. */}
        <div className="relative pl-10 md:pl-12 lg:pb-[16vh]">
          {/* Schiene, füllt sich mit dem Fortschritt */}
          <div
            aria-hidden
            className="absolute left-[13px] top-2 w-px bg-board-rule md:left-[15px] lg:bottom-[16vh] max-lg:bottom-2"
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
              return (
                <div
                  key={p.n}
                  className="relative lg:flex lg:min-h-[56vh] lg:flex-col lg:justify-center"
                >
                  <div className="relative">
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute -left-10 top-0 grid h-7 w-7 place-items-center rounded-[0.375rem] text-[0.7rem] font-bold tabular-nums transition-colors duration-500 md:-left-12",
                      i <= aktiv || !mitlaufend ? "bg-chalk text-ink" : "bg-board-raised text-chalk-faint"
                    )}
                  >
                    {p.n}
                  </span>

                  <span
                    className={clsx(
                      "block text-label font-bold uppercase transition-colors duration-500",
                      gedimmt ? "text-chalk-faint/70" : "text-chalk-faint"
                    )}
                  >
                    {p.zeitraum}
                  </span>

                  <h3
                    className={clsx(
                      "title mt-2 text-[clamp(1.6rem,1.1rem+1.4vw,2.25rem)] transition-colors duration-500",
                      gedimmt ? "text-chalk/35" : "text-chalk"
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
                    <p className="mt-4 max-w-[52ch] text-pretty text-body text-chalk">{p.lead}</p>
                    <ul className="mt-5 max-w-[52ch]">
                      {p.punkte.map((punkt) => (
                        <li
                          key={punkt}
                          className="flex gap-3 border-t border-board-rule py-3 text-small text-chalk-muted"
                        >
                          <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                          <span>{punkt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  </div>
                </div>
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

      {/* Tafel für schmale Bildschirme, einmal im Endzustand */}
      <div className="mt-10 lg:hidden">
        <Tafel phase={phasen.length - 1} />
      </div>

      {/* Was danach kommt */}
      <div className="mt-14 border-t border-board-rule pt-8 md:mt-16">
        <div className="grid gap-3 md:grid-cols-[10rem_1fr] md:gap-8">
          <span className="text-label font-bold uppercase text-brand-500">Ab Tag 91</span>
          <p className="max-w-[54ch] text-body text-chalk-muted">
            Monatlicher Report, Strategie- und Performance-Calls, danach im selben Takt weiter.
            Quartalsweise kündbar.
          </p>
        </div>
      </div>
    </Station>
  );
}
