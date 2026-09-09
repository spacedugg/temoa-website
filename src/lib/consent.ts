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

import type { Sprache } from "./i18n";

export type KategorieId = "notwendig" | "extern";

/* Jeder Text steht in beiden Sprachen nebeneinander und nicht in zwei
   getrennten Verzeichnissen. Der Grund ist derselbe wie fuer das eine
   Verzeichnis ueberhaupt: ein Dienst kommt an einer Stelle dazu, und Banner
   und Datenschutzerklaerung koennen nicht auseinander laufen, in keiner
   Sprache. Eine fehlende Uebersetzung ist ein Typfehler.

   Die Rechtsgrundlagen bleiben deutsches Recht, auch auf Englisch: DSGVO und
   TDDDG haben keine englische Fassung, die hier gaelte. Uebersetzt wird nur
   die Schreibweise der Fundstelle. */
type Zweisprachig = Record<Sprache, string>;

export type Dienst = {
  /** Der Name des Dienstes. Er wird nicht uebersetzt. */
  name: string;
  anbieter: Zweisprachig;
  zweck: Zweisprachig;
  /** Was gespeichert wird und wie lange. */
  speicher: Zweisprachig;
  /** Rechtsgrundlage, wie sie in der Datenschutzerklaerung steht. */
  grundlage: Zweisprachig;
};

export type Kategorie = {
  id: KategorieId;
  name: Zweisprachig;
  /** Kann nicht abgewaehlt werden. */
  pflicht: boolean;
  beschreibung: Zweisprachig;
  dienste: Dienst[];
};

/** Eine Kategorie, aufgeloest in eine Sprache: was die Anzeige braucht. */
export type KategorieText = {
  id: KategorieId;
  name: string;
  pflicht: boolean;
  beschreibung: string;
  dienste: { name: string; anbieter: string; zweck: string; speicher: string; grundlage: string }[];
};

export const KATEGORIEN: Kategorie[] = [
  {
    id: "notwendig",
    name: { de: "Notwendig", en: "Essential" },
    pflicht: true,
    beschreibung: {
      de: "Damit die Website funktioniert und wir uns eure Entscheidung zu dieser Auswahl merken können. Ohne diese Speicherung müssten wir bei jedem Aufruf erneut fragen.",
      en: "So that the website works and we can remember the choice you made here. Without storing it, we would have to ask again on every visit.",
    },
    dienste: [
      {
        name: "temoa-consent",
        anbieter: { de: "temoa (diese Website)", en: "temoa (this website)" },
        zweck: {
          de: "Speichert, welche Kategorien ihr zugelassen habt.",
          en: "Stores which categories you allowed.",
        },
        speicher: {
          de: "Eintrag im lokalen Speicher des Browsers (localStorage), kein Cookie. Bleibt bis zum Widerruf oder bis ihr die Websitedaten löscht.",
          en: "An entry in the browser's local storage (localStorage), not a cookie. It stays until you withdraw consent or clear the site data.",
        },
        grundlage: {
          de: "Art. 6 Abs. 1 lit. c DSGVO, § 25 Abs. 2 Nr. 2 TDDDG (technisch erforderlich)",
          en: "Art. 6(1)(c) GDPR, § 25(2) no. 2 TDDDG (technically necessary)",
        },
      },
      {
        name: "temoa_sprache",
        anbieter: { de: "temoa (diese Website)", en: "temoa (this website)" },
        zweck: {
          de: "Speichert, ob ihr die Website auf Deutsch oder Englisch lesen wollt. Ohne diese Speicherung würde bei jedem Aufruf wieder die Sprache des Browsers entscheiden und eure Wahl überschreiben.",
          en: "Stores whether you want to read the website in German or English. Without it, the browser language would decide again on every visit and override your choice.",
        },
        speicher: {
          de: "Cookie, ein Jahr. Enthält ausschließlich das Kürzel der Sprache (de oder en), keine Kennung und nichts, woran sich eine Person erkennen ließe.",
          en: "A cookie, one year. It holds nothing but the language code (de or en), no identifier and nothing a person could be recognized by.",
        },
        grundlage: {
          de: "Art. 6 Abs. 1 lit. c DSGVO, § 25 Abs. 2 Nr. 2 TDDDG (technisch erforderlich)",
          en: "Art. 6(1)(c) GDPR, § 25(2) no. 2 TDDDG (technically necessary)",
        },
      },
    ],
  },
  {
    id: "extern",
    name: { de: "Externe Dienste", en: "External services" },
    pflicht: false,
    beschreibung: {
      de: "Der Terminkalender für das Erstgespräch läuft über einen Dienstleister. Solange ihr nicht zustimmt, wird er nicht geladen und es geht keine Verbindung dorthin. Ihr könnt einen Termin dann direkt beim Anbieter buchen.",
      en: "The booking calendar for the first call runs through a service provider. As long as you do not consent, it is not loaded and no connection goes there. You can book a time directly with the provider instead.",
    },
    dienste: [
      {
        name: "Cal.com",
        anbieter: {
          de: "Cal.com, Inc., 2261 Market Street #4667, San Francisco, CA 94114, USA",
          en: "Cal.com, Inc., 2261 Market Street #4667, San Francisco, CA 94114, USA",
        },
        zweck: {
          de: "Zeigt die freien Termine für das Erstgespräch direkt auf unserer Seite und nimmt die Buchung auf.",
          en: "Shows the open slots for the first call directly on our page and takes the booking.",
        },
        speicher: {
          de: "Cal.com setzt eigene Cookies und verarbeitet dabei die IP-Adresse. Übertragung in die USA auf Grundlage der EU-Standardvertragsklauseln.",
          en: "Cal.com sets its own cookies and processes the IP address in doing so. Transfer to the USA on the basis of the EU standard contractual clauses.",
        },
        grundlage: {
          de: "Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG (Einwilligung)",
          en: "Art. 6(1)(a) GDPR, § 25(1) TDDDG (consent)",
        },
      },
    ],
  },
];

/** Nur die Kategorien, über die entschieden werden kann. */
export const WAEHLBAR = KATEGORIEN.filter((k) => !k.pflicht);

/** Das Verzeichnis in einer Sprache, wie Banner und Erklaerung es anzeigen. */
export function kategorienFuer(sprache: Sprache): KategorieText[] {
  return KATEGORIEN.map((k) => ({
    id: k.id,
    name: k.name[sprache],
    pflicht: k.pflicht,
    beschreibung: k.beschreibung[sprache],
    dienste: k.dienste.map((d) => ({
      name: d.name,
      anbieter: d.anbieter[sprache],
      zweck: d.zweck[sprache],
      speicher: d.speicher[sprache],
      grundlage: d.grundlage[sprache],
    })),
  }));
}

export type Auswahl = Record<KategorieId, boolean>;

export type Einwilligung = {
  /** Wird erhoeht, wenn sich die Kategorien aendern: dann wird neu gefragt. */
  version: number;
  /** Zeitpunkt der Entscheidung, ISO. Nachweis nach Art. 7 Abs. 1 DSGVO. */
  zeitpunkt: string;
  auswahl: Auswahl;
};

/* Bleibt bei 1: die Kategorien haben sich mit der englischen Fassung nicht
   geaendert, nur ihr Wortlaut. Eine Erhoehung wuerde jeden Besucher erneut
   fragen, obwohl er ueber dieselben zwei Kategorien schon entschieden hat. */
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
