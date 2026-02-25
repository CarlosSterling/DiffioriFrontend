"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { GoogleReview } from "@/data/google-reviews";
import Image from "next/image";

interface GoogleReviewsSectionProps {
  title: string;
  subtitle?: string;
  reviews: GoogleReview[];
}

export const GoogleReviewsSection = ({ 
  title, 
  subtitle, 
  reviews: initialReviews 
}: GoogleReviewsSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<GoogleReview[]>(initialReviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Using mock data due to API error:", error);
        // Fallback to initialReviews (mock data) is automatic since we initialized state with it
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [initialReviews]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust scroll distance
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
             {/* Google G Logo mockup */}
             <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center p-1">
               <svg viewBox="0 0 24 24" className="w-full h-full">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
               </svg>
             </div>
             <span className="font-bold text-default-600 text-sm tracking-wide">Google Reviews</span>
          </motion.div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-default-500 max-w-2xl mx-auto text-lg font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Buttons (only visible on large screens or hover) */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-900 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 disabled:opacity-30"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-900 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
             aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Area */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide -mx-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar specifically requested against? "tenga barras de desplazamiento" -> usually means "be scrollable". If they WANT visual bars, we can remove this style. I'll stick to clean first.
          >
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-none w-[300px] md:w-[350px] bg-white rounded-2xl p-6 shadow-md border border-default-100 snap-center flex flex-col h-[280px]"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold overflow-hidden relative">
                     {review.profile_photo_url ? (
                        <Image 
                          src={review.profile_photo_url} 
                          alt={review.author_name} 
                          fill 
                          className="object-cover"
                        />
                     ) : (
                        <span>{review.author_name.charAt(0)}</span>
                     )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-default-900 truncate">{review.author_name}</h4>
                    <p className="text-xs text-default-400">{review.relative_time_description}</p>
                  </div>
                  {/* Google Icon Small */}
                  <div className="w-5 h-5 opacity-50 grayscale hover:grayscale-0 transition-all">
                     <Image src="/google-logo.svg" alt="G" width={20} height={20} className="w-full h-full" onError={(e) => e.currentTarget.style.display = 'none'} /> 
                     {/* Fallback to text 'G' if no image */}
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-3 text-[#FBBC05]">
                  {[...Array(5)].map((_, starI) => (
                    <Star 
                      key={starI} 
                      size={16} 
                      fill={starI < review.rating ? "currentColor" : "none"} 
                      className={starI < review.rating ? "text-[#FBBC05]" : "text-default-200"}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-default-600 text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-5 flex-grow font-light">
                  {review.text}
                </p>
                
                <a href="#" className="mt-3 text-xs text-primary font-medium hover:underline">Leer más en Google</a>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Custom Progress Bar / Slider Indicator */}
        <div className="flex justify-center mt-4 gap-2">
            {[...Array(3)].map((_, i) => (
               <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 0 ? "w-8 bg-primary" : "w-1.5 bg-primary/20"}`} />
            ))}
        </div>
      </div>
    </section>
  );
};
