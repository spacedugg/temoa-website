"use client";

import { useEffect, useRef } from "react";
import { useEinwilligung } from "../consent/useEinwilligung";

/* ============================================================
   Google Tag Manager, hinter der Einwilligung.

   Der Container wird erst geladen, wenn die Kategorie „Statistik und
   Marketing" zugelassen ist. Vorher geht keine Anfrage an
   googletagmanager.com, es wird kein Skript geladen und kein Cookie gesetzt.

   Warum nicht der übliche Weg mit Consent Mode: dabei liegt der Container von
   Anfang an auf der Seite und meldet Google nur, dass noch keine Zustimmung
   vorliegt. Dafür ist die Verbindung zu Google aber schon aufgebaut, samt
   IP-Adresse. Das ist genau der Punkt, an dem die meisten Banner scheitern:
   sie fragen, laden aber ohnehin.

   Der noscript-Schnipsel aus dem Standardcode fehlt mit Absicht. Er greift
   nur, wenn im Browser kein JavaScript läuft. Dann läuft aber auch die Prüfung
   der Einwilligung nicht, und der Container würde ohne Zustimmung geladen. Ein
   Rahmen, der sich nicht fragen lässt, hat auf einer Seite mit Einwilligung
   nichts zu suchen. Messbar verloren geht dabei fast nichts: ohne JavaScript
   misst der Tag Manager ohnehin nur den Aufruf.

   Wird die Einwilligung widerrufen, wird der Container nicht entfernt: einmal
   geladenes JavaScript lässt sich nicht zurücknehmen. Die Seite wird deshalb
   neu geladen, und danach ist er weg.
   ============================================================ */

const CONTAINER = "GTM-MTVP2HMJ";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function TagManager() {
  const { bereit, erlaubt } = useEinwilligung();
  const darf = erlaubt("messung");
  /* Merkt sich, ob der Container in diesem Seitenaufruf schon geladen wurde.
     Ohne das würde jede Änderung an der Einwilligung ihn erneut einhängen. */
  const geladen = useRef(false);

  useEffect(() => {
    if (!bereit) return;

    if (darf && !geladen.current) {
      geladen.current = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const skript = document.createElement("script");
      skript.async = true;
      skript.src = `https://www.googletagmanager.com/gtm.js?id=${CONTAINER}`;
      document.head.appendChild(skript);
      return;
    }

    if (!darf && geladen.current) {
      window.location.reload();
    }
  }, [bereit, darf]);

  return null;
}
