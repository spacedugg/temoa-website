"use client";

import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";

const pains: { icon: IconName; title: string; body: string }[] = [
  { icon: "layers", title: "Zu viele Produkte, zu wenig Zeit", body: "Mehrere hundert Artikel liegen bei ein, zwei Leuten, die daneben zehn andere Dinge machen." },
  { icon: "content", title: "Seit dem Launch nichts verändert", body: "Bilder, Titel und A+ Content stehen genau so da wie am ersten Tag." },
  { icon: "ads", title: "Kampagnen ohne Struktur", body: "Auto, Phrase und Exact laufen nebeneinander und bieten gegeneinander." },
  { icon: "search", title: "Berichte, die niemand auswertet", body: "Search Query Bericht und Ads-Performance liegen im Konto und werden nicht gelesen." },
];

export function Problem() {
  return (
    <section className="section-y relative bg-canvas-tint">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              Das Problem
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Das Nötigste reicht auf <span className="text-gradient">Amazon nicht.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div
            className="mx-auto mt-10 flex aspect-[7/1] max-w-4xl items-center justify-center overflow-hidden rounded-card bg-white/60"
          >
            <span className="text-label font-semibold uppercase text-ink-line">Bild folgt</span>
          </div>
        </Reveal>

        <RevealGroup className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.06}>
          {pains.map((p) => (
            <RevealItem key={p.title} className="h-full">
              <div className="surface surface-hover flex h-full flex-col items-center p-5 text-center">
                <span className="text-ink-soft">
                  <Icon name={p.icon} size={30} />
                </span>
                <h3 className="mt-4 text-balance text-base font-bold leading-snug text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl rounded-card bg-white px-7 py-7 text-center shadow-lift">
            <span className="eyebrow justify-center !text-red">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              Die Ursache
            </span>
            <p className="mt-3 text-balance text-lg font-semibold leading-snug text-ink md:text-xl">
              Vier Symptome, eine Ursache:{" "}
              <span className="text-gradient">das Listing überzeugt zu wenige Besucher.</span>{" "}
              Amazon rankt nach Klicks und Käufen. Wer dort zurückliegt, muss Sichtbarkeit dauerhaft einkaufen.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
