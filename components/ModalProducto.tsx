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
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
    const [total, setTotal] = useState(product.price);
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

    // actualiza total base con extras manuales
    useEffect(() => {
        const extrasTotal = selectedExtras.reduce((acc, e) => acc + (e.price || 0), 0);
        setTotal((product.price + extrasTotal) * quantity);
    }, [quantity, selectedExtras, product.price]);

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
                        ? { name: extra.name, price: extra.price * extrasQty[idx] }
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
        selectedExtras,
        saboresSeleccionados,
        selectedSalsaPrice,
        selectedSizePrice,
        extrasQty,
        onAddToCart,
        onClose,
    ]);

    const isSelected = useCallback(
        (name: string) => selectedExtras.some((e) => e.name === name),
        [selectedExtras]
    );

    const baseQty =
        product.name.toLowerCase().includes("empanada") && empanadasQty > 0
            ? empanadasQty
            : quantity;

    const totalFinal =
        (product.price + selectedSizePrice + selectedSalsaPrice + extrasTotal) * baseQty;

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end justify-center z-50  animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative bg-gradient-to-b from-gray-900 via-zinc-900 to-black rounded-t-2xl overflow-hidden max-w-md w-full shadow-2xl transform transition-all duration-150 animate-slideUp max-h-[100dvh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="fixed top-3 right-3 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
                    aria-label="Cerrar modal"
                >
                    <X className="w-5 h-5" />
                </button>
                {product.image && !product.name.toLowerCase().includes("empanada") && (
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



                <div className="p-6 space-y-5">
                    <div>
                        <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                        {product.description && (
                            <p className="text-gray-300 mt-1 text-sm leading-relaxed">
                                {product.description}
                            </p>
                        )}
                    </div>


                    {/* 🔸 Opciones dinámicas */}
                    {product.options && (
                        <div className="space-y-4">
                            {/* Tamaños */}
                            {product.options?.sizes && product.options.sizes.length > 0 && (
                                <div>
                                    <div className="font-semibold mb-2">Porciones</div>
                                    {product.options.sizes.map((size, idx) => (
                                        <label key={idx} className="flex items-center gap-2 mb-2 cursor-pointer">
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
                                            <span className="text-sm text-white">
                                                {size.portion}
                                                {size.price > 0 && (
                                                    <span className="text-green-400 font-bold ml-1">
                                                        +${size.price}
                                                    </span>
                                                )}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* Extras */}
                            {product.options?.extras && product.options.extras.length > 0 && (
                                <div>
                                    <div className="font-semibold mb-2">
                                        Extras <span className="text-xs text-gray-400">(opcional)</span>
                                    </div>
                                    {product.options.extras.map((extra, idx) => (
                                        <div key={idx} className="flex items-center gap-2 mb-2 text-white">
                                            <span className="text-sm">{extra.name}</span>
                                            {extra.price > 0 && (
                                                <span className="text-green-400 font-bold text-sm">
                                                    +${extra.price}
                                                </span>
                                            )}
                                            <button
                                                onClick={() =>
                                                    setExtrasQty((qty) =>
                                                        qty.map((q, i) => (i === idx ? Math.max(0, q - 1) : q))
                                                    )
                                                }
                                                className="text-xl px-2"
                                            >
                                                -
                                            </button>
                                            <span className="font-bold">{extrasQty[idx]}</span>
                                            <button
                                                onClick={() =>
                                                    setExtrasQty((qty) =>
                                                        qty.map((q, i) => (i === idx ? q + 1 : q))
                                                    )
                                                }
                                                className="text-xl px-2"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 🔸 Selector de Empanadas */}
                            {product.options?.sabores &&
                                product.name.toLowerCase().includes("empanada") && (
                                    <div>
                                        <div className="font-semibold mb-2">Sabores</div>

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

                            {/* 🔸 Salsas */}
                            {product.options?.salsas && product.options.salsas.length > 0 && (
                                <div>
                                    <div className="font-semibold mb-2">
                                        Salsas <span className="text-xs text-gray-400">(elegí una)</span>
                                    </div>
                                    {product.options.salsas.map((salsa, idx) => {
                                        const salsaName = typeof salsa === "string" ? salsa : salsa.name;
                                        const salsaPrice =
                                            typeof salsa === "string" ? 0 : salsa.price || 0;

                                        return (
                                            <label
                                                key={idx}
                                                className="flex items-center gap-2 mb-2 cursor-pointer text-white"
                                            >
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
                                                <span className="text-sm">
                                                    {salsaName}
                                                    {salsaPrice > 0 && (
                                                        <span className="text-green-400 font-bold ml-1">
                                                            +${salsaPrice}
                                                        </span>
                                                    )}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 🔸 Cantidad */}
                    {!product.name.toLowerCase().includes("empanada") ? (
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-white font-semibold text-sm uppercase tracking-wide">
                                Cantidad
                            </span>
                            <div className="flex items-center bg-white/10 rounded-full overflow-hidden">
                                <button
                                    className="px-3 py-2 text-white hover:bg-white/20 transition"
                                    onClick={handleQuantityDecrease}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 text-white font-medium">{quantity}</span>
                                <button
                                    className="px-3 py-2 text-white hover:bg-white/20 transition"
                                    onClick={handleQuantityIncrease}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-white font-semibold text-sm uppercase tracking-wide">
                                Cantidad de empanadas
                            </span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-white font-medium">
                                {empanadasQty}
                            </span>
                        </div>
                    )}

                    {/* Total */}
                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                        <span className="text-lg font-semibold text-gray-300">Total:</span>
                        <span className="text-2xl font-bold text-green-400">${totalFinal}</span>
                    </div>

                    <button
                        disabled={
                            ((product.options?.sizes?.length ?? 0) > 0 && !selectedSize) ||
                            ((product.options?.salsas?.length ?? 0) > 0 && !selectedSalsa)
                        }
                        className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all active:scale-[0.97] ${((product.options?.sizes?.length ?? 0) > 0 && !selectedSize) ||
                            ((product.options?.salsas?.length ?? 0) > 0 && !selectedSalsa)
                            ? "bg-gray-600 cursor-not-allowed text-gray-300"
                            : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
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
