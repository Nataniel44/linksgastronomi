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

type SaborSeleccionado = {
    sabor: string;
    cantidad: number;
};

const ModalProductoComponent: React.FC<Props> = ({
    product,
    onClose,
    getImageSrc,
    onAddToCart,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [imageLoaded, setImageLoaded] = useState(false);

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedSalsa, setSelectedSalsa] = useState<string | null>(null);
    const [selectedSizePrice, setSelectedSizePrice] = useState<number>(0);
    const [selectedSalsaPrice, setSelectedSalsaPrice] = useState<number>(0);
    const [empanadasQty, setEmpanadasQty] = useState(0);
    const [saboresSeleccionados, setSaboresSeleccionados] = useState<SaborSeleccionado[]>([]);

    const [extrasQty, setExtrasQty] = useState<number[]>(
        product.options?.extras?.map(() => 0) || []
    );

    const extrasTotal = product.options?.extras
        ? product.options.extras.reduce(
            (sum, extra, idx) => sum + (extrasQty[idx] || 0) * extra.price,
            0
        )
        : 0;

    // 🔒 Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleQuantityDecrease = useCallback(() => {
        setQuantity((q) => Math.max(1, q - 1));
    }, []);

    const handleQuantityIncrease = useCallback(() => {
        setQuantity((q) => q + 1);
    }, []);

    const handleAddToCart = useCallback(() => {
        if ((product.options?.sizes?.length ?? 0) > 0 && !selectedSize) {
            alert("Por favor, elegí una porción antes de continuar.");
            return;
        }

        if ((product.options?.salsas?.length ?? 0) > 0 && !selectedSalsa) {
            alert("Por favor, elegí una salsa antes de continuar.");
            return;
        }

        // 🔹 Validar que si es empanada, haya al menos una seleccionada
        if (product.name.toLowerCase().includes("empanada") && empanadasQty === 0) {
            alert("Seleccioná al menos una empanada antes de agregar al carrito.");
            return;
        }

        // 🔸 Si es empanada, usamos la cantidad seleccionada
        const totalQty =
            product.name.toLowerCase().includes("empanada") && empanadasQty > 0
                ? empanadasQty
                : quantity;

        // 🔸 Armamos los extras finales
        const selectedExtrasFinal: Extra[] = [
            ...(saboresSeleccionados.length > 0
                ? saboresSeleccionados
                    .filter((s) => s.cantidad > 0)
                    .map((s) => ({
                        name: `${s.sabor} x${s.cantidad}`,
                        price: 0,
                    }))
                : []),
            ...(selectedSalsa ? [{ name: selectedSalsa, price: selectedSalsaPrice }] : []),
            ...(selectedSize ? [{ name: selectedSize, price: selectedSizePrice }] : []),
            ...(product.options?.extras || [])
                .map((extra, idx) =>
                    extrasQty[idx] > 0
                        ? { name: `${extra.name} x${extrasQty[idx]}`, price: extra.price * extrasQty[idx] }
                        : null
                )
                .filter(Boolean) as Extra[],
        ];

        // 🔸 Enviamos el producto con todo lo necesario al carrito
        onAddToCart(product, totalQty, selectedExtrasFinal);
        onClose();
    }, [
        product,
        selectedSize,
        selectedSalsa,
        empanadasQty,
        quantity,
        saboresSeleccionados,
        selectedSalsaPrice,
        selectedSizePrice,
        extrasQty,
        onAddToCart,
        onClose,
    ]);

    const baseQty =
        product.name.toLowerCase().includes("empanada") && empanadasQty > 0
            ? empanadasQty
            : quantity;

    const totalFinal =
        (product.price + selectedSizePrice + selectedSalsaPrice + extrasTotal) * baseQty;

    const isEmpanada = product.name.toLowerCase().includes("empanada");

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 animate-fadeIn p-0 sm:p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-gradient-to-b from-gray-900 via-zinc-900 to-black rounded-t-3xl sm:rounded-3xl overflow-hidden w-full max-w-md md:max-w-4xl shadow-2xl transform transition-all duration-150 animate-slideUp max-h-[95svh] sm:max-h-[90svh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all active:scale-90"
                    aria-label="Cerrar modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Layout de dos columnas en md+ */}
                <div className="md:grid md:grid-cols-2 md:gap-0">
                    {/* Imagen del producto */}
                    {product.image && !isEmpanada && (
                        <div className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-full bg-gray-800">
                            {!imageLoaded && (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 animate-pulse" />
                            )}
                            <Image
                                src={getImageSrc(product.image)}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={`object-cover transition-all duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"
                                    }`}
                                priority
                                onLoad={() => setImageLoaded(true)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />
                        </div>
                    )}

                    {/* Contenido del modal */}
                    <div className="p-6 space-y-5 md:overflow-y-auto md:max-h-[90vh]">
                        {/* Título y descripción */}
                        <div>
                            <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                            {product.description && (
                                <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            )}

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

                        </div>

                        {/* Opciones dinámicas */}
                        {product.options && (
                            <div className="space-y-5">
                                {/* Tamaños/Porciones */}
                                {product.options?.sizes && product.options.sizes.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="font-semibold text-white text-base">
                                            Porciones <span className="text-red-400">*</span>
                                        </div>
                                        <div className="space-y-2">
                                            {product.options.sizes.map((size, idx) => (
                                                <label
                                                    key={idx}
                                                    className={`flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer transition-all border-2 ${selectedSize === size.portion
                                                        ? "bg-green-500/20 border-green-500"
                                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            name="size"
                                                            value={size.portion}
                                                            checked={selectedSize === size.portion}
                                                            onChange={() => {
                                                                setSelectedSize(size.portion ?? "");
                                                                setSelectedSizePrice(size.price);
                                                            }}
                                                            className="accent-green-500 w-4 h-4"
                                                        />
                                                        <span className="text-sm text-white font-medium">
                                                            {size.portion}
                                                        </span>
                                                    </div>
                                                    {size.price > 0 && (
                                                        <span className="text-green-400 font-bold text-sm">
                                                            +${size.price}
                                                        </span>
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Selector de Empanadas */}
                                {product.options?.sabores && isEmpanada && (
                                    <div className="space-y-2">
                                        <div className="font-semibold text-white text-base">
                                            Sabores <span className="text-red-400">*</span>
                                        </div>
                                        <SelectorEmpanadas
                                            sabores={product.options.sabores}
                                            onSelect={(saboresSeleccionados) => {
                                                setSaboresSeleccionados(saboresSeleccionados);
                                                const totalEmpanadas = saboresSeleccionados.reduce(
                                                    (acc, s) => acc + s.cantidad,
                                                    0
                                                );
                                                setEmpanadasQty(totalEmpanadas);
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Salsas */}
                                {product.options?.salsas && product.options.salsas.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="font-semibold text-white text-base">
                                            Salsas <span className="text-red-400">*</span>
                                        </div>
                                        <div className="space-y-2">
                                            {product.options.salsas.map((salsa, idx) => {
                                                const salsaName = typeof salsa === "string" ? salsa : salsa.name;
                                                const salsaPrice = typeof salsa === "string" ? 0 : salsa.price || 0;

                                                return (
                                                    <label
                                                        key={idx}
                                                        className={`flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer transition-all border-2 ${selectedSalsa === salsaName
                                                            ? "bg-green-500/20 border-green-500"
                                                            : "bg-white/5 border-white/10 hover:border-white/30"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="radio"
                                                                name="salsa"
                                                                value={salsaName}
                                                                checked={selectedSalsa === salsaName}
                                                                onChange={() => {
                                                                    setSelectedSalsa(salsaName);
                                                                    setSelectedSalsaPrice(salsaPrice);
                                                                }}
                                                                className="accent-green-500 w-4 h-4"
                                                            />
                                                            <span className="text-sm text-white font-medium">
                                                                {salsaName}
                                                            </span>
                                                        </div>
                                                        {salsaPrice > 0 && (
                                                            <span className="text-green-400 font-bold text-sm">
                                                                +${salsaPrice}
                                                            </span>
                                                        )}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Extras */}
                                {product.options?.extras && product.options.extras.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="font-semibold text-white text-base">
                                            Extras{" "}
                                            <span className="text-xs text-gray-400 font-normal">(opcional)</span>
                                        </div>
                                        <div className="space-y-2">
                                            {product.options.extras.map((extra, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                                                >
                                                    <div className="flex-1">
                                                        <span className="text-sm text-white font-medium">
                                                            {extra.name}
                                                        </span>
                                                        {extra.price > 0 && (
                                                            <span className="text-green-400 font-bold text-sm ml-2">
                                                                +${extra.price}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3 bg-white/10 rounded-full px-2">
                                                        <button
                                                            onClick={() =>
                                                                setExtrasQty((qty) =>
                                                                    qty.map((q, i) => (i === idx ? Math.max(0, q - 1) : q))
                                                                )
                                                            }
                                                            className="text-white hover:text-green-400 transition p-1"
                                                            aria-label="Disminuir cantidad"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="font-bold text-white min-w-[20px] text-center">
                                                            {extrasQty[idx]}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                setExtrasQty((qty) =>
                                                                    qty.map((q, i) => (i === idx ? q + 1 : q))
                                                                )
                                                            }
                                                            className="text-white hover:text-green-400 transition p-1"
                                                            aria-label="Aumentar cantidad"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Cantidad */}
                        {!isEmpanada ? (
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-white font-semibold text-base">Cantidad</span>
                                <div className="flex items-center bg-white/10 rounded-full overflow-hidden">
                                    <button
                                        className="px-4 py-2 text-white hover:bg-white/20 transition active:scale-95"
                                        onClick={handleQuantityDecrease}
                                        aria-label="Disminuir cantidad"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-6 text-white font-bold">{quantity}</span>
                                    <button
                                        className="px-4 py-2 text-white hover:bg-white/20 transition active:scale-95"
                                        onClick={handleQuantityIncrease}
                                        aria-label="Aumentar cantidad"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-white font-semibold text-base">
                                    Total de empanadas
                                </span>
                                <span className="px-6 py-2 bg-green-500/20 rounded-full text-white font-bold border-2 border-green-500">
                                    {empanadasQty}
                                </span>
                            </div>
                        )}

                        {/* Total */}
                        <div className="flex justify-between items-center border-t border-white/20 pt-4 mt-4">
                            <span className="text-lg font-semibold text-gray-300">Total:</span>
                            <span className="text-3xl font-bold text-green-400">${totalFinal}</span>
                        </div>

                        {/* Botón agregar */}
                        <button
                            disabled={
                                ((product.options?.sizes?.length ?? 0) > 0 && !selectedSize) ||
                                ((product.options?.salsas?.length ?? 0) > 0 && !selectedSalsa) ||
                                (isEmpanada && empanadasQty === 0)
                            }
                            className={`w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all active:scale-[0.97] ${((product.options?.sizes?.length ?? 0) > 0 && !selectedSize) ||
                                ((product.options?.salsas?.length ?? 0) > 0 && !selectedSalsa) ||
                                (isEmpanada && empanadasQty === 0)
                                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                                : "bg-green-600 hover:bg-green-700 text-white shadow-green-500/50"
                                }`}
                            onClick={handleAddToCart}
                        >
                            {((product.options?.sizes?.length ?? 0) > 0 && !selectedSize) ||
                                ((product.options?.salsas?.length ?? 0) > 0 && !selectedSalsa) ||
                                (isEmpanada && empanadasQty === 0)
                                ? "Completá las opciones requeridas"
                                : "Agregar al carrito"}
                        </button>
                    </div>
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
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                /* Scrollbar personalizado */
                div::-webkit-scrollbar {
                    width: 6px;
                }
                div::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb {
                    background: rgba(34, 197, 94, 0.5);
                    border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb:hover {
                    background: rgba(34, 197, 94, 0.7);
                }
            `}</style>
        </div>
    );
};

export const ModalProducto = memo(ModalProductoComponent);