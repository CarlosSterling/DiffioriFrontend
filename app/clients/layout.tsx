export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center py-8 md:py-12">
      <div className="w-full max-w-screen-xl px-4">{children}</div>
    </section>
  );
}
