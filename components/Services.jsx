"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, ShoppingBag, Truck, Sparkles, Palette } from "lucide-react";
import { services } from "@/lib/services";
import { ActionButton } from "./ui/ActionButton";
import SectionWrapper from "./ui/SectionWrapper";

const iconMap = {
    smartphone: Smartphone,
    shoppingbag: ShoppingBag,
    truck: Truck,
    palette: Palette,
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServiceCard = ({ icon, title, description, gradient, bgGradient, index }) => {
    const Icon = iconMap[icon.toLowerCase()];
    if (!Icon) return null;

    return (
        <motion.li
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`relative bg-gradient-to-br ${bgGradient} rounded-2xl shadow-lg p-8 border border-gray-200/50 overflow-hidden group`}
        >
            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-2xl`} />
            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-6`}
                >
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                </motion.div>

                <h3 className={`font-extrabold text-black/75  text-2xl mb-3 `}>{title}</h3>

                <p className="text-gray-600 text-base leading-relaxed">{description}</p>

                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                    <span className={`text-sm font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                        {index + 1}
                    </span>
                </div>
            </div>
        </motion.li>
    );
};

export function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <SectionWrapper id="servicios" className="relative overflow-hidden pb-10">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/50 via-transparent to-yellow-50/50 pointer-events-none" />

            {/* Título */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <div className="flex items-center justify-center gap-3 mb-4 z-20 relative">
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        ¿Qué{" "}
                        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                            ofrecemos?
                        </span>
                    </h2>
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Soluciones digitales completas para llevar tu negocio al siguiente nivel.
                </p>
            </motion.div>

            {/* Grid */}
            <motion.ul
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {services.map((s, i) => (
                    <ServiceCard key={s.slug} {...s} index={i} />
                ))}
            </motion.ul>

            {/* Botones */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col md:flex-row gap-4 justify-center items-center mt-16 z-20 relative"
            >
                <ActionButton href="#contacto" variant="primary">
                    Solicitá tu demo
                </ActionButton>
                <ActionButton href="#servicios" variant="secondary">
                    Ver más servicios
                </ActionButton>
            </motion.div>
        </SectionWrapper>
    );
}
