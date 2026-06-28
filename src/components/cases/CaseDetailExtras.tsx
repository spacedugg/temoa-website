"use client";

import { useState } from "react";
import { cases, type CaseStudy } from "@/lib/cases";
import { Reveal } from "../ui/Reveal";

/* Per-case image gallery. Images live under /public/case_studies/<slug>/…
 * and are listed in the case's `images` array. Click opens a simple
 * lightbox. */
export function CaseGallery({ c }: { c: CaseStudy }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!c.images || c.images.length === 0) return null;
  return (
    <section className="relative bg-white py-12 md:py-16">
      <div className="container-x">
        <Reveal>
          <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Mehr aus diesem Projekt
          </h2>
        </Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
          {c.images.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen(src)}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-canvas-alt shadow-soft ring-1 ring-black/[0.05]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <button type="button" aria-label="Schließen" className="fixed right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-ink shadow-lift" onClick={() => setOpen(null)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open} alt="" className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

/* Bottom-of-page links to the other case studies. */
export function OtherCases({ slug }: { slug: string }) {
  const others = cases.filter((c) => c.slug !== slug);
  return (
    <section className="relative bg-[#EDF5FB] py-14 md:py-16">
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
                <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/70">{c.preview.label}</div>
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
