"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { SectionHeading } from "../ui/SectionHeading";

/* ============================================================
   Der Globus auf der Internationalisierungsseite.

   Vier Fassungen liegen dahinter. Ein gezeichneter Umriss Westeuropas, der
   aus zwanzig Stuetzpunkten wie ein grauer Klecks aussah. Eine Punktkugel mit
   namenlosen Knoten, die stillstand. Eine drehende Punktkugel mit einem
   Flaggenring darum: die Flaggen liefen durch den Rand und wurden
   angeschnitten, und die Laender standen trotzdem als Liste darunter.

   Jetzt ist die Kugel ein weiches 3D-Bild im Stil der uebrigen
   Illustrationen (`/bilder/s-international-globus.webp`, freigestellt), und
   die Marktplaetze sitzen als Flaggenschilder daneben, jedes mit einer feinen
   Linie auf seinen Punkt auf der Kugel. Damit steht der Name am Land, und die
   Liste unter der Grafik entfaellt.

   Warum nicht alles aus dem Bildmodell: Flaggen und Beschriftungen setzt ein
   Modell falsch, das war in der Referenz des Kunden selbst zu sehen. Der
   Grund kommt aus der Datei, jede Beschriftung zeichnet der Code.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* ---------------- Flaggen ---------------- */

/* Gezeichnet in einem Quadrat von -9 bis 9, rund beschnitten. */

function Waagerecht({ farben }: { farben: string[] }) {
  const h = 18 / farben.length;
  return (
    <>
      {farben.map((f, i) => (
        <rect key={i} x={-9} y={-9 + i * h} width={18} height={h} fill={f} />
      ))}
    </>
  );
}

function Senkrecht({ farben }: { farben: string[] }) {
  const b = 18 / farben.length;
  return (
    <>
      {farben.map((f, i) => (
        <rect key={i} x={-9 + i * b} y={-9} width={b} height={18} fill={f} />
      ))}
    </>
  );
}

function Flagge({ code }: { code: string }) {
  switch (code) {
    case "DE":
      return <Waagerecht farben={["#000000", "#DD0000", "#FFCE00"]} />;
    case "FR":
      return <Senkrecht farben={["#002395", "#FFFFFF", "#ED2939"]} />;
    case "IT":
      return <Senkrecht farben={["#008C45", "#F4F5F0", "#CD212A"]} />;
    case "NL":
      return <Waagerecht farben={["#AE1C28", "#FFFFFF", "#21468B"]} />;
    case "BE":
      return <Senkrecht farben={["#000000", "#FAE042", "#ED2939"]} />;
    case "PL":
      return <Waagerecht farben={["#FFFFFF", "#DC143C"]} />;
    case "ES":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#AA151B" />
          <rect x={-9} y={-4.5} width={18} height={9} fill="#F1BF00" />
        </>
      );
    case "SE":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#005293" />
          <rect x={-3.4} y={-9} width={3.6} height={18} fill="#FECB00" />
          <rect x={-9} y={-1.8} width={18} height={3.6} fill="#FECB00" />
        </>
      );
    case "UK":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#012169" />
          <path d="M-9-9L9 9M9-9L-9 9" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M-9-9L9 9M9-9L-9 9" stroke="#C8102E" strokeWidth="1.8" />
          <path d="M0-9V9M-9 0H9" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0-9V9M-9 0H9" stroke="#C8102E" strokeWidth="3.4" />
        </>
      );
    case "US":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#FFFFFF" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} x={-9} y={-9 + i * (18 / 13)} width={18} height={18 / 13} fill="#B31942" />
          ))}
          <rect x={-9} y={-9} width={8.4} height={7.7} fill="#0A3161" />
          {[
            [-7.2, -7.2],
            [-4.2, -7.2],
            [-5.7, -5.4],
            [-7.2, -3.6],
            [-4.2, -3.6],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.7} fill="#FFFFFF" />
          ))}
        </>
      );
    case "CA":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#FFFFFF" />
          <rect x={-9} y={-9} width={5} height={18} fill="#D80621" />
          <rect x={4} y={-9} width={5} height={18} fill="#D80621" />
          <path
            d="M0-5.6l1.1 2.3 2.3-.6-.8 2.3 2.5 1.5-2.1 1 .5 2.1-2.3-.4-.3 2.4L0 6.9l-1.4-1.9-.3-2.4-2.3.4.5-2.1-2.1-1 2.5-1.5-.8-2.3 2.3.6z"
            fill="#D80621"
          />
        </>
      );
    case "MX":
      return (
        <>
          <Senkrecht farben={["#006847", "#FFFFFF", "#CE1126"]} />
          <circle cx={0} cy={0} r={2.6} fill="none" stroke="#7B5B2F" strokeWidth="1.2" />
        </>
      );
    default:
      return <rect x={-9} y={-9} width={18} height={18} fill="#123A55" />;
  }
}

