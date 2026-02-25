"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface CTABannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export const CTABanner = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
}: CTABannerProps) => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background with parallax-like static effect or simple cover */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      <div className="relative z-20 max-w-4xl mx-auto text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 font-display tracking-tight"
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl opacity-90 mb-10 font-light leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button
            as={Link}
            href={ctaLink}
            size="lg"
            className="bg-white text-black font-bold px-10 py-6 rounded-full hover:scale-105 transition-transform"
          >
            {ctaText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
