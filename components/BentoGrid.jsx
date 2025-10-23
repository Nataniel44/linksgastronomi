"use client";
import { motion, useInView } from "framer-motion";
import { BentoGridItem } from "./BentoGridItem"; // Importamos el nuevo componente
import { useRef } from "react";
// Datos de los items, ahora con control de tamaño (colSpan/rowSpan)
const items = [
  {
    title: "Cartas Digitales",
    description: "Menús QR y web dinámicos para tu local.",
    icon: "📱",
    className: "md:col-span-2 bg-gradient-to-br from-yellow-50 via-white to-yellow-100",
  },
  {
    title: "Apps Personalizadas",
    description: "Pedidos, reservas y fidelización de clientes.",
    icon: "🛒",
    className: "md:col-span-1 bg-white",
  },
  {
    title: "Promociones Inteligentes",
    description: "Destaca ofertas y combos de forma atractiva.",
    icon: "🎉",
    className: "md:col-span-1 bg-white",
  },
  {
    title: "Delivery & Take Away",
    description: "Optimiza y gestiona tu servicio de entrega y recolección.",
    icon: "🚚",
    className: "md:col-span-2 bg-gradient-to-tr from-yellow-50 via-white to-yellow-100",
  },
];

// Variante para la animación del contenedor
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 0.1 segundos entre cada BentoGridItem
      delayChildren: 0.2,   // 0.2 segundos antes de que empiece el primer hijo // Este es el truco para la animación en cascada
    },
  },
};

export default function BentoGrid() {
  const ref = useRef(null);
  // Usamos useInView en el contenedor principal
  // once: true para que se anime solo una vez
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"

      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4 mt-10"
    >
      {items.map((item, index) => (
        <BentoGridItem key={index} {...item} />
      ))}
    </motion.section>
  );
} 
