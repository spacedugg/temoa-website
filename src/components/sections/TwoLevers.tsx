"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Counter } from "../ui/Counter";
import { Icon } from "../ui/Icon";
import { KpiTile, MiniDonut } from "../ui/MockKit";
import { LISTING_SETS } from "@/lib/showcase";

const ourThumb = LISTING_SETS[0]?.images?.[0];

function Stars({ n = 5, filled = 5 }: { n?: number; filled?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < filled ? "#FF9900" : "#E3E7E5"}>
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}

const rows = [
  { rank: 1, ours: true, title: "w-3/4", stars: 5, reviews: "2.481", price: "€ 29,99", badge: "Bestseller" },
  { rank: 2, title: "w-2/3", stars: 4, reviews: "612" },
  { rank: 3, title: "w-1/2", stars: 4, reviews: "203" },
  { rank: 4, title: "w-3/5", stars: 3, reviews: "88" },
];

function SearchRank() {
  return (
    <div className="rounded-3xl border border-navy/[0.07] bg-white p-5 shadow-lift">
      <div className="flex items-center justify-between border-b border-navy/[0.06] pb-3">
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <Icon name="search" size={16} />
          <span className="font-medium text-ink">„hauptkeyword eurer kategorie"</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2 py-1 text-[11px] font-semibold text-emerald-deep">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 9l4-4 2 2 0-3-3 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          von #14 auf #1
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.rank}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`flex items-center gap-3 rounded-2xl p-2.5 ${
              r.ours ? "bg-brand-50 ring-1 ring-brand-200" : ""
            }`}
          >
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${r.ours ? "bg-ink text-white" : "bg-navy/[0.06] text-ink-faint"}`}>
              {r.rank}
            </span>
            <div className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-navy/[0.06] ${r.ours ? "bg-white" : "bg-canvas-alt"}`}>
              {r.ours && ourThumb && (
                <Image src={ourThumb} alt="" fill sizes="48px" className="object-contain p-1" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className={`h-2.5 rounded-full ${r.ours ? "bg-ink/80" : "bg-navy/[0.12]"} ${r.title}`} />
              <div className="mt-1.5 flex items-center gap-2">
                <Stars filled={r.stars} />
                <span className="text-[11px] text-ink-faint">{r.reviews}</span>
                {r.badge && (
                  <span className="rounded bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{r.badge}</span>
                )}
              </div>
            </div>
            {r.price && <span className="shrink-0 text-sm font-bold text-ink">{r.price}</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TwoLevers() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Zwei Hebel"
          title={
            <>
              Sichtbarkeit und <span className="text-gradient">Conversion.</span>
            </>
          }
          description="Sichtbarkeit ohne kaufstarkes Listing bleibt teuer; ein gutes Listing ohne Sichtbarkeit bleibt ungesehen. Wir ziehen beide Hebel parallel."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Ranking visual */}
          <Reveal direction="right">
            <div>
              <SearchRank />
              <p className="mt-3 text-center text-sm text-ink-faint">
                Mehr Relevanz und eine höhere Kaufquote heben euch organisch nach oben.
              </p>
            </div>
          </Reveal>

          {/* Stat cards */}
          <div className="flex flex-col gap-6">
            <Reveal direction="left">
              <div className="card group flex items-center gap-6 p-7 transition-shadow hover:shadow-lift">
                <div className="flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red/[0.08] text-violet">
                    <Icon name="target" size={24} />
                  </div>
                  <span className="mt-5 block text-5xl font-extrabold tracking-tight text-gradient">
                    <Counter to={12.5} decimals={1} prefix="+" suffix=" %" />
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-ink">höhere Kaufquote</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Hauptbild, Galerie und A+, die aus Besuchern Käufer machen.
                  </p>
                </div>
                <MiniDonut value={62} label="Add-to-Cart" color="#FF3131" track="#FFD7D2" className="hidden h-28 w-28 shrink-0 sm:block" />
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="card group flex items-center gap-6 p-7 transition-shadow hover:shadow-lift">
                <div className="flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald-deep">
                    <Icon name="rocket" size={24} />
                  </div>
                  <span className="mt-5 block text-5xl font-extrabold tracking-tight text-gradient-emerald">
                    <Counter to={80} suffix=" %" />
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-ink">Umsatz ohne Adspend</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Platzierungen, die halten, auch wenn das Werbebudget pausiert.
                  </p>
                </div>
                <KpiTile className="hidden w-36 shrink-0 sm:block" label="Organisch" value="80 %" delta="+31%" deltaUp values={[20, 28, 34, 42, 55, 68, 80]} color="#0E7CA0" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
