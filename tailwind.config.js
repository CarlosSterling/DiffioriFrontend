import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      /* —— Tipografías base —— */
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },

      /* —— Colores corporativos —— */
      colors: {
        /* Rojo principal (botones, enlaces, focos) */
        primary: {
          DEFAULT: "#8B3D30",
          50:  "#fbf4f2",
          100: "#f4e3df",
          200: "#e8c6bf",
          300: "#dba49a",
          400: "#cf8476",
          500: "#8B3D30",
          600: "#7b362a",
          700: "#6a2e24",
          800: "#5a271f",
          900: "#4a201a",
        },
        /* Naranja de acento para destacar precios u ofertas */
        accent: {
          DEFAULT: "#ff9800",
          600:    "#fb8c00",
          700:    "#ef6c00",
        },
        gold: {
          DEFAULT: "#C5A059", // Dorado elegante
          500: "#C5A059",
          600: "#B08D45",
        },
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F5F2EB",
            foreground: "#1a1a1a",
            content1: "#F8F5F0",
            content2: "#FAF8F4",
            content3: "#FCFAF7",
            content4: "#FDFCFA",
          },
        },
        dark: {
          colors: {
            background: "#050505", // Rich Black (OLED friendly)
            foreground: "#ECEDEE",
            content1: "#18181b", // Zinc 900 (Cards)
            content2: "#27272a", // Zinc 800
            content3: "#3f3f46", // Zinc 700
            content4: "#52525b", // Zinc 600
          },
        },
      },
    }),
  ],
};

module.exports = config;
