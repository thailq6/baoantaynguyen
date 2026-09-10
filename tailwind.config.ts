import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bic: {
          teal: "#006b66",
          "teal-hover": "#005450",
          "teal-focus": "#007a73",
          gold: "#f5ab19",
          "gold-hover": "#d9940d",
          forest: "#003835",
          "forest-light": "#084c47",
          mint: "#eaf5f2",
          ice: "#f4faf8",
          ink: "#103b3b",
          muted: "#577572",
          border: "#cce5e1",
        },
      },
      borderRadius: {
        pill: "9999px",
        card: "18px",
        capsule: "11px",
        utility: "8px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "SF Pro Text", "Segoe UI", "sans-serif"],
        display: ["Inter", "system-ui", "-apple-system", "SF Pro Display", "Segoe UI", "sans-serif"],
        mono: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"],
      },
      boxShadow: {
        product: "rgba(0, 56, 53, 0.15) 3px 5px 30px 0px",
        floating: "rgba(0, 56, 53, 0.08) 0px 8px 24px",
      },
    },
  },
  plugins: [],
};

export default config;


