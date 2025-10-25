"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import SectionWrapper from "./ui/SectionWrapper";
import { BackgroundBlobs } from "./ui/BackgroundBlobs";
import { ActionButton } from "./ui/ActionButton";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Features() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detectar si es mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <SectionWrapper className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
            <BackgroundBlobs
                colors={["#34d399", "#10b981", "#059669"]}
                className="opacity-40"
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start text-start"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-black text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                                DESTACA ENTRE
                                <span className="block text-emerald-600 mt-2">
                                    LOS DEMÁS
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-gray-700 mt-6 max-w-lg leading-relaxed"
                        >
                            Convertí tu menú en una experiencia visual atractiva y fácil de usar.
                            Diferenciate de la competencia con tecnología de vanguardia.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <ActionButton href="#contacto" variant="dark" className="mt-8 text-lg px-8 py-4">
                                OBTENELO GRATIS
                            </ActionButton>
                        </motion.div>

                        <motion.ul
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col gap-4 mt-12 w-full"
                        >
                            {features.map((feature, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.6 + idx * 0.1
                                    }}
                                    // Solo hover en desktop
                                    {...(!isMobile && {
                                        whileHover: { scale: 1.03, x: 5 }
                                    })}
                                    className="flex items-center gap-3 bg-gradient-to-r from-black to-gray-900 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-emerald-500/20 group"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 md:group-hover:scale-110 transition-transform" />
                                    <span className="text-white font-semibold text-base md:text-lg">
                                        {feature}
                                    </span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Decorative elements - Solo animación continua en desktop */}
                            <motion.div
                                {...(!isMobile && {
                                    animate: {
                                        rotate: [0, 360],
                                        scale: [1, 1.1, 1]
                                    },
                                    transition: {
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }
                                })}
                                className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-full blur-3xl"
                            />

                            {/* Imagen - Animación flotante solo en desktop */}
                            <motion.div
                                {...(!isMobile && {
                                    animate: { y: [0, -20, 0] },
                                    transition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                })}
                                className="relative z-10"
                            >
                                <Image
                                    src="/promo2.png"
                                    alt="Vista previa de menú digital en una pantalla de móvil"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto drop-shadow-2xl"
                                    priority
                                    loading="eager"
                                />
                            </motion.div>

                            {/* Floating particles - Solo en desktop */}
                            {!isMobile && [...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [0, -30, 0],
                                        x: [0, 15, 0],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{
                                        duration: 4 + i,
                                        repeat: Infinity,
                                        delay: i * 0.5
                                    }}
                                    className="absolute w-3 h-3 bg-emerald-400 rounded-full blur-sm"
                                    style={{
                                        top: `${20 + i * 25}%`,
                                        right: `${10 + i * 15}%`
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}

const features = [
    "100% seguro y confiable",
    "Rápido y optimizado",
    "Compatible con todos los dispositivos",
    "Diseño moderno y personalizable",
];