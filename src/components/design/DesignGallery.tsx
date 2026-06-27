"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "../ui/Reveal";
import { ExpandedShell } from "./ExpandedShell";
import type { RefData, RefCategory, RefListing, RefImage, RefCardMetadata } from "@/lib/references";

/* ============================================================================
 * Design-Beispiele Galerie
 * Replikt die Sales-Room-Content-Showcases (Listings, EBC/A+, Brand Stores,
 * Brand Stories). Kategorie, Layout (mit/ohne Lücke), Reihenfolge
 * (Hintergrund = order 0), Bildmaße, Medientyp und Brand-Story-Karten kommen
 * aus den Daten. Die Inhalte stehen ohne eigene Schatten-Container direkt auf
 * der Seite; nur das Vergrößern legt ein Overlay darüber.
 * ========================================================================== */

const TABS: { key: RefCategory; label: string }[] = [
  { key: "main_images", label: "Produktbilder" },
  { key: "a_plus", label: "EBC Content" },
  { key: "brand_store", label: "Brand Stores" },
  { key: "brand_story", label: "Brand Stories" },
];

const aspect = (im?: RefImage | null, fb = 1) =>
  im && im.width && im.height ? im.width / im.height : fb;

const guard = (e: React.MouseEvent) => {
  const t = e.target as HTMLElement;
  if (t.tagName === "IMG" || t.tagName === "VIDEO") e.preventDefault();
};

