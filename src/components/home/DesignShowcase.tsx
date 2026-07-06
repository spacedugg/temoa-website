"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { TiltCard } from "../ui/TiltCard";
import { LISTING_SETS, APLUS } from "@/lib/showcase";

/* One real listing set (main image + gallery) and one real A+ content set. */
const listing = LISTING_SETS[0];
const gallery = listing.images.slice(1, 7);
const aplus = APLUS.slice(0, 4);

export function DesignShowcase() {
  return (
    <section className="relative bg-white py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Designbeispiele"
          size="compact"
          title={
            <>
              So sieht <span className="text-gradient">Retail Ready</span> aus.
            </>
          }
          description="Ein komplettes Listing, vom Hauptbild bis zum A+ Content."
        />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Listing: main image + gallery */}
          <Reveal>
            <div className="glass rounded-3xl p-5 md:p-7">
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.05]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={listing.images[0]}
                  alt={`${listing.label} Hauptbild`}
                  loading="lazy"
                  className="aspect-square w-full object-contain"
                />
              </div>
              <div className="mt-3 grid grid-cols-6 gap-2">
                {gallery.map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-lg bg-white ring-1 ring-black/[0.04]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="aspect-square w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* A+ Content schwebend in 3D */}
          <Reveal direction="left" delay={0.1}>
            <div className="perspective relative py-6">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(255,153,0,0.22), rgba(255,49,49,0.10) 45%, transparent 70%)" }}
              />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="group" intensity={10}>
                  <div
                    className="overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-black/[0.06]"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    {aplus.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={src} alt="" loading="lazy" className="block w-full" />
                    ))}
                  </div>
                </TiltCard>
              </motion.div>

              <span
                className="absolute -right-2 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-lift ring-1 ring-black/[0.06]"
                style={{ transform: "translateZ(80px)" }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: "#FF3131" }} />
                Premium A+
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <a href="/design-beispiele" className="btn-ghost">
              Mehr Designbeispiele
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
