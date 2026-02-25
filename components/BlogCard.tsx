"use client";
import { Image, Card, CardBody, Avatar, Drawer, DrawerContent, DrawerHeader, DrawerBody, useDisclosure } from "@heroui/react";
import { CalendarIcon } from "lucide-react";
import type { BlogPost } from "@/types/api";
import { useLanguage } from "@/i18n/LanguageContext";

export default function BlogCard({ post }: { post: BlogPost }) {
  const { locale, dict } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = locale === "en" ? (post.title_en || post.title) : post.title;
  const excerpt = locale === "en" ? (post.excerpt_en || post.excerpt) : post.excerpt;
  const dateStr = post.published_at 
    ? new Date(post.published_at).toLocaleDateString(locale === "en" ? "en-US" : "es-CO", { day: 'numeric', month: 'long', year: 'numeric' }) 
    : (locale === "en" ? "Draft" : "Borrador");

  return (
    <>
      <Card 
        isPressable 
        radius="lg" 
        shadow="sm" 
        onPress={onOpen} 
        className="w-full h-full cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 group"
        aria-label={`Leer artículo: ${title}`}
      >
        {/* Top Image */}
        <div className="overflow-hidden h-52 w-full relative">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
          <Image
            src={post.cover_image || "/coffee-farm-hero.png"}
            alt={title}
            width={600}
            height={320}
            className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            removeWrapper
          />
        </div>

        <CardBody className="flex flex-col gap-4 p-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Avatar src="/logo-icon.png" name="Diffiori" size="sm" className="bg-primary/10" />
               <h3 className="font-bold text-lg text-default-900 line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
            </div>
            
            <p className="flex items-center gap-1 text-sm text-default-500 mb-2">
              <CalendarIcon size={14} className="shrink-0 text-primary" />
              {dateStr}
            </p>
            
            <p className="text-sm text-default-600 line-clamp-3 leading-relaxed italic">
              &ldquo;{excerpt}&rdquo;
            </p>
          </div>

          <div className="mt-auto pt-2">
             <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:underline">
               {dict.nav.leerMas} <span className="text-lg">→</span>
             </span>
          </div>
        </CardBody>
      </Card>

      {/* ───── Drawer detalle ───── */}
      <Drawer isOpen={isOpen} onClose={onClose} size="lg">
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex-col gap-2 pb-0">
                <h2 className="text-2xl font-bold font-display">
                  {title}
                </h2>
                <p className="text-sm text-default-500">
                  {dateStr}
                </p>
              </DrawerHeader>

              <DrawerBody className="space-y-6 px-6 pb-8 max-h-[80vh] overflow-y-auto">
                <Image
                  src={post.cover_image || "/coffee-farm-hero.png"}
                  alt={title}
                  width={900}
                  height={500}
                  className="w-full aspect-[16/9] rounded-lg object-cover"
                />

                <div 
                  className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-default-600 space-y-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: locale === "en" ? (post.content_en || post.content) : post.content }}
                />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
