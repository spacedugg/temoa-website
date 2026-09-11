"use client";

import { Counter } from "../ui/Counter";
import { RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * Kennzahlenband.
 *
 * Vorher standen die vier Zahlen nackt auf dem Grund, jede mit einem kurzen
 * orangen Strich darunter. Das Theme fuehrt Kennzahlen als Karten, damit sie
 * als Block lesbar sind und nicht als Text im Weissraum.
 */
/* Nur die Werte stehen hier. Vorzeichen, Einheit und Beschriftung kommen von
   aussen: „Ø" und „Mio." sind deutsche Abkuerzungen, im Englischen heissen
   sie anders. */
/* Die Werte stehen hier und werden von der Startseite mitbenutzt: das
   Kennzahlenband laeuft dort im „Nachweis" mit, damit dieselben vier Zahlen
   nicht an zwei Stellen gepflegt werden muessen. */
export const KENNZAHL_WERTE = [30, 21, 60, 5];
const werte = KENNZAHL_WERTE;
/* Die erste Zahl ist eine Steigerung und traegt deshalb Gruen. */
export const WACHSTUM = 0;

/* Der gruene Pfeil stand nur an der ersten Zahl und sass wegen der
   Aufteilung optisch vor der zweiten. Ein Zeichen, das nur an einer von vier
   Zahlen haengt, liest sich als Fehler. Die Steigerung traegt jetzt die Farbe:
   gruen steht auf dieser Website fuer ein Ergebnis, die anderen drei Zahlen
   sind Bestand und bleiben weiss. */

/**
 * Vier weisse Kacheln auf hellblauem Grund waren zwischen den anderen hellen
 * Sektionen kaum zu sehen. Jetzt stehen sie zusammen auf einem Navy-Podest:
 * ein Block statt vier blasser Kaesten, die Zahlen weiss, der Trendpfeil
 * gruen.
 */
/**
 * Kennzahlenband, ueber die volle Breite.
 *
 * Vorher lagen die vier Zahlen als Navy-Kasten in einer hellen Sektion: eine
 * Box in einer Sektion, die selbst schon eine andere Farbe hatte, und der
 * Inhalt lief nicht ueber die Breite. Jetzt traegt die Sektion das Navy
 * selbst, die Zahlen stehen frei darauf.
 *
 * `tone` bleibt in der Signatur, damit die Aufrufe unveraendert laufen.
 */
export function Stats({
  tone,
  kennzahlen,
}: {
  tone?: "blue" | "white";
  kennzahlen: { vor: string; nach: string; label: string }[];
}) {
  void tone;
  return (
    <section className="on-dark ground-deep relative isolate overflow-hidden py-12 md:py-16">
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-[-40%] h-[26rem] w-[26rem] rounded-full opacity-70 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.22), transparent 68%)" }}
      />
      <div className="container-x relative">
        <RevealGroup
          className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-white/[0.1]"
          stagger={0.08}
        >
          {kennzahlen.map((k, i) => (
            <RevealItem
              key={k.label}
              className={i === 0 ? "md:pr-8" : i === werte.length - 1 ? "md:pl-8" : "md:px-8"}
            >
              <div className="flex h-full flex-col justify-between gap-3">
                <span
                  className="num text-[clamp(2rem,1.3rem+1.9vw,3rem)] leading-none"
                  style={i === WACHSTUM ? { color: "#6EE7A0" } : { color: "#ffffff" }}
                >
                  <Counter to={werte[i]} prefix={k.vor} suffix={k.nach} />
                </span>
                <p className="text-[0.85rem] leading-snug text-chalk-muted">{k.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