function MaximizeBadge({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <span
      onClick={onClick}
      className={`absolute right-2 top-2 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-soft backdrop-blur transition group-hover:opacity-100 ${onClick ? "cursor-zoom-in hover:scale-105" : "pointer-events-none"}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </span>
  );
}

const ScrollFade = () => (
  <div className="pointer-events-none sticky bottom-0 -mt-12 h-12 bg-gradient-to-t from-white to-transparent" />
);

function usePager(count: number) {
  const [idx, setIdx] = useState<number | null>(null);
  return {
    idx,
    open: (i: number) => setIdx(i),
    close: () => setIdx(null),
    prev: () => setIdx((v) => (v! > 0 ? v! - 1 : v)),
    next: () => setIdx((v) => (v! < count - 1 ? v! + 1 : v)),
    hasPrev: idx != null && idx > 0,
    hasNext: idx != null && idx < count - 1,
  };
}

/* ============================================================================
 * 1. Produktbilder / Listings — Hero + 3×2-Grid; 2 nebeneinander (Desktop)
 * ========================================================================== */
function ListingCard({ listing, onOpen, interactive = true }: { listing: RefListing; onOpen?: () => void; interactive?: boolean }) {
  const hero = listing.images.find((i) => i.order === 0) ?? listing.images[0];
  const details = listing.images.filter((i) => i !== hero).slice(0, 6);
  const [heroAspect, setHeroAspect] = useState(() => aspect(hero, 1));

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-md bg-white p-2.5 shadow-soft ring-1 ring-black/[0.04] ${interactive ? "cursor-zoom-in" : ""}`}
      onClick={interactive ? onOpen : undefined}
      onContextMenu={guard}
    >
      {interactive && <MaximizeBadge />}
      <div className="grid gap-2" style={{ gridTemplateColumns: `${heroAspect}fr 1.5fr` }}>
        <div className="overflow-hidden rounded-sm" style={{ aspectRatio: heroAspect }}>
          {hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hero.url}
              alt=""
              loading="lazy"
              onLoad={(e) => {
                const t = e.currentTarget;
                if (!(hero.width && hero.height) && t.naturalWidth && t.naturalHeight)
                  setHeroAspect(t.naturalWidth / t.naturalHeight);
              }}
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-2" style={{ aspectRatio: "3 / 2" }}>
          {Array.from({ length: 6 }).map((_, i) => {
            const im = details[i];
            return (
              <div key={i} className="overflow-hidden rounded-sm">
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
  const p = usePager(listings.length);
  return (
    <>
      <div className="relative mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 overflow-y-auto pr-1 lg:grid-cols-2" style={{ maxHeight: "min(80vh, 820px)" }}>
          {listings.map((l, i) => (
            <ListingCard key={l.id} listing={l} onOpen={() => p.open(i)} />
          ))}
        </div>
        <ScrollFade />
      </div>
      {p.idx != null && (
        <ExpandedShell onClose={p.close} hasPrev={p.hasPrev} hasNext={p.hasNext} onPrev={p.prev} onNext={p.next}>
          <div className="overflow-y-auto rounded-2xl bg-white p-3 md:p-5" style={{ width: "min(94vw, 1040px)", maxHeight: "92vh" }}>
            <ListingCard listing={listings[p.idx]} interactive={false} />
          </div>
        </ExpandedShell>
      )}
    </>
  );
}

/* ============================================================================
 * 2./3. EBC Content — viele kleine nebeneinander, Klick = ganzer Stack groß
 * ========================================================================== */
function EbcStack({ listing, expanded = false }: { listing: RefListing; expanded?: boolean }) {
  const gap = listing.layout !== "ebc_seamless";
  const fit = gap ? "object-contain" : "object-cover";
  const imgs = listing.images;
  if (expanded) {
    const inv = imgs.reduce((s, im) => s + 1 / aspect(im, 970 / 600), 0);
    const stackAspect = inv > 0 ? 1 / inv : 0.6;
    return (
      <div
        className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lift"
        style={{ aspectRatio: stackAspect, maxWidth: "min(88vw, 560px)", maxHeight: "84vh", gap: gap ? "6px" : 0 }}
      >
        {imgs.map((im) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={im.order} src={im.url} alt="" className={`w-full ${fit}`} style={{ flex: `${1 / aspect(im, 970 / 600)} 1 0` }} />
        ))}
      </div>
    );
  }
  return (
    <div className={`flex flex-col overflow-hidden rounded-lg ${gap ? "gap-[4px] bg-white" : "gap-0"}`}>
      {imgs.map((im) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={im.order} src={im.url} alt="" loading="lazy" className={`w-full ${fit}`} />
      ))}
    </div>
  );
}

function EbcGallery({ listings }: { listings: RefListing[] }) {
  const p = usePager(listings.length);
  return (
    <>
      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-y-auto" style={{ maxHeight: "min(82vh, 820px)" }}>
          <div className="columns-2 gap-3 [column-fill:_balance] sm:columns-3 md:columns-4 lg:columns-6 xl:columns-8">
            {listings.map((l, i) => (
              <button
                key={l.id}
                type="button"
                onClick={() => p.open(i)}
                onContextMenu={guard}
                className="group relative mb-3 block w-full break-inside-avoid cursor-zoom-in overflow-hidden rounded-md shadow-soft ring-1 ring-black/[0.04] transition hover:opacity-95"
              >
                <MaximizeBadge />
                <EbcStack listing={l} />
              </button>
            ))}
          </div>
        </div>
        <ScrollFade />
      </div>
      {p.idx != null && (
        <ExpandedShell onClose={p.close} hasPrev={p.hasPrev} hasNext={p.hasNext} onPrev={p.prev} onNext={p.next}>
          <EbcStack listing={listings[p.idx]} expanded />
        </ExpandedShell>
      )}
    </>
  );
}

/* ============================================================================
 * 4. Brand Stores — 2:3-Teaser, Play -> groß zentriert (Auto-Scroll / MP4)
 * ========================================================================== */
function StoreThumb({ media, onOpen }: { media: RefImage; onOpen: () => void }) {
  const video = media.mediaType === "video";
  return (
    <button
      type="button"
      onClick={onOpen}
      onContextMenu={guard}
      className="group relative block w-full overflow-hidden rounded-md bg-black shadow-soft"
      style={video ? undefined : { aspectRatio: "9 / 13.86" }}
    >
      {video ? (
        <video src={media.url} muted playsInline preload="metadata" className="aspect-[9/16] w-full object-cover" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.url} alt="" loading="lazy" className="absolute inset-x-0 top-0 w-full" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 shadow-2xl transition group-hover:scale-105">
          <svg className="ml-1 h-6 w-6 text-ink" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </div>
    </button>
  );
}

function StoreExpanded({ media }: { media: RefImage }) {
  const video = media.mediaType === "video";
  const imgRef = useRef<HTMLImageElement>(null);
  const ratio = aspect(media, 9 / 16);

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
        style={{ aspectRatio: ratio, width: `min(92vw, calc(88vh * ${ratio}))`, maxHeight: "88vh" }}
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
  const p = usePager(listings.length);
  return (
    <>
      <div className="relative mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-5 overflow-y-auto pr-1 md:grid-cols-2 lg:grid-cols-3" style={{ maxHeight: "min(80vh, 820px)" }}>
          {listings.map((l, i) => (
            <StoreThumb key={l.id} media={l.images[0]} onOpen={() => p.open(i)} />
          ))}
        </div>
        <ScrollFade />
      </div>
      {p.idx != null && (
        <ExpandedShell onClose={p.close} hasPrev={p.hasPrev} hasNext={p.hasNext} onPrev={p.prev} onNext={p.next}>
          <StoreExpanded key={listings[p.idx].id} media={listings[p.idx].images[0]} />
        </ExpandedShell>
      )}
    </>
  );
}

/* ============================================================================
 * 5. Brand Stories — fixes 1464×625-Frame, inline slidebar (3-Card-Step)
 * ========================================================================== */
const BS = { CARD_W: 24.73, CARD_H: 72.48, STRIDE: 26.78, LEFT: 4.88, TOP: 23.84 };

function viewOffsets(count: number): number[] {
  const offsets = [BS.LEFT + BS.STRIDE];
  for (let leading = 2; leading < count; leading += 3) offsets.push(BS.LEFT - leading * BS.STRIDE);
  return offsets;
}

function StoryCardInner({ card }: { card: RefImage }) {
  const meta = card.metadata as RefCardMetadata | null;
  if (meta?.cardType === "asin_grid") {
    const grid = (meta.asinImages ?? [null, null, null, null]).slice(0, 4);
    while (grid.length < 4) grid.push(null);
    return (
      <div className="flex h-full w-full flex-col gap-[3%] bg-white p-[4%]">
        <div className="grid grid-cols-2 gap-[3%]">
          {grid.map((sub, i) => (
            <div key={i} className="relative overflow-hidden bg-canvas-alt" style={{ aspectRatio: "1328 / 1456" }}>
              {sub?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={sub.url} alt="" draggable={false} className="block h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-[8px] text-ink-faint">ASIN</div>
              )}
            </div>
          ))}
        </div>
        {(meta.headline || meta.linkLabel) && (
          <div className="mt-auto">
            {meta.headline && <p className="truncate text-[10px] font-semibold leading-tight text-ink md:text-sm">{meta.headline}</p>}
            {meta.linkLabel && (
              <p className="truncate text-[9px] leading-tight text-[#1a6db2] underline decoration-[#1a6db2] underline-offset-2 md:text-xs">
                {meta.linkLabel}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={card.url} alt="" loading="lazy" draggable={false} className="block h-full w-full object-cover" />;
}

function StoryFrame({ background, cards, onExpand }: { background: RefImage | null; cards: RefImage[]; onExpand?: () => void }) {
  const [view, setView] = useState(1);
  const offsets = viewOffsets(cards.length);
  const totalViews = offsets.length;
  const touchX = useRef<number | null>(null);

  useEffect(() => setView(1), [background?.url, cards.length]);
  const go = (v: number) => setView(Math.min(totalViews, Math.max(1, v)));

  return (
    <div className="relative">
      <div
        className="group relative overflow-hidden rounded-md shadow-soft ring-1 ring-black/[0.04]"
        style={{ aspectRatio: "1464 / 625" }}
        onContextMenu={guard}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (dx < -30) go(view + 1);
          else if (dx > 30) go(view - 1);
          touchX.current = null;
        }}
      >
        {background ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={background.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-canvas-alt" />
        )}

        <div className="absolute inset-0 z-10" style={{ clipPath: `inset(0 0 0 ${BS.LEFT}%)` }}>
          <div className="relative h-full w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(${offsets[view - 1]}%)` }}>
            {cards.map((c, i) => (
              <div
                key={c.order}
                className="absolute overflow-hidden"
                style={{ left: `${i * BS.STRIDE}%`, top: `${BS.TOP}%`, width: `${BS.CARD_W}%`, height: `${BS.CARD_H}%` }}
              >
                <StoryCardInner card={c} />
              </div>
            ))}
          </div>
        </div>

        {onExpand && <MaximizeBadge onClick={onExpand} />}

        {view > 1 && (
          <button type="button" aria-label="Vorherige Karten" onClick={() => go(view - 1)} className="absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-md transition hover:scale-105 md:h-11 md:w-11">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
        )}
        {view < totalViews && (
          <button type="button" aria-label="Weitere Karten" onClick={() => go(view + 1)} className="absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-md transition hover:scale-105 md:h-11 md:w-11">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>

      {totalViews > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {offsets.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i + 1 === view ? "w-6 bg-ink" : "w-1.5 bg-ink-faint/40"}`} />
          ))}
        </div>
      )}
    </div>
  );
}

function StorySnap({ cards }: { cards: RefImage[] }) {
  return (
    <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-2xl">
      {cards.map((c) => (
        <div key={c.order} className="w-[min(60vw,280px)] shrink-0 snap-start overflow-hidden" style={{ aspectRatio: "814 / 1019" }}>
          <StoryCardInner card={c} />
        </div>
      ))}
    </div>
  );
}

function splitStory(l: RefListing) {
  const background = l.images.find((i) => i.order === 0) ?? null;
  const cards = background ? l.images.filter((i) => i.order >= 1) : l.images;
  return { background, cards };
}

function BrandStoryGallery({ listings }: { listings: RefListing[] }) {
  const p = usePager(listings.length);
  return (
    <>
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 overflow-y-auto pr-1 lg:grid-cols-2" style={{ maxHeight: "min(82vh, 860px)" }}>
          {listings.map((l, i) => {
            const { background, cards } = splitStory(l);
            if (!background) return <StorySnap key={l.id} cards={cards} />;
            return <StoryFrame key={l.id} background={background} cards={cards} onExpand={() => p.open(i)} />;
          })}
        </div>
        <ScrollFade />
      </div>
      {p.idx != null &&
        (() => {
          const { background, cards } = splitStory(listings[p.idx]);
          return (
            <ExpandedShell onClose={p.close} hasPrev={p.hasPrev} hasNext={p.hasNext} onPrev={p.prev} onNext={p.next}>
              <div style={{ width: "min(96vw, 1180px)" }}>
                {background ? <StoryFrame background={background} cards={cards} /> : <StorySnap cards={cards} />}
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
        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-ink-muted">
          Echte Beispiele aus unserer Arbeit. Klickt euch rein und vergrößert jedes Detail.
        </p>

        <Reveal key={active} delay={0.05}>
          <div className="mt-10">{render()}</div>
        </Reveal>
      </div>
    </section>
  );
}
