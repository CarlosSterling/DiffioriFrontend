// next.config.js
/** @type {import('next').NextConfig} */
const backendURL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const { hostname, protocol } = new URL(backendURL);

module.exports = {
  /*  ▸ render “stand‑alone” para que el contenedor solo
      necesite `node` sin dependencias extra                */
  output: "standalone",

  /*  ▸ NO dejes que advertencias de ESLint rompan el build.
      Las “errors” siguen deteniendo la compilación.         */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /*  ▸ Dominios/paths desde los que Next <Image/> puede
      descargar imágenes (covers, galerías, mapas, …).       */
  images: {
    remotePatterns: [
      /* media del backend ─ producción o local  */
      {
        protocol: protocol.replace(":", ""), // "http" | "https"
        hostname: hostname,
        port: "",
        pathname: "/media/**",
      },
      /* mapa estático de wikimedia              */
      {
        protocol: "https",
        hostname: "maps.wikimedia.org",
        pathname: "/**",
      },
      /* Google User Content (Reviews) */
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendURL}/api/:path*`,
      },
    ];
  },
};
