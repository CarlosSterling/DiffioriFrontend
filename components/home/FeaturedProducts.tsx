"use client";

import { motion } from "framer-motion";
import { title as titleStyle } from "@/components/primitives";
import { Button } from "@heroui/button";
import { ChevronRight } from "lucide-react";
import CoffeeProductCard from "@/components/CoffeeProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import type { CoffeeProduct } from "@/data/coffee-products";
import Link from "next/link";

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
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={titleStyle({ size: "sm", class: "block mb-3" })}
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-default-500 max-w-xl text-lg font-light leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Button
              as={Link}
              href={ctaLink}
              variant="light"
              color="primary"
              className="font-semibold text-lg"
              endContent={<ChevronRight />}
            >
              {ctaText}
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {isLoading ? (
            // Show 3 skeletons during loading
            Array.from({ length: 3 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="w-full max-w-sm">
                <ProductSkeleton />
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="w-full max-w-sm"
              >
                <CoffeeProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
               <p className="text-default-500 text-xl font-medium">Estamos tostando nuevos granos... vuelve pronto.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
