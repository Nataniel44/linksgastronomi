"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Sparkles, Palette } from "lucide-react";

export function HeroBlob() {
    return (
        <section className="relative w-full pb-16  flex flex-col items-center justify-center pt-16 overflow-hidden bg-gradient-to-b from-white via-yellow-50/30 to-white">

            {/* Partículas flotantes */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 5 + i * 1.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeInOut"
                    }}
                    className="absolute w-8 h-8 bg-blue-400 rounded-full blur-sm"
                    style={{
                        left: `${15 + i * 18}%`,
                        top: `${30 + i * 10}%`
                    }}
                />
            ))}

            {/* Contenedor de contenido */}
            <div className="relative z-10 flex flex-col items-center text-center gap-8 px-4  mx-auto">
                {/* Título con animación */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-3"
                >


                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900">
                        Hola, soy{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-yellow-500">Nataniel Soto</span>
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="absolute bottom-2 left-0 h-3 bg-yellow-300/40 -z-10"
                            />
                        </span>
                    </h1>
                </motion.div>

                {/* Card principal con imagen y texto */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-full max-w-4xl"
                >
                    <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-yellow-500/20 group">
                        {/* Efecto de brillo al hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        {/* Imagen con overlay */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full md:w-2/5 h-64 md:h-80 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                            <Image
                                src="/nata.jpeg"
                                alt="Nataniel - Desarrollador Web"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Contenido de texto */}
                        <div className="flex-1 p-8 md:p-10 space-y-6">
                            <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed">

                                Desarrollador autodidacta de 21 años, desde Oberá, Misiones. Creo experiencias digitales que combinan diseño elegante con
                                {"  "}
                                <span className="font-bold text-yellow-400 relative inline-block">

                                    tecnología moderna
                                    <motion.span
                                        animate={{ scaleX: [0, 1, 0] }}
                                        transition={{ duration: 8, repeat: Infinity, repeatDelay: 1 }}
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 origin-left"
                                    />
                                </span>
                                .
                            </p>

                            {/* Iconos de habilidades */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                {[
                                    { icon: Code2, text: "Desarrollo" },
                                    { icon: Palette, text: "Diseño UX/UI" },
                                    { icon: Sparkles, text: "Innovación" }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2"
                                    >
                                        <item.icon className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm font-medium text-yellow-100">
                                            {item.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>


            </div>
        </section>
    );
}