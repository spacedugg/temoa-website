"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { IconChip, Chip } from "../ui/MockKit";
import { LISTING_SETS } from "@/lib/showcase";

const set = LISTING_SETS[0];

export function ProofPoint() {
  if (!set) return null;
  const [main, ...rest] = set.images;
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          {/* copy */}
          <div>
            <SectionHeading
              eyebrow="Content, der verkauft"
              align="left"
              title={
                <>
                  Ein Listing, das die <span className="text-gradient">Kauffrage entscheidet.</span>
                </>
              }
              description="Hauptbild und Infografiken, die Vorteile, Anwendung und Vertrauen auf den Punkt bringen – und jeden Zweifel ausräumen, bevor der Daumen weiterscrollt. So wird aus einem Klick ein Kauf."
            />
            <Reveal>
              <a href="/design-beispiele" className="btn-ghost mt-8">
Mehr Listing-Beispiele ansehen
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </Reveal>
          </div>

          {/* one calm listing */}
          <Reveal direction="left">
            <div className="relative">
              <div className="pointer-events-none absolute -right-10 top-10 h-64 w-64 rounded-full bg-brand-100/60 blur-3xl" />
              <div className="relative grid grid-cols-[1.4fr_1fr] gap-4">
                <div className="relative overflow-hidden rounded-3xl border border-navy/[0.07] bg-white p-3 shadow-lift">
                  <div className="relative aspect-square w-full">
                    <Image src={main} alt={`${set.label} – Hauptbild`} fill sizes="(max-width:1024px) 60vw, 360px" className="object-contain" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {rest.slice(0, 2).map((src, i) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.12 }}
                      className="relative flex-1 overflow-hidden rounded-2xl border border-navy/[0.07] bg-white p-2.5 shadow-soft"
                    >
                      <div className="relative h-full min-h-[7rem] w-full">
                        <Image src={src} alt={`${set.label} – Infografik ${i + 2}`} fill sizes="200px" className="object-contain" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* amazon accent chips */}
              <IconChip className="absolute -left-4 top-1/3">{Chip.star}</IconChip>
              <IconChip className="absolute -bottom-4 right-1/3">{Chip.crown}</IconChip>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
