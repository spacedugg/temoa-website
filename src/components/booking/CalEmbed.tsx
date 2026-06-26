"use client";

import { useEffect } from "react";

/* Cal.com inline embed. Set the real booking link in CAL_LINK (e.g.
   "temoa/potenzialanalyse"); until then a styled scheduler placeholder
   is shown so the page is complete and on-brand. */
const CAL_LINK = ""; // <- echten Cal.com-Link hier eintragen, z. B. "temoa/potenzialanalyse"

export function CalEmbed() {
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
    window.Cal("inline", { elementOrSelector: "#cal-inline", calLink: CAL_LINK });
  }, []);

  if (CAL_LINK) {
    return <div id="cal-inline" className="min-h-[620px] w-full overflow-hidden rounded-3xl" />;
  }

  return <SchedulerPlaceholder />;
}

const days = ["Mo", "Di", "Mi", "Do", "Fr"];
const slots = ["09:00", "10:30", "13:00", "14:30", "16:00"];

function SchedulerPlaceholder() {
  return (
    <div className="surface grid gap-6 p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
      {/* mini month */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Diese Woche</span>
          <div className="flex gap-1 text-ink-faint">
            <span className="grid h-7 w-7 place-items-center rounded-lg ring-1 ring-black/[0.06]">‹</span>
            <span className="grid h-7 w-7 place-items-center rounded-lg ring-1 ring-black/[0.06]">›</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {days.map((d, i) => (
            <div key={d} className="text-center">
              <div className="text-xs font-semibold text-ink-faint">{d}</div>
              <div
                className={`mt-1.5 grid h-11 place-items-center rounded-xl text-sm font-bold ring-1 ${
                  i === 2 ? "bg-brand-500/10 text-brand-600 ring-brand-200" : "text-ink ring-black/[0.06]"
                }`}
              >
                {12 + i}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-faint">
          Beispielansicht. Die Online-Buchung läuft über Cal.com.
        </p>
      </div>

      {/* slots */}
      <div className="flex flex-col">
        <span className="text-sm font-bold text-ink">Freie Zeiten</span>
        <div className="mt-4 grid gap-2.5">
          {slots.map((s, i) => (
            <div
              key={s}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ring-1 transition ${
                i === 1 ? "bg-brand-500/10 text-brand-700 ring-brand-200" : "text-ink-muted ring-black/[0.07]"
              }`}
            >
              {s}
              <span className="text-xs font-medium text-ink-faint">30 Min.</span>
            </div>
          ))}
        </div>
        <a href="/gespraech-vereinbaren#kalender" className="btn-primary mt-5 w-full">
          Potenzialanalyse buchen
        </a>
      </div>
    </div>
  );
}
