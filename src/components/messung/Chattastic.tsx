"use client";

import { useEffect, useRef } from "react";

/* ============================================================
   Chattastic, der Chat-Assistent unten rechts.

   Laedt allein anhand der Umgebungsvariable NEXT_PUBLIC_CHATTASTIC_ID in
   Vercel. Fehlt sie oder ist sie leer, wird nichts geladen, komplett ohne
   Codeaenderung. Das ist der einzige Schalter, umschaltbar in Vercel unter
   Project Settings → Environment Variables, mit anschliessendem Redeploy
   (eine Umgebungsvariable wirkt erst ab dem naechsten Build, nicht auf
   bereits laufenden Deployments).

   Ausdruecklicher Wunsch des Kunden: der Assistent laeuft unabhaengig von
   der Entscheidung im Cookie-Banner, auch nach „Nur notwendige". Das weicht
   vom sonstigen Grundsatz dieser Website ab (kein Dienst eines Dritten vor
   der Zustimmung, siehe Cal.com in booking/CalEmbed und lib/consent.ts) und
   ist entsprechend in lib/consent.ts vermerkt: der Dienst steht dort, damit
   er in Banner und Datenschutzerklaerung sichtbar bleibt, aber ohne dass
   ein Haken ihn tatsaechlich abschaltet.
   ============================================================ */

const WIDGET_ID = process.env.NEXT_PUBLIC_CHATTASTIC_ID;

export function Chattastic() {
  const geladen = useRef(false);

  useEffect(() => {
    if (!WIDGET_ID) return;
    if (geladen.current) return;
    geladen.current = true;

    const skript = document.createElement("script");
    skript.src = `https://www.chattastic.de/widget.js?id=${encodeURIComponent(WIDGET_ID)}`;
    skript.async = true;
    document.body.appendChild(skript);
  }, []);

  return null;
}
