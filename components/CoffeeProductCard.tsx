"use client";

import { useState } from "react";
import { Card, CardBody, CardFooter, Button, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon, ZapIcon, CheckIcon, ChevronDownIcon } from "lucide-react";
import type { CoffeeProduct } from "@/data/coffee-products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/i18n/LanguageContext";

export default function CoffeeProductCard({ product }: { product: CoffeeProduct }) {
  const { locale, dict } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();

  const name = locale === "en" ? product.nameEn : product.name;
  
  // Fallback para shortDesc si está vacío
  const rawShortDesc = locale === "en" ? product.shortDescEn : product.shortDesc;
  const rawDescription = locale === "en" ? product.descriptionEn : product.description;
  
  const shortDesc = rawShortDesc || (rawDescription ? 
    (rawDescription.length > 100 ? rawDescription.substring(0, 97) + "..." : rawDescription) 
    : "");

  const [selectedVariant, setSelectedVariant] = useState(
    locale === "en" ? product.variants[0].labelEn : product.variants[0].label,
  );
  const [justAdded, setJustAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  // Random "Best Seller" / "New" logic for demo visual vitality (replace with real logic later)
  const isBestSeller = product.id === "cafe-origen-supremo" || product.id === "cafe-micro-lote";
  const isNew = product.id === "cafe-honey-process";

  const getVariantLabel = (v: typeof product.variants[0]) =>
    locale === "en" ? v.labelEn : v.label;

  const currentVariant = product.variants.find(
    (v) => getVariantLabel(v) === selectedVariant
  );
  
  const currentPrice = currentVariant?.price || product.price;

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name,
      price: currentPrice,
      image: product.image,
      variant: selectedVariant,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      name,
      price: currentPrice,
      image: product.image,
      variant: selectedVariant,
    });
    router.push("/checkout");
  };

  const fmt = (n: number) =>
    n.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

  return (
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
    <Card className="w-full max-w-sm border-none overflow-hidden">
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden flex items-center justify-center bg-default-50/50">
        <Image
          src={product.image}
          alt={name}
          width={400}
          height={400}
          style={{
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 1100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          className="h-full w-full object-cover"
          fallbackSrc="/placeholder-coffee.svg"
        />
      </div>

      <CardBody className="px-4 py-3 flex-grow flex flex-col justify-between">
        <div className="space-y-0.5 text-center">
          <h3 className="font-bold text-lg leading-tight min-h-[2.5rem] flex items-center justify-center">{name}</h3>
          <p className="text-default-500 text-xs line-clamp-2 min-h-[2rem]">{shortDesc}</p>
        </div>

        {/* Prices & Variant Row */}
        <div className="flex items-end justify-between px-0.5 mt-4 border-t border-default-100 pt-3 gap-2">
           <div className="flex flex-col items-start flex-shrink-0">
             <span className="text-[9px] uppercase tracking-wider text-default-400 font-bold mb-1">Precio</span>
             <span className="text-xl font-black text-primary-900 leading-none">
               {fmt(currentPrice)}
             </span>
           </div>
           
           <div className="flex flex-col items-end gap-1 flex-grow min-w-0">
             <span className="text-[9px] uppercase tracking-wider text-default-400 font-bold whitespace-nowrap">Presentación</span>
             {product.variants.length > 1 ? (
                <Dropdown placement="bottom-end" shadow="lg" className="min-w-[200px] border-none bg-white/90 backdrop-blur-md">
                  <DropdownTrigger>
                    <Button 
                      variant="light" 
                      radius="full"
                      size="sm"
                      className="group bg-default-100/50 hover:bg-primary-50 text-[10px] font-bold text-default-700 hover:text-primary-900 transition-all px-3 h-7 w-full max-w-[140px] justify-between border border-transparent hover:border-primary-100"
                      endContent={<ChevronDownIcon size={12} className="text-default-400 group-hover:text-primary-600 group-hover:translate-y-0.5 transition-all" />}
                    >
                      <span className="truncate">{selectedVariant}</span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    aria-label="Variantes de Café"
                    selectionMode="single"
                    selectedKeys={new Set([selectedVariant])}
                    onSelectionChange={(keys) => {
                       const val = Array.from(keys)[0] as string;
                       if (val) setSelectedVariant(val);
                    }}
                    itemClasses={{
                      base: [
                        "rounded-lg",
                        "py-2",
                        "px-3",
                        "transition-all",
                        "data-[hover=true]:text-primary-900",
                        "data-[hover=true]:bg-primary-50",
                        "data-[selectable=true]:focus:bg-primary-100/50",
                        "text-xs font-medium",
                      ],
                    }}
                  >
                    {product.variants.map((v) => (
                      <DropdownItem key={getVariantLabel(v)}>
                        {getVariantLabel(v)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
             ) : (
               <div className="bg-default-100/40 px-3 py-1 rounded-full border border-default-100 h-7 flex items-center">
                 <span className="text-[10px] font-bold text-default-600 truncate max-w-[100px]">
                    {selectedVariant}
                 </span>
               </div>
             )}
           </div>
        </div>
      </CardBody>

      <CardFooter className="px-4 pb-4 pt-0 flex flex-col gap-2">
        <Button
          color="primary"
          variant={justAdded ? "flat" : "shadow"}
          fullWidth
          size="lg"
          className="font-bold"
          style={justAdded ? { backgroundColor: "#E8D4B0", color: "#1a1a1a" } : {}}
          startContent={justAdded ? <CheckIcon size={20} /> : <ShoppingCartIcon size={20} />}
          onPress={handleAdd}
        >
          {justAdded ? dict.cafe.added : dict.cafe.addToCart}
        </Button>
        <Button
          color="primary"
          variant="light"
          fullWidth
          size="md"
          className="font-semibold"
          startContent={<ZapIcon size={18} />}
          onPress={handleBuyNow}
        >
          {dict.cafe.buyNow}
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
}
