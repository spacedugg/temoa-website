"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ============================================================
   Das Team um das Gründerbild.

   Vier Fassungen liegen dahinter. Erst ein Foto mit einem drehenden Stempel
   darauf, der Rest der Mannschaft kam nicht vor. Dann neun Portraits als weiß
   gerahmte Kacheln, gleichmäßig im Kreis auf der Kante: der weiße Rand um
   jedes Bild, der gleiche Abstand zwischen allen, jedes gleich groß. Das sah
   nach Fotoecken im Familienalbum aus. Dann dieselben Portraits hinter dem
   Foto, aber mittig auf der Kante: sichtbar blieb ein Streifen, die Gesichter
   waren am Kinn abgeschnitten.

   Jetzt liegen sie hinter dem großen Bild und stehen zu drei Vierteln darüber
   hinaus. Wie weit, steht je Kachel (`raus`): die meisten überlappen die Kante
   nur mit einem Rand, zwei stehen ganz frei daneben. Ohne Rahmen, dafür mit
   Schatten, in drei Größen, jede anders gedreht, keine auf gleicher Höhe mit
   ihrer Nachbarin. Links bleibt frei, dort steht der Text und unten das
   Zeichen.

   Beim Scrollen fahren sie unterschiedlich schnell mit, das große Bild bleibt
   ruhig. Bei „Bewegung reduzieren" steht alles still, die Drehung bleibt.
   ============================================================ */

type Kachel = {
  src: string;
  /** An welcher Kante des Fotos die Kachel sitzt. */
  kante: "oben" | "rechts";
  /** Position entlang dieser Kante, in Prozent. Über 100 heißt: dahinter. */
  pos: number;
  /**
   * Anteil der Kachel, der über die Kante hinausragt. 0,8 heißt: vier Fünftel
   * stehen frei, ein Fünftel liegt hinter dem Foto. Werte über 1 lassen die
   * Kachel mit Abstand daneben stehen, ohne Berührung.
   */
  raus: number;
  g: "l" | "m" | "s";
  /** Drehung in Grad. */
  dreh: number;
  /** Weg in Pixeln, den die Kachel über die Sektionshöhe zurücklegt. */
  tiefe: number;
  /** Auf dem Telefon weggelassen, dort wird es sonst eng. */
  klein?: boolean;
};

/* Die Mannschaft ohne die drei Gründer, die stehen auf dem großen Bild.
   Die Werte sind bewusst ungleichmäßig: gleiche Abstände, gleiche Größen und
   gleicher Überlapp waren genau das, was die Reihe nach Raster aussehen ließ. */
const KACHELN: Kachel[] = [
  { src: "/team/Marvin.webp", kante: "oben", pos: 9, raus: 0.8, g: "l", dreh: -8, tiefe: 40 },
  { src: "/team/Jonas.webp", kante: "oben", pos: 27, raus: 1.12, g: "m", dreh: 6, tiefe: 22, klein: true },
  { src: "/team/Anzelika.webp", kante: "oben", pos: 42, raus: 0.86, g: "s", dreh: -4, tiefe: 56, klein: true },
  { src: "/team/Marina.webp", kante: "oben", pos: 63, raus: 1.3, g: "m", dreh: 9, tiefe: 30 },
  { src: "/team/Noor.webp", kante: "oben", pos: 84, raus: 0.92, g: "s", dreh: -6, tiefe: 58, klein: true },
  { src: "/team/Ole.webp", kante: "rechts", pos: 20, raus: 0.86, g: "l", dreh: -6, tiefe: 46 },
  { src: "/team/Vadim.webp", kante: "rechts", pos: 50, raus: 1.12, g: "m", dreh: 7, tiefe: 18, klein: true },
  { src: "/team/Dias.webp", kante: "rechts", pos: 78, raus: 0.9, g: "s", dreh: -10, tiefe: 36 },
  { src: "/team/Burak.webp", kante: "rechts", pos: 106, raus: 1, g: "m", dreh: 5, tiefe: 26, klein: true },
];

/* Drei Größen. Die Breite steht am äußeren Element: bei `left: 100 %` rechnet
   der Browser sonst mit null verfügbarer Breite und presst die Kachel am Rand
   zu einem Streifen zusammen. */
const BREITE = {
  l: "w-14 sm:w-[5.5rem] md:w-[5.5rem]",
  m: "w-12 sm:w-[4.5rem] md:w-[4.5rem]",
  s: "w-10 sm:w-[3.75rem] md:w-[3.75rem]",
} as const;

/* Zwei Schatten übereinander: ein enger für die Kante, ein weiter für die
   Tiefe. Ein einzelner Schatten sieht entweder hart oder wie Nebel aus. */
const SCHATTEN = "0 2px 4px rgba(13,36,57,0.08), 0 18px 32px -12px rgba(13,36,57,0.45)";

