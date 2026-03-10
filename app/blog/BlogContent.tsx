"use client";

import { useState, useEffect } from "react";
import { CinematicHeader } from "@/components/CinematicHeader";
import BlogCard from "@/components/BlogCard";
import { BlogSkeleton } from "@/components/BlogSkeleton";
import type { BlogPost } from "@/types/api";
import { useLanguage } from "@/i18n/LanguageContext";
import { fetchPosts } from "@/lib/api";

export default function BlogContent() {
  const { dict, locale } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Page Header */}
      <CinematicHeader
        preTitle={locale === "en" ? "NEWS & CULTURE" : "NOTICIAS Y CULTURA"}
        title={dict.nav.blog}
        subtitle={locale === "en"
          ? "News, guides, and everything about the world of specialty coffee."
          : "Noticias, guías y todo sobre el mundo del café especial."}
      />

      <div className="flex flex-wrap justify-center items-stretch gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <BlogSkeleton key={`skeleton-${i}`} />
          ))
        ) : posts.length > 0 ? (
          posts.map((p: BlogPost) => (
            <BlogCard key={p.id} post={p} />
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
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8" />
                <path d="M15 18h-5" />
                <path d="M10 6h8v4h-8V6Z" />
              </svg>
            </div>
            <p className="text-default-500 text-lg font-light italic">
              {locale === "en" ? "No news found yet. Subscribe for updates!" : "Aún no hay noticias publicadas. ¡Suscríbete para novedades!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
