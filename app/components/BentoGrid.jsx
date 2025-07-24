"use client";

import { motion } from "framer-motion";

const items = [
  {
    text: "Cartas Digitales",
    icon: "📱",
    desc: "Menús QR y web para tu local",
    className:
      "md:col-span-2 md:row-span-2 bg-gradient-to-br from-yellow-100 via-white to-yellow-200 border border-yellow-300",
    delay: 0,
  },
  {
    text: "Apps Personalizadas",
    icon: "🛒",
    desc: "Pedidos y reservas online",
    className: "bg-white border border-yellow-200",
    delay: 0.15,
  },
  {
    text: "Promociones",
    icon: "🎉",
    desc: "Ofertas y combos destacados",
    className: "bg-white border border-yellow-100",
    delay: 0.3,
  },
  {
    text: "Delivery & Take Away",
    icon: "🚚",
    desc: "Optimiza tu servicio de entrega",
    className:
      "md:col-span-2 bg-gradient-to-tr from-yellow-50 via-white to-yellow-200 border border-yellow-200",
    delay: 0.45,
  },
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: item.delay,
            duration: 0.6,
            type: "spring",
          }}
          className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center shadow-xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer ${item.className}`}
        >
          <span className="text-4xl sm:text-5xl mb-3">{item.icon}</span>
          <span className="font-bold text-lg sm:text-xl text-gray-800 mb-1 text-center">
            {item.text}
          </span>
          <span className="text-gray-600 text-sm sm:text-base text-center">
            {item.desc}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
