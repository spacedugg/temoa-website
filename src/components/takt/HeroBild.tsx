"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Die Hero-Grafik der Startseite.

   Vorher stand hier nur die freigestellte Wachstumsszene: Balken, Pfeil,
   Einkaufswagen. Der Kunde fand das zu duenn, „ein paar billige Graphen". Die
   Referenzen, die er geschickt hat, zeigen mehr: eine Produktseite, Kennzahlen
   als kleine Karten mit Kurve, dazu Balken und ein Aufwaertspfeil.

   Dieselbe Dichte, aber nach den Regeln dieses Projekts:

   - Keine Amazon-Oberflaeche. Die Referenzen zeigen Amazon-Logo, Prime und
     „Amazon's Choice". Das ist fremde Marke und wird nicht nachgebaut, nur der
     Aufbau einer Produktseite.
   - Keine erfundenen Leistungszahlen. In den Karten stehen belegte Werte:
     der Durchschnitt aus der Betreuung und zwei Zahlen aus den Case Studies,
     die weiter unten auf der Seite mit Marke und Zeitraum belegt sind.
   - Keine Schrift aus dem Bildmodell. Die Produktaufnahme kommt aus einer
     Datei, jede Beschriftung zeichnet der Code.

   Aufbau in drei Ebenen: hinten die Wachstumsszene, davor die Produktseite,
   davor zwei Kennzahlkarten, die ueber die Kanten ragen. Alles schwebt leicht
   versetzt, dadurch steht die Szene im Raum statt flach auf der Seite.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/** Kleine Kurve in einer Kennzahlkarte. Zeichnet sich immer wieder neu. */
function Kurve({ punkte, farbe, verzoegerung, reduce }: { punkte: string; farbe: string; verzoegerung: number; reduce: boolean }) {
  return (
    <svg viewBox="0 0 88 30" className="mt-2 h-7 w-full overflow-visible" aria-hidden preserveAspectRatio="none">
      <motion.path
        d={punkte}
        fill="none"
        stroke={farbe}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 7, times: [0, 0.4, 0.86, 1], repeat: Infinity, delay: verzoegerung, ease: "easeInOut" }
        }
        style={{ filter: `drop-shadow(0 0 5px ${farbe}66)` }}
      />
    </svg>
  );
}

function Kennzahl({
  wert,
  label,
  farbe,
  punkte,
  verzoegerung,
  reduce,
  className,
}: {
  wert: string;
  label: string;
  farbe: string;
  punkte: string;
  verzoegerung: number;
  reduce: boolean;
  className: string;
}) {
  return (
    <motion.div
      className={`absolute w-[10.5rem] rounded-[1.1rem] bg-white p-3.5 ${className}`}
      style={{ boxShadow: "0 18px 40px -18px rgba(11,31,52,0.4), inset 0 0 0 1px rgba(11,31,52,0.06)" }}
      initial={reduce ? undefined : { opacity: 0, y: 16, scale: 0.94 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 + verzoegerung, ease: EASE }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: verzoegerung }}
      >
        <div className="num text-[1.45rem] leading-none" style={{ color: farbe === "#22C55E" ? "#12874C" : "#0A1E2B" }}>
          {wert}
        </div>
        <div className="mt-1 text-[0.72rem] font-bold leading-tight text-ink-muted">{label}</div>
        <Kurve punkte={punkte} farbe={farbe} verzoegerung={verzoegerung} reduce={reduce} />
      </motion.div>
    </motion.div>
  );
}

