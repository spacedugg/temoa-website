import { Logo } from "./Logo";

const cols = [
  {
    title: "Leistungen",
    links: ["Strategie", "Listing & SEO", "PPC Advertising", "Account Management", "Internationalisierung"],
  },
  {
    title: "Agentur",
    links: ["Full Service", "Ergebnisse", "Team", "Content Studio", "Blog"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-black/[0.06] bg-canvas pt-16">
      <div className="container-x">
        <div className="grid gap-12 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Full-Service Amazon-Agentur. Strategie, Content, Advertising und Betrieb –
              Organic First, profitabel skaliert.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {["60+ Marken", "21 Mio € Umsatz p. a.", "5+ Länder", "98 % Bindung"].map((b) => (
                <span key={b} className="rounded-full border border-black/[0.07] bg-white px-3 py-1 font-medium text-ink-muted">
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
                  <li key={l}>
                    <a href="#" className="text-sm text-ink-muted transition-colors hover:text-brand-600">
                      {l}
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
            <a href="#" className="transition-colors hover:text-ink">Impressum</a>
            <a href="#" className="transition-colors hover:text-ink">Datenschutz</a>
            <a href="mailto:tools@temoa.de" className="transition-colors hover:text-ink">tools@temoa.de</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
