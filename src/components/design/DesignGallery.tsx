"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "../ui/Reveal";
import { ExpandedShell } from "./ExpandedShell";
import type { RefData, RefCategory, RefListing, RefImage } from "@/lib/references";

/* ============================================================================
 * Design-Beispiele Galerie
 * Baut die Sales-Room-Content-Showcases (Listings, EBC/A+, Brand Stores,
 * Brand Stories) nach der Design- & Verhaltens-Spezifikation nach. Maße,
 * Seitenverhältnisse und Slide-/Zoom-Verhalten folgen der Guideline; die
 * Quelle sind die References-Blobs (kein Vorher/Nachher, keine Geschenk-
 * Badge, da hier ausschließlich freie Referenz-Beispiele gezeigt werden).
 * Seitenverhältnisse werden clientseitig aus den echten Bildmaßen abgeleitet.
 * ========================================================================== */

const TABS: { key: RefCategory; label: string; blurb: string }[] = [
  { key: "main_images", label: "Produktbilder", blurb: "Ein Hauptbild plus Listingbilder, die in Sekunden überzeugen." },
  { key: "a_plus", label: "EBC Content", blurb: "A+ und Premium A+: Module, die auf der Detailseite Fragen beantworten." },
  { key: "brand_store", label: "Brand Stores", blurb: "Eure Markenwelt mit Cross-Selling über das ganze Sortiment." },
  { key: "brand_story", label: "Brand Stories", blurb: "Aus einem Produkt wird eine Marke, die im Kopf bleibt." },
];

const isVideo = (url: string) => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);

