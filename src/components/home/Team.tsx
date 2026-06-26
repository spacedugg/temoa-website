"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

/* Collage that respects each photo's orientation (no forced crop):
   a masonry layout where portrait shots stay tall and landscape stays
   wide. "Main" is the lead shot and comes first. Slightly brightened. */
const shots: { src: string; lead?: boolean }[] = [
  { src: "/team/Main.jpg", lead: true }, // landscape
  { src: "/team/DSCF2442.jpg" }, // portrait
  { src: "/team/DSCF2526.jpg" }, // landscape
  { src: "/team/DSCF2497-2.jpg" }, // portrait
  { src: "/team/DSCF2749.jpg" }, // landscape
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
          <div className="mt-12 gap-4 [column-fill:balance] columns-2 lg:columns-3 [&>*]:mb-4">
            {shots.map((s) => (
              <div
                key={s.src}
                className="group relative block break-inside-avoid overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.06]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt=""
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] [filter:brightness(1.08)_saturate(1.03)]"
                />
                {s.lead && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/55 to-transparent p-5 pt-14">
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
