"use client";

import { ShoppingBag, MousePointerClick, ClipboardList, Send } from "lucide-react";

export default function ClickcitoIntro() {
    const steps = [
        {
            icon: MousePointerClick,
            title: "Elegí una categoría",
            desc: "Seleccioná lo que querés pedir: comidas, bebidas o postres.",
            gradient: "from-purple-500/10 to-purple-900/20",
            border: "border-purple-500/30",
            iconBg: "bg-purple-500/20",
            iconColor: "text-purple-400",
            hoverShadow: "hover:shadow-purple-500/20",
        },
        {
            icon: ClipboardList,
            title: "Completá tus datos",
            desc: "Ingresá tu nombre, dirección y método de entrega o pago.",
            gradient: "from-blue-500/10 to-blue-900/20",
            border: "border-blue-500/30",
            iconBg: "bg-blue-500/20",
            iconColor: "text-blue-400",
            hoverShadow: "hover:shadow-blue-500/20",
        },
        {
            icon: ShoppingBag,
            title: "Revisá tu pedido",
            desc: "Verificá los productos elegidos antes de confirmar.",
            gradient: "from-orange-500/10 to-orange-900/20",
            border: "border-orange-500/30",
            iconBg: "bg-orange-500/20",
            iconColor: "text-orange-400",
            hoverShadow: "hover:shadow-orange-500/20",
        },
        {
            icon: Send,
            title: "Enviá tu pedido",
            desc: "Clickcito lo manda directo al comercio por WhatsApp.",
            gradient: "from-green-500/10 to-green-900/20",
            border: "border-green-500/30",
            iconBg: "bg-green-500/20",
            iconColor: "text-green-400",
            hoverShadow: "hover:shadow-green-500/20",
        },
    ];

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                        Bienvenido a <span className="text-green-400">Clickcito</span> 👋
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                        Pedir nunca fue tan fácil — seleccioná, completá y enviá. ¡Tu pedido llega directo al comercio!
                    </p>
                </div>

                {/* Cards - Scroll horizontal en móvil, Grid en desktop */}
                <div className="relative">
                    {/* Mobile: Scroll horizontal */}
                    <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4">
                        {steps.map(({ icon: Icon, title, desc, gradient, border, iconBg, iconColor, hoverShadow }, i) => (
                            <div
                                key={i}
                                className={`flex-shrink-0 w-[85vw] max-w-[320px] snap-center bg-gradient-to-br ${gradient} ${border} border rounded-2xl p-6 shadow-lg ${hoverShadow} transition-all hover:scale-[1.02] backdrop-blur-sm`}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${iconBg} ${iconColor} flex-shrink-0`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="inline-block bg-white/10 px-2 py-0.5 rounded-full text-white/60 text-xs font-semibold mb-2">
                                            Paso {i + 1}
                                        </div>
                                        <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop: Grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map(({ icon: Icon, title, desc, gradient, border, iconBg, iconColor, hoverShadow }, i) => (
                            <div
                                key={i}
                                className={`bg-gradient-to-br ${gradient} ${border} border rounded-2xl p-6 shadow-lg ${hoverShadow} transition-all hover:scale-[1.03] hover:-translate-y-1 backdrop-blur-sm group`}
                            >
                                {/* Badge de número */}
                                <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-white/60 text-xs font-semibold mb-4 group-hover:bg-white/20 transition-colors">
                                    Paso {i + 1}
                                </div>

                                {/* Icono */}
                                <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${iconBg} ${iconColor} mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon size={28} />
                                </div>

                                {/* Contenido */}
                                <h3 className="text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Indicador de scroll - Solo móvil */}
                    <div className="flex justify-center gap-2 mt-6 md:hidden">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-white/20 transition-all"
                            />
                        ))}
                    </div>
                </div>

                {/* CTA opcional */}
                <div className="text-center mt-12 md:mt-16">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3 text-green-400 font-semibold text-sm backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        ¡Empezá a pedir ahora!
                    </div>
                </div>
            </div>
        </section>
    );
}