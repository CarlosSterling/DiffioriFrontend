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
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  CreditCardIcon,
  ShieldCheckIcon,
  LockIcon,
  ArrowLeftIcon,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageToggle } from "@/components/LanguageToggle";
import CartIcon from "@/components/CartIcon";
import { useScrolled } from "@/components/useScrolled";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";

/* Map siteConfig keys → dict keys */
const navLabelKey: Record<string, keyof typeof import("@/i18n/es").default.nav> = {
  "/": "inicio",
  "/productos": "productos",
  "/catalogo.pdf": "carta",
  "/cafe": "cafe",
  "/blog": "blog",
  "/contact": "contactanos",
};
export const Navbar = () => {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const { dict, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);

  const isCheckout = pathname === "/checkout";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <HNavbar
        position="sticky"
        onMouseEnter={() => setIsNavbarHovered(true)}
        onMouseLeave={() => setIsNavbarHovered(false)}
        className={clsx(
          "bg-white/30 dark:bg-black/20 transition-all duration-700 top-2 sm:top-4 inset-x-2 sm:inset-x-4 xl:inset-x-12 mx-auto z-50 rounded-2xl sm:rounded-3xl xl:rounded-full border items-center px-2 sm:px-4 xl:px-8 mb-1 shadow-mocha-premium",
          scrolled ? "h-[50px] sm:h-[65px] xl:h-[75px] scale-[0.99]" : "h-[75px] sm:h-[95px] xl:h-[115px]",
          isNavbarHovered ? "backdrop-blur-[40px] bg-white/40 dark:bg-black/30" : "backdrop-blur-[24px]",
          isCheckout 
            ? "border-primary/60 dark:border-primary/40 ring-4 ring-primary/5 shadow-[0_0_30px_rgba(197,160,89,0.15)]" 
            : "border-white/15 dark:border-white/10 dark:border-light-glow"
        )}
        maxWidth="full"
      >
      {/* Pattern Texture Overlay */}
      <div className="absolute inset-0 bg-trama-diffiori opacity-[0.05] dark:opacity-[0.03] pointer-events-none" />
      {/* ——— Brand (Left) ——— */}
      <NavbarBrand as="li" className="flex-1 justify-start h-full">
        <NextLink href="/" className="flex items-center">
          <Logo scrolled={scrolled} className={scrolled ? "ml-3" : "ml-0"} />
        </NextLink>
      </NavbarBrand>

      {/* ——— Desktop nav (Centered) ——— */}
      <NavbarContent className="hidden xl:flex gap-6 2xl:gap-10" justify="center">
        {siteConfig.navItems.map((item) => {
          const isExternal = item.href.endsWith(".pdf");
          const active = !isExternal && pathname === item.href;
          const key = navLabelKey[item.href] ?? "inicio";
          const isFaded = hoveredKey !== null && hoveredKey !== item.href;

          const commonProps = {
            onMouseEnter: () => setHoveredKey(item.href),
            onMouseLeave: () => setHoveredKey(null),
            className: clsx(
              "relative px-2 py-2 text-base xl:text-[18px] 2xl:text-[22px] font-montserrat font-bold tracking-[0.05em] transition-all duration-400 inline-block uppercase group",
              active ? "text-gold" : "text-default-700 dark:text-white/80 hover:text-primary dark:hover:text-white",
              isFaded ? "opacity-30 scale-95" : "opacity-100 scale-100"
            )
          };

          const content = (
            <>
              {dict.nav[key]}
              {/* Hover expanding line */}
              <span className="absolute bottom-1.5 left-1/2 w-0 h-[1.5px] bg-gold -translate-x-1/2 group-hover:w-full transition-all duration-500 opacity-60" />
              {active && (
                <motion.div
                  layoutId="nav-active-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_12px_rgba(197,160,89,1)]"
                />
              )}
            </>
          );

          return (
            <NavbarItem key={item.href}>
              {isExternal ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" {...commonProps}>
                  {content}
                </a>
              ) : (
                <NextLink href={item.href} {...commonProps}>
                  {content}
                </NextLink>
              )}
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* ——— Right actions (unified for all breakpoints) ——— */}
      <NavbarContent justify="end" className="flex-1 gap-2 sm:gap-4 items-center">
        <div className="hidden xl:flex items-center gap-1 bg-black/5 dark:bg-white/10 p-1.5 rounded-full backdrop-blur-sm border border-black/5 dark:border-white/10">
          <LanguageToggle />
          <ThemeSwitch />
        </div>

        <div className={clsx("hidden xl:block")}>
          <CartIcon className="text-default-700 dark:text-white/80 hover:text-gold transition-colors" />
        </div>

        {/* Mobile controls (just theme/lang if we want, or keep it simple) */}
        <div className="xl:hidden flex items-center gap-1 bg-black/5 dark:bg-white/10 p-1 rounded-full backdrop-blur-sm border border-black/5 dark:border-white/10">
          <LanguageToggle />
          <ThemeSwitch />
        </div>

        {/* CTA — desktop only */}
        <NavbarItem className="hidden xl:flex">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              as={Link}
              href="/contact"
              variant="flat"
              className="px-6 font-montserrat font-bold tracking-[0.2em] uppercase whitespace-nowrap btn-gold-premium"
            >
              {dict.nav.cotizar}
            </Button>
          </motion.div>
        </NavbarItem>

        {/* Hamburger — removed for mobile, everything is in BottomNav */}
      </NavbarContent>

      {/* Mobile menu removed since we have BottomNav now */}
    </HNavbar>
    </>
  );
};
