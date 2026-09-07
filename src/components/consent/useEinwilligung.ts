"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ALLES_AUS,
  EREIGNIS,
  type Auswahl,
  type Einwilligung,
  type KategorieId,
  lesen,
  loeschen,
  schreiben,
} from "@/lib/consent";

/** Das Ereignis, mit dem die Fusszeile die Einstellungen wieder aufmacht. */
export const OEFFNEN = "temoa:einwilligung-oeffnen";

/**
 * Zustand der Einwilligung.
 *
 * `bereit` ist erst nach dem ersten Rendern wahr. Vorher darf nichts von der
 * Entscheidung abhaengen: der Server kennt den lokalen Speicher nicht, und wer
 * hier serverseitig etwas anderes rendert als im Browser, bekommt einen
 * Hydration-Fehler.
 */
export function useEinwilligung() {
  const [bereit, setBereit] = useState(false);
  const [daten, setDaten] = useState<Einwilligung | null>(null);

  useEffect(() => {
    setDaten(lesen());
    setBereit(true);
    const hoeren = (e: Event) => setDaten((e as CustomEvent).detail ?? null);
    window.addEventListener(EREIGNIS, hoeren);
    return () => window.removeEventListener(EREIGNIS, hoeren);
  }, []);

  const speichern = useCallback((auswahl: Auswahl) => {
    setDaten(schreiben(auswahl));
  }, []);

  const widerrufen = useCallback(() => {
    loeschen();
    setDaten(null);
  }, []);

  const erlaubt = useCallback(
    (id: KategorieId) => (daten ? daten.auswahl[id] === true : ALLES_AUS[id]),
    [daten],
  );

  return {
    bereit,
    /** `null`, solange nicht entschieden wurde. */
    daten,
    entschieden: daten !== null,
    erlaubt,
    speichern,
    widerrufen,
  };
}

/** Einstellungen von aussen aufmachen, etwa aus der Fusszeile. */
export function einstellungenOeffnen() {
  window.dispatchEvent(new Event(OEFFNEN));
}
