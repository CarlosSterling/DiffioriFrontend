"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Coffee, Award, Leaf, Truck, Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { HeroSlider } from "@/components/HeroSlider";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { GoogleReviewsSection } from "@/components/home/GoogleReviewsSection";
import { CTABanner } from "@/components/home/CTABanner";
import { googleReviews } from "@/data/google-reviews";
import { CoffeeProduct } from "@/data/coffee-products";
import { getProducts, API_URL, fetchHeroSlides, fetchHomeAbout, fetchHomeFeatures, fetchHomeCTA } from "@/lib/api";

const ICON_MAP: Record<string, any> = {
  Coffee,
  Award,
  Leaf,
  Truck,
  Heart,
};

export default function Home() {
  const { dict, locale } = useLanguage();
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
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
          productsData, 
          slidesData, 
          aboutData, 
          featuresData, 
          ctaData
        ] = await Promise.all([
          getProducts(),
          fetchHeroSlides(),
          fetchHomeAbout(),
          fetchHomeFeatures(),
          fetchHomeCTA(),
        ]);
        
        // --- Products ---
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
                  labelEn: `${v.weight} ${v.grind}`,
                  price: parseFloat(v.price)
                }))
              : [
                  { label: "Normal", labelEn: "Standard", price: parseFloat(p.price) }
                ]
          } as CoffeeProduct));
          setProducts(mapped);
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
            icon: ICON_MAP[f.icon] || Coffee,
            title: f.title,
            titleEn: f.title_en,
            description: f.description,
            descriptionEn: f.description_en,
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
      image: "/slider-prep.png",
      title: dict.hero.slides.prep.title,
      subtitle: dict.hero.slides.prep.desc,
      buttonText: dict.hero.buyNow,
      buttonLink: "/productos",
    }
  ];

  return (
    <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden px-5 pb-10">
      {/* ——— HERO ——— */}
      <section className="relative h-[65vh] w-full flex flex-col items-center justify-center text-white overflow-hidden rounded-[2rem] shadow-2xl mt-4">
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

      {/* ——— POR QUÉ ELEGIRNOS ——— */}
      <FeaturesSection 
        title={locale === "en" ? "Why Choose Us" : "¿Por qué elegirnos?"}
        features={homeFeatures.map(f => ({
          ...f,
          title: locale === "en" ? (f.titleEn || f.title) : f.title,
          description: locale === "en" ? (f.descriptionEn || f.description) : f.description
        }))}
      />

      {/* ——— PRODUCTOS DESTACADOS ——— */}
      <FeaturedProducts 
        title={locale === "en" ? "Our Favorites" : "Nuestros Favoritos"}
        subtitle={locale === "en" 
          ? "Discover the flavors that our customers love the most." 
          : "Descubre los sabores que más enamoran a nuestros clientes."}
        products={products.slice(0, 3)}
        isLoading={loading}
        ctaText={locale === "en" ? "View all products" : "Ver todos los productos"}
      />

      {/* ——— GOOGLE REVIEWS ——— */}
      <GoogleReviewsSection
        title={locale === "en" ? "What Our Clients Say" : "Lo que dicen nuestros clientes"}
        subtitle={locale === "en" 
          ? "Ratings and reviews from our Google profile." 
          : "Calificaciones y opiniones de nuestro perfil de Google."}
        reviews={googleReviews}
      />

      {/* ——— CTA BANNER ——— */}
      <CTABanner
        title={locale === "en" ? (homeCTA?.title_en || homeCTA?.title || "") : (homeCTA?.title || "")}
        subtitle={locale === "en" ? (homeCTA?.subtitle_en || homeCTA?.subtitle || "") : (homeCTA?.subtitle || "")}
        ctaText={locale === "en" ? (homeCTA?.cta_text_en || homeCTA?.cta_text || "") : (homeCTA?.cta_text || "")}
        ctaLink={homeCTA?.cta_link || "/#footer"}
        backgroundImage={homeCTA?.background_image || "/coffee-farm-hero.png"}
      />
      
    </div>
  );
}

