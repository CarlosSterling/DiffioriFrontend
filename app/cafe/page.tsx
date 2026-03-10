"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { title as titleStyle } from "@/components/primitives";
import CoffeeProductCard from "@/components/CoffeeProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { CoffeeProduct } from "@/data/coffee-products";
import { useLanguage } from "@/i18n/LanguageContext";
import { getProducts, API_URL } from "@/lib/api";
import { Coffee } from "lucide-react";

const CAFE_CATEGORY_SLUG = "cafe";

export default function CafePage() {
  const { dict, locale } = useLanguage();
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCafeProducts() {
      try {
        const productsData = await getProducts();

        if (productsData && Array.isArray(productsData)) {
          const cafeProducts = productsData.filter(
            (p: any) =>
              (p.category_slug || "").toLowerCase() === CAFE_CATEGORY_SLUG
          );

          const mapped = cafeProducts.map((p: any) => ({
            id: p.slug || String(p.id),
            name: p.name,
            nameEn: p.name_en || p.name,
            image: p.cover || "/placeholder-coffee.svg",
            price: parseFloat(p.price),
            shortDesc: p.short_desc,
            shortDescEn: p.short_desc_en || p.short_desc,
            description: p.description,
            descriptionEn: p.description_en || p.description,
            category: p.category_name || p.category_slug || "specialty",
            categoryEn: p.category_name_en || p.category_name || p.category_slug || "specialty",
            variants:
              p.variants && p.variants.length > 0
                ? p.variants.map((v: any) => ({
                    id: v.id,
                    label: `${v.weight} ${v.grind}`,
                    labelEn: `${v.weight_en || v.weight} ${v.grind_en || v.grind}`,
                    price: parseFloat(v.price),
                  }))
                : [
                    {
                      id: p.slug || String(p.id),
                      label: "Normal",
                      labelEn: "Standard",
                      price: parseFloat(p.price),
                    },
                  ],
            gallery: (p.gallery || []).map((img: any) => ({
              ...img,
              altEn: img.alt_en || img.alt
            })),
          })) as CoffeeProduct[];

          setProducts(mapped);
        }
      } catch (err) {
        console.error("Error loading café products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCafeProducts();
  }, []);

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 bg-background">
      {/* Cinematic Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-16 text-center max-w-4xl mx-auto"
      >
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-xs md:text-sm uppercase text-primary font-black mb-4 block"
        >
          {locale === "en" ? "ORIGIN HUILA" : "ORIGEN HUILA"}
        </motion.span>
        
        <h1 className={titleStyle({ size: "lg", class: "block mb-6 tracking-[0.15em] leading-tight font-black uppercase text-[#4A3728] dark:text-primary-100" })}>
          {dict.cafe.title}
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1.5 mx-auto rounded-full mb-8 bg-primary"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-default-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
        >
          {dict.cafe.subtitle}
        </motion.p>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        layout
        className="flex flex-wrap justify-center gap-10 max-w-screen-2xl mx-auto px-6"
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.333%-3rem)] max-w-[480px]"
              >
                <ProductSkeleton />
              </motion.div>
            ))
          ) : products.length > 0 ? (
            products.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.333%-3rem)] max-w-[480px]"
              >
                <CoffeeProductCard product={p} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 px-6 border-2 border-dashed border-default-200 rounded-3xl w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 group hover:border-primary/30 transition-colors duration-500">
              <div className="p-5 bg-default-100/50 rounded-full text-default-400 group-hover:text-primary transition-colors">
                <Coffee className="w-10 h-10" />
              </div>
              <p className="text-default-500 text-lg font-light italic">
                {locale === "en"
                  ? "No coffee products yet. We are preparing new batches!"
                  : "Aún no hay productos de café. ¡Estamos preparando nuevos lotes!"}
              </p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
