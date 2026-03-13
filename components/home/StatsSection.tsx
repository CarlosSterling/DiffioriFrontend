"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, Users, Globe, Clock, Coffee, Award, Leaf, 
  Truck, Heart, Star, ShieldCheck, Zap, LucideIcon 
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ICON_MAP: Record<string, LucideIcon> = {
  MessageSquare, Users, Globe, Clock, Coffee, Award, 
  Leaf, Truck, Heart, Star, ShieldCheck, Zap,
};

interface StatItem {
  icon: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
}

interface StatsSectionProps {
  features?: StatItem[];
}

export const StatsSection = ({ features = [] }: StatsSectionProps) => {
  const { locale } = useLanguage();

  if (features.length === 0) return null;

  return (
    <section className="py-16 md:py-20 px-6 bg-default-50 dark:bg-background relative overflow-hidden">



      <div className="max-w-[1100px] mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-[0.2em] leading-tight text-[#4A3728] dark:text-primary-100"
        >
          {locale === "en" ? "Thanks for trusting us" : "Gracias por confiar en nosotros"}
        </motion.h2>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 md:gap-x-24">
          {features.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] || Coffee;
            const displayTitle = locale === "en" ? (stat.titleEn || stat.title) : stat.title;
            const displayDesc = locale === "en" ? (stat.descriptionEn || stat.description) : stat.description;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center min-w-[220px]"
              >
                {/* Number and Icon Row */}
                <div className="flex items-center justify-center gap-4 mb-3">
                  <h3
                    className="text-4xl md:text-5xl font-black text-[#4A3728] dark:text-white tracking-tight"
                  >
                    {displayTitle}
                  </h3>
                  <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
                    <Icon
                      size={28}
                      strokeWidth={2}
                      className="text-primary dark:text-gold-light flex-shrink-0"
                    />
                  </div>
                </div>

                {/* Description below */}
                <p
                  className="text-[#4A3728] dark:text-default-400 font-bold text-sm md:text-base opacity-80 uppercase tracking-wider"
                  style={{
                    maxWidth: "260px",
                    margin: 0,
                  }}
                >
                  {displayDesc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
