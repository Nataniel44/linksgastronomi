"use client";

import { motion } from "framer-motion";

export function WhatsAppContact() {
    const phoneNumber = "543755246464"; // reemplazá con tu número
    const message = encodeURIComponent("Hola, quiero contactarte desde tu web.");

    return (
        <section id="contacto" className="w-full flex justify-center py-24 ">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl flex flex-col gap-6 items-center border-t-4 border-green-400"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-green-600 text-center">
                    ¿Quieres contactarme?
                </h2>
                <p className="text-gray-600 text-center">
                    Haz clic en el botón y envíame un mensaje directo por WhatsApp.
                    ¡Es rápido y fácil!
                </p>
                <a
                    href={`https://wa.me/${phoneNumber}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full shadow-lg flex items-center gap-3 transition transform hover:scale-105"
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12.004 2C6.486 2 2 6.486 2 12c0 2.118.555 4.094 1.516 5.81L2 22l4.426-1.489A9.963 9.963 0 0012.004 22c5.518 0 10.004-4.486 10.004-10S17.522 2 12.004 2zm5.39 14.805c-.194.545-1.088 1.041-1.514 1.103-.403.06-.895.086-1.985-.464-2.154-1.027-3.518-3.44-3.62-3.598-.103-.158-.837-1.195-.837-2.281s.856-1.64 1.154-1.757c.3-.118.655-.148.875-.148.218 0 .464.002.667.002.218 0 .498-.08.786.594.287.676.97 2.327 1.053 2.5.082.173.137.375.027.604-.108.227-.162.36-.324.564-.162.202-.344.453-.49.607-.145.155-.298.327-.13.644.167.316.742 1.23 1.593 1.985 1.097.983 2.016 1.195 2.345 1.331.328.137.52.115.71-.069.192-.184.827-.953 1.057-1.686.23-.734.23-1.363.162-1.486-.067-.123-.246-.198-.518-.35z" />
                    </svg>
                    Enviar mensaje
                </a>
            </motion.div>
        </section>
    );
}
