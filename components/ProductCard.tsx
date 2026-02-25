"use client";
import {
  Card,
  CardFooter,
  Image,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import type { Product } from "@/types/api";

export default function ProductCard({ product }: { product: Product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hovered, setHovered] = useState(false);
  const coverSrc = product.cover ?? "/placeholder.jpg";

  return (
    <>
      {/* ------------ CARD ------------- */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
          transition: "transform 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          boxShadow: hovered
            ? "0 28px 52px -12px rgba(0,0,0,0.30), 0 14px 28px -8px rgba(0,0,0,0.20)"
            : "0 4px 16px -4px rgba(0,0,0,0.12)",
          borderRadius: "14px",
        }}
      >
      <Card radius="lg" isFooterBlurred className="border-none overflow-hidden">
        <div className="h-64 w-full overflow-hidden">
          <Image
            src={coverSrc}
            alt={product.name}
            width={640}
            height={420}
            style={{
              transform: hovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 1100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            className="h-64 w-full object-cover rounded-b-none"
          />
        </div>

        <div className="p-4 py-3 flex flex-col gap-1.5">
          <h3 className="text-foreground font-bold text-lg truncate leading-tight">{product.name}</h3>
          
          <p className="text-default-500 text-xs line-clamp-2">
            {product.short_desc || (product.description ? 
              (product.description.length > 100 ? product.description.substring(0, 97) + "..." : product.description) 
              : "")}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-primary font-bold text-lg">
              {Number(product.price).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </span>
            <Button size="sm" radius="lg" color="primary" onPress={onOpen}>
              Ver más
            </Button>
          </div>
        </div>
      </Card>
      </div>

      {/* ------------ DRAWER ------------- */}
      <Drawer size="3xl" isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader>{product.name}</DrawerHeader>

              <DrawerBody className="space-y-6">
                {/* GALERÍA RESPONSIVA */}
                {product.gallery.length > 0 && (
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                    {product.gallery.map((img) => (
                      <Image
                        key={img.id}
                        src={img.image}
                        alt={img.alt || product.name}
                        width={400}
                        height={260}
                        className="rounded-lg h-40 w-full object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                <p>{product.short_desc}</p>
                {/* Descripción en viñetas */}
                <ul className="list-disc pl-5 space-y-1">
                  {product.description
                    .split(/\r?\n/)
                    .map(
                      (line, idx) => line.trim() && <li key={idx}>{line}</li>
                    )}
                </ul>

                <div className="flex items-center gap-3 bg-primary-50 p-4 rounded-xl">
                  <span className="text-primary-700 font-medium">Precio:</span>
                  <span className="text-2xl font-bold text-primary-800">
                    {Number(product.price).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="light" color="danger" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" as="a" href="/contact">
                  Cotizar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
