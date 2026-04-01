/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF6F6",
        ink: "#0a0f1a",
        accent: {
          DEFAULT: "#2563eb",
          cyan: "#06b6d4",
          soft: "#7dd3fc",
        },
      },
      fontFamily: {
        sans: ["League Spartan", "system-ui", "sans-serif"],
        display: ["Boldonse", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-mesh":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(6, 182, 212, 0.12), transparent)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(37, 99, 235, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        glow: "0 0 40px rgba(37, 99, 235, 0.35), 0 0 80px rgba(6, 182, 212, 0.15)",
      },
      animation: {
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.92", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};
