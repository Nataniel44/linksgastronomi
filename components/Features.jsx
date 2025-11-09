"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import SectionWrapper from "./ui/SectionWrapper";
import { BackgroundBlobs } from "./ui/BackgroundBlobs";
import { ActionButton } from "./ui/ActionButton";
import { CheckCircle2 } from "lucide-react";

export function Features() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <SectionWrapper className="relative min-h-screen w-full flex items-center justify-center overflow-visible py-28 ">
            <BackgroundBlobs
                colors={["#34d399", "#10b981", "#059669"]}
                className="opacity-40 z-0"
            />

            <div className="relative z-10 w-full mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Columna de texto */}
                    <div className="flex flex-col items-center md:items-start text-start transition-all duration-700">
                        <div className="w-full">
                            <h2 className="text-black text-nowrap md:text-start text-center text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                                <div className="w-full font-semibold">DESTACA ENTRE</div>
                                <div className="text-emerald-600 w-full">LOS DEMÁS</div>
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-center md:text-start text-gray-700 mt-6 w-full text-pretty leading-relaxed">
                            Convertí tu menú en una experiencia visual atractiva y fácil de usar.
                            Diferenciate de la competencia con tecnología de vanguardia.
                        </p>

                        <div className="flex justify-center items-center gap-5 mt-12">
                            <ActionButton
                                href="#contacto"
                                variant="secondary"
                                className="text-lg transition-transform duration-300 hover:scale-105"
                            >
                                <Image
                                    src="/c.png"
                                    alt="Decorative underline"
                                    width={50}
                                    height={50}
                                    className="w-6"
                                />{" "}
                                OBTENELO GRATIS
                            </ActionButton>
                        </div>

                        <ul className="flex flex-col gap-4 mt-12 w-full">
                            {features.map((feature, idx) => (
                                <li
                                    key={idx}
                                    className={`flex items-center gap-3 bg-gradient-to-r from-black to-gray-900 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-emerald-500/20 transition-transform duration-300 ${!isMobile ? "hover:scale-105 hover:translate-x-2" : ""
                                        }`}
                                >
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                                    <span className="text-white font-semibold text-base md:text-lg">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna de imagen */}
                    <div className="relative flex items-start justify-center h-full">
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Efecto rotatorio decorativo */}
                            {!isMobile && (
                                <div className="absolute inset-0 bg-gradient-to-br w-16 from-emerald-400/50 to-green-600/85 rounded-full blur-3xl animate-spin-slow" />
                            )}

                            {/* Imagen flotante */}
                            <div
                                className={`relative z-10 ${!isMobile ? "animate-float" : ""
                                    }`}
                            >
                                <Image
                                    src="/promo5.png"
                                    alt="Vista previa de menú digital en una pantalla de móvil"
                                    width={800}
                                    height={800}
                                    className="w-full scale-150 h-auto drop-shadow-2xl"
                                    priority
                                    loading="eager"
                                />
                            </div>

                            {/* Partículas flotantes */}
                            {!isMobile &&
                                [...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-3 h-3 bg-emerald-400 rounded-full blur-sm animate-pulse"
                                        style={{
                                            top: `${20 + i * 25}%`,
                                            right: `${10 + i * 15}%`,
                                            animationDelay: `${i * 0.5}s`,
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
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

// Agregá estas animaciones personalizadas en tu tailwind.config.js
// para reemplazar las de framer-motion:
//
// theme: {
//   extend: {
//     animation: {
//       'float': 'float 3s ease-in-out infinite',
//       'spin-slow': 'spin 20s linear infinite',
//     },
//     keyframes: {
//       float: {
//         '0%, 100%': { transform: 'translateY(0)' },
//         '50%': { transform: 'translateY(-20px)' },
//       },
//     },
//   },
// },
