"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { kundenlogoZeilen } from "@/lib/marken";

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
                        "group/logo relative max-w-full transition duration-300 hover:opacity-100",
                        logo.gross ? "h-[4.5rem] w-56 md:h-20 md:w-64" : "h-9 w-28 md:h-10 md:w-32",
                        dunkel ? "opacity-70" : "opacity-60"
                      )}
                    >
                      <Image
                        src={logo.datei}
                        alt={kopie ? "" : logoAlt.replace("{marke}", logo.marke)}
                        fill
                        sizes={logo.gross ? "(min-width: 768px) 256px, 224px" : "128px"}
                        className={clsx(
                          "object-contain transition duration-300 group-hover/logo:opacity-100 group-hover/logo:filter-none",
                          dunkel
                            ? logo.weiss ? "opacity-0" : logo.graustufenAufDunkel ? "grayscale invert" : "brightness-0 invert"
                            : "grayscale"
                        )}
                      />
                      {dunkel && logo.weiss && (
                        <Image
                          src={logo.weiss}
                          alt=""
                          fill
                          sizes={logo.gross ? "(min-width: 768px) 256px, 224px" : "128px"}
                          className="object-contain transition duration-300 group-hover/logo:opacity-0"
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
