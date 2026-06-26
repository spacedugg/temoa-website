import { Logo } from "./Logo";

const cols = [
  {
    title: "Leistungen",
    links: [
      { label: "Strategie & Analyse", href: "/leistungen/strategie" },
      { label: "Content & Listings", href: "/leistungen/listing-seo" },
      { label: "Advertising / PPC", href: "/leistungen/ppc-advertising" },
      { label: "Account-Management", href: "/leistungen/account-management" },
      { label: "Internationalisierung", href: "/leistungen/internationalisierung" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Case Studies", href: "/ergebnisse" },
      { label: "Designbeispiele", href: "/design-beispiele" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-black/[0.06] bg-white pt-16">
      <div className="container-x">
        <div className="grid gap-12 pb-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Amazon Full Service Wachstumspartner. Erst ein Listing, das organisch
              verkauft, dann PPC, das vom ersten Euro an profitabel arbeitet.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {["Ø +30 % Profitabilität", "21 Mio. € Jahresumsatz", "60+ Marken", "5+ Marktplätze"].map((b) => (
                <span key={b} className="rounded-full border border-navy/[0.10] bg-white px-3 py-1 font-medium text-ink-muted">
                  {b}
                </span>
              ))}
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
          <span>© {new Date().getFullYear()} temoa</span>
          <div className="flex gap-6">
            <a href="/impressum" className="transition-colors hover:text-ink">Impressum</a>
            <a href="/datenschutz" className="transition-colors hover:text-ink">Datenschutz</a>
            <a href="mailto:kontakt@temoa.de" className="transition-colors hover:text-ink">kontakt@temoa.de</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
