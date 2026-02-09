import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63"
        },
        cta: {
          500: "#059669",
          600: "#047857"
        }
      },
      fontFamily: {
        heading: ["Lexend", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Source Sans 3", "ui-sans-serif", "system-ui", "sans-serif"],
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
        crisp: "0 1px 0 rgba(2, 132, 199, 0.10), 0 8px 30px rgba(2, 132, 199, 0.08)"
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
