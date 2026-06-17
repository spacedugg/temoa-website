"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { LISTING_SETS } from "@/lib/showcase";

const labels = ["Hauptbild", "Infografik", "Infografik", "Infografik", "Lifestyle", "A+ Modul", "Vergleich"];

export function ListingShowcase() {
  const [active, setActive] = useState(0);
  const set = LISTING_SETS[active] ?? LISTING_SETS[0];
  if (!set) return null;

  const [main, ...rest] = set.images;

  return (
    <section id="listing" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-canvas" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-brand-100/50 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Eine komplette Bilderstrecke"
          title={
            <>
              Sieben Bilder, die euer Produkt <span className="text-gradient">verkaufen.</span>
            </>
          }
          description="Das Hauptbild holt den Klick aus den Suchergebnissen, sechs Infografiken nehmen Maß, zeigen Anwendung und räumen die letzten Zweifel aus. Wählt eine Marke und seht, wie eine durchdachte Galerie aufgebaut ist."
        />

        {/* Set selector */}
        <Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {LISTING_SETS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  active === i
                    ? "border-transparent bg-ink text-white shadow-soft"
                    : "border-navy/10 bg-white text-ink-muted hover:border-navy/20 hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={set.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45 }}
            className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_1fr]"
          >
            {/* Main image */}
            <div className="group relative overflow-hidden rounded-3xl border border-navy/[0.07] bg-white p-4 shadow-lift">
              <span className="absolute left-6 top-6 z-10 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                Hauptbild
              </span>
              <div className="relative aspect-square w-full">
                <Image
                  src={main}
                  alt={`${set.label} – Hauptbild`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* Infographic grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              {rest.slice(0, 6).map((src, i) => (
                <motion.div
                  key={src}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
                  }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-navy/[0.07] bg-white p-2.5 shadow-soft"
                >
                  <span className="absolute left-3 top-3 z-10 rounded-md bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-ink-muted backdrop-blur-sm">
                    {labels[i + 1] ?? "Bild"}
                  </span>
                  <div className="relative aspect-square w-full">
                    <Image
                      src={src}
                      alt={`${set.label} – Infografik ${i + 2}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 200px"
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink-faint">
              Echte Arbeit aus unserem Content Studio · gerade zu sehen: <span className="font-semibold text-ink-muted">{set.label}</span>
            </p>
            <a href="/gespraech-vereinbaren" className="btn-ghost">Gespräch vereinbaren</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
