"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

/* ============================================================
   Der Stempel: ein rundes Schild mit umlaufender Schrift, das sich langsam
   dreht. Er sitzt halb auf dem Bild und halb auf dem Grund und ist das
   einzige bewegte Element der Sektion.

   Die Schrift laeuft ueber einen Kreis (`textPath`), sie ist damit echte
   Schrift und auf jedem Bildschirm scharf. Gedreht wird die ganze Scheibe,
   nicht der Text: sonst laufen Buchstabenabstaende auseinander.

   Bei „Bewegung reduzieren" steht er still.
   ============================================================ */

export function Stempel({
  text = "temoa · Amazon Full Service · ",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  /* Die Schrift wird auf den Umfang gestreckt (2 * pi * 44 = 276), sonst
     laeuft der zweite Durchlauf in den ersten und es steht „temoatemoa". */

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none select-none ${className ?? ""}`}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path
            id={`${id}-kreis`}
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            fill="none"
          />
        </defs>
        {/* Die Scheibe. Navy, damit sie auf dem Foto und auf dem hellen Grund
            gleichermassen steht. */}
        <circle cx="60" cy="60" r="57" fill="#0D2439" />
        <circle cx="60" cy="60" r="57" fill="none" stroke="#FF9900" strokeWidth="1.5" opacity="0.55" />
        <text
          fill="#ffffff"
          style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          <textPath
            href={`#${id}-kreis`}
            startOffset="0"
            textLength={276}
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
        {/* Der Punkt in der Mitte, dieselbe Marke wie ueberall. */}
        <circle cx="60" cy="60" r="7" fill="#FF9900" />
      </svg>
    </motion.div>
  );
}
