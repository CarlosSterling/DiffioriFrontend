"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDisclosure } from "@heroui/react";
import { 
  House, 
  ShoppingBag, 
  ShoppingCart,
  FileText,
  Coffee,
  PenLine, 
  Send 
} from "lucide-react";
import clsx from "clsx";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/i18n/LanguageContext";
import CartDrawer from "./CartDrawer";

export const BottomNav = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { dict } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navItems = [
    {
      label: dict.nav.inicio,
      icon: House,
      href: "/",
    },
    {
      label: dict.nav.productos,
      icon: ShoppingBag,
      href: "/productos",
    },
    {
      label: dict.nav.cafe,
      icon: Coffee,
      href: "/cafe",
    },
    {
      label: "Carrito",
      icon: ShoppingCart,
      onClick: onOpen,
      isCart: true,
    },
    {
      label: "Contacto",
      icon: Send,
      href: "/contact",
    },
  ];

  return (
    <>
      <nav className="xl:hidden fixed bottom-0 inset-x-0 z-[60] bg-background/80 backdrop-blur-lg border-t border-default-200 pb-safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16 px-1">
          {navItems.map((item) => {
            const isActive = item.href === pathname;
            const Icon = item.icon;

            const content = (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={clsx(
                  "flex flex-col items-center justify-center gap-0.5 min-w-[50px] h-full transition-colors",
                  isActive ? "text-primary-500" : "text-default-500"
                )}
              >
                <div className="relative">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.isCart && totalItems > 0 && (
                    <AnimatePresence>
                      <motion.span
                        key={`cart-count-${totalItems}`}
                        initial={{ scale: 0, y: 5 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: 5 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="absolute -top-2 -right-2 bg-gradient-to-br from-[#F9E895] to-[#C5A059] text-[#1a1a1a] text-[10px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg shadow-gold/20 border border-white/40 backdrop-blur-sm z-20"
                      >
                        {totalItems}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>
                <span className="text-[8px] sm:text-[10px] font-medium uppercase tracking-tight text-center">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute bottom-1 w-1 h-1 rounded-full bg-primary-500"
                  />
                )}
              </motion.div>
            );

            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="relative h-full outline-none"
                >
                  {content}
                </button>
              );
            }

            return (
              <NextLink
                key={item.href}
                href={item.href || "/"}
                className="relative h-full"
              >
                {content}
              </NextLink>
            );
          })}
        </div>
      </nav>

      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};
