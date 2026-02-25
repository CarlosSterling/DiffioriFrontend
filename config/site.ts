export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Diffiori Café",
  description: "El sabor de lo que somos - Café de origen del Huila",
  navItems: [
    { label: "Inicio",         href: "/" },
    { label: "Tienda",         href: "/productos" },
    { label: "Nuestra Carta",  href: "/catalogo.pdf" },
    { label: "Clientes",       href: "/clients" },
    { label: "Blog",           href: "/blog" },
    { label: "Contáctanos",    href: "/contact" },
  ],
  navMenuItems: [
    { label: "Inicio",         href: "/" },
    { label: "Tienda",         href: "/productos" },
    { label: "Nuestra Carta",  href: "/catalogo.pdf" },
    { label: "Clientes",       href: "/clients" },
    { label: "Blog",           href: "/blog" },
    { label: "Contáctanos",    href: "/contact" },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
