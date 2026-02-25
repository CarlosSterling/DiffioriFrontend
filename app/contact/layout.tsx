export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-5xl px-6">{children}</div>
    </section>
  );
}
