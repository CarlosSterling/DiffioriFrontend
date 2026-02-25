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
