"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   Zahl: zaehlt hoch, sobald sie im Bild ist.

   Belegte Kennzahlen standen als fertiger Text auf der Seite. Eine Zahl,
   die vor den Augen des Lesers aufläuft, wird gelesen; eine, die schon
   dasteht, wird ueberflogen.

   Bei prefers-reduced-motion steht der Endwert sofort da.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/** Deutsche Schreibweise: Punkt als Tausendertrenner, Komma als Dezimalzeichen. */
function formatieren(wert: number, stellen: number) {
  return wert.toLocaleString("de-DE", {
    minimumFractionDigits: stellen,
    maximumFractionDigits: stellen,
  });
}

export function Zahl({
  bis,
  vor = "",
  nach = "",
  stellen = 0,
  dauer = 1.4,
  className,
}: {
  /** Endwert. */
  bis: number;
  /** Text davor, etwa „Ø +" oder „−". */
  vor?: string;
  /** Text danach, etwa „ %" oder „+". */
  nach?: string;
  /** Nachkommastellen. */
  stellen?: number;
  dauer?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const drin = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [wert, setWert] = useState(reduce ? bis : 0);

  useEffect(() => {
    if (!drin || reduce) return;
    const steuerung = animate(0, bis, {
      duration: dauer,
      ease: EASE,
      onUpdate: (v) => setWert(v),
    });
    return () => steuerung.stop();
  }, [drin, reduce, bis, dauer]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {vor}
      {formatieren(wert, stellen)}
      {nach}
    </span>
  );
}
