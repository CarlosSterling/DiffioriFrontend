"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge, useDisclosure } from "@heroui/react";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import clsx from "clsx";

export default function CartIcon({ className }: { className?: string }) {
  const { totalItems } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        aria-label="Cart"
        className={clsx(
          "relative p-2 transition-colors flex items-center justify-center",
          className || "text-foreground/80 hover:text-gold"
        )}
      >
        <ShoppingCartIcon size={26} />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              key="cart-badge"
              initial={{ scale: 0, x: 4, y: -4 }}
              animate={{ scale: 1, x: 0, y: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 20 }}
              className="absolute -top-0 -right-0 w-[20px] h-[20px] flex items-center justify-center z-20"
            >
              {/* Golden Jewel Bubble Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F9E895] via-[#C5A059] to-[#8c6b2d] rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.35)] border border-white/40" />
              
              {/* Glass Shine Overlay */}
              <div className="absolute inset-[10%] bg-gradient-to-tr from-transparent via-white/40 to-transparent rounded-full pointer-events-none" />
              
              <motion.span
                key={totalItems}
                initial={{ scale: 1.25, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative text-[#1a1a1a] text-[10.5px] font-black leading-none"
                transition={{ duration: 0.3 }}
              >
                {totalItems}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}
