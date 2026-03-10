"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Coffee, Award, Leaf, Truck, Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { HeroSlider } from "@/components/HeroSlider";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTABanner } from "@/components/home/CTABanner";
import { CoffeeProduct } from "@/data/coffee-products";
import { getFavoriteProducts, fetchHeroSlides, fetchHomeAbout, fetchHomeFeatures, fetchHomeCTA } from "@/lib/api";

const ICON_MAP: Record<string, any> = {
  Coffee,
  Award,
  Leaf,
  Truck,
  Heart,
};

export default function Home() {
  const { dict, locale } = useLanguage();
  const [favoriteProducts, setFavoriteProducts] = useState<CoffeeProduct[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [homeAbout, setHomeAbout] = useState<any>(null);
  const [homeFeatures, setHomeFeatures] = useState<any[]>([]);
  const [homeCTA, setHomeCTA] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        console.log("Home: Fetching simplified dynamic data...");
        const [
          favoritesData,
          slidesData,
          aboutData,
          featuresData,
          ctaData
        ] = await Promise.all([
          getFavoriteProducts(),
          fetchHeroSlides(),
          fetchHomeAbout(),
          fetchHomeFeatures(),
          fetchHomeCTA(),
        ]);

        // --- Mapper helper ---
        const mapProduct = (p: any): CoffeeProduct => ({
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
        });



        // --- Favorite Products ---
        if (favoritesData && Array.isArray(favoritesData)) {
          setFavoriteProducts(favoritesData.map(mapProduct));
        }

        // --- Hero Slides ---
        if (slidesData && Array.isArray(slidesData)) {
          setHeroSlides(slidesData.map((s: any) => ({
            id: s.id,
            image: s.image,
            title: s.title,
            titleEn: s.title_en,
            subtitle: s.subtitle,
            subtitleEn: s.subtitle_en,
            buttonText: s.button_text,
            buttonTextEn: s.button_text_en,
            buttonLink: s.button_link,
          })));
        }

        // --- About ---
        if (aboutData) setHomeAbout(aboutData);

        // --- Features ---
        if (featuresData && Array.isArray(featuresData)) {
          setHomeFeatures(featuresData.map((f: any) => ({
            icon: f.icon || "Coffee",
            title: f.title || "",
            titleEn: f.title_en || "",
            description: f.description || "",
            descriptionEn: f.description_en || "",
          })));
        }

        // --- CTA ---
        if (ctaData) setHomeCTA(ctaData);

      } catch (err) {
        console.error("Home: Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, []); // Static fetch once, content stays constant for now

  // Fallback for Hero Slides if none fetched
  const finalHeroSlides = heroSlides.length > 0 ? heroSlides : [
    {
      id: 1,
      image: "",
      title: "",
      subtitle: "",
      buttonText: dict.hero.buyNow,
      buttonLink: "/cafe",
    }
  ];

  return (
    <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden px-5 pb-10">
      {/* ——— HERO ——— */}
      <section className="relative h-[40vh] md:h-[50vh] w-full flex flex-col items-center justify-center text-white overflow-hidden rounded-[2rem] shadow-2xl mt-1">
        <HeroSlider slides={finalHeroSlides} />
      </section>

      {/* ——— SOBRE NOSOTROS ——— */}
      <AboutSection
        title={locale === "en" ? (homeAbout?.title_en || homeAbout?.title || dict.about.title) : (homeAbout?.title || dict.about.title)}
        description={locale === "en" ? (homeAbout?.description_en || homeAbout?.description || dict.about.description) : (homeAbout?.description || dict.about.description)}
        longDescription={locale === "en" ? (homeAbout?.long_description_en || homeAbout?.long_description || "") : (homeAbout?.long_description || "")}
        ctaText={locale === "en" ? (homeAbout?.cta_text_en || homeAbout?.cta_text || "") : (homeAbout?.cta_text || "")}
        imageSrc={homeAbout?.image}
      />

      {/* ——— ESTADÍSTICAS DE CONFIANZA ——— */}
      <StatsSection features={homeFeatures} />

      {/* ——— PRODUCTOS DESTACADOS ——— */}
      <FeaturedProducts
        title={locale === "en" ? "Our Favorites" : "Nuestros Favoritos"}
        subtitle={locale === "en"
          ? "Discover the flavors that our customers love the most."
          : "Descubre los sabores que más enamoran a nuestros clientes."}
        products={favoriteProducts}
        isLoading={loading}
        ctaText={locale === "en" ? "View all products" : "Ver todos los productos"}
        ctaLink="/productos"
      />

      {/* ——— CTA BANNER ——— */}
      <CTABanner
        title={locale === "en" ? (homeCTA?.title_en || homeCTA?.title || "") : (homeCTA?.title || "")}
        subtitle={locale === "en" ? (homeCTA?.subtitle_en || homeCTA?.subtitle || "") : (homeCTA?.subtitle || "")}
        ctaText={locale === "en" ? (homeCTA?.cta_text_en || homeCTA?.cta_text || "") : (homeCTA?.cta_text || "")}
        ctaLink={homeCTA?.cta_link || "/#footer"}
        backgroundImage={homeCTA?.background_image || ""}
      />

    </div>
  );
}
