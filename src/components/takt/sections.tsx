"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { Station, StationTitle, StationLead, RuledRow } from "./Station";
import { Bildfeld } from "./Bildfeld";
import { TaktSzene } from "./Grafiken";
import { cases } from "@/lib/cases";
import { testimonials, initials } from "@/lib/testimonials";
import type { PostMeta } from "@/lib/blog";

/* ============================================================
   Kundenband. Zwei dünne Bänder von vorher zu einem verschmolzen:
   Logos und die beiden verbliebenen Kennzahlen.
   ============================================================ */

const logos = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.png`);
const logoRows = [logos.slice(0, 7), logos.slice(7, 14)];

function LogoRow({ row, duration, reverse }: { row: string[]; duration: number; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
      <div
        className="flex w-max animate-marquee items-center gap-14 md:gap-20"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...row, ...row].map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-9 w-28 shrink-0 opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-10 md:w-32">
            <Image src={src} alt="" fill sizes="128px" className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Kundenband() {
  return (
    <section className="relative border-y border-ink/[0.08] bg-white py-10 md:py-12">
      <div className="container-x">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <span className="text-label font-bold uppercase text-ink-faint">Täglich in unserer Verantwortung</span>
          <span className="text-small font-bold text-ink [font-variant-numeric:tabular-nums]">60+ Marken</span>
          <span className="text-small font-bold text-ink [font-variant-numeric:tabular-nums]">5+ Marktplätze</span>
        </div>
        <div className="mt-8 space-y-6">
          <LogoRow row={logoRows[0]} duration={58} />
          <LogoRow row={logoRows[1]} duration={72} reverse />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   01 · Befund
   ============================================================ */

const befunde = [
  {
    n: "01",
    title: "Zu viele Produkte, zu wenig Zeit",
    body: "Mehrere hundert Artikel liegen bei ein, zwei Leuten, die daneben zehn andere Dinge machen.",
  },
  {
    n: "02",
    title: "Seit dem Launch nichts verändert",
    body: "Bilder, Titel und A+ Content stehen genau so da wie am ersten Tag.",
  },
  {
    n: "03",
    title: "Kampagnen ohne Struktur",
    body: "Auto, Phrase und Exact laufen nebeneinander und bieten gegeneinander.",
  },
  {
    n: "04",
    title: "Berichte, die niemand auswertet",
    body: "Search Query Bericht und Ads-Performance liegen im Konto und werden nicht gelesen.",
  },
];

export function Befund() {
  return (
    <Station n="01" label="Der Befund" tone="paper">
      <StationTitle>Das Nötigste reicht auf Amazon nicht.</StationTitle>

      <div className="mt-12">
        {befunde.map((b) => (
          <RuledRow key={b.n} index={b.n} title={b.title} body={b.body} tone="tint" />
        ))}
        <div className="border-t border-paper-rule" />
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-12">
        <div className="border-l-2 border-brand-500 pl-6 md:pl-8">
          <span className="text-label font-bold uppercase text-brand-800">Die Ursache</span>
          <p className="mt-3 max-w-[52ch] text-balance text-[1.2rem] font-bold leading-[1.4] text-ink md:text-[1.4rem]">
            Vier Symptome, eine Ursache: das Listing überzeugt zu wenige Besucher. Amazon rankt nach
            Klicks und Käufen. Wer dort zurückliegt, muss Sichtbarkeit dauerhaft einkaufen.
          </p>
        </div>
        <div className="overflow-hidden rounded-[1.25rem] shadow-[0_40px_70px_-40px_rgba(2,48,71,0.5)]">
          <Bildfeld
            id="B-02"
            aspect="aspect-[4/3]"
            tone="paper"
            src="/bilder/b-02.webp"
            alt="Ein hoher Stapel gleicher Karten, daneben eine flach liegende Uhr: das Listing steht seit dem Launch unverändert."
          />
        </div>
      </div>
    </Station>
  );
}

/* ============================================================
   02 · Verfahren
   ============================================================ */

const stufen = [
  { name: "Sichtbarkeit", meaning: "im Suchergebnis gefunden werden", signal: false },
  { name: "Klickrate (CTR)", meaning: "der Klick auf euer Produkt", signal: true },
  { name: "Conversion (CVR)", meaning: "der Kauf auf der Detailseite", signal: true },
];

const gegenueber = [
  {
    alt: "Bilder, Texte und Titel einmal erstellt, dann läuft Werbung",
    neu: "Hauptbild, Titel und A+ nachgeschärft, bis die Conversion steht",
  },
  {
    alt: "Content nach Standard, ohne Datenbasis",
    neu: "Content aus Search Query Report, Wettbewerb und Bewertungen",
  },
  {
    alt: "Sichtbarkeit wird über Gebote gekauft, der Klickpreis steigt jedes Jahr",
    neu: "Organische Plätze halten die Sichtbarkeit, Werbung kommt dazu",
  },
  {
    alt: "Umsatz um jeden Preis",
    neu: "Jede SKU auf Deckungsbeitrag gerechnet, gesteuert über den TACoS",
  },
];

export function Verfahren() {
  const reduce = useReducedMotion();
  return (
    <Station n="02" label="Das Verfahren" tone="dark">
      <StationTitle>
        Organic First, <span className="em text-brand-400">PPC Second.</span>
      </StationTitle>
      <StationLead tone="dark">
        Klickrate und Conversion bestimmen, wo Amazon euer Produkt zeigt. Deshalb kommt bei uns zuerst
        das Listing, dann die Kampagne.
      </StationLead>

      {/* Takt: drei Stufen, dann das Ergebnis */}
      <div className="mt-14 grid gap-px overflow-hidden rounded-inner bg-board-rule md:grid-cols-4">
        {stufen.map((s, i) => (
          <motion.div
            key={s.name}
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.09, ease: [0.32, 0.72, 0, 1] }}
            className="relative bg-board-raised p-6"
          >
            <span className="text-label font-bold text-chalk-faint [font-variant-numeric:tabular-nums]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-4 text-[1.05rem] font-bold leading-snug text-chalk">{s.name}</div>
            <div className="mt-1.5 text-small text-chalk-muted">{s.meaning}</div>
            {s.signal && (
              <span className="mt-4 inline-block text-label font-bold uppercase text-brand-500">
                Ranking-Signal
              </span>
            )}
          </motion.div>
        ))}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="bg-brand-500 p-6 text-ink"
        >
          <span className="text-label font-bold uppercase">Ergebnis</span>
          <div className="mt-4 text-[1.05rem] font-extrabold leading-snug">
            Das Listing verkauft ohne Werbung.
          </div>
          <div className="mt-1.5 text-small font-medium">Kampagnen bauen darauf auf.</div>
        </motion.div>
      </div>

      <p className="mt-8 max-w-[62ch] text-body text-chalk-muted">
        Konkret sind das neues Hauptbild, neue Listingbilder, Titel, Bullets, Backend-Felder und A+
        Content. Einmal erstellt reicht nicht, die Zahlen bestimmen die Nacharbeit.
      </p>

      {/* Gegenüberstellung als Buch, nicht als Tabelle mit Rahmen */}
      <div className="mt-16">
        <div className="grid grid-cols-2 gap-x-6 border-b border-board-rule pb-3 md:gap-x-12">
          <span className="text-label font-bold uppercase text-chalk-faint">Wie es jetzt läuft</span>
          <span className="text-label font-bold uppercase text-brand-500">Wie temoa arbeitet</span>
        </div>
        {gegenueber.map((r) => (
          <div key={r.neu} className="grid grid-cols-2 gap-x-6 border-b border-board-rule py-5 md:gap-x-12">
            <p className="text-small leading-snug text-chalk-faint line-through decoration-chalk-faint/40">
              {r.alt}
            </p>
            <p className="text-small font-bold leading-snug text-chalk">{r.neu}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <TaktSzene />
      </div>
    </Station>
  );
}

/* ============================================================
   03 · Leistungen
   ============================================================ */

const leistungen = [
  { n: "01", title: "Strategie & Analyse", body: "Erst die Daten, dann der Plan.", href: "/leistungen/strategie" },
  { n: "02", title: "Content & Listings", body: "Aus Klicks werden Käufe.", href: "/leistungen/listing-seo" },
  { n: "03", title: "Advertising / PPC", body: "Profitabel skalieren.", href: "/leistungen/ppc-advertising" },
  { n: "04", title: "Account-Management", body: "Bestand, Buy-Box, Cases im Griff.", href: "/leistungen/account-management" },
  { n: "05", title: "Internationalisierung", body: "Lokalisieren statt übersetzen.", href: "/leistungen/internationalisierung" },
];

export function Leistungen() {
  return (
    <Station n="03" label="Der Umfang" tone="paper">
      <StationTitle>
        Fünf Leistungen, in der <span className="em text-brand-700">richtigen Reihenfolge.</span>
      </StationTitle>

      <div className="mt-12">
        {leistungen.map((l) => (
          <RuledRow key={l.n} index={l.n} title={l.title} body={l.body} href={l.href} tone="tint" />
        ))}
        <div className="border-t border-paper-rule" />
      </div>

      <a
        href="/full-service"
        className="btn-text mt-10"
      >
        Alle Leistungen ansehen
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </Station>
  );
}

/* ============================================================
   04 · Nachweis
   ============================================================ */

export function Nachweis() {
  return (
    <Station n="04" label="Der Nachweis" tone="dark" id="nachweis">
      <StationTitle>
        Vier Marken, <span className="em text-brand-400">vier Ausgangslagen.</span>
      </StationTitle>
      <StationLead tone="dark">Ausgangslage, Vorgehen, Ergebnis. Mit den Zahlen dahinter.</StationLead>

      <div className="mt-12">
        {cases.map((c, i) => (
          <a
            key={c.slug}
            href={`/ergebnisse/${c.slug}`}
            className="group grid grid-cols-1 items-center gap-6 border-t border-board-rule py-8 transition-colors duration-300 hover:bg-board-raised/60 md:grid-cols-[14rem_1fr_auto] md:gap-8"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-inner md:aspect-[4/3]">
              {c.bgImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.bgImage}
                  alt=""
                  loading={i === 0 ? undefined : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-temoa group-hover:scale-[1.04]"
                />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-label font-bold uppercase text-chalk-faint">
                <span>{c.industry}</span>
                <span aria-hidden>·</span>
                <span>{c.marketplaces.join(" ")}</span>
                <span aria-hidden>·</span>
                <span>{c.timeframe}</span>
              </div>
              <h3 className="mt-3 max-w-[32ch] text-balance text-[1.2rem] font-bold leading-snug tracking-[-0.01em] text-chalk md:text-[1.4rem]">
                {c.headline}
              </h3>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {c.heroStats.slice(0, 3).map((s) => (
                  <span key={s.label} className="text-small text-chalk-muted">
                    <span className="font-extrabold text-chalk [font-variant-numeric:tabular-nums]">{s.value}</span>{" "}
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            <span className="hidden shrink-0 self-center text-brand-500 transition-transform duration-300 group-hover:translate-x-1 md:block" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}
        <div className="border-t border-board-rule" />
      </div>
    </Station>
  );
}

/* ============================================================
   05 · Arbeiten (Designbeispiele)
   ============================================================ */

export function Arbeiten() {
  const reduce = useReducedMotion();
  const tiles = ["Hauptbild", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6", "Bild 7"];
  return (
    <Station n="05" label="Die Arbeiten" tone="tint">
      <StationTitle>
        So sieht <span className="em text-brand-700">Retail Ready</span> aus.
      </StationTitle>
      <StationLead>Ein komplettes Listing, vom Hauptbild bis zum A+ Content.</StationLead>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        {/* Bildstrecke als Kontaktbogen */}
        <div>
          <div className="text-label font-bold uppercase text-ink-faint">Bildstrecke</div>
          <div className="mt-4 grid grid-cols-4 gap-2.5">
            {tiles.map((t, i) => (
              <motion.div
                key={t}
                initial={reduce ? undefined : { opacity: 0 }}
                whileInView={reduce ? undefined : { opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={clsx(
                  "flex items-end rounded-[0.5rem] bg-white p-2 shadow-[0_10px_24px_-16px_rgba(2,48,71,0.5)]",
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                )}
              >
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink-line">{t}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* A+ Aufbau als Blattstapel */}
        <div>
          <div className="text-label font-bold uppercase text-ink-faint">A+ Content</div>
          <div className="mt-4 space-y-2">
            <div className="flex aspect-[16/6] items-end rounded-[0.5rem] bg-white p-3 shadow-[0_10px_24px_-16px_rgba(2,48,71,0.5)]">
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink-line">Modul, Hero</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Modul, Nutzen", "Modul, Anwendung"].map((t) => (
                <div key={t} className="flex aspect-[4/3] items-end rounded-[0.5rem] bg-white p-3 shadow-[0_10px_24px_-16px_rgba(2,48,71,0.5)]">
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink-line">{t}</span>
                </div>
              ))}
            </div>
            <div className="flex aspect-[16/5] items-end rounded-[0.5rem] bg-white p-3 shadow-[0_10px_24px_-16px_rgba(2,48,71,0.5)]">
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink-line">Modul, Vergleich</span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="/design-beispiele"
        className="btn-text mt-10"
      >
        Mehr Designbeispiele
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </Station>
  );
}

/* ============================================================
   06 · Stimmen
   ============================================================ */

export function Stimmen({ n = "06" }: { n?: string } = {}) {
  return (
    <Station n={n} label="Die Stimmen" tone="tint">
      <StationTitle>
        Im Wortlaut, <span className="em text-brand-700">mit Zahlen.</span>
      </StationTitle>

      <div className="mt-12 columns-1 gap-6 md:columns-2 [&>*]:mb-6">
        {testimonials.map((t) => (
          <figure key={t.name} className="break-inside-avoid rounded-[1.25rem] bg-white p-7 shadow-[0_24px_50px_-30px_rgba(2,48,71,0.4)]">
            <div className="flex gap-0.5" aria-label="5 von 5 Sternen">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FF9900" aria-hidden>
                  <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-5 text-pretty text-body text-ink">„{t.quote}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-canvas-tint text-small font-bold text-ink">
                <span aria-hidden>{initials(t.name)}</span>
                {t.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-small font-bold text-ink">{t.name}</span>
                <span className="block truncate text-small text-ink-faint">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Station>
  );
}

/* ============================================================
   07 · Termin
   ============================================================ */

export function Termin({
  n = "07",
  title,
  sub,
}: {
  n?: string;
  title?: React.ReactNode;
  sub?: React.ReactNode;
} = {}) {
  return (
    <section className="relative bg-brand-500 text-ink">
      <div className="container-x">
        <div className="grid gap-y-8 py-24 md:grid-cols-[9rem_1fr] md:gap-x-12 md:py-32 lg:grid-cols-[11rem_1fr]">
          <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-3">
            <span className="num text-[3.5rem] text-ink/20 md:text-[4.5rem]">{n}</span>
            <span className="text-label font-bold uppercase text-ink/70 md:border-t md:border-ink/20 md:pt-4">Der Termin</span>
          </div>
          <div className="min-w-0">
            <h2 className="title max-w-[20ch] text-balance text-[clamp(2rem,1.3rem+2.1vw,3.25rem)]">
              {title ?? "Wie viel Umsatz lässt euer Listing liegen?"}
            </h2>
            <p className="mt-6 max-w-[52ch] text-pretty text-lead text-ink/80">
              {sub ??
                "In der kostenlosen Potenzialanalyse lesen wir die Berichte aus eurem Konto und zeigen euch, was euer Sortiment noch hergibt."}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="/gespraech-vereinbaren"
                className="group inline-flex min-h-[3.25rem] items-center gap-4 rounded-[0.875rem] bg-ink py-2 pl-6 pr-2 text-small font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Potenzialanalyse buchen
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.625rem] bg-brand-500 text-ink transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <span className="text-small font-bold text-ink/75">
                Ihr verlängert nach Performance · 98 % Kundenbindung
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   08 · Mannschaft
   ============================================================ */

const candids = ["/team/Main.jpg", "/team/DSCF2442.jpg", "/team/DSCF2526.jpg", "/team/DSCF2497-2.jpg", "/team/DSCF2749.jpg"];
const members = [
  { src: "/team/Clemens.jpg", name: "Clemens" },
  { src: "/team/Marvin.jpg", name: "Marvin" },
  { src: "/team/Christoph.jpg", name: "Christoph" },
  { src: "/team/Jonas.jpg", name: "Jonas" },
  { src: "/team/Anzelika.jpg", name: "Anzelika" },
  { src: "/team/Marina.jpg", name: "Marina" },
  { src: "/team/Eddie.jpg", name: "Eddie" },
  { src: "/team/Ole.jpg", name: "Ole" },
  { src: "/team/Vadim.jpg", name: "Vadim" },
  { src: "/team/Dias.jpg", name: "Dias" },
  { src: "/team/Burak.jpeg", name: "Burak" },
  { src: "/team/Noor.jpeg", name: "Noor" },
];

export function Mannschaft() {
  return (
    <Station n="08" label="Die Mannschaft" tone="paper" id="team">
      <StationTitle>Das Team hinter temoa.</StationTitle>
      <StationLead>
        Strategie, Design, Advertising und Account-Management, alle im Haus.
      </StationLead>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {candids.slice(0, 3).map((src) => (
          <div key={src} className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-12">
        {members.map((m) => (
          <div key={m.src}>
            <div className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={m.name} loading="lazy" className="aspect-square w-full object-cover grayscale transition duration-500 hover:grayscale-0" />
            </div>
            <p className="mt-2 text-[0.7rem] font-bold text-ink">{m.name}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-[46ch] text-body font-bold text-ink">
        Menschen, kein Tool. An eurem Konto arbeiten mehrere gleichzeitig, jeder in seinem Bereich.
      </p>
    </Station>
  );
}

/* ============================================================
   09 · Wissen
   ============================================================ */

export function Wissen({ posts }: { posts: PostMeta[] }) {
  return (
    <Station n="09" label="Das Wissen" tone="paper">
      <StationTitle>Klartext zu Amazon.</StationTitle>

      <div className="mt-12">
        {posts.map((p, i) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group -mx-5 grid grid-cols-[2.5rem_1fr] items-start gap-x-5 border-t border-ink/[0.09] px-5 py-7 transition-colors duration-300 hover:bg-ink/[0.025] md:grid-cols-[3.5rem_1fr_auto]"
          >
            <span className="num text-[1.5rem] text-ink/20">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block max-w-[48ch] text-balance text-[1.05rem] font-bold leading-snug text-ink md:text-[1.15rem]">
                {p.title}
              </span>
              <span className="mt-2 block text-label font-bold uppercase text-ink-faint">{p.categoryShort}</span>
            </span>
            <span className="hidden shrink-0 self-center text-brand-700 transition-all duration-300 md:grid md:h-10 md:w-10 md:place-items-center md:rounded-[0.625rem] md:group-hover:bg-brand-500 md:group-hover:text-ink" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}
        <div className="border-t border-ink/[0.09]" />
      </div>

      <a
        href="/blog"
        className="btn-text mt-10"
      >
        Alle Beiträge
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </Station>
  );
}
