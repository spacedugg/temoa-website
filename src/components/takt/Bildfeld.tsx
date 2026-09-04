"use client";

import clsx from "clsx";

/**
 * Bildfeld.
 *
 * Die Seite ist für Bilder gebaut, nicht um Bilder herum. Jedes Feld hat ein
 * festes Seitenverhältnis und einen Platz in der Komposition. Solange kein
 * Bild hinterlegt ist, steht dort eine ruhige Fläche mit der Bildnummer, damit
 * die Proportion sichtbar bleibt und das spätere Bild ohne Umbau einzieht.
 *
 * `src` setzen, sobald die Datei unter /public/bilder liegt. Sonst ändert sich
 * am Layout nichts.
 */
export function Bildfeld({
  id,
  aspect = "aspect-[4/3]",
  src,
  alt = "",
  tone = "paper",
  className,
  priority,
}: {
  /** Kennung aus dem Bildbriefing, z. B. „B-01". */
  id: string;
  aspect?: string;
  src?: string;
  alt?: string;
  tone?: "paper" | "tint" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const board = tone === "dark";
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden",
        aspect,
        board ? "bg-white/[0.05]" : "bg-ink/[0.045]",
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? undefined : "lazy"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          {/* reservierte Bildfläche: als Fläche erkennbar, ohne sich wichtig zu machen */}
          <span
            aria-hidden
            className={clsx(
              "absolute inset-0",
              board ? "ring-1 ring-inset ring-white/[0.07]" : "ring-1 ring-inset ring-ink/[0.07]"
            )}
          />
          <span
            aria-hidden
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage: board
                ? "repeating-linear-gradient(135deg, rgba(255,255,255,0.028) 0 1px, transparent 1px 14px)"
                : "repeating-linear-gradient(135deg, rgba(10,30,43,0.04) 0 1px, transparent 1px 14px)",
            }}
          />
          <span
            className={clsx(
              "absolute bottom-3 left-3 text-[0.65rem] font-bold uppercase tracking-[0.14em]",
              board ? "text-chalk-faint" : "text-ink-line"
            )}
          >
            {id}
          </span>
        </>
      )}
    </div>
  );
}
