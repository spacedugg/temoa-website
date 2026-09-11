"use client";

import { useEffect, useRef } from "react";
import { useEinwilligung } from "../consent/useEinwilligung";

/* ============================================================
   Google Tag Manager mit Consent Mode v2.

   Zwei Wege gab es hier. Der erste: den Container erst nach der Zustimmung
   laden, dann geht vorher gar keine Anfrage an Google. Der zweite, jetzt
   gebaute: den Container sofort laden, ihm aber als Erstes sagen, dass keine
   Einwilligung vorliegt.

   Der Unterschied in der Praxis: bei Consent Mode kennt Google auch die
   Aufrufe ohne Zustimmung als anonyme Ereignisse und rechnet die Luecke hoch.
   Ohne ihn fehlen sie vollstaendig. Der Kunde hat sich fuer die bessere
   Datenqualitaet entschieden.

   Der Preis, und der gehoert dazu: der Container wird beim Aufruf geladen,
   dabei geht die IP-Adresse an Google. Das steht so in der Beschreibung der
   Kategorie und in der Datenschutzerklaerung, und ob es tragfaehig ist,
   entscheidet nicht diese Datei, sondern der Anwalt des Kunden.

   Reihenfolge im `dataLayer` ist alles:
     1. `consent default` mit allem auf „denied".
     2. Der Container.
     3. `consent update`, sobald die Entscheidung feststeht.
   Steht der Container vor dem Default, feuern die Tags einmal ungefragt.

   Ein Widerruf braucht kein Neuladen mehr: `consent update` auf „denied"
   nimmt die Freigabe zurueck, und die Tags halten sich daran.
   ============================================================ */

const CONTAINER = "GTM-MTVP2HMJ";

/* Die Signale, die an unserer Kategorie „Statistik und Marketing" haengen.
   `functionality_storage` und `security_storage` fehlen bewusst: sie sind
   technisch erforderlich und stehen dauerhaft auf „granted". */
const SIGNALE = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
  "personalization_storage",
] as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/* Googles eigene Schreibweise: `gtag` schiebt seine Argumente unveraendert in
   den `dataLayer`. Ein Pfeilausdruck mit Rest-Parametern ginge nicht, der
   `dataLayer` erwartet ein echtes `arguments`-Objekt. */
function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function zustand(erlaubt: boolean) {
  const wert = erlaubt ? "granted" : "denied";
  return Object.fromEntries(SIGNALE.map((s) => [s, wert]));
}

export function TagManager() {
  const { bereit, erlaubt } = useEinwilligung();
  const darf = erlaubt("messung");
  const geladen = useRef(false);

  useEffect(() => {
    if (!bereit) return;

    if (!geladen.current) {
      geladen.current = true;

      window.dataLayer = window.dataLayer || [];
      /* Zuerst der Grundzustand: alles abgelehnt. `wait_for_update` gibt dem
         Container eine halbe Sekunde, bevor er mit dem Grundzustand losfeuert;
         die Aktualisierung unten kommt frueher. */
      gtag("consent", "default", {
        ...zustand(false),
        functionality_storage: "granted",
        security_storage: "granted",
        wait_for_update: 500,
      });
      /* Ohne Einwilligung sendet Google Ads keine Kennungen mit, und die
         Seitenadresse traegt die Werbeparameter statt eines Cookies. */
      gtag("set", "ads_data_redaction", true);
      gtag("set", "url_passthrough", true);

      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const skript = document.createElement("script");
      skript.async = true;
      skript.src = `https://www.googletagmanager.com/gtm.js?id=${CONTAINER}`;
      document.head.appendChild(skript);
    }

    gtag("consent", "update", zustand(darf));
    gtag("set", "ads_data_redaction", !darf);
  }, [bereit, darf]);

  return null;
}
