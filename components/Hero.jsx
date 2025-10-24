"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BackgroundBlobs } from "./ui/BackgroundBlobs";
import { ActionButton } from "./ui/ActionButton";

export function Hero() {
    return (
        <header className="relative w-full flex flex-col items-center justify-center overflow-hidden pt-20 pb-14">
            {/* Fondo dinámico */}
            <BackgroundBlobs
                colors={["#fde047", "#facc15", "#fbbf24"]}
                className="opacity-40 blur-2xl scale-110"
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="md:w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center gap-8 z-10"
            >
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Image
                        src="/log.png"
                        alt="Logo de la empresa"
                        width={384}
                        height={150}
                        priority
                        className="drop-shadow-lg select-none"
                    />
                </motion.div>

                {/* Título principal */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className="text-2xl md:text-4xl lg:text-4xl font-regular leading-tight max-w-3xl text-yellow-400 tracking-tight"
                >
                    <span className="font-bold">Soluciones</span>{" "}
                    <span className="relative inline-block">
                        <span className="font-bold">digitales</span>
                        <span
                            aria-hidden="true"
                            className="absolute left-0 -bottom-1 w-full h-1 md:h-1.5 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-90"
                        />
                    </span>{" "}
                    sitios web y menús interactivos para restaurantes, bares ,cafeterías y más.
                </motion.h1>

                {/* Botones */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="flex flex-col md:flex-row items-center gap-4 mt-4"
                >
                    <ActionButton href="/demo" variant="primary">
                        <svg
                            className="w-6 h-6 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        Ver carta de Top One Burgers
                    </ActionButton>

                    <Link
                        href="#contacto"
                        className="text-green-500 hover:underline flex items-center gap-1"
                    >
                        Contáctanos para más info
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </motion.div>
        </header>
    );
}
