"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

/* Candid-Collage: die Schnappschüsse behalten ihr natürliches Seitenverhältnis
   (kein object-cover, also kein durchgeschnittenes Gesicht). Das Masonry darf
   asymmetrisch laufen; eine Text-Kachel füllt den entstehenden Whitespace und
   bringt die Collage wieder in Balance. */
const candids = ["/team/Main.webp", "/team/DSCF2442.webp", "/team/DSCF2526.webp", "/team/DSCF2497-2.webp", "/team/DSCF2749.webp"];

/* Einzelne Mitarbeiterbilder (quadratisch) mit Namen. */
const members: { src: string; name: string }[] = [
  { src: "/team/Clemens.webp", name: "Clemens" },
  { src: "/team/Marvin.webp", name: "Marvin" },
  { src: "/team/Christoph.webp", name: "Christoph" },
  { src: "/team/Jonas.webp", name: "Jonas" },
  { src: "/team/Anzelika.webp", name: "Anzelika" },
  { src: "/team/Marina.webp", name: "Marina" },
  { src: "/team/Eddie.webp", name: "Eddie" },
  { src: "/team/Ole.webp", name: "Ole" },
  { src: "/team/Vadim.webp", name: "Vadim" },
  { src: "/team/Dias.webp", name: "Dias" },
  { src: "/team/Burak.webp", name: "Burak" },
  { src: "/team/Noor.webp", name: "Noor" },
];

export function Team() {
  return (
    <section id="team" className="section-y relative bg-canvas-tint">
      <div className="container-x">
        <SectionHeading
          eyebrow="Team"
          size="compact"
          title={
            <>
              Das Team hinter <span className="text-gradient">temoa.</span>
            </>
          }
          description="Strategie, Design, Advertising und Account-Management, alle im Haus."
        />

        <Reveal delay={0.08}>
          <div className="mx-auto mt-12 max-w-5xl columns-2 gap-4 [column-fill:_balance] md:columns-3 [&>*]:mb-4">
            {/* Text-Kachel füllt den Whitespace und balanciert die Collage */}
            <div
              className="flex break-inside-avoid flex-col justify-center rounded-3xl p-6 text-white shadow-lift"
              style={{ background: "linear-gradient(150deg,#FF3131,#C81E1E)" }}
            >
              <span className="text-2xl font-extrabold leading-tight">Menschen, kein Tool.</span>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                An eurem Konto arbeiten mehrere gleichzeitig, jeder in seinem Bereich.
              </p>
            </div>
            {candids.map((src) => (
              <div key={src} className="break-inside-avoid overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.06]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="w-full [filter:brightness(1.06)_saturate(1.03)]" />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-6 grid max-w-5xl grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-6">
            {members.map((m) => (
              <div key={m.src} className="text-center">
                <div className="overflow-hidden rounded-2xl shadow-soft ring-1 ring-black/[0.06]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.name} loading="lazy" className="aspect-square w-full object-cover" />
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">{m.name}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
