"use client";

import Link from "next/link";
import Image from "next/image";
import { BackgroundBlobs } from "./ui/BackgroundBlobs";
import { ActionButton } from "./ui/ActionButton";

export function Hero() {
    return (
        <header className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-28 pb-20 overflow-hidden">
            {/* Fondo dinámico */}
            <BackgroundBlobs
                colors={["#EAB308", "#22c55e", "#f59e0b"]}
                className="opacity-30 blur-[100px] scale-150 animate-pulse-slow"
            />

            <div className="container px-4 mx-auto flex flex-col lg:flex-row items-center gap-12 z-10">

                {/* Texto */}
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-fade-in-up">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full group-hover:bg-yellow-500/30 transition-all duration-500"></div>
                        <Image
                            src="/c.png"
                            alt="Logo Clickcito"
                            width={80}
                            height={80}
                            className="relative w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                            priority
                        />
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
                        Tu negocio en internet <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500">
                            simple y sin vueltas
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
                        Ayudamos a comercios de San Vicente a vender más con herramientas digitales fáciles de usar. Sin complicaciones técnicas.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                        <ActionButton href="https://wa.me/543755246464?text=Hola!%20Quiero%20mejorar%20mi%20negocio%20con%20Clickcito" variant="primary" className="w-full sm:w-auto justify-center px-8 py-4 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-500/20">
                            <span className="mr-2">💬</span> Hablemos por WhatsApp
                        </ActionButton>

                        <CTASecondary href="#servicios" />
                    </div>
                </div>

                {/* Imagen/Mockup Representativo */}
                <div className="flex-1 w-full max-w-md lg:max-w-xl relative animate-float">
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-green-500/10 rounded-full blur-3xl animate-spin-slow-reverse"></div>

                    <div className="relative z-10 transform scale-95 hover:scale-100 transition-transform duration-500">
                        {/* Composition of services */}
                        <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl ring-1 ring-white/5 relative overflow-hidden">
                            {/* Abstract representation of "Local Business Success" */}
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" />
                                    <path d="M30 50L45 65L70 35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div className="space-y-4">
                                <ServiceCardMini title="Menú Digital" icon="🍔" status="Activo" color="text-green-400" />
                                <ServiceCardMini title="Sitio Web" icon="🌐" status="Online" color="text-blue-400" />
                                <ServiceCardMini title="Google Maps" icon="📍" status="Visible" color="text-red-400" />
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 mt-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">📞</div>
                                        <div className="flex-1 h-2 bg-white/10 rounded-full">
                                            <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-xs">Más consultas directas al WhatsApp</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Badge Local */}
                    <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-black font-bold px-4 py-2 rounded-full shadow-lg transform rotate-3 hover:rotate-0 transition-transform cursor-default">
                        📍 Hecho en San Vicente
                    </div>
                </div>
            </div>
        </header>
    );
}

function CTASecondary({ href }) {
    return (
        <Link
            href={href}
            className="group flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 w-full sm:w-auto"
        >
            Ver soluciones
            <svg
                className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </Link>
    );
}

function ServiceCardMini({ title, icon, status, color }) {
    return (
        <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <span className="font-medium text-gray-200">{title}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color.replace('text', 'bg')}`}></div>
                <span className={`text-xs ${color} font-medium`}>{status}</span>
            </div>
        </div>
    )
}
