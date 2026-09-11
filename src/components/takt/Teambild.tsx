"use client";

/* ============================================================
   Team: das Gründerbild und die Reihe der Portraits.

   Fünf Fassungen liegen dahinter, und vier waren derselbe Fehler. Erst ein
   drehender Stempel auf dem Foto, der Rest der Mannschaft kam nicht vor. Dann
   neun Portraits als weiß gerahmte Kacheln, gleichmäßig im Kreis auf der Kante.
   Dann dieselben Kacheln hinter dem Foto, mittig auf der Kante: die Gesichter
   waren am Kinn abgeschnitten. Dann gestreut, gedreht, in drei Größen: aus dem
   Raster wurden Aufkleber.

   Der Fehler war jedes Mal derselbe: neun Portraits um ein Foto herum
   arrangieren heißt, neun kleine Bilder gegen ein großes stellen. Das wird
   nicht besser, wenn man die Anordnung ändert.

   Jetzt zwei getrennte Dinge, beide ruhig. Das Gründerbild steht für sich, ohne
   etwas darauf und ohne etwas dahinter. Die Mannschaft steht als Reihe runder
   Portraits in der Textspalte. Überlappende Portraitkreise sind dafür die
   eingeführte Form: sie lesen sich als eine Gruppe und nicht als neun
   Einzelbilder.

   Beim Zeigen geht die Reihe auseinander und der berührte Kreis kommt nach
   vorn. Das Verhalten steht als `.teamreihe` in `globals.css`. Es hängt an
   Geschwisterelementen, und das ist in CSS eine Zeile, in React dagegen ein
   Zustand, der bei jeder Mausbewegung neu rendert.

   Die Ringe tragen den warmen Ton der Sektion und nicht Weiß. Sie trennen die
   Kreise voneinander, ohne als Rahmen um jedes Bild zu stehen.
   ============================================================ */

/* Die Mannschaft ohne die drei Gründer, die stehen auf dem großen Bild. */
const PORTRAITS = [
  "/team/Marvin.webp",
  "/team/Jonas.webp",
  "/team/Anzelika.webp",
  "/team/Marina.webp",
  "/team/Ole.webp",
  "/team/Vadim.webp",
  "/team/Dias.webp",
  "/team/Burak.webp",
  "/team/Noor.webp",
];

/** Reihe überlappender Portraits. Steht unter dem Text, nicht am Bild. */
export function Teamreihe({ teamAlt, className }: { teamAlt: string; className?: string }) {
  return (
    <div role="group" aria-label={teamAlt} className={`teamreihe ${className ?? ""}`}>
      {PORTRAITS.map((src, i) => (
        <span
          key={src}
          /* `--i` gibt die Stapelordnung: jeder Kreis liegt über seinem rechten
             Nachbarn, damit die Reihe nach links aufgebaut aussieht. Den Rest
             macht `.teamreihe`. */
          style={{ "--i": i } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            loading="lazy"
            className="block h-12 w-12 rounded-full object-cover shadow-[0_6px_14px_-6px_rgba(13,36,57,0.45)] ring-[3px] ring-[#fdf3e8] sm:h-14 sm:w-14"
          />
        </span>
      ))}
    </div>
  );
}

/* Die vier Formen des Zeichens, ohne Schriftzug. Inline und nicht als Datei:
   das `img` trug Breite und Höhe gleich groß, das Zeichen ist aber höher als
   breit. Beim Skalieren stand das Quadrat dann oben angeschnitten. */
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

/** Das Gründerbild. Ein Bild, ein Schatten, das Zeichen auf der Ecke. */
export function Teambild({ bildAlt }: { bildAlt: string }) {
  return (
    <div className="relative pb-[7%] pl-7 md:pl-9">
      <span aria-hidden className="halo right-0 -top-10 h-[20rem] w-[20rem] opacity-70" />
      <div className="relative">
        <div
          className="overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem]"
          style={{ boxShadow: "0 2px 6px rgba(13,36,57,0.07), 0 44px 76px -34px rgba(13,36,57,0.5)" }}
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
          className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8"
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
