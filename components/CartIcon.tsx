"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge, useDisclosure } from "@heroui/react";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function CartIcon() {
  const { totalItems } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        aria-label="Cart"
        className="relative p-2 text-foreground/80 hover:text-primary-500 transition-colors"
      >
        <ShoppingCartIcon size={22} />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              key="cart-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -top-0.5 -right-0.5 bg-primary-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
            >
              <motion.span
                key={totalItems}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
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
