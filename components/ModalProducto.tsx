"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Extra = { name: string; price: number };

type Product = {
    id: number;
    name: string;
    description?: string | null;
    image?: string | null;
    price: number;
    comparePrice?: number | null;
    options?: { extras?: Extra[] };
};

type Props = {
    product: Product;
    onClose: () => void;
    getImageSrc: (src?: string) => string;
    onAddToCart: (product: Product, quantity: number, selectedExtras: Extra[]) => void;
};

export const ModalProducto: React.FC<Props> = ({ product, onClose, getImageSrc, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
    const [total, setTotal] = useState(product.price);

    useEffect(() => {
        const extrasTotal = selectedExtras.reduce((acc, e) => acc + e.price, 0);
        setTotal((product.price + extrasTotal) * quantity);
    }, [quantity, selectedExtras, product.price]);

    const toggleExtra = (extra: Extra) => {
        setSelectedExtras(prev =>
            prev.find(e => e.name === extra.name) ? prev.filter(e => e.name !== extra.name) : [...prev, extra]
        );
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-900 rounded-xl overflow-hidden max-w-lg w-full" onClick={e => e.stopPropagation()}>
                {product.image && (
                    <Image
                        src={getImageSrc(product.image)}
                        alt={product.name}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                    />
                )}
                <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                    {product.description && <p className="text-white/80">{product.description}</p>}
                    {product.comparePrice && <p className="text-red-400 line-through">${product.comparePrice}</p>}

                    {/* Extras */}
                    {product.options?.extras && product.options.extras.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-white font-semibold">Extras:</p>
                            <div className="flex flex-wrap gap-2">
                                {product.options.extras.map(extra => (
                                    <button
                                        key={extra.name}
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${selectedExtras.find(e => e.name === extra.name)
                                            ? "bg-green-500 text-white"
                                            : "bg-white/10 text-white hover:bg-green-400/70 transition"
                                            }`}
                                        onClick={() => toggleExtra(extra)}
                                    >
                                        {extra.name} (+${extra.price})
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cantidad */}
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-white font-semibold">Cantidad:</span>
                        <button
                            className="px-3 py-1 bg-white/10 rounded-full text-white hover:bg-white/20"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        >
                            -
                        </button>
                        <span className="text-white">{quantity}</span>
                        <button
                            className="px-3 py-1 bg-white/10 rounded-full text-white hover:bg-white/20"
                            onClick={() => setQuantity(q => q + 1)}
                        >
                            +
                        </button>
                    </div>

                    {/* Total */}
                    <p className="text-green-400 font-bold text-xl">Total: ${total}</p>

                    {/* Botón Agregar */}
                    <button
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                        onClick={() => {
                            onAddToCart(product, quantity, selectedExtras);
                            onClose();
                        }}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};
