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
    },
  },
  plugins: [],
};

export default config;
