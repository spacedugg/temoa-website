"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Donut, NodeFlow, KpiTile } from "../ui/MockKit";

export function WhyTemoa() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Warum TEMOA"
          title={
            <>
              Warum Marken mit uns arbeiten – <span className="text-gradient">und bleiben.</span>
            </>
          }
          description="Kein Dienstleister für Einzelteile, sondern ein Partner, der euren Account wie ein eigenes Geschäft führt – auf Marge, mit System und voller Transparenz."
        />

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {/* Card 1 — Marge: Donut */}
          <RevealItem>
            <div className="card group flex h-full flex-col p-7 transition-shadow duration-500 hover:shadow-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald-deep">
                <Icon name="margin" size={24} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">Marge statt Vanity-Umsatz</h3>
              <p className="mt-2 flex-1 leading-relaxed text-ink-muted">
                Wir steuern auf Profitabilität und TACoS – nicht auf Umsatz, der die Marge auffrisst.
              </p>
              <Donut
                className="mt-6"
                centerValue="34 %"
                centerLabel="Netto-Marge"
                segments={[
                  { label: "Deckungsbeitrag", value: 34, color: "#0E7CA0", delta: "+6,2 %", deltaUp: true },
                  { label: "Werbekosten", value: 18, color: "#FF9900", delta: "−4,1 %", deltaUp: true },
                  { label: "COGS & Gebühren", value: 48, color: "#E8ECEA" },
                ]}
              />
            </div>
          </RevealItem>

          {/* Card 2 — Ein Partner: NodeFlow */}
          <RevealItem>
            <div className="card group flex h-full flex-col p-7 transition-shadow duration-500 hover:shadow-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon name="puzzle" size={24} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">Ein Partner für alles</h3>
              <p className="mt-2 flex-1 leading-relaxed text-ink-muted">
                Strategie, Content, Advertising und Betrieb greifen ineinander – statt euch an drei
                Dienstleistern aufzureiben.
              </p>
              <NodeFlow
                className="mt-6"
                steps={[
                  { label: "Strategie", icon: <Icon name="strategy" size={18} />, color: "#023047" },
                  { label: "Content", icon: <Icon name="content" size={18} /> },
                  { label: "Advertising", icon: <Icon name="ads" size={18} />, color: "#FF3131" },
                  { label: "Betrieb", icon: <Icon name="account" size={18} />, color: "#0E7CA0" },
                ]}
                metric={{ value: "1 Team", label: "ein Ansprechpartner, ein System" }}
              />
            </div>
          </RevealItem>

          {/* Card 3 — Planbar: KPI tile */}
          <RevealItem>
            <div className="card group flex h-full flex-col p-7 transition-shadow duration-500 hover:shadow-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/10 text-violet">
                <Icon name="chart" size={24} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">Planbar &amp; transparent</h3>
              <p className="mt-2 flex-1 leading-relaxed text-ink-muted">
                Klare KPIs, wöchentliche Reports und ein fester Ansprechpartner. Kein Blindflug,
                keine Blackbox.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <KpiTile label="TACoS" value="9,4 %" delta="−4,1 %" deltaUp values={[28, 24, 26, 20, 18, 14, 9]} color="#0E7CA0" />
                <KpiTile label="Umsatz" value="€ 1,8 M" delta="+31 %" deltaUp values={[10, 14, 13, 18, 22, 27, 33]} color="#FF9900" />
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
