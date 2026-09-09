"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Pille } from "../ui/SectionHeading";

/* Impressionsanteil: aufsteigende Balken. */
function BarsViz({ color }: { color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const heights = [34, 48, 58, 76, 100];
  return (
    <div ref={ref} className="flex h-14 items-end gap-2">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-3 rounded-sm"
          style={{ background: i === heights.length - 1 ? color : `${color}55` }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${h}%` } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      ))}
    </div>
  );
}

/* Klickrate: ein Klick mit Cursor und aufploppendem Ring. */
function ClickViz({ color }: { color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref} className="flex h-14 items-center">
      <svg width="64" height="56" viewBox="0 0 64 56" fill="none">
        <motion.circle
          cx="26" cy="22" r="10" stroke={color} strokeWidth="2"
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={inView ? { scale: 1.7, opacity: 0 } : {}}
          transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "26px 22px" }}
        />
        <motion.path
          d="M28 24l16 6-7 2-2 7-7-15Z" fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 }}
          style={{ transformOrigin: "28px 24px" }}
        />
      </svg>
    </div>
  );
}

/* Conversion Rate: ein Kreis, der sich füllt, mit Haken (Kauf erfolgt). */
function ConversionViz({ color }: { color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const C = 2 * Math.PI * 22;
  return (
    <div ref={ref} className="flex h-14 items-center">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="22" stroke={`${color}33`} strokeWidth="4" />
        <motion.circle
          cx="28" cy="28" r="22" stroke={color} strokeWidth="4" strokeLinecap="round"
          transform="rotate(-90 28 28)"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: C * 0.18 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M20 28l6 6 11-12" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </svg>
    </div>
  );
}

/* Die Ueberschriften hiessen "Höherer Impressionsanteil", "Maximale
   Klickrate" und "Conversion Rate Uplift". Das erste und zweite waren
   Steigerungsbehauptungen, das dritte war englisch. Jetzt steht dort die
   Kennzahl, die Aussage macht der Satz darunter. */
const items: { Viz: (p: { color: string }) => React.ReactNode; title: string; body: string; color: string }[] = [
  { Viz: BarsViz, title: "Impressionsanteil", body: "Wie oft ihr überhaupt auftaucht, wenn jemand euer Produkt sucht.", color: "#FF9900" },
  { Viz: ClickViz, title: "Klickrate", body: "Wie viele von denen, die euch sehen, auf euer Bild klicken.", color: "#FF7A5C" },
  { Viz: ConversionViz, title: "Conversion Rate", body: "Wie viele von denen, die klicken, am Ende kaufen.", color: "#4FC3E8" },
];

/**
 * Die drei Zahlen, an denen Content gemessen wird.
 *
 * Der Kunde nennt diese Sektion den Nordstern der Content-Seite: sie ist die
 * greifbarste Stelle der ganzen Seite. Vorher stand sie als schmales helles
 * Band zwischen zwei anderen hellen Sektionen und ging unter. Jetzt ist sie
 * ein dunkles Podest mit eigener Ueberschrift und grossen Kacheln.
 */
export function ContentResultBand() {
  return (
    <section className="on-dark ground-deep relative overflow-hidden py-16 md:py-24">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand-500" />
      <div className="container-x relative">
        <Reveal>
          <div className="flex justify-center">
            <Pille>Woran Amazon euer Listing misst</Pille>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="title mx-auto mt-6 max-w-[20ch] text-balance text-center text-[clamp(1.9rem,1.3rem+1.8vw,3rem)] text-white">
            Drei Zahlen entscheiden alles.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-[46ch] text-pretty text-center text-lead text-chalk-muted">
            Wie oft ihr gezeigt werdet. Wie oft geklickt wird. Wie oft gekauft wird. Jedes Bild und jeder Satz,
            den wir schreiben, zahlt auf eine dieser drei Zahlen ein.
          </p>
        </Reveal>

        <RevealGroup className="mx-auto mt-12 grid max-w-5xl items-stretch gap-4 md:grid-cols-3 md:gap-5" stagger={0.08}>
          {items.map((it, i) => (
            <RevealItem key={it.title} className="h-full">
              <div className="panel-dark relative flex h-full flex-col p-5 sm:p-7 md:p-8">
                <span className="text-label font-bold uppercase tracking-[0.14em] text-chalk-faint">
                  {`0${i + 1}`}
                </span>
                {/* Die Zeichen sind der Blickfang der Kachel, deshalb gross. */}
                <div className="mt-6 origin-left scale-[1.7]">
                  <it.Viz color={it.color} />
                </div>
                <h3 className="mt-14 text-[1.4rem] font-bold leading-snug text-white md:text-[1.6rem]">
                  {it.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-chalk-muted">{it.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
