"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Station, StationTitle, StationLead, Eyebrow, Karte } from "./Station";
import { Icon, type IconName } from "./Icons";
import { Zusammenlauf } from "./Zusammenlauf";
import { pfad, type Sprache } from "@/lib/i18n";
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
    <Station label={w.label} tone="tint">
      <StationTitle>{w.titel}</StationTitle>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {w.punkte.map((t, i) => (
          <Karte key={t} icon={FUER_WEN[i]} title={t} />
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
      <div className="mt-12 border-l-2 border-brand-500 pl-6 md:pl-8">
        <p className="max-w-[52ch] text-balance text-[1.2rem] font-bold leading-[1.4] text-ink md:text-[1.4rem]">
          {w.schluss}
        </p>
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

      <div className="mt-14">
        {w.liste.map((b, i) => (
          <motion.div
            key={b.bereich}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
            className="grid grid-cols-1 gap-y-5 border-t border-white/10 py-10 md:grid-cols-[3.5rem_1fr_1fr] md:gap-x-10"
          >
            <span className="num text-[1.5rem] text-white/25">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.07] py-1.5 pl-2.5 pr-3.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)]">
                <span aria-hidden className="node-glow" />
                <span className="text-label font-bold uppercase text-brand-400">{b.bereich}</span>
              </span>
              <h3 className="mt-4 max-w-[26ch] text-balance text-[1.25rem] font-bold leading-snug tracking-[-0.015em] text-white md:text-[1.4rem]">
                {b.titel}
              </h3>
              <p className="mt-3 max-w-[46ch] text-body text-chalk-muted">{b.zeile}</p>
            </div>
            <ul className="min-w-0 space-y-3">
              {b.punkte.map((t) => (
                <li key={t} className="grid grid-cols-[0.6rem_1fr] gap-x-3 text-small leading-relaxed text-chalk-muted">
                  <span aria-hidden className="mt-[0.55rem] h-[3px] w-[0.6rem] rounded-full bg-brand-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        <div className="border-t border-white/10" />
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
