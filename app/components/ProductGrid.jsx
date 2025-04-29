import React from "react";

export const ProductGrid = ({ products, addToCart }) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
            {products.map((product, index) => (
                <div
                    key={index}
                    className="border rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    <div className="text-xl font-bold mb-4">${product.price}</div>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
                    >
                        Agregar al Carrito
                    </button>
                </div>
            ))}
        </section>
    );
};
