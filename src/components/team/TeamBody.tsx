"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Station, StationTitle, StationLead } from "../takt/Station";
import { Gespraech } from "../takt/Gespraech";
import { gruender, members, candids, candidsWeiter, imHaus, type Person } from "@/lib/team";

/* ============================================================
   Die Team-Seite.

   Auf der Startseite standen fuenfzehn Bilder am Fuss einer langen Seite: drei
   Aufnahmen, drei Gruender und neun Portraits. Dort ist jetzt nur noch der
   kurze Block mit den drei Aufnahmen und dem Weg hierher. Alles Weitere steht
   auf dieser Seite.

   Die Seite steht nicht in der Kopfzeile. Sie ist ein Beleg, keine Leistung:
   verlinkt aus der Team-Sektion der Startseite und aus der Fusszeile.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Was die drei Gruender im Ablauf machen. Bewusst nur die Aufgabe aus der
   Rolle, keine erfundene Vita: was jemand studiert hat oder wie lange er dabei
   ist, steht hier nur, wenn es vom Kunden kommt. */
const gruenderRolle: Record<string, string> = {
  Clemens: "Führt das Erstgespräch und die Potenzialanalyse.",
  Christoph: "Ansprechpartner im laufenden Betrieb, von der Übergabe an.",
  Eddie: "Verantwortet Abläufe, Termine und die Qualität der Arbeit.",
};

function Portrait({ p, gross = false }: { p: Person; gross?: boolean }) {
  return (
    <div className={gross ? "panel panel-lift flex flex-col p-7 md:p-8" : "panel panel-lift overflow-hidden p-3"}>
      {gross ? (
        <>
          <span className="relative w-fit">
            <span aria-hidden className="halo -left-4 -top-4 h-[9rem] w-[9rem] opacity-70" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.name}
              loading="lazy"
              className="relative h-[6.5rem] w-[6.5rem] rounded-full object-cover shadow-[0_1px_2px_rgba(13,36,57,0.06),0_16px_32px_-16px_rgba(13,36,57,0.45)]"
            />
          </span>
          <p className="mt-6 text-[1.5rem] font-extrabold leading-tight tracking-tight text-ink">{p.name}</p>
          <p className="mt-1.5 text-small font-bold text-ink-soft">{p.rolle}</p>
          <p className="mt-3 text-small leading-relaxed text-ink-muted">{gruenderRolle[p.name]}</p>
        </>
      ) : (
        <>
          <div className="overflow-hidden rounded-[0.85rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.name} loading="lazy" className="aspect-square w-full object-cover" />
          </div>
          <p className="mt-3 px-0.5 text-[0.9rem] font-bold leading-tight text-ink">{p.name}</p>
          <p className="mt-1 px-0.5 text-[0.75rem] leading-snug text-ink-faint">{p.rolle}</p>
        </>
      )}
    </div>
  );
}

export function TeamBody() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    ({
          initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
        });

  return (
    <>
      {/* Kopf. Kein PageHero mit mittigem Text: hier traegt das Gruppenbild
          den Kopf, und der Text steht daneben. */}
      <section className="ground relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <span aria-hidden className="halo pointer-events-none -right-32 -top-40 h-[38rem] w-[38rem]" />
        <div className="container-x relative">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_20px_-14px_rgba(13,36,57,0.3)]">
                <span aria-hidden className="node-glow" />
                <span className="text-label font-bold uppercase text-ink-soft">Team</span>
              </span>
              <h1 className="display mt-6 max-w-[16ch] text-balance text-[clamp(2.2rem,1.5rem+2.3vw,3.3rem)] text-ink">
                Wer bei euch <span className="em mark">am Konto sitzt.</span>
              </h1>
              <p className="mt-7 max-w-[46ch] text-pretty text-lead text-ink-muted">
                Drei Gründer, neun im Team. Strategie, Bilder, Texte, Kampagnen und Tagesgeschäft
                liegen bei verschiedenen Leuten, die alle dieselben Zahlen vor sich haben.
              </p>
            </div>

            <motion.div
              {...auf(0.1)}
              className="overflow-hidden rounded-[1.5rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_34px_60px_-32px_rgba(13,36,57,0.45)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={candids[0]} alt="Das Team von temoa" className="aspect-[16/10] w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Die drei Gruender */}
      <Station label="Gründer" tone="tint">
        <StationTitle>Die drei, mit denen ihr sprecht.</StationTitle>
        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
          {gruender.map((g, i) => (
            <motion.div key={g.name} {...auf(i * 0.07)} className="h-full">
              <Portrait p={g} gross />
            </motion.div>
          ))}
        </div>
      </Station>

      {/* Wie die Arbeit verteilt ist, mit der Grafik daneben */}
      <Station label="Wie wir arbeiten" tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <StationTitle className="!max-w-none">
              Fünf Bereiche,
              <br />
              <span className="em mark">ein Konto.</span>
            </StationTitle>
            <StationLead className="max-w-[40ch]">
              Kein Bereich wird eingekauft und keiner liegt nebenbei bei jemandem, der noch drei
              andere Dinge macht.
            </StationLead>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {imHaus.map((b, i) => (
                <motion.div
                  key={b}
                  {...auf(0.05 + i * 0.05)}
                  className="flex items-center gap-3.5 rounded-[1.1rem] bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(13,36,57,0.05),0_14px_28px_-18px_rgba(13,36,57,0.25)]"
                >
                  <span className="num shrink-0 text-[1.3rem] leading-none text-ink/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] font-bold leading-snug text-ink">{b}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...auf(0.12)} className="relative">
            <span aria-hidden className="halo left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bilder/n-haus.webp"
              alt="Ein offener Kasten mit fünf Fächern, in jedem ein Werkzeug, alle mit einer Mitte verbunden."
              width={1536}
              height={1152}
              loading="lazy"
              className="relative mx-auto w-full max-w-[34rem]"
            />
          </motion.div>
        </div>
      </Station>

      {/* Das Team */}
      <Station label="Im Team" tone="tint">
        <StationTitle>Neun, die täglich an euren Konten arbeiten.</StationTitle>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {members.map((m, i) => (
            <motion.div key={m.name} {...auf(0.03 + i * 0.03)} className="h-full">
              <Portrait p={m} />
            </motion.div>
          ))}
        </div>
      </Station>

      {/* Aufnahmen aus dem Haus */}
      <Station label="Bei uns" tone="paper">
        <StationTitle>Aus dem Büro.</StationTitle>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...candids.slice(1), ...candidsWeiter].map((src, i) => (
            <motion.div
              key={src}
              {...auf(i * 0.06)}
              className="overflow-hidden rounded-[1.25rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_20px_38px_-22px_rgba(13,36,57,0.34)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </Station>

      <Gespraech title="Lernt uns im Gespräch kennen." />
    </>
  );
}
