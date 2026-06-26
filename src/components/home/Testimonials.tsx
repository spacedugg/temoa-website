"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";

type Testimonial = { quote: string; name: string; role: string };

/* Verbatim, echte Kundenzitate. Original-Wortlaut bleibt unverändert. */
const testimonials: Testimonial[] = [
  {
    quote:
      "Wir sind von 5k auf über 16k Bestellungen in Q1 '26 gewachsen. +50 % Conversion Rate und gleichzeitig TACoS runter auf 5,8 %. Wir sind damit hochprofitabel. Danke an euch!",
    name: "Andrea Hoffmann",
    role: "CMO Vita-World GmbH",
  },
  {
    quote: "Dank temoa konnten wir innerhalb von 6 Monaten unseren Umsatz verdoppeln!",
    name: "Roland Pladeck",
    role: "GF Greenfood Natural Products BV",
  },
  {
    quote:
      "Zusammen mit euch dominieren wir die Nische ‚Wasserfilter‘ auf Amazon. Bestseller Rang #1 dank perfektem Branding und optimalen Produktbildern. Außerdem launchen wir gerade ein Produkt in Amazon US mit euch, aber das wisst ihr ja ;)",
    name: "Laurenz Elbers",
    role: "GF Bachgold AG",
  },
  {
    quote:
      "Wir waren überrascht, wie viel man allein durch bessere Listings und gezielten Content rausholen kann, und das sieht man direkt in den Zahlen.",
    name: "Dennis Hoheusel",
    role: "GF FUTUM Handels GmbH",
  },
  {
    quote: "Die Performance der Ergebnisse war hervorragend, Branding und Design passen perfekt zusammen.",
    name: "Gianluca G.",
    role: "GF P+G E-Com GbR",
  },
  {
    quote:
      "Bisher sind alle Artikel, die wir mit temoa erstellt und bei Amazon gelistet haben, eingeschlagen. Ich werde weitere Produkte mit euch umsetzen!",
    name: "Gilbert Baeumer",
    role: "GF Baeumer Online GmbH",
  },
  {
    quote: "Ich war extrem zufrieden: kurzer Draht und top Ergebnisse.",
    name: "Markus Bieletzki",
    role: "Gründer badSTARK",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 md:py-24">
      <Ambient />
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
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />
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
