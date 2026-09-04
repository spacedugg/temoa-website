import type { Config } from "tailwindcss";

/**
 * Design-Tokens temoa.
 *
 * Grundregeln (siehe DESIGN.md):
 *  - Genau ein Akzent: Orange. Rot ist nur das dunkle Ende derselben Familie.
 *  - Neutrale sind durchgehend kühl (Navy-getönt). Keine warmen Grautöne daneben.
 *  - Signalfarben (Ja/Nein) sind funktional, nie dekorativ.
 *  - Werte, die hinter weißem Text liegen, müssen 4,5:1 erreichen.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Neutrale, kühl getönt. Kontrast gegen Weiß in Klammern. */
        ink: {
          DEFAULT: "#0A1E2B", // 15.6:1
          soft: "#13344A", // 11.4:1
          muted: "#56697A", // 5.7:1
          faint: "#5F7484", // 4.9:1, war #8AA0AE mit 2.8:1
          line: "#8AA0AE", // nur für Linien und Icons, nie für Text
        },
        canvas: {
          DEFAULT: "#FFFFFF",
          tint: "#EDF5FB", // getönte Sektion, ersetzt 17 hartcodierte Vorkommen
          card: "#FFFFFF",
        },
        /* Akzent: Amazon-Orange. 500 ist die Markenfarbe, 700 die Textvariante. */
        brand: {
          50: "#FFF6E8",
          100: "#FFEAC9",
          200: "#FFD699",
          300: "#FFC266",
          400: "#FFB033",
          500: "#FF9900", // Flächen, immer mit dunklem Text
          600: "#F08400",
          700: "#C96D00", // Akzenttext auf Weiß, 3.7:1, nur ab 24px
          800: "#9E5600", // Akzenttext in Fließtextgröße, 5.4:1
          900: "#7A4400",
        },
        /* Dunkles Ende derselben Familie, kein zweiter Akzent. */
        ember: {
          DEFAULT: "#FF3131",
          deep: "#A32318", // trägt weißen Text, 7.5:1
        },
        /* Neutraldunkel für Panels und Footer. */
        navy: { DEFAULT: "#023047", soft: "#0B4D6B", deep: "#021C2B" },

        /* Welt „Taktplan": der Grund ist das Material, nicht Weiß mit Akzenten.
           Die Tafel trägt die Seite, Papier ist die zweite Materialschicht. */
        board: {
          DEFAULT: "#0B1A24", // Tafel
          deep: "#06111A",    // Vertiefung, Fußbereich
          raised: "#11242F",  // aufliegende Platte
          rule: "#1F3846",    // Hairline auf der Tafel
        },
        paper: {
          DEFAULT: "#FBFAF8", // Blatt
          rule: "#E3E0DA",    // Hairline auf Papier
        },
        /* Schrift auf der Tafel. Orange erreicht hier 7,9:1 und darf Text sein. */
        chalk: {
          DEFAULT: "#EEF4F7",
          muted: "#9FB4C0",
          faint: "#6E8695",
        },
        /* Funktionale Signalfarben, nur für Ja/Nein-Vergleiche. */
        signal: {
          pos: "#1B7F4B", // 4.6:1
          neg: "#C0281E", // 5.9:1
        },

        /* Legacy-Tokens. Nur noch in nicht ausgeliefertem Code (src/components/sections/*).
           Nicht mehr in neuen Komponenten verwenden. */
        violet: { DEFAULT: "#FF3131", soft: "#FF6B5E" },
        red: { DEFAULT: "#FF3131", soft: "#FF5C4D", deep: "#E11414" },
        cyan: { DEFAULT: "#2A9BD8", soft: "#CDE6F4" },
        emerald: { DEFAULT: "#0E7CA0", soft: "#34A7C9", deep: "#023047" },
        amber: { DEFAULT: "#FF9900" },
      },

      fontFamily: {
        sans: ["var(--font-caros)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },

      /* Typo-Skala. Caros liefert 200/300/400/700/800, kein 500/600.
         Hierarchie entsteht deshalb über Größe und Farbe, nicht über Zwischengewichte. */
      fontSize: {
        display: ["clamp(2.5rem, 1.4rem + 3.6vw, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.028em" }],
        h2: ["clamp(1.75rem, 1.15rem + 1.9vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h3: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        lead: ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.005em" }],
        body: ["1rem", { lineHeight: "1.65" }],
        small: ["0.875rem", { lineHeight: "1.55" }],
        label: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
      },

      /* Drei Radien plus Pille. Innen immer kleiner als außen (konzentrisch). */
      borderRadius: {
        inner: "1rem",
        card: "1.5rem",
        panel: "2rem",
        "4xl": "2rem", // Bestandsklassen
        "5xl": "2.5rem",
      },

      /* Schatten sind navy-getönt, nie neutrales Schwarz. */
      boxShadow: {
        soft: "0 2px 8px -2px rgba(2,48,71,0.06), 0 12px 32px -8px rgba(2,48,71,0.10)",
        lift: "0 8px 24px -6px rgba(2,48,71,0.12), 0 24px 64px -16px rgba(2,48,71,0.18)",
        panel: "0 40px 90px -45px rgba(2,48,71,0.55)",
        glow: "0 0 0 1px rgba(255,153,0,0.12), 0 20px 60px -20px rgba(255,153,0,0.5)",
        "glow-emerald": "0 0 0 1px rgba(14,124,160,0.12), 0 20px 60px -20px rgba(14,124,160,0.45)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.7)",
      },

      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 2s infinite",
      },

      transitionTimingFunction: {
        temoa: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
