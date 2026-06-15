"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Orbit } from "../ui/MockKit";

const markets = [
  { code: "DE", angle: -90, radius: 34 },
  { code: "FR", angle: -18, radius: 50 },
  { code: "IT", angle: 54, radius: 34 },
  { code: "ES", angle: 126, radius: 50 },
  { code: "NL", angle: 198, radius: 34 },
];

function MarketChip({ code }: { code: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-navy/[0.08] bg-white text-sm font-bold text-ink shadow-lift">
      {code}
    </div>
  );
}

export function Internationalisierung() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Internationalisierung"
              title={<>Ein System, <span className="text-gradient">fünf Märkte.</span></>}
              description="Neue Marktplätze rollen wir nativ aus – nicht nur übersetzt. Landesspezifische Keywords, Content und Advertising, zentral gesteuert und vergleichbar reportet."
            />
            <div className="mt-8 space-y-4">
              {[
                "Marktplatzgerechte Listings statt 1:1-Übersetzung",
                "Lokales Keyword-Research je Land",
                "Zentrales Reporting über alle Märkte hinweg",
              ].map((t) => (
                <Reveal key={t} direction="right">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald/10 text-emerald-deep">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="text-ink-muted">{t}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="left">
            <div className="relative mx-auto max-w-md">
              <Orbit
                center={
                  <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-center text-brand-700 shadow-glow">
                    <Icon name="globe" size={26} />
                    <span className="mt-1 text-xs font-bold">Amazon EU</span>
                  </div>
                }
                items={markets.map((m) => ({ node: <MarketChip code={m.code} />, angle: m.angle, radius: m.radius }))}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
