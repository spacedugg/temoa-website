"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

/* Design-example showcase. Mirrors how Amazon content is actually
   arranged (the salesroom logic): one main image, a 1 + 6 listing set,
   A+ content as a vertical stack of modules, a brand store and a brand
   story. Placeholder tiles until real sample assets are supplied. */

function Tile({
  className,
  label,
  small,
  tone = "neutral",
}: {
  className?: string;
  label?: string;
  small?: boolean;
  tone?: "neutral" | "brand" | "navy" | "blue";
}) {
  const bg =
    tone === "brand"
      ? "linear-gradient(135deg,#FFE7CC,#FFD0E4)"
      : tone === "navy"
        ? "linear-gradient(135deg,#0A1E2B,#0B4D6B)"
        : tone === "blue"
          ? "linear-gradient(135deg,#CDE6F4,#EAF3FB)"
          : "linear-gradient(135deg,#ffffff,#e7ecf2)";
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl ring-1 ring-black/[0.05] ${className ?? ""}`}
      style={{ background: bg }}
    >
      {label && (
        <span
          className={`relative font-semibold uppercase tracking-[0.14em] ${tone === "navy" ? "text-white/70" : "text-ink-faint"} ${small ? "text-[10px]" : "text-xs"}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function Block({
  id,
  tone,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  tone: "white" | "blue";
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 ${tone === "blue" ? "bg-[#EDF5FB]" : "bg-white"} py-16 md:py-24`}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} size="compact" title={title} description={description} />
        <Reveal delay={0.1}>
          <div className="mt-12">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

/* 1) Hauptbild ----------------------------------------------------- */
function MainImageBlock() {
  return (
    <Block
      tone="white"
      eyebrow="Hauptbild"
      title={<>Der erste Eindruck im <span className="text-gradient">Suchergebnis.</span></>}
      description="Das Hauptbild entscheidet über die Klickrate, bevor jemand das Listing öffnet."
    >
      <div className="mx-auto max-w-xl">
        <div className="surface p-5 md:p-7">
          <div className="relative">
            <Tile className="aspect-square w-full" label="Hauptbild" />
            <span className="absolute left-4 top-4 rounded-md bg-ink px-2 py-1 text-[10px] font-bold text-white">
              Amazon&apos;s Choice
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FF9900">
                  <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-semibold text-ink-muted">4,8</span>
            <span className="ml-auto text-xl font-extrabold text-ink">
              59,<span className="align-top text-sm">99 €</span>
            </span>
          </div>
        </div>
      </div>
    </Block>
  );
}

/* 2) Bilderstrecke: 1 Hauptbild + 6 (2x3) -------------------------- */
function ListingBlock() {
  return (
    <Block
      tone="blue"
      eyebrow="Produktbilder"
      title={<>Sieben Bilder, die in <span className="text-gradient">Sekunden überzeugen.</span></>}
      description="Ein Hauptbild plus sechs Listingbilder, die Nutzen, Anwendung und Größe klar machen."
    >
      <div className="mx-auto max-w-md">
        <div className="surface p-5 md:p-6">
          <Tile className="aspect-square w-full" label="Hauptbild" tone="brand" />
          <div className="mt-3 grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Tile key={i} className="aspect-square w-full" label={`Bild ${i + 1}`} small />
            ))}
          </div>
        </div>
      </div>
    </Block>
  );
}

/* 3) A+ / Premium A+: vertikaler Modul-Stack ----------------------- */
function APlusBlock() {
  return (
    <Block
      tone="white"
      eyebrow="A+ und Premium A+"
      title={<>Module, die <span className="text-gradient">Fragen beantworten.</span></>}
      description="A+ Content stapelt sich auf der Detailseite: Hero, Bild-Text-Module, Vergleichstabelle und ein Premium-Karussell."
    >
      <div className="mx-auto max-w-[760px]">
        <div className="surface overflow-hidden p-3 md:p-4">
          <div className="space-y-2.5">
            {/* hero module */}
            <Tile className="aspect-[16/6] w-full" label="A+ Hero-Modul" />
            {/* image + text */}
            <div className="grid grid-cols-2 gap-2.5">
              <Tile className="aspect-[4/3] w-full" small label="Bild" />
              <div className="flex flex-col justify-center gap-2 rounded-2xl bg-navy/[0.03] p-5 ring-1 ring-black/[0.05]">
                <span className="h-2.5 w-2/3 rounded-full bg-navy/15" />
                <span className="h-2 w-full rounded-full bg-navy/10" />
                <span className="h-2 w-5/6 rounded-full bg-navy/10" />
                <span className="h-2 w-3/4 rounded-full bg-navy/10" />
              </div>
            </div>
            {/* comparison table module */}
            <div className="rounded-2xl bg-navy/[0.03] p-4 ring-1 ring-black/[0.05]">
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, c) => (
                  <div key={c} className="space-y-2">
                    <div className={`h-10 rounded-lg ${c === 1 ? "" : "bg-white"} ring-1 ring-black/[0.04]`} style={c === 1 ? { backgroundImage: "var(--brand-gradient)" } : undefined} />
                    {Array.from({ length: 3 }).map((_, r) => (
                      <span key={r} className="block h-2 rounded-full bg-navy/10" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* premium carousel module */}
            <div className="relative">
              <Tile className="aspect-[16/7] w-full" label="Premium A+ Karussell" tone="navy" />
              <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`h-1.5 rounded-full ${i === 0 ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
                ))}
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold text-red">
                Premium A+
              </span>
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
}

