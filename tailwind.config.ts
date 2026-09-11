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
          blue: "#0066cc",
          "blue-hover": "#0052b3",
          "blue-focus": "#0077ff",
          teal: "#0066cc",
          "teal-hover": "#0052b3",
          "teal-focus": "#0077ff",
          gold: "#f5ab19",
          "gold-hover": "#d9940d",
          navy: "#07192f",
          "navy-light": "#0f2e54",
          forest: "#07192f",
          "forest-light": "#0f2e54",
          "ice-blue": "#eef6ff",
          mint: "#eef6ff",
          ice: "#f4f8fd",
          sky: "#f4f8fd",
          ink: "#0b2341",
          muted: "#4a6785",
          border: "#cce0f5",
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


