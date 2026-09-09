"use client";

import { Pille } from "../ui/SectionHeading";
import type { Woerterbuch } from "@/lib/woerter";
import { FlaggeForm } from "../ui/Flagge";

/* ============================================================
   Die Marktplatzgrafik.

   Elf Fassungen liegen dahinter, alle in Code gezeichnet. Der Fehler war lange
   derselbe: die Kugel war dunkel und damit eine andere Bildfamilie als die
   uebrigen Illustrationen. Dann hat der Kunde eine Referenz geschickt, und
   zuletzt das Bild selbst als Datei. Es ist freigestellt, im Stil der uebrigen
   3D-Bilder, und zeigt genau das, was die Sektion sagt.

   Deshalb steht hier jetzt das Bild und keine Zeichnung mehr. Die gezeichnete
   Fassung (helle Kugel aus Natural-Earth-Umrissen, Nadeln als Tropfen,
   leuchtende Bogen) liegt in der Geschichte unter „Marktplatzgrafik nach der
   Referenz des Kunden neu gebaut" und laesst sich zurueckholen.

   Keine Bewegung: der Kunde will hier keine Animation.
   ============================================================ */

/** Die Kuerzel der Maerkte, die im Bild eine Nadel tragen, in der Reihenfolge
 *  der Namen im Woerterbuch. Grossbritannien ist nicht dabei: eine Fahne in
 *  der Liste, die im Bild fehlt, faellt sofort auf. */
const MAERKTE = ["DE", "FR", "IT", "ES", "NL", "BE", "PL", "SE", "US"];

export function Weltkugel({ bildAlt }: { bildAlt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/bilder/s-international-kugel.webp"
      alt={bildAlt}
      width={1600}
      height={900}
      loading="lazy"
      className="w-full"
    />
  );
}

/**
 * Sektion um die Kugel: links die Grafik, rechts der Text.
 *
 * Grafik oben und Text darunter machte aus einer kurzen Aussage eine sehr hohe
 * Sektion.
 */
export function MarktSektion({
  eyebrow,
  title,
  text,
  w,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  w: Woerterbuch["leistungen"]["weltkugel"];
}) {
  return (
    <section className="ground-tint relative isolate py-16 md:py-24">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <div className="mx-auto w-full min-w-0 max-w-[46rem]">
            <Weltkugel bildAlt={w.bildAlt} />
            {/* Auf dem Telefon ist die Grafik rund dreihundert Pixel breit, eine
                Fahne darin waere sieben Pixel gross. Deshalb stehen die Namen
                dort noch einmal als Liste darunter. */}
            <ul className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
              {MAERKTE.map((code, i) => (
                <li
                  key={code}
                  className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[0_6px_16px_-10px_rgba(60,90,125,0.6)] ring-1 ring-navy/[0.08]"
                >
                  <svg width="20" height="14" viewBox="-13 -9 26 18" aria-hidden className="shrink-0 rounded-[2px]">
                    <FlaggeForm code={code} />
                  </svg>
                  <span className="text-[0.8rem] font-bold text-ink">{w.laender[i]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {eyebrow && <Pille>{eyebrow}</Pille>}
            <h2 className="title mt-6 max-w-[18ch] text-balance text-[clamp(1.9rem,1.3rem+1.7vw,2.9rem)] text-ink">
              {title}
            </h2>
            {text && <p className="mt-5 max-w-[42ch] text-pretty text-lead text-ink-muted">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
