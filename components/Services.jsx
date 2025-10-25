"use client";
import { motion, useInView } from "framer-motion";
import { ActionButton } from "./ui/ActionButton";
import SectionWrapper from "./ui/SectionWrapper";
import { Smartphone, ShoppingBag, Truck, Sparkles } from "lucide-react";
import { useRef } from "react";

const servicesData = [
    {
        icon: Smartphone,
        title: "Cartas Digitales",
        description: "Menús online, QR, visuales y fáciles de actualizar para tu local.",
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-50 to-cyan-50",
    },
    {
        icon: ShoppingBag,
        title: "Apps Personalizadas",
        description: "Desarrollo de apps para pedidos, reservas y promociones a medida.",
        gradient: "from-yellow-500 to-orange-500",
        bgGradient: "from-yellow-50 to-orange-50",
    },
    {
        icon: Truck,
        title: "Soluciones para Delivery",
        description: "Optimiza tu delivery y take away con tecnología moderna y fácil de usar.",
        gradient: "from-emerald-500 to-teal-500",
        bgGradient: "from-emerald-50 to-teal-50",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const ServiceCard = ({ icon: Icon, title, description, gradient, bgGradient, index }) => (
    <motion.li
        variants={cardVariants}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`relative bg-gradient-to-br ${bgGradient} rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-gray-200/50 overflow-hidden group`}
    >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Círculo decorativo de fondo */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-2xl`} />

        <div className="relative z-10 flex flex-col items-center text-center">
            {/* Contenedor del icono */}
            <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-6 group-hover:shadow-xl`}
            >
                <Icon className="w-10 h-10 text-white" strokeWidth={2} />
            </motion.div>

            {/* Contenido */}
            <h3 className="font-bold text-2xl mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                {title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
                {description}
            </p>

            {/* Número decorativo */}
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/80 shadow-sm flex items-center justify-center">
                <span className={`text-sm font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                    {index + 1}
                </span>
            </div>
        </div>
    </motion.li>
);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

export function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <SectionWrapper id="servicios" className="relative overflow-hidden pb-10">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/50 via-transparent to-yellow-50/50 pointer-events-none" />

            {/* Partículas decorativas */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                    className="absolute w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
                    style={{
                        left: `${20 + i * 30}%`,
                        top: `${10 + i * 20}%`,
                    }}
                />
            ))}

            <div className="relative z-10">
                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
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
                        Soluciones digitales completas para llevar tu negocio al siguiente nivel
                    </p>
                </motion.div>

                {/* Grid de servicios */}
                <motion.ul
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                >
                    {servicesData.map((service, index) => (
                        <ServiceCard key={service.title} {...service} index={index} />
                    ))}
                </motion.ul>

                {/* Botones */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center mt-16"
                >
                    <ActionButton href="#contacto" variant="primary">
                        Solicitá tu demo
                    </ActionButton>
                    <ActionButton href="#servicios" variant="secondary">
                        Ver más servicios
                    </ActionButton>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}