"use client";

import { usePathname } from "next/navigation";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { spracheAusPfad } from "@/lib/i18n";

/* Die Schreibweise haengt an der Sprache: im Deutschen trennt der Punkt die
   Tausender, im Englischen das Komma. Wie bei `takt/Zahl` liest die
   Komponente sie selbst aus dem Pfad. Als Prop koennte ein Aufrufer sie
   vergessen, und dann stuende die falsche Zahl da, ohne dass es auffaellt. */
const LAND = { de: "de-DE", en: "en-US" } as const;

export function Counter({
  to,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration = 1.8,
}: {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const land = LAND[spracheAusPfad(usePathname())];
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(from);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        const formatted = v.toLocaleString(land, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
  }, [spring, decimals, prefix, suffix, land]);

  return (
    <motion.span ref={ref} className={className}>
      {`${prefix}${from.toLocaleString(land, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`}
    </motion.span>
  );
}
