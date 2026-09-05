"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";

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

const GRUND = "#0E2C43";
const HELL = "#CFE4F2";
const HELL_LEISE = "rgba(207,228,242,0.4)";
const ORANGE = "#FF9900";

export type PiktogrammName =
  | "buybox"
  | "bestand"
  | "ticket"
  | "katalog"
  | "richtlinie"
  | "test"
  | "pricing"
  | "termin";

/* Die Kachel. Der Inhalt kommt als Kind, die Bewegung steuert die Karte
   darueber ueber Varianten: „an" beim Einlaufen, „zeig" beim Zeigen. */
function Kachel({ children }: { children: React.ReactNode }) {
  return (
    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="14" fill={GRUND} />
      <rect width="48" height="48" rx="14" fill="url(#kachel-licht)" />
      {children}
    </svg>
  );
}

/* Der Lichtverlauf liegt einmal im Dokument, nicht in jeder Kachel. */
function KachelVerlauf() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <linearGradient id="kachel-licht" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const wisch: Variants = {
  ruhe: { pathLength: 0, opacity: 0 },
  an: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

function Piktogramm({ name }: { name: PiktogrammName }) {
  switch (name) {
    /* Buy-Box: eine Produktkarte mit Kaufknopf. Der Knopf leuchtet auf,
       wenn man die Karte anfasst. */
    case "buybox":
      return (
        <Kachel>
          <rect x="10" y="9" width="28" height="30" rx="4" fill="rgba(255,255,255,0.07)" stroke={HELL_LEISE} />
          <rect x="14" y="14" width="12" height="3" rx="1.5" fill={HELL} />
          <rect x="14" y="20" width="8" height="2.4" rx="1.2" fill={HELL_LEISE} />
          <motion.rect
            x="14"
            y="27"
            width="20"
            height="7"
            rx="3.5"
            fill={ORANGE}
            variants={{ ruhe: { opacity: 0, y: 4 }, an: { opacity: 1, y: 0 }, zeig: { opacity: 1, y: -1 } }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </Kachel>
      );

    /* Bestand: drei Kartons und ein Fuellstand, der sich auffuellt. */
    case "bestand":
      return (
        <Kachel>
          <rect x="9" y="26" width="10" height="12" rx="2" fill="rgba(255,255,255,0.1)" stroke={HELL_LEISE} />
          <rect x="21" y="20" width="10" height="18" rx="2" fill="rgba(255,255,255,0.1)" stroke={HELL_LEISE} />
          <rect x="9" y="30" width="10" height="1.6" fill={HELL_LEISE} />
          <rect x="21" y="24" width="10" height="1.6" fill={HELL_LEISE} />
          <rect x="34" y="10" width="6" height="28" rx="3" fill="rgba(255,255,255,0.08)" stroke={HELL_LEISE} />
          <motion.rect
            x="34"
            y="10"
            width="6"
            height="28"
            rx="3"
            fill={ORANGE}
            style={{ transformOrigin: "37px 38px" }}
            variants={{ ruhe: { scaleY: 0.12 }, an: { scaleY: 0.42 }, zeig: { scaleY: 0.9 } }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </Kachel>
      );

    /* Cases: eine Anfrage geht raus, die Antwort kommt zurueck. */
    case "ticket":
      return (
        <Kachel>
          <path
            d="M10 13a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-9l-5 4v-4h-.5a3 3 0 0 1-2.5-3v-7Z"
            fill="rgba(255,255,255,0.1)"
            stroke={HELL_LEISE}
          />
          <rect x="14" y="15" width="12" height="2.2" rx="1.1" fill={HELL} />
          <motion.path
            d="M20 30h11a4 4 0 0 1 4 4v4"
            stroke={ORANGE}
            strokeWidth="2"
            strokeLinecap="round"
            variants={wisch}
          />
          <motion.circle
            cx="35"
            cy="38"
            r="2.6"
            fill={ORANGE}
            variants={{ ruhe: { scale: 0 }, an: { scale: 1 }, zeig: { scale: 1.25 } }}
            style={{ transformOrigin: "35px 38px" }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.4 }}
          />
        </Kachel>
      );

    /* Katalog: eine Tabelle, in die eine neue Zeile einlaeuft. */
    case "katalog":
      return (
        <Kachel>
          <rect x="9" y="10" width="30" height="28" rx="4" fill="rgba(255,255,255,0.07)" stroke={HELL_LEISE} />
          <path d="M9 18h30M20 10v28" stroke={HELL_LEISE} />
          <rect x="12" y="21" width="5" height="2.2" rx="1.1" fill={HELL} />
          <rect x="23" y="21" width="12" height="2.2" rx="1.1" fill={HELL_LEISE} />
          <rect x="12" y="27" width="5" height="2.2" rx="1.1" fill={HELL} />
          <rect x="23" y="27" width="9" height="2.2" rx="1.1" fill={HELL_LEISE} />
          <motion.g
            variants={{ ruhe: { opacity: 0, x: -6 }, an: { opacity: 1, x: 0 }, zeig: { opacity: 1, x: 2 } }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
          >
            <rect x="12" y="33" width="5" height="2.2" rx="1.1" fill={ORANGE} />
            <rect x="23" y="33" width="11" height="2.2" rx="1.1" fill={ORANGE} opacity="0.55" />
          </motion.g>
        </Kachel>
      );

    /* Richtlinien: ein Dokument, das geprueft wird. Der Haken zeichnet sich. */
    case "richtlinie":
      return (
        <Kachel>
          <path
            d="M13 9h13l8 8v22a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Z"
            fill="rgba(255,255,255,0.08)"
            stroke={HELL_LEISE}
          />
          <path d="M26 9v8h8" stroke={HELL_LEISE} />
          <rect x="15" y="21" width="12" height="2.2" rx="1.1" fill={HELL_LEISE} />
          <rect x="15" y="26" width="8" height="2.2" rx="1.1" fill={HELL_LEISE} />
          <motion.path
            d="M16 33.5l4 4 9-9"
            stroke={ORANGE}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={wisch}
          />
        </Kachel>
      );

    /* Test: zwei Fassungen nebeneinander, die Messung springt auf die zweite. */
    case "test":
      return (
        <Kachel>
          <rect x="8" y="12" width="14" height="24" rx="3" fill="rgba(255,255,255,0.08)" stroke={HELL_LEISE} />
          <rect x="26" y="12" width="14" height="24" rx="3" fill="rgba(255,255,255,0.08)" stroke={HELL_LEISE} />
          <rect x="11" y="16" width="8" height="6" rx="1.5" fill={HELL_LEISE} />
          <rect x="29" y="16" width="8" height="6" rx="1.5" fill={HELL} />
          <rect x="11" y="25" width="6" height="2" rx="1" fill={HELL_LEISE} />
          <rect x="29" y="25" width="6" height="2" rx="1" fill={HELL_LEISE} />
          <motion.rect
            x="26"
            y="12"
            width="14"
            height="24"
            rx="3"
            fill="none"
            stroke={ORANGE}
            strokeWidth="2"
            variants={{
              ruhe: { opacity: 0, x: -18 },
              an: { opacity: 1, x: 0 },
              zeig: { opacity: 1, x: -18 },
            }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
          />
        </Kachel>
      );

    /* Pricing: ein Regler, der die Marge sucht. */
    case "pricing":
      return (
        <Kachel>
          <path
            d="M23 9h9a3 3 0 0 1 3 3v9L21 35a3 3 0 0 1-4 0l-8-8a3 3 0 0 1 0-4L23 9Z"
            fill="rgba(255,255,255,0.08)"
            stroke={HELL_LEISE}
          />
          <circle cx="29" cy="15" r="2.4" fill={HELL} />
          <rect x="9" y="39" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.16)" />
          <motion.circle
            cx="17"
            cy="40.5"
            r="4"
            fill={ORANGE}
            variants={{ ruhe: { x: -6, opacity: 0 }, an: { x: 0, opacity: 1 }, zeig: { x: 13, opacity: 1 } }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </Kachel>
      );

    /* Termin: ein Kalender mit einem gesetzten Tag. */
    case "termin":
      return (
        <Kachel>
          <rect x="9" y="12" width="30" height="27" rx="4" fill="rgba(255,255,255,0.07)" stroke={HELL_LEISE} />
          <path d="M9 20h30" stroke={HELL_LEISE} />
          <path d="M17 9v6M31 9v6" stroke={HELL} strokeWidth="2.4" strokeLinecap="round" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <circle key={`${r}-${c}`} cx={15 + c * 6} cy={25 + r * 5} r="1.4" fill={HELL_LEISE} />
            ))
          )}
          <motion.circle
            cx="27"
            cy="30"
            r="4.2"
            fill={ORANGE}
            style={{ transformOrigin: "27px 30px" }}
            variants={{ ruhe: { scale: 0 }, an: { scale: 1 }, zeig: { scale: 1.2 } }}
            transition={{ type: "spring", stiffness: 320, damping: 15, delay: 0.3 }}
          />
        </Kachel>
      );
  }
}

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
      <KachelVerlauf />
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
