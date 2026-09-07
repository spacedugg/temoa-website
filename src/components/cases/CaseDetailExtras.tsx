"use client";

import { useState } from "react";
import { cases, type CaseStudy } from "@/lib/cases";
import { Reveal } from "../ui/Reveal";
import { Kachel, Lupe } from "./CaseListingView";

/* Das einfache Raster fuer Faelle, zu denen einzelne Aufnahmen vorliegen,
   aber kein vollstaendiges Listing. Wo ein Listing vorliegt, steht es weiter
   oben im Fall (`CaseListingView`), und diese Sektion entfaellt. */
export function CaseGallery({ c }: { c: CaseStudy }) {
  const [offen, setOffen] = useState<string | null>(null);
  if (c.listing || !c.images || c.images.length === 0) return null;
  return (
    <section className="relative ground py-12 md:py-16">
      <div className="container-x">
        <Reveal>
          <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Mehr aus diesem Projekt
          </h2>
        </Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
          {c.images.map((src) => (
            <Kachel key={src} src={src} onClick={() => setOffen(src)} className="aspect-square rounded-2xl" />
          ))}
        </div>
      </div>
      {offen && <Lupe src={offen} onClose={() => setOffen(null)} />}
    </section>
  );
}

/* Bottom-of-page links to the other case studies. */
export function OtherCases({ slug }: { slug: string }) {
  const others = cases.filter((c) => c.slug !== slug);
  return (
    <section className="ground-tint relative py-14 md:py-16">
      <div className="container-x">
        <h2 className="mb-8 text-center text-xl font-bold tracking-tight text-ink md:text-2xl">Weitere Case Studies</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {others.map((c) => (
            <a key={c.slug} href={`/ergebnisse/${c.slug}`} className="group relative isolate flex h-40 flex-col justify-end overflow-hidden rounded-2xl p-5 shadow-soft ring-1 ring-black/5">
              {c.bgImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.bgImage} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10">
                <div className="text-2xl font-extrabold leading-none text-white">{c.preview.value}</div>
                <div className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white/75">{c.preview.label}</div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="/ergebnisse" className="btn-ghost">Alle Case Studies</a>
        </div>
      </div>
    </section>
  );
}
