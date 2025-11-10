"use client";

import { ShoppingBag, MousePointerClick, ClipboardList, Send } from "lucide-react";

export default function ClickcitoIntro() {
    const steps = [
        {
            icon: MousePointerClick,
            title: "1. Elegí una categoría",
            desc: "Seleccioná lo que querés pedir: comidas, bebidas o postres. Así filtrás todo rápido.",
        },
        {
            icon: ClipboardList,
            title: "2. Completá tus datos",
            desc: "Ingresá tu nombre, dirección y método de entrega o pago.",
        },
        {
            icon: ShoppingBag,
            title: "3. Revisá tu pedido",
            desc: "Verificá los productos elegidos antes de confirmar.",
        },
        {
            icon: Send,
            title: "4. Enviá tu pedido 🚀",
            desc: "Clickcito lo manda directo al comercio por WhatsApp, sin vueltas.",
        },
    ];

    return (
        <section className="w-full px-6 py-5 pb-20">
            {/* Scroll horizontal con snap */}
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory p-6 -mx-6 ">
                {steps.map(({ icon: Icon, title, desc }, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center bg-gradient-to-br from-green-500/10 to-green-900/20 border border-green-500/20 rounded-3xl p-6 shadow-lg hover:shadow-green-500/20 transition-all hover:scale-[1.03] backdrop-blur-sm"
                    >
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20 text-green-400 mb-4">
                            <Icon size={26} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                    </div>
                ))}
            </div>

            {/* Indicador de scroll (opcional) */}
            <div className="flex justify-center gap-2 mt-6 sm:hidden">
                {steps.map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-green-500/30"
                    />
                ))}
            </div>

            <div className="text-center mt-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-3">
                    Bienvenido a <span className="text-green-400">Clickcito</span> 👋
                </h2>
                <p className="text-gray-300">
                    Pedir nunca fue tan fácil — seleccioná, completá y enviá. ¡Tu pedido llega directo al comercio sin apps ni demoras!
                </p>
            </div>
        </section>
    );
}