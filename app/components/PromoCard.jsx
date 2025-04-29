"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Las ofertas que se mostrarán en el carrusel
const offers = [
    "2 TOP ONE + PAPAS FRITAS = $",
    "3 TOP ONE + PAPAS FRITAS",
    "PIZZA MARGHERITA CON BEBIDA GRATIS",
    "COMBO FAMILIAR + DESSERTS",
];

export default function PromoCarousel() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1); // Controla la dirección de la animación (1 es derecha, -1 es izquierda)

    // Configuramos el intervalo para cambiar la oferta cada 4 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1); // Dirección hacia la derecha
            setIndex((prevIndex) => (prevIndex + 1) % offers.length); // Reciclamos el índice
        }, 4000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    // Función para navegar manualmente a la siguiente oferta (a la derecha)
    const nextOffer = () => {
        setDirection(1); // Dirección hacia la derecha
        setIndex((prevIndex) => (prevIndex + 1) % offers.length); // Reciclamos el índice
    };

    // Función para navegar manualmente a la oferta anterior (a la izquierda)
    const prevOffer = () => {
        setDirection(-1); // Dirección hacia la izquierda
        setIndex((prevIndex) => (prevIndex - 1 + offers.length) % offers.length); // Reciclamos el índice
    };

    return (
        <div className="relative max-w-lg h-40 mx-auto overflow-hidden p-4 flex justify-center items-center">

            <motion.div
                key={index} // Usamos solo el índice como clave para cada promoción
                initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }} // Se mueve a la derecha o izquierda
                animate={{ opacity: 1, x: 0 }} // Se mueve al centro
                exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }} // Sale a la derecha o izquierda
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-2xl text-center"
            >
                {offers[index]} {/* Mostramos la oferta actual */}
            </motion.div>


            {/* Controles manuales para navegar por las ofertas */}
            <div className="absolute inset-0 flex items-center justify-between px-2 ">
                <button
                    onClick={prevOffer} // Función para ir a la oferta anterior
                    className="bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full"
                >
                    ◀
                </button>
                <button
                    onClick={nextOffer} // Función para ir a la siguiente oferta
                    className="bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full"
                >
                    ▶
                </button>
            </div>
        </div>
    );
}
