export const services = [
    {
        slug: "cartas-digitales",
        title: "Cartas Digitales",
        className: "md:col-span-2 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-2 border-yellow-200/50 hover:border-yellow-300 transition-colors",

        description: "Menús QR y web dinámicos para tu local.",
        gradient: " from-blue-500 to-cyan-500 ",
        bgGradient: "from-blue-50 to-cyan-50",
        icon: "Smartphone",
        cta: {
            label: "Ver Cartas Digitales",
            href: "https://wa.me/543755246464?text=Hola,+quiero+información+sobre+Cartas+Digitales",
        },
    },
    {
        slug: "apps-personalizadas",
        title: "Apps Personalizadas",
        description:
            "Desarrollo de apps para pedidos, reservas y promociones a medida.",
        gradient: "from-yellow-500 to-orange-500",
        bgGradient: "from-yellow-50 to-orange-50",
        icon: "ShoppingBag",
        cta: {
            label: "Ver Apps Personalizadas",
            href: "https://wa.me/543755246464?text=Hola,+quiero+información+sobre+Apps+Personalizadas",
        },
    },
    {
        slug: "diseno-publicitario",
        title: "Diseño Publicitario y Flyers",
        description:
            "Diseños impactantes para redes sociales, eventos y campañas. Flyers, banners y contenido visual que atrae y vende.",
        gradient: "from-pink-500 to-rose-500",
        bgGradient: "from-pink-50 to-rose-50",
        icon: "Palette",
        cta: {
            label: "Ver Diseños Publicitarios",
            href: "https://wa.me/543755246464?text=Hola,+quiero+información+sobre+Diseño+Publicitario+y+Flyers",
        },
    },

];

export async function getAllServices() {
    return services;
}

export async function getServiceBySlug(slug: string) {
    return services.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}
