"use client";

import { motion } from "framer-motion";

interface Service {
    title: string;
    description: string;
    cta?: { href: string; label: string };
}

interface ServiceClientProps {
    service: Service;
}

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.15, duration: 0.5, ease: "easeOut" },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

export default function ServiceClient({ service }: ServiceClientProps) {
    return (
        <motion.div
            className="max-w-3xl mx-auto p-8 md:p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Título */}
            <motion.h1
                className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white"
                variants={itemVariants}
            >
                {service.title}
            </motion.h1>

            {/* Descripción */}
            <motion.p
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                variants={itemVariants}
            >
                {service.description}
            </motion.p>

            {/* CTA */}
            {service.cta && (
                <motion.a
                    href={service.cta.href}
                    className="inline-block mt-8 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {service.cta.label}
                </motion.a>
            )}
        </motion.div>
    );
}
