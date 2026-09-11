"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { LogoIcon } from "../Logo";

/* ============================================================
   Der Kranz um das Gründerbild.

   Vorher stand in dieser Sektion ein Foto und darauf ein drehender Stempel.
   Das Bild zeigte drei Personen, die Sektion hieß „Das Team hinter temoa",
   und der Rest der Mannschaft kam nicht vor.

   Jetzt liegt das Gründerbild weiter in der Mitte und behält seine Größe.
   Ringsum stehen die übrigen Portraits als kleine Kacheln, je zur Hälfte auf
   dem Foto und zur Hälfte daneben. Sie fahren beim Scrollen unterschiedlich
   schnell mit, das große Bild bleibt ruhig. Namen und Positionen stehen nicht
   daran: gefragt war, wer hier arbeitet, nicht eine Namensliste.

   Der Stempel ist raus. An der Ecke sitzt stattdessen das Logo ohne
   Schriftzug, ebenfalls halb auf dem Foto und halb auf dem Grund.

   Warum der Block einen eigenen Rand trägt: ein Element, das über den
   Container hinausragt, schiebt auf schmalen Bildschirmen die Seite seitlich
   auf. Der Rand hält den Kranz innerhalb des Blocks, die Kacheln liegen
   trotzdem auf der Kante des Fotos.

   Bei „Bewegung reduzieren" steht alles still.
   ============================================================ */

/* Die Mannschaft ohne die drei Gründer, die stehen auf dem großen Bild.
   `x` und `y` sind Prozent der Bildfläche, 0 und 100 liegen genau auf der
   Kante. `tiefe` ist der Weg in Pixeln, den die Kachel beim Scrollen
   zurücklegt: verschiedene Werte, sonst bewegt sich der Kranz als Platte.
   `klein` heißt: auf dem Telefon weggelassen, dort wird es sonst eng. */
const KRANZ: { src: string; x: number; y: number; tiefe: number; klein?: boolean }[] = [
  { src: "/team/Marvin.webp", x: 24, y: 0, tiefe: 34 },
  { src: "/team/Jonas.webp", x: 61, y: 0, tiefe: 18, klein: true },
  { src: "/team/Anzelika.webp", x: 100, y: 18, tiefe: 46 },
  { src: "/team/Marina.webp", x: 100, y: 54, tiefe: 24, klein: true },
  { src: "/team/Ole.webp", x: 100, y: 88, tiefe: 38 },
  { src: "/team/Vadim.webp", x: 66, y: 100, tiefe: 20, klein: true },
  { src: "/team/Dias.webp", x: 32, y: 100, tiefe: 42 },
  { src: "/team/Burak.webp", x: 0, y: 55, tiefe: 26, klein: true },
  { src: "/team/Noor.webp", x: 0, y: 20, tiefe: 44 },
];

/* Zentrierung und Parallaxe liegen auf zwei Elementen: beide schreiben
   `transform`, auf einem Element würde das eine das andere überschreiben. */
function Kachel({
  bild,
  fortschritt,
  ruhig,
}: {
  bild: (typeof KRANZ)[number];
  fortschritt: MotionValue<number>;
  ruhig: boolean;
}) {
  const y = useTransform(fortschritt, [0, 1], [bild.tiefe, -bild.tiefe]);

  return (
    <span
      style={{ left: `${bild.x}%`, top: `${bild.y}%` }}
      className={`absolute w-14 -translate-x-1/2 -translate-y-1/2 sm:w-16 md:w-[5rem] ${
        bild.klein ? "hidden sm:block" : ""
      }`}
    >
      <motion.span
        style={ruhig ? undefined : { y }}
        className="block rounded-[1rem] bg-white p-1 shadow-[0_1px_2px_rgba(13,36,57,0.06),0_18px_34px_-16px_rgba(13,36,57,0.5)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bild.src}
          alt=""
          loading="lazy"
          className="block aspect-square w-full rounded-[0.75rem] object-cover"
        />
      </motion.span>
    </span>
  );
}

export function Teamkranz({ bildAlt, teamAlt }: { bildAlt: string; teamAlt: string }) {
  const ruhig = useReducedMotion() === true;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="relative px-[9%] py-[11%]">
      <div className="relative">
        <div className="overflow-hidden rounded-[1.5rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_34px_60px_-32px_rgba(13,36,57,0.45)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/team/Main.webp"
            alt={bildAlt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        {/* Die vier Logoformen ohne Schriftzug, genau auf der unteren linken
            Ecke: halb auf dem Foto, halb auf dem Grund. Keine weisse Kachel
            darunter, sonst steht dort noch ein Portraitrahmen. Der weiche
            weisse Schein traegt die dunkle Form, falls das Foto an dieser
            Stelle dunkel ist. */}
        <span
          aria-hidden
          className="absolute -bottom-7 -left-7 md:-bottom-10 md:-left-10"
          style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.9)) drop-shadow(0 16px 26px rgba(13,36,57,0.35))" }}
        >
          <LogoIcon size={96} className="h-14 w-auto md:h-20" />
        </span>

        {/* Der Kranz deckt sich genau mit dem Foto, deshalb liegen 0 % und
            100 % auf dessen Kante. */}
        <div role="group" aria-label={teamAlt} className="pointer-events-none absolute inset-0">
          {KRANZ.map((b) => (
            <Kachel key={b.src} bild={b} fortschritt={scrollYProgress} ruhig={ruhig} />
          ))}
        </div>
      </div>
    </div>
  );
}
