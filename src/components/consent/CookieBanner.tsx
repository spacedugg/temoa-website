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
   2. Drei Wege, gleich schwer: „Nur notwendige", „Anpassen", „Alle
      akzeptieren". Die beiden Entscheidungen tragen dieselbe Flaeche, dieselbe
      Groesse und dieselbe Schriftstaerke. Ein grauer Textlink neben einem
      grossen gruenen Knopf waere keine freie Entscheidung.
   3. Die Karte liegt auf dunklem Grund, dahinter verdunkelt ein Schleier die
      Seite. Vorher war Karte und Seite beides weiss, damit war der Hinweis
      kaum als eigene Ebene zu erkennen. Der Schleier laesst sich nicht
      wegklicken: Wegdruecken ist keine Entscheidung.
   4. Impressum und Datenschutz stehen in der Karte selbst, sie bleiben also
      erreichbar, auch wenn der Rest der Seite hinter dem Schleier liegt.
   5. Widerruf jederzeit: „Cookie-Einstellungen" in der Fusszeile macht diesen
      Dialog wieder auf.
   6. Die Entscheidung liegt im lokalen Speicher, nicht in einem Cookie, mit
      Zeitpunkt und Fassungsnummer. Aendern sich die Kategorien, wird die
      Nummer erhoeht und neu gefragt.

   Kein Rechtsrat: die Texte sind nach unserem Verstaendnis gebaut, die
   juristische Pruefung liegt beim Kunden.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Zwei gleichwertige Knoepfe fuer die beiden Entscheidungen: weisse Flaeche,
   Navy-Schrift. Der dritte Weg („Anpassen") ist keine Entscheidung, sondern
   ein Wechsel der Ansicht, und traegt deshalb nur eine Kante. */
const KNOPF_BASIS =
  "inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-[0.875rem] px-4 text-small font-bold transition-colors duration-300";
const KNOPF_VOLL = `${KNOPF_BASIS} bg-white text-navy hover:bg-chalk`;
const KNOPF_KANTE = `${KNOPF_BASIS} border-2 border-white/35 text-white hover:border-white/70 hover:bg-white/5`;

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
      } ${an ? "bg-brand-500" : "bg-white/20"}`}
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

  /* Solange der Hinweis steht, scrollt die Seite dahinter nicht weg.

     Nur die senkrechte Achse: `overflow` als Ganzes wuerde das
     `overflow-x: clip` aus dem Stylesheet ueberschreiben, und `overflow:
     hidden` am Body macht aus ihm einen Scroll-Container, in dem kein
     `position: sticky` mehr haelt. */
  useEffect(() => {
    if (!offen) return;
    const vorher = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = vorher;
    };
  }, [offen]);

  if (!bereit) return null;

  const einstellungenAuf = () => {
    setEntwurf(daten?.auswahl ?? ALLES_AUS);
    setDetails(true);
  };

  return (
    <AnimatePresence>
      {offen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center px-3 pb-3 sm:px-4 sm:pb-4">
          {/* Der Schleier. Kein Klickziel: nur eine der drei Knoepfe beendet
              den Hinweis. */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-navy-deep/55 backdrop-blur-[3px]"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-titel"
            className="relative w-full max-w-[46rem] overflow-hidden rounded-[1.5rem]"
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
          >
            <div
              className="max-h-[85vh] overflow-y-auto rounded-[1.5rem] p-5 shadow-[0_28px_70px_-24px_rgba(2,28,43,0.75)] sm:p-7"
              style={{ background: "linear-gradient(150deg, #0B4D6B 0%, #023047 46%, #021C2B 100%)" }}
            >
              <h2
                id="cookie-titel"
                className="text-[1.15rem] font-bold leading-snug text-white sm:text-[1.3rem]"
              >
                {details ? "Was ihr zulassen wollt" : "Kurz zu Cookies"}
              </h2>

              {!details && (
                <p className="mt-2.5 text-small leading-relaxed text-chalk-muted">
                  Diese Website braucht für sich selbst keine Cookies. Für das Erstgespräch liegt der
                  Terminkalender bei einem externen Dienst. Der wird erst geladen, wenn ihr zustimmt.
                  Was dabei passiert, steht in der{" "}
                  <a
                    href="/datenschutz"
                    className="font-bold text-white underline decoration-brand-500 decoration-2 underline-offset-2"
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
                        className="rounded-[1.1rem] bg-white/[0.06] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-[0.98rem] font-bold leading-snug text-white">
                              {k.name}
                              {k.pflicht && (
                                <span className="ml-2 align-middle text-[0.7rem] font-bold uppercase tracking-[0.1em] text-chalk-faint">
                                  immer aktiv
                                </span>
                              )}
                            </p>
                            <p className="mt-1.5 text-small leading-relaxed text-chalk-muted">
                              {k.beschreibung}
                            </p>
                            <ul className="mt-2.5 space-y-1">
                              {k.dienste.map((d) => (
                                <li key={d.name} className="text-[0.78rem] leading-snug text-chalk-faint">
                                  <span className="font-bold text-chalk">{d.name}</span> · {d.zweck}
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

              {/* Die Knoepfe. In der kurzen Ansicht drei Wege: ablehnen,
                  anpassen, zustimmen. In den Einstellungen zwei: die eigene
                  Auswahl speichern oder doch alles zulassen. */}
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                {!details && (
                  <>
                    <button
                      ref={ersterKnopf}
                      type="button"
                      onClick={() => schliessen(ALLES_AUS)}
                      className={KNOPF_VOLL}
                    >
                      Nur notwendige
                    </button>
                    <button type="button" onClick={einstellungenAuf} className={KNOPF_KANTE}>
                      Anpassen
                    </button>
                    <button
                      type="button"
                      onClick={() => schliessen(ALLES_AN)}
                      className={KNOPF_VOLL}
                    >
                      Alle akzeptieren
                    </button>
                  </>
                )}
                {details && (
                  <>
                    <button
                      ref={ersterKnopf}
                      type="button"
                      onClick={() => schliessen({ ...entwurf, notwendig: true })}
                      className={KNOPF_VOLL}
                    >
                      Auswahl speichern
                    </button>
                    <button
                      type="button"
                      onClick={() => schliessen(ALLES_AN)}
                      className={KNOPF_VOLL}
                    >
                      Alle akzeptieren
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[0.78rem] text-chalk-faint">
                {details && (
                  <button
                    type="button"
                    onClick={() => setDetails(false)}
                    className="font-bold text-chalk underline decoration-white/25 underline-offset-2 hover:decoration-white/60"
                  >
                    Zurück
                  </button>
                )}
                <a
                  href="/datenschutz"
                  className="underline decoration-white/25 underline-offset-2 hover:decoration-white/60"
                >
                  Datenschutz
                </a>
                <a
                  href="/impressum"
                  className="underline decoration-white/25 underline-offset-2 hover:decoration-white/60"
                >
                  Impressum
                </a>
              </div>
            </div>

            {/* Lichtkante oben, wie an allen dunklen Podesten der Seite.
                Sie liegt ausserhalb des scrollenden Kastens, sonst wandert
                sie mit dem Inhalt nach oben weg. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-0 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,153,0,0.8), transparent)" }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
