export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-6">{children}</div>
    </section>
  );
}
