"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Station, StationTitle, StationLead, Eyebrow, Karte } from "./Station";
import { Icon, type IconName } from "./Icons";
import { Zusammenlauf } from "./Zusammenlauf";
import { usePathname } from "next/navigation";
import { pfad, spracheAusPfad, type Sprache } from "@/lib/i18n";
import type { Woerterbuch } from "@/lib/woerter";
import { rahmenWoerter } from "@/lib/woerter/rahmen";

/* Die Copy kommt aus dem Woerterbuch und wird von der Seite als Prop
   uebergeben: diese Datei laeuft im Browser. Hier bleiben die Symbole, die
   Bildpfade und die Reihenfolgen. */
type W = Woerterbuch["fullService"];

/**
 * /full-service in der Welt „Taktplan".
 * Der Text ist der freigegebene Wortlaut und wird nicht verändert.
 */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Die Symbole in der Reihenfolge des Woerterbuchs. */
const FUER_WEN: IconName[] = ["regal", "kompass", "stufen", "globus"];
const MARKEN: IconName[] = ["globus", "trichter", "stufen", "regal"];
const AUSGANGSLAGE: IconName[] = ["uhr", "streuung", "schild"];

/* Die Ziffern der fuenf Bereiche und die Symbole der vier Punkte unter
   „Zusammenarbeit", je in der Reihenfolge des Woerterbuchs. */
const UNTERSCHIED: IconName[] = ["bericht", "uhr", "ziel", "schild"];

