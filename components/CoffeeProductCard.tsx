"use client";

import { useState } from "react";
import { Card, CardBody, CardFooter, Button, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon, ZapIcon, CheckIcon, ChevronDownIcon, EyeIcon, InfoIcon } from "lucide-react";
import type { CoffeeProduct } from "@/data/coffee-products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function CoffeeProductCard({ product }: { product: CoffeeProduct }) {
  const { locale, dict } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const name = (locale === "en" ? product.nameEn : product.name) || product.name;

  // Fallback para shortDesc si está vacío
  const rawShortDesc = (locale === "en" ? product.shortDescEn : product.shortDesc) || product.shortDesc;
  const rawDescription = (locale === "en" ? product.descriptionEn : product.description) || product.description;

  const shortDesc = rawShortDesc || (rawDescription ?
    (rawDescription.length > 100 ? rawDescription.substring(0, 97) + "..." : rawDescription)
    : "");

  const [selectedVariant, setSelectedVariant] = useState(
    locale === "en" ? product.variants[0].labelEn : product.variants[0].label,
  );
  const [justAdded, setJustAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState(product.image);

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
      variantId: currentVariant?.id ?? "",
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
      variantId: currentVariant?.id ?? "",
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
    <>
      <Card 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full max-w-[500px] h-[780px] border border-white/40 dark:border-white/5 bg-white/80 dark:bg-black/60 backdrop-blur-2xl overflow-hidden group transition-all duration-700 relative flex flex-col"
        style={{
          transform: hovered ? "translateY(-10px)" : "translateY(0)",
          transition: "all 800ms cubic-bezier(0.23, 1, 0.32, 1)",
          boxShadow: hovered
            ? "0 40px 80px -15px rgba(74, 55, 40, 0.25), 0 0 40px rgba(197, 160, 89, 0.15)"
            : "0 10px 40px -10px rgba(0,0,0,0.08)",
          borderRadius: "32px",
        }}
      >
        {/* Aura Glow Effect behind card */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 -z-10 bg-gradient-to-tr from-gold/20 via-primary/5 to-transparent blur-[80px] rounded-full pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Golden Border Glow on hover */}
        <div className={clsx(
          "absolute inset-0 border-2 transition-opacity duration-1000 rounded-[32px] pointer-events-none z-30",
          hovered ? "opacity-100 border-gold/40" : "opacity-0 border-transparent"
        )} />
        {/* Shine Effect */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={hovered ? { x: "200%", opacity: [0, 0.3, 0] } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            transform: "skewX(-25deg)",
          }}
        />

        {/* Image */}
        <div
          className="relative h-[380px] w-full overflow-hidden flex items-center justify-center bg-transparent cursor-pointer group/img shrink-0"
          onClick={onOpen}
        >
          {/* Jewel Glow Background / Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={hovered ? { opacity: 0.6, scale: 1.1 } : { opacity: 0.3, scale: 0.8 }}
            className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] -z-10 pointer-events-none"
          />

          {/* Vignette/Mask to soften image edges */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 dark:from-black/60 to-transparent z-10 pointer-events-none" />

          <Image
            src={product.image}
            alt={name}
            width={400}
            height={400}
            style={{
              transform: hovered ? "scale(1.07) translateY(-4px)" : "scale(1) translateY(0)",
              transition: "transform 800ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            className="h-full w-full object-contain"
            fallbackSrc="/placeholder-coffee.svg"
          />
          {/* Gallery Overlay */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-white/20">
                <EyeIcon size={12} />
                <span>{product.gallery.length + 1}</span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center z-10">
            <div className="bg-background/90 dark:bg-content1/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover/img:opacity-100 transition-all scale-90 group-hover/img:scale-100 shadow-xl text-primary flex items-center justify-center">
              <EyeIcon size={24} />
            </div>
          </div>
        </div>

        <CardBody className="px-6 py-4 flex-grow flex flex-col justify-between overflow-hidden">
          <div className="space-y-1 text-center">
            <h3 className="font-black text-2xl leading-tight h-[4rem] flex items-center justify-center font-montserrat uppercase tracking-widest text-[#4A3728] dark:text-primary-100 overflow-hidden line-clamp-2">
              {name}
            </h3>
            <p className="text-default-600 dark:text-default-400 text-base line-clamp-2 h-[3rem] flex items-center justify-center font-normal leading-relaxed overflow-hidden">
              {shortDesc}
            </p>
          </div>

          {/* Prices & Variant Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-6 lg:gap-2 mt-4 pt-4 border-t border-default-100/50">
            <div className="flex flex-col items-start min-w-0">
              <span className="text-[10px] uppercase tracking-[0.2em] text-default-400 font-extrabold mb-1 whitespace-nowrap">
                {dict.productos.price}
              </span>
              <span className="text-3xl font-black text-[#4A3728] dark:text-gold-light leading-none whitespace-nowrap">
                {fmt(currentPrice)}
              </span>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-1.5 min-w-0 flex-grow">
              <span className="text-[10px] uppercase tracking-[0.2em] text-default-400 font-extrabold mb-1 whitespace-nowrap">
                {dict.cafe.variant}
              </span>
              {product.variants.length > 1 ? (
                <Dropdown
                  placement="bottom-end"
                  shadow="lg"
                  className="min-w-[200px] border border-white/20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl"
                >
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      radius="full"
                      size="sm"
                      className="group bg-primary/5 hover:bg-primary/10 text-[11px] font-bold text-primary-800 dark:text-primary-200 transition-all px-4 h-10 w-full lg:w-auto justify-between border border-primary/10"
                      endContent={
                        <ChevronDownIcon
                          size={16}
                          className="text-primary group-hover:translate-y-0.5 transition-transform flex-shrink-0"
                        />
                      }
                    >
                      <span className="truncate mr-2">{selectedVariant}</span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label={dict.cafe.variant}
                    selectionMode="single"
                    selectedKeys={new Set([selectedVariant])}
                    onSelectionChange={(keys) => {
                      const val = Array.from(keys)[0] as string;
                      if (val) setSelectedVariant(val);
                    }}
                    itemClasses={{
                      base: [
                        "rounded-lg",
                        "py-2.5",
                        "px-3",
                        "transition-all",
                        "data-[hover=true]:text-primary",
                        "data-[hover=true]:bg-primary-100/30",
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
                <div className="bg-default-100/40 px-4 py-2 rounded-full border border-default-100 h-10 flex items-center w-full lg:w-auto justify-start lg:justify-end">
                  <span className="text-xs font-bold text-default-600 truncate">
                    {selectedVariant}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardBody>

        <CardFooter className="px-5 pb-6 pt-2 flex flex-col gap-3 shrink-0">
          <Button
            fullWidth
            size="lg"
            radius="lg"
            className={clsx("font-bold h-14 text-sm", !justAdded && "btn-gold-premium")}
            style={justAdded ? { backgroundColor: "#E8D4B0", color: "#4A3728" } : {}}
            startContent={justAdded ? <CheckIcon size={20} /> : <ShoppingCartIcon size={20} />}
            onPress={handleAdd}
          >
            {justAdded ? dict.cafe.added : dict.cafe.addToCart}
          </Button>
          <Button
            fullWidth
            size="md"
            radius="lg"
            variant="flat"
            className="font-bold h-11 text-xs bg-primary/10 text-[#4A3728] dark:text-gold-light border border-primary/20 hover:bg-primary/20 transition-all"
            startContent={<ZapIcon size={16} />}
            onPress={handleBuyNow}
          >
            {dict.cafe.buyNow}
          </Button>
        </CardFooter>
       </Card>
      
      {/* Gallery & Details Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        scrollBehavior="inside"
        backdrop="blur"
        className="bg-background/95 backdrop-blur-md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-foreground">{name}</h2>
              </ModalHeader>
              <ModalBody className="pb-10 px-4 md:px-10">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left: Photos */}
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-2xl bg-default-100 border border-default-200 flex items-center justify-center relative touch-none">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeModalImage}
                          src={activeModalImage || product.image}
                          alt={name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.3}
                          onDragEnd={(_, info) => {
                            const gallery = product.gallery || [];
                            const allImages = [product.image, ...gallery.map(g => g.image)];
                            const currentIndex = allImages.indexOf(activeModalImage);
                            
                            if (info.offset.x > 50 && currentIndex > 0) {
                              setActiveModalImage(allImages[currentIndex - 1]);
                            } else if (info.offset.x < -50 && currentIndex < allImages.length - 1) {
                              setActiveModalImage(allImages[currentIndex + 1]);
                            }
                          }}
                          className="w-full h-auto object-contain max-h-[50vh] cursor-grab active:cursor-grabbing"
                        />
                      </AnimatePresence>
                    </div>

                    {(product.gallery && product.gallery.length > 0) && (
                      <div className="grid grid-cols-4 gap-3">
                        {/* Main Cover Thumbnail */}
                        <div
                          className={clsx(
                            "rounded-xl overflow-hidden border shadow-sm transition-all cursor-pointer aspect-square",
                            activeModalImage === product.image ? "ring-2 ring-primary border-primary" : "border-default-200 opacity-70 hover:opacity-100"
                          )}
                          onClick={() => setActiveModalImage(product.image)}
                        >
                          <Image
                            src={product.image}
                            alt={name}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Gallery Thumbnails */}
                        {product.gallery.map((img) => (
                          <div
                            key={img.id}
                            className={clsx(
                              "rounded-xl overflow-hidden border shadow-sm transition-all cursor-pointer aspect-square",
                              activeModalImage === img.image ? "ring-2 ring-primary border-primary" : "border-default-200 opacity-70 hover:opacity-100"
                            )}
                            onClick={() => setActiveModalImage(img.image)}
                          >
                            <Image
                              src={img.image}
                              alt={img.alt || name}
                              width={150}
                              height={150}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Info */}
                  <div className="flex flex-col h-full text-center md:text-left items-center md:items-start">
                    <div className="bg-primary-50/50 p-6 rounded-2xl border border-primary-100/50 mb-6 w-full">
                      <h4 className="text-primary-800 font-bold uppercase text-[10px] tracking-widest mb-2">{dict.productos.description}</h4>
                      <p className="text-default-700 leading-relaxed text-base border-l-3 border-primary-200 pl-4 text-left">
                        {rawDescription || shortDesc}
                      </p>
                    </div>

                    <div className="space-y-6 flex-grow w-full">
                      <div>
                        <h4 className="text-default-400 font-bold uppercase text-[10px] tracking-widest mb-1">{dict.productos.price}</h4>
                        <p className="text-4xl font-black text-[#606060] dark:text-gray-300">{fmt(currentPrice)}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-default-400 font-bold uppercase text-[10px] tracking-widest">{dict.cafe.variant}</h4>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-tight border border-emerald-500/20">{dict.cafe.available}</span>
                        </div>
 
                        {product.variants.length > 1 ? (
                          <Dropdown placement="bottom" shadow="sm" className="min-w-[240px] border-none bg-content1 shadow-xl">
                            <DropdownTrigger>
                              <Button
                                variant="bordered"
                                radius="lg"
                                size="lg"
                                className="w-full justify-between font-bold text-default-700 border-default-200 hover:border-primary/50 hover:bg-primary/5 transition-all h-12"
                                endContent={<ChevronDownIcon size={18} className="text-primary" />}
                              >
                                {selectedVariant}
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label={dict.cafe.variant}
                              selectionMode="single"
                              selectedKeys={new Set([selectedVariant])}
                              onSelectionChange={(keys) => {
                                const val = Array.from(keys)[0] as string;
                                if (val) setSelectedVariant(val);
                                // Automatically update active modal image if it's the main cover
                                if (activeModalImage === product.image) {
                                   // do nothing for now
                                }
                              }}
                              itemClasses={{
                                base: [
                                  "rounded-xl", "py-3", "px-4", "transition-all",
                                  "data-[hover=true]:text-primary-900", "data-[hover=true]:bg-primary-50",
                                  "text-sm font-semibold",
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
                          <div className="bg-default-50 border border-default-100 p-3 rounded-xl font-bold text-default-600">
                            {selectedVariant}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-default-400 font-bold uppercase text-[10px] tracking-widest mb-2">{dict.productos.category}</h4>
                        <div className="inline-flex items-center gap-2 bg-default-100 px-3 py-1 rounded-full text-xs font-bold text-default-600">
                          <CheckIcon size={12} className="text-primary" />
                          {(locale === "en" ? product.categoryEn : product.category).toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-3 w-full">
                      <Button
                        fullWidth
                        size="lg"
                        className="font-bold h-14 text-lg btn-gold-premium px-4"
                        startContent={<ShoppingCartIcon size={20} />}
                        onPress={() => {
                          handleAdd();
                          onClose();
                        }}
                      >
                        {dict.cafe.addToCart}
                      </Button>
                      <Button
                        variant="light"
                        fullWidth
                        size="sm"
                        className="text-default-400 font-medium"
                        onPress={onClose}
                      >
                        {dict.cart.continueShopping}
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
