"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { title as titleStyle } from "@/components/primitives";
import CoffeeProductCard from "@/components/CoffeeProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { CoffeeProduct } from "@/data/coffee-products";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@heroui/react";
import clsx from "clsx";
import { getProducts, getCategories, API_URL } from "@/lib/api";

export default function ProductosPage() {
  const { dict, locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        if (productsData && Array.isArray(productsData)) {
          const nonCafe = productsData.filter(
            (p: any) => (p.category_slug || "").toLowerCase() !== "cafe"
          );
          const mapped = nonCafe.map((p: any) => ({
            id: p.slug || String(p.id),
            name: p.name,
            nameEn: p.name_en || p.name,
            image: p.cover || "/placeholder-coffee.svg",
            price: parseFloat(p.price),
            shortDesc: p.short_desc,
            shortDescEn: p.short_desc_en || p.short_desc,
            description: p.description,
            descriptionEn: p.description_en || p.description,
            category: p.category_slug || "specialty",
            categoryName: p.category_name || p.category_slug || "specialty",
            categoryEn: p.category_name_en || p.category_name || p.category_slug || "specialty",
            variants: p.variants && p.variants.length > 0
              ? p.variants.map((v: any) => ({
                id: v.id,
                label: `${v.weight} ${v.grind}`,
                labelEn: `${v.weight_en || v.weight} ${v.grind_en || v.grind}`, 
                price: parseFloat(v.price)
              }))
              : [
                { id: p.slug || String(p.id), label: "Normal", labelEn: "Standard", price: parseFloat(p.price) }
              ],
            gallery: (p.gallery || []).map((img: any) => ({
              ...img,
              altEn: img.alt_en || img.alt
            }))
          } as CoffeeProduct));
          setProducts(mapped);
        }

        if (categoriesData && Array.isArray(categoriesData) && categoriesData.length > 0) {
          const allOption = { id: "all", label: "Todos", labelEn: "All" };
          const mappedCats = categoriesData
            .filter((c: any) => (c.slug || "").toLowerCase() !== "cafe")
            .map((c: any) => ({
              id: c.slug,
              label: c.name,
              labelEn: c.name_en || c.name
            }));
          setCategoriesList([allOption, ...mappedCats]);
        }
      } catch (err) {
        console.error("Error loading products/categories:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

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
          {locale === "en" ? "EXCLUSIVE CATALOG" : "CATÁLOGO EXCLUSIVO"}
        </motion.span>

        <h1 className={titleStyle({ size: "lg", class: "block mb-6 tracking-[0.15em] leading-tight font-black uppercase text-[#4A3728] dark:text-primary-100" })}>
          {locale === "en" ? "Our Collection" : "Nuestra Colección"}
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
          {locale === "en"
            ? "Explore our premium selection of Diffiori products. Quality, tradition, and the flavor of who we are in every detail."
            : "Explora nuestra selección premium de productos Diffiori. Calidad, tradición y el sabor de lo que somos en cada detalle."}
        </motion.p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        {categoriesList.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <Button
              key={cat.id}
              radius="full"
              size="lg"
              className={clsx(
                "font-bold uppercase tracking-[0.1em] text-sm transition-all duration-300 px-8 h-12",
                isActive
                  ? "btn-gold-premium text-[#4A3728] shadow-lg shadow-primary/20 scale-105"
                  : "bg-default-100 dark:bg-default-100/10 border-2 border-default-200 dark:border-default-600 text-default-700 dark:text-default-300 hover:border-primary hover:text-primary hover:scale-105"
              )}
              onPress={() => setSelectedCategory(cat.id)}
            >
              {locale === "en" ? cat.labelEn : cat.label}
            </Button>
          );
        })}
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
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)] max-w-[500px]"
              >
                <ProductSkeleton />
              </motion.div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)] max-w-[500px]"
              >
                <CoffeeProductCard product={p} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 px-6 border-2 border-dashed border-default-200 rounded-3xl w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 group hover:border-primary/30 transition-colors duration-500">
              <div className="p-5 bg-default-100/50 rounded-full text-default-400 group-hover:text-primary transition-colors">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" x2="6" y1="1" y2="4" />
                  <line x1="10" x2="10" y1="1" y2="4" />
                  <line x1="14" x2="14" y1="1" y2="4" />
                </svg>
              </div>
              <p className="text-default-500 text-lg font-light italic">
                {locale === "en"
                  ? "No products found in this category. We are working on new harvests!"
                  : "No hay productos en esta categoría. ¡Estamos trabajando en nuevas cosechas!"}
              </p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
