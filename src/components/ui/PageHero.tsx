import { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  chips,
  cta,
  secondary,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  chips?: string[];
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-10 pt-36 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-50" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-[36rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.20), rgba(255,49,49,0.08) 50%, transparent 72%)" }}
      />
      <div className="container-x relative text-center">
        <Reveal>
          <span className="eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{description}</p>
          </Reveal>
        )}
        {(cta || secondary) && (
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {cta && (
                <a href={cta.href} className="btn-primary">
                  {cta.label}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              )}
              {secondary && (
                <a href={secondary.href} className="btn-ghost">
                  {secondary.label}
                </a>
              )}
            </div>
          </Reveal>
        )}
        {chips && chips.length > 0 && (
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {chips.map((c) => (
                <span key={c} className="rounded-full border border-navy/[0.1] bg-white px-3.5 py-1.5 text-sm font-medium text-ink-muted shadow-soft">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        )}
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
