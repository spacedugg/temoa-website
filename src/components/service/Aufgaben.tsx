"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { KachelVerlaufDefs, Piktogramm, type PiktogrammName } from "./Piktogramme";

/* ============================================================
   Die acht Aufgaben im Account-Management, jede mit eigenem Piktogramm.

   Vorher standen hier die allgemeinen Strich-Icons aus `ui/Icon`: Zielscheibe,
   Schild, Sternchen. Sie passten zum Teil gar nicht zum Text (eine Zielscheibe
   fuer Buy-Box-Monitoring sagt nichts) und sahen aus wie aus einem
   Icon-Paket gegriffen.

   Jetzt zeichnet jedes Piktogramm die Sache selbst: die Buy-Box zeigt einen
   Kaufknopf, der Bestand einen Fuellstand, der Test zwei Fassungen nebeneinander.
   Navy-Kachel, helle Formen, ein oranges Detail, und dieses Detail bewegt sich
   beim Zeigen. Dieselbe Sprache wie die uebrigen Illustrationen der Website.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

export function Aufgaben({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: { name: PiktogrammName; title: string; body: string }[];
}) {
  const reduce = useReducedMotion();

  return (
    <section className="ground-tint relative isolate py-20 md:py-24">
      <KachelVerlaufDefs />
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} size="compact" title={title} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              className="panel panel-lift flex h-full flex-col p-6"
              initial="ruhe"
              whileInView="an"
              whileHover={reduce ? undefined : "zeig"}
              viewport={{ once: true, margin: "-12% 0px" }}
              variants={{
                ruhe: { opacity: 0, y: 18 },
                an: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: i * 0.05 } },
              }}
            >
              <Piktogramm name={it.name} />
              <h3 className="mt-5 text-[1.05rem] font-bold leading-snug text-ink">{it.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-ink-muted">{it.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
