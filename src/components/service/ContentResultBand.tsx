"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";

function RisingBars({ color }: { color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const heights = [34, 48, 58, 76, 100];
  return (
    <div ref={ref} className="flex h-12 items-end gap-1.5">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-2.5 rounded-sm"
          style={{ background: i === heights.length - 1 ? color : `${color}55` }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${h}%` } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      ))}
    </div>
  );
}

const items: { icon: IconName; kpi: string; title: string; body: string; color: string }[] = [
  {
    icon: "search",
    kpi: "Impressionen",
    title: "Höherer Impressionsanteil",
    body: "Sichtbar bei genau den Suchbegriffen, die kaufen.",
    color: "#FF9900",
  },
  {
    icon: "target",
    kpi: "Klickrate",
    title: "Maximale Klickrate",
    body: "Das Hauptbild gewinnt den Klick im Suchergebnis.",
    color: "#FF3131",
  },
  {
    icon: "spark",
    kpi: "Conversion",
    title: "Conversion Rate Uplift",
    body: "Die Detailseite überzeugt in Sekunden zum Kauf.",
    color: "#0E7CA0",
  },
];

export function ContentResultBand() {
  return (
    <section className="relative bg-white py-12 md:py-16">
      <div className="container-x">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm font-bold uppercase tracking-[0.16em] text-ink-faint">
            Wofür wir Content bauen
          </p>
        </Reveal>
        <RevealGroup className="mx-auto mt-8 grid max-w-5xl items-stretch gap-4 md:grid-cols-3" stagger={0.08}>
          {items.map((it, i) => (
            <RevealItem key={it.kpi} className="h-full">
              <div className="surface surface-hover relative flex h-full flex-col p-6">
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 text-xs font-bold" style={{ color: it.color }}>
                  {it.kpi}
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl" style={{ color: it.color, background: `${it.color}1A` }}>
                  <Icon name={it.icon} size={22} />
                </span>
                <div className="mt-5">
                  <RisingBars color={it.color} />
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{it.body}</p>
                {i < items.length - 1 && (
                  <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-ink-faint md:block">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
