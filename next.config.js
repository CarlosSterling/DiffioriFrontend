// next.config.js
/** @type {import('next').NextConfig} */

// URL interna para que el servidor Next.js (dentro de Docker) alcance el API
const backendURL = process.env.INTERNAL_API_URL || "http://api-diffiori:8000";

module.exports = {
  /*  ▸ render "stand-alone" para que el contenedor solo
      necesite `node` sin dependencias extra                */
  output: "standalone",

  /*  ▸ NO dejes que advertencias de ESLint rompan el build. */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /*  ▸ Imágenes: se desactiva el optimizer de Next.js (unoptimized: true)
      Razón: las URLs de media vienen del backend con host "localhost:8080".
      El servidor Next.js (dentro de Docker) NO puede alcanzar localhost:8080
      por la red interna, lo que provoca "Error: Load failed".
      Con unoptimized=true, el browser carga las imágenes directamente
      sin pasar por el proxy /_next/image — funciona siempre.            */
  images: {
    unoptimized: true,
    remotePatterns: [
      // Cualquier host HTTP/HTTPS (catch-all para dev + prod)
      { protocol: "http",  hostname: "**", pathname: "/**" },
      { protocol: "https", hostname: "**", pathname: "/**" },
    ],
  },

  /*  ▸ Proxy del API: reescribe /api/* → backend interno de Docker     */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendURL}/api/:path*/`,
      },
      {
        source: "/media/:path*",
        destination: `${backendURL}/media/:path*`,
      },
    ];
  },
};
