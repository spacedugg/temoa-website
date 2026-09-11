"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ConsentGate } from "../consent/ConsentGate";
import { pfad, spracheAusPfad } from "@/lib/i18n";
import type { Woerterbuch } from "@/lib/woerter";

/* Cal.com inline embed. Set the real booking link in CAL_LINK (e.g.
   "temoa/potenzialanalyse"); until then a styled scheduler placeholder
   is shown so the page is complete and on-brand. */
const CAL_LINK = "temoa-clemens/temoa-strategiegesprach";

/**
 * Der Kalender, hinter der Einwilligung.
 *
 * `ConsentGate` rendert sein Kind erst, wenn die Kategorie „Externe Dienste"
 * zugelassen ist. Weil der Ladecode in `CalInline` steckt und nicht hier,
 * laeuft er dann auch wirklich erst danach: kein Skript von app.cal.com, keine
 * Verbindung, kein Cookie, solange nicht zugestimmt wurde.
 *
 * Wer nicht zustimmen will, bekommt den Weg direkt zum Anbieter. Ein
 * Einwilligungsbanner, das ohne Zustimmung keinen Weg zum Termin laesst, waere
 * eine Kopplung.
 */
export function CalEmbed({ w }: { w: Woerterbuch["buchung"]["cal"] }) {
  if (!CAL_LINK) return <SchedulerPlaceholder w={w} />;
  return (
    <ConsentGate
      kategorie="extern"
      titel={w.sperreTitel}
      grund={w.sperreGrund}
      ausweichLabel={w.direkt}
      ausweichHref={`https://cal.com/${CAL_LINK}`}
    >
      <CalInline w={w} />
    </ConsentGate>
  );
}

function CalInline({ w }: { w: Woerterbuch["buchung"]["cal"] }) {
  useEffect(() => {
    if (!CAL_LINK) return;
    // Official Cal.com embed loader.
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: any[]) {
          const cal = C.Cal;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function (...a: any[]) {
              p(api, a);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    // @ts-expect-error injected global
    window.Cal("init", { origin: "https://cal.com" });
    // @ts-expect-error injected global
    window.Cal("inline", {
      elementOrSelector: "#cal-inline",
      calLink: CAL_LINK,
      config: { layout: "month_view" },
    });
    /* Helles Thema fest gesetzt. Ohne das folgt Cal der Systemeinstellung des
       Besuchers. Wer sein Gerät auf dunkel stellt, bekommt dann mitten in einer
       hellen Seite einen schwarzen Kalender. `month_view` stellt Termin, Monat
       und Uhrzeiten nebeneinander, sobald die Breite reicht. */
    // @ts-expect-error injected global
    window.Cal("ui", { theme: "light", layout: "month_view" });
  }, []);

  return (
    <div>
        {/* Keine feste Hoehe: der Cal-Rahmen waechst mit der Terminauswahl,
            vorher war er bei 540 px abgeschnitten. `min-h` ist nur der Boden,
            solange geladen wird. Auf dem Rechner ist er niedriger als auf dem
            Telefon: dort stehen Monat und Uhrzeiten untereinander.

            Der Schatten liegt am Rahmen selbst statt an einer Platte darum.
            `overflow-hidden` rundet die Ecken des Eingebetteten, das sonst
            eckig aus der Rundung steht. */}
        <div
          className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-black/[0.07]"
          style={{ boxShadow: "0 2px 6px rgba(2,48,71,0.06), 0 40px 80px -44px rgba(2,48,71,0.45)" }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-32 grid place-items-center text-sm text-ink-faint">
            {w.laedt}
          </div>
          <div id="cal-inline" className="relative min-h-[40rem] w-full md:min-h-[33rem]" />
        </div>
        <p className="mt-4 text-center text-sm text-ink-faint">
          Kalender lädt nicht?{" "}
          <a
            href={`https://cal.com/${CAL_LINK}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-navy underline decoration-brand-500 decoration-2 underline-offset-2"
          >
            {w.direkt}
          </a>
        </p>
      </div>
  );
}

const slots = ["09:00", "10:30", "13:00", "14:30", "16:00"];

function SchedulerPlaceholder({ w }: { w: Woerterbuch["buchung"]["cal"] }) {
  const sprache = spracheAusPfad(usePathname());
  return (
    <div className="surface grid gap-6 p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
      {/* mini month */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-ink">{w.dieseWoche}</span>
          <div className="flex gap-1 text-ink-faint">
            <span className="grid h-7 w-7 place-items-center rounded-lg ring-1 ring-black/[0.06]">‹</span>
            <span className="grid h-7 w-7 place-items-center rounded-lg ring-1 ring-black/[0.06]">›</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {w.tage.map((d, i) => (
            <div key={d} className="text-center">
              <div className="text-xs font-semibold text-ink-faint">{d}</div>
              <div
                className={`mt-1.5 grid h-11 place-items-center rounded-xl text-sm font-bold ring-1 ${
                  i === 2 ? "bg-brand-500/10 text-ink ring-brand-200" : "text-ink ring-black/[0.06]"
                }`}
              >
                {12 + i}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-faint">
          {w.attrappe}
        </p>
      </div>

      {/* slots */}
      <div className="flex flex-col">
        <span className="text-sm font-bold text-ink">{w.freieZeiten}</span>
        <div className="mt-4 grid gap-2.5">
          {slots.map((s, i) => (
            <div
              key={s}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ring-1 transition ${
                i === 1 ? "bg-brand-500/10 text-ink ring-brand-200" : "text-ink-muted ring-black/[0.07]"
              }`}
            >
              {s}
              <span className="text-xs font-medium text-ink-faint">{w.dauer}</span>
            </div>
          ))}
        </div>
        <a href={`${pfad(sprache, "/gespraech-vereinbaren")}#kalender`} className="btn-primary mt-5 w-full">
          {w.knopf}
        </a>
      </div>
    </div>
  );
}
