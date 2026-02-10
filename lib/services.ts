export const services = [
    {
        slug: "cartas-digitales",
        title: "Menú Digital",
        className: "md:col-span-2",
        description: "Tus clientes ven la carta y te piden directo por WhatsApp. Sin comisiones, sin intermediarios. Ideal para restobares y deliverys.",
        gradient: "from-emerald-500 to-green-500",
        bgGradient: "from-neutral-900 to-neutral-800",
        icon: "Smartphone",
        cta: {
            label: "Ver modelo",
            href: "https://wa.me/543755246464?text=Hola!%20Me%20interesa%20el%20Men%C3%BA%20Digital",
        },
    },
    {
        slug: "sitios-web",
        title: "Sitios Web Simples",
        className: "",
        description: "Tu negocio en internet con una página rápida y clara. Mostrá quién sos, qué vendés y dónde estás.",
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-neutral-900 to-neutral-800",
        icon: "Globe", // Changed to Globe
        cta: {
            label: "Quiero mi web",
            href: "https://wa.me/543755246464?text=Hola!%20Quiero%20info%20sobre%20Sitios%20Web",
        },
    },
    {
        slug: "diseno-publicitario",
        title: "Diseño Publicitario",
        className: "",
        description: "Flyers para redes, estados de WhatsApp y promos que llamen la atención. Hacemos que tu marca se vea profesional.",
        gradient: "from-pink-500 to-rose-500",
        bgGradient: "from-neutral-900 to-neutral-800",
        icon: "Palette",
        cta: {
            label: "Ver diseños",
            href: "https://wa.me/543755246464?text=Hola!%20Necesito%20dise%C3%B1os%20para%20redes",
        },
    },
    {
        slug: "soluciones-a-medida",
        title: "Soluciones a Medida",
        className: "",
        description: "¿Necesitás algo específico? Turneros, catálogos, sistemas simples. Lo charlamos y lo armamos.",
        gradient: "from-yellow-400 to-orange-500",
        bgGradient: "from-neutral-900 to-neutral-800",
        icon: "Layers", // Changed to Layers
        cta: {
            label: "Consultar",
            href: "https://wa.me/543755246464?text=Hola!%20Tengo%20una%20idea%20para%20un%20proyecto",
        },
    },

];

export async function getAllServices() {
    return services;
}

export async function getServiceBySlug(slug: string) {
    return services.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}
