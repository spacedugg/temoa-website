"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

const steps = [
  { n: "1", title: "Bestandsaufnahme", body: "Suchdaten, Wettbewerb, Margen und Account-Health durchleuchtet – Potenzial je ASIN in Euro beziffert." },
  { n: "2", title: "Plan & Forecast", body: "Klares Zielbild, KPI-Korridore für TACoS, Marge und Buy-Box, Roadmap nach Wirkung sortiert." },
  { n: "3", title: "Listing kaufstark machen", body: "Hauptbild, A+, SEO und Brand Store – jedes Listing wird zum verkaufenden Schaufenster, bevor ein Euro in Ads fließt." },
  { n: "4", title: "Ads scharfstellen", body: "Sponsored Products, Brands und Display aufgesetzt, Gebote und Budgets mehrmals pro Woche nachgezogen." },
  { n: "5", title: "Betreuen & nachschärfen", body: "FBA-Forecast, Buy-Box und Cases im Griff, monatliche Reports und Quartals-Reviews gegen die Ziele." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="prozess" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="So arbeiten wir"
          title={
            <>
              In fünf Schritten zum <span className="text-gradient">profitablen Konto.</span>
            </>
          }
          align="center"
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl pl-2">
          {/* track + animated progress */}
          <div className="absolute bottom-7 left-[34px] top-7 w-0.5 bg-black/[0.08]" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute bottom-7 left-[34px] top-7 w-0.5 origin-top bg-gradient-to-b from-brand-500 via-violet to-cyan"
          />

          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} direction="up" delay={i * 0.04}>
                <div className="relative flex items-start gap-6">
                  <div className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl bg-white text-xl font-bold text-brand-600 shadow-lift">
                    <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-brand-200" />
                    {s.n}
                  </div>
                  <div className="card flex-1 p-6 transition-shadow hover:shadow-lift">
                    <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <a href="/gespraech-vereinbaren" className="btn-primary">Gespräch vereinbaren</a>
        </div>
      </div>
    </section>
  );
}
