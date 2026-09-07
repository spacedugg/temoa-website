"use client";

import type { ReactNode } from "react";
import { ALLES_AN, type KategorieId } from "@/lib/consent";
import { useEinwilligung } from "./useEinwilligung";

/**
 * Huelle um eine Einbettung von einem Drittanbieter.
 *
 * Solange die Kategorie nicht zugelassen ist, wird das Kind gar nicht
 * gerendert: kein Skript, keine Verbindung, kein Cookie. Statt dessen steht
 * dort eine Platte mit dem Grund, einem Knopf zum Zulassen und einem Weg zum
 * Anbieter, damit niemand ausgeschlossen ist, der nicht zustimmen will.
 *
 * Wichtig ist die Reihenfolge: erst laden, wenn erlaubt. Ein Banner, das nur
 * fragt und die Einbettung ohnehin laedt, ist kein Einwilligungsbanner.
 */
export function ConsentGate({
  kategorie,
  titel,
  grund,
  ausweichLabel,
  ausweichHref,
  children,
}: {
  kategorie: KategorieId;
  titel: string;
  grund: string;
  /** Der Weg zum Anbieter, wenn nicht zugestimmt wird. */
  ausweichLabel?: string;
  ausweichHref?: string;
  children: ReactNode;
}) {
  const { bereit, erlaubt, speichern, daten } = useEinwilligung();

  /* Vor dem ersten Rendern im Browser wissen wir nichts. Dann lieber die
     Platte zeigen als kurz die Einbettung: geladen ist geladen. */
  if (bereit && erlaubt(kategorie)) return <>{children}</>;

  return (
    <div className="panel flex min-h-[22rem] flex-col items-center justify-center gap-4 p-8 text-center">
      <span aria-hidden className="grid h-12 w-12 place-items-center rounded-[0.9rem] bg-navy text-white">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 3.5h8M12 3.5v3M6.5 6.5h11a2 2 0 012 2v9a2 2 0 01-2 2h-11a2 2 0 01-2-2v-9a2 2 0 012-2z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M8.5 11h7M8.5 14.5h4" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <p className="text-[1.05rem] font-bold leading-snug text-ink">{titel}</p>
      <p className="max-w-[42ch] text-small leading-relaxed text-ink-muted">{grund}</p>
      <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => speichern({ ...(daten?.auswahl ?? ALLES_AN), [kategorie]: true, notwendig: true })}
          className="inline-flex min-h-[3rem] items-center justify-center rounded-[0.875rem] bg-navy px-6 text-small font-bold text-white transition-colors duration-300 hover:bg-[#123553]"
        >
          Einmal zulassen und laden
        </button>
        {ausweichHref && (
          <a
            href={ausweichHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-small font-bold text-navy underline decoration-brand-500 decoration-2 underline-offset-4"
          >
            {ausweichLabel ?? "Beim Anbieter öffnen"}
          </a>
        )}
      </div>
      <p className="text-[0.75rem] text-ink-faint">
        Was dabei übertragen wird, steht in der{" "}
        <a href="/datenschutz" className="underline decoration-ink/25 underline-offset-2">
          Datenschutzerklärung
        </a>
        .
      </p>
    </div>
  );
}
