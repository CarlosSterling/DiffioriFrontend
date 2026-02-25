"use client";

import { useState } from "react";
import { Accordion, AccordionItem, Input } from "@heroui/react";
import type { Faq } from "@/types/api";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");

  const filtered = faqs.filter((f) =>
    f.question.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Input
        placeholder="Buscar pregunta…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-md mb-6"
      />

      <Accordion selectionMode="multiple">
        {filtered.map((f) => (
          <AccordionItem key={f.id} title={f.question}>
            <div
              className="prose max-w-none text-justify"
              dangerouslySetInnerHTML={{ __html: f.answer }}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
