const { heroui } = require("@heroui/theme");

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
        sans: ["var(--font-montserrat)", "var(--font-sans)", "sans-serif"],
        display: ["var(--font-montserrat)", "var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        montserrat: ["var(--font-montserrat)"],
        mono: ["var(--font-mono)"],
      },

      /* —— Colores corporativos —— */
      colors: {
        /* Rojo principal (botones, enlaces, focos) */
        primary: {
          DEFAULT: "#C5A059", // Dorado principal
          50:  "#f9f6ef",
          100: "#f2ecdf",
          200: "#e6d9bf",
          300: "#d9c69f",
          400: "#cdb37f",
          500: "#C5A059",
          600: "#b08d45",
          700: "#9b7a3c",
          800: "#866733",
          900: "#71552a",
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
          light: "#f9e895",
        },
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F2F2F2", // Gris neutro claro
            foreground: "#1a1a1a",
            primary: {
              DEFAULT: "#C5A059", // Dorado
              foreground: "#333333", // Gris oscuro para el texto
            },
            content1: "#F7F7F7",
            content2: "#FAFAFA",
            content3: "#FCFCFC",
            content4: "#FFFFFF",
          },
        },
        dark: {
          colors: {
            background: "#050505", // Rich Black (OLED friendly)
            foreground: "#ECEDEE",
            primary: {
              DEFAULT: "#C5A059",
              foreground: "#1a1a1a",
            },
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
