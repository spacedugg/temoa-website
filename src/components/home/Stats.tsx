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
const stats: { to: number; prefix?: string; suffix: string; label: string; wachstum?: boolean }[] = [
  { to: 30, prefix: "Ø +", suffix: " %", label: "Profitabilitätssteigerung", wachstum: true },
  { to: 21, suffix: " Mio. €", label: "betreuter Amazon-Jahresumsatz" },
  { to: 60, suffix: "+", label: "betreute Marken" },
  { to: 5, suffix: "+", label: "internationale Marktplätze" },
];

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
export function Stats({ tone = "blue" }: { tone?: "blue" | "white" }) {
  return (
    <section className={`section-y-sm relative ${tone === "blue" ? "ground-tint" : "ground"}`}>
      <div className="container-x">
        <RevealGroup
          className="grid grid-cols-2 gap-y-7 overflow-hidden rounded-[1.75rem] p-6 md:grid-cols-4 md:gap-y-0 md:p-8 md:divide-x md:divide-white/[0.08]"
          stagger={0.08}
          style={{
            background:
              "radial-gradient(110% 90% at 88% -20%, rgba(255,153,0,0.22), transparent 58%), linear-gradient(150deg, #10314a 0%, #0a2035 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07), 0 30px 70px -40px rgba(4,20,34,0.8)",
          }}
        >
          {stats.map((s, i) => (
            <RevealItem key={s.label} className={i === 0 ? "md:pr-6" : i === stats.length - 1 ? "md:pl-6" : "md:px-6"}>
              <div className="flex h-full flex-col justify-between gap-3">
                <span
                  className="num text-[clamp(1.9rem,1.3rem+1.5vw,2.6rem)] leading-none"
                  style={s.wachstum ? { color: "#6EE7A0" } : { color: "#ffffff" }}
                >
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </span>
                <p className="text-[0.82rem] leading-snug text-chalk-muted">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
