"use client";

import {
  Card,
  CardBody,
  Avatar,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  useDisclosure,
} from "@heroui/react";
import { MapPinIcon } from "lucide-react";
import type { Client } from "@/types/api";
import { useLanguage } from "@/i18n/LanguageContext";
import MapEmbed from "@/components/MapEmbed";

export default function ClientCard({ client }: { client: Client }) {
  const { locale, dict } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* ───────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ───── Tarjeta resumen ───── */}
      <Card
        isPressable
        radius="lg"
        shadow="sm"
        onPress={onOpen}
        className="w-full h-full cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 group"
        aria-label={`Caso de éxito: ${client.name}`}
      >
        {/* Top Image (like BlogCard) */}
        <div className="overflow-hidden h-52 w-full relative">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
          <Image
            src={client.cover || "/hero-machinery.jpg"}
            alt={client.name}
            width={600}
            height={320}
            className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            removeWrapper
          />
        </div>

        <CardBody className="flex flex-col gap-4 p-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Avatar src={client.logo || undefined} name={client.name} size="sm" />
               <h3 className="font-bold text-lg text-default-900 line-clamp-1">{client.name}</h3>
            </div>
            
            {client.location && (
              <p className="flex items-center gap-1 text-sm text-default-500 mb-2">
                <MapPinIcon size={14} className="shrink-0 text-primary" />
                {client.location}
              </p>
            )}
            
            <p className="text-sm text-default-600 line-clamp-2 italic">
              &ldquo;{locale === "en" ? (client.testimonial_en || client.testimonial) : client.testimonial}&rdquo;
            </p>
          </div>

          <div className="mt-auto pt-2">
             <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:underline">
               {dict.productos.seeMore} <span className="text-lg">→</span>
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
                <h2 className="text-xl font-semibold">{client.name}</h2>

                {client.location && (
                  <div className="flex items-center gap-1 text-xs text-default-500">
                    <MapPinIcon size={14} className="shrink-0" />
                    {client.location}
                  </div>
                )}
              </DrawerHeader>

              <DrawerBody className="space-y-6 px-6 pb-8 max-h-[80vh] overflow-y-auto">
                {/* portada */}
                {client.cover && (
                  <Image
                    src={client.cover}
                    alt={`Portada de ${client.name}`}
                    width={900}
                    height={500}
                    className="w-full aspect-[16/9] rounded-lg object-cover"
                  />
                )}

                {/* testimonio */}
                {client.testimonial && (
                  <p className="whitespace-pre-line">
                    {locale === "en" ? (client.testimonial_en || client.testimonial) : client.testimonial}
                  </p>
                )}

                {/* galería */}
                {client.gallery.length > 0 && (
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {client.gallery.map((img) => (
                      <li key={img.id}>
                        <Image
                          src={img.image}
                          alt={img.alt || `Imagen ${img.id}`}
                          width={400}
                          height={225}
                          className="w-full aspect-[16/9] rounded-lg object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                )}

                {/* mapa estático */}

                {client.latitude && client.longitude && (
                  <MapEmbed
                    lat={parseFloat(client.latitude)}
                    lng={parseFloat(client.longitude)}
                    className="rounded-lg"
                  />
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
