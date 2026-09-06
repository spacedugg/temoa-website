"use client";

import { Pille } from "../ui/SectionHeading";

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

/** Die Maerkte, die im Bild eine Nadel tragen. Grossbritannien ist nicht dabei. */
const MAERKTE = [
  { code: "DE", name: "Deutschland" },
  { code: "FR", name: "Frankreich" },
  { code: "IT", name: "Italien" },
  { code: "ES", name: "Spanien" },
  { code: "NL", name: "Niederlande" },
  { code: "BE", name: "Belgien" },
  { code: "PL", name: "Polen" },
  { code: "SE", name: "Schweden" },
  { code: "US", name: "USA" },
];

/* ---------------- Flaggen ----------------
   Nur fuer die Liste auf dem Telefon. Alle Fahnen sind auf den Nullpunkt
   zentriert, `b` breit und `h` hoch. Keine Schrift, keine Wappen. */

function Waagerecht({ farben, b, h }: { farben: string[]; b: number; h: number }) {
  const s = h / farben.length;
  return (
    <>
      {farben.map((f, i) => (
        <rect key={i} x={-b / 2} y={-h / 2 + i * s} width={b} height={s} fill={f} />
      ))}
    </>
  );
}

function Senkrecht({ farben, b, h }: { farben: string[]; b: number; h: number }) {
  const s = b / farben.length;
  return (
    <>
      {farben.map((f, i) => (
        <rect key={i} x={-b / 2 + i * s} y={-h / 2} width={s} height={h} fill={f} />
      ))}
    </>
  );
}

function Flagge({ code, b = 26, h = 18 }: { code: string; b?: number; h?: number }) {
  switch (code) {
    case "DE":
      return <Waagerecht farben={["#000000", "#DD0000", "#FFCE00"]} b={b} h={h} />;
    case "FR":
      return <Senkrecht farben={["#002395", "#FFFFFF", "#ED2939"]} b={b} h={h} />;
    case "IT":
      return <Senkrecht farben={["#008C45", "#F4F5F0", "#CD212A"]} b={b} h={h} />;
    case "NL":
      return <Waagerecht farben={["#AE1C28", "#FFFFFF", "#21468B"]} b={b} h={h} />;
    case "BE":
      return <Senkrecht farben={["#000000", "#FAE042", "#ED2939"]} b={b} h={h} />;
    case "PL":
      return <Waagerecht farben={["#FFFFFF", "#DC143C"]} b={b} h={h} />;
    case "ES":
      return (
        <>
          <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#AA151B" />
          <rect x={-b / 2} y={-h / 4} width={b} height={h / 2} fill="#F1BF00" />
        </>
      );
    case "SE":
      return (
        <>
          <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#005293" />
          <rect x={-b / 2 + b * 0.28} y={-h / 2} width={b * 0.16} height={h} fill="#FECB00" />
          <rect x={-b / 2} y={-h * 0.09} width={b} height={h * 0.18} fill="#FECB00" />
        </>
      );
    case "US":
      return (
        <>
          <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#FFFFFF" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect
              key={i}
              x={-b / 2}
              y={-h / 2 + i * (h / 13)}
              width={b}
              height={h / 13}
              fill="#B31942"
            />
          ))}
          <rect x={-b / 2} y={-h / 2} width={b * 0.42} height={h * 0.54} fill="#0A3161" />
        </>
      );
    default:
      return <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#123A55" />;
  }
}

export function Weltkugel() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/bilder/s-international-kugel.webp"
      alt="Eine Weltkugel mit Blick über den Atlantik. In Deutschland, Frankreich, Italien, Spanien, den Niederlanden, Belgien, Polen, Schweden und den USA steckt je eine Fahne. Von Deutschland laufen leuchtende Linien zu allen anderen Märkten."
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
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="ground-tint relative isolate py-16 md:py-24">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <div className="mx-auto w-full min-w-0 max-w-[46rem]">
            <Weltkugel />
            {/* Auf dem Telefon ist die Grafik rund dreihundert Pixel breit, eine
                Fahne darin waere sieben Pixel gross. Deshalb stehen die Namen
                dort noch einmal als Liste darunter. */}
            <ul className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
              {MAERKTE.map((m) => (
                <li
                  key={m.code}
                  className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[0_6px_16px_-10px_rgba(60,90,125,0.6)] ring-1 ring-navy/[0.08]"
                >
                  <svg width="20" height="14" viewBox="-13 -9 26 18" aria-hidden className="shrink-0 rounded-[2px]">
                    <Flagge code={m.code} />
                  </svg>
                  <span className="text-[0.8rem] font-bold text-ink">{m.name}</span>
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
