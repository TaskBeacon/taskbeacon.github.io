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
          600: "#0EA5E9",
          700: "#0284C7",
          800: "#0F4C81",
          900: "#123B63"
        },
        cta: {
          500: "#F59E0B",
          600: "#D97706"
        }
      },
      fontFamily: {
        heading: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
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
        crisp: "0 8px 30px rgba(14, 165, 233, 0.12), 0 18px 46px rgba(245, 158, 11, 0.10)"
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
