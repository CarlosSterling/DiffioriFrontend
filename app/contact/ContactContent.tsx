"use client";

import { CinematicHeader } from "@/components/CinematicHeader";
import ContactSection from "./ContactSection";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ContactContent() {
  const { dict, locale } = useLanguage();

  return (
    <div className="max-w-screen-lg mx-auto px-6 py-12">
      {/* Page Header */}
      <CinematicHeader 
        title={dict.nav.contactanos} 
        subtitle={locale === "en" 
          ? "We respond in less than 24 business hours." 
          : "Respondemos en menos de 24h hábiles."} 
      />

      <ContactSection />
    </div>
  );
}