/** Der Aufbau einer Produktseite. Ohne fremde Marke, nur die Struktur. */
function Produktseite({ reduce }: { reduce: boolean }) {
  return (
    <div
      className="relative rounded-[1.6rem] bg-white p-4 md:p-5"
      style={{ boxShadow: "0 40px 80px -40px rgba(11,31,52,0.5), inset 0 0 0 1px rgba(11,31,52,0.05)" }}
    >
      {/* Kopfzeile der Seite, angedeutet: Suchfeld und Warenkorb. Kein Logo. */}
      <div className="flex items-center gap-3 rounded-[0.9rem] bg-navy px-3.5 py-2.5">
        <span aria-hidden className="h-2 w-14 rounded-full bg-white/25" />
        <span aria-hidden className="h-6 flex-1 rounded-md bg-white/90" />
        <span aria-hidden className="grid h-6 w-6 place-items-center rounded-md bg-brand-500">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A1E2B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6h15l-1.5 9h-12z" />
            <circle cx="9" cy="20" r="1.4" fill="#0A1E2B" />
            <circle cx="18" cy="20" r="1.4" fill="#0A1E2B" />
          </svg>
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.05fr]">
        <div className="min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bilder/h-haupt.webp"
            alt="Hauptbild eines Listings: Bratpfanne in Navy mit Holzgriff"
            width={1024}
            height={1024}
            className="aspect-square w-full rounded-[1.1rem] object-cover"
          />
          <div className="mt-2.5 grid grid-cols-4 gap-2">
            {["/bilder/h-detail.webp", "/bilder/h-szene.webp", "/bilder/h-gruppe.webp", "/bilder/h-haupt.webp"].map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                width={256}
                height={256}
                className={`aspect-square w-full rounded-[0.6rem] object-cover ${
                  i === 0 ? "ring-2 ring-brand-500" : "ring-1 ring-navy/[0.08]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <span aria-hidden className="h-2.5 w-4/5 rounded-full bg-navy/[0.14]" />
          <span aria-hidden className="mt-2 h-2.5 w-3/5 rounded-full bg-navy/[0.1]" />

          <div className="mt-3.5 flex items-center gap-2">
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.svg
                  key={i}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#FF9900"
                  initial={reduce ? undefined : { opacity: 0, scale: 0.4 }}
                  animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.5 + i * 0.07 }}
                >
                  <path d="M12 2l2.9 6.3 6.9.8-5 4.8 1.2 6.8L12 17.4 6 20.7l1.2-6.8-5-4.8 6.9-.8L12 2z" />
                </motion.svg>
              ))}
            </span>
            <span className="text-[0.78rem] font-bold text-ink">4,8</span>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="num text-[1.7rem] leading-none text-ink">34,90</span>
            <span className="num text-[1rem] text-ink">€</span>
          </div>
          <span className="mt-1 text-[0.72rem] font-bold text-signal-pos">Auf Lager, morgen geliefert</span>

          {/* Der Kaufknopf. Orange als Flaeche ist hier richtig: das ist der
              Nachbau einer Produktseite, nicht ein Knopf dieser Website. */}
          <motion.div
            className="mt-4 grid min-h-[2.4rem] place-items-center rounded-full bg-brand-500 text-[0.8rem] font-bold text-navy"
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
          >
            In den Einkaufswagen
          </motion.div>

          <ul className="mt-4 space-y-2 border-t border-navy/[0.07] pt-3.5">
            {["Hauptbild und sechs Listingbilder", "Titel, Bullets und Backend-Felder", "A+ Content"].map((t) => (
              <li key={t} className="flex gap-2">
                <span aria-hidden className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <span className="text-[0.72rem] leading-snug text-ink-muted">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function HeroBild() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.28), transparent 68%)" }}
      />

      {/* Hinten die Wachstumsszene. Sie ragt rechts hinter der Produktseite
          hervor und traegt den Aufwaertspfeil, um den es geht. */}
      <motion.img
        src="/bilder/h-wachstum.webp"
        alt=""
        aria-hidden
        width={1536}
        height={1152}
        className="pointer-events-none absolute -right-[12%] -top-[20%] w-[64%] max-w-none"
        initial={reduce ? undefined : { opacity: 0, x: 30, y: 10 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.9, delay: 0.2 },
          x: { duration: 0.9, delay: 0.2, ease: EASE },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ filter: "drop-shadow(0 30px 50px rgba(11,31,52,0.25))" }}
      />

      {/* Davor die Produktseite. */}
      <motion.div
        className="relative mt-[18%] w-[84%]"
        initial={reduce ? undefined : { opacity: 0, y: 24 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <Produktseite reduce={!!reduce} />
        </motion.div>

        {/* Zwei belegte Kennzahlen als Karten ueber den Kanten.
            Ø +30 % ist der ausgewiesene Durchschnitt, −35 % TACoS stammt aus
            dem Fall „Marke aus Gartenzubehoer" weiter unten auf der Seite. */}
        <Kennzahl
          wert="Ø +30 %"
          label="Profitabilität"
          farbe="#FF9900"
          punkte="M2 26 L16 22 L30 24 L44 15 L58 12 L72 6 L86 3"
          verzoegerung={0.15}
          reduce={!!reduce}
          className="-right-[12%] top-[31%]"
        />
        <Kennzahl
          wert="−35 %"
          label="TACoS im Hauptmarkt"
          farbe="#22C55E"
          punkte="M2 5 L16 9 L30 8 L44 15 L58 17 L72 22 L86 26"
          verzoegerung={0.55}
          reduce={!!reduce}
          className="-left-[17%] top-[63%]"
        />
      </motion.div>
    </div>
  );
}
