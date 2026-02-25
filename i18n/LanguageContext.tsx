"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import es, { type LocaleDict } from "./es";
import en from "./en";

import { cookies } from "@/lib/cookies";

/* ── Types ── */
export type Locale = "es" | "en";

interface LanguageContextValue {
  locale: Locale;
  toggleLocale: () => void;
  dict: LocaleDict;
}

const dictionaries: Record<Locale, LocaleDict> = { es, en };

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "vivatech_locale";

/* ── Provider ── */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");
  const [mounted, setMounted] = useState(false);

  /* Hydration-safe: read cookies only after mount */
  useEffect(() => {
    const saved = cookies.get(STORAGE_KEY) as Locale | null;
    if (saved === "en" || saved === "es") setLocale(saved);
    setMounted(true);
  }, []);

  /* Persist on change */
  useEffect(() => {
    if (mounted) cookies.set(STORAGE_KEY, locale);
  }, [locale, mounted]);

  const toggleLocale = useCallback(
    () => setLocale((prev) => (prev === "es" ? "en" : "es")),
    [],
  );

  const dict = useMemo(() => dictionaries[locale], [locale]);

  const value = useMemo(
    () => ({ locale, toggleLocale, dict }),
    [locale, toggleLocale, dict],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ── Hook ── */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside <LanguageProvider>");
  return ctx;
}
