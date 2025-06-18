import { useState } from "react";
import ProductCard from "./ProductCard";
import { Modal } from "./Modal"; // Importa tu modal
import Image from "next/image";

export const ProductCarousel = ({ products, addToCart }) => {
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const scrollCarousel = (direction) => {
        const container = document.querySelector("#carousel-container");
        const scrollAmount = container.offsetWidth / 1.7;
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const openModal = (product) => {
        document.startViewTransition(() => {
            setSelectedProduct(product);
            setIsProductModalOpen(true);
        });
    };

    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-gray-500 text-lg">No hay productos disponibles en este momento.</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden ">
            {/* Botones de desplazamiento */}
            <button onClick={() => scrollCarousel("left")} className="absolute left-4 top-1/2 transform -translate-y-1/2 rotate-180 z-20 w-10 h-10 bg-yellow-300/85 shadow-lg rounded-full flex items-center justify-center hover:bg-yellow-200">
                ❯
            </button>
            <button onClick={() => scrollCarousel("right")} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-yellow-300/85 shadow-lg rounded-full flex items-center justify-center hover:bg-yellow-200">
                ❯
            </button>

            {/* Contenedor del carrusel */}
            <div id="carousel-container" className="flex gap-8 overflow-x-auto scroll-snap-x scrollbar-hide px-14 p-3">
                {products.map((product, index) => (
                    <div key={index}
                         className="justify-center flex-shrink-0 md:justify-center scroll-snap-start md:flex-grow md:max-w-[300px]">
                        <ProductCard
                         product={product} 
                         addToCart={addToCart} 
                         openModal={() => openModal(product)}
                         />
                    </div>
                ))}
            </div>

            {/* Modal con detalles del producto */}
            <Modal isOpen={isProductModalOpen} closeModal={() => {
                document.startViewTransition(() => {
                    setIsProductModalOpen(false);
                });
            }}
            >

                {selectedProduct && (
                    <div
                        className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl shadow-lg w-full max-w-[480px] bg-transparent transition duration-300"
                        style={{ viewTransitionName: "modal"}}
                    >
                        <div className="w-full max-w-[144px] h-full">
                            <Image
                                src={selectedProduct.image} 
                                alt={selectedProduct.name}
                                width={144}
                                height={144}
                                className="w-full h-full object-cover rounded-lg shadow-md"
                                style={{ viewTransitionName: `product-${selectedProduct.id}` }} />
                        </div>
                        <div className="flex flex-col gap-4 text-black w-full ">
                            <h2 className="text-2xl font-extrabold text-yellow-500 uppercase text-start">{selectedProduct.name}</h2>
                            <p className="text-base text-gray-700 text-start bg-gray-100 rounded-lg shadow-inner p-4">{selectedProduct.description}</p>
                            <div className="flex flex-col items-center gap-4 w-full ">
                                <p className="text-4xl font-bold text-gray-800 ">
                                    <span className="text-yellow-500 ">Precio:</span> ${selectedProduct.price}
                                </p>
                                <button onClick={() => addToCart(selectedProduct)} className="text-gray-600 px-6 py-3 rounded-full hover:border-yellow-400 hover:text-black hover:bg-yellow-300 border-gray-400 border-2 shadow-lg font-bold text-lg transition duration-300">
                                        Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </Modal>
        </div>
    );
};
