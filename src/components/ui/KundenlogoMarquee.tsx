"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { kundenlogoZeilen, logoAusschnitte, type LogoDatei } from "@/lib/marken";

// Distances are measured in logo slots so longer rows do not cancel out speed differences.
const bewegung = [
  { sekundenProLogo: 7.5, startversatz: 0.08 },
  { sekundenProLogo: 11.5, startversatz: 0.35 },
  { sekundenProLogo: 9, startversatz: 0.63 },
];
const maske = "linear-gradient(to right, transparent, #000 16px, #000 calc(100% - 16px), transparent)";

// A loop is at least one viewport and one logo wide, so two copies never overlap in view.
const kuerzesteZeile = Math.min(...kundenlogoZeilen.map((zeile) => zeile.length));
const logoSchritt = `max(12rem, calc((100cqw + 16rem) / ${kuerzesteZeile}))`;

function KundenlogoBild({ datei, alt, className }: { datei: LogoDatei; alt: string; className: string }) {
  const [bildBreite, bildHoehe, links, oben, breite, hoehe] = logoAusschnitte[datei];
  const format = breite / hoehe;
  // Similar visible area, capped so narrow badges and wide wordmarks keep their proportions.
  const sichtbareBreite = Math.min(144, 62 * format, Math.sqrt(4200 * format));
  const prozent = (wert: number, ausschnitt: number) => `${(100 * wert) / ausschnitt}%`;

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
      style={{ width: `${sichtbareBreite}px`, aspectRatio: format }}
    >
      <Image
        src={datei}
        alt={alt}
        width={bildBreite}
        height={bildHoehe}
        sizes={`${Math.ceil(sichtbareBreite * bildBreite / breite)}px`}
        className={clsx("absolute max-w-none transition duration-300", className)}
        style={{
          left: prozent(-links, breite),
          top: prozent(-oben, hoehe),
          width: prozent(bildBreite, breite),
          height: prozent(bildHoehe, hoehe),
        }}
      />
    </div>
  );
}

export function KundenlogoMarquee({ logoAlt, dunkel = false }: { logoAlt: string; dunkel?: boolean }) {
  const band = useRef<HTMLDivElement>(null);
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const element = band.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      setSichtbar(true);
      return;
    }
    const observer = new IntersectionObserver(([eintrag]) => {
      if (eintrag.isIntersecting) {
        setSichtbar(true);
        observer.disconnect();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={band} className="space-y-[22px]" data-kundenlogos>
      {kundenlogoZeilen.map((zeile, index) => (
        <div
          key={zeile[0].marke}
          className="overflow-hidden [container-type:inline-size]"
          style={{ maskImage: maske, WebkitMaskImage: maske }}
        >
          <div
            className="flex w-max animate-marquee items-center motion-reduce:w-full"
            style={{
              animationDuration: `${zeile.length * bewegung[index].sekundenProLogo}s`,
              animationDelay: `-${(bewegung[index].sekundenProLogo * bewegung[index].startversatz).toFixed(2)}s`,
              animationDirection: "reverse",
              animationPlayState: sichtbar ? "running" : "paused",
            }}
          >
            {[false, true].map((kopie) => (
              <div
                key={String(kopie)}
                aria-hidden={kopie || undefined}
                className={clsx(
                  "flex shrink-0 items-center",
                  kopie ? "motion-reduce:hidden" : "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
                )}
              >
                {zeile.map((logo) => (
                  <div
                    key={logo.marke}
                    style={{ width: logoSchritt }}
                    className="flex h-[4.5rem] shrink-0 items-center justify-center motion-reduce:!w-[9rem] md:h-20 md:motion-reduce:!w-[13rem]"
                  >
                    <div
                      className={clsx(
                        "group/logo relative h-full w-36 max-w-full transition duration-300 hover:opacity-100",
                        dunkel ? "opacity-70" : "opacity-60"
                      )}
                    >
                      <KundenlogoBild
                        datei={logo.datei}
                        alt={kopie ? "" : logoAlt.replace("{marke}", logo.marke)}
                        className={clsx(
                          "group-hover/logo:opacity-100 group-hover/logo:filter-none",
                          dunkel
                            ? logo.weiss ? "opacity-0" : logo.graustufenAufDunkel ? "grayscale invert" : "brightness-0 invert"
                            : "grayscale"
                        )}
                      />
                      {dunkel && logo.weiss && (
                        <KundenlogoBild
                          datei={logo.weiss}
                          alt=""
                          className="group-hover/logo:opacity-0"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
