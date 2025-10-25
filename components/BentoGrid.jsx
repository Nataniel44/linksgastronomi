"use client";
import { motion, useInView } from "framer-motion";
import { BentoGridItem } from "./BentoGridItem";
import { useRef } from "react";
import { Smartphone, ShoppingCart, Sparkles, Truck } from "lucide-react";

const items = [
  {
    title: "Cartas Digitales",
    description: "Menús QR y web dinámicos para tu local.",
    icon: Smartphone,
    className: "md:col-span-2 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-2 border-yellow-200/50 hover:border-yellow-300 transition-colors",
  },
  {
    title: "Apps Personalizadas",
    description: "Pedidos, reservas y fidelización de clientes.",
    icon: ShoppingCart,
    className: "md:col-span-1 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200/50 hover:border-yellow-300 transition-colors",
  },
  {
    title: "Promociones Inteligentes",
    description: "Destaca ofertas y combos de forma atractiva.",
    icon: Sparkles,
    className: "md:col-span-1 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200/50 hover:border-yellow-300 transition-colors",
  },
  {
    title: "Delivery & Take Away",
    description: "Optimiza y gestiona tu servicio de entrega y recolección.",
    icon: Truck,
    className: "md:col-span-2 bg-gradient-to-tr from-yellow-50 via-white to-yellow-100 border-2 border-yellow-200/50 hover:border-yellow-300 transition-colors",
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
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-50/30 to-transparent pointer-events-none" />

      {/* Título de sección */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          Soluciones{" "}
          <span className="text-yellow-500">Completas</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Todo lo que necesitas para digitalizar tu negocio gastronómico
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4"
      >
        {items.map((item, index) => (
          <BentoGridItem key={index} {...item} />
        ))}
      </motion.div>
    </section>
  );
}