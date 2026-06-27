"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import type { RefData, RefCategory } from "@/lib/references";

const TABS: { key: RefCategory; label: string; blurb: string }[] = [
  { key: "main_images", label: "Produktbilder", blurb: "Hauptbilder und Listingbilder, die in Sekunden überzeugen." },
  { key: "a_plus", label: "EBC Content", blurb: "A+ und Premium A+: Module, die auf der Detailseite Fragen beantworten." },
  { key: "brand_store", label: "Brand Stores", blurb: "Eure Markenwelt mit Cross-Selling über das ganze Sortiment." },
  { key: "brand_story", label: "Brand Stories", blurb: "Aus einem Produkt wird eine Marke, die im Kopf bleibt." },
];

/* Placeholder tiles with varied aspect ratios, so the masonry looks
   right even before the real blob assets are available. */
const PLACEHOLDER_ASPECTS: Record<RefCategory, string[]> = {
  main_images: ["1/1", "1/1", "1/1", "1/1", "1/1", "1/1", "1/1", "1/1", "1/1", "1/1"],
  a_plus: ["3/4", "16/10", "3/5", "1/1", "3/4", "16/9", "2/3", "4/5", "3/4", "16/10"],
  brand_store: ["3/4", "16/10", "1/1", "3/5", "16/9", "3/4", "1/1", "4/5"],
  brand_story: ["3/4", "3/4", "3/4", "3/4", "16/9", "3/4", "3/4", "1/1"],
};

function Tile({ aspect }: { aspect: string }) {
  return (
    <div
      className="mb-3 w-full break-inside-avoid overflow-hidden rounded-xl bg-navy/[0.05] ring-1 ring-black/[0.06]"
      style={{ aspectRatio: aspect }}
    >
      <div className="h-full w-full animate-pulse bg-gradient-to-br from-navy/[0.03] via-navy/[0.07] to-navy/[0.03]" />
    </div>
  );
}

export function DesignGallery({ data }: { data: RefData }) {
  const [active, setActive] = useState<RefCategory>("main_images");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const tab = TABS.find((t) => t.key === active)!;

  // Flatten all reference images of the active category into one stream.
  const images = data[active].flatMap((l) => l.images.map((im) => im.url));

  return (
    <section className="relative bg-white py-12 md:py-16">
      <div className="container-x">
        {/* toggle */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-navy/[0.05] p-1.5">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active === t.key ? "text-white shadow-soft" : "text-ink-muted hover:text-ink"
                }`}
                style={active === t.key ? { backgroundImage: "var(--brand-gradient)" } : undefined}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-ink-muted">{tab.blurb}</p>

        <Reveal key={active} delay={0.05}>
          <div className="mt-10 gap-3 [column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 xl:columns-5">
            {images.length > 0
              ? images.map((url, i) => (
                  <button
                    key={`${url}-${i}`}
                    type="button"
                    onClick={() => setLightbox(url)}
                    className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl ring-1 ring-black/[0.05] transition-transform duration-300 hover:scale-[1.02]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" loading="lazy" className="w-full" />
                  </button>
                ))
              : PLACEHOLDER_ASPECTS[active].map((a, i) => <Tile key={i} aspect={a} />)}
          </div>
        </Reveal>

        {images.length === 0 && (
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-ink-faint">
            Die Beispiele werden aus unserer Referenz-Bibliothek geladen und erscheinen hier, sobald sie verbunden ist.
          </p>
        )}
      </div>

      {/* lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Schließen"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white"
            onClick={() => setLightbox(null)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
