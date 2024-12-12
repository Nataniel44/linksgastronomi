import { ProductCard } from "./ProductCard";

export const ProductCarousel = ({ products, addToCart }) => {
    // Función para desplazar el carrusel
    const scrollCarousel = (direction) => {
        const container = document.querySelector("#carousel-container");
        const scrollAmount = container.offsetWidth / 1.7; // Ajusta según lo que necesites
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    };

    // Verificar si hay productos
    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-gray-500 text-lg">No hay productos disponibles en este momento.</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden">
            {/* Botón izquierdo */}
            <button
                onClick={() => scrollCarousel("left")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 rotate-180 z-20 w-10 h-10 bg-yellow-300 shadow-lg rounded-full flex items-center justify-center hover:bg-yellow-200 focus:outline-none"
            >
                <span className="material-icons">❯</span>
            </button>

            {/* Botón derecho */}
            <button
                onClick={() => scrollCarousel("right")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-yellow-300 shadow-lg rounded-full flex items-center justify-center hover:bg-yellow-200 focus:outline-none"
            >
                <span className="material-icons">❯</span>
            </button>

            {/* Degradados laterales */}
            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white via-white/75 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/75 to-transparent pointer-events-none z-10" />

            {/* Contenedor principal */}
            <div
                id="carousel-container"
                className="flex gap-10 overflow-x-auto scroll-snap-x scrollbar-hide px-10 pb-3"
            >
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="justify-center flex-shrink-0 md:justify-center scroll-snap-start md:flex-grow md:max-w-[300px]"
                    >
                        <ProductCard product={product} addToCart={addToCart} />
                    </div>
                ))}
            </div>
        </div>
    );
};
