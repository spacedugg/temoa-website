"use client";

import { motion } from "framer-motion";

/**
 * Placeholder-Wordmark für TEMOA.
 * Später einfach durch das echte Logo (SVG/PNG) ersetzbar.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="flex items-center gap-2.5">
        <motion.span
          className="relative flex h-8 w-8 items-center justify-center rounded-xl"
          style={{ backgroundImage: "var(--brand-gradient)", backgroundSize: "200% 200%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 11.5L6 6.5L9 9.5L14 3.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/40" />
        </motion.span>
        <span className="text-[1.35rem] font-bold tracking-tight text-ink">
          TEMOA
        </span>
      </span>
    </span>
  );
}
