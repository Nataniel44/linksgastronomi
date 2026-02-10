"use client";

import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';

export function WhatsAppContact() {
    return (
        <section id="contacto" className="relative py-24 overflow-hidden w-full bg-neutral-900">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-green-500/5 to-transparent blur-3xl pointer-events-none"></div>

            <div className="container px-4 mx-auto relative z-10 text-center">
                <div className="inline-flex items-center justify-center p-3 mb-8 bg-green-500/10 rounded-2xl animate-bounce-subtle border border-green-500/20">
                    <MessageCircle className="w-8 h-8 text-green-400" />
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                    ¿Charlamos sobre <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        tu negocio?
                    </span>
                </h2>

                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Sin compromisos. Contanos qué idea tenés y vemos cómo te podemos ayudar a vender más.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="https://wa.me/543755246464?text=Hola!%20Quiero%20charlar%20sobre%20mi%20negocio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-green-600 rounded-xl hover:bg-green-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg shadow-green-500/20"
                    >
                        <span className="relative flex items-center gap-3">
                            <Send className="w-5 h-5" />
                            Enviar mensaje por WhatsApp
                        </span>
                    </a>

                    <Link
                        href="#servicios"
                        className="px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
                    >
                        Ver servicios de nuevo
                    </Link>
                </div>

                {/* Trust indicators */}
                <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <Stat number="Local" label="San Vicente" />
                    <Stat number="0%" label="Comisiones" />
                    <Stat number="WhatsApp" label="Todo Directo" />
                    <Stat number="100%" label="A medida" />
                </div>
            </div>
        </section>
    );
}

function Stat({ number, label }: { number: string, label: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-black text-white mb-2">{number}</span>
            <span className="text-sm text-gray-400 uppercase tracking-widest font-medium">{label}</span>
        </div>
    )
}
