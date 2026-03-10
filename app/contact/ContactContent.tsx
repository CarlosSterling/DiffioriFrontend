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
        preTitle={locale === "en" ? "WE ARE HERE FOR YOU" : "ESTAMOS PARA SERVIRTE"}
        title={dict.nav.contactanos} 
        subtitle={locale === "en" 
          ? "The flavor of our land and the warmth of our people at your service." 
          : "El sabor de nuestra tierra y la calidez de nuestra gente a tu servicio."} 
      />

      <ContactSection />
    </div>
  );
}
