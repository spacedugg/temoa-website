"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Die Hero-Grafik.

   Zehn Fassungen liegen dahinter: fuenf 3D-Entwuerfe, ein erzeugtes Produkt,
   dann eine Komposition aus dem ausgelieferten Miganeo-Listing mit Telefon,
   Bildstrecke und Schildern aus Code. Der Kunde hat zuletzt selbst ein Bild
   geliefert, und damit ist die Frage entschieden: hier steht sein Bild, sonst
   nichts.

   Freigestellt, ohne Platte und ohne Rahmen, direkt auf dem Grund. Kein
   Schweben, kein Kippen zum Zeiger: die Grafik laeuft einmal ein und steht
   danach still.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

export function HeroBuehne() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      {/* Ein warmer Lichthof hinter dem Freisteller, damit er nicht auf dem
          hellen Grund klebt. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-[26rem] w-[26rem] rounded-full opacity-70 blur-[70px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.28), transparent 68%)" }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/bilder/h-listing.webp"
        alt="Eine Produktseite auf dem Telefon, daneben Bewertungen und der Einkaufswagen"
        width={1200}
        height={1200}
        className="relative block w-full"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.05, ease: EASE }}
      />
    </div>
  );
}
