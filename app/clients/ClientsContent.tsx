"use client";

import { CinematicHeader } from "@/components/CinematicHeader";
import ClientCard from "@/components/ClientCard";
import type { Client } from "@/types/api";
import { useLanguage } from "@/i18n/LanguageContext";


import { useState, useEffect } from "react";
import { fetchClients } from "@/lib/api";

import { ClientSkeleton } from "@/components/ClientSkeleton";
import { Users2Icon } from "lucide-react";

export default function ClientsContent() {
  const { dict, locale } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (err) {
        console.error("Error loading clients:", err);
      } finally {
        setLoading(false);
      }
    }
    loadClients();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Page Header */}
      <CinematicHeader
        title={dict.nav.clientes}
        subtitle={locale === "en"
          ? "Discover partners who trust our quality coffee."
          : "Descubre a los aliados que confían en nuestro café de calidad."}
      />

      <div className="flex flex-wrap justify-center items-stretch gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <ClientSkeleton key={`skeleton-${i}`} />
          ))
        ) : clients.length > 0 ? (
          clients.map((c: Client) => (
            <ClientCard key={c.id} client={c} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 px-6 border-2 border-dashed border-default-200 rounded-3xl w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 group hover:border-primary/30 transition-colors duration-500">
            <div className="p-5 bg-default-100/50 rounded-full text-default-400 group-hover:text-primary transition-colors">
              <Users2Icon size={40} strokeWidth={1.5} />
            </div>
            <p className="text-default-500 text-lg font-light italic">
              {locale === "en" ? "No partners found yet. We're growing!" : "Aún no hay aliados registrados. ¡Estamos creciendo!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
