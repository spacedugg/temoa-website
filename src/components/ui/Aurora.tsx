"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

/** Soft, slowly drifting gradient glows for premium depth (brand: orange/red/navy). */
export function Aurora({ className }: { className?: string }) {
  return (
    <div className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <motion.div
        className="absolute -left-[10%] -top-[20%] h-[42rem] w-[42rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.42), transparent 60%)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 10, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[5%] h-[38rem] w-[38rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,49,49,0.34), transparent 60%)" }}
        animate={{ x: [0, -50, 20, 0], y: [0, 30, -20, 0], scale: [1, 0.92, 1.08, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[30%] h-[34rem] w-[34rem] rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(42,155,216,0.34), transparent 60%)" }}
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.12, 0.9, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
