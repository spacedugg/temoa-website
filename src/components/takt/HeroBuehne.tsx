"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Die Hero-Grafik.

   Acht Fassungen liegen dahinter, darunter drei erzeugte Bilder. Das letzte
   zeigte eine erfundene Trinkflasche, und genau das will der Kunde nicht: kein
   Produkt aus dem Bildmodell, sondern die Arbeit, die wir ausgeliefert haben.

   Diese Fassung ist eine Fusion der drei Referenzen des Kunden: links das
   Telefon mit der Produktseite, rechts die Bildstrecke als Raster, darauf zwei
   Schilder mit kurzer Aussage und eine Zahl aus der zugehoerigen Case Study.
   Alle Bilder sind das ausgelieferte Listing fuer Miganeo, jede Beschriftung
   zeichnet der Code.

   Aus den Referenzen bewusst nicht uebernommen: das Amazon-Logo und die
   Amazon-Oberflaeche. Der Aufbau einer Produktseite reicht.

   Ohne Effekt: kein Schweben, kein Kippen zum Zeiger. Die Teile laufen einmal
   ein, danach steht das Bild still.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Die sechs Listingbilder rechts, in der Reihenfolge des Listings. */
const KACHELN = ["l-2", "l-3", "l-4", "l-5", "l-6", "l-7"];

function Sterne({ groesse = 10 }: { groesse?: number }) {
  return (
    <span className="flex gap-[1px]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={groesse} height={groesse} viewBox="0 0 24 24" fill="#FF9900">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function Schild({
  text,
  gruen = false,
  className,
  delay,
  reduce,
}: {
  text: string;
  gruen?: boolean;
  className?: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.span
      className={`absolute z-30 inline-flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_1px_2px_rgba(13,36,57,0.08),0_18px_36px_-14px_rgba(13,36,57,0.5)] ${className ?? ""}`}
      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease: EASE }}
    >
      <span
        aria-hidden
        className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
        style={{ background: gruen ? "#16A34A" : "#0D2439" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M5 12.5l4.5 4.5L19 7" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="whitespace-nowrap text-[0.8rem] font-bold text-ink">{text}</span>
    </motion.span>
  );
}

export function HeroBuehne() {
  const roh = useReducedMotion();
  const reduce = !!roh;
  const ein = (delay: number, y = 18) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.7, delay, ease: EASE },
  });

  return (
    <div className="relative mx-auto w-full max-w-[38rem]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-[26rem] w-[26rem] rounded-full opacity-70 blur-[70px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.3), transparent 68%)" }}
      />

      <div className="relative">
        <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-4 sm:gap-6">
        {/* Links das Telefon mit der Produktseite. */}
        <motion.div
          {...ein(0.05, 24)}
          className="relative z-20 rounded-[1.9rem] p-[0.5rem] shadow-[0_30px_60px_-22px_rgba(9,26,43,0.55)]"
          style={{ background: "linear-gradient(160deg, #23486a 0%, #0b2036 100%)" }}
        >
          <div className="overflow-hidden rounded-[1.5rem] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bilder/miganeo/l-1.webp"
              alt="Hauptbild eines Listings aus unserer Produktion"
              width={1200}
              height={1500}
              className="block w-full"
            />
            <div className="px-3.5 pb-4 pt-3">
              <span className="block h-[0.4rem] w-[88%] rounded-full bg-navy/[0.18]" />
              <span className="mt-1.5 block h-[0.4rem] w-[60%] rounded-full bg-navy/[0.1]" />
              <div className="mt-2.5 flex items-center gap-2">
                <Sterne groesse={9} />
                <span className="block h-[0.3rem] w-7 rounded-full bg-navy/[0.1]" />
              </div>
              {/* Der Preis ist ein Balken: einen Preis fuer das Produkt eines
                  Kunden zu erfinden, geht nicht. */}
              <div className="mt-3 flex items-center gap-2">
                <span className="block h-[0.6rem] w-11 rounded-full bg-navy/[0.22]" />
                <span className="block h-[0.3rem] w-8 rounded-full bg-navy/[0.1]" />
              </div>
              <span className="mt-3 block h-[1.5rem] w-full rounded-full bg-brand-500 shadow-[0_8px_16px_-8px_rgba(255,153,0,0.9)]" />
            </div>
          </div>
        </motion.div>

        {/* Rechts die Bildstrecke desselben Listings. */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {KACHELN.map((k, i) => (
            <motion.figure
              key={k}
              {...ein(0.12 + i * 0.05, 14)}
              className="m-0 overflow-hidden rounded-[0.9rem] bg-white shadow-[0_1px_2px_rgba(13,36,57,0.06),0_16px_30px_-18px_rgba(13,36,57,0.45)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/bilder/miganeo/${k}.webp`}
                alt=""
                width={700}
                height={700}
                className="block w-full"
              />
            </motion.figure>
          ))}
          </div>
        </div>

      {/* Zwei Schilder und eine Zahl. Die Zahl ist belegt, sie steht in der
          Case Study zu genau diesem Listing. */}
      <Schild text="Bilder überarbeitet" delay={0.5} reduce={reduce} className="-top-3 left-[4%]" />
      <Schild text="Premium A+ Content" delay={0.6} reduce={reduce} className="bottom-[-2%] left-[2%]" />

      <motion.div
        className="absolute -bottom-5 right-[2%] z-30 flex items-center gap-3 rounded-[1rem] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(13,36,57,0.08),0_22px_44px_-16px_rgba(13,36,57,0.5)]"
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.7, ease: EASE }}
      >
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.6rem]"
          style={{ background: "rgba(34,197,94,0.16)", color: "#12854B" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18m0 0h7m-7 0v-7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>
          <span className="num block whitespace-nowrap text-[1.2rem] leading-none text-[#12854B]">6,02 %</span>
          <span className="mt-1 block whitespace-nowrap text-[0.7rem] font-bold leading-none text-ink-muted">
            TACoS
          </span>
        </span>
      </motion.div>

      </div>

      <p className="relative mt-9 text-center text-[0.72rem] text-ink-faint">
        Listing und Zahl aus der{" "}
        <a href="/ergebnisse/miganeo" className="font-bold text-ink-soft underline decoration-brand-500 underline-offset-4">
          Case Study Miganeo
        </a>
      </p>
    </div>
  );
}
