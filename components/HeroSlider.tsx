"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "@heroui/button";
import { title as titlePrimitive, subtitle as subtitlePrimitive } from "@/components/primitives";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";

interface Slide {
  id: number;
  image: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  buttonText?: string;
  buttonTextEn?: string;
  buttonLink?: string;
}

interface HeroSliderProps {
  slides: Slide[];
  interval?: number;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ 
  slides, 
  interval = 8000 // Slower interval
}) => {
  const { locale } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // Force re-render of progress bar

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setKey((prev) => prev + 1);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setKey((prev) => prev + 1);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [nextSlide, interval]);

  const variants = {
    enter: {
      opacity: 0,
      scale: 1.01, // Extremely subtle to avoid any perceived pixelation
    },
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      transition: { duration: 1.2 }
    },
  };

  const textVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 2, ease: "easeInOut" }, // Slower fade
            scale: { duration: 15, ease: "linear" }, // Very slow zoom
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[currentIndex].image}
            alt={locale === "en" ? (slides[currentIndex].titleEn || slides[currentIndex].title) : slides[currentIndex].title}
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

          {/* Dynamic Content Overlay - Right Aligned like reference */}
          <div className="absolute inset-0 flex flex-col items-end justify-center text-right px-6 md:px-20 z-10 max-w-7xl mx-auto">
            <motion.h1
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.2, delay: 0.2 }}
              className={titlePrimitive({
                class: "text-white text-4xl md:text-7xl lg:text-8xl mb-4 leading-tight",
              })}
            >
              {locale === "en" ? (slides[currentIndex].titleEn || slides[currentIndex].title) : slides[currentIndex].title}
            </motion.h1>

            <motion.p
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.2, delay: 0.4 }}
              className={subtitlePrimitive({
                className: "max-w-xl text-right mb-10 text-gray-200 text-lg md:text-xl",
              })}
            >
              {locale === "en" ? (slides[currentIndex].subtitleEn || slides[currentIndex].subtitle) : slides[currentIndex].subtitle}
            </motion.p>

            {slides[currentIndex].buttonText && (
              <motion.div
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1.2, delay: 0.6 }}
              >
                <Button
                  as="a"
                  href={slides[currentIndex].buttonLink || "/productos"}
                  color="primary"
                  variant="shadow"
                  size="lg"
                  radius="full"
                  className="shadow-xl font-bold px-10 text-white transition-transform hover:scale-105"
                  startContent={<ShoppingCart size={20} />}
                >
                  {locale === "en" ? (slides[currentIndex].buttonTextEn || slides[currentIndex].buttonText) : slides[currentIndex].buttonText}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={clsx(
              "h-1.5 rounded-full transition-all duration-500",
              currentIndex === index ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Side Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white/50 hover:text-white transition-all backdrop-blur-sm hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white/50 hover:text-white transition-all backdrop-blur-sm hidden md:block"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
