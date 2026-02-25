"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
}

interface TestimonialsSectionProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ 
  title, 
  subtitle, 
  testimonials 
}: TestimonialsSectionProps) => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 font-display"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-default-500 max-w-2xl mx-auto text-lg font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-background rounded-3xl p-8 shadow-lg border border-default-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, starI) => (
                  <Star 
                    key={starI} 
                    size={18} 
                    fill={starI < item.rating ? "currentColor" : "none"} 
                    className={starI < item.rating ? "text-yellow-400" : "text-default-200"}
                  />
                ))}
              </div>
              
              <p className="text-default-700 italic mb-8 leading-relaxed flex-grow">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-default-200">
                   {item.avatar ? (
                     <Image 
                       src={item.avatar} 
                       alt={item.author} 
                       fill 
                       className="object-cover"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary font-bold text-lg">
                       {item.author.charAt(0)}
                     </div>
                   )}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm">{item.author}</h4>
                  <p className="text-xs text-default-400 uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
