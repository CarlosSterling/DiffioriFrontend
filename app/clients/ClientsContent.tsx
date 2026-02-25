"use client";

import { CinematicHeader } from "@/components/CinematicHeader";
import ClientCard from "@/components/ClientCard";
import type { Client } from "@/types/api";
import { useLanguage } from "@/i18n/LanguageContext";


import { useState, useEffect } from "react";
import { fetchClients } from "@/lib/api";

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

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-12 text-center">
        <p className="text-default-500">{dict.nav.cargando}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Page Header */}
      <CinematicHeader 
        title={dict.nav.clientes} 
        subtitle={locale === "en" 
          ? "Discover partners who trust our quality coffee." 
          : "Descubre a los aliados que confían en nuestro café de calidad."}
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {clients.length > 0 ? (
          clients.map((c: Client) => (
            <ClientCard key={c.id} client={c} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-default-50 rounded-2xl">
            <p className="text-default-500">
              {locale === "en" ? "No partners found yet." : "Aún no hay aliados registrados."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
