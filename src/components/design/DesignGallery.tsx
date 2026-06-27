"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import type { RefData, RefCategory, RefListing } from "@/lib/references";

const TABS: { key: RefCategory; label: string; blurb: string }[] = [
  { key: "main_images", label: "Produktbilder", blurb: "Ein Hauptbild plus weitere Listingbilder, die in Sekunden überzeugen." },
  { key: "a_plus", label: "EBC Content", blurb: "A+ und Premium A+: Module, die auf der Detailseite Fragen beantworten." },
  { key: "brand_store", label: "Brand Stores", blurb: "Eure Markenwelt mit Cross-Selling über das ganze Sortiment." },
  { key: "brand_story", label: "Brand Stories", blurb: "Aus einem Produkt wird eine Marke, die im Kopf bleibt." },
];

type Lightbox = { kind: "image"; url: string } | { kind: "listing"; listing: RefListing } | null;

/* ---------- main_images: 1 Hauptbild + bis zu 6 (klickbar als Listing) ---------- */
function ListingCard({ listing, onOpen }: { listing: RefListing; onOpen: () => void }) {
  const [main, ...rest] = listing.images;
  return (
    <button type="button" onClick={onOpen} className="surface surface-hover block w-full p-4 text-left md:p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {main && <img src={main.url} alt="" loading="lazy" className="aspect-square w-full rounded-2xl object-cover ring-1 ring-black/[0.05]" />}
      {rest.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {rest.slice(0, 6).map((im) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={im.slot} src={im.url} alt="" loading="lazy" className="aspect-square w-full rounded-xl object-cover ring-1 ring-black/[0.05]" />
          ))}
        </div>
      )}
    </button>
  );
}

/* ---------- a_plus: vertikale Stacks, mehrere nebeneinander ---------- */
function APlusGrid({ listings, onOpen }: { listings: RefListing[]; onOpen: (u: string) => void }) {
  return (
    <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <div key={l.id} className="surface overflow-hidden p-3">
          <div className="space-y-2">
            {l.images.map((im) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={im.slot} src={im.url} alt="" loading="lazy" onClick={() => onOpen(im.url)} className="w-full cursor-zoom-in rounded-lg ring-1 ring-black/[0.04]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- brand_store: 2:3 Screenshot-Kacheln, Scroll-Durchlauf auf Play ---------- */
function StoreTile({ listing, onOpen }: { listing: RefListing; onOpen: (u: string) => void }) {
  const [play, setPlay] = useState(false);
  const img = listing.images[0];
  if (!img) return null;
  return (
    <div className="surface group relative aspect-[2/3] overflow-hidden p-0">
      {/* tall screenshot scrolls through on play (top -> bottom) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.url}
        alt=""
        loading="lazy"
        className="absolute inset-x-0 top-0 w-full will-change-transform"
        style={{
          transform: play ? "translateY(calc(-100% + 100%))" : "translateY(0)",
          transition: play ? "transform 8s linear" : "transform 0.5s ease",
        }}
        ref={(el) => {
          // scroll exactly to the bottom of the (tall) image
          if (el && play) el.style.transform = `translateY(${el.parentElement!.clientHeight - el.clientHeight}px)`;
          if (el && !play) el.style.transform = "translateY(0)";
        }}
        onClick={() => onOpen(img.url)}
      />
      <button
        type="button"
        onClick={() => setPlay((p) => !p)}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-lift backdrop-blur transition group-hover:scale-105"
        aria-label="Store durchlaufen"
      >
        {play ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5h3v14H8zM13 5h3v14h-3z" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7z" /></svg>
        )}
      </button>
    </div>
  );
}

/* ---------- brand_story: Background + Karten ---------- */
function StoryModule({ listing }: { listing: RefListing }) {
  const [bg, ...cards] = listing.images;
  if (!bg) return null;
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.06]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bg.url} alt="" loading="lazy" className="h-full w-full object-cover" style={{ minHeight: "16rem" }} />
      {cards.length > 0 && (
        <div className="absolute inset-0 flex items-center gap-3 overflow-x-auto p-5 md:gap-4 md:p-7">
          {cards.map((im) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={im.slot} src={im.url} alt="" loading="lazy" className="h-[78%] w-auto shrink-0 rounded-2xl shadow-lift ring-1 ring-white/20" />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyNote() {
  return (
    <p className="mx-auto max-w-xl py-10 text-center text-sm text-ink-faint">
      In dieser Kategorie sind noch keine Beispiele aus der Referenz-Bibliothek verbunden.
    </p>
  );
}

export function DesignGallery({ data }: { data: RefData }) {
  const [active, setActive] = useState<RefCategory>("main_images");
  const [lightbox, setLightbox] = useState<Lightbox>(null);
  const tab = TABS.find((t) => t.key === active)!;
  const listings = data[active];

  return (
    <section className="relative bg-white py-12 md:py-16">
      <div className="container-x">
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-navy/[0.05] p-1.5">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${active === t.key ? "text-white shadow-soft" : "text-ink-muted hover:text-ink"}`}
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
            {listings.length === 0 ? (
              <EmptyNote />
            ) : active === "main_images" ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {listings.map((l) => (
                  <ListingCard key={l.id} listing={l} onOpen={() => setLightbox({ kind: "listing", listing: l })} />
                ))}
              </div>
            ) : active === "a_plus" ? (
              <APlusGrid listings={listings} onOpen={(u) => setLightbox({ kind: "image", url: u })} />
            ) : active === "brand_store" ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {listings.map((l) => (
                  <StoreTile key={l.id} listing={l} onOpen={(u) => setLightbox({ kind: "image", url: u })} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {listings.map((l) => (
                  <StoryModule key={l.id} listing={l} />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 p-6 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <button type="button" aria-label="Schließen" className="fixed right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white" onClick={() => setLightbox(null)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div onClick={(e) => e.stopPropagation()} className="my-auto">
            {lightbox.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={lightbox.url} alt="" className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" />
            ) : (
              <div className="mx-auto max-w-md rounded-3xl bg-white p-4 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {lightbox.listing.images[0] && <img src={lightbox.listing.images[0].url} alt="" className="w-full rounded-2xl" />}
                <div className="mt-3 grid grid-cols-3 gap-2.5">
                  {lightbox.listing.images.slice(1).map((im) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={im.slot} src={im.url} alt="" className="aspect-square w-full rounded-lg object-cover" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
