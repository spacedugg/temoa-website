import Image from "next/image";
import { Logo } from "./Logo";
import { services } from "@/lib/copy";

const cols = [
  {
    title: "Leistungen",
    links: [{ label: "Full Service", href: "/full-service" }, ...services.map((s) => ({ label: s.label, href: s.href }))],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Case Studies", href: "/ergebnisse" },
      { label: "Designbeispiele", href: "/design-beispiele" },
      { label: "Gespräch vereinbaren", href: "/gespraech-vereinbaren" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-black/[0.06] bg-canvas pt-16">
      <div className="container-x">
        <div className="grid gap-12 pb-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Full-Service Amazon-Agentur. Wir führen euren Account: Strategie, Content,
              Advertising und Betrieb – profitabel und nachvollziehbar.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {["60+ Marken", "21 Mio € Umsatz p. a.", "5+ Länder", "98 % Bindung"].map((b) => (
                <span key={b} className="rounded-full border border-navy/[0.10] bg-white px-3 py-1 font-medium text-ink-muted">
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-navy/[0.10] bg-white px-4 py-3 shadow-soft">
              <Image src="/amazon-spn.png" alt="Amazon Service Provider Network" width={120} height={40} className="h-9 w-auto object-contain" />
              <span className="text-xs font-medium text-ink-muted">Verifizierter<br />Amazon-Partner</span>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-ink">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-ink-muted transition-colors hover:text-brand-600">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/[0.06] py-7 text-sm text-ink-faint md:flex-row">
          <span>© {new Date().getFullYear()} TEMOA. Alle Rechte vorbehalten.</span>
          <div className="flex gap-6">
            <a href="/impressum" className="transition-colors hover:text-ink">Impressum</a>
            <a href="/datenschutz" className="transition-colors hover:text-ink">Datenschutz</a>
            <a href="mailto:tools@temoa.de" className="transition-colors hover:text-ink">tools@temoa.de</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
