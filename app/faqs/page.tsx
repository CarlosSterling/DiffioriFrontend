import { title } from "@/components/primitives";
import { fetchFaqs } from "@/lib/api";
import FaqAccordion from "@/components/FaqAccordion";
import type { Faq } from "@/types/api";

export const metadata = {
  title: "Preguntas Frecuentes – Diffiori Café",
  description: "Resuelve aquí todas tus dudas sobre nuestro café y envíos.",
};

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs: Faq[] = await fetchFaqs();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className={title({ size: "md", class: "block mb-4" })}>
          Preguntas Frecuentes
        </h1>
        <div className="w-16 h-1 mx-auto rounded-full mt-3 mb-5" style={{ backgroundColor: "#E8D4B0" }} />
        <p className="text-default-500 text-lg max-w-xl mx-auto leading-relaxed">
          ¿Tienes alguna duda? Encuentra aquí todas las respuestas.
        </p>
      </div>

      <FaqAccordion faqs={faqs} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqSchema(faqs) }}
      />
    </div>
  );
}

function buildFaqSchema(faqs: Faq[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}
