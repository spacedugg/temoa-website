"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Station } from "../takt/Station";
import { Gespraech } from "../takt/Gespraech";
import { gruender, members, candids, candidsWeiter, type Person } from "@/lib/team";

/* ============================================================
   Die Team-Seite.

   Drei Fassungen liegen dahinter. Erst drei Sektionen mit je eigener Ansage
   („Die drei, mit denen ihr sprecht", „Neun, die taeglich an euren Konten
   arbeiten", „Fuenf Bereiche, ein Konto"). Dann dieselbe Aufstellung, aber die
   Farbe lag nur auf der Rolle: weisse Karten mit einem farbigen Woertchen.

   Jetzt traegt die Karte selbst die Farbe. Die Sektion „Fuenf Bereiche" ist
   weg, das Band mit den Bereichen auch: beides steht schon auf der Startseite.
   Die Aufnahmen aus dem Buero stehen nicht mehr in einer eigenen Sektion,
   sondern neben den Gruendern.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Eine Farbe je Person. Bewusst keine Markenfarbe: die Seite soll Leben
   bekommen, nicht das Logo wiederholen. */
const FARBEN = [
  "#1F9C90",
  "#5B6BDD",
  "#E05B48",
  "#2F86D8",
  "#2FAE79",
  "#D2568C",
  "#7E58CE",
  "#C08A1E",
  "#3AA5BE",
  "#4E9C52",
  "#D45C79",
  "#3C82AC",
];

/** Farbe mit Weiss mischen, damit die Karte lesbar bleibt. */
function hell(hex: string, anteil: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const m = (c: number) => Math.round(c + (255 - c) * anteil);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
}

function Karte({ p, farbe, gross = false }: { p: Person; farbe: string; gross?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col rounded-[1.25rem] transition-transform duration-500 ease-temoa hover:-translate-y-1 ${gross ? "p-4" : "p-3"}`}
      style={{
        background: hell(farbe, 0.86),
        boxShadow: `inset 0 0 0 1px ${hell(farbe, 0.55)}, 0 18px 34px -22px ${hell(farbe, 0.1)}`,
      }}
    >
      <span className="block overflow-hidden rounded-[0.9rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.src}
          alt={p.name}
          loading="lazy"
          className={`w-full object-cover ${gross ? "aspect-[4/5]" : "aspect-square"}`}
        />
      </span>
      <p className={`mt-3 font-bold leading-tight text-ink ${gross ? "text-[1.1rem]" : "text-[0.9rem]"}`}>
        {p.name}
      </p>
      <p className={`mt-0.5 leading-snug ${gross ? "text-[0.8rem]" : "text-[0.72rem]"}`} style={{ color: farbe }}>
        {p.rolle}
      </p>
    </div>
  );
}

export function TeamBody() {
  const reduce = useReducedMotion();
  const auf = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
  });

  /* Die vier Aufnahmen aus dem Buero. Sie standen in einer eigenen Sektion und
     stehen jetzt neben den Gruendern. */
  const aufnahmen = [...candids.slice(1), ...candidsWeiter].slice(0, 4);

  return (
    <>
      {/* Kopf: links die Ansage, rechts das Bild der drei Gruender. */}
      <section className="ground relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <span aria-hidden className="halo pointer-events-none -right-32 -top-40 h-[38rem] w-[38rem]" />
        <div className="container-x relative">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_20px_-14px_rgba(13,36,57,0.3)]">
                <span aria-hidden className="node-glow" />
                <span className="text-label font-bold uppercase text-ink-soft">Team</span>
              </span>
              <h1 className="display mt-6 max-w-[14ch] text-balance text-[clamp(2.2rem,1.5rem+2.3vw,3.3rem)] text-ink">
                Das ist <span className="em mark">temoa.</span>
              </h1>
              <p className="mt-7 max-w-[46ch] text-pretty text-lead text-ink-muted">
                Drei Gründer und neun Kolleginnen und Kollegen. Jeder hat einen Bereich, und an jedem
                Sortiment arbeiten mehrere gleichzeitig.
              </p>
            </div>

            <motion.div
              {...auf(0.1)}
              className="overflow-hidden rounded-[1.5rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_34px_60px_-32px_rgba(13,36,57,0.45)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={candids[0]} alt="Die Gründer von temoa" className="aspect-[16/10] w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alle zwoelf. Keine Ueberschrift: die Bezeichnung sagt bereits alles,
          und darunter stehen die Namen. */}
      <Station label="12 Amazon-Spezialisten" tone="tint">
        {/* `items-start`: sonst zieht die Bildspalte rechts die
            Gruenderkarten auf ihre Hoehe und unter dem Namen steht eine leere
            Farbflaeche. */}
        <div className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {gruender.map((g, i) => (
              <motion.div key={g.name} {...auf(i * 0.06)} className="h-full">
                <Karte p={g} farbe={FARBEN[i]} gross />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {aufnahmen.map((src, i) => (
              <motion.div
                key={src}
                {...auf(0.1 + i * 0.05)}
                className="overflow-hidden rounded-[1.25rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_20px_38px_-24px_rgba(13,36,57,0.4)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {members.map((m, i) => (
            <motion.div key={m.name} {...auf(0.03 + i * 0.03)} className="h-full">
              <Karte p={m} farbe={FARBEN[(i + gruender.length) % FARBEN.length]} />
            </motion.div>
          ))}
        </div>
      </Station>

      <Gespraech title="Lernt uns im Gespräch kennen." />
    </>
  );
}
