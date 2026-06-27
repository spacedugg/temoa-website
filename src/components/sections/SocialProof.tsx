"use client";

import Image from "next/image";

const logos = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.png`);

/** Client-logo marquee + a compact trust line. Drop onto any subpage.
 *  `bare` zeigt nur die Logos (ohne Überschrift und Trust-Zeile) — sinnvoll,
 *  wenn die Zahlen schon in einer eigenen Sektion auf der Seite stehen. */
export function ProofStrip({ tone = "white", bare = false }: { tone?: "white" | "blue"; bare?: boolean }) {
  return (
    <section className={`relative ${tone === "blue" ? "bg-[#EDF5FB]" : "bg-white"} py-12 md:py-14`}>
      <div className="container-x">
        {!bare && (
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">
            60+ Marken vertrauen auf temoa
          </p>
        )}
        <div className={`relative overflow-hidden ${bare ? "" : "mt-7"}`}>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--edge)] to-transparent" style={{ ["--edge" as string]: tone === "blue" ? "#EDF5FB" : "#ffffff" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--edge)] to-transparent" style={{ ["--edge" as string]: tone === "blue" ? "#EDF5FB" : "#ffffff" }} />
          <div className="flex w-max animate-marquee gap-12">
            {[...logos, ...logos].map((src, i) => (
              <div key={`${src}-${i}`} className="relative h-9 w-28 shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-10 md:w-32">
                <Image src={src} alt="" fill sizes="128px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>
        {!bare && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-ink-muted">
            <span className="inline-flex items-center gap-2">
              <Stars /> 4,9 / 5 Kundenbewertung
            </span>
            <span className="hidden h-4 w-px bg-black/10 sm:block" />
            <span>21 Mio € betreuter Jahresumsatz</span>
            <span className="hidden h-4 w-px bg-black/10 sm:block" />
            <span>98 % Kundenbindung</span>
          </div>
        )}
      </div>
    </section>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#FF9900">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}
