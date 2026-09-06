"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/* ============================================================
 *  Content-Sektion: jedes Element der Produktdetailseite.
 *
 *  Vorher: sechs gleich grosse weisse Kacheln in einem Raster, in
 *  jeder dieselbe Flasche, darunter zwei kleine Hinweiszeilen. Der
 *  Kunde hat das zu Recht als zu weiss, zu eintoenig und zu
 *  gleichfoermig beschrieben.
 *
 *  Jetzt: unterschiedlich grosse Kacheln, die erste dunkel und doppelt
 *  so breit, und in jeder Kachel ein Nachbau der Stelle, um die es
 *  geht. Der Brand Store ist raus, den muss man nicht zeigen. Der
 *  Hinweis „erfundenes Produkt" ist raus, die Information braucht
 *  niemand.
 * ============================================================ */

/* Hier stand ein erfundenes Produkt aus dem Bildmodell: eine Isolierflasche
   in zehn Ansichten. Auf einer Seite, die erklaert, was wir an einem Listing
   machen, ist das die falsche Wahl. Jetzt steht dort ausgelieferte Arbeit,
   das Listing fuer Miganeo: sieben Bilder und sechs Module Premium A+
   Content, so wie sie auf Amazon stehen.

   Es ist bewusst ueberall dasselbe Listing. Freigegeben liegt bislang nur
   dieses eine vor, und die Kacheln zeigen ohnehin verschiedene Stellen
   derselben Produktseite: erst der Treffer im Suchergebnis, dann die
   Bildstrecke, dann der Teil darunter. Sobald weitere Listings vorliegen,
   bekommt jede Kachel ein eigenes. */
const M = {
  haupt: "/bilder/miganeo/l-1.webp",
  /* Die sechs weiteren Listingbilder in ihrer Reihenfolge. */
  strecke: ["l-2", "l-3", "l-4", "l-5", "l-6", "l-7"].map((n) => `/bilder/miganeo/${n}.webp`),
  /* Die ersten vier Module des Premium A+ Contents. */
  aplus: ["a-1", "a-2", "a-3", "a-4"].map((n) => `/bilder/miganeo/${n}.webp`),
};

/* --- kleine Bausteine ------------------------------------------------- */

