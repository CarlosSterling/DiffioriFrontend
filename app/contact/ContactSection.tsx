"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
} from "@heroui/react";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  SendIcon,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WHATSAPP_NUMBER = "573227560973"; // sin + ni espacios

export default function ContactSection() {
  const { locale } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* ------- helpers ------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construye mensaje — líneas se unen con \n
    const msgLines = [
      `Hola, soy ${form.name}`,
      `Correo: ${form.email}`,
      form.phone && `Teléfono: ${form.phone}`,
      `Mensaje: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    // URL encode completo
    const url =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(msgLines)}`;

    window.open(url, "_blank");
  };

  const inputClass = {
    label: "text-primary-800 dark:text-primary-200 font-bold mb-1",
    input: "text-base pt-1",
    inputWrapper: "h-14 bg-default-100/40 backdrop-blur-md border-2 border-transparent data-[hover=true]:border-primary-200 group-data-[focus=true]:border-primary-300 transition-all duration-300 shadow-sm",
    mainWrapper: "pb-2",
  };

  /* ------- render ------- */
  return (
    <Card className="max-w-6xl mx-auto bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
      <CardBody className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
          {/* ---------- Formulario Glassmorphism (Izquierda en PC) ---------- */}
          <div className="order-2 lg:order-1 p-8 lg:p-12">
            <h3 className="text-2xl font-bold mb-6 font-display text-primary-900 dark:text-primary-100">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-primary-800 dark:text-primary-200 font-bold ml-1">Nombre</label>
                <Input
                  name="name"
                  placeholder="Escribe tu nombre"
                  size="lg"
                  value={form.name}
                  onChange={handleChange}
                  classNames={{
                    input: "text-base",
                    inputWrapper: "h-14 bg-default-100/40 backdrop-blur-md border-2 border-transparent data-[hover=true]:border-primary-200 group-data-[focus=true]:border-primary-300 transition-all duration-300 shadow-sm",
                  }}
                  isRequired
                  radius="lg"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-primary-800 dark:text-primary-200 font-bold ml-1">Correo</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  size="lg"
                  value={form.email}
                  onChange={handleChange}
                  classNames={{
                    input: "text-base",
                    inputWrapper: "h-14 bg-default-100/40 backdrop-blur-md border-2 border-transparent data-[hover=true]:border-primary-200 group-data-[focus=true]:border-primary-300 transition-all duration-300 shadow-sm",
                  }}
                  isRequired
                  radius="lg"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-primary-800 dark:text-primary-200 font-bold ml-1">Teléfono</label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="300 123 4567"
                  size="lg"
                  value={form.phone}
                  onChange={handleChange}
                  classNames={{
                    input: "text-base",
                    inputWrapper: "h-14 bg-default-100/40 backdrop-blur-md border-2 border-transparent data-[hover=true]:border-primary-200 group-data-[focus=true]:border-primary-300 transition-all duration-300 shadow-sm",
                  }}
                  radius="lg"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-primary-800 dark:text-primary-200 font-bold ml-1">Mensaje</label>
                <Textarea
                  name="message"
                  placeholder="¿Cómo podemos ayudarte?"
                  size="lg"
                  minRows={5}
                  value={form.message}
                  onChange={handleChange}
                  classNames={{
                    input: "text-base",
                    inputWrapper: "bg-default-100/40 backdrop-blur-md border-2 border-transparent data-[hover=true]:border-primary-200 group-data-[focus=true]:border-primary-300 transition-all duration-300 shadow-sm",
                  }}
                  isRequired
                  radius="lg"
                />
              </div>

              <Button 
                color="primary" 
                fullWidth 
                size="lg" 
                type="submit" 
                className="btn-gold-premium"
                endContent={<SendIcon size={18} />}
              >
                Enviar por WhatsApp
              </Button>
            </form>
          </div>

          {/* ---------- Datos + mapa (Derecha en PC) ---------- */}
          <div className="order-1 lg:order-2 p-8 lg:p-12 bg-primary-50/10 dark:bg-primary-900/10 space-y-8 flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-display">Visítanos en nuestra <br/><span className="text-primary">Oficina Principal</span></h2>
              <div className="space-y-2 text-lg text-default-600">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-default-100/50 transition-colors">
                  <div className="p-3 bg-primary-100/50 rounded-xl text-primary shrink-0">
                    <MapPinIcon size={24} />
                  </div>
                  <div>
                    <span className="font-bold block text-foreground">Dirección</span>
                    Cl. 17 Sur #1-37<br />
                    Pitalito – Huila, Colombia
                  </div>
                </div>
                
                {/* Phone and Email removed by user request */}
              </div>
            </div>

            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-video lg:aspect-square">
              <iframe
                title="Ubicación Diffiori Cafe"
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                src="https://maps.google.com/maps?q=1.8540376,-76.0373399+(Diffiori+Cafe)&z=18&output=embed"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30">
                <Button
                  as="a"
                  href="https://www.google.com/maps/dir/?api=1&destination=1.8540376,-76.0373399"
                  target="_blank"
                  color="default"
                  variant="flat"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", color: "black" }}
                  className="backdrop-blur-md font-bold px-6 py-2 rounded-full shadow-lg"
                  startContent={<MapPinIcon size={18} className="text-primary" />}
                >
                  {locale === "en" ? "Open in Google Maps" : "Ver en Google Maps"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
