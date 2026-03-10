import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF5FB",
          100: "#D9EAF7",
          200: "#B8D6EF",
          300: "#90BDE4",
          400: "#5E9FD6",
          500: "#377FBE",
          600: "#2B679B",
          700: "#254F78",
          800: "#243D5F",
          900: "#22314E"
        },
        cta: {
          500: "#39D95D",
          600: "#29BB48"
        }
      },
      fontFamily: {
        heading: ["Baloo 2", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ]
      },
      boxShadow: {
        crisp: "0 6px 0 #25314d"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 400ms ease-out both"
      }
    }
  },
  plugins: [typography]
} satisfies Config;
