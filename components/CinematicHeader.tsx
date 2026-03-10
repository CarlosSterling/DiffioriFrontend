"use client";

import { motion } from "framer-motion";
import { title as titleStyle } from "@/components/primitives";
import { useLanguage } from "@/i18n/LanguageContext";

interface CinematicHeaderProps {
  title: string;
  subtitle?: string;
  preTitle?: string;
}

export function CinematicHeader({ title, subtitle, preTitle }: CinematicHeaderProps) {
  const { locale } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-16 text-center max-w-4xl mx-auto"
    >
      {(preTitle || title) && (
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-xs md:text-sm uppercase text-primary font-black mb-4 block"
        >
          {preTitle || (locale === "en" ? "DIFFIORI EXPERIENCE" : "EXPERIENCIA DIFFIORI")}
        </motion.span>
      )}

      <h1 className={titleStyle({ size: "lg", class: "block mb-6 tracking-[0.15em] leading-tight font-black uppercase text-[#4A3728] dark:text-primary-100" })}>
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
          className="text-default-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
