"use client";

import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Counter } from "../ui/Counter";
import { Icon } from "../ui/Icon";
import { BeforeAfter } from "../ui/BeforeAfter";
import { LISTING_SETS } from "@/lib/showcase";

const lever = LISTING_SETS.find((s) => s.before) ?? LISTING_SETS[0];

export function TwoLevers() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Zwei Hebel"
          title={
            <>
              Ranking und Conversion – <span className="text-gradient">wir drehen an beiden.</span>
            </>
          }
          description="Sichtbarkeit ohne Conversion verbrennt Budget. Conversion ohne Sichtbarkeit bleibt unsichtbar. Wir bewegen beide Hebel gleichzeitig – das ist der Unterschied zwischen teurem Traffic und profitablem Wachstum."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Before / After listing */}
          <Reveal direction="right">
            <div>
              {lever?.before && lever?.after ? (
                <BeforeAfter before={lever.before} after={lever.after} />
              ) : null}
              <p className="mt-3 text-center text-sm text-ink-faint">
                ⇆ Ziehen: dasselbe Produkt – altes Listing vs. unser Content. Genau hier entsteht die Conversion.
              </p>
            </div>
          </Reveal>

          {/* Stat cards */}
          <div className="flex flex-col gap-6">
            <Reveal direction="left">
              <div className="card group flex items-center gap-6 overflow-hidden p-7 transition-shadow hover:shadow-lift">
                <div className="flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon name="target" size={24} />
                  </div>
                  <span className="mt-5 block text-5xl font-extrabold tracking-tight text-gradient">
                    <Counter to={12.5} decimals={1} prefix="+" suffix=" %" />
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-ink">Conversion Rate</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Bilder, A+ und Listings, die aus Klicks Käufer machen.
                  </p>
                </div>
                {lever && (
                  <div className="relative hidden h-36 w-32 shrink-0 overflow-hidden rounded-2xl border border-navy/[0.07] bg-white sm:block">
                    <Image src={lever.images[3] ?? lever.images[1]} alt="Infografik" fill sizes="160px" className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="card group flex items-center gap-6 overflow-hidden p-7 transition-shadow hover:shadow-lift">
                <div className="flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                    <Icon name="rocket" size={24} />
                  </div>
                  <span className="mt-5 block text-5xl font-extrabold tracking-tight text-gradient-emerald">
                    <Counter to={147} prefix="+" suffix=" %" />
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-ink">Organisches Wachstum</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    PPC und Prozesse, die rund um die Uhr profitabel skalieren.
                  </p>
                </div>
                {lever && (
                  <div className="relative hidden h-36 w-32 shrink-0 overflow-hidden rounded-2xl border border-navy/[0.07] bg-white sm:block">
                    <Image src={lever.images[5] ?? lever.images[2]} alt="Infografik" fill sizes="160px" className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
