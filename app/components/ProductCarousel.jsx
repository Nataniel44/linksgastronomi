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
              <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in border border-yellow-100 relative">
                {/* Botón de cerrar */}
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 bg-gray-100 hover:bg-yellow-100 rounded-full w-9 h-9 flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-yellow-200 z-10 transition"
                  aria-label="Cerrar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Image
                  width="192"
                  height="192"
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-xl shadow-lg border-4 border-yellow-100 mb-2"
                />
                <div className="flex flex-col gap-3 text-black w-full">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-yellow-500 uppercase text-center drop-shadow-sm tracking-wide">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-xs sm:text-base text-gray-700 text-start bg-yellow-50 rounded-xl p-3 sm:p-5 shadow-inner border border-yellow-100">
                    {selectedProduct.description}
                  </p>
                  <div className="flex flex-col items-end gap-3 w-full mt-2">
                    <p className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-yellow-500 text-xl sm:text-2xl">${selectedProduct.price}</span>
                      <span className="text-xs sm:text-sm text-gray-500 font-normal">ARS</span>
                    </p>
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-full font-bold shadow-lg text-base sm:text-lg hover:scale-105 hover:from-yellow-500 hover:to-yellow-400 transition-all border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                    >
                      <svg className="inline-block w-5 h-5 mr-2 -mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                      </svg>
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
