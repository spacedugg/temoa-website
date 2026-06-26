import { Reveal } from "./Reveal";
import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
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
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {eyebrow}
          </span>
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
