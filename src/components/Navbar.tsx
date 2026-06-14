"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Logo } from "./Logo";
import clsx from "clsx";

const links = [
  { label: "Full Service", href: "#full-service" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Ergebnisse", href: "#ergebnisse" },
  { label: "Prozess", href: "#prozess" },
  { label: "Team", href: "#team" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={clsx(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-5",
          scrolled
            ? "glass shadow-lift"
            : "border border-transparent bg-white/0"
        )}
      >
        <a href="#top" className="flex items-center gap-2 pl-1">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-black/[0.04] hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#kontakt" className="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
            Gespräch vereinbaren
          </a>
          <button
            aria-label="Menü"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 md:hidden"
          >
            <div className="space-y-1.5">
              <span className={clsx("block h-0.5 w-5 bg-ink transition-transform", open && "translate-y-2 rotate-45")} />
              <span className={clsx("block h-0.5 w-5 bg-ink transition-opacity", open && "opacity-0")} />
              <span className={clsx("block h-0.5 w-5 bg-ink transition-transform", open && "-translate-y-2 -rotate-45")} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute inset-x-4 top-20 rounded-3xl p-4 shadow-lift md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-black/[0.04]"
              >
                {l.label}
              </a>
            ))}
            <a href="#kontakt" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              Gespräch vereinbaren
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
