"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "../ui/Reveal";
import { GALLERY, APLUS } from "@/lib/showcase";

const tiles = GALLERY.slice(0, 12);

export function ContentStudio() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Quer durch die Kategorien"
            title={
              <>
                Ein Querschnitt aus <span className="text-gradient">unserem Studio.</span>
              </>
            }
            description="Werkzeug, Supplements, Garten, Haushalt – Hauptbilder, die im Suchergebnis auffallen, und Infografiken, die in Sekunden die richtige Kaufentscheidung auslösen. Fahrt über ein Bild, um die Marke zu sehen."
          />
          <a href="/gespraech-vereinbaren" className="btn-ghost shrink-0">Gespräch vereinbaren</a>
        </div>

        {/* real listing gallery */}
        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" stagger={0.05}>
          {tiles.map((t, i) => (
            <RevealItem key={t.url + i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-navy/[0.07] bg-white p-3 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={t.url}
                    alt={t.label}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-white via-white/90 to-transparent p-3 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs font-semibold text-ink">{t.label}</span>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* A+ content showcase */}
        {APLUS.length > 0 && (
          <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <Reveal>
              <div>
                <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />A+ / Premium A+</span>
                <h3 className="mt-4 text-2xl font-bold text-ink">A+ Content, der den Warenkorb füllt.</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  Unter den Bullets fängt die Markenwelt an: Module, die Vorteile belegen, Einwände
                  vorwegnehmen und die Marke greifbar machen – konsistent über alle ASINs und so
                  strukturiert, dass auch Rufus und COSMO die Antworten finden.
                </p>
                <a href="/gespraech-vereinbaren" className="btn-primary mt-6">Gespräch vereinbaren</a>
              </div>
            </Reveal>
            <Reveal direction="left">
              <div className="overflow-hidden rounded-3xl border border-navy/[0.07] bg-white shadow-lift">
                {/* browser chrome */}
                <div className="flex items-center gap-1.5 border-b border-navy/[0.06] bg-canvas-alt px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
                </div>
                <div className="max-h-[28rem] space-y-0 overflow-hidden">
                  {APLUS.slice(0, 4).map((src, i) => (
                    <div key={src} className="relative aspect-[97/40] w-full">
                      <Image src={src} alt={`A+ Modul ${i + 1}`} fill sizes="(max-width:1024px) 100vw, 720px" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
