/* app/layout.tsx */
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BottomNav } from "@/components/BottomNav";

/* ------------ META ------------ */
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["café de especialidad", "Huila", "Colombia", "café premium", "Diffiori Café", "comercio justo"],
  authors: [{ name: "Diffiori Café" }],
  creator: "Diffiori Café",
  publisher: "Diffiori Café",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://diffiorecafe.com",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.png"],
    creator: "@diffiorecafe",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

/* ----------- LAYOUT ----------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      {/* ① body → flex-col y min-h-screen  */}
      <body
        className={clsx(
          "min-h-screen flex flex-col bg-background font-sans antialiased text-foreground",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* ─── Header fijo ─── */}
          <header className="fixed inset-x-0 top-0 z-50">
            <Navbar />
          </header>

          {/* ② main se expande para rellenar el espacio libre */}
          {/*    pt-20 = alto del header (ajusta si tu barra cambia)     */}
          {/*    pb-20 = espacio para el BottomNav en móvil              */}
          <main className="flex-grow pt-24 sm:pt-28 xl:pt-32 pb-20 xl:pb-0">{children}</main>

          {/* ─── Footer siempre al fondo ─── */}
          <Footer />

          {/* ─── Navegación inferior móvil ─── */}
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
