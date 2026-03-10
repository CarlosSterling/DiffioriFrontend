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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "48px 80px",
          }}
        >
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  minWidth: "200px",
                }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Icon
                    size={32}
                    strokeWidth={1.8}
                    className="text-primary dark:text-primary-400 flex-shrink-0"
                  />
                </div>

                <h3
                  className="text-[#2d2d2d] dark:text-white"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "12px",
                  }}
                >
                  {displayTitle}
                </h3>

                <p
                  className="text-[#4A3728]/70 dark:text-default-400"
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    maxWidth: "240px",
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
