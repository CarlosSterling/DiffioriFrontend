"use client";

import { motion } from "framer-motion";

export const BackgroundPatterns = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Patch 1: Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1.5 }}
        className="absolute top-[15%] -right-20 w-[400px] h-[600px] bg-trama-diffiori dark:bg-trama-diffiori-light rounded-full blur-3xl opacity-10 rotate-12"
      />

      {/* Patch 2: Middle Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.08, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-[45%] -left-32 w-[500px] h-[500px] bg-trama-diffiori dark:bg-trama-diffiori-light rounded-full blur-[80px] opacity-10 -rotate-12"
      />

      {/* Patch 3: Lower Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.12, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.8 }}
        className="absolute top-[75%] -right-24 w-[600px] h-[400px] bg-trama-diffiori dark:bg-trama-diffiori-light rounded-full blur-[100px] opacity-10 rotate-45"
      />

      {/* Patch 4: Bottom Left (Very subtle) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-[5%] left-[5%] w-[300px] h-[300px] bg-trama-diffiori dark:bg-trama-diffiori-light rounded-full blur-[60px] opacity-5"
      />
    </div>
  );
};
