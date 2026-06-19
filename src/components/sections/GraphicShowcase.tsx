"use client";

import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import type { ReactNode } from "react";

/* =====================================================================
   GraphicShowcase — präsentiert eine freigestellte Marken-Grafik
   (public/graphics) als zentrierte, gerahmte Showcase-Sektion.
   Nur auf der Homepage eingesetzt.
   ===================================================================== */

export function GraphicShowcase({
  src,
  alt,
  eyebrow,
  title,
  caption,
  tint = "brand",
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: ReactNode;
  caption?: string;
  tint?: "brand" | "emerald" | "navy";
}) {
  const glow =
    tint === "emerald"
      ? "from-emerald/15"
      : tint === "navy"
        ? "from-navy/10"
        : "from-brand-200/40";
  return (
    <section className="relative py-14 md:py-20">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} description={caption} align="center" />
        <Reveal>
          <div className="relative mx-auto mt-10 max-w-4xl">
            <div className={`pointer-events-none absolute -inset-x-8 -top-6 bottom-0 -z-10 rounded-[2.75rem] bg-gradient-to-b ${glow} to-transparent blur-2xl`} />
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
