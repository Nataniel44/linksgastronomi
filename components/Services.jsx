import { ActionButton } from "./ui/ActionButton";
import SectionWrapper from "./ui/SectionWrapper";

// Los datos están separados de la presentación
const servicesData = [
    {
        icon: "📱",
        title: "Cartas Digitales",
        description: "Menús online, QR, visuales y fáciles de actualizar para tu local.",
    },
    {
        icon: "🛒",
        title: "Apps Personalizadas",
        description: "Desarrollo de apps para pedidos, reservas y promociones a medida.",
    },
    {
        icon: "🚚",
        title: "Soluciones para Delivery",
        description: "Optimiza tu delivery y take away con tecnología moderna y fácil de usar.",
    },
];

const ServiceCard = ({ icon, title, description }) => (
    <li className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-yellow-400 flex flex-col items-center text-center">
        <span className="text-4xl mb-4">{icon}</span>
        <h3 className="font-bold text-xl mb-2 text-yellow-500">{title}</h3>
        <p className="text-gray-700 text-balance">{description}</p>
    </li>
);

export function Services() {
    return (
        <SectionWrapper id="servicios">
            <h2 className="text-3xl font-bold text-yellow-500 mb-10 text-center tracking-wide drop-shadow">
                ¿Qué ofrecemos?
            </h2>

            {/* Mapeamos los datos para generar las tarjetas dinámicamente */}
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {servicesData.map((service) => (
                    <ServiceCard key={service.title} {...service} />
                ))}
            </ul>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-12">
                <ActionButton href="#contacto" variant="primary">
                    Solicitá tu demo
                </ActionButton>
                <ActionButton href="#servicios" variant="secondary">
                    Ver servicios
                </ActionButton>
            </div>
        </SectionWrapper>
    );
}