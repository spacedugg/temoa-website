"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LISTING_SETS } from "@/lib/showcase";

const set = LISTING_SETS[0];

const chips = [
  { label: "Hauptbild", pos: "left-[-3rem] top-6", color: "#FF9900" },
  { label: "A+ Modul", pos: "right-[-2.5rem] top-1/3", color: "#FF3131" },
  { label: "Infografik", pos: "left-[-2rem] bottom-16", color: "#0E7CA0" },
];

export function Listing3D() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), { stiffness: 120, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 });

  if (!set) return null;
  const [main, ...rest] = set.images;
  const thumbs = rest.slice(0, 4);

  return (
    <div
      className="perspective relative mx-auto max-w-2xl py-6"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,153,0,0.28), rgba(255,49,49,0.12) 45%, transparent 70%)" }} />

      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative">
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ transformStyle: "preserve-3d" }}>
          {/* main listing card */}
          <div className="relative mx-auto w-[64%] overflow-hidden rounded-3xl border border-navy/[0.08] bg-white p-3 shadow-lift" style={{ transform: "translateZ(60px)" }}>
            <div className="relative aspect-square w-full">
              <Image src={main} alt="Listing Hauptbild" fill sizes="(max-width:1024px) 60vw, 420px" className="object-contain" priority />
            </div>
          </div>

          {/* floating thumbs */}
          {thumbs.map((src, i) => {
            const layout = [
              "right-0 top-0 w-28",
              "left-0 top-10 w-24",
              "right-2 bottom-2 w-28",
              "left-4 bottom-16 w-24",
            ][i];
            return (
              <motion.div
                key={src}
                className={`absolute ${layout} overflow-hidden rounded-2xl border border-navy/[0.08] bg-white p-1.5 shadow-lift`}
                style={{ transform: `translateZ(${90 + i * 10}px)` }}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative aspect-square w-full">
                  <Image src={src} alt="" fill sizes="120px" className="object-contain" />
                </div>
              </motion.div>
            );
          })}

          {/* highlight chips */}
          {chips.map((c, i) => (
            <motion.span
              key={c.label}
              className={`absolute ${c.pos} inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-lift ring-1 ring-navy/[0.06]`}
              style={{ transform: "translateZ(120px)" }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
              {c.label}
            </motion.span>
          ))}

          {/* rating chip */}
          <motion.div
            className="absolute -bottom-2 right-1/4 inline-flex items-center gap-1.5 rounded-2xl bg-ink px-3 py-2 text-white shadow-lift"
            style={{ transform: "translateZ(130px)" }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill="#FF9900"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" /></svg>
              ))}
            </span>
            <span className="text-sm font-bold">4,7</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <p className="mt-6 text-center text-xs text-ink-faint">↺ Mit der Maus bewegen · 7 Bilder, ein konvertierendes Listing</p>
    </div>
  );
}
