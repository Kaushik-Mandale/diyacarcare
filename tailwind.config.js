/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#1a7a3f",
          light: "#22a852",
          dark: "#146030",
        },
        surface: {
          DEFAULT: "#f8f7f4",
          secondary: "#f0eeea",
          card: "#ffffff",
        },
        charcoal: {
          DEFAULT: "#1a1a1a",
          soft: "#2d2d2d",
        },
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        premium: "0 24px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
        accent: "0 8px 24px rgba(26, 122, 63, 0.3)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 7s ease-in-out infinite 1s",
        "slide-up": "slide-in-up 0.5s ease forwards",
        "pulse-glow": "pulse-glow 2s infinite",
      },
    },
  },
  plugins: [],
};