function Bild({
  src,
  className = "",
  fit = "contain",
}: {
  src: string;
  className?: string;
  fit?: "contain" | "cover";
}) {
  return (
    <div className={`relative overflow-hidden rounded-[0.6rem] bg-[#F5F8FA] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        className={`absolute inset-0 h-full w-full ${fit === "cover" ? "object-cover" : "object-contain p-1"}`}
      />
    </div>
  );
}

/** Platzhalterzeile. Schrift wird nie in einen Nachbau gesetzt, die Zeilen
 *  zeigen den Aufbau, ohne einen erfundenen Text zu behaupten. */
function Zeile({ w = "100%", stark = false }: { w?: string; stark?: boolean }) {
  return (
    <span
      className={`block rounded-full ${stark ? "h-2 bg-navy/45" : "h-1.5 bg-navy/20"}`}
      style={{ width: w }}
    />
  );
}

/* --- Nachbauten ------------------------------------------------------- */

/**
 * Suchergebnis: vier Treffer nebeneinander, einer davon gewinnt den Klick.
 *
 * Das ist die Stelle, an der das Hauptbild entscheidet. Der eigene Treffer
 * pulsiert dauerhaft, damit sich in der Sektion etwas bewegt, ohne dass man
 * mit dem Zeiger darueberfahren muss.
 */
function SucheViz() {
  return (
    <div className="rounded-[1.1rem] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(4,20,34,0.55)] md:p-5">
      <div className="flex items-center gap-2 rounded-full bg-[#F2F6F9] px-3 py-2">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="shrink-0 text-ink-faint">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.7" />
          <path d="M14 14l-3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <Zeile w="42%" />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {[0, 1, 2, 3].map((i) => {
          const unser = i === 1;
          return (
            <motion.div
              key={i}
              className={`rounded-[0.75rem] p-2 ${
                unser
                  ? "bg-white shadow-[0_10px_28px_-14px_rgba(255,153,0,0.85)] ring-2 ring-brand-500"
                  : "bg-[#F7F9FB] ring-1 ring-navy/[0.07]"
              }`}
              animate={unser ? { y: [0, -5, 0] } : undefined}
              transition={unser ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } : undefined}
            >
              {unser ? (
                <Bild src={M.haupt} className="aspect-square" />
              ) : (
                <div className="aspect-square rounded-[0.6rem] bg-navy/[0.07]" />
              )}
              <div className="mt-2 space-y-1 opacity-70">
                <Zeile w="90%" />
                <Zeile w="60%" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Produktseite: Bildspalte links, Hauptbild in der Mitte, Kaufbereich rechts.
 * Der Aufbau, den jeder von Amazon kennt, ohne Amazon-Oberflaeche.
 */
function ListingViz() {
  return (
    /* `items-start`: das Hauptbild ist 4:5, die Spalte daneben sind sechs
       Quadrate. Beide sind fast gleich hoch, aber nicht auf das Pixel; ohne
       das zieht der Browser das kuerzere auf die Hoehe des laengeren und
       verzerrt es. */
    <div className="rounded-[1.1rem] bg-white p-3.5 shadow-[0_20px_50px_-30px_rgba(4,20,34,0.55)]">
      <div className="flex items-start gap-2.5">
        <div className="flex w-[12%] shrink-0 flex-col gap-1.5">
          {M.strecke.map((s, i) => (
            <Bild key={s} src={s} className={`aspect-square ${i === 0 ? "ring-2 ring-brand-500" : ""}`} fit="cover" />
          ))}
        </div>
        <Bild src={M.haupt} className="aspect-[4/5] flex-1" />
        <div className="flex w-[30%] shrink-0 flex-col gap-2 pt-1">
          <Zeile w="100%" stark />
          <Zeile w="72%" stark />
          <span className="mt-1 flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill="#FF9900">
                <path d="M12 2l2.9 6.3 6.9.8-5 4.8 1.2 6.8L12 17.4 6 20.7l1.2-6.8-5-4.8 6.9-.8L12 2z" />
              </svg>
            ))}
          </span>
          <span className="mt-2 block h-3.5 w-[62%] rounded bg-navy/60" />
          <div className="mt-1 space-y-1.5">
            <Zeile w="94%" />
            <Zeile w="86%" />
            <Zeile w="90%" />
          </div>
          <span className="mt-auto block h-5 rounded-full bg-brand-500" />
        </div>
      </div>
    </div>
  );
}

/**
 * A+ Content: die ersten vier Module, liegend und ohne Abstand untereinander.
 *
 * Vorher lagen hier drei Kaesten mit einem Bild links und nachgebauten
 * Textzeilen rechts. Das ist ueberfluessig, seit hier echte Module stehen:
 * die tragen ihre Ueberschriften und ihre Bilder selbst. Ohne Abstand, weil
 * sie auf der Produktseite auch ineinander laufen.
 */
function APlusViz() {
  return (
    <div className="rounded-[1.1rem] bg-white p-3.5 shadow-[0_20px_50px_-30px_rgba(4,20,34,0.55)]">
      {/* Feste Hoehe mit weichem Auslauf. Ein A+ Modul ist 2,4 mal so breit
          wie hoch; vier davon untereinander sind hoeher als die beiden
          Nachbarkacheln, und weil das Raster die Zeile auf die hoechste
          Kachel zieht, stand unter den anderen beiden eine leere Flaeche.
          Der Auslauf sagt ausserdem das Richtige: auf der Produktseite geht
          es an dieser Stelle weiter. */}
      <div className="relative h-[19rem] overflow-hidden rounded-[0.7rem]">
        {M.aplus.map((src) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={src} src={src} alt="" loading="lazy" className="block w-full" />
        ))}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{ background: "linear-gradient(to top, #ffffff 12%, rgba(255,255,255,0))" }}
        />
      </div>
    </div>
  );
}

/**
 * Brand Story: das breite Band ueber der Detailseite, darunter die Kartenreihe,
 * durch die gewischt wird.
 *
 * Eine freigegebene Brand Story liegt noch nicht vor. Der Aufbau ist deshalb
 * mit Bildern aus demselben Listing gestellt: das Band traegt die
 * Anwendungsaufnahme, die Karten stehen fuer die weiteren Artikel der Marke.
 * Ueber die Karten laeuft eine Wischleiste, weil das die Stelle ist, an der
 * ein Kaeufer von einem Produkt zum naechsten kommt.
 */
function BrandStoryViz() {
  const karten = [M.strecke[1], M.strecke[3], M.strecke[4]];
  return (
    <div className="rounded-[1.1rem] bg-white p-3.5 shadow-[0_20px_50px_-30px_rgba(4,20,34,0.55)]">
      <Bild src={M.strecke[5]} className="aspect-[16/7] rounded-[0.7rem]" fit="cover" />
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {karten.map((s) => (
          <Bild key={s} src={s} className="aspect-square rounded-[0.6rem]" fit="cover" />
        ))}
      </div>
      {/* Die Wischleiste unter der Kartenreihe. */}
      <div className="mt-2.5 flex justify-center">
        <span aria-hidden className="relative block h-1 w-16 overflow-hidden rounded-full bg-navy/10">
          <motion.span
            className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-brand-500"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </div>
  );
}

/** Titel, Bullets, Backend: was der Kaeufer liest und was nur Amazon sieht. */
function SeoViz() {
  return (
    <div className="rounded-[1.1rem] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(4,20,34,0.55)]">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="h-3 w-16 rounded bg-navy/45" />
        <span className="h-3 w-11 rounded bg-brand-500" />
        <span className="h-3 w-20 rounded bg-navy/45" />
        <span className="h-3 w-10 rounded bg-brand-500" />
        <span className="h-3 w-14 rounded bg-navy/45" />
      </div>

      <div className="mt-4 space-y-2.5">
        {[92, 84, 88, 76, 80].map((w, i) => (
          <div key={i} className="flex items-start gap-2">
            <span aria-hidden className="mt-[0.3rem] h-1.5 w-1.5 shrink-0 rounded-full bg-navy/50" />
            <div className="flex-1 space-y-1">
              <span className="block h-2 rounded-full bg-navy/40" style={{ width: `${w * 0.4}%` }} />
              <Zeile w={`${w}%`} />
            </div>
          </div>
        ))}
      </div>

      {/* Backend: die Felder, die kein Kaeufer sieht. Deshalb dunkel abgesetzt. */}
      <div className="mt-4 rounded-[0.7rem] bg-navy p-3">
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/60">
          Backend
        </span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[38, 26, 46, 30, 34, 22].map((w, i) => (
            <span
              key={i}
              className="h-2.5 rounded-full"
              style={{ width: w, background: i % 3 === 1 ? "#FF9900" : "rgba(255,255,255,0.28)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Kacheln ---------------------------------------------------------- */

type Kachel = {
  viz: () => React.ReactNode;
  kicker: string;
  title: string;
  desc: string;
  span?: string;
  dunkel?: boolean;
};

const kacheln: Kachel[] = [
  {
    viz: SucheViz,
    kicker: "Hauptbild",
    title: "Der Klick fällt im Suchergebnis.",
    desc: "Neben drei anderen Treffern habt ihr eine Sekunde. Das Hauptbild entscheidet, ob geklickt wird.",
    span: "lg:col-span-2",
    dunkel: true,
  },
  {
    viz: ListingViz,
    kicker: "Listing",
    title: "Sieben Bilder, die zusammen erzählen.",
    desc: "Größe, Anwendung, Material, Lieferumfang. Wer scrollt, hat danach keine Frage mehr offen.",
  },
  {
    viz: APlusViz,
    kicker: "A+ und Premium A+",
    title: "Der Teil unter den Bullets.",
    desc: "Liegende Module, eines unter dem anderen. Hier beantwortet ihr, woran der Kauf sonst scheitert.",
  },
  {
    viz: BrandStoryViz,
    kicker: "Brand Story",
    title: "Aus einem Produkt wird eine Marke.",
    desc: "Das Band über der Detailseite führt zu euren anderen Produkten, statt zum nächsten Anbieter.",
  },
  {
    viz: SeoViz,
    kicker: "Titel, Bullets, Backend",
    title: "Gefunden werden, ohne Wortsalat.",
    desc: "Lesbar für Menschen geschrieben, verständlich für Rufus, COSMO und A10.",
  },
];

export function ContentShowcase() {
  return (
    <section className="relative isolate ground-tint py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Content"
          size="compact"
          title={
            <>
              Jedes Element eurer <span className="text-gradient">Produktseite.</span>
            </>
          }
          description="Vom ersten Bild im Suchergebnis bis zum Feld, das nur Amazon liest."
        />

        <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3" stagger={0.06}>
          {kacheln.map((k) => {
            const Viz = k.viz;
            return (
              <RevealItem key={k.title} className={`h-full ${k.span ?? ""}`}>
                <div
                  className={`${
                    k.dunkel ? "panel-navy on-dark" : "panel panel-lift"
                  } flex h-full flex-col p-5 md:p-6`}
                >
                  <Viz />
                  {/* Die Nachbauten sind unterschiedlich hoch. Der Text sitzt
                      deshalb am Fuss der Kachel, sonst haengt unter den
                      kuerzeren Kacheln eine leere Flaeche. */}
                  <div className="mt-auto flex flex-col pt-6">
                    <span
                      className={`text-label font-bold uppercase tracking-[0.14em] ${
                        k.dunkel ? "text-brand-400" : "text-ink-soft"
                      }`}
                    >
                      {k.kicker}
                    </span>
                    <h3
                      className={`mt-2 text-balance text-[1.15rem] font-bold leading-snug md:text-[1.3rem] ${
                        k.dunkel ? "text-white" : "text-ink"
                      }`}
                    >
                      {k.title}
                    </h3>
                    <p
                      className={`mt-2 text-small leading-relaxed ${
                        k.dunkel ? "text-chalk-muted" : "text-ink-muted"
                      }`}
                    >
                      {k.desc}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Der Merksatz der Sektion. Vorher stand er klein und grau unter dem
            Raster und war nicht zu sehen. */}
        <Reveal delay={0.12}>
          <p className="title mx-auto mt-14 max-w-[24ch] text-balance text-center text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] text-ink">
            Solange das Listing nicht von allein verkauft, <span className="mark">verpufft jeder Euro Werbung.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
