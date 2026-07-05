"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/* ============================================================
 *  Content showcase: every element of the product detail page,
 *  shown as wireframe SKETCHES (not real images) that get the
 *  real layout right: a main image on white, an image strip,
 *  A+ modules, Brand Store, Brand Story and SEO.
 * ============================================================ */

const FRAME =
  "relative w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]";

/* --- sketch primitives ----------------------------------------------- */

/* A picture placeholder: thin frame with a small image glyph. */
function Photo({ className = "", active = false }: { className?: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-[#F7F9FB] ${
        active ? "ring-2 ring-brand-500" : "ring-1 ring-black/[0.08]"
      } ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-ink-faint/55">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="9" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 17l4.5-4 3 2.4L16 11l3 3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* A text line. */
function Line({ w = "100%", strong = false }: { w?: string; strong?: boolean }) {
  return <span className={`block h-1.5 rounded-full ${strong ? "bg-navy/25" : "bg-navy/12"}`} style={{ width: w }} />;
}

/* --- one sketch per content element ---------------------------------- */

/* Hauptbild: a single product image on a pure-white field (Amazon main-image
   rule), with the index badge and a nod to its CTR job. */
function MainImageViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex items-center justify-center p-4`}>
      <span className="absolute left-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-extrabold text-white shadow-soft">
        1
      </span>
      <Photo className="h-[72%] w-[46%]" />
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-brand-600 shadow-soft ring-1 ring-black/[0.05]">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
          <path d="M3 11l4-4 3 3 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        CTR
      </span>
    </div>
  );
}

/* Bilderstrecke: a hero shot plus a filmstrip of thumbnails. */
function GalleryViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col gap-2 p-3`}>
      <Photo className="flex-1" />
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Photo key={i} className="aspect-square" active={i === 0} />
        ))}
      </div>
    </div>
  );
}

/* A+ / Premium A+: stacked content modules (image + copy). */
function APlusViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col gap-2 p-3`}>
      <Photo className="h-[40%]" />
      <div className="grid flex-1 grid-cols-2 gap-2">
        <Photo />
        <div className="flex flex-col justify-center gap-1.5 rounded-lg bg-[#F7F9FB] p-3 ring-1 ring-black/[0.08]">
          <Line w="80%" strong />
          <Line w="100%" />
          <Line w="65%" />
        </div>
      </div>
      <span className="absolute right-3 top-3 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-red shadow-soft ring-1 ring-black/[0.05]">
        Premium A+
      </span>
    </div>
  );
}

/* Brand Store: nav bar, hero banner and a row of product tiles. */
function BrandStoreViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col gap-2 p-3`}>
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full" style={{ backgroundImage: "var(--brand-gradient)" }} />
        <span className="h-1.5 w-12 rounded-full bg-navy/15" />
        <span className="ml-auto h-1.5 w-8 rounded-full bg-navy/10" />
      </div>
      <Photo className="h-1/3" />
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        <Photo />
        <Photo />
        <Photo />
      </div>
    </div>
  );
}

/* Brand Story: one image with a headline and paragraph beneath. */
function BrandStoryViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col justify-center gap-3 p-4`}>
      <Photo className="h-1/2" />
      <div className="space-y-1.5">
        <Line w="70%" strong />
        <Line w="92%" />
        <Line w="50%" />
      </div>
    </div>
  );
}

/* SEO: search bar, title with highlighted keywords, bullet lines. */
function SeoViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col gap-2 p-3`}>
      <div className="flex items-center gap-1.5 rounded-full bg-[#F7F9FB] px-2.5 py-1.5 ring-1 ring-black/[0.08]">
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="text-ink-faint">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M14 14l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="h-1.5 w-16 rounded-full bg-navy/15" />
        <span className="ml-auto rounded-full bg-brand-500/15 px-1.5 py-0.5 text-[8px] font-bold text-brand-600">#1</span>
      </div>
      <div className="flex flex-wrap gap-1">
        <span className="h-2.5 w-10 rounded bg-navy/15" />
        <span className="h-2.5 w-8 rounded bg-brand-500/30" />
        <span className="h-2.5 w-12 rounded bg-navy/15" />
        <span className="h-2.5 w-9 rounded bg-cyan/40" />
      </div>
      <div className="mt-auto space-y-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            <span className="h-1.5 rounded-full bg-navy/12" style={{ width: `${78 - i * 14}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

type Tile = {
  viz: () => React.ReactNode;
  kicker: string;
  title: string;
  desc: string;
  accent: string;
};

const tiles: Tile[] = [
  {
    viz: MainImageViz,
    kicker: "Produktbilder",
    title: "Starkes Hauptbild",
    desc: "Entscheidet über die Klickrate im Suchergebnis, noch bevor jemand das Listing öffnet.",
    accent: "text-brand-600",
  },
  {
    viz: GalleryViz,
    kicker: "Produktbilder",
    title: "Bilderstrecke",
    desc: "Nutzen, Anwendung und Größe in Sekunden klar, statt aus dem Text erschlossen.",
    accent: "text-red",
  },
  {
    viz: APlusViz,
    kicker: "Markeninhalte",
    title: "A+ und Premium A+",
    desc: "Beantwortet die Fragen, die sonst zum Abbruch führen, mit Modulen und Vergleichen.",
    accent: "text-cyan",
  },
  {
    viz: BrandStoreViz,
    kicker: "Markeninhalte",
    title: "Brand Store",
    desc: "Eure Markenwelt mit Cross-Selling über das ganze Sortiment.",
    accent: "text-emerald",
  },
  {
    viz: BrandStoryViz,
    kicker: "Markeninhalte",
    title: "Brand Story",
    desc: "Macht aus einem einzelnen Produkt eine Marke, die im Kopf bleibt.",
    accent: "text-navy",
  },
  {
    viz: SeoViz,
    kicker: "SEO",
    title: "Titel, Bullets, Backend",
    desc: "Lesbar geschrieben und KI-ready für Rufus, COSMO und A10, statt Keywords zu stapeln.",
    accent: "text-brand-600",
  },
];

export function ContentShowcase() {
  return (
    <section className="relative isolate bg-white py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Content"
          size="compact"
          title={
            <>
              Produktbilder und <span className="text-gradient">SEO.</span>
            </>
          }
          description="Jedes Element eurer Detailseite, gebaut auf Klickrate und Conversion. Hier als Sketch."
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {tiles.map((t) => {
            const Viz = t.viz;
            return (
              <RevealItem key={t.title} className="h-full">
                <div className="surface surface-hover flex h-full flex-col p-4">
                  <Viz />
                  <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                    <span className={`text-[0.7rem] font-bold uppercase tracking-[0.14em] ${t.accent}`}>
                      {t.kicker}
                    </span>
                    <h3 className="mt-1 text-base font-bold leading-snug text-ink">{t.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t.desc}</p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-9 max-w-2xl text-balance text-center text-base font-semibold text-ink">
            Erst wenn das Listing organisch verkauft, lohnt sich jeder Werbe-Euro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
