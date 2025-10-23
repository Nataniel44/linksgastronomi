import Link from "next/link";
import Image from "next/image";
import { BackgroundBlobs } from "./ui/BackgroundBlobs";
import { ActionButton } from "./ui/ActionButton";

export function Hero() {
    return (
        <header className="relative w-full flex flex-col items-center justify-center pt-20 pb-14">
            {/* Usamos el componente de fondo reutilizable */}
            <BackgroundBlobs
                colors={["#fde047", "#facc15", "#fbbf24"]}
                className="opacity-40"
            />

            <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center gap-8 z-10">
                <Image
                    src="/log.png" // Asume que las imágenes están en la carpeta /public
                    alt="Logo de la empresa"
                    width={384} // w-96
                    height={150} // Altura estimada, ajústala
                    priority // Cargar esta imagen primero
                />
                <h1 className="text-xl md:text-3xl font-semibold text-yellow-500 text-balance">
                    Menús Digitales y Apps para Gastronomía
                </h1>

                <div className="flex flex-col items-center gap-4 mt-4">
                    <ActionButton href="/demo" variant="primary">
                        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        Ver carta de Top One Burgers
                    </ActionButton>

                    <Link href="#contacto" className="text-green-500 hover:underline flex items-center gap-1">
                        Contáctanos para más info
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
}