"use client";

import Link from "next/link";
import Image from "next/image";
import { BackgroundBlobs } from "./ui/BackgroundBlobs";
import { ActionButton } from "./ui/ActionButton";

export function Hero() {
    return (
        <header className="relative w-full flex flex-col items-center justify-center pt-28 pb-14">
            {/* Fondo dinámico */}
            <BackgroundBlobs
                colors={["#fde047", "#facc15", "#fbbf24"]}
                className="opacity-40 blur-2xl scale-110"
            />

            <div className="md:w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center gap-8 z-10">
                {/* Logo */}
                <div>
                    <Image
                        src="/log.png"
                        alt="Logo de la empresa"
                        width={320}
                        height={150}
                        priority
                        className="drop-shadow-lg select-none"
                    />
                </div>

                {/* Título principal */}
                <h1 className="text-2xl md:text-4xl lg:text-4xl font-regular text-balance leading-tight max-w-3xl text-yellow-400 tracking-tight">
                    <span className="font-bold">Soluciones</span>{" "}
                    <span className="relative ">
                        <span className="font-bold">digitales

                        </span>           sitios web y menús interactivos para restaurantes.
                    </span>



                </h1>

                {/* Botones */}
                <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                    <ActionButton href="/elysrestobar" variant="primary">
                        <svg
                            className="w-6 h-6 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        Ver Carta Demo
                    </ActionButton>

                    <Link
                        href="#contacto"
                        className="text-green-500 hover:underline flex items-center gap-1"
                    >
                        Contáctanos para más info
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
}
