export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-12">
      <div className="max-w-screen-lg w-full px-4">{children}</div>
    </section>
  );
}
