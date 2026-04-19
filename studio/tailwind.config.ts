import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        xebia: {
          "blue-dark": "#150027",
          "velvet-dark": "#500051",
          velvet: "#831b84",
          "velvet-subtle": "#9c499d",
          "velvet-light": "#e331d0",
          "velvet-light-subtle": "#ee83e3",
          violet: "#a295db",
          surface: "#0e0020",
          "surface-2": "#1a0028",
          "surface-3": "#2c1a3d",
          "surface-4": "#443352",
          muted: "#73667d",
          "muted-2": "#a199a9",
        },
      },
    },
  },
  plugins: [],
};

export default config;
