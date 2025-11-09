"use client";

import { BentoGridItem } from "./BentoGridItem";
import { useRef } from "react";
import { Smartphone, ShoppingCart, Sparkles, Palette, Instagram, Camera, Truck } from "lucide-react";

const items = [
  {
    title: "Apps Personalizadas",
    description: "Pedidos, reservas y fidelización de clientes en tu propia app.",
    icon: Smartphone, // puedes usar otro ícono de app
    className:
      "md:col-span-2 bg-gradient-to-br from-blue-50 via-white to-cyan-100 border-2 border-blue-200/50 hover:border-cyan-300 transition-colors",
  },
  {
    title: "Diseño de Tarjetas & Banners",
    description: "Material visual para tu negocio que destaque y atraiga clientes.",
    icon: Palette,
    className:
      "md:col-span-1 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200/50 hover:border-blue-300 transition-colors",
  },
  {
    title: "Publicidad Creativa",
    description: "Campañas visuales que transmiten tu mensaje de forma impactante.",
    icon: Sparkles,
    className:
      "md:col-span-1 bg-gradient-to-tr from-pink-50 via-white to-rose-100 border-2 border-pink-200/50 hover:border-rose-300 transition-colors",
  },
  {
    title: "Fotografía Profesional",
    description: "Imágenes que realzan tu marca, producto o evento.",
    icon: Camera,
    className:
      "md:col-span-2 bg-gradient-to-tr from-yellow-50 via-white to-yellow-100 border-2 border-yellow-200/50 hover:border-yellow-300 transition-colors",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function BentoGrid() {
  const ref = useRef(null);


  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0  bg-gradient-to-b from-transparent via-yellow-50/30 to-transparent pointer-events-none" />

      {/* Título de sección */}
      <div

        className="text-center mb-12 px-4"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          Soluciones{" "}
          <span className="text-yellow-500">Completas</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Todo lo que necesitas para digitalizar tu negocio gastronómico
        </p>
      </div>

      <div
        ref={ref}

        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-full mx-auto px-6 md:px-12 auto-rows-fr'
      >
        {items.map((item, index) => (
          <BentoGridItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
}