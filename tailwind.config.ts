import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A1E2B",
          soft: "#13344A",
          muted: "#56697A",
          faint: "#8AA0AE",
        },
        canvas: {
          DEFAULT: "#FCFBF9",
          alt: "#F4F2EC",
          card: "#FFFFFF",
        },
        // Primary = Amazon-orange brand scale
        brand: {
          50: "#FFF6E8",
          100: "#FFEAC9",
          200: "#FFD699",
          300: "#FFC266",
          400: "#FFB033",
          500: "#FF9900",
          600: "#F08400",
          700: "#C96D00",
          800: "#9E5600",
          900: "#7A4400",
        },
        // Red accent (kept under "violet" token so existing classNames recolor cleanly)
        violet: { DEFAULT: "#FF3131", soft: "#FF6B5E" },
        red: { DEFAULT: "#FF3131", soft: "#FF5C4D", deep: "#E11414" },
        // Navy contrast
        navy: { DEFAULT: "#023047", soft: "#0B4D6B", deep: "#021C2B" },
        // Sky / light blue (kept under "cyan" token)
        cyan: { DEFAULT: "#2A9BD8", soft: "#CDE6F4" },
        // "Positive/result" accent — teal-blue derived from the brand blues
        emerald: { DEFAULT: "#0E7CA0", soft: "#34A7C9", deep: "#023047" },
        amber: { DEFAULT: "#FF9900" },
      },
      fontFamily: {
        sans: ["var(--font-caros)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(2,48,71,0.06), 0 12px 32px -8px rgba(2,48,71,0.10)",
        lift: "0 8px 24px -6px rgba(2,48,71,0.12), 0 24px 64px -16px rgba(2,48,71,0.18)",
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
    },
  },
  plugins: [],
};

export default config;
