/**
 * Einwilligung fuer Cookies und externe Dienste.
 *
 * Grundsatz: nichts von einem Drittanbieter wird geladen, bevor der Besucher
 * zugestimmt hat. Das ist der Punkt, an dem die meisten Banner scheitern: sie
 * fragen, laden aber ohnehin. Hier haengt das Laden wirklich an der
 * Entscheidung, siehe `components/consent/ConsentGate` und `booking/CalEmbed`.
 *
 * Die Kategorien stehen hier und nur hier. Die Datenschutzseite rendert
 * dieselbe Liste, damit Banner und Datenschutzerklaerung nicht auseinander
 * laufen. Kommt ein Dienst dazu, kommt er in dieses Verzeichnis, und beide
 * Stellen sind aktuell.
 *
 * Bewusst nur zwei Kategorien: die Website setzt selbst keine Cookies zur
 * Messung, es gibt keine Analyse und kein Marketing-Pixel. Ein Banner, das
 * „Statistik" anbietet, wo nichts gemessen wird, waere eine Behauptung.
 */

export type KategorieId = "notwendig" | "extern";

export type Dienst = {
  name: string;
  anbieter: string;
  zweck: string;
  /** Was gespeichert wird und wie lange. */
  speicher: string;
  /** Rechtsgrundlage, wie sie in der Datenschutzerklaerung steht. */
  grundlage: string;
};

export type Kategorie = {
  id: KategorieId;
  name: string;
  /** Kann nicht abgewaehlt werden. */
  pflicht: boolean;
  beschreibung: string;
  dienste: Dienst[];
};

export const KATEGORIEN: Kategorie[] = [
  {
    id: "notwendig",
    name: "Notwendig",
    pflicht: true,
    beschreibung:
      "Damit die Website funktioniert und wir uns eure Entscheidung zu dieser Auswahl merken können. Ohne diese Speicherung müssten wir bei jedem Aufruf erneut fragen.",
    dienste: [
      {
        name: "temoa-consent",
        anbieter: "temoa (diese Website)",
        zweck: "Speichert, welche Kategorien ihr zugelassen habt.",
        speicher:
          "Eintrag im lokalen Speicher des Browsers (localStorage), kein Cookie. Bleibt bis zum Widerruf oder bis ihr die Websitedaten löscht.",
        grundlage: "Art. 6 Abs. 1 lit. c DSGVO, § 25 Abs. 2 Nr. 2 TDDDG (technisch erforderlich)",
      },
    ],
  },
  {
    id: "extern",
    name: "Externe Dienste",
    pflicht: false,
    beschreibung:
      "Der Terminkalender für das Erstgespräch läuft über einen Dienstleister. Solange ihr nicht zustimmt, wird er nicht geladen und es geht keine Verbindung dorthin. Ihr könnt einen Termin dann direkt beim Anbieter buchen.",
    dienste: [
      {
        name: "Cal.com",
        anbieter: "Cal.com, Inc., 2261 Market Street #4667, San Francisco, CA 94114, USA",
        zweck:
          "Zeigt die freien Termine für das Erstgespräch direkt auf unserer Seite und nimmt die Buchung auf.",
        speicher:
          "Cal.com setzt eigene Cookies und verarbeitet dabei die IP-Adresse. Übertragung in die USA auf Grundlage der EU-Standardvertragsklauseln.",
        grundlage: "Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG (Einwilligung)",
      },
    ],
  },
];

/** Nur die Kategorien, über die entschieden werden kann. */
export const WAEHLBAR = KATEGORIEN.filter((k) => !k.pflicht);

export type Auswahl = Record<KategorieId, boolean>;

export type Einwilligung = {
  /** Wird erhoeht, wenn sich die Kategorien aendern: dann wird neu gefragt. */
  version: number;
  /** Zeitpunkt der Entscheidung, ISO. Nachweis nach Art. 7 Abs. 1 DSGVO. */
  zeitpunkt: string;
  auswahl: Auswahl;
};

export const VERSION = 1;
const SCHLUESSEL = "temoa-consent";

/** Das Ereignis, mit dem sich die Seite ueber eine Aenderung verstaendigt. */
export const EREIGNIS = "temoa:einwilligung";

export const ALLES_AUS: Auswahl = { notwendig: true, extern: false };
export const ALLES_AN: Auswahl = { notwendig: true, extern: true };

/**
 * Liest die gespeicherte Entscheidung.
 *
 * `null` heisst: es wurde noch nicht entschieden, oder die gespeicherte
 * Entscheidung gilt fuer eine aeltere Fassung der Kategorien.
 */
export function lesen(): Einwilligung | null {
  if (typeof window === "undefined") return null;
  try {
    const roh = window.localStorage.getItem(SCHLUESSEL);
    if (!roh) return null;
    const daten = JSON.parse(roh) as Einwilligung;
    if (daten?.version !== VERSION) return null;
    if (!daten.auswahl || typeof daten.auswahl !== "object") return null;
    /* Notwendig ist immer an, egal was im Speicher steht. */
    return { ...daten, auswahl: { ...ALLES_AUS, ...daten.auswahl, notwendig: true } };
  } catch {
    /* Privates Fenster, gesperrter Speicher: dann gilt „nicht entschieden". */
    return null;
  }
}

export function schreiben(auswahl: Auswahl) {
  const daten: Einwilligung = {
    version: VERSION,
    zeitpunkt: new Date().toISOString(),
    auswahl: { ...auswahl, notwendig: true },
  };
  try {
    window.localStorage.setItem(SCHLUESSEL, JSON.stringify(daten));
  } catch {
    /* Nicht speicherbar: die Entscheidung gilt dann nur fuer diesen Aufruf. */
  }
  window.dispatchEvent(new CustomEvent(EREIGNIS, { detail: daten }));
  return daten;
}

export function loeschen() {
  try {
    window.localStorage.removeItem(SCHLUESSEL);
  } catch {
    /* nichts zu tun */
  }
  window.dispatchEvent(new CustomEvent(EREIGNIS, { detail: null }));
}