/* ---------------- Marktplaetze ---------------- */

/**
 * `punkt` ist die Stelle auf der Kugel im Koordinatensystem des Bildes
 * (0 bis 1000 in beide Richtungen), `y` die Hoehe des Schildes am Rand.
 * Die Schilder stehen aussen, damit sich in Europa nichts ueberlagert und
 * nichts vom Rand abgeschnitten wird.
 */
type Markt = { code: string; name: string; punkt: [number, number]; y: number; seite: "links" | "rechts" };

const MAERKTE: Markt[] = [
  { code: "SE", name: "Schweden", punkt: [640, 200], y: 118, seite: "rechts" },
  { code: "PL", name: "Polen", punkt: [640, 300], y: 230, seite: "rechts" },
  { code: "NL", name: "Niederlande", punkt: [563, 300], y: 342, seite: "rechts" },
  { code: "DE", name: "Deutschland", punkt: [595, 307], y: 454, seite: "rechts" },
  { code: "UK", name: "Großbritannien", punkt: [505, 265], y: 566, seite: "rechts" },
  { code: "FR", name: "Frankreich", punkt: [550, 342], y: 678, seite: "rechts" },
  { code: "IT", name: "Italien", punkt: [620, 385], y: 790, seite: "rechts" },
  { code: "ES", name: "Spanien", punkt: [505, 385], y: 902, seite: "rechts" },
  { code: "CA", name: "Kanada", punkt: [230, 250], y: 250, seite: "links" },
  { code: "US", name: "USA", punkt: [215, 360], y: 430, seite: "links" },
  { code: "MX", name: "Mexiko", punkt: [140, 455], y: 610, seite: "links" },
];

const SCHILD_H = 62;
const RAND_RECHTS = 1030;
const RAND_LINKS = -30;

/** Breite eines Schildes: Flaggenscheibe, Text, Innenabstaende. */
function breite(name: string) {
  return 96 + name.length * 15.5;
}

function Schild({ m, id, index, reduce }: { m: Markt; id: string; index: number; reduce: boolean }) {
  const w = breite(m.name);
  const x = m.seite === "rechts" ? RAND_RECHTS : RAND_LINKS - w;
  const [px, py] = m.punkt;
  const start = m.seite === "rechts" ? RAND_RECHTS : RAND_LINKS;
  const griff = m.seite === "rechts" ? start - 150 : start + 150;
  const verzoegerung = 0.35 + index * 0.07;

  const linie = {
    initial: reduce ? undefined : { pathLength: 0, opacity: 0 },
    whileInView: reduce ? undefined : { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-15% 0px" } as const,
    transition: { duration: 0.6, delay: verzoegerung, ease: EASE },
  };

  return (
    <g>
      {/* Leitlinie vom Schild auf den Punkt. */}
      <motion.path
        d={`M${start},${m.y} C${griff},${m.y} ${(griff + px) / 2},${py} ${px},${py}`}
        fill="none"
        stroke="rgba(255,153,0,0.55)"
        strokeWidth="2.4"
        strokeLinecap="round"
        {...linie}
      />

      {/* Punkt auf der Kugel. */}
      <motion.g
        initial={reduce ? undefined : { opacity: 0, scale: 0.2 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ type: "spring", stiffness: 300, damping: 16, delay: verzoegerung + 0.35 }}
        style={{ transformOrigin: `${px}px ${py}px` }}
      >
        <circle cx={px} cy={py} r={13} fill="rgba(255,153,0,0.28)" />
        <circle cx={px} cy={py} r={6.5} fill="#FF9900" style={{ filter: "drop-shadow(0 0 8px rgba(255,153,0,0.9))" }} />
      </motion.g>

      {/* Das Schild: weisse Platte, Flagge, Name. */}
      <motion.g
        initial={reduce ? undefined : { opacity: 0, x: m.seite === "rechts" ? 18 : -18 }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.5, delay: verzoegerung + 0.1, ease: EASE }}
      >
        <rect
          x={x}
          y={m.y - SCHILD_H / 2}
          width={w}
          height={SCHILD_H}
          rx={SCHILD_H / 2}
          fill="#ffffff"
          stroke="rgba(11,31,52,0.08)"
          strokeWidth="2"
          style={{ filter: "drop-shadow(0 10px 20px rgba(11,31,52,0.14))" }}
        />
        <g transform={`translate(${x + 34} ${m.y}) scale(1.55)`}>
          <g clipPath={`url(#${id}-flagge)`}>
            <Flagge code={m.code} />
          </g>
          <circle r={9} fill="none" stroke="rgba(11,31,52,0.18)" strokeWidth="1.1" />
        </g>
        <text
          x={x + 62}
          y={m.y + 10}
          fill="#0A1E2B"
          fontSize="29"
          fontWeight="700"
          style={{ letterSpacing: "-0.01em" }}
        >
          {m.name}
        </text>
      </motion.g>
    </g>
  );
}