/* 4) Brand Store --------------------------------------------------- */
function BrandStoreBlock() {
  return (
    <Block
      tone="blue"
      eyebrow="Brand Store"
      title={<>Eure Markenwelt mit <span className="text-gradient">Cross-Selling.</span></>}
      description="Ein eigener Shop auf Amazon: Header, Hero, Kategorien und Produktraster über das ganze Sortiment."
    >
      <div className="mx-auto max-w-4xl">
        <div className="surface overflow-hidden p-0">
          {/* browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-navy/[0.03] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald/40" />
            <span className="ml-3 h-4 w-48 rounded-full bg-navy/[0.06]" />
          </div>
          {/* store header */}
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-xs font-extrabold text-white" style={{ backgroundImage: "var(--brand-gradient)" }}>M</span>
            <span className="h-2.5 w-24 rounded-full bg-navy/15" />
            <div className="ml-auto flex gap-4">
              {["Start", "Bestseller", "Neu", "Über uns"].map((t) => (
                <span key={t} className="text-xs font-semibold text-ink-muted">{t}</span>
              ))}
            </div>
          </div>
          <div className="space-y-4 px-5 pb-6">
            <Tile className="aspect-[16/5] w-full" label="Store Hero" tone="blue" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-white p-3 ring-1 ring-black/[0.05]">
                  <Tile className="aspect-square w-full" small />
                  <span className="mt-2 block h-2 w-3/4 rounded-full bg-navy/12" />
                  <span className="mt-1.5 block h-2 w-1/3 rounded-full bg-brand-500/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
}

/* 5) Brand Story --------------------------------------------------- */
function BrandStoryBlock() {
  return (
    <Block
      tone="white"
      eyebrow="Brand Story"
      title={<>Aus einem Produkt wird <span className="text-gradient">eine Marke.</span></>}
      description="Das Brand-Story-Modul auf der Detailseite: ein Hintergrund und eine Reihe von Karten, die durch die Markengeschichte führen."
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl p-5 shadow-lift ring-1 ring-black/[0.06] md:p-7" style={{ background: "linear-gradient(135deg,#0A1E2B,#0B4D6B)" }}>
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-50 blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,153,0,0.35), transparent 70%)" }} />
          <div className="relative flex gap-4 overflow-hidden">
            {[
              { t: "Unsere Herkunft", tone: "brand" as const },
              { t: "Unser Versprechen", tone: "blue" as const },
              { t: "Das Sortiment", tone: "neutral" as const },
              { t: "Qualität", tone: "neutral" as const },
            ].map((card, i) => (
              <div key={i} className={`w-1/3 shrink-0 rounded-2xl bg-white p-2.5 shadow-lift ${i === 3 ? "opacity-60" : ""}`}>
                <Tile className="aspect-[3/4] w-full" tone={card.tone} />
                <span className="mt-2 block px-1 text-xs font-bold text-ink">{card.t}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-5 flex items-center justify-end gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        </div>
      </div>
    </Block>
  );
}

export function DesignExamples() {
  return (
    <>
      <MainImageBlock />
      <ListingBlock />
      <APlusBlock />
      <BrandStoreBlock />
      <BrandStoryBlock />
    </>
  );
}
