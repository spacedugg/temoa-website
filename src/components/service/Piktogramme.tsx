"use client";

import { motion, type Variants } from "framer-motion";

/* ============================================================
   Die Piktogramme der Website.

   Vorher lagen in weissen Kacheln entweder gar keine Zeichen oder die
   allgemeinen Strich-Icons aus `ui/Icon`: Zielscheibe, Schild, Sternchen. Sie
   passten zum Teil nicht zum Text und sahen aus wie aus einem Icon-Paket
   gegriffen.

   Jedes Piktogramm zeichnet hier die Sache selbst: die Buy-Box einen
   Kaufknopf, der Bestand einen Fuellstand, die Gebote einen Regler. Navy-
   Kachel, helle Formen, ein oranges Detail, und dieses Detail bewegt sich,
   wenn die Karte ins Bild kommt und noch einmal beim Zeigen.

   Die Karte darueber steuert die Bewegung ueber Varianten:
   `ruhe` -> `an` beim Einlaufen, `zeig` beim Zeigen.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

const GRUND = "#0E2C43";
const HELL = "#CFE4F2";
const HELL_LEISE = "rgba(207,228,242,0.4)";
const ORANGE = "#FF9900";

export type PiktogrammName =
  | "buybox"
  | "bestand"
  | "ticket"
  | "katalog"
  | "richtlinie"
  | "test"
  | "pricing"
  | "termin"
  | "analyse"
  | "fahrplan"
  | "marge"
  | "struktur"
  | "marke"
  | "suche"
  | "ranking"
  | "sprache"
  | "seite"
  | "kampagne"
  | "wiederholen";

/* Die Kachel. Der Inhalt kommt als Kind, die Bewegung steuert die Karte
   darueber ueber Varianten: „an" beim Einlaufen, „zeig" beim Zeigen. */
function Kachel({ children }: { children: React.ReactNode }) {
  return (
    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="14" fill={GRUND} />
      <rect width="48" height="48" rx="14" fill="url(#kachel-licht)" />
      {children}
    </svg>
  );
}

