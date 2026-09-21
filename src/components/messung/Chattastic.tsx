"use client";

import { useEffect, useRef } from "react";
import { useEinwilligung } from "../consent/useEinwilligung";

/* ============================================================
   Chattastic, der Chat-Assistent unten rechts.

   Zwei Schalter entscheiden, ob das Skript laeuft:

   1. Die Umgebungsvariable NEXT_PUBLIC_CHATTASTIC_ID in Vercel. Fehlt sie
      oder ist sie leer, wird nichts geladen, komplett ohne Codeaenderung.
      Das ist der Schalter fuer „ganz an oder ganz aus", umschaltbar in
      Vercel unter Project Settings → Environment Variables, mit
      anschliessendem Redeploy (eine Umgebungsvariable wirkt erst ab dem
      naechsten Build, nicht auf bereits laufenden Deployments).
   2. Die Einwilligung in die Kategorie „Externe Dienste" (siehe
      lib/consent.ts). Ohne Zustimmung laedt das Skript nicht, genau wie beim
      Cal.com-Kalender: kein Dienst eines Dritten laeuft vor der
      Entscheidung des Besuchers.
   ============================================================ */

const WIDGET_ID = process.env.NEXT_PUBLIC_CHATTASTIC_ID;

export function Chattastic() {
  const { bereit, erlaubt } = useEinwilligung();
  const darf = erlaubt("extern");
  const geladen = useRef(false);

  useEffect(() => {
    if (!WIDGET_ID) return;
    if (!bereit || !darf) return;
    if (geladen.current) return;
    geladen.current = true;

    const skript = document.createElement("script");
    skript.src = `https://www.chattastic.de/widget.js?id=${encodeURIComponent(WIDGET_ID)}`;
    skript.async = true;
    document.body.appendChild(skript);
  }, [bereit, darf]);

  return null;
}
