export interface Category {
  id: string;
  label: string;
  labelEn: string;
}

export const categories: Category[] = [
  { id: "all", label: "Todos", labelEn: "All" },
  { id: "specialty", label: "Especialidad", labelEn: "Specialty" },
  { id: "blend", label: "Blends", labelEn: "Blends" },
  { id: "decaf", label: "Descafeinado", labelEn: "Decaf" },
  { id: "accessories", label: "Otros", labelEn: "Others" },
];
