"use client";

import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { testimonials, initials, type Testimonial } from "@/lib/testimonials";

const logos = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.png`);

/** Client-logo marquee + a compact trust line. Drop onto any subpage. */
export function ProofStrip({ tone = "white" }: { tone?: "white" | "blue" }) {
  return (
    <section className={`relative ${tone === "blue" ? "bg-[#EDF5FB]" : "bg-white"} py-12 md:py-14`}>
      <div className="container-x">
        <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">
          60+ Marken vertrauen auf temoa
        </p>
        <div className="relative mt-7 overflow-hidden">
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-ink-muted">
          <span className="inline-flex items-center gap-2">
            <Stars /> 4,9 / 5 Kundenbewertung
          </span>
          <span className="hidden h-4 w-px bg-black/10 sm:block" />
          <span>21 Mio € betreuter Jahresumsatz</span>
          <span className="hidden h-4 w-px bg-black/10 sm:block" />
          <span>98 % Kundenbindung</span>
        </div>
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

/** Static testimonial cards for subpages. */
export function Quotes({
  eyebrow = "Kundenstimmen",
  title,
  items,
  tone = "blue",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  items?: Testimonial[];
  tone?: "white" | "blue";
}) {
  const list = items ?? testimonials.slice(0, 3);
  return (
    <section className={`relative ${tone === "blue" ? "bg-[#EDF5FB]" : "bg-white"} py-16 md:py-20`}>
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {eyebrow}
            </span>
          </Reveal>
          {title && (
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
            </Reveal>
          )}
        </div>
        <RevealGroup className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3" stagger={0.07}>
          {list.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <figure className="surface flex h-full flex-col p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="#FF9900">
                      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">„{t.quote}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-black/[0.06] pt-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white" style={{ backgroundImage: "var(--brand-gradient)" }} aria-hidden>
                    {initials(t.name)}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-ink">{t.name}</div>
                    <div className="truncate text-xs text-ink-muted">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
