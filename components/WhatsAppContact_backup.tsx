"use client";

import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { ActionButton } from "./ui/ActionButton";

export function WhatsAppContact() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section id="contacto" className="relative py-24 overflow-hidden w-full">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-neutral-900/50 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-green-500/5 to-transparent blur-3xl pointer-events-none"></div>

            <div className="container px-4 mx-auto relative z-10 text-center">
                <div className="inline-flex items-center justify-center p-3 mb-8 bg-green-500/10 rounded-2xl animate-bounce-subtle">
                    <MessageCircle className="w-8 h-8 text-green-400" />
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                    ¿Listo para transformar <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        tu negocio gastronómico?
                    </span>
                </h2>

                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Unite a los restaurantes que ya están aumentando sus ventas con Clickcito. Sin comisiones, directo a tu WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="https://wa.me/5491112345678?text=Hola!%20Quiero%20m%C3%A1s%20info%20sobre%20Clickcito%20%F0%9F%9A%80"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-green-600 rounded-xl hover:bg-green-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-200 ease-out bg-green-900 rounded-xl group-hover:mt-0 group-hover:ml-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-green-600 rounded-xl"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl"></span>
                        <span className="relative flex items-center gap-3">
                            <Send className="w-5 h-5" />
                            Hablar con un asesor
                        </span>
                    </a>

                    <Link
                        href="/demo"
                        className="px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
                    >
                        Ver Demo Interactiva
                    </Link>
                </div>

                {/* FAQ or Trust indicators could go here */}
                <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <Stat number="50+" label="Restaurantes" />
                    <Stat number="0%" label="Comisiones" />
                    <Stat number="24/7" label="Soporte" />
                    <Stat number="100%" label="Personalizable" />
                </div>
            </div>
        </section>
    );
}

function Stat({ number, label }: { number: string, label: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white mb-2">{number}</span>
            <span className="text-sm text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
    )
}
