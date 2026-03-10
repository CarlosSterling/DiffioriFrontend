import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Café de Especialidad",
  description:
    "Selección premium de café colombiano cultivado con pasión en el Huila. Descubre nuestros granos de origen, tostados artesanalmente.",
  openGraph: {
    title: "Café de Especialidad | Diffiori Café",
    description:
      "Selección premium de café colombiano cultivado con pasión en el Huila.",
  },
};

export default function CafeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
