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

        <div className="flex flex-wrap justify-center gap-10">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.1, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="w-full max-w-[320px] flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-xl hover:shadow-primary/10 transition-all duration-700 hover:-translate-y-3 group relative overflow-hidden"
              >
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 bg-gradient-to-br from-white to-primary-50 dark:from-zinc-900 dark:to-black text-primary shadow-xl border border-primary/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                
                <h3 className="font-black text-2xl mb-4 text-[#4A3728] dark:text-primary-100 relative z-10 tracking-tight">
                  {feature.title}
                </h3>
                
                <div className="w-8 h-1 bg-primary/30 rounded-full mb-6 group-hover:w-16 transition-all duration-500" />
                
                <p className="text-default-600 dark:text-default-400 text-base leading-relaxed font-medium font-serif italic relative z-10">
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
