"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/* ============================================================
 *  Content showcase: every element of the product detail page,
 *  shown as visual tiles (Kacheln) with a mini mock-up each,
 *  not as bullet lists.
 * ============================================================ */

const FRAME =
  "relative w-full overflow-hidden rounded-2xl ring-1 ring-black/[0.06]";
const PANE = { background: "linear-gradient(150deg,#ffffff,#eef3f8)" };

/* --- mini visuals ---------------------------------------------------- */

/* Hauptbild: a single product centred on a pure-white field, the way Amazon
   requires the main image. Index badge "1", a hint at the CTR job. */
function MainImageViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex items-center justify-center bg-white`}>
      <span className="absolute left-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-extrabold text-white shadow-soft">
        1
      </span>
      {/* stylised packaging: a jar/bottle with a label band and a soft shadow */}
      <div className="relative flex h-[64%] items-end gap-1.5">
        <div className="flex h-[78%] w-12 flex-col overflow-hidden rounded-t-2xl rounded-b-md shadow-lift ring-1 ring-black/[0.05]">
          <div className="h-[22%]" style={{ background: "linear-gradient(180deg,#0A1E2B,#0B4D6B)" }} />
          <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-white px-1.5">
            <span className="h-1 w-7 rounded-full" style={{ backgroundImage: "var(--brand-gradient)" }} />
            <span className="h-0.5 w-5 rounded-full bg-navy/15" />
          </div>
        </div>
        <div className="h-full w-9 overflow-hidden rounded-xl shadow-lift ring-1 ring-black/[0.05]">
          <div className="h-1/4" style={{ backgroundImage: "var(--brand-gradient)" }} />
          <div className="h-full bg-white" />
        </div>
        {/* contact shadow */}
        <div className="absolute -bottom-2 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-navy/10 blur-[3px]" />
      </div>
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-brand-600 shadow-soft ring-1 ring-black/[0.05]">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
          <path d="M3 11l4-4 3 3 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        CTR
      </span>
    </div>
  );
}

/* Bilderstrecke: one large hero shot plus a filmstrip of thumbnails, the way a
   listing gallery is actually laid out. */
function GalleryViz() {
  const thumbs = [
    "linear-gradient(135deg,#FFE7CC,#FFD0E4)",
    "linear-gradient(135deg,#CDE6F4,#EAF3FB)",
    "linear-gradient(135deg,#0A1E2B,#0B4D6B)",
    "linear-gradient(135deg,#FFF1D6,#FFE0B3)",
    "linear-gradient(135deg,#E6EDF3,#ffffff)",
  ];
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col gap-2 p-3`} style={PANE}>
      {/* hero shot */}
      <div className="relative flex-1 overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-black/[0.04]">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#FFE7CC,#FFD0E4)" }} />
        <div className="absolute bottom-2 left-2 h-8 w-8 rounded-md bg-white/90 shadow-soft" />
      </div>
      {/* thumbnail strip */}
      <div className="grid grid-cols-5 gap-1.5">
        {thumbs.map((bg, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md shadow-soft ring-1 ${i === 0 ? "ring-2 ring-brand-500" : "ring-black/[0.05]"}`}
            style={{ background: bg }}
          />
        ))}
      </div>
    </div>
  );
}

function APlusViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col gap-2 p-3`} style={PANE}>
      <div className="h-1/2 rounded-lg bg-white shadow-soft ring-1 ring-black/[0.04]" />
      <div className="grid flex-1 grid-cols-2 gap-2">
        <div className="rounded-lg bg-white shadow-soft ring-1 ring-black/[0.04]" />
        <div className="rounded-lg bg-white shadow-soft ring-1 ring-black/[0.04]" />
      </div>
      <span className="absolute right-3 top-3 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-red shadow-soft ring-1 ring-black/[0.05]">
        Premium A+
      </span>
    </div>
  );
}

function BrandStoreViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col gap-1.5 p-3`} style={PANE}>
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full" style={{ backgroundImage: "var(--brand-gradient)" }} />
        <span className="h-2 w-12 rounded-full bg-navy/15" />
        <span className="ml-auto h-2 w-8 rounded-full bg-navy/10" />
      </div>
      <div className="h-1/3 rounded-lg" style={{ backgroundImage: "linear-gradient(120deg,#CDE6F4,#EAF3FB)" }} />
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        <div className="rounded-lg bg-white shadow-soft ring-1 ring-black/[0.04]" />
        <div className="rounded-lg bg-white shadow-soft ring-1 ring-black/[0.04]" />
        <div className="rounded-lg bg-white shadow-soft ring-1 ring-black/[0.04]" />
      </div>
    </div>
  );
}

function BrandStoryViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col justify-center gap-2 p-4`} style={PANE}>
      <div className="h-1/2 rounded-lg" style={{ background: "linear-gradient(120deg,#0A1E2B,#0B4D6B)" }} />
      <div className="space-y-1.5">
        <span className="block h-2 w-3/4 rounded-full bg-navy/15" />
        <span className="block h-2 w-1/2 rounded-full bg-navy/10" />
      </div>
    </div>
  );
}

function SeoViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col gap-2 p-3`} style={PANE}>
      {/* search bar */}
      <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-soft ring-1 ring-black/[0.04]">
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="text-ink-faint">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M14 14l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="h-1.5 w-16 rounded-full bg-navy/15" />
        <span className="ml-auto rounded-full bg-brand-500/15 px-1.5 py-0.5 text-[8px] font-bold text-brand-600">#1</span>
      </div>
      {/* title with highlighted keywords */}
      <div className="flex flex-wrap gap-1">
        <span className="h-2.5 w-10 rounded bg-navy/15" />
        <span className="h-2.5 w-8 rounded bg-brand-500/30" />
        <span className="h-2.5 w-12 rounded bg-navy/15" />
        <span className="h-2.5 w-9 rounded bg-cyan/40" />
      </div>
      {/* bullets */}
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
    title: "Hauptbild",
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
          description="Jedes Element eurer Detailseite, gebaut auf Klickrate und Conversion. Hier als Vorschau."
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
