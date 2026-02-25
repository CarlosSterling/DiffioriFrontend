"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 inline-flex p-6 rounded-full bg-primary-100/30 text-primary-500">
          <Coffee size={64} />
        </div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-6">¡Vaya! Este café se nos ha enfriado.</h2>
        <p className="text-default-500 text-lg max-w-md mx-auto mb-8">
          La página que buscas no existe o ha sido movida. ¡Pero no te preocupes, hay mucho más café por descubrir!
        </p>
        <Button
          as={Link}
          href="/"
          color="primary"
          size="lg"
          radius="full"
          className="font-bold px-8 shadow-xl shadow-primary/20"
        >
          Volver al Inicio
        </Button>
      </motion.div>
    </div>
  );
}
