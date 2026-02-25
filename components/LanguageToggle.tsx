"use client";

import { Button } from "@heroui/button";
import { useLanguage } from "@/i18n/LanguageContext";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <Button
      size="sm"
      variant="flat"
      radius="full"
      className="min-w-[48px] h-8 bg-default-100 hover:bg-default-200 transition-all border border-default-200 px-3 flex items-center justify-center group"
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
      onPress={toggleLocale}
    >
      <span className="font-bold text-[11px] tracking-wider text-default-600 group-hover:text-primary transition-colors uppercase">
        {locale}
      </span>
    </Button>
  );
}
