"use client";

import { MessageSquare, Settings, TrendingUp } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: MessageSquare,
            title: "1. Hablamos",
            desc: "Nos contás qué hace tu negocio y qué necesitás. Sin tecnicismos, charla directa de comerciante a comerciante.",
            gradient: "from-green-500/10 to-green-900/20",
            border: "border-green-500/30",
            iconBg: "bg-green-500/20",
            iconColor: "text-green-400",
        },
        {
            icon: Settings,
            title: "2. Armamos la solución",
            desc: "Diseñamos tu menú, tu web o tus flyers. Lo dejamos listo para usar y conectado a tu WhatsApp.",
            gradient: "from-blue-500/10 to-blue-900/20",
            border: "border-blue-500/30",
            iconBg: "bg-blue-500/20",
            iconColor: "text-blue-400",
        },
        {
            icon: TrendingUp,
            title: "3. Recibís consultas",
            desc: "Empezás a compartir tu link o tus imágenes. Tus clientes ven lo que ofrecés y te contactan directo.",
            gradient: "from-yellow-500/10 to-yellow-900/20",
            border: "border-yellow-500/30",
            iconBg: "bg-yellow-500/20",
            iconColor: "text-yellow-400",
        },
    ];

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative overflow-hidden bg-neutral-900">

            <div className="max-w-7xl mx-auto">
                {/* Título de la sección */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                        ¿Cómo funciona?
                    </h2>
                    <p className="text-lg text-gray-400 mt-4">Simple, rápido y sin vueltas.</p>
                </div>

                {/* Pasos */}
                <div className="grid md:grid-cols-3 gap-8 relative z-10">
                    {steps.map(({ icon: Icon, title, desc, gradient, border, iconBg, iconColor }, i) => (
                        <div
                            key={i}
                            className={`relative bg-gradient-to-br ${gradient} ${border} border rounded-3xl p-8 shadow-2xl backdrop-blur-sm group hover:-translate-y-2 transition-transform duration-300`}
                        >
                            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                <span className="text-9xl font-black text-white leading-none -mr-4 -mt-4">{i + 1}</span>
                            </div>

                            <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${iconBg} ${iconColor} mb-6 shadow-inner`}>
                                <Icon size={32} strokeWidth={2} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}