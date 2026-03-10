import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Explora nuestra colección de productos: bebidas frías, bebidas calientes y más. Envíos a todo Colombia.",
  openGraph: {
    title: "Tienda | Diffiori Café",
    description:
      "Explora nuestra colección de productos de Diffiori Café.",
  },
};

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}
