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
        preTitle={dict.contact.preTitle}
        title={dict.nav.contactanos} 
        subtitle={dict.contact.pageSubtitle} 
      />

      <ContactSection />
    </div>
  );
}
