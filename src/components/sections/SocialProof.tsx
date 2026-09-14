"use client";

import Image from "next/image";
import { kundenlogos } from "@/lib/marken";

/* ============================================================
   Der Logostreifen auf der Seite Case Studies.

   Er zeigt dieselben vierzehn Marken wie das Band der Startseite, nur auf
   hellem Grund und in Graustufen. Die Liste kommt aus `lib/marken`, damit
   beide Stellen nicht auseinanderlaufen.

   Frueher stand unter dem Streifen eine Zeile mit „4,9 / 5 Kundenbewertung",
   „21 Mio € betreuter Jahresumsatz" und „98 % Kundenbindung", dazu eine
   Ueberschrift. Sie war seit der Umstellung auf `bare` nicht mehr zu sehen,
   stand fest auf Deutsch im Code und nannte eine Bewertung, die es so nicht
   gibt: belegt sind 5,0 bei Google und 4,5 bei Trustpilot (`lib/bewertungen`).
   Toter Code mit falschen Zahlen ist gefaehrlich, weil ihn beim naechsten Mal
   jemand wiederverwendet. Er ist deshalb geloescht.
   ============================================================ */

export function ProofStrip({ logoAlt }: { logoAlt: string }) {
  return (
    <section className="ground-tint relative py-12 md:py-14">
      <div className="container-x">
        <div className="relative overflow-hidden">
          {/* Die Kanten laufen ueber eine Maske aus, nicht ueber zwei
              Verlaufsflaechen in der Farbe des Grundes: der Grund ist selbst
              ein Verlauf, eine einzelne Farbe darueber trifft ihn nie genau
              und zeichnet eine Kante. */}
          <div
            className="flex w-max animate-marquee gap-12"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, #000 4rem, #000 calc(100% - 4rem), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, #000 4rem, #000 calc(100% - 4rem), transparent 100%)",
            }}
          >
            {/* Zweimal dieselbe Reihe, damit das Band endlos laeuft. Die
                zweite Haelfte traegt `aria-hidden`, sonst sagt ein
                Vorleseprogramm die vierzehn Marken doppelt an. */}
            {[...kundenlogos, ...kundenlogos].map((l, i) => (
              <div
                key={`${l.datei}-${i}`}
                aria-hidden={i >= kundenlogos.length || undefined}
                className="relative h-9 w-28 shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-10 md:w-32"
              >
                <Image
                  src={l.datei}
                  alt={logoAlt.replace("{marke}", l.marke)}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
