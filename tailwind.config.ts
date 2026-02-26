import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sp-black": "var(--sp-black)",
        "sp-dark": "var(--sp-dark)",
        "sp-card": "var(--sp-card)",
        "sp-card-hover": "var(--sp-card-hover)",
        "sp-green": "var(--sp-green)",
        "sp-green-hover": "var(--sp-green-hover)",
        "sp-white": "var(--sp-white)",
        "sp-subdued": "var(--sp-subdued)",
        "sp-text": "var(--sp-text)",
      },
      width: {
        sidebar: "var(--sidebar-width)",
      },
      height: {
        player: "var(--player-height)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "eq-bar": {
          "0%, 100%": { height: "4px" },
          "50%": { height: "16px" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "eq-bar": "eq-bar 0.8s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
