"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import type { RefData, RefCategory, RefListing } from "@/lib/references";

const TABS: { key: RefCategory; label: string; blurb: string }[] = [
  { key: "main_images", label: "Produktbilder", blurb: "Ein Hauptbild plus sechs Listingbilder, die in Sekunden überzeugen." },
  { key: "a_plus", label: "EBC Content", blurb: "A+ und Premium A+: Module, die auf der Detailseite Fragen beantworten." },
  { key: "brand_store", label: "Brand Stores", blurb: "Eure Markenwelt mit Cross-Selling über das ganze Sortiment." },
  { key: "brand_story", label: "Brand Stories", blurb: "Aus einem Produkt wird eine Marke, die im Kopf bleibt." },
];

/* ---------------- placeholder tiles ---------------- */
function Tile({ className, label, small, tone = "neutral" }: { className?: string; label?: string; small?: boolean; tone?: "neutral" | "brand" | "navy" | "blue" }) {
  const bg =
    tone === "brand" ? "linear-gradient(135deg,#FFE7CC,#FFD0E4)"
      : tone === "navy" ? "linear-gradient(135deg,#0A1E2B,#0B4D6B)"
        : tone === "blue" ? "linear-gradient(135deg,#CDE6F4,#EAF3FB)"
          : "linear-gradient(135deg,#ffffff,#e7ecf2)";
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl ring-1 ring-black/[0.05] ${className ?? ""}`} style={{ background: bg }}>
      {label && <span className={`relative font-semibold uppercase tracking-[0.14em] ${tone === "navy" ? "text-white/70" : "text-ink-faint"} ${small ? "text-[10px]" : "text-xs"}`}>{label}</span>}
    </div>
  );
}

/* ---------------- real renderers (from blob) ---------------- */
function RealListing({ listing }: { listing: RefListing }) {
  const [main, ...rest] = listing.images;
  return (
    <div className="surface mx-auto max-w-md p-5 md:p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {main && <img src={main.url} alt="" className="w-full rounded-2xl ring-1 ring-black/[0.05]" />}
      {rest.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {rest.slice(0, 6).map((im) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={im.slot} src={im.url} alt="" className="aspect-square w-full rounded-2xl object-cover ring-1 ring-black/[0.05]" />
          ))}
        </div>
      )}
    </div>
  );
}

function RealStack({ listing, max = "760px" }: { listing: RefListing; max?: string }) {
  return (
    <div className="surface mx-auto overflow-hidden p-3 md:p-4" style={{ maxWidth: max }}>
      <div className="space-y-2.5">
        {listing.images.map((im) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={im.slot} src={im.url} alt="" className="w-full rounded-xl ring-1 ring-black/[0.04]" />
        ))}
      </div>
    </div>
  );
}

function RealCategory({ category, listings }: { category: RefCategory; listings: RefListing[] }) {
  return (
    <div className="space-y-10">
      {listings.map((l) =>
        category === "main_images" ? (
          <RealListing key={l.id} listing={l} />
        ) : (
          <RealStack key={l.id} listing={l} max={category === "brand_store" || category === "brand_story" ? "1000px" : "760px"} />
        )
      )}
    </div>
  );
}

/* ---------------- placeholder per category ---------------- */
function Placeholder({ category }: { category: RefCategory }) {
  if (category === "main_images") {
    return (
      <div className="surface mx-auto max-w-md p-5 md:p-6">
        <Tile className="aspect-square w-full" label="Hauptbild" tone="brand" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => <Tile key={i} className="aspect-square w-full" label={`Bild ${i + 1}`} small />)}
        </div>
      </div>
    );
  }
  if (category === "a_plus") {
    return (
      <div className="surface mx-auto max-w-[760px] overflow-hidden p-3 md:p-4">
        <div className="space-y-2.5">
          <Tile className="aspect-[16/6] w-full" label="A+ Hero-Modul" />
          <div className="grid grid-cols-2 gap-2.5">
            <Tile className="aspect-[4/3] w-full" small label="Bild" />
            <div className="flex flex-col justify-center gap-2 rounded-2xl bg-navy/[0.03] p-5 ring-1 ring-black/[0.05]">
              {[2 / 3, 1, 5 / 6, 3 / 4].map((w, i) => <span key={i} className="h-2 rounded-full bg-navy/12" style={{ width: `${w * 100}%` }} />)}
            </div>
          </div>
          <div className="relative">
            <Tile className="aspect-[16/7] w-full" label="Premium A+ Karussell" tone="navy" />
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold text-red">Premium A+</span>
          </div>
        </div>
      </div>
    );
  }
  if (category === "brand_store") {
    return (
      <div className="surface mx-auto max-w-4xl overflow-hidden p-0">
        <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-navy/[0.03] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red/40" /><span className="h-2.5 w-2.5 rounded-full bg-brand-400/60" /><span className="h-2.5 w-2.5 rounded-full bg-emerald/40" />
        </div>
        <div className="space-y-4 p-5">
          <Tile className="aspect-[16/5] w-full" label="Store Hero" tone="blue" />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => <Tile key={i} className="aspect-square w-full" small />)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-5 shadow-lift ring-1 ring-black/[0.06] md:p-7" style={{ background: "linear-gradient(135deg,#0A1E2B,#0B4D6B)" }}>
      <div className="flex gap-4">
        {(["brand", "blue", "neutral"] as const).map((t, i) => (
          <div key={i} className="w-1/3 rounded-2xl bg-white p-2.5 shadow-lift"><Tile className="aspect-[3/4] w-full" tone={t} /></div>
        ))}
      </div>
    </div>
  );
}

export function DesignGallery({ data }: { data: RefData }) {
  const [active, setActive] = useState<RefCategory>("main_images");
  const tab = TABS.find((t) => t.key === active)!;
  const listings = data[active];

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
          <div className="mt-10">
            {listings.length > 0 ? <RealCategory category={active} listings={listings} /> : <Placeholder category={active} />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
