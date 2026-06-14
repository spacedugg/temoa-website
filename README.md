# TEMOA — Website

Full-Service Amazon-Agentur. Premium Light-Mode Marketing-Site mit Tiefen-Effekten,
Glas/Blur-Flächen, animierten Charts und Motion (Framer Motion).

## Stack
- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 3** (Design-Tokens in `tailwind.config.ts`)
- **Framer Motion** (Scroll-Reveals, Counter, 3D-Tilt, Aurora-Glows)
- **Geist** Font (self-hosted, kein Font-Flackern)

## Lokal starten
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
```

## Struktur
```
src/
  app/            layout.tsx, page.tsx (Startseite), globals.css
  components/
    Navbar.tsx, Footer.tsx, Logo.tsx
    sections/     Hero, WhyTemoa, Results, OrganicFirst, TwoLevers,
                  FullService, ServicesDetail, ContentStudio, DataAI,
                  Process, Team, CTA, MobileStats
    ui/           Reveal, Counter, TiltCard, Aurora, MiniChart, Icon, SectionHeading
```

## Noch zu ersetzen (Platzhalter)
- **Logo** → `src/components/Logo.tsx` (aktuell animierte Wortmarke; echtes SVG/PNG einsetzen)
- **Team-Fotos** → `src/components/sections/Team.tsx` (aktuell Initialen-Avatare, „Foto folgt")
- **Brand-Farben** → zentral in `tailwind.config.ts` (`brand`, `violet`, `cyan`, `emerald`) und
  `--brand-gradient` in `globals.css`. Einmal ändern, wirkt überall.

## Aktueller Stand
Spektakuläre **Startseite** komplett umgesetzt (alle Copy-Inhalte). Die Unterseiten
(Full Service, Strategie, Listing/SEO, PPC, Account Management, Internationalisierung,
Cases, Team, Blog) folgen im selben Design-System.
