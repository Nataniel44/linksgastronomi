"use client";

import { useRef, useEffect, useState } from "react";
import { Smartphone, ShoppingBag, Globe, Sparkles, Palette, Settings, Layout, Share2, Layers } from "lucide-react";
import { services } from "@/lib/services";
import { ActionButton } from "./ui/ActionButton";
import SectionWrapper from "./ui/SectionWrapper";

const iconMap: Record<string, any> = {
    smartphone: Smartphone,
    shoppingbag: ShoppingBag,
    globe: Globe,
    palette: Palette,
    settings: Settings,
    layout: Layout,
    share: Share2,
    layers: Layers
};

const ServiceCard = ({ icon, title, description, gradient, bgGradient, index }: any) => {
    // Fallback to Sparkles if icon not found
    const Icon = iconMap[icon.toLowerCase()] || Sparkles;

    return (
        <li
            className={`relative bg-neutral-900 rounded-2xl p-8 border border-white/5 overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] opacity-0 animate-fade-up shadow-xl hover:shadow-2xl`}
            style={{ animationDelay: `${0.2 + index * 0.15}s` }}
        >
            {/* Background Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

            <div className="relative z-10 flex flex-col items-center text-center">
                <div
                    className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-6 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110`}
                >
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                </div>

                <h3 className="font-bold text-white text-2xl mb-3">{title}</h3>

                <p className="text-gray-400 text-base leading-relaxed">{description}</p>
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
        <SectionWrapper id="servicios" className="relative overflow-hidden pb-20 pt-10 bg-neutral-950">
            {/* Título */}
            <div
                className={`text-center mb-16 transform transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
            >
                <div className="flex items-center justify-center gap-3 mb-4 z-20 relative">
                    <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Soluciones{" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Digitales
                        </span>
                    </h2>
                    <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                </div>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                    Herramientas pensadas para que tu negocio crezca en San Vicente.
                </p>
            </div>

            {/* Grid */}
            <ul
                ref={ref}
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-700 container mx-auto px-4 ${visible ? "opacity-100" : "opacity-0"
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
                <ActionButton href="https://wa.me/543755246464?text=Hola!%20Quiero%20info%20de%20servicios" variant="primary">
                    Consultar precios
                </ActionButton>
            </div>

            <style jsx global>{`
                @keyframes fade-up {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fade-up 0.6s ease-out forwards;
                }
            `}</style>
        </SectionWrapper>
    );
}
