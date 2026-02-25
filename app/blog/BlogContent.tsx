"use client";

import { CinematicHeader } from "@/components/CinematicHeader";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/types/api";
import { useLanguage } from "@/i18n/LanguageContext";


import { useState, useEffect } from "react";
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

  if (loading) {
    return (
      <div className="max-w-screen-lg mx-auto px-6 py-12 text-center">
        <p className="text-default-500">{dict.nav.cargando}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Page Header */}
      <CinematicHeader 
        title={dict.nav.blog} 
        subtitle={locale === "en" 
          ? "News, guides, and everything about the world of specialty coffee." 
          : "Noticias, guías y todo sobre el mundo del café especial."}
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {posts.length > 0 ? (
          posts.map((p: BlogPost) => (
            <BlogCard key={p.id} post={p} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-default-50 rounded-2xl">
            <p className="text-default-500">
              {locale === "en" ? "No news found yet." : "Aún no hay noticias publicadas."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