/* ---- shared: read natural aspect (w/h) for a set of urls, client-side ---- */
function useAspects(urls: string[]) {
  const [map, setMap] = useState<Record<string, number>>({});
  useEffect(() => {
    let alive = true;
    urls.forEach((url) => {
      if (!url || isVideo(url)) return;
      const img = new Image();
      img.onload = () => {
        if (!alive || !img.naturalWidth || !img.naturalHeight) return;
        setMap((m) => (m[url] ? m : { ...m, [url]: img.naturalWidth / img.naturalHeight }));
      };
      img.src = url;
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join("|")]);
  return map;
}

const guard = (e: React.MouseEvent) => {
  const t = e.target as HTMLElement;
  if (t.tagName === "IMG" || t.tagName === "VIDEO") e.preventDefault();
};

const MaximizeBadge = () => (
  <span className="pointer-events-none absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-lift backdrop-blur transition group-hover:scale-105">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  </span>
);

const ScrollFade = () => (
  <div className="pointer-events-none sticky bottom-0 -mt-12 h-12 bg-gradient-to-t from-white to-transparent" />
);

/* ============================================================================
 * 1. Produktbilder / Listings — Hero + 3×2-Grid, ganzes Listing vergrößert
 * ========================================================================== */
function ListingCard({ listing, onOpen, interactive = true }: { listing: RefListing; onOpen?: () => void; interactive?: boolean }) {
  const [hero, ...rest] = listing.images;
  const [heroAspect, setHeroAspect] = useState(1);
  const details = rest.slice(0, 6);

  return (
    <div
      className={`group relative w-full rounded-3xl p-3 shadow-lift ring-1 ring-black/[0.06] md:p-5 ${
        interactive ? "cursor-zoom-in bg-white transition hover:ring-black/[0.12]" : "bg-white"
      }`}
      onClick={interactive ? onOpen : undefined}
      onContextMenu={guard}
    >
      {interactive && <MaximizeBadge />}
      <div className="grid gap-2 md:gap-3" style={{ gridTemplateColumns: `${heroAspect}fr 1.5fr` }}>
        {/* Hero */}
        <div className="overflow-hidden rounded-2xl bg-canvas-alt ring-1 ring-black/[0.04]" style={{ aspectRatio: heroAspect }}>
          {hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hero.url}
              alt=""
              loading="lazy"
              onLoad={(e) => {
                const t = e.currentTarget;
                if (t.naturalWidth && t.naturalHeight) setHeroAspect(t.naturalWidth / t.naturalHeight);
              }}
              className="h-full w-full object-contain"
            />
          )}
        </div>
        {/* 3×2 detail grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3" style={{ aspectRatio: "3 / 2" }}>
          {Array.from({ length: 6 }).map((_, i) => {
            const im = details[i];
            return (
              <div key={i} className="overflow-hidden rounded-xl bg-canvas-alt ring-1 ring-black/[0.04]">
                {im && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={im.url} alt="" loading="lazy" className="h-full w-full object-cover" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ListingGallery({ listings }: { listings: RefListing[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <div className="relative mx-auto max-w-[1100px]">
        <div className="space-y-6 overflow-y-auto pr-1" style={{ maxHeight: "min(78vh, 760px)" }}>
          {listings.map((l, i) => (
            <ListingCard key={l.id} listing={l} onOpen={() => setIdx(i)} />
          ))}
        </div>
        <ScrollFade />
      </div>

      {idx != null && (
        <ExpandedShell
          onClose={() => setIdx(null)}
          hasPrev={idx > 0}
          hasNext={idx < listings.length - 1}
          onPrev={() => setIdx((v) => (v! > 0 ? v! - 1 : v))}
          onNext={() => setIdx((v) => (v! < listings.length - 1 ? v! + 1 : v))}
        >
          <div className="overflow-y-auto rounded-3xl bg-white p-3 md:p-5" style={{ width: "min(94vw, 1040px)", maxHeight: "92vh" }}>
            <ListingCard listing={listings[idx]} interactive={false} />
          </div>
        </ExpandedShell>
      )}
    </>
  );
}

/* ============================================================================
 * 2./3. EBC Content — 3-spaltiges Masonry, ganzer Stack fit-to-viewport
 * ========================================================================== */
function EbcStack({ images, expanded = false }: { images: RefImage[]; expanded?: boolean }) {
  const aspects = useAspects(images.map((i) => i.url));
  if (expanded) {
    // stackAspect = 1 / Σ(h_i / w_i)
    const inv = images.reduce((s, im) => s + 1 / (aspects[im.url] || 970 / 600), 0);
    const stackAspect = inv > 0 ? 1 / inv : 0.6;
    return (
      <div
        className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lift"
        style={{ aspectRatio: stackAspect, maxWidth: "min(88vw, 560px)", maxHeight: "84vh", gap: "6px" }}
      >
        {images.map((im) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={im.slot} src={im.url} alt="" className="w-full object-contain" style={{ flex: `${1 / (aspects[im.url] || 970 / 600)} 1 0` }} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-[6px] overflow-hidden rounded-2xl bg-white">
      {images.map((im) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={im.slot} src={im.url} alt="" loading="lazy" className="w-full object-contain" />
      ))}
    </div>
  );
}

function EbcGallery({ listings }: { listings: RefListing[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <div className="relative mx-auto max-w-[1100px]">
        <div className="overflow-y-auto" style={{ maxHeight: "min(82vh, 760px)" }}>
          <div className="gap-4 [column-fill:_balance] columns-1 sm:columns-2 lg:columns-3">
            {listings.map((l, i) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setIdx(i)}
                onContextMenu={guard}
                className="group relative mb-4 block w-full break-inside-avoid cursor-zoom-in rounded-2xl shadow-lift ring-1 ring-black/[0.06] transition hover:ring-black/[0.12]"
              >
                <MaximizeBadge />
                <EbcStack images={l.images} />
              </button>
            ))}
          </div>
        </div>
        <ScrollFade />
      </div>

      {idx != null && (
        <ExpandedShell
          onClose={() => setIdx(null)}
          hasPrev={idx > 0}
          hasNext={idx < listings.length - 1}
          onPrev={() => setIdx((v) => (v! > 0 ? v! - 1 : v))}
          onNext={() => setIdx((v) => (v! < listings.length - 1 ? v! + 1 : v))}
        >
          <EbcStack images={listings[idx].images} expanded />
        </ExpandedShell>
      )}
    </>
  );
}

/* ============================================================================
 * 4. Brand Stores — 2:3-Teaser, Play -> groß zentriert (Auto-Scroll / MP4)
 * ========================================================================== */
function StoreThumb({ listing, onOpen }: { listing: RefListing; onOpen: () => void }) {
  const media = listing.images[0];
  if (!media) return null;
  const video = isVideo(media.url);
  return (
    <button
      type="button"
      onClick={onOpen}
      onContextMenu={guard}
      className="group relative block w-full overflow-hidden rounded-lg bg-black shadow-lift"
      style={video ? undefined : { aspectRatio: "9 / 9.24" }}
    >
      {video ? (
        <video src={media.url} muted playsInline preload="metadata" className="aspect-[9/16] w-full object-cover" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.url} alt="" loading="lazy" className="absolute inset-x-0 top-0 w-full" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-2xl transition group-hover:scale-105">
          <svg className="ml-1 h-7 w-7 text-ink" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </div>
    </button>
  );
}

function StoreExpanded({ media }: { media: RefImage }) {
  const video = isVideo(media.url);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (video) return;
    const img = imgRef.current;
    const container = img?.parentElement;
    if (!img || !container) return;
    let raf1 = 0;
    let raf2 = 0;
    let backTimer: ReturnType<typeof setTimeout>;
    const run = () => {
      const overflow = img.offsetHeight - container.offsetHeight;
      if (overflow <= 0) return;
      const secs = Math.min(14, Math.max(5, overflow / 80));
      img.style.transition = "none";
      img.style.transform = "translateY(0)";
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          img.style.transition = `transform ${secs}s linear`;
          img.style.transform = `translateY(-${overflow}px)`;
          backTimer = setTimeout(() => {
            img.style.transition = "transform 0.6s ease";
            img.style.transform = "translateY(0)";
          }, secs * 1000 + 400);
        });
      });
    };
    if (img.complete) run();
    else img.onload = run;
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(backTimer);
    };
  }, [media.url, video]);

  if (video) {
    return (
      <video
        key={media.url}
        src={media.url}
        autoPlay
        loop
        muted
        playsInline
        controls
        controlsList="nodownload"
        className="rounded-2xl object-contain shadow-2xl"
        style={{ aspectRatio: "9 / 16", width: "min(92vw, calc(88vh * 9 / 16))", maxHeight: "88vh" }}
      />
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl bg-black shadow-2xl" style={{ width: "min(92vw, 520px)", height: "min(86vh, 880px)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={media.url} alt="" className="w-full will-change-transform" />
    </div>
  );
}

