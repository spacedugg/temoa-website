"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { kundenlogoZeilen } from "@/lib/marken";

const bewegung = [
  { animationDuration: "54s", animationDelay: "-0.9s" },
  { animationDuration: "68s", animationDelay: "-2.6s" },
  { animationDuration: "61s", animationDelay: "-4.7s" },
];
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
    <div ref={band} className="space-y-6" data-kundenlogos>
      {kundenlogoZeilen.map((zeile, index) => (
        <div
          key={zeile[0].marke}
          className="overflow-hidden [container-type:inline-size]"
          style={{ maskImage: maske, WebkitMaskImage: maske }}
        >
          <div
            className="flex w-max animate-marquee items-center motion-reduce:w-full"
            style={{ ...bewegung[index], animationDirection: "reverse", animationPlayState: sichtbar ? "running" : "paused" }}
          >
            {[false, true].map((kopie) => (
              <div
                key={String(kopie)}
                aria-hidden={kopie || undefined}
                className={clsx(
                  "flex min-w-[calc(100cqw_+_16rem)] shrink-0 items-center justify-between gap-3 pl-4 pr-3 md:gap-12 md:pl-8 md:pr-4",
                  kopie ? "motion-reduce:hidden" : "motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6"
                )}
              >
                {zeile.map((logo) => (
                  <div
                    key={logo.marke}
                    className={clsx(
                      "group/logo relative shrink-0 rounded-sm transition duration-300 hover:opacity-100",
                      logo.gross ? "h-[4.5rem] w-56 md:h-20 md:w-64" : "h-9 w-28 md:h-10 md:w-32",
                      dunkel ? "opacity-70 hover:bg-white/95" : "opacity-60"
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
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
