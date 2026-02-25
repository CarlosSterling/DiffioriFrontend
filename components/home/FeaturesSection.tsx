"use client";

import { motion } from "framer-motion";
import { title as titleStyle } from "@/components/primitives";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  features: Feature[];
}

export const FeaturesSection = ({ title, features }: FeaturesSectionProps) => {
  return (
    <section className="py-24 px-6 bg-background relative">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50/50 rounded-full blur-3xl -z-10 opacity-60" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className={titleStyle({ size: "sm", class: "block mb-4" })}>
            {title}
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mt-3 bg-primary" />
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon; // Extract icon component
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-primary-50 text-primary shadow-inner">
                  <Icon size={32} />
                </div>
                <h3 className="font-bold text-xl mb-4 text-foreground/90">
                  {feature.title}
                </h3>
                <p className="text-default-500 text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
