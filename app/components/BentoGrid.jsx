"use client";

import { motion } from "framer-motion";

const items = [
    { text: "Cartas Digitales", icon: "📱", desc: "Menús QR y web para tu local", col: "col-span-2", row: "row-span-2 bg-gradient-to-br from-yellow-100 via-white to-yellow-200 border border-yellow-300", delay: 0 },
    { text: "Apps Personalizadas", icon: "🛒", desc: "Pedidos y reservas online", col: "col-span-1", row: "bg-white border border-yellow-200", delay: 0.15 },
    { text: "Promociones", icon: "🎉", desc: "Ofertas y combos destacados", col: "col-span-1", row: "bg-white border border-yellow-100", delay: 0.3 },
    { text: "Delivery & Take Away", icon: "🚚", desc: "Optimiza tu servicio de entrega", col: "col-span-2", row: "bg-gradient-to-tr from-yellow-50 via-white to-yellow-200 border border-yellow-200", delay: 0.45 },
];

export default function BentoGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
            
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: item.delay, duration: 0.6, type: "spring" }}
                    className={`rounded-2xl p-6 flex flex-col justify-center items-center shadow-xl hover:scale-105 transition-transform cursor-pointer ${item.col} ${item.row}`}
                >
                    <span className="text-4xl mb-2">{item.icon}</span>
                    <span className="font-bold text-lg text-gray-800 mb-1 text-center">{item.text}</span>
                    <span className="text-gray-600 text-sm text-center">{item.desc}</span>
                </motion.div>
            ))}
        </div>
    );
}