function BrandStoreGallery({ listings }: { listings: RefListing[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <div className="relative mx-auto max-w-[760px]">
        <div className="grid grid-cols-1 gap-6 overflow-y-auto pr-1 md:grid-cols-2" style={{ maxHeight: "min(78vh, 760px)" }}>
          {listings.map((l, i) => (
            <StoreThumb key={l.id} listing={l} onOpen={() => setIdx(i)} />
          ))}
        </div>
        <ScrollFade />
      </div>

      {idx != null && (
        <ExpandedShell
          onClose={() => setIdx(null)}
          hasPrev={idx > 0}
          hasNext={idx < listings.length - 1}
          onPrev={() => setIdx((v) => (v! > 0 ? v! - 1 : v))}
          onNext={() => setIdx((v) => (v! < listings.length - 1 ? v! + 1 : v))}
        >
          <StoreExpanded key={listings[idx].id} media={listings[idx].images[0]} />
        </ExpandedShell>
      )}
    </>
  );
}

/* ============================================================================
 * 5. Brand Stories — fixes 1464×625-Frame, 3-Card-Step mit Peek-Continuity
 * ========================================================================== */
const BS = {
  CARD_W: 24.73,
  CARD_H: 72.48,
  STRIDE: 26.78,
  LEFT: 4.88,
  TOP: 23.84,
};

/** background = widest landscape image; rest (by slot) = cards. */
function splitStory(images: RefImage[], aspects: Record<string, number>) {
  let bg: RefImage | null = null;
  let bgAspect = 0;
  for (const im of images) {
    const a = aspects[im.url];
    if (a && a > 1.5 && a > bgAspect) {
      bg = im;
      bgAspect = a;
    }
  }
  const cards = images.filter((im) => im !== bg);
  return { bg, cards };
}

function viewOffsets(count: number): number[] {
  const offsets = [BS.LEFT + BS.STRIDE];
  for (let leading = 2; leading < count; leading += 3) offsets.push(BS.LEFT - leading * BS.STRIDE);
  return offsets;
}

function StoryFrame({
  bg,
  cards,
  interactive,
  onOpen,
}: {
  bg: RefImage | null;
  cards: RefImage[];
  interactive: boolean;
  onOpen?: () => void;
}) {
  const [view, setView] = useState(1);
  const offsets = viewOffsets(cards.length);
  const totalViews = offsets.length;
  const touchX = useRef<number | null>(null);

  useEffect(() => setView(1), [bg?.url, cards.length]);

  const go = (v: number) => setView(Math.min(totalViews, Math.max(1, v)));

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden rounded-3xl border border-black/[0.06] ${interactive ? "" : "group cursor-zoom-in"}`}
        style={{ aspectRatio: "1464 / 625", boxShadow: "0 18px 45px -12px rgba(0,0,0,0.35)" }}
        onClick={interactive ? undefined : onOpen}
        onContextMenu={guard}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (!interactive || touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (dx < -30) go(view + 1);
          else if (dx > 30) go(view - 1);
          touchX.current = null;
        }}
      >
        {bg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bg.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-canvas-alt" />
        )}

        {/* Track */}
        <div className="absolute inset-0 z-10" style={{ clipPath: `inset(0 0 0 ${BS.LEFT}%)` }}>
          <div
            className="relative h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${offsets[view - 1]}%)` }}
          >
            {cards.map((c, i) => (
              <div
                key={c.slot}
                className="absolute overflow-hidden"
                style={{ left: `${i * BS.STRIDE}%`, top: `${BS.TOP}%`, width: `${BS.CARD_W}%`, height: `${BS.CARD_H}%` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.url} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {!interactive && <MaximizeBadge />}

        {interactive && view > 1 && (
          <button
            type="button"
            aria-label="Vorherige Karten"
            onClick={() => go(view - 1)}
            className="absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-md transition hover:scale-105 md:h-11 md:w-11"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
        )}
        {interactive && view < totalViews && (
          <button
            type="button"
            aria-label="Weitere Karten"
            onClick={() => go(view + 1)}
            className="absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-md transition hover:scale-105 md:h-11 md:w-11"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>

      {interactive && totalViews > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {offsets.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i + 1 === view ? "w-6 bg-ink" : "w-1.5 bg-ink-faint/40"}`} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Fallback ohne Hintergrund: horizontaler Snap-Scroller. */
function StorySnap({ cards }: { cards: RefImage[] }) {
  return (
    <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-3xl bg-canvas-alt p-4">
      {cards.map((c) => (
        <div key={c.slot} className="w-[min(60vw,280px)] shrink-0 snap-start overflow-hidden" style={{ aspectRatio: "814 / 1019" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.url} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function BrandStoryGallery({ listings }: { listings: RefListing[] }) {
  const allUrls = listings.flatMap((l) => l.images.map((i) => i.url));
  const aspects = useAspects(allUrls);
  const [idx, setIdx] = useState<number | null>(null);

  return (
    <>
      <div className="relative mx-auto max-w-[1180px]">
        <div className="space-y-8 overflow-y-auto pr-1" style={{ maxHeight: "min(80vh, 820px)" }}>
          {listings.map((l, i) => {
            const { bg, cards } = splitStory(l.images, aspects);
            if (!bg && cards.length) return <StorySnap key={l.id} cards={cards} />;
            return <StoryFrame key={l.id} bg={bg} cards={cards} interactive={false} onOpen={() => setIdx(i)} />;
          })}
        </div>
        <ScrollFade />
      </div>

      {idx != null &&
        (() => {
          const { bg, cards } = splitStory(listings[idx].images, aspects);
          return (
            <ExpandedShell
              onClose={() => setIdx(null)}
              hasPrev={idx > 0}
              hasNext={idx < listings.length - 1}
              onPrev={() => setIdx((v) => (v! > 0 ? v! - 1 : v))}
              onNext={() => setIdx((v) => (v! < listings.length - 1 ? v! + 1 : v))}
            >
              <div style={{ width: "min(96vw, 1180px)" }}>
                {bg ? <StoryFrame bg={bg} cards={cards} interactive /> : <StorySnap cards={cards} />}
              </div>
            </ExpandedShell>
          );
        })()}
    </>
  );
}

/* ============================================================================
 * Galerie-Rahmen mit Kategorie-Umschaltung
 * ========================================================================== */
function EmptyNote() {
  return (
    <p className="mx-auto max-w-xl py-12 text-center text-sm text-ink-faint">
      In dieser Kategorie sind noch keine Beispiele aus der Referenz-Bibliothek verbunden.
    </p>
  );
}

export function DesignGallery({ data }: { data: RefData }) {
  const [active, setActive] = useState<RefCategory>("main_images");
  const tab = TABS.find((t) => t.key === active)!;
  const listings = data[active];

  const render = useCallback(() => {
    if (!listings.length) return <EmptyNote />;
    switch (active) {
      case "main_images":
        return <ListingGallery listings={listings} />;
      case "a_plus":
        return <EbcGallery listings={listings} />;
      case "brand_store":
        return <BrandStoreGallery listings={listings} />;
      case "brand_story":
        return <BrandStoryGallery listings={listings} />;
    }
  }, [active, listings]);

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
          <div className="mt-10">{render()}</div>
        </Reveal>
      </div>
    </section>
  );
}
