"use client";

import { motion } from "framer-motion";
import { title as titleStyle, subtitle } from "@/components/primitives";
import { Image } from "@heroui/image";
import { Leaf, Users, Heart } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Años de Tradición", value: "30+" },
    { label: "Familias Aliadas", value: "150+" },
    { label: "Tazas Servidas", value: "1M+" },
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sostenibilidad",
      desc: "Cultivamos respetando la tierra, sin agroquímicos agresivos y preservando la biodiversidad del Huila.",
    },
    {
      icon: Users,
      title: "Comercio Justo",
      desc: "Pagamos precios premium a nuestros caficultores, asegurando bienestar y progreso para sus comunidades.",
    },
    {
      icon: Heart,
      title: "Pasión",
      desc: "Cada grano es seleccionado a mano. No es solo café, es el amor de una familia por su oficio.",
    },
  ];

  return (
    <div className="bg-background pb-24">
      {/* ——— HERO HEADER ——— */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
             src="/coffee-farm-huila-hero.png" // Using existing image
             alt="Fincas de Diffiori"
             removeWrapper
             className="w-full h-full object-cover opacity-80"
          />
        </div>
        
        <div className="relative z-20 text-center max-w-3xl px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-300 font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Nuestra Historia
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={titleStyle({ class: "text-white mb-6 leading-tight" })}
          >
            El Sabor de lo que Somos
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-200 font-serif italic"
          >
            "Del corazón de la montaña a tu taza"
          </motion.p>
        </div>
      </section>

      {/* ——— STORY CONTENT ——— */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg dark:prose-invert"
          >
            <h2 className="text-3xl font-bold font-display text-primary-900 dark:text-primary-100 mb-6">Orígenes en el Huila</h2>
            <p className="text-default-600 leading-relaxed text-lg">
              Hace más de tres décadas, en las escarpadas laderas del departamento del Huila, comenzó nuestro viaje. Lo que empezó como un pequeño lote familiar se ha transformado en <strong>Diffiori</strong>, un símbolo de excelencia cafetera.
            </p>
            <p className="text-default-600 leading-relaxed text-lg mt-4">
              Nuestra filosofía es simple: <span className="text-primary font-medium">respeto absoluto por el grano</span>. Desde la floración hasta el beneficio, controlamos cada variable para garantizar que el perfil de taza sea inigualable.
            </p>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative"
          >
            <div className="absolute inset-0 bg-primary-100 rounded-2xl transform rotate-3" />
            <Image
              src="/slider-prep.png" // Placeholder or reuse slider image
              alt="Preparación artesanal"
              className="relative rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* ——— VALUES GRID ——— */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-3xl bg-default-50 border border-default-100 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 mx-auto bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mb-6">
                <v.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-default-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ——— STATS ——— */}
        <div className="grid grid-cols-3 gap-8 border-t border-b border-default-200 py-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-display">{stat.value}</div>
              <div className="text-sm md:text-base text-default-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
