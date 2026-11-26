"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { kundenlogoZeilen } from "@/lib/marken";

const laufzeiten = [58, 76, 68];
const maske = "linear-gradient(to right, transparent, #000 16px, #000 calc(100% - 16px), transparent)";

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
    <div ref={band} className="space-y-4" data-kundenlogos>
      {kundenlogoZeilen.map((zeile, index) => (
        <div
          key={zeile[0].marke}
          className="overflow-hidden"
          style={{ maskImage: maske, WebkitMaskImage: maske }}
        >
          <div
            className="flex w-max animate-marquee items-center motion-reduce:w-full"
            style={{ animationDuration: `${laufzeiten[index]}s`, animationDelay: "2s", animationPlayState: sichtbar ? "running" : "paused" }}
          >
            {[false, true].map((kopie) => (
              <div
                key={String(kopie)}
                aria-hidden={kopie || undefined}
                className={clsx(
                  "flex shrink-0 items-center gap-6 pl-6 md:gap-16 md:pl-12 md:pr-4",
                  kopie ? "motion-reduce:hidden" : "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6"
                )}
              >
                {zeile.map((logo) => (
                  <div
                    key={logo.marke}
                    className={clsx(
                      "relative h-9 w-28 shrink-0 transition duration-300 hover:opacity-100 md:h-10 md:w-32",
                      dunkel ? "opacity-70" : "opacity-60 grayscale hover:grayscale-0",
                      dunkel && !logo.weiss && (logo.graustufenAufDunkel ? "grayscale invert" : "brightness-0 invert")
                    )}
                  >
                    <Image
                      src={dunkel ? logo.weiss ?? logo.datei : logo.datei}
                      alt={kopie ? "" : logoAlt.replace("{marke}", logo.marke)}
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
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
