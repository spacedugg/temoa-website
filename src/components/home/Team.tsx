"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

/* Asymmetric photo collage. "Main" is the lead shot and comes first. */
const shots = [
  { src: "/team/Main.jpg", area: "col-span-2 row-span-2 md:col-span-3 md:row-span-2", lead: true },
  { src: "/team/DSCF2442.jpg", area: "col-span-2 md:col-span-3" },
  { src: "/team/DSCF2526.jpg", area: "md:col-span-1" },
  { src: "/team/DSCF2749.jpg", area: "md:col-span-1" },
  { src: "/team/DSCF2497-2.jpg", area: "col-span-2 md:col-span-1" },
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
          <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[15.5rem] md:grid-cols-6">
            {shots.map((s) => (
              <div
                key={s.src}
                className={`group relative overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.06] ${s.area}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                {s.lead && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/60 to-transparent p-5 pt-14">
                    <span className="text-base font-bold text-white">temoa</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
