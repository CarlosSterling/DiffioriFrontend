/* ──────────────  Coffee Product Data  ────────────── */

export interface CoffeeVariant {
  label: string;
  labelEn: string;
  price?: number;
}

export interface CoffeeProduct {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  price: number;
  shortDesc: string;
  shortDescEn: string;
  description: string;
  descriptionEn: string;
  category: "specialty" | "blend" | "decaf" | "accessories";
  variants: CoffeeVariant[];
}

export const coffeeProducts: CoffeeProduct[] = [
  {
    id: "cafe-origen-supremo",
    name: "Café Origen Supremo",
    nameEn: "Supremo Origin Coffee",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop",
    price: 35000,
    shortDesc: "Café 100% arábica, notas de chocolate y caramelo.",
    shortDescEn: "100% Arabica coffee, chocolate and caramel notes.",
    description:
      "Granos seleccionados a mano en las fincas del Huila, tostados a un perfil medio que resalta notas de chocolate oscuro, caramelo y un toque cítrico. Ideal para cualquier método de preparación.",
    descriptionEn:
      "Hand-selected beans from Huila farms, roasted to a medium profile highlighting dark chocolate, caramel notes and a citrus touch. Ideal for any brewing method.",
    category: "specialty",
    variants: [
      { label: "Molido 250g", labelEn: "Ground 250g", price: 22000 },
      { label: "Molido 500g", labelEn: "Ground 500g", price: 30000 },
      { label: "Grano 250g", labelEn: "Whole Bean 250g", price: 22000 },
      { label: "Grano 500g", labelEn: "Whole Bean 500g", price: 35000 },
    ],
  },
  {
    id: "cafe-excelso-huila",
    name: "Café Excelso del Huila",
    nameEn: "Huila Excelso Coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    price: 28000,
    shortDesc: "Suave y balanceado, perfecto para el día a día.",
    shortDescEn: "Smooth and balanced, perfect for everyday.",
    description:
      "Mezcla excelsa con cuerpo medio, acidez suave y un final dulce. Cultivado a 1.700 msnm en el corazón cafetero del Huila.",
    descriptionEn:
      "Excelso blend with medium body, mild acidity and a sweet finish. Grown at 1,700 masl in the heart of Huila's coffee region.",
    category: "blend",
    variants: [
      { label: "Molido 250g", labelEn: "Ground 250g", price: 22000 },
      { label: "Molido 500g", labelEn: "Ground 500g", price: 30000 },
      { label: "Grano 500g", labelEn: "Whole Bean 500g", price: 35000 },
    ],
  },
  {
    id: "cafe-honey-process",
    name: "Café Honey Process",
    nameEn: "Honey Process Coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    price: 42000,
    shortDesc: "Proceso honey, notas de miel y frutos rojos.",
    shortDescEn: "Honey process, honey and red fruit notes.",
    description:
      "Café procesado con método honey que conserva parte del mucílago, creando un perfil dulce con notas de miel, frutos rojos y cuerpo aterciopelado.",
    descriptionEn:
      "Coffee processed with the honey method that retains part of the mucilage, creating a sweet profile with honey, red fruit notes and a velvety body.",
    category: "specialty",
    variants: [
      { label: "Molido 250g", labelEn: "Ground 250g", price: 26000 },
      { label: "Grano 250g", labelEn: "Whole Bean 250g", price: 26000 },
      { label: "Grano 500g", labelEn: "Whole Bean 500g", price: 42000 },
    ],
  },
  {
    id: "cafe-micro-lote",
    name: "Café Micro Lote Especial",
    nameEn: "Special Micro Lot Coffee",
    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=800&auto=format&fit=crop",
    price: 55000,
    shortDesc: "Edición limitada de finca única, puntaje +86.",
    shortDescEn: "Limited edition single farm, score +86.",
    description:
      "Micro lote del productor Hernán Muñoz, altura 1.900 msnm. Notas florales, jazmín, mandarina y panela. Proceso lavado con secado al sol. Puntaje SCA 86.5.",
    descriptionEn:
      "Micro lot from producer Hernán Muñoz, altitude 1,900 masl. Floral notes, jasmine, tangerine and panela. Washed process with sun drying. SCA score 86.5.",
    category: "specialty",
    variants: [
      { label: "Grano 250g", labelEn: "Whole Bean 250g", price: 32000 },
      { label: "Grano 500g", labelEn: "Whole Bean 500g", price: 55000 },
    ],
  },
  {
    id: "cafe-descafeinado",
    name: "Café Descafeinado Natural",
    nameEn: "Natural Decaf Coffee",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop",
    price: 32000,
    shortDesc: "Todo el sabor, sin la cafeína. Proceso con agua.",
    shortDescEn: "All the flavor, without the caffeine. Water process.",
    description:
      "Descafeinado mediante proceso suizo con agua, conservando el bouquet aromático del café de altura. Notas de nuez, cacao y un final suave.",
    descriptionEn:
      "Decaffeinated using Swiss Water Process, preserving the aromatic bouquet of high-altitude coffee. Notes of walnut, cocoa and a smooth finish.",
    category: "decaf",
    variants: [
      { label: "Molido 250g", labelEn: "Ground 250g", price: 24000 },
      { label: "Molido 500g", labelEn: "Ground 500g", price: 38000 },
    ],
  },
  {
    id: "cafe-cold-brew",
    name: "Café para Cold Brew",
    nameEn: "Cold Brew Coffee",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
    price: 30000,
    shortDesc: "Molido grueso, ideal para extracción en frío.",
    shortDescEn: "Coarse ground, ideal for cold extraction.",
    description:
      "Tostado medio-oscuro con molienda gruesa diseñada para cold brew. Notas de chocolate amargo, cereza y un cuerpo redondo que brilla en frío.",
    descriptionEn:
      "Medium-dark roast with coarse grind designed for cold brew. Notes of dark chocolate, cherry and a round body that shines cold.",
    category: "blend",
    variants: [
      { label: "Molido 250g", labelEn: "Ground 250g", price: 22000 },
      { label: "Molido 500g", labelEn: "Ground 500g", price: 35000 },
    ],
  },
  {
    id: "cafe-espresso-blend",
    name: "Blend Espresso Diffiori",
    nameEn: "Diffiori Espresso Blend",
    image: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=800&auto=format&fit=crop",
    price: 38000,
    shortDesc: "Mezcla para espresso con crema dorada y cuerpo fuerte.",
    shortDescEn: "Espresso blend with golden crema and strong body.",
    description:
      "Blend creado para máquinas de espresso: tostado oscuro, crema dorada persistente, notas de cacao, avellana y especias. Cuerpo fuerte y final largo.",
    descriptionEn:
      "Blend crafted for espresso machines: dark roast, persistent golden crema, notes of cocoa, hazelnut and spices. Strong body and long finish.",
    category: "blend",
    variants: [
      { label: "Molido espresso 250g", labelEn: "Espresso Ground 250g", price: 25000 },
      { label: "Grano 250g", labelEn: "Whole Bean 250g", price: 25000 },
      { label: "Grano 500g", labelEn: "Whole Bean 500g", price: 40000 },
    ],
  },
  {
    id: "cafe-organico",
    name: "Café Orgánico Certificado",
    nameEn: "Certified Organic Coffee",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop",
    price: 45000,
    shortDesc: "Certificación orgánica, sin agroquímicos.",
    shortDescEn: "Organic certification, no agrochemicals.",
    description:
      "Café cultivado bajo sombra sin agroquímicos, con certificación orgánica. Notas de caña de azúcar, naranja y un cuerpo medio-alto. Amigable con el planeta.",
    descriptionEn:
      "Shade-grown coffee without agrochemicals, with organic certification. Notes of sugar cane, orange and a medium-high body. Planet friendly.",
    category: "specialty",
    variants: [
      { label: "Molido 250g", labelEn: "Ground 250g", price: 28000 },
      { label: "Grano 250g", labelEn: "Whole Bean 250g", price: 28000 },
      { label: "Grano 500g", labelEn: "Whole Bean 500g", price: 48000 },
    ],
  },
  {
    id: "cafe-pasilla",
    name: "Café Pasilla Premium",
    nameEn: "Premium Pasilla Coffee",
    image: "https://images.unsplash.com/photo-1506372023823-741c83b836fe?q=80&w=800&auto=format&fit=crop",
    price: 20000,
    shortDesc: "Cuerpo fuerte y precio accesible, ideal para tinto.",
    shortDescEn: "Strong body and affordable price, ideal for brewed coffee.",
    description:
      "Selección de pasilla de alta calidad, con cuerpo robusto y amargor agradable. Perfecto para tinto colombiano o preparaciones con leche. Excelente relación calidad-precio.",
    descriptionEn:
      "High-quality pasilla selection, with robust body and pleasant bitterness. Perfect for Colombian brewed coffee or milk-based preparations. Excellent value.",
    category: "blend",
    variants: [
      { label: "Molido 500g", labelEn: "Ground 500g", price: 20000 },
      { label: "Molido 1kg", labelEn: "Ground 1kg", price: 35000 },
    ],
  },
  {
    id: "cafe-drip-bags",
    name: "Drip Bags Diffiori (10 unidades)",
    nameEn: "Diffiori Drip Bags (10 pack)",
    image: "https://images.unsplash.com/photo-1544787214-51ca516708b2?q=80&w=800&auto=format&fit=crop",
    price: 25000,
    shortDesc: "Café de especialidad listo para verter. Sin equipo.",
    shortDescEn: "Specialty coffee ready to pour. No equipment needed.",
    description:
      "Bolsas individuales de café de especialidad: abre, cuelga en tu taza, vierte agua caliente y disfruta. Cada bolsa rinde una taza de 200ml con calidad de barista.",
    descriptionEn:
      "Individual specialty coffee bags: open, hang on your cup, pour hot water and enjoy. Each bag yields a 200ml cup with barista quality.",
    category: "accessories",
    variants: [
      { label: "Caja 10 unidades", labelEn: "Box 10 units", price: 25000 },
      { label: "Caja 20 unidades", labelEn: "Box 20 units", price: 45000 },
    ],
  },
];
