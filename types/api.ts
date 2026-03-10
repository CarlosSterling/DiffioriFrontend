// types/api.ts
/* ---------- PRODUCT ---------- */
export interface ProductImage {
  id: number;
  image: string;
  alt: string | null;
  alt_en?: string | null;
}

export interface ProductVariant {
  id: number;
  weight: string;
  weight_en?: string;
  grind: string;
  grind_en?: string;
  price: string;
  stock: number;
  is_active: boolean;
}

export interface Product {
  id: number;
  name: string;
  name_en?: string;
  cover: string | null;
  short_desc: string;
  short_desc_en?: string;
  description: string;
  description_en?: string;
  price: string;
  gallery: ProductImage[];
  variants: ProductVariant[];
}
/* ---------- BLOG ---------- */
export interface BlogPost {
  id: number;
  title: string;
  title_en?: string;
  slug: string;
  excerpt: string;
  excerpt_en?: string;
  content: string;
  content_en?: string;
  cover_image: string | null;
  published_at: string;
}
/* ---------- FAQs ---------- */
export interface Faq {
  id: number;
  question: string;
  question_en?: string;
  answer: string;
  answer_en?: string;
}


/* --- CLIENTES ----------------------------------------------------------- */

export interface ClientImage {
  id: number;
  image: string;
  alt: string | null;
  alt_en?: string | null;
}

export interface Client {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  cover: string | null;
  testimonial: string;
  testimonial_en?: string;
  description: string;
  description_en?: string;
  location: string;
  latitude: string | null;
  longitude: string | null;
  gallery: ClientImage[];
}
