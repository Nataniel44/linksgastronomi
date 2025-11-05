"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { Product, Extra } from "@/types/product";
import SelectorEmpanadas from "./SelectorEmpanadas";

type Props = {
    product: Product;
    onClose: () => void;
    getImageSrc: (src?: string) => string;
    onAddToCart: (product: Product, quantity: number, selectedExtras: Extra[]) => void;
};

const ModalProductoComponent: React.FC<Props> = ({
    product,
    onClose,
    getImageSrc,
    onAddToCart,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
    const [total, setTotal] = useState(product.price);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Calcular total (memoizado)
    useEffect(() => {
        const extrasTotal = selectedExtras.reduce((acc, e) => acc + (e.price || 0), 0);
        setTotal((product.price + extrasTotal) * quantity);
    }, [quantity, selectedExtras, product.price]);

    // Handlers optimizados
    const handleQuantityDecrease = useCallback(() => {
        setQuantity((q) => Math.max(1, q - 1));
    }, []);

    const handleQuantityIncrease = useCallback(() => {
        setQuantity((q) => q + 1);
    }, []);

    const handleAddToCart = useCallback(() => {
        onAddToCart(product, quantity, selectedExtras);
        onClose();
    }, [product, quantity, selectedExtras, onAddToCart, onClose]);

    // Toggle extra optimizado
    const toggleExtra = useCallback((extra: Extra) => {
        setSelectedExtras((prev) =>
            prev.find((e) => e.name === extra.name)
                ? prev.filter((e) => e.name !== extra.name)
                : [...prev, extra]
        );
    }, []);

    // Handler para salsas (FIX DEL ERROR)
    const toggleSalsa = useCallback((salsaName: string) => {
        setSelectedExtras((prev) => {
            const exists = prev.find((e) => e.name === salsaName);
            if (exists) {
                return prev.filter((e) => e.name !== salsaName);
            } else {
                // Crear objeto Extra válido
                return [...prev, { name: salsaName, price: 0 }];
            }
        });
    }, []);

    // Handler para tamaños
    const selectSize = useCallback((sizePortion: string, sizePrice: number) => {
        // Remover otros tamaños primero
        setSelectedExtras((prev) => {
            const withoutSizes = prev.filter(
                (e) => !product.options?.sizes?.some((s) => s.portion === e.name)
            );
            return [...withoutSizes, { name: sizePortion, price: sizePrice }];
        });
    }, [product.options?.sizes]);

    // Verificar si un item está seleccionado
    const isSelected = useCallback(
        (name: string) => selectedExtras.some((e) => e.name === name),
        [selectedExtras]
    );

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative bg-gradient-to-b from-gray-900 via-zinc-900 to-black rounded-2xl overflow-hidden max-w-md w-full shadow-2xl transform transition-all duration-150 animate-slideUp max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="fixed top-3 right-3 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
                    aria-label="Cerrar modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Imagen */}
                {product.image && (
                    <div className="relative w-full aspect-[4/3] bg-gray-800">
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 animate-pulse" />
                        )}
                        <Image
                            src={getImageSrc(product.image)}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 448px"
                            className={`object-cover transition-all duration-700 hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"
                                }`}
                            priority
                            onLoadingComplete={() => setImageLoaded(true)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                )}

                {/* Contenido */}
                <div className="p-6 space-y-5">
                    {/* Nombre y descripción */}
                    <div>
                        <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                        {product.description && (
                            <p className="text-gray-300 mt-1 text-sm leading-relaxed">
                                {product.description}
                            </p>
                        )}
                    </div>

                    {/* Precio base */}
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-semibold text-green-400">
                            ${product.price}
                        </span>
                        {product.comparePrice && (
                            <span className="text-gray-400 line-through">
                                ${product.comparePrice}
                            </span>
                        )}
                    </div>

                    {/* OPCIONES */}
                    {product.options && (
                        <div className="space-y-5">
                            {/* Tamaños o porciones */}
                            {product.options.sizes && product.options.sizes.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-white font-semibold text-sm uppercase tracking-wide">
                                        Porciones
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        {product.options.sizes.map((size, idx) => {
                                            const selected = isSelected(size.portion || "");
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => selectSize(size.portion || "", size.price)}
                                                    className={`w-full flex justify-between items-center px-3 py-2 rounded-lg border transition-all ${selected
                                                        ? "bg-green-600 text-white border-green-400 shadow-md"
                                                        : "bg-white/5 border-white/10 text-gray-200 hover:bg-green-600/60 hover:text-white"
                                                        }`}
                                                >
                                                    <span>{size.portion}</span>
                                                    <span className="font-semibold">
                                                        {size.price > 0 ? `+$${size.price}` : "Incluido"}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {/* Selector de Empanadas */}
                            {product.options?.sabores && product.name.toLowerCase().includes("empanada") && (
                                <SelectorEmpanadas
                                    sabores={product.options.sabores}
                                    onSelect={(saboresSeleccionados) => {
                                        // Convertir selección a extras sin precio
                                        const seleccionExtras = saboresSeleccionados
                                            .filter((s) => s.cantidad > 0)
                                            .map((s) => ({ name: `${s.sabor} x${s.cantidad}`, price: 0 }));

                                        setSelectedExtras(seleccionExtras);
                                    }}
                                />
                            )}

                            {/* Extras */}
                            {product.options.extras && product.options.extras.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-white font-semibold text-sm uppercase tracking-wide">
                                        Extras
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.options.extras.map((extra) => {
                                            const selected = isSelected(extra.name);
                                            return (
                                                <button
                                                    key={extra.name}
                                                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${selected
                                                        ? "bg-green-500 text-white border-green-400 shadow-md scale-105"
                                                        : "bg-white/5 border-white/10 text-gray-200 hover:bg-green-600/60 hover:text-white"
                                                        }`}
                                                    onClick={() => toggleExtra(extra)}
                                                >
                                                    {extra.name} (+${extra.price})
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Salsas - FIX APLICADO */}
                            {product.options.salsas && product.options.salsas.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-white font-semibold text-sm uppercase tracking-wide">
                                        Salsas
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.options.salsas.map((salsa, idx) => {
                                            // Asegurarse de que salsa es un string
                                            const salsaName = typeof salsa === 'string' ? salsa : salsa.name;
                                            const selected = isSelected(salsaName);

                                            return (
                                                <button
                                                    key={idx}
                                                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${selected
                                                        ? "bg-green-500 text-white border-green-400 shadow-md scale-105"
                                                        : "bg-white/5 border-white/10 text-gray-200 hover:bg-green-600/60 hover:text-white"
                                                        }`}
                                                    onClick={() => toggleSalsa(salsaName)}
                                                >
                                                    {salsaName}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Cantidad */}
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-white font-semibold text-sm uppercase tracking-wide">
                            Cantidad
                        </span>
                        <div className="flex items-center bg-white/10 rounded-full overflow-hidden">
                            <button
                                className="px-3 py-2 text-white hover:bg-white/20 transition"
                                onClick={handleQuantityDecrease}
                                aria-label="Disminuir cantidad"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 text-white font-medium">{quantity}</span>
                            <button
                                className="px-3 py-2 text-white hover:bg-white/20 transition"
                                onClick={handleQuantityIncrease}
                                aria-label="Aumentar cantidad"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                        <span className="text-lg font-semibold text-gray-300">Total:</span>
                        <span className="text-2xl font-bold text-green-400">${total}</span>
                    </div>

                    {/* Botón agregar */}
                    <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all active:scale-[0.97]"
                        onClick={handleAddToCart}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>

            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease forwards;
                }
                .animate-slideUp {
                    animation: slideUp 0.35s ease forwards;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes slideUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export const ModalProducto = memo(ModalProductoComponent);