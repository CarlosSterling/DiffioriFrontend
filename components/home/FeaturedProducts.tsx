"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { title as titleStyle } from "@/components/primitives";
import { Button } from "@heroui/button";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import CoffeeProductCard from "@/components/CoffeeProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import type { CoffeeProduct } from "@/data/coffee-products";
import Link from "next/link";
import clsx from "clsx";

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: CoffeeProduct[];
  isLoading?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export const FeaturedProducts = ({
  title,
  subtitle,
  products,
  ctaText = "Ver todos los productos",
  ctaLink = "/productos",
  isLoading = false,
}: FeaturedProductsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalVisible, setTotalVisible] = useState(1);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    setOverflows(el.scrollWidth > el.clientWidth + 10);

    // Calculate active index based on scroll position
    const cardWidth = 432; // 400px card + 32px gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, products.length - 1));

    // Calculate how many are visible
    const visible = Math.floor(el.clientWidth / cardWidth);
    setTotalVisible(Math.max(visible, 1));
  }, [products.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Small delay to let layout settle
    const timer = setTimeout(checkScroll, 100);
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [checkScroll, products]);

  // Edge-hover auto-scroll
  const startEdgeScroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    stopEdgeScroll();
    const speed = direction === "left" ? -5 : 5;
    const tick = () => {
      el.scrollLeft += speed;
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const stopEdgeScroll = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 432;
    const amount = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 432;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  const totalDots = Math.max(products.length - totalVisible + 1, 1);

  return (
    <section className="py-16 px-6 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-50/20 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={titleStyle({ size: "md", class: "block mb-3 leading-tight text-[#4A3728] dark:text-primary-100 font-black uppercase tracking-[0.2em]" })}
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg md:text-xl text-[#4A3728] dark:text-gray-300 leading-relaxed font-medium max-w-3xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Button
              as={Link}
              href={ctaLink}
              radius="full"
              className="font-bold text-sm uppercase tracking-wider px-6 btn-gold-premium"
              endContent={<ArrowRight size={16} />}
            >
              {ctaText}
            </Button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative group/carousel">
          {/* Left Arrow - on the edge */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-default-100/90 backdrop-blur-sm shadow-xl shadow-black/10 items-center justify-center text-default-700 hover:bg-primary hover:text-white transition-colors duration-200 border border-white/50"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Left gradient fade */}
          <div
            className={`hidden md:block absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-500 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className={`flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-1 ${
              !overflows ? "justify-center" : ""
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex-none w-[400px] snap-start"
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))
              ) : products.length > 0 ? (
                products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="flex-none w-[400px] snap-start"
                  >
                    <CoffeeProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full py-12 text-center"
                >
                  <p className="text-default-500 text-xl font-medium">
                    Estamos tostando nuevos granos... vuelve pronto.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right gradient fade */}
          <div
            className={`hidden md:block absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-500 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Hover hotzones for auto-scroll */}
          {canScrollLeft && (
            <div
              onMouseEnter={() => startEdgeScroll("left")}
              onMouseLeave={stopEdgeScroll}
              className="hidden md:block absolute left-0 top-0 bottom-4 w-24 z-[15] cursor-w-resize"
            />
          )}
          {canScrollRight && (
            <div
              onMouseEnter={() => startEdgeScroll("right")}
              onMouseLeave={stopEdgeScroll}
              className="hidden md:block absolute right-0 top-0 bottom-4 w-24 z-[15] cursor-e-resize"
            />
          )}

          {/* Right Arrow - on the edge */}
          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary text-white shadow-xl shadow-primary/25 items-center justify-center hover:bg-primary-700 transition-colors duration-200"
                aria-label="Siguiente"
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Dots */}
        {products.length > totalVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Ir al producto ${i + 1}`}
                className="group relative p-1"
              >
                <motion.div
                  animate={{
                    width: activeIndex === i ? 28 : 8,
                    height: 8,
                  }}
                  className={clsx(
                    "rounded-full transition-all duration-300",
                    activeIndex === i ? "bg-primary" : "bg-default-300 dark:bg-zinc-700"
                  )}
                  whileHover={{
                    scale: 1.3,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
