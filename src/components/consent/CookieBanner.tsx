"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ALLES_AN, ALLES_AUS, KATEGORIEN, type Auswahl, type KategorieId } from "@/lib/consent";
import { OEFFNEN, useEinwilligung } from "./useEinwilligung";

/* ============================================================
   Der Hinweis zu Cookies und externen Diensten.

   Was diesen von den ueblichen Bannern unterscheidet:

   1. Es wird wirklich nichts geladen, bevor zugestimmt wurde. Der
      Terminkalender haengt an derselben Entscheidung (`ConsentGate`), es gibt
      keinen Dienst, der ohnehin schon laeuft.
   2. Ablehnen ist so leicht wie Zustimmen. Beide Knoepfe sind gleich gross,
      gleich fett und stehen nebeneinander. Ein grauer Textlink neben einem
      grossen gruenen Knopf waere keine freie Entscheidung.
   3. Kein Verdecken der Seite. Der Hinweis liegt unten und laesst alles
      erreichbar, auch Impressum und Datenschutz. Wer die Erklaerung lesen
      will, bevor er entscheidet, muss das koennen.
   4. Widerruf jederzeit: „Cookie-Einstellungen" in der Fusszeile macht diesen
      Dialog wieder auf.
   5. Die Entscheidung liegt im lokalen Speicher, nicht in einem Cookie, mit
      Zeitpunkt und Fassungsnummer. Aendern sich die Kategorien, wird die
      Nummer erhoeht und neu gefragt.

   Kein Rechtsrat: die Texte sind nach unserem Verstaendnis gebaut, die
   juristische Pruefung liegt beim Kunden.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

function Schalter({
  an,
  aus,
  beschriftung,
  onChange,
}: {
  an: boolean;
  aus?: boolean;
  beschriftung: string;
  onChange?: (wert: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={an}
      aria-label={beschriftung}
      disabled={aus}
      onClick={() => onChange?.(!an)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-300 ${
        aus ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${an ? "bg-navy" : "bg-ink/20"}`}
    >
      <span
        className={`absolute h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          an ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function CookieBanner() {
  const { bereit, entschieden, daten, speichern } = useEinwilligung();
  const reduce = useReducedMotion();

  const [offen, setOffen] = useState(false);
  const [details, setDetails] = useState(false);
  const [entwurf, setEntwurf] = useState<Auswahl>(ALLES_AUS);
  const ersterKnopf = useRef<HTMLButtonElement>(null);

  /* Beim ersten Aufruf ohne Entscheidung von allein aufmachen. */
  useEffect(() => {
    if (bereit && !entschieden) setOffen(true);
  }, [bereit, entschieden]);

  /* Aus der Fusszeile wieder aufmachen, mit dem gespeicherten Stand. */
  useEffect(() => {
    const auf = () => {
      setEntwurf(daten?.auswahl ?? ALLES_AUS);
      setDetails(true);
      setOffen(true);
    };
    window.addEventListener(OEFFNEN, auf);
    return () => window.removeEventListener(OEFFNEN, auf);
  }, [daten]);

  useEffect(() => {
    if (offen && details) ersterKnopf.current?.focus();
  }, [offen, details]);

  const schliessen = useCallback(
    (auswahl: Auswahl) => {
      speichern(auswahl);
      setOffen(false);
      setDetails(false);
    },
    [speichern],
  );

  /* Escape geht von den Einstellungen zurueck. Der Hinweis selbst laesst sich
     nicht per Escape wegdruecken: Wegdruecken ist keine Entscheidung, und
     stillschweigendes Ablehnen waere genauso falsch wie stillschweigendes
     Zustimmen. */
  useEffect(() => {
    if (!offen) return;
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape" && details) setDetails(false);
    };
    window.addEventListener("keydown", taste);
    return () => window.removeEventListener("keydown", taste);
  }, [offen, details]);

  if (!bereit) return null;

  return (
    <AnimatePresence>
      {offen && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-titel"
          /* `pointer-events-none` an der Huelle, `pointer-events-auto` an der
             Karte: die Huelle liegt ueber die volle Breite, und ohne das
             fingen die leeren Streifen links und rechts der Karte alle Klicks
             ab. Alles, was dort unten auf der Seite liegt, war nicht mehr
             anklickbar, ohne dass man den Grund gesehen haette. */
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-4 sm:pb-4"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
        >
          <div className="panel pointer-events-auto mx-auto max-h-[85vh] w-full max-w-[46rem] overflow-y-auto p-5 sm:p-7">
            <h2 id="cookie-titel" className="text-[1.15rem] font-bold leading-snug text-ink sm:text-[1.3rem]">
              {details ? "Was ihr zulassen wollt" : "Kurz zu Cookies"}
            </h2>

            {!details && (
              <p className="mt-2.5 text-small leading-relaxed text-ink-muted">
                Diese Website braucht für sich selbst keine Cookies. Für das Erstgespräch liegt der
                Terminkalender bei einem externen Dienst. Der wird erst geladen, wenn ihr zustimmt.
                Details stehen in den{" "}
                <button
                  type="button"
                  onClick={() => {
                    setEntwurf(daten?.auswahl ?? ALLES_AUS);
                    setDetails(true);
                  }}
                  className="font-bold text-navy underline decoration-brand-500 decoration-2 underline-offset-2"
                >
                  Einstellungen
                </button>{" "}
                und in der{" "}
                <a
                  href="/datenschutz"
                  className="font-bold text-navy underline decoration-brand-500 decoration-2 underline-offset-2"
                >
                  Datenschutzerklärung
                </a>
                .
              </p>
            )}

            {details && (
              <div className="mt-5 space-y-3">
                {KATEGORIEN.map((k) => {
                  const an = k.pflicht ? true : entwurf[k.id];
                  return (
                    <div
                      key={k.id}
                      className="rounded-[1.1rem] bg-canvas-tint p-4 shadow-[inset_0_0_0_1px_rgba(13,36,57,0.07)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[0.98rem] font-bold leading-snug text-ink">
                            {k.name}
                            {k.pflicht && (
                              <span className="ml-2 align-middle text-[0.7rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
                                immer aktiv
                              </span>
                            )}
                          </p>
                          <p className="mt-1.5 text-small leading-relaxed text-ink-muted">{k.beschreibung}</p>
                          <ul className="mt-2.5 space-y-1">
                            {k.dienste.map((d) => (
                              <li key={d.name} className="text-[0.78rem] leading-snug text-ink-faint">
                                <span className="font-bold text-ink-soft">{d.name}</span> · {d.zweck}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Schalter
                          an={an}
                          aus={k.pflicht}
                          beschriftung={`${k.name} zulassen`}
                          onChange={(wert) =>
                            setEntwurf((v) => ({ ...v, [k.id as KategorieId]: wert }))
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Die Knoepfe. Gleiche Groesse, gleiche Schriftstaerke: Ablehnen
                darf nicht schwerer sein als Zustimmen. */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                ref={ersterKnopf}
                type="button"
                onClick={() => schliessen(ALLES_AN)}
                className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-[0.875rem] bg-navy px-5 text-small font-bold text-white transition-colors duration-300 hover:bg-[#123553]"
              >
                Alle akzeptieren
              </button>
              <button
                type="button"
                onClick={() => schliessen(details ? { ...entwurf, notwendig: true } : ALLES_AUS)}
                className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-[0.875rem] border-2 border-navy/25 bg-white px-5 text-small font-bold text-navy transition-colors duration-300 hover:border-navy/50"
              >
                {details ? "Auswahl speichern" : "Nur Notwendige"}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[0.78rem] text-ink-faint">
              {!details && (
                <button
                  type="button"
                  onClick={() => {
                    setEntwurf(daten?.auswahl ?? ALLES_AUS);
                    setDetails(true);
                  }}
                  className="font-bold text-ink-soft underline decoration-ink/20 underline-offset-2 hover:decoration-ink/50"
                >
                  Einstellungen
                </button>
              )}
              {details && (
                <button
                  type="button"
                  onClick={() => setDetails(false)}
                  className="font-bold text-ink-soft underline decoration-ink/20 underline-offset-2 hover:decoration-ink/50"
                >
                  Zurück
                </button>
              )}
              <a href="/datenschutz" className="underline decoration-ink/20 underline-offset-2 hover:decoration-ink/50">
                Datenschutz
              </a>
              <a href="/impressum" className="underline decoration-ink/20 underline-offset-2 hover:decoration-ink/50">
                Impressum
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
