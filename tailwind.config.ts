import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0D17",
          soft: "#1A1D2E",
          muted: "#5B6178",
          faint: "#8A90A6",
        },
        canvas: {
          DEFAULT: "#FBFBFE",
          alt: "#F4F4FB",
          card: "#FFFFFF",
        },
        brand: {
          50: "#EEF0FF",
          100: "#E0E3FF",
          200: "#C4C9FF",
          300: "#A0A6FF",
          400: "#7C7DFF",
          500: "#6258F7",
          600: "#4F3FE6",
          700: "#3F2FC4",
          800: "#33289E",
          900: "#2C277D",
        },
        violet: {
          DEFAULT: "#9747FF",
          soft: "#B57BFF",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          soft: "#67E8F9",
        },
        emerald: {
          DEFAULT: "#10B981",
          soft: "#34D399",
          deep: "#059669",
        },
        amber: {
          DEFAULT: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(11,13,23,0.06), 0 12px 32px -8px rgba(11,13,23,0.08)",
        lift: "0 8px 24px -6px rgba(11,13,23,0.10), 0 24px 64px -16px rgba(11,13,23,0.14)",
        glow: "0 0 0 1px rgba(98,88,247,0.10), 0 20px 60px -20px rgba(98,88,247,0.45)",
        "glow-emerald": "0 0 0 1px rgba(16,185,129,0.12), 0 20px 60px -20px rgba(16,185,129,0.45)",
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
