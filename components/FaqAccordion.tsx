"use client";

import { useState } from "react";
import { Accordion, AccordionItem, Input } from "@heroui/react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Faq } from "@/types/api";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const { locale } = useLanguage();
  const [query, setQuery] = useState("");

  const filtered = faqs.filter((f) => {
    const q = locale === "en" ? (f.question_en || f.question) : f.question;
    return q.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <Input
        placeholder={locale === "en" ? "Search questions..." : "Buscar pregunta…"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-md mb-6"
      />

      <Accordion selectionMode="multiple">
        {filtered.map((f) => {
          const q = locale === "en" ? (f.question_en || f.question) : f.question;
          const a = locale === "en" ? (f.answer_en || f.answer) : f.answer;
          return (
            <AccordionItem key={f.id} title={q}>
              <div
                className="prose max-w-none text-justify"
                dangerouslySetInnerHTML={{ __html: a }}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
