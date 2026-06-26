"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { TiltCard } from "../ui/TiltCard";

export function DesignShowcase() {
  return (
    <section className="relative bg-[#EDF5FB] py-20 md:py-24">
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
          {/* Listing-Set: 1 Hauptbild + 6 Listingbilder */}
          <Reveal>
            <div className="glass rounded-3xl p-5 md:p-7">
              <PlaceholderTile className="aspect-square w-full" label="Hauptbild" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PlaceholderTile key={i} className="aspect-square w-full" label={`Bild ${i + 1}`} small />
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
                  <div className="space-y-4" style={{ transform: "translateZ(40px)" }}>
                    <PlaceholderTile className="aspect-[16/9] w-full shadow-lift" label="A+ Modul · Hero" />
                    <div className="grid grid-cols-2 gap-4">
                      <PlaceholderTile className="aspect-[4/3] w-full shadow-lift" label="A+ Modul" small />
                      <PlaceholderTile className="aspect-[4/3] w-full shadow-lift" label="A+ Modul" small />
                    </div>
                    <PlaceholderTile className="aspect-[16/7] w-full shadow-lift" label="A+ Vergleich" small />
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

function PlaceholderTile({
  className,
  label,
  small,
}: {
  className?: string;
  label: string;
  small?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl ring-1 ring-black/[0.05] ${className ?? ""}`}
      style={{ background: "linear-gradient(135deg,#ffffff,#eaeef3)" }}
    >
      <div className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full bg-white/70 blur-2xl" />
      <span className={`relative font-semibold uppercase tracking-[0.14em] text-ink-faint ${small ? "text-[10px]" : "text-xs"}`}>
        {label}
      </span>
    </div>
  );
}
