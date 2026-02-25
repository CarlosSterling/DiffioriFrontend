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

const WHATSAPP_NUMBER = "573123938505"; // sin + ni espacios

export default function ContactSection() {
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
    input: "text-base font-medium",
    inputWrapper: "bg-default-100/50 backdrop-blur-sm border-none shadow-inner data-[hover=true]:bg-default-200/50 group-data-[focus=true]:bg-default-200/50",
    label: "text-default-500 font-semibold",
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
              <Input
                name="name"
                label="Nombre"
                placeholder=" "
                labelPlacement="outside"
                value={form.name}
                onChange={handleChange}
                classNames={inputClass}
                isRequired
                radius="lg"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="email"
                  label="Correo"
                  type="email"
                  placeholder=" "
                  labelPlacement="outside"
                  value={form.email}
                  onChange={handleChange}
                  classNames={inputClass}
                  isRequired
                  radius="lg"
                />
                <Input
                  name="phone"
                  label="Teléfono"
                  type="tel"
                  placeholder=" "
                  labelPlacement="outside"
                  value={form.phone}
                  onChange={handleChange}
                  classNames={inputClass}
                  radius="lg"
                />
              </div>
              <Textarea
                name="message"
                label="Mensaje"
                placeholder="¿Cómo podemos ayudarte?"
                labelPlacement="outside"
                minRows={5}
                value={form.message}
                onChange={handleChange}
                classNames={inputClass}
                isRequired
                radius="lg"
              />

              <Button 
                color="primary" 
                fullWidth 
                size="lg" 
                type="submit" 
                className="font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                endContent={<SendIcon size={18} />}
              >
                Enviar por WhatsApp
              </Button>
            </form>
          </div>

          {/* ---------- Datos + mapa (Derecha en PC) ---------- */}
          <div className="order-1 lg:order-2 p-8 lg:p-12 bg-default-50/50 dark:bg-default-100/5 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-display">Visítanos en nuestra<br/><span className="text-primary">Oficina Principal</span></h2>
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
                
                <div className="hidden lg:flex items-center gap-4 p-4 rounded-2xl hover:bg-default-100/50 transition-colors">
                  <div className="p-3 bg-primary-100/50 rounded-xl text-primary shrink-0">
                    <PhoneIcon size={24} />
                  </div>
                  <div>
                    <span className="font-bold block text-foreground">Teléfono</span>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-primary transition-colors">
                      (+57) 312 393 8505
                    </a>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-4 p-4 rounded-2xl hover:bg-default-100/50 transition-colors">
                  <div className="p-3 bg-primary-100/50 rounded-xl text-primary shrink-0">
                    <MailIcon size={24} />
                  </div>
                   <div>
                    <span className="font-bold block text-foreground">Correo</span>
                    diffioricafe@gmail.com
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group rounded-3xl overflow-hidden shadow-xl border-2 border-white/50">
              <iframe
                title="Ubicación Vivatech"
                className="w-full h-64 grayscale group-hover:grayscale-0 transition-all duration-700"
                src="https://maps.google.com/maps?q=1.8540376,-76.0373399+(Diffiori+Cafe)&z=18&output=embed"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Ver en Google Maps
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
