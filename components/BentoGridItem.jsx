"use client";
import { motion } from "framer-motion";

// Variante para la animación de cada item individual
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

export const BentoGridItem = ({ className, title, description, icon }) => {
    return (
        <motion.li
            variants={itemVariants}
            className={`relative group rounded-2xl p-6 flex flex-col justify-center items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-yellow-200/50 cursor-pointer overflow-hidden ${className}`}
        >
            {/* Efecto de brillo que sigue al mouse */}

            {/* Contenido de la tarjeta */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center ">
                <div className="text-5xl mb-4">{icon}</div>
                <div className="flex-grow"></div>
                <h3 className="font-bold text-lg text-gray-800 ">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm mt-1 text-balance">
                    {description}
                </p>
            </div>
        </motion.li>
    );
};