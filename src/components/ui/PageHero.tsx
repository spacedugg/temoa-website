import { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Pille } from "./SectionHeading";

export function PageHero({
  eyebrow,
  title,
  description,
  chips,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  chips?: string[];
  children?: ReactNode;
}) {
  return (
    /* `pt-36` sind 144 Pixel. Abzueglich der Kopfzeile bleibt davon zwar
       weniger, auf dem Telefon ist es trotzdem ein Sechstel Bildschirm, bevor
       das erste Wort kommt. */
    <section className="ground relative overflow-hidden pb-8 pt-28 sm:pb-10 sm:pt-36 md:pt-44">
      <span aria-hidden className="halo left-1/2 top-16 h-64 w-[30rem] -translate-x-1/2 opacity-60" />
      <span aria-hidden className="halo-cool halo left-[14%] top-40 h-56 w-[22rem] opacity-70" />
      <div className="container-x relative text-center">
        <Reveal>
          <Pille>{eyebrow}</Pille>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[1.95rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl sm:leading-[1.05] lg:text-[3.25rem]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:mt-5 sm:text-lg">{description}</p>
          </Reveal>
        )}
        {chips && chips.length > 0 && (
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {chips.map((c) => (
                <span key={c} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink-muted shadow-soft ring-1 ring-navy/[0.07]">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        )}
        {children && <div className="mt-9 sm:mt-12">{children}</div>}
      </div>
    </section>
  );
}
