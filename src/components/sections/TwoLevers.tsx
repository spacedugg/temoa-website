"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Counter } from "../ui/Counter";
import { AreaChart } from "../ui/MiniChart";
import { Icon } from "../ui/Icon";

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

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="card group relative h-full overflow-hidden p-8 transition-shadow hover:shadow-lift">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name="target" size={24} />
                </div>
                <span className="text-5xl font-bold tracking-tight text-gradient">
                  <Counter to={12.5} decimals={1} prefix="+" suffix=" %" />
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-ink">Conversion Rate</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">
                Bilder, A+ und Listings, die aus Klicks Käufer machen.
              </p>
              <AreaChart className="mt-6 h-24 w-full" points={[30, 34, 32, 40, 42, 50, 48, 58]} />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="card group relative h-full overflow-hidden p-8 transition-shadow hover:shadow-lift">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald-deep">
                  <Icon name="rocket" size={24} />
                </div>
                <span className="text-5xl font-bold tracking-tight text-gradient-emerald">
                  <Counter to={147} prefix="+" suffix=" %" />
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-ink">Organisches Wachstum</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">
                PPC und Prozesse, die rund um die Uhr profitabel skalieren.
              </p>
              <AreaChart
                className="mt-6 h-24 w-full"
                stroke="#0E7CA0"
                fill="rgba(14,124,160,0.16)"
                points={[24, 28, 30, 38, 46, 58, 72, 92]}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