export function Marktkarte() {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");

  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[70px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.26), transparent 68%)" }}
      />

      {/* Auf dem Telefon waere die Schrift auf den Schildern rund fuenf Pixel
          gross. Dort steht die Kugel allein, darunter die Marktplaetze als
          Flaggen mit Namen: dieselbe Angabe, nur lesbar. */}
      <div className="md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bilder/s-international-globus.webp"
          alt="Erdkugel mit den Amazon-Marktplätzen"
          width={1024}
          height={1024}
          loading="lazy"
          className="relative mx-auto w-full max-w-[20rem]"
        />
        <ul className="relative mt-6 grid grid-cols-2 gap-2.5">
          {MAERKTE.map((m) => (
            <li
              key={m.code}
              className="flex items-center gap-2.5 rounded-full bg-white px-3 py-2 text-small font-bold text-ink shadow-soft ring-1 ring-navy/[0.07]"
            >
              <svg width="22" height="22" viewBox="-11 -11 22 22" aria-hidden>
                <g clipPath={`url(#${id}-flagge)`}>
                  <Flagge code={m.code} />
                </g>
                <circle r={9} fill="none" stroke="rgba(11,31,52,0.18)" strokeWidth="1.1" />
              </svg>
              {m.name}
            </li>
          ))}
        </ul>
        <p className="relative mt-4 text-center text-small font-bold text-ink-faint">
          und weitere Amazon-Marktplätze weltweit
        </p>
        <svg width="0" height="0" aria-hidden>
          <defs>
            <clipPath id={`${id}-flagge`}>
              <circle r={9} />
            </clipPath>
          </defs>
        </svg>
      </div>

      <svg
        viewBox="-360 -40 1760 1080"
        className="relative hidden w-full md:block"
        role="img"
        aria-label={`Eine Erdkugel mit den Amazon-Marktplätzen: ${MAERKTE.map((m) => m.name).join(", ")} und weitere.`}
      >
        <defs>
          <clipPath id={`${id}-flagge`}>
            <circle r={9} />
          </clipPath>
        </defs>

        {/* Die Kugel selbst. Freigestellt erzeugt, deshalb ohne Platte. */}
        <motion.image
          href="/bilder/s-international-globus.webp"
          x={0}
          y={0}
          width={1000}
          height={1000}
          initial={reduce ? undefined : { opacity: 0, scale: 0.92 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ transformOrigin: "500px 500px" }}
        />

        {MAERKTE.map((m, i) => (
          <Schild key={m.code} m={m} id={id} index={i} reduce={!!reduce} />
        ))}

        {/* Was nicht aufs Bild passt, steht als Zeile darunter, nicht als
            zweite Liste in Kachelform. */}
        <text x={500} y={1035} textAnchor="middle" fill="rgba(10,30,43,0.55)" fontSize="27" fontWeight="700">
          und weitere Amazon-Marktplätze weltweit
        </text>
      </svg>
    </div>
  );
}

/**
 * Die Sektion um den Globus.
 *
 * Vorher lag die Grafik als schmale Beistellspalte neben einem Textblock. Eine
 * Weltkarte mit elf beschrifteten Marktplaetzen braucht die volle Breite,
 * sonst ist die Schrift auf den Schildern nicht mehr zu lesen.
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
    <section className="ground-tint relative isolate py-20 md:py-24">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} size="compact" title={title} description={text} />
        <div className="mx-auto mt-10 max-w-5xl">
          <Marktkarte />
        </div>
      </div>
    </section>
  );
}
