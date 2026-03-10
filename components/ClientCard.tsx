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
import { MapPinIcon, EyeIcon } from "lucide-react";
import type { Client } from "@/types/api";
import { useLanguage } from "@/i18n/LanguageContext";
import MapEmbed from "@/components/MapEmbed";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function ClientCard({ client }: { client: Client }) {
  const { locale, dict } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeImage, setActiveImage] = useState(client.cover || "");

  // Update activeImage when drawer opens or client changes
  useEffect(() => {
    if (isOpen) {
      setActiveImage(client.cover || "");
    }
  }, [isOpen, client.cover]);

  /* ───────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ───── Tarjeta resumen ───── */}
      <Card
        isPressable
        radius="lg"
        shadow="sm"
        onPress={onOpen}
        className="w-full max-w-sm h-full cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 border-none bg-default-50/50 group"
        aria-label={`Caso de éxito: ${client.name}`}
      >
        {/* Top Image (like BlogCard) */}
        <div className="overflow-hidden h-48 w-full relative">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
          <Image
            src={client.cover || "/hero-machinery.jpg"}
            alt={client.name}
            width={600}
            height={400}
            className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
            removeWrapper
          />
          {client.gallery && client.gallery.length > 0 && (
            <div className="absolute top-3 right-3 z-20">
              <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-bold text-primary flex items-center gap-1 shadow-sm">
                <EyeIcon size={12} />
                <span>{client.gallery.length + 1}</span>
              </div>
            </div>
          )}
        </div>

        <CardBody className="flex flex-col h-full gap-3 p-5">
          <div className="flex-grow">
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
          </div>

          {/* Testimonio resaltado */}
          {client.testimonial && (
            <div className="bg-primary-50/50 p-3 rounded-xl border border-primary-100/50 min-h-[70px] flex items-center">
              <p className="text-[13px] text-default-700 leading-relaxed italic border-l-2 border-primary-200 pl-3 line-clamp-3 w-full">
                &ldquo;{locale === "en" ? (client.testimonial_en || client.testimonial) : client.testimonial}&rdquo;
              </p>
            </div>
          )}

          <div className="mt-auto pt-1">
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
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-2xl bg-default-100 border border-default-200 flex items-center justify-center">
                    <Image
                      src={activeImage || client.cover || "/hero-machinery.jpg"}
                      alt={`Imagen de ${client.name}`}
                      width={900}
                      height={600}
                      className="w-full h-auto object-contain max-h-[50vh]"
                    />
                  </div>

                  {/* galería de miniaturas */}
                  {client.gallery && client.gallery.length > 0 && (
                    <div className="grid grid-cols-4 gap-3">
                      {/* Miniatura de Portada */}
                      <div
                        className={clsx(
                          "rounded-xl overflow-hidden border shadow-sm transition-all cursor-pointer aspect-square",
                          activeImage === client.cover ? "ring-2 ring-primary border-primary" : "border-default-200 opacity-70 hover:opacity-100"
                        )}
                        onClick={() => setActiveImage(client.cover || "")}
                      >
                        <Image
                          src={client.cover || "/hero-machinery.jpg"}
                          alt={client.name}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Otras miniaturas */}
                      {client.gallery.map((img) => (
                        <div
                          key={img.id}
                          className={clsx(
                            "rounded-xl overflow-hidden border shadow-sm transition-all cursor-pointer aspect-square",
                            activeImage === img.image ? "ring-2 ring-primary border-primary" : "border-default-200 opacity-70 hover:opacity-100"
                          )}
                          onClick={() => setActiveImage(img.image)}
                        >
                          <Image
                            src={img.image}
                            alt={(locale === "en" ? img.alt_en : img.alt) || img.alt || client.name}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Testimonio y Descripción */}
                  <div className="space-y-4">
                    {client.testimonial && (
                      <div className="bg-primary-50/50 p-6 rounded-2xl border border-primary-100/50">
                        <h4 className="text-primary-800 font-bold uppercase text-[10px] tracking-widest mb-2">Testimonio</h4>
                        <p className="text-default-700 leading-relaxed italic border-l-3 border-primary-200 pl-4 whitespace-pre-line text-lg">
                          &ldquo;{locale === "en" ? (client.testimonial_en || client.testimonial) : client.testimonial}&rdquo;
                        </p>
                      </div>
                    )}

                    {client.description && (
                      <div className="bg-default-50 p-6 rounded-2xl border border-default-100 italic font-medium">
                        <h4 className="text-default-400 font-bold uppercase text-[10px] tracking-widest mb-2">Detalles del Caso</h4>
                        <div
                          className="text-default-600 leading-relaxed whitespace-pre-line"
                        >
                          {locale === "en" ? (client.description_en || client.description) : client.description}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

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
