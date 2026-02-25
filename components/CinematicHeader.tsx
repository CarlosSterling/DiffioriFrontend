"use client";

import { motion } from "framer-motion";
import { title as titleStyle } from "@/components/primitives";

interface CinematicHeaderProps {
  title: string;
  subtitle?: string;
}

export function CinematicHeader({ title, subtitle }: CinematicHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-16 text-center max-w-4xl mx-auto"
    >
      <h1 className={titleStyle({ size: "lg", class: "block mb-6 tracking-tight leading-tight" })}>
        {title}
      </h1>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="h-1.5 mx-auto rounded-full mb-8 bg-primary"
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-default-500 text-xl font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
