"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { testimonials, initials, type Testimonial } from "@/lib/testimonials";

export function Testimonials({ tone = "white" }: { tone?: "white" | "blue" } = {}) {
  const bg = tone === "blue" ? "bg-[#EDF5FB]" : "bg-white";
  const edge = tone === "blue" ? "#EDF5FB" : "#ffffff";
  return (
    <section className={`relative isolate overflow-hidden ${bg} py-20 md:py-24`}>
      {tone === "white" && <Ambient />}
      <div className="container-x">
        <SectionHeading
          eyebrow="Kundenstimmen"
          size="compact"
          title={
            <>
              Was unsere <span className="text-gradient">Kunden sagen.</span>
            </>
          }
        />
      </div>

      <div className="group relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent md:w-28" style={{ ["--tw-gradient-from" as string]: edge, backgroundImage: `linear-gradient(to right, ${edge}, transparent)` }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent md:w-28" style={{ backgroundImage: `linear-gradient(to left, ${edge}, transparent)` }} />
        <div className="flex w-max animate-marquee gap-5 px-5 group-hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="glass flex w-[20rem] shrink-0 flex-col rounded-3xl p-6 md:w-[23rem]">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, s) => (
          <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="#FF9900">
            <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
        „{t.quote}"
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-4 border-t border-black/[0.06] pt-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-ink">{t.name}</div>
          <div className="truncate text-xs text-ink-muted">{t.role}</div>
        </div>
        {/* Person photo (placeholder avatar until real photos are supplied) */}
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-sm font-bold text-white shadow-lift ring-2 ring-white"
          style={{ backgroundImage: "var(--brand-gradient)" }}
          aria-hidden
        >
          {initials(t.name)}
        </div>
      </figcaption>
    </figure>
  );
}
