import PromoCard from "./PromoCard";

const promotions = [
    {
        image: "./class.jpeg",
        title: "Descuento del 50%",
        description: "Aprovecha este increíble descuento en todos los productos.",
        buttonText: "Ver Oferta",
        buttonLink: "/ofertas",
    },
    {
        image: "./class.jpeg",
        title: "Envío Gratis",
        description: "Haz tu pedido hoy y obtén envío gratis a todo el país.",
        buttonText: "Más Info",
        buttonLink: "/envios",
    },
];

const PromoList = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {promotions.map((promo, index) => (
                <PromoCard key={index} {...promo} />
            ))}
        </div>
    );
};

export default PromoList;
