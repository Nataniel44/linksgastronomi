"use client";

export default function About() {
    return (
        <section className="relative w-full px-4 py-20 md:py-32 bg-neutral-950 text-center overflow-hidden border-b border-white/5">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-neutral-950 to-neutral-950"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                <div className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm font-bold tracking-widest uppercase mb-4">
                    Sobre Nosotros
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                    ¿Qué es <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Clickcito</span>?
                </h2>

                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light text-pretty">
                    Somos tu socio digital en <span className="text-white font-medium">San Vicente</span>.
                    Ayudamos a los negocios del barrio a tener presencia en internet de forma <span className="text-white font-bold decoration-yellow-500/50 underline decoration-4 underline-offset-4">simple, rápida y económica</span>.
                </p>

                <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                    <div>
                        <p className="text-3xl font-bold text-white">Local</p>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">100% Misionero</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">Simple</p>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Sin vueltas</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">Rápido</p>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Listo en 48hs</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">Humano</p>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Trato directo</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