/* ---------- 00 · Kopf ---------- */
export function FullServiceKopf({ sprache, w }: { sprache: Sprache; w: W["kopf"] }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    ({ initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: reduce ? { duration: 0 } : { duration: 0.85, delay, ease: EASE } });

  return (
    <section className="ground relative overflow-hidden">
      <span aria-hidden className="halo pointer-events-none -right-32 -top-44 h-[42rem] w-[42rem]" />
      <div className="container-x relative">
        <div className="pb-24 pt-28 md:pb-28 md:pt-32">
          <motion.div {...rise(0)}>
            <Eyebrow label={w.eyebrow} />
          </motion.div>

          <div className="grid min-w-0 items-center gap-y-12 lg:grid-cols-[1fr_0.8fr] lg:gap-x-16">
            <div className="min-w-0">
              <motion.h1 {...rise(0.08)} className="display max-w-full text-balance text-[clamp(1.95rem,1.35rem+2.3vw,3.25rem)] text-ink">
                {w.titelVor}
                <span className="em mark">{w.titelMark}</span>
              </motion.h1>
              <motion.p {...rise(0.16)} className="mt-8 max-w-[52ch] text-pretty text-lead text-ink-muted">
                {w.lead}
              </motion.p>
              <motion.div {...rise(0.24)} className="mt-10">
                <a href={pfad(sprache, "/gespraech-vereinbaren")} className="btn-primary">
                  {rahmenWoerter[sprache].rahmen.cta}
                  <span className="disc" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Vorher stand hier eine Produktaufnahme mit einem Rucksack in
                einer Platte. Auf der Uebersichtsseite geht es um fuenf
                Bereiche an einem Konto, nicht um ein einzelnes Produkt.
                Die Illustration ist freigestellt und braucht keine Platte. */}
            <motion.div {...rise(0.18)} className="relative min-w-0">
              <span aria-hidden className="halo left-[10%] top-[12%] h-3/4 w-3/4" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bilder/n-team.webp"
                alt={w.bildAlt}
                className="relative w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 01 · Für wen ---------- */
export function FuerWen({ w }: { w: W["fuerWen"] }) {
  return (
    <Station label={w.label} tone="paper">
      <StationTitle>{w.titel}</StationTitle>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {w.punkte.map((t, i) => (
          <Karte key={t} icon={FUER_WEN[i]} title={t} />
        ))}
      </div>
    </Station>
  );
}

/* ---------- Marken mit Vertrieb außerhalb von Amazon ---------- */
export function Marken({ w }: { w: W["marken"] }) {
  return (
    <Station label={w.label} tone="tint">
      <StationTitle>{w.titel}</StationTitle>
      <StationLead>{w.lead}</StationLead>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {w.karten.map((k, i) => (
          <Karte key={k.titel} icon={MARKEN[i]} title={k.titel} body={k.text} />
        ))}
      </div>
    </Station>
  );
}

/* ---------- 02 · Die Ausgangslage ---------- */
export function Ausgangslage({ w }: { w: W["ausgangslage"] }) {
  return (
    <Station label={w.label} tone="paper">
      <StationTitle>{w.titel}</StationTitle>
      <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
        {w.karten.map((r, i) => (
          <Karte key={r.titel} icon={AUSGANGSLAGE[i]} title={r.titel} body={r.text} />
        ))}
      </div>
    </Station>
  );
}

/* ---------- 03 · Was wir übernehmen ---------- */
export function Bereiche({ w }: { w: W["bereiche"] }) {
  const reduce = useReducedMotion();
  return (
    <Station label={w.label} tone="dark">
      <StationTitle>{w.titel}</StationTitle>

      <StationLead>{w.lead}</StationLead>
      <div className="mt-12 space-y-5">
        {w.liste.map((b, i) => (
          <motion.div key={b.bereich}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.03, ease: EASE }}
            className="grid min-w-0 gap-7 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[0.8fr_1.4fr] md:gap-10 md:p-8">
            <div className="min-w-0">
              <h3 className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-white md:text-[1.9rem]">{b.bereich}</h3>
              <p className="mt-4 max-w-[36ch] text-small leading-relaxed text-chalk-muted">{b.zeile}</p>
            </div>
            <ul className="grid min-w-0 gap-x-6 gap-y-4 sm:grid-cols-2">
              {b.punkte.map(t=><li key={t} className="flex items-start gap-2.5 text-small leading-relaxed text-chalk-muted">
                <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-[#6EE7A0]" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>{t}</span>
              </li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </Station>
  );
}

/* ---------- 04 · Immer enthalten ---------- */
/**
 * Reporting.
 *
 * Vorher: die Bezeichnung stand in einer eigenen Spalte links, daneben eine
 * kleine Überschrift und drei fett gesetzte Zeilen ohne erkennbares Verhältnis,
 * alles flach auf Weiß. Die Sektion hatte kein Gewicht und man sah nicht, wie
 * die Texte zueinander stehen.
 *
 * Jetzt: eine Überschrift in Sektionsgröße, darunter drei Karten mit Symbol
 * und einem Satz, daneben das Bild. Damit ist die Hierarchie in einem Blick da.
 */
export function Reporting({ w }: { w: W["reporting"] }) {
  const reduce = useReducedMotion();
  const sprache = spracheAusPfad(usePathname());
  const auf = (delay: number) =>
    ({
          initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
        });

  /* Die drei Zeilen hier sagten dreimal dasselbe: Zahlen je Produkt, Gewinn
     je Artikel, Plaetze je Suchbegriff. Alles Rueckblick, alles eine Ebene.
     Ein Report, den eine Geschaeftsfuehrung liest, beantwortet drei
     verschiedene Fragen: Was ist passiert, warum, und was machen wir jetzt.
     Danach sind die drei Punkte gebaut. */
  const zeichen: IconName[] = ["bericht", "lupe", "ziel"];

  return (
    <Station label={w.label} tone="tint">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.68fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <StationTitle>{w.titel}</StationTitle>
          <StationLead>{w.lead}</StationLead>

          <div className="mt-8 space-y-3">
            {w.punkte.map((p, i) => (
              <motion.div key={p.titel} {...auf(i * 0.07)} className="panel flex items-start gap-5 p-5 md:p-6">
                <span className="tile !h-[3.75rem] !w-[3.75rem] !rounded-[1.2rem]">
                  <Icon name={zeichen[i]} className="h-8 w-8" />
                </span>
                <div className="min-w-0">
                  <div className="text-[1.05rem] font-bold leading-snug text-ink md:text-[1.12rem]">{p.titel}</div>
                  <p className="mt-1.5 text-small leading-relaxed text-ink-muted">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <a href={pfad(sprache, "/leistungen/analytics-reporting")} className="btn-text mt-8">
            {w.link}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <motion.div {...auf(0.12)} className="relative flex items-center justify-center">
          <span aria-hidden className="halo left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bilder/n-reporting.webp"
            alt={w.bildAlt}
            width={1408}
            height={1056}
            loading="lazy"
            className="relative w-full"
          />
        </motion.div>
      </div>
    </Station>
  );
}

/* ---------- 05 · Der Unterschied ---------- */
export function Unterschied({ w, zusammenlauf }: { w: W["unterschied"]; zusammenlauf: W["zusammenlauf"] }) {
  const reduce = useReducedMotion();
  return (
    <Station label={w.label} tone="paper">
      <StationTitle>
        {w.titelVor}
        <span className="em mark">{w.titelMark}</span>
        {w.titelNach}
      </StationTitle>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:gap-14">
        {/* Vorher Zeilen zwischen Haarlinien. Das Theme fuehrt solche Listen
            als Karten, damit sie als Block lesbar sind. */}
        <ul className="grid gap-3 sm:grid-cols-2">
          {w.punkte.map((u, i) => (
            <motion.li
              key={u}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="panel panel-lift flex h-full items-center gap-5 p-5 md:p-6"
            >
              <span className="tile !h-[3.75rem] !w-[3.75rem] !rounded-[1.2rem]">
                <Icon name={UNTERSCHIED[i]} className="h-8 w-8" />
              </span>
              <span className="min-w-0 text-[1.02rem] font-bold leading-snug text-ink">{u}</span>
            </motion.li>
          ))}
        </ul>
        {/* Hier stand ein leeres Bildfeld. Die Aussage der Sektion ist ein
            Zusammenhang, und den zeichnet dieses Theme statt ihn zu
            bebildern: eine Quelle, fuenf Bereiche, leuchtende Verbindungen. */}
        <div className="min-w-0">
          <Zusammenlauf w={zusammenlauf} />
        </div>
      </div>
    </Station>
  );
}

/* ---------- 06 · Fuer wen es nicht passt ---------- */

/**
 * Der Ausschluss.
 *
 * Die Seite sagte bisher nur, fuer wen die Zusammenarbeit passt. Wer beides
 * liest, glaubt das Erste erst richtig: eine Liste, die niemanden ausschliesst,
 * ist keine Auswahl, sondern eine Anzeige. Die vier Punkte hier sind bewusst
 * die Kehrseite der eigenen Argumente, damit sie nicht als Absage klingen,
 * sondern als Haltung.
 */
export function NichtFuerWen({ w }: { w: W["nichtFuerWen"] }) {
  const reduce = useReducedMotion();
  return (
    <Station label={w.label} tone="warm">
      <StationTitle>
        {w.titelVor}
        <span className="em mark">{w.titelMark}</span>
      </StationTitle>
      <StationLead>{w.lead}</StationLead>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
        {w.karten.map((n, i) => (
          <motion.div
            key={n.titel}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            className="panel flex h-full items-start gap-5 p-6 md:p-7"
          >
            <span
              aria-hidden
              className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-[0.9rem]"
              style={{ background: "rgba(224,36,22,0.1)", color: "#C0241A" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="text-[1.08rem] font-bold leading-snug text-ink md:text-[1.18rem]">{n.titel}</div>
              <p className="mt-2 text-small leading-relaxed text-ink-muted">{n.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Station>
  );
}
