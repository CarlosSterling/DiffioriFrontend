"use client";
import {
  Navbar as HNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageToggle } from "@/components/LanguageToggle";
import CartIcon from "@/components/CartIcon";
import { useScrolled } from "@/components/useScrolled";
import { useLanguage } from "@/i18n/LanguageContext";

/* Map siteConfig keys → dict keys */
const navLabelKey: Record<string, keyof typeof import("@/i18n/es").default.nav> = {
  "/": "inicio",
  "/productos": "productos",
  "/catalogo.pdf": "carta",
  "/clients": "clientes",
  "/blog": "blog",
  "/contact": "contactanos",
};

export const Navbar = () => {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const { dict } = useLanguage();

  return (
    <HNavbar
      position="sticky"
      className={clsx(
        "transition-all duration-500 top-2 sm:top-4 inset-x-2 sm:inset-x-4 xl:inset-x-12 mx-auto h-auto min-h-[60px] sm:min-h-[80px] xl:min-h-[100px] z-50 rounded-2xl sm:rounded-3xl xl:rounded-full border border-white/20 py-1 sm:py-2 items-center px-2 sm:px-4 xl:px-6 mb-4 sm:mb-5",
        scrolled 
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] scale-[0.98]" 
          : "bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-xl",
      )}
      maxWidth="full"
    >
      {/* ——— Brand (Left) ——— */}
      <NavbarBrand as="li" className="gap-2 sm:gap-4 max-w-fit h-full flex items-center pr-2 sm:pr-4 xl:pr-8 pl-2 sm:pl-4 xl:pl-6 justify-start flex-shrink-0">
        <NextLink href="/" className="flex flex-col items-center justify-center h-full">
          {/* Logo con máscara para tomar el color primary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-auto relative flex items-center justify-center h-[65px] sm:h-[110px] xl:h-[140px]"
          >
            <div 
              className="bg-primary w-[180px] sm:w-[260px] xl:w-[320px] h-full"
              style={{
                maskImage: 'url("/logoDiffiori.png")',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url("/logoDiffiori.png")',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
              }}
            />
          </motion.div>
        </NextLink>
      </NavbarBrand>

      {/* ——— Desktop nav (Centered) ——— */}
      <NavbarContent className="hidden xl:flex gap-4 2xl:gap-6" justify="center">
        {siteConfig.navItems.map((item) => {
          const isExternal = item.href.endsWith(".pdf");
          const active = !isExternal && pathname === item.href;
          const key = navLabelKey[item.href] ?? "inicio";

          /* External PDF link → <a> with target _blank */
          if (isExternal) {
            return (
              <NavbarItem key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-2 2xl:px-4 py-2 rounded-xl text-sm xl:text-base 2xl:text-lg font-semibold tracking-wide font-display text-foreground/70 hover:text-primary hover:bg-primary-100/30 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  {dict.nav[key]}
                </a>
              </NavbarItem>
            );
          }

          return (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                className={clsx(
                  "relative px-2 2xl:px-4 py-2 rounded-xl text-sm xl:text-base 2xl:text-lg font-semibold tracking-wide font-display transition-all duration-300 inline-block",
                  active
                    ? "text-primary font-bold"
                    : "text-foreground/70 hover:text-primary hover:bg-primary-100/30 hover:scale-105 active:scale-95",
                )}
              >
                {dict.nav[key]}
              </NextLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* ——— Right actions (unified for all breakpoints) ——— */}
      <NavbarContent justify="end" className="gap-2 sm:gap-3 items-center flex-shrink-0">
        <div className="hidden xl:flex items-center gap-2 bg-default-100/50 p-1 rounded-full backdrop-blur-sm">
          <LanguageToggle />
          <ThemeSwitch />
        </div>
        <div className="hidden xl:block">
          <CartIcon />
        </div>

        {/* Mobile controls (just theme/lang if we want, or keep it simple) */}
        <div className="xl:hidden flex items-center gap-2 bg-default-100/50 p-1 rounded-full backdrop-blur-sm">
          <LanguageToggle />
          <ThemeSwitch />
        </div>

        {/* CTA — desktop only */}
        <NavbarItem className="hidden xl:flex">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              as={Link}
              href="/contact"
              color="primary"
              variant="shadow"
              radius="full"
              className="px-5 font-bold shadow-xl shadow-primary/20 transition-all duration-300 whitespace-nowrap"
            >
              {dict.nav.cotizar}
            </Button>
          </motion.div>
        </NavbarItem>

        {/* Hamburger — removed for mobile, everything is in BottomNav */}
      </NavbarContent>

      {/* Mobile menu removed since we have BottomNav now */}
    </HNavbar>
  );
};
