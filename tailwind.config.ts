import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00d992",
          soft: "#2fd6a1",
          deep: "#10b981",
        },
        canvas: {
          DEFAULT: "#101010",
          soft: "#1a1a1a",
          text: "#f5f6f7",
        },
        ink: {
          DEFAULT: "#f2f2f2",
          strong: "#ffffff",
        },
        body: "#bdbdbd",
        mute: "#8b949e",
        hairline: {
          DEFAULT: "#3d3a39",
          soft: "#b8b3b0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

