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
  category: string;
  categoryName?: string;
  categoryEn: string;
  variants: {
    id: number | string;
    label: string;
    labelEn: string;
    price: number;
  }[];
  gallery: {
    id: number;
    image: string;
    alt?: string;
    altEn?: string;
  }[];
}

export const coffeeProducts: CoffeeProduct[] = [];
