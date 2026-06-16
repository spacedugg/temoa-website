"use client";

import { ReactNode } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";
import { GradientTile } from "../ui/MockKit";

type Tint = "brand" | "emerald" | "warm" | "cool";

export type Block =
  | {
      kind: "rows";
      eyebrow?: string;
      title?: ReactNode;
      description?: string;
      items: { kicker?: string; title: string; body: string; bullets?: string[]; icon: IconName; tint?: Tint }[];
    }
  | {
      kind: "grid";
      eyebrow?: string;
      title?: ReactNode;
      description?: string;
      cols?: 2 | 3;
      items: { title: string; body: string; icon?: IconName }[];
    }
  | { kind: "callout"; eyebrow?: string; title: string; body: ReactNode }
  | { kind: "bridge"; eyebrow?: string; title: string; links: { label: string; href: string; body?: string }[] }
  | { kind: "qa"; eyebrow?: string; title?: ReactNode; items: { q: string; a: string }[] };

const tints: Tint[] = ["brand", "emerald", "warm", "cool"];

function Rows({ block }: { block: Extract<Block, { kind: "rows" }> }) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        {(block.eyebrow || block.title) && (
          <SectionHeading eyebrow={block.eyebrow} title={block.title ?? ""} description={block.description} />
        )}
        <div className="mt-14 space-y-16 md:space-y-24">
          {block.items.map((it, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={it.title} className="grid items-center gap-10 lg:grid-cols-2">
                <Reveal direction={flip ? "left" : "right"} className={flip ? "lg:order-2" : ""}>
                  <div>
                    {it.kicker && <span className="eyebrow">{it.kicker}</span>}
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{it.title}</h3>
                    <p className="mt-4 leading-relaxed text-ink-muted">{it.body}</p>
                    {it.bullets && (
                      <ul className="mt-5 space-y-2.5">
                        {it.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-3 text-ink-muted">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald-deep">
                              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
                <Reveal direction={flip ? "right" : "left"} className={flip ? "lg:order-1" : ""}>
                  <GradientTile variant={it.tint ?? tints[i % tints.length]} className="aspect-[4/3]">
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/70 bg-white/85 text-brand-600 shadow-lift backdrop-blur">
                      <Icon name={it.icon} size={44} />
                    </div>
                  </GradientTile>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Grid({ block }: { block: Extract<Block, { kind: "grid" }> }) {
  const cols = block.cols ?? 3;
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        {(block.eyebrow || block.title) && (
          <SectionHeading eyebrow={block.eyebrow} title={block.title ?? ""} description={block.description} />
        )}
        <RevealGroup className={`mt-12 grid gap-5 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`} stagger={0.05}>
          {block.items.map((it) => (
            <RevealItem key={it.title}>
              <div className="card h-full p-6">
                {it.icon && (
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={it.icon} size={22} />
                  </div>
                )}
                <h3 className="text-base font-bold leading-snug text-ink">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{it.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Callout({ block }: { block: Extract<Block, { kind: "callout" }> }) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <div className="card relative mx-auto max-w-3xl overflow-hidden p-8 text-center md:p-12">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-100/70 blur-3xl" />
            {block.eyebrow && <span className="eyebrow justify-center">{block.eyebrow}</span>}
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{block.title}</h2>
            <div className="mt-5 leading-relaxed text-ink-muted">{block.body}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Bridge({ block }: { block: Extract<Block, { kind: "bridge" }> }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="container-x relative">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} align="center" />
        <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {block.links.map((l) => (
            <RevealItem key={l.href}>
              <a href={l.href} className="card group flex h-full items-center justify-between gap-4 p-6 transition-shadow hover:shadow-lift">
                <span>
                  <span className="font-bold text-ink">{l.label}</span>
                  {l.body && <span className="mt-1 block text-sm text-ink-muted">{l.body}</span>}
                </span>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0 text-brand-600 transition-transform group-hover:translate-x-1"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function QA({ block }: { block: Extract<Block, { kind: "qa" }> }) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={block.eyebrow} title={block.title ?? ""} align="center" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-navy/[0.08]">
          {block.items.map((it) => (
            <div key={it.q} className="py-6">
              <h3 className="text-lg font-semibold text-ink">{it.q}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "rows":
            return <Rows key={i} block={b} />;
          case "grid":
            return <Grid key={i} block={b} />;
          case "callout":
            return <Callout key={i} block={b} />;
          case "bridge":
            return <Bridge key={i} block={b} />;
          case "qa":
            return <QA key={i} block={b} />;
        }
      })}
    </>
  );
}
