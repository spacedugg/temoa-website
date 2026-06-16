"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Logo } from "./Logo";
import { services } from "@/lib/copy";
import clsx from "clsx";

const links: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  {
    label: "Full Service",
    href: "/full-service",
    children: [{ label: "Full Service 360°", href: "/full-service" }, ...services.map((s) => ({ label: s.label, href: s.href }))],
  },
  { label: "Ergebnisse", href: "/ergebnisse" },
  { label: "Designbeispiele", href: "/design-beispiele" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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
          scrolled ? "glass shadow-lift" : "border border-transparent bg-white/0"
        )}
      >
        <a href="/#top" className="flex items-center gap-2 pl-1">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || (l.children && pathname.startsWith("/leistungen"));
            if (l.children) {
              return (
                <div key={l.href} className="group relative">
                  <a
                    href={l.href}
                    className={clsx(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active ? "bg-black/[0.05] text-ink" : "text-ink-muted hover:bg-black/[0.04] hover:text-ink"
                    )}
                  >
                    {l.label}
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="mt-0.5 transition-transform group-hover:rotate-180"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                  {/* dropdown */}
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="glass w-72 rounded-2xl p-2 shadow-lift">
                      {l.children.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          className={clsx(
                            "block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                            pathname === c.href ? "bg-brand-50 text-brand-700" : "text-ink-muted hover:bg-black/[0.04] hover:text-ink"
                          )}
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <a
                key={l.href}
                href={l.href}
                className={clsx(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  pathname === l.href ? "bg-black/[0.05] text-ink" : "text-ink-muted hover:bg-black/[0.04] hover:text-ink"
                )}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a href="/gespraech-vereinbaren" className="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
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
            className="glass absolute inset-x-4 top-20 max-h-[80vh] overflow-y-auto rounded-3xl p-4 shadow-lift md:hidden"
          >
            {links.map((l) => (
              <div key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-black/[0.04]"
                >
                  {l.label}
                </a>
                {l.children && (
                  <div className="mb-1 ml-3 border-l border-black/[0.08] pl-3">
                    {l.children.filter((c) => c.href !== l.href).map((c) => (
                      <a
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-black/[0.04] hover:text-ink"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="/gespraech-vereinbaren" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              Gespräch vereinbaren
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
