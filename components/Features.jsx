"use client";
import Image from "next/image";
import SectionWrapper from "./ui/SectionWrapper";
import { BackgroundBlobs } from "./ui/BackgroundBlobs";
import { ActionButton } from "./ui/ActionButton";
import { MapPin, Smile, DollarSign, Smartphone } from "lucide-react";

export function Features() {

    const features = [
        { icon: MapPin, text: "Acá en San Vicente", sub: "Nos ves la cara y hablamos en persona si hace falta." },
        { icon: DollarSign, text: "Sin comisiones", sub: "Lo que vendés es 100% tuyo. No te sacamos porcentaje." },
        { icon: Smartphone, text: "Todo por WhatsApp", sub: "Directo a tu celular. Sin apps raras ni usuarios." },
        { icon: Smile, text: "Trato humano", sub: "Te explicamos todo paso a paso, sin palabras difíciles." },
    ];

    return (
        <SectionWrapper className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden py-24 relative bg-neutral-900 border-y border-white/5">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Columna de texto */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full border border-yellow-500/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            <span className="text-yellow-400 text-sm font-bold uppercase tracking-wider">¿Por qué elegirnos?</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
                            No somos una <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                agencia gigante
                            </span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed font-light">
                            Somos vecinos de San Vicente que entienden lo que necesita un comercio local: soluciones que funcionen, sin gastar una fortuna.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 w-full mb-12">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="p-2 bg-neutral-800 rounded-lg text-yellow-500">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-white font-bold text-lg mb-1">{feature.text}</h3>
                                        <p className="text-gray-400 text-sm leading-snug">{feature.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Columna de imagen / Representación Local */}
                    <div className="relative flex items-center justify-center h-full mt-12 lg:mt-0">
                        {/* Circle Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-orange-500/20 rounded-full blur-[100px]"></div>

                        <div className="relative z-10 grid grid-cols-2 gap-4 rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
                            {/* Card 1: Comerciante Hablando */}
                            <div className="col-span-2 bg-neutral-800 p-6 rounded-3xl border border-white/10 shadow-xl flex items-center gap-4 animate-float">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">👋</div>
                                <div>
                                    <p className="text-white font-bold text-lg">&quot;Me facilitaron todo&quot;</p>
                                    <p className="text-gray-400 text-sm">Claudio, Dueño de Hamburguesería</p>
                                </div>
                            </div>

                            {/* Card 2: Ventas */}
                            <div className="bg-neutral-800 p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between animate-float-delay h-48">
                                <span className="text-4xl">📈</span>
                                <div>
                                    <p className="text-3xl font-bold text-white mb-1">+30%</p>
                                    <p className="text-gray-400 text-sm">Más consultas por WhatsApp</p>
                                </div>
                            </div>

                            {/* Card 3: Local */}
                            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 rounded-3xl shadow-xl flex flex-col justify-between text-black animate-float-reverse h-48">
                                <MapPin className="w-10 h-10" />
                                <div>
                                    <p className="font-black text-xl leading-tight">Negocios <br />de San Vicente</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
