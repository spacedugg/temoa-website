"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/* ============================================================
 *  Content-Sektion: jedes Element der Produktdetailseite.
 *
 *  Vorher waren alle sechs Kacheln Drahtgitter mit einem grauen
 *  Bildsymbol darin. Sechs leere Kaesten sagen nichts, und der
 *  Untertitel gab es mit "Hier als Sketch" selbst zu. Jetzt tragen
 *  die Kacheln die Produktbilder des erfundenen Beispielprodukts,
 *  der Aufbau bleibt der einer echten Detailseite.
 * ============================================================ */

/* Die Bilder des erfundenen Beispielprodukts. Keine Kundendaten,
   keine Amazon-Oberflaeche, nur der Aufbau. */
const B = {
  haupt: "/bilder/p-haupt.webp",
  detail: "/bilder/p-detail.webp",
  szene: "/bilder/p-szene.webp",
  gruppe: "/bilder/p-gruppe.webp",
  material: "/bilder/p-material.webp",
  offen: "/bilder/p-offen.webp",
  unterwegs: "/bilder/p-unterwegs.webp",
  aHero: "/bilder/a-hero.webp",
  aNutzen: "/bilder/a-nutzen.webp",
};

const FRAME =
  "relative w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]";

/* --- sketch primitives ----------------------------------------------- */

/* Eine Bildflaeche. Mit src das echte Bild, ohne src eine ruhige Flaeche
   (die SEO-Kachel zeigt Suchtreffer, kein Foto). */
function Photo({
  className = "",
  active = false,
  src,
  fit = "contain",
}: {
  className?: string;
  active?: boolean;
  src?: string;
  fit?: "contain" | "cover";
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-[#F7F9FB] ${
        active ? "ring-2 ring-brand-500" : "ring-1 ring-black/[0.08]"
      } ${className}`}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          className={`absolute inset-0 h-full w-full ${fit === "cover" ? "object-cover" : "object-contain p-1"}`}
        />
      )}
    </div>
  );
}

/* A text line. */
function Line({ w = "100%", strong = false }: { w?: string; strong?: boolean }) {
  return <span className={`block h-1.5 rounded-full ${strong ? "bg-navy/40" : "bg-navy/20"}`} style={{ width: w }} />;
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
      <Photo className="h-[78%] w-[52%]" src={B.haupt} />
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
      <Photo className="flex-1" src={B.haupt} />
      <div className="grid grid-cols-5 gap-1.5">
        {[B.detail, B.szene, B.gruppe, B.material, B.offen].map((s, i) => (
          <Photo key={s} className="aspect-square" active={i === 0} src={s} fit="cover" />
        ))}
      </div>
    </div>
  );
}

/* A+ / Premium A+: stacked content modules (image + copy). */
function APlusViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col gap-2 p-3`}>
      <Photo className="h-[40%]" src={B.aHero} fit="cover" />
      <div className="grid flex-1 grid-cols-2 gap-2">
        <Photo src={B.aNutzen} fit="cover" />
        <div className="flex flex-col justify-center gap-1.5 rounded-lg bg-[#F7F9FB] p-3 ring-1 ring-black/[0.08]">
          <Line w="72%" strong />
          <Line w="100%" />
          <Line w="94%" />
          <Line w="88%" />
          <Line w="58%" />
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
      <Photo className="h-1/3" src={B.szene} fit="cover" />
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        <Photo src={B.haupt} />
        <Photo src={B.gruppe} fit="cover" />
        <Photo src={B.unterwegs} fit="cover" />
      </div>
    </div>
  );
}

/* Brand Story: one image with a headline and paragraph beneath. */
function BrandStoryViz() {
  return (
    <div className={`${FRAME} aspect-[4/3] flex flex-col justify-center gap-3 p-4`}>
      <Photo className="h-1/2" src={B.unterwegs} fit="cover" />
      <div className="space-y-1.5">
        <Line w="70%" strong />
        <Line w="96%" />
        <Line w="88%" />
        <Line w="50%" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <Photo className="aspect-[4/3]" src={B.haupt} />
        <Photo className="aspect-[4/3]" src={B.material} fit="cover" />
        <Photo className="aspect-[4/3]" src={B.offen} fit="cover" />
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
      {/* Titelzeile und Bullets. Vorher lag zwischen Suchzeile und Bullets
          eine leere Flaeche und die Linien waren zu blass, um sie zu sehen. */}
      <div className="mt-1 space-y-1.5">
        <Line w="94%" strong />
        <Line w="72%" strong />
      </div>
      <div className="mt-auto space-y-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            <span className="h-1.5 rounded-full bg-navy/20" style={{ width: `${86 - i * 12}%` }} />
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
  /* Farbe des Punkts vor der Bezeichnung. Nur als Marke, nie als Schrift. */
  punkt: string;
};

const tiles: Tile[] = [
  {
    viz: MainImageViz,
    kicker: "Produktbilder",
    title: "Starkes Hauptbild",
    desc: "Entscheidet über die Klickrate im Suchergebnis, noch bevor jemand das Listing öffnet.",
    punkt: "#FF9900",
  },
  {
    viz: GalleryViz,
    kicker: "Produktbilder",
    title: "Bilderstrecke",
    desc: "Nutzen, Anwendung und Größe in Sekunden klar, statt aus dem Text erschlossen.",
    punkt: "#FF3131",
  },
  {
    viz: APlusViz,
    kicker: "Markeninhalte",
    title: "A+ und Premium A+",
    desc: "Beantwortet die Fragen, die sonst zum Abbruch führen, mit Modulen und Vergleichen.",
    punkt: "#2A9BD8",
  },
  {
    viz: BrandStoreViz,
    kicker: "Markeninhalte",
    title: "Brand Store",
    desc: "Eure Markenwelt mit Cross-Selling über das ganze Sortiment.",
    punkt: "#16A34A",
  },
  {
    viz: BrandStoryViz,
    kicker: "Markeninhalte",
    title: "Brand Story",
    desc: "Macht aus einem einzelnen Produkt eine Marke, die im Kopf bleibt.",
    punkt: "#023047",
  },
  {
    viz: SeoViz,
    kicker: "SEO",
    title: "Titel, Bullets, Backend",
    desc: "Lesbar geschrieben und KI-ready für Rufus, COSMO und A10, statt Keywords zu stapeln.",
    punkt: "#FF9900",
  },
];

export function ContentShowcase() {
  return (
    <section className="relative isolate ground py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Content"
          size="compact"
          title={
            <>
              Produktbilder und <span className="text-gradient">SEO.</span>
            </>
          }
          description="Jedes Element eurer Detailseite, ausgerichtet auf Klickrate und Conversion."
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {tiles.map((t) => {
            const Viz = t.viz;
            return (
              <RevealItem key={t.title} className="h-full">
                <div className="surface surface-hover flex h-full flex-col p-4">
                  <Viz />
                  <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                    <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.punkt }} />
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
          <p className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2.5 text-center text-xs text-ink-faint">
            <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-brand-500" />
            Aufbau an einem erfundenen Produkt. Kein Kundenlisting.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-center text-base font-semibold text-ink">
            Erst wenn das Listing organisch verkauft, lohnt sich jeder Werbe-Euro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
