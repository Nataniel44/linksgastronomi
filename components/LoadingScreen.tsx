"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            {/* Spinner */}
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                }}
                className="mb-4"
            >
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </motion.div>

            {/* Texto elegante */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
                Cargando menú...
            </motion.p>

            {/* Efecto de puntos animados */}
            <motion.div
                className="flex mt-2 space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                        className="w-2 h-2 bg-primary rounded-full"
                    />
                ))}
            </motion.div>
        </div>
    );
}