/* Der Lichtverlauf liegt einmal im Dokument, nicht in jeder Kachel. */
function KachelVerlauf() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <linearGradient id="kachel-licht" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const wisch: Variants = {
  ruhe: { pathLength: 0, opacity: 0 },
  an: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

function Piktogramm({ name }: { name: PiktogrammName }) {
  switch (name) {
    /* Buy-Box: eine Produktkarte mit Kaufknopf. Der Knopf leuchtet auf,
       wenn man die Karte anfasst. */
    case "buybox":
      return (
        <Kachel>
          <rect x="10" y="9" width="28" height="30" rx="4" fill="rgba(255,255,255,0.07)" stroke={HELL_LEISE} />
          <rect x="14" y="14" width="12" height="3" rx="1.5" fill={HELL} />
          <rect x="14" y="20" width="8" height="2.4" rx="1.2" fill={HELL_LEISE} />
          <motion.rect
            x="14"
            y="27"
            width="20"
            height="7"
            rx="3.5"
            fill={ORANGE}
            variants={{ ruhe: { opacity: 0, y: 4 }, an: { opacity: 1, y: 0 }, zeig: { opacity: 1, y: -1 } }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </Kachel>
      );

    /* Bestand: drei Kartons und ein Fuellstand, der sich auffuellt. */
    case "bestand":
      return (
        <Kachel>
          <rect x="9" y="26" width="10" height="12" rx="2" fill="rgba(255,255,255,0.1)" stroke={HELL_LEISE} />
          <rect x="21" y="20" width="10" height="18" rx="2" fill="rgba(255,255,255,0.1)" stroke={HELL_LEISE} />
          <rect x="9" y="30" width="10" height="1.6" fill={HELL_LEISE} />
          <rect x="21" y="24" width="10" height="1.6" fill={HELL_LEISE} />
          <rect x="34" y="10" width="6" height="28" rx="3" fill="rgba(255,255,255,0.08)" stroke={HELL_LEISE} />
          <motion.rect
            x="34"
            y="10"
            width="6"
            height="28"
            rx="3"
            fill={ORANGE}
            style={{ transformOrigin: "37px 38px" }}
            variants={{ ruhe: { scaleY: 0.12 }, an: { scaleY: 0.42 }, zeig: { scaleY: 0.9 } }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </Kachel>
      );

    /* Cases: eine Anfrage geht raus, die Antwort kommt zurueck. */
    case "ticket":
      return (
        <Kachel>
          <path
            d="M10 13a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-9l-5 4v-4h-.5a3 3 0 0 1-2.5-3v-7Z"
            fill="rgba(255,255,255,0.1)"
            stroke={HELL_LEISE}
          />
          <rect x="14" y="15" width="12" height="2.2" rx="1.1" fill={HELL} />
          <motion.path
            d="M20 30h11a4 4 0 0 1 4 4v4"
            stroke={ORANGE}
            strokeWidth="2"
            strokeLinecap="round"
            variants={wisch}
          />
          <motion.circle
            cx="35"
            cy="38"
            r="2.6"
            fill={ORANGE}
            variants={{ ruhe: { scale: 0 }, an: { scale: 1 }, zeig: { scale: 1.25 } }}
            style={{ transformOrigin: "35px 38px" }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.4 }}
          />
        </Kachel>
      );

    /* Katalog: eine Tabelle, in die eine neue Zeile einlaeuft. */
    case "katalog":
      return (
        <Kachel>
          <rect x="9" y="10" width="30" height="28" rx="4" fill="rgba(255,255,255,0.07)" stroke={HELL_LEISE} />
          <path d="M9 18h30M20 10v28" stroke={HELL_LEISE} />
          <rect x="12" y="21" width="5" height="2.2" rx="1.1" fill={HELL} />
          <rect x="23" y="21" width="12" height="2.2" rx="1.1" fill={HELL_LEISE} />
          <rect x="12" y="27" width="5" height="2.2" rx="1.1" fill={HELL} />
          <rect x="23" y="27" width="9" height="2.2" rx="1.1" fill={HELL_LEISE} />
          <motion.g
            variants={{ ruhe: { opacity: 0, x: -6 }, an: { opacity: 1, x: 0 }, zeig: { opacity: 1, x: 2 } }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
          >
            <rect x="12" y="33" width="5" height="2.2" rx="1.1" fill={ORANGE} />
            <rect x="23" y="33" width="11" height="2.2" rx="1.1" fill={ORANGE} opacity="0.55" />
          </motion.g>
        </Kachel>
      );

    /* Richtlinien: ein Dokument, das geprueft wird. Der Haken zeichnet sich. */
    case "richtlinie":
      return (
        <Kachel>
          <path
            d="M13 9h13l8 8v22a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Z"
            fill="rgba(255,255,255,0.08)"
            stroke={HELL_LEISE}
          />
          <path d="M26 9v8h8" stroke={HELL_LEISE} />
          <rect x="15" y="21" width="12" height="2.2" rx="1.1" fill={HELL_LEISE} />
          <rect x="15" y="26" width="8" height="2.2" rx="1.1" fill={HELL_LEISE} />
          <motion.path
            d="M16 33.5l4 4 9-9"
            stroke={ORANGE}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={wisch}
          />
        </Kachel>
      );

    /* Test: zwei Fassungen nebeneinander, die Messung springt auf die zweite. */
    case "test":
      return (
        <Kachel>
          <rect x="8" y="12" width="14" height="24" rx="3" fill="rgba(255,255,255,0.08)" stroke={HELL_LEISE} />
          <rect x="26" y="12" width="14" height="24" rx="3" fill="rgba(255,255,255,0.08)" stroke={HELL_LEISE} />
          <rect x="11" y="16" width="8" height="6" rx="1.5" fill={HELL_LEISE} />
          <rect x="29" y="16" width="8" height="6" rx="1.5" fill={HELL} />
          <rect x="11" y="25" width="6" height="2" rx="1" fill={HELL_LEISE} />
          <rect x="29" y="25" width="6" height="2" rx="1" fill={HELL_LEISE} />
          <motion.rect
            x="26"
            y="12"
            width="14"
            height="24"
            rx="3"
            fill="none"
            stroke={ORANGE}
            strokeWidth="2"
            variants={{
              ruhe: { opacity: 0, x: -18 },
              an: { opacity: 1, x: 0 },
              zeig: { opacity: 1, x: -18 },
            }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
          />
        </Kachel>
      );

    /* Pricing: ein Regler, der die Marge sucht. */
    case "pricing":
      return (
        <Kachel>
          <path
            d="M23 9h9a3 3 0 0 1 3 3v9L21 35a3 3 0 0 1-4 0l-8-8a3 3 0 0 1 0-4L23 9Z"
            fill="rgba(255,255,255,0.08)"
            stroke={HELL_LEISE}
          />
          <circle cx="29" cy="15" r="2.4" fill={HELL} />
          <rect x="9" y="39" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.16)" />
          <motion.circle
            cx="17"
            cy="40.5"
            r="4"
            fill={ORANGE}
            variants={{ ruhe: { x: -6, opacity: 0 }, an: { x: 0, opacity: 1 }, zeig: { x: 13, opacity: 1 } }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </Kachel>
      );


    /* Analyse: Balken und eine Lupe, die darueber faehrt. */
    case "analyse":
      return (
        <Kachel>
          <rect x="9" y="10" width="30" height="28" rx="4" fill="rgba(255,255,255,0.07)" stroke={HELL_LEISE} />
          <rect x="14" y="26" width="4.5" height="8" rx="2" fill={HELL_LEISE} />
          <rect x="21" y="21" width="4.5" height="13" rx="2" fill={HELL_LEISE} />
          <rect x="28" y="17" width="4.5" height="17" rx="2" fill={HELL} />
          <motion.g
            variants={{ ruhe: { opacity: 0, x: -8, y: 6 }, an: { opacity: 1, x: 0, y: 0 }, zeig: { opacity: 1, x: 6, y: -4 } }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          >
            <circle cx="27" cy="20" r="7" fill="none" stroke={ORANGE} strokeWidth="2.6" />
            <path d="M32 25l5 5" stroke={ORANGE} strokeWidth="2.8" strokeLinecap="round" />
          </motion.g>
        </Kachel>
      );

    /* Fahrplan: drei Stufen, oben die Fahne. */
    case "fahrplan":
      return (
        <Kachel>
          <rect x="8" y="30" width="10" height="8" rx="2" fill="rgba(255,255,255,0.12)" stroke={HELL_LEISE} />
          <rect x="19" y="24" width="10" height="14" rx="2" fill="rgba(255,255,255,0.12)" stroke={HELL_LEISE} />
          <rect x="30" y="18" width="10" height="20" rx="2" fill="rgba(255,255,255,0.12)" stroke={HELL_LEISE} />
          <path d="M35 18V9" stroke={HELL} strokeWidth="2.2" strokeLinecap="round" />
          <motion.path
            d="M35 10h8l-2.4 3.2L43 16.4h-8Z"
            fill={ORANGE}
            style={{ transformOrigin: "35px 13px" }}
            variants={{ ruhe: { scaleX: 0, opacity: 0 }, an: { scaleX: 1, opacity: 1 }, zeig: { scaleX: 1.1, opacity: 1 } }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.3 }}
          />
        </Kachel>
      );

    /* Marge: eine Abrechnung, unten die Summe. */
    case "marge":
      return (
        <Kachel>
          <path
            d="M12 9h24a2 2 0 0 1 2 2v28l-4.5-3-4.5 3-4.5-3-4.5 3-4.5-3L10 39V11a2 2 0 0 1 2-2Z"
            fill="rgba(255,255,255,0.08)"
            stroke={HELL_LEISE}
          />
          <rect x="15" y="15" width="12" height="2.4" rx="1.2" fill={HELL_LEISE} />
          <rect x="15" y="21" width="16" height="2.4" rx="1.2" fill={HELL_LEISE} />
          <motion.rect
            x="15"
            y="27"
            width="18"
            height="3.4"
            rx="1.7"
            fill={ORANGE}
            style={{ transformOrigin: "15px 28.7px" }}
            variants={{ ruhe: { scaleX: 0 }, an: { scaleX: 0.6 }, zeig: { scaleX: 1 } }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          />
        </Kachel>
      );

    /* Struktur: eine Kampagne, darunter ihre Aufgaben. */
    case "struktur":
      return (
        <Kachel>
          <rect x="17" y="8" width="14" height="9" rx="3" fill="rgba(255,255,255,0.14)" stroke={HELL_LEISE} />
          <rect x="7" y="31" width="12" height="9" rx="3" fill="rgba(255,255,255,0.1)" stroke={HELL_LEISE} />
          <rect x="18" y="31" width="12" height="9" rx="3" fill="rgba(255,255,255,0.1)" stroke={HELL_LEISE} />
          <rect x="29" y="31" width="12" height="9" rx="3" fill="rgba(255,255,255,0.1)" stroke={HELL_LEISE} />
          <motion.path
            d="M24 17v7M13 31v-7h22v7M24 24v7"
            fill="none"
            stroke={ORANGE}
            strokeWidth="2.2"
            strokeLinecap="round"
            variants={wisch}
          />
        </Kachel>
      );

    /* Marke: ein Schild, in dem der Name steht. */
    case "marke":
      return (
        <Kachel>
          <path
            d="M24 8l14 5v10c0 8.5-5.8 14.5-14 17-8.2-2.5-14-8.5-14-17V13l14-5Z"
            fill="rgba(255,255,255,0.08)"
            stroke={HELL_LEISE}
          />
          <rect x="16" y="20" width="16" height="2.6" rx="1.3" fill={HELL_LEISE} />
          <motion.rect
            x="16"
            y="26"
            width="11"
            height="3.2"
            rx="1.6"
            fill={ORANGE}
            style={{ transformOrigin: "16px 27.6px" }}
            variants={{ ruhe: { scaleX: 0 }, an: { scaleX: 1 }, zeig: { scaleX: 1.35 } }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.25 }}
          />
        </Kachel>
      );

    /* Suche: eine Liste von Suchbegriffen, einer wird aufgenommen. */
    case "suche":
      return (
        <Kachel>
          <rect x="9" y="9" width="30" height="9" rx="4.5" fill="rgba(255,255,255,0.12)" stroke={HELL_LEISE} />
          <circle cx="16" cy="13.5" r="3" fill="none" stroke={HELL} strokeWidth="1.8" />
          <path d="M18.4 15.8l2.4 2.4" stroke={HELL} strokeWidth="1.8" strokeLinecap="round" />
          <rect x="9" y="23" width="30" height="3" rx="1.5" fill={HELL_LEISE} />
          <rect x="9" y="30" width="22" height="3" rx="1.5" fill={HELL_LEISE} />
          <rect x="9" y="37" width="26" height="3" rx="1.5" fill={HELL_LEISE} />
          <motion.rect
            x="9"
            y="23"
            width="30"
            height="3"
            rx="1.5"
            fill={ORANGE}
            variants={{ ruhe: { opacity: 0, y: 0 }, an: { opacity: 1, y: 0 }, zeig: { opacity: 1, y: 14 } }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
          />
        </Kachel>
      );

    /* Ranking: die Kurve zieht die Balken mit nach oben. */
    case "ranking":
      return (
        <Kachel>
          <rect x="10" y="28" width="6" height="10" rx="2" fill={HELL_LEISE} />
          <rect x="19" y="23" width="6" height="15" rx="2" fill={HELL_LEISE} />
          <rect x="28" y="18" width="6" height="20" rx="2" fill={HELL} />
          <motion.path
            d="M10 30l9-6 9-5 10-8"
            fill="none"
            stroke={ORANGE}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={wisch}
          />
          <motion.path
            d="M38 11h-6M38 11v6"
            fill="none"
            stroke={ORANGE}
            strokeWidth="2.6"
            strokeLinecap="round"
            variants={{ ruhe: { opacity: 0 }, an: { opacity: 1 }, zeig: { opacity: 1 } }}
            transition={{ duration: 0.3, delay: 0.6 }}
          />
        </Kachel>
      );

    /* Sprache: zwei Fassungen desselben Textes, eine je Markt. */
    case "sprache":
      return (
        <Kachel>
          <path
            d="M8 13a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-7l-5 4v-4a3 3 0 0 1-4-3v-6Z"
            fill="rgba(255,255,255,0.1)"
            stroke={HELL_LEISE}
          />
          <rect x="12" y="14" width="10" height="2.2" rx="1.1" fill={HELL} />
          <motion.g
            variants={{ ruhe: { opacity: 0, y: 6 }, an: { opacity: 1, y: 0 }, zeig: { opacity: 1, y: -2 } }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.25 }}
          >
            <path
              d="M21 30a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-2v4l-5-4h-6a3 3 0 0 1-3-3v-6Z"
              fill="rgba(255,153,0,0.16)"
              stroke={ORANGE}
              strokeWidth="1.8"
            />
            <rect x="25" y="32" width="11" height="2.2" rx="1.1" fill={ORANGE} />
          </motion.g>
        </Kachel>
      );

    /* Seite: eine Produktseite, in die ein Modul einlaeuft. */
    case "seite":
      return (
        <Kachel>
          <rect x="8" y="9" width="32" height="30" rx="4" fill="rgba(255,255,255,0.07)" stroke={HELL_LEISE} />
          <rect x="12" y="13" width="12" height="12" rx="2" fill={HELL_LEISE} />
          <rect x="27" y="13" width="9" height="2.4" rx="1.2" fill={HELL} />
          <rect x="27" y="18" width="7" height="2.4" rx="1.2" fill={HELL_LEISE} />
          <motion.rect
            x="12"
            y="29"
            width="24"
            height="6"
            rx="2"
            fill={ORANGE}
            variants={{ ruhe: { opacity: 0, y: 8 }, an: { opacity: 1, y: 0 }, zeig: { opacity: 1, y: -2 } }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
          />
        </Kachel>
      );

    /* Kampagne: eine Anzeige, die Platz gewinnt. */
    case "kampagne":
      return (
        <Kachel>
          <rect x="8" y="10" width="32" height="12" rx="3" fill="rgba(255,255,255,0.1)" stroke={HELL_LEISE} />
          <rect x="12" y="14" width="10" height="2.6" rx="1.3" fill={HELL} />
          <rect x="8" y="26" width="32" height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
          <rect x="8" y="34" width="32" height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
          <motion.rect
            x="8"
            y="26"
            width="14"
            height="5"
            rx="2.5"
            fill={ORANGE}
            style={{ transformOrigin: "8px 28.5px" }}
            variants={{ ruhe: { scaleX: 0.2 }, an: { scaleX: 0.6 }, zeig: { scaleX: 1 } }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          />
        </Kachel>
      );

    /* Wiederholen: derselbe Aufwand noch einmal, Markt fuer Markt. */
    case "wiederholen":
      return (
        <Kachel>
          <rect x="12" y="19" width="10" height="10" rx="2.5" fill="rgba(255,255,255,0.12)" stroke={HELL_LEISE} />
          <rect x="26" y="19" width="10" height="10" rx="2.5" fill="rgba(255,255,255,0.12)" stroke={HELL_LEISE} />
          <motion.g
            style={{ transformOrigin: "24px 24px" }}
            variants={{ ruhe: { opacity: 0, rotate: -60 }, an: { opacity: 1, rotate: 0 }, zeig: { opacity: 1, rotate: 180 } }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <path
              d="M11 24a13 13 0 0 1 22-9M37 24a13 13 0 0 1-22 9"
              fill="none"
              stroke={ORANGE}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path d="M33 9v6h-6M15 39v-6h6" fill="none" stroke={ORANGE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </Kachel>
      );

    /* Termin: ein Kalender mit einem gesetzten Tag. */
    case "termin":
      return (
        <Kachel>
          <rect x="9" y="12" width="30" height="27" rx="4" fill="rgba(255,255,255,0.07)" stroke={HELL_LEISE} />
          <path d="M9 20h30" stroke={HELL_LEISE} />
          <path d="M17 9v6M31 9v6" stroke={HELL} strokeWidth="2.4" strokeLinecap="round" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <circle key={`${r}-${c}`} cx={15 + c * 6} cy={25 + r * 5} r="1.4" fill={HELL_LEISE} />
            ))
          )}
          <motion.circle
            cx="27"
            cy="30"
            r="4.2"
            fill={ORANGE}
            style={{ transformOrigin: "27px 30px" }}
            variants={{ ruhe: { scale: 0 }, an: { scale: 1 }, zeig: { scale: 1.2 } }}
            transition={{ type: "spring", stiffness: 320, damping: 15, delay: 0.3 }}
          />
        </Kachel>
      );
  }
}


/** Der Verlauf fuer die Kacheln. Liegt einmal im Dokument, nicht je Kachel. */
export function KachelVerlaufDefs() {
  return <KachelVerlauf />;
}

export { Piktogramm };
