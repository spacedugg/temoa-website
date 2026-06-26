"use client";

import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

const team = [
  { name: "Clemens", img: "/team/Clemens.jpg" },
  { name: "Christoph", img: "/team/Christoph.jpg" },
  { name: "Eddie", img: "/team/Eddie.jpg" },
  { name: "Marvin", img: "/team/Marvin.jpg" },
  { name: "Ole", img: "/team/Ole.jpg" },
  { name: "Jonas", img: "/team/Jonas.jpg" },
  { name: "Marina", img: "/team/Marina.jpg" },
  { name: "Dias", img: "/team/Dias.jpg" },
  { name: "Vadim", img: "/team/Vadim.jpg" },
  { name: "Anzelika", img: "/team/Anzelika.jpg" },
  { name: "Burak", img: "/team/Burak.jpeg" },
  { name: "Noor", img: "/team/Noor.jpeg" },
];

export function Team() {
  return (
    <section id="team" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Team"
          title={
            <>
              Das Team hinter <span className="text-gradient">temoa.</span>
            </>
          }
          description="Amazon-Spezialisten, die eure Marke kennen wie die eigene."
        />

        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" stagger={0.05}>
          {team.map((m) => (
            <RevealItem key={m.name}>
              <div className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-black/[0.06]">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/75 to-transparent p-4 pt-12">
                    <span className="text-sm font-semibold text-white">{m.name}</span>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