/* Zentrierung, Parallaxe und Drehung liegen auf zwei Elementen: beide
   schreiben `transform`, auf einem Element überschreibt eines das andere. */
function Portrait({
  k,
  fortschritt,
  ruhig,
}: {
  k: Kachel;
  fortschritt: MotionValue<number>;
  ruhig: boolean;
}) {
  const y = useTransform(fortschritt, [0, 1], [k.tiefe, -k.tiefe]);

  /* Oben: die Kachel hängt an der Oberkante und wird um ihre eigene Höhe nach
     oben gezogen. Rechts: sie hängt an der rechten Kante und wird um den Teil
     zurückgeschoben, der überlappen soll. */
  const sitz =
    k.kante === "oben"
      ? {
          left: `${k.pos}%`,
          top: 0,
          transform: `translate(-50%, -${k.raus * 100}%)`,
        }
      : {
          left: "100%",
          top: `${k.pos}%`,
          transform: `translate(${(k.raus - 1) * 100}%, -50%)`,
        };

  return (
    <span
      style={sitz}
      className={`absolute ${BREITE[k.g]} ${k.klein ? "hidden sm:block" : ""}`}
    >
      <motion.span
        style={{ y: ruhig ? 0 : y, rotate: k.dreh, boxShadow: SCHATTEN }}
        className="block overflow-hidden rounded-[0.7rem] md:rounded-[0.9rem]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={k.src}
          alt=""
          loading="lazy"
          className="block aspect-square w-full object-cover"
        />
      </motion.span>
    </span>
  );
}

/* Die vier Formen des Zeichens, ohne Schriftzug. Inline und nicht als Datei:
   das `img` trug Breite und Höhe gleich groß, das Zeichen ist aber höher als
   breit, und beim Skalieren stand das Quadrat oben angeschnitten an der Kante. */
function Zeichen({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 228 254" className={className} aria-hidden>
      <rect x="0" y="0" width="108" height="108" rx="4" fill="#FF9900" />
      <circle cx="174" cy="54" r="54" fill="#FF3131" />
      <path
        d="M2.4,121.7 L107.6,121.7 C108.8,121.7 109.8,122.7 109.8,123.9 L109.8,200.6 C109.5,223.9 94.6,243.7 74.1,251.2 C68.6,253.1 62.3,254.1 56,254.1 C49.7,254.1 43.8,253 38.3,251.2 C17.6,243.8 2.7,224 2.4,200.6 Z"
        fill="#023047"
      />
      <path
        d="M176.3,122.9 L226.2,153.6 C227.4,154.3 228.1,155.6 228.1,157 L228.1,218.7 C228.1,220.1 227.4,221.4 226.2,222.1 L176.3,252.9 C175.1,253.6 173.6,253.6 172.5,252.9 L122.6,222.1 C121.4,221.4 120.7,220.1 120.7,218.7 L120.7,157 C120.7,155.6 121.4,154.3 122.6,153.6 Z"
        fill="#A8D8F0"
      />
    </svg>
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
    /* Der Rand macht Platz für die Portraits und ist auf jeder Seite anders:
       oben und rechts stehen sie hervor, links und unten fast nicht. Er hält
       sie außerdem innerhalb des Blocks, ein überstehendes Element schiebt auf
       schmalen Bildschirmen die Seite seitlich auf. */
    <div ref={ref} className="relative pb-[12%] pl-[8%] pr-[16%] pt-[20%] md:pr-[14%] md:pt-[16%]">
      <div className="relative">
        {/* Die Portraits liegen hinter dem Foto. Vorher lagen sie darauf und
            klebten wie Aufkleber. */}
        <div role="group" aria-label={teamAlt} className="pointer-events-none absolute inset-0 z-0">
          {KACHELN.map((k) => (
            <Portrait key={k.src} k={k} fortschritt={scrollYProgress} ruhig={ruhig} />
          ))}
        </div>

        <div
          className="relative z-10 overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem]"
          style={{ boxShadow: "0 2px 6px rgba(13,36,57,0.07), 0 40px 70px -34px rgba(13,36,57,0.5)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/team/Main.webp"
            alt={bildAlt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        {/* Das Zeichen sitzt auf der unteren linken Ecke, halb auf dem Foto und
            halb auf dem Grund. Der weiche weiße Schein trägt die dunkle Form,
            falls das Foto an dieser Stelle dunkel ist. */}
        <span
          aria-hidden
          className="absolute -bottom-6 -left-6 z-20 md:-bottom-8 md:-left-8"
          style={{
            filter:
              "drop-shadow(0 0 12px rgba(255,255,255,0.95)) drop-shadow(0 14px 24px rgba(13,36,57,0.3))",
          }}
        >
          <Zeichen className="h-12 w-auto md:h-16" />
        </span>
      </div>
    </div>
  );
}
