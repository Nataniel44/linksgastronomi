"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroBlob() {
    return (
        <section className="relative w-full flex flex-col items-center justify-center pt-16 overflow-hidden ">
            {/* Blobs dinámicos */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
                className="absolute w-[800px] h-[800px] top-[-200px] left-1/2 -translate-x-1/2 opacity-30"
            >

            </motion.div>



            {/* Contenedor de contenido */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center text-center gap-6 px-4"
            >
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
                    Hola, soy <span className="text-yellow-500">Nataniel</span>
                </h1>
                {/* Imagen */}
                <div className="flex flex-col md:flex-row items-center rounded-t-lg md:rounded-e-lg gap-5 p-5 max-w-4xl bg-black">


                    <Image
                        src="/nata.jpeg"
                        alt="Nataniel"
                        width={150}
                        height={256}
                        className="object-cover w-full h-full overflow-hidden md:rounded-e-lg rounded-t-lg"
                    />

                    {/* Texto */}


                    <p className="text-white max-w-xl text-lg md:text-2xl md:text-start px-5 text-pretty ">
                        Desarrollo sitios web y experiencias digitales elegantes y funcionales,
                        combinando diseño UX/UI con soluciones modernas.
                    </p>
                </div>

            </motion.div>
        </section>
    );
}
