"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Neigung } from "./Neigung";

/* ============================================================
   Die Hero-Grafik.

   Sechs Fassungen liegen dahinter: ein Drahtgitter, ein Listing-Nachbau mit
   Kennzahlkarten, derselbe Nachbau aus Code, eine freigestellte 3D-Szene und
   zuletzt fuenf Entwuerfe im Stil teurer Produktrenderings. Der Kunde hat alle
   verworfen, die 3D-Szenen als kindlich, und Referenzen geschickt: ein echtes
   Listing auf einem Telefon, die Listingbilder daneben, dazu schwebende
   Karten mit Zahlen.

   Diese Fassung baut das mit dem, was wir haben: das ausgelieferte Listing fuer
   Miganeo, ein Telefonrahmen aus Code, zwei Karten mit den belegten Zahlen aus
   der zugehoerigen Case Study. Kein Bildmodell, dadurch sitzt jede Beschriftung
   richtig und ist auf jedem Bildschirm scharf.

   Was aus den Referenzen bewusst nicht uebernommen ist: das Amazon-Logo und die
   Amazon-Oberflaeche. Beides ist auf dieser Website ausgeschlossen, solange der
   Partnerstatus offen ist. Der Aufbau einer Produktseite reicht, um sie zu
   erkennen.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

function Sterne() {
  return (
    <span className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill="#FF9900">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/** Eine schwebende Karte mit einer belegten Zahl. */
function Zahlkarte({
  wert,
  label,
  gruen = false,
  runter = false,
  className,
  delay,
  reduce,
}: {
  wert: string;
  label: string;
  gruen?: boolean;
  runter?: boolean;
  className?: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={`absolute z-20 flex items-center gap-3 rounded-[1rem] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(13,36,57,0.06),0_22px_44px_-18px_rgba(13,36,57,0.45)] ${className ?? ""}`}
      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE }}
    >
      <span
        aria-hidden
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.65rem]"
        style={
          gruen
            ? { background: "rgba(34,197,94,0.16)", color: "#12854B" }
            : { background: "rgba(255,153,0,0.16)", color: "#0A1E2B" }
        }
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d={runter ? "M18 6L6 18m0 0h7m-7 0v-7" : "M6 18L18 6m0 0h-7m7 0v7"}
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="min-w-0">
        <span
          className="num block whitespace-nowrap text-[1.25rem] leading-none"
          style={{ color: gruen ? "#12854B" : "#0A1E2B" }}
        >
          {wert}
        </span>
        <span className="mt-1 block whitespace-nowrap text-[0.7rem] font-bold leading-none text-ink-muted">
          {label}
        </span>
      </span>
    </motion.div>
  );
}

export function HeroBuehne() {
  const roh = useReducedMotion();
  const reduce = !!roh;

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      {/* Der Lichthof hinter der Buehne. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-[30rem] w-[30rem] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.32), transparent 68%)" }}
        animate={reduce ? undefined : { opacity: [0.6, 0.95, 0.6], scale: [0.96, 1.05, 0.96] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <Neigung>
        <div className="relative aspect-[1/1.08] w-full">
          {/* Zwei Listingbilder hinter dem Telefon. Sie sagen, dass zu einem
              Listing eine ganze Bildstrecke gehoert. */}
          <motion.figure
            className="absolute left-[1%] top-[16%] m-0 w-[36%] overflow-hidden rounded-[1.1rem] bg-white shadow-[0_1px_2px_rgba(13,36,57,0.06),0_26px_50px_-24px_rgba(13,36,57,0.5)]"
            style={{ rotate: "-7deg" }}
            initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.25, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bilder/miganeo/l-2.webp" alt="" width={700} height={700} className="block w-full" />
          </motion.figure>

          <motion.figure
            className="absolute bottom-[4%] right-[2%] m-0 w-[33%] overflow-hidden rounded-[1.1rem] bg-white shadow-[0_1px_2px_rgba(13,36,57,0.06),0_26px_50px_-24px_rgba(13,36,57,0.5)]"
            style={{ rotate: "6deg" }}
            initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.32, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bilder/miganeo/l-5.webp" alt="" width={700} height={700} className="block w-full" />
          </motion.figure>

          {/* Das Telefon. Dunkler Rahmen, damit die Grafik auf dem hellen
              Grund steht und nicht hineinfaellt: genau daran ist der
              Listing-Nachbau als weisse Karte gescheitert.

              Mittig ueber `inset-x-0` und `mx-auto`, nicht ueber
              `-translate-x-1/2`: framer-motion schreibt beim Einlaufen ein
              eigenes `transform` und wirft die Verschiebung aus der Klasse
              weg. Dasselbe gilt fuer den Lichthof darueber. */}
          <motion.div
            className="absolute inset-x-0 top-[2%] z-10 mx-auto w-[50%] rounded-[2rem] p-[0.55rem] shadow-[0_30px_70px_-24px_rgba(9,26,43,0.6)]"
            style={{ background: "linear-gradient(160deg, #1c3f5e 0%, #0c2138 100%)" }}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.12, ease: EASE }}
          >
            <div className="overflow-hidden rounded-[1.55rem] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bilder/miganeo/l-1.webp"
                alt="Hauptbild eines Listings aus unserer Produktion"
                width={1200}
                height={1500}
                className="block w-full"
              />
              {/* Der Aufbau einer Produktseite, gezeichnet: Titel, Bewertung,
                  Preis, Kaufknopf. Keine Amazon-Oberflaeche. */}
              <div className="px-3.5 pb-4 pt-3">
                <span className="block h-[0.4rem] w-[88%] rounded-full bg-navy/[0.16]" />
                <span className="mt-1.5 block h-[0.4rem] w-[62%] rounded-full bg-navy/[0.1]" />
                <div className="mt-2.5 flex items-center gap-2">
                  <Sterne />
                  <span className="block h-[0.35rem] w-8 rounded-full bg-navy/[0.1]" />
                </div>
                {/* Der Preis ist ein Balken, keine Zahl: einen Preis fuer das
                    Produkt eines Kunden zu erfinden, geht nicht. */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="block h-[0.6rem] w-12 rounded-full bg-navy/[0.22]" />
                  <span className="block h-[0.35rem] w-10 rounded-full bg-navy/[0.1]" />
                </div>
                <span className="mt-3 block h-[1.6rem] w-full rounded-full bg-brand-500 shadow-[0_8px_18px_-8px_rgba(255,153,0,0.9)]" />
              </div>
            </div>
          </motion.div>

          {/* Die belegten Zahlen aus der Case Study zu genau diesem Listing. */}
          <Zahlkarte
            wert="6,02 %"
            label="TACoS"
            gruen
            runter
            delay={0.45}
            reduce={reduce}
            className="right-[3%] top-[8%]"
          />
          <Zahlkarte
            wert="×20"
            label="Umsatz im Ausland"
            gruen
            delay={0.55}
            reduce={reduce}
            className="bottom-[30%] left-[0%]"
          />
        </div>
      </Neigung>

      <p className="relative mt-5 text-center text-[0.72rem] text-ink-faint">
        Listing und Zahlen aus der{" "}
        <a href="/ergebnisse/miganeo" className="font-bold text-ink-soft underline decoration-brand-500 underline-offset-4">
          Case Study Miganeo
        </a>
      </p>
    </div>
  );
}
