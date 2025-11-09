"use client";

import { useRef, useEffect, useState } from "react";
import { Smartphone, ShoppingBag, Truck, Sparkles, Palette } from "lucide-react";
import { services } from "@/lib/services";
import { ActionButton } from "./ui/ActionButton";
import SectionWrapper from "./ui/SectionWrapper";

const iconMap: Record<string, any> = {
    smartphone: Smartphone,
    shoppingbag: ShoppingBag,
    truck: Truck,
    palette: Palette,
};

const ServiceCard = ({ icon, title, description, gradient, bgGradient, index }: any) => {
    const Icon = iconMap[icon.toLowerCase()];
    if (!Icon) return null;

    return (
        <li
            className={`relative bg-gradient-to-br ${bgGradient} rounded-2xl shadow-lg p-8 border border-gray-200/50 overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] opacity-0 animate-fade-up`}
            style={{ animationDelay: `${0.2 + index * 0.15}s` }}
        >
            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-2xl`} />

            <div className="relative z-10 flex flex-col items-center text-center">
                <div
                    className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-6 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110`}
                >
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                </div>

                <h3 className="font-extrabold text-black/75 text-2xl mb-3">{title}</h3>

                <p className="text-gray-600 text-base leading-relaxed">{description}</p>

                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                    <span
                        className={`text-sm font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
                    >
                        {index + 1}
                    </span>
                </div>
            </div>
        </li>
    );
};

export function Services() {
    const ref = useRef<HTMLUListElement>(null);
    const [visible, setVisible] = useState(false);

    // Detectar cuando la sección entra en vista
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <SectionWrapper id="servicios" className="relative overflow-hidden pb-10">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/50 via-transparent to-yellow-50/50 pointer-events-none" />

            {/* Título */}
            <div
                className={`text-center mb-16 transform transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
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
            </div>

            {/* Grid */}
            <ul
                ref={ref}
                className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"
                    }`}
            >
                {services.map((s, i) => (
                    <ServiceCard key={s.slug} {...s} index={i} />
                ))}
            </ul>

            {/* Botones */}
            <div
                className={`flex flex-col md:flex-row gap-4 justify-center items-center mt-16 z-20 relative transform transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
            >
                <ActionButton href="#contacto" variant="primary">
                    Solicitá tu demo
                </ActionButton>
                <ActionButton href="#servicios" variant="secondary">
                    Ver más servicios
                </ActionButton>
            </div>

            {/* Animaciones CSS */}
            <style jsx global>{`
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }
      `}</style>
        </SectionWrapper>
    );
}
