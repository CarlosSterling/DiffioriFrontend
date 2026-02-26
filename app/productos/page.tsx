"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { title as titleStyle } from "@/components/primitives";
import CoffeeProductCard from "@/components/CoffeeProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { CoffeeProduct, coffeeProducts as staticProducts } from "@/data/coffee-products";
import { categories } from "@/data/categories";
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
          const mapped = productsData.map((p: any) => ({
            id: p.slug || String(p.id),
            name: p.name,
            nameEn: p.name_en || p.name,
            image: p.cover || "/placeholder-coffee.svg",
            price: parseFloat(p.price),
            shortDesc: p.short_desc,
            shortDescEn: p.short_desc_en || p.short_desc,
            description: p.description,
            descriptionEn: p.description_en || p.description,
            category: (p.category_slug || "specialty") as any,
            variants: p.variants && p.variants.length > 0 
              ? p.variants.map((v: any) => ({
                  label: `${v.weight} ${v.grind}`,
                  labelEn: `${v.weight} ${v.grind}`, // Using same for now as they are usually same
                  price: parseFloat(v.price)
                }))
              : [
                  { label: "Normal", labelEn: "Standard", price: parseFloat(p.price) }
                ]
          } as CoffeeProduct));
          setProducts(mapped);
        }

        if (categoriesData && Array.isArray(categoriesData) && categoriesData.length > 0) {
          const allOption = { id: "all", label: "Todos", labelEn: "All" };
          const mappedCats = categoriesData.map(c => ({
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
        <h1 className={titleStyle({ size: "lg", class: "block mb-6 tracking-tight leading-tight" })}>
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
          className="text-default-500 text-xl font-light leading-relaxed"
        >
          {locale === "en" 
            ? "Specialty coffee directly from the heart of Huila, Colombia. Roasting profiles designed to awaken your senses." 
            : "Café especial directamente del corazón de Huila, Colombia. Perfiles de tostión diseñados para despertar tus sentidos."}
        </motion.p>
      </motion.div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categoriesList.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "shadow" : "flat"}
            color={selectedCategory === cat.id ? "primary" : "default"}
            radius="full"
            className={clsx(
              "font-medium transition-all px-6",
              selectedCategory === cat.id ? "scale-105 font-bold" : "hover:bg-default-200"
            )}
            onPress={() => setSelectedCategory(cat.id)}
          >
            {locale === "en" ? cat.labelEn : cat.label}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div 
        layout
        className="grid gap-8 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            // Show 8 skeletons during loading
            Array.from({ length: 8 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="w-full">
                <ProductSkeleton />
              </div>
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
                className="w-full"
              >
                <CoffeeProductCard product={p} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-default-400 text-xl font-medium">
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
