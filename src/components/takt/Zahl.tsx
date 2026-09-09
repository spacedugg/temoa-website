"use client";

import { usePathname } from "next/navigation";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { spracheAusPfad, type Sprache } from "@/lib/i18n";

/* ============================================================
   Zahl: zaehlt hoch, sobald sie im Bild ist.

   Belegte Kennzahlen standen als fertiger Text auf der Seite. Eine Zahl,
   die vor den Augen des Lesers aufläuft, wird gelesen; eine, die schon
   dasteht, wird ueberflogen.

   Bei prefers-reduced-motion steht der Endwert sofort da.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Die Schreibweise haengt an der Sprache, und zwar in beide Richtungen: im
   Deutschen trennt der Punkt die Tausender und das Komma die Dezimalen, im
   Englischen genau umgekehrt. Wer das verwechselt, macht aus „1.68M" die Zahl
   168 und aus „+37.3 %" die Zahl 373. Beides ist auf einer Seite mit
   Leistungszahlen kein Schoenheitsfehler.

   Die Komponente liest die Sprache selbst aus dem Pfad, wie Kopf- und
   Fusszeile. Als Prop koennte ein Aufrufer sie vergessen, und dann stuende
   die falsche Zahl da, ohne dass es auffaellt. */
const LAND: Record<Sprache, string> = { de: "de-DE", en: "en-US" };

function formatieren(wert: number, stellen: number, sprache: Sprache) {
  return wert.toLocaleString(LAND[sprache], {
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
  const sprache = spracheAusPfad(usePathname());
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
      {formatieren(wert, stellen, sprache)}
      {nach}
    </span>
  );
}

/**
 * Zerlegt einen fertig formatierten Wert in Vorzeichen, Zahl und Einheit.
 *
 * Die Kennzahlen der Case Studies liegen als Text vor: „+147 %", „−19,4 %",
 * „×3,2", „392.327 €" auf Deutsch, "+147%", "−19.4%", "×3.2", "€1,677,538"
 * auf Englisch. Statt die Daten umzubauen, liest diese Funktion die Zahl
 * heraus und laesst alles davor und danach stehen.
 *
 * Welches Zeichen trennt und welches teilt, sagt die Sprache. Dieselbe
 * Zeichenkette bedeutet in beiden etwas anderes: „1.68" sind auf Deutsch
 * 168 und auf Englisch 1,68.
 */
function zerlegen(text: string, sprache: Sprache) {
  const [tausender, dezimal] = sprache === "de" ? [".", ","] : [",", "."];
  const q = (z: string) => `\\${z}`;
  const m = text.match(new RegExp(`^(\\D*?)([\\d${q(tausender)}]+(?:${q(dezimal)}\\d+)?)(.*)$`));
  if (!m) return null;
  const [, vor, zahl, nach] = m;
  const stellen = zahl.includes(dezimal) ? zahl.split(dezimal)[1].length : 0;
  const bis = Number(zahl.split(tausender).join("").replace(dezimal, "."));
  if (!Number.isFinite(bis)) return null;
  return { vor, bis, nach, stellen };
}

/**
 * Kennzahl, die als fertiger Text vorliegt, und trotzdem hochzaehlt.
 *
 * Laesst sich kein Zahlenteil finden (etwa bei „Kostenlos"), steht der Text
 * unveraendert da. Damit ist der Aufruf immer sicher.
 */
export function ZahlText({ text, dauer, className }: { text: string; dauer?: number; className?: string }) {
  const teile = zerlegen(text, spracheAusPfad(usePathname()));
  if (!teile) return <span className={className}>{text}</span>;
  return (
    <Zahl
      bis={teile.bis}
      vor={teile.vor}
      nach={teile.nach}
      stellen={teile.stellen}
      dauer={dauer}
      className={className}
    />
  );
}
