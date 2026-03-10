export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">{children}</div>
    </section>
  );
}
