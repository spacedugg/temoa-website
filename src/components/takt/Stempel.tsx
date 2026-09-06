"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Der Stempel: ein Ring aus umlaufender Schrift, der sich langsam dreht.
   Er sitzt halb auf dem Bild und halb auf dem Grund und ist das einzige
   bewegte Element der Sektion.

   Zwei Fassungen liegen dahinter. Erst Navy mit Schrift, dann eine gefuellte
   rote Scheibe mit dem Logo darin. Beide waren zu schwer: eine Scheibe deckt
   das Bild darunter zu, und das Logo steht ohnehin in der Kopfzeile.

   Jetzt gar keine Flaeche mehr. Der Grund bleibt frei, die Schrift steht halb
   durchsichtig darauf, dazu zwei feine Ringe.

   Die Schrift laeuft ueber zwei sehr verschiedene Gruende: den hellen Ton der
   Sektion und das Foto, auf dem an dieser Stelle ein fast schwarzer Pullover
   liegt. Dunkle Schrift allein verschwindet darin. Deshalb liegt hinter jedem
   Buchstaben eine weisse Kontur (`paint-order: stroke`), dazu ein weicher
   weisser Schein fuer die Ringe. Auf dem hellen Grund ist beides unsichtbar,
   auf dem Foto traegt es die Schrift.

   Der Text laeuft zweimal um den Ring und wird ueber `textLength` genau auf
   den Umfang gerechnet. Ohne das laeuft der zweite Durchlauf in den ersten.

   Bei „Bewegung reduzieren" steht der Stempel still.
   ============================================================ */

/* Radius der Schriftlinie und der daraus folgende Umfang. */
const R = 48;
const UMFANG = 2 * Math.PI * R;

/* Am Ende ein geschuetztes Leerzeichen zusaetzlich: an der Nahtstelle,
   wo der Text in sich selbst laeuft, stiess sonst der Punkt direkt an das
   naechste Wort. Zwei normale Leerzeichen zieht SVG zu einem zusammen. */
const TEXT = "TEMOA · AMAZON FULL SERVICE · TEMOA · AMAZON FULL SERVICE · \u00A0";

export function Stempel({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none select-none ${className ?? ""}`}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      style={{ filter: "drop-shadow(0 0 7px rgba(255,255,255,0.75))" }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          {/* Beginnt links und laeuft ueber oben nach rechts. */}
          <path id="stempel-ring" fill="none" d={`M 60 60 m -${R} 0 a ${R} ${R} 0 1 1 ${R * 2} 0 a ${R} ${R} 0 1 1 -${R * 2} 0`} />
        </defs>

        <circle cx="60" cy="60" r="57" fill="none" stroke="#0D2439" strokeWidth="0.9" opacity="0.22" />
        <circle cx="60" cy="60" r="39" fill="none" stroke="#0D2439" strokeWidth="0.9" opacity="0.22" />

        <text
          fill="#0D2439"
          stroke="#ffffff"
          strokeWidth="1.9"
          strokeLinejoin="round"
          paintOrder="stroke"
          opacity="0.62"
          fontSize="7.8"
          fontWeight="700"
          letterSpacing="0.3"
        >
          <textPath href="#stempel-ring" textLength={UMFANG} lengthAdjust="spacingAndGlyphs">
            {TEXT}
          </textPath>
        </text>

        {/* Ein kleiner oranger Punkt in der Mitte, damit der Ring nicht leer
            wirkt. */}
        <circle cx="60" cy="60" r="2.6" fill="#FF9900" opacity="0.75" />
      </svg>
    </motion.div>
  );
}
