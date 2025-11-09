"use client";
import { Check } from "lucide-react";

export default function PricingSection() {
    const plans = [
        {
            name: "Emprendedor",
            price: "8500$/mes",
            gradient: "from-green-50 to-white",
            border: "border-green-200",
            text: "text-green-600",
            features: [
                "Menú digital ilimitado",
                "Redes sociales integradas",
                "Pedidos por WhatsApp",
                "Diseño Adaptativo (PC, móvil y tablet)",
                "Soporte por mensaje",
            ],
            cta: "Empezar ahora",
            whatsapp: "https://wa.me/543755538503?text=Hola!%20Estoy%20interesado%20en%20el%20plan%20Emprendedor%20de%20Clickcito.%20Quisiera%20más%20información.",
        },
        {
            name: "Empresa",
            price: "$30.000/mes",
            gradient: "from-purple-50 to-white",
            border: "border-purple-200",
            text: "text-purple-600",
            features: [
                "Todo lo del plan Emprendedor",
                "Promociones y descuentos",
                "Panel administrativo completo",
                "Flyers y material promocional",
                "QR personalizado",
                "Soporte prioritario",
                "Dominio personalizado",
                "Integraciones avanzadas",
                "Análisis y reportes detallados",
            ],
            cta: "Probar Premium",
            whatsapp: "https://wa.me/543755538503?text=Hola!%20Estoy%20interesado%20en%20el%20plan%20Empresa%20de%20Clickcito.%20Quisiera%20más%20información.",
        },
    ];

    return (
        <section className="py-20 bg-white w-full text-zinc-900 relative overflow-hidden">
            {/* Sutil brillo de fondo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(120,120,255,0.05),_transparent_70%)]" />

            <div className="relative mx-auto px-6 text-center max-w-6xl">
                <h2 className="text-4xl font-extrabold mb-4 text-gray-900 transition-opacity duration-700 opacity-100 animate-fade-in">
                    Planes que crecen contigo 🚀
                </h2>
                <p className="text-gray-500 mb-12 max-w-xl mx-auto animate-fade-in delay-200">
                    Elegí el plan que mejor se adapte a tu negocio. Clickcito te acompaña en cada paso.
                </p>

                <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl border ${plan.border} bg-gradient-to-br ${plan.gradient} shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] animate-slide-up`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="p-8 space-y-6">
                                <h3 className={`text-2xl font-bold ${plan.text}`}>{plan.name}</h3>
                                <p className="text-4xl font-extrabold text-gray-900">{plan.price}</p>

                                <div className="flex flex-col gap-3 text-left">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                            <div className="bg-white border rounded-full p-1.5">
                                                <Check className={`w-3.5 h-3.5 ${plan.text}`} />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {/* Botón con link a WhatsApp */}
                                <a
                                    href={plan.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block w-full text-center  py-3 rounded-xl font-semibold transition-all border ${plan.border} hover:bg-opacity-80 ${plan.text}`}
                                >
                                    {plan.cta}
                                </a>
                            </div>

                            {/* borde decorativo al hover */}
                            <div
                                className={`absolute inset-0 rounded-2xl border-2 opacity-0 hover:opacity-100 transition-all duration-500 ${plan.border} pointer-events-none`}
                            />

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
