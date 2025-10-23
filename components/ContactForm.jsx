'use client'; // Necesario para manejar el estado del formulario si se añade

import SectionWrapper from "./ui/SectionWrapper";

export function ContactForm() {
    return (
        <SectionWrapper id="contacto" className="w-full max-w-2xl mx-auto">
            <form
                action="https://formspree.io/f/xdkdejvr"
                method="POST"
                className="flex flex-col gap-5 bg-white rounded-2xl shadow-xl p-8 border-t-4 border-yellow-400 text-black"
            >
                <h2 className="text-3xl font-bold text-yellow-500 mb-4 text-center drop-shadow">
                    ¿Listo para digitalizar tu carta?
                </h2>

                <div>
                    <label htmlFor="localName" className="sr-only">Nombre del local</label>
                    <input
                        id="localName"
                        type="text"
                        name="local"
                        placeholder="Nombre del local"
                        required
                        className="w-full p-4 border rounded-md focus:ring-2 focus:ring-yellow-400 text-lg"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="sr-only">Email de contacto</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email de contacto"
                        required
                        className="w-full p-4 border rounded-md focus:ring-2 focus:ring-yellow-400 text-lg"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="sr-only">¿Qué tipo de solución buscas?</label>
                    <textarea
                        id="message"
                        name="mensaje"
                        placeholder="¿Qué tipo de solución buscas?"
                        required
                        className="w-full p-4 border rounded-md focus:ring-2 focus:ring-yellow-400 text-lg"
                        rows={4}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-full shadow-lg mt-2 transition text-lg border-2 border-transparent hover:border-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                >
                    Contactar
                </button>
            </form>
        </SectionWrapper>
    );
}   