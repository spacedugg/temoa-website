"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

/* Collage aus den vorhandenen Quer- und Hochformaten, die ineinander
   greifen (kein „erst quer, dann hoch"-Block). Main ist das Leadbild,
   groß oben links; die zwei Hochformate werden hoch dargestellt, die
   Querformate breit, sodass das Raster ohne Whitespace aufgeht. */
const shots: { src: string; className: string }[] = [
  { src: "/team/Main.jpg", className: "col-span-2 md:row-span-2" }, // Querformat, Leadbild groß
  { src: "/team/DSCF2442.jpg", className: "md:row-span-2" }, // Hochformat, hoch
  { src: "/team/DSCF2526.jpg", className: "" }, // Querformat
  { src: "/team/DSCF2497-2.jpg", className: "" }, // Hochformat
  { src: "/team/DSCF2749.jpg", className: "" }, // Querformat
];

export function Team() {
  return (
    <section id="team" className="relative bg-[#EDF5FB] py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Team"
          size="compact"
          title={
            <>
              Das Team hinter <span className="text-gradient">temoa.</span>
            </>
          }
          description="Amazon-Spezialisten, die eure Marke kennen wie die eigene."
        />

        <Reveal delay={0.08}>
          <div className="mx-auto mt-12 grid max-w-5xl auto-rows-[8.5rem] grid-cols-2 gap-3 md:auto-rows-[10.5rem] md:grid-cols-3">
            {shots.map((s) => (
              <div
                key={s.src}
                className={`group relative overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.06] ${s.className}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] [filter:brightness(1.07)_saturate(1.03)]"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
