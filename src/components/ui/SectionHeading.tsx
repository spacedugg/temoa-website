import { Reveal } from "./Reveal";
import clsx from "clsx";

/**
 * Sektionsbezeichnung als Pille mit Leuchtpunkt.
 *
 * Vorher war es eine nackte Zeile mit einem kleinen orangen Punkt davor. Auf
 * dem getoenten Grund des Themes verschwand sie. Die Pille sitzt sichtbar auf
 * der Flaeche und ist dieselbe Form wie auf der Startseite.
 */
export function Pille({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-soft shadow-soft ring-1 ring-navy/[0.06]",
        className
      )}
    >
      <span aria-hidden className="node-glow" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  size = "default",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  size?: "default" | "compact";
  className?: string;
}) {
  const compact = size === "compact";
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center"
          ? "mx-auto text-center"
          : "mx-auto text-center md:mx-0 md:text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Pille>{eyebrow}</Pille>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={clsx(
            "font-bold tracking-tight text-ink",
            compact
              ? "mt-3 text-2xl leading-tight sm:text-3xl"
              : "mt-4 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={clsx(
              "text-ink-muted",
              compact ? "mt-3 text-base leading-relaxed" : "mt-4 text-lg leading-relaxed"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
