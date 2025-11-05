"use client";
import Image from "next/image";
import { memo } from "react";
import { Product } from "@/types/product";

type Props = {
    product: Product;
    onClick: (p: Product) => void;
    getImageSrc: (src?: string) => string;
};

const ProductCardBase: React.FC<Props> = ({ product, onClick, getImageSrc }) => {
    const hasDiscount = product.comparePrice != null && product.comparePrice > product.price;
    const discountPercent =
        hasDiscount && product.comparePrice
            ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
            : 0;

    // Detectar si es empanada
    const isEmpanada =
        product.options?.sabores?.length ||
        product.name.toLowerCase().includes("empanada");

    const hasOptions =
        product.options &&
        (product.options.sizes?.length ||
            product.options.extras?.length ||
            product.options.salsas?.length ||
            product.options.sabores?.length);

    return (
        <div
            onClick={() => onClick(product)}
            className="group relative rounded-2xl bg-white dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-gray-200 dark:hover:border-zinc-700 hover:-translate-y-1"
        >
            {/* Imagen */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-zinc-800/50">
                {product.image ? (
                    <Image
                        src={getImageSrc(product.image)}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-zinc-700/50 flex items-center justify-center">
                            <span className="text-2xl">🍽️</span>
                        </div>
                    </div>
                )}

                {/* Badge de descuento */}
                {hasDiscount && (
                    <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                        -{discountPercent}%
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="p-4 space-y-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {product.name}
                </h3>

                {product.description && (
                    <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                )}

                {/* Pills Neon de Opciones */}
                {hasOptions && (
                    <div className="flex flex-wrap gap-1.5">
                        {/* Porciones Pills */}
                        {product.options?.sizes?.length ? (
                            <>
                                {product.options.sizes.slice(0, 3).map((size, idx) => (
                                    <div
                                        key={idx}
                                        className="group/pill flex items-center gap-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-purple-300 dark:text-purple-200 transition-all duration-300 border border-purple-500/30"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                                        <span className="text-[10px] font-semibold tracking-wide">
                                            {size.portion || size.name}
                                        </span>
                                    </div>
                                ))}
                                {product.options.sizes.length > 3 && (
                                    <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-purple-300 dark:text-purple-200 border border-purple-500/30">
                                        <span className="text-[10px] font-semibold">
                                            +{product.options.sizes.length - 3}
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : null}

                        {/* Sabores Pills (Empanadas) */}
                        {isEmpanada && product.options?.sabores?.length ? (
                            <>
                                {product.options.sabores.slice(0, 2).map((sabor, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 hover:from-orange-500/30 hover:to-orange-600/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-orange-300 dark:text-orange-200 transition-all duration-300 border border-orange-500/30"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
                                        <span className="text-[10px] font-semibold tracking-wide">
                                            {sabor}
                                        </span>
                                    </div>
                                ))}
                                {product.options.sabores.length > 2 && (
                                    <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-orange-300 dark:text-orange-200 border border-orange-500/30">
                                        <span className="text-[10px] font-semibold">
                                            +{product.options.sabores.length - 2}
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : null}

                        {/* Extras Pills */}
                        {product.options?.extras?.length ? (
                            <>
                                {product.options.extras.slice(0, 2).map((extra, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-green-300 dark:text-green-200 transition-all duration-300 border border-green-500/30"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-[10px] font-semibold tracking-wide">
                                            {extra.name}
                                        </span>
                                    </div>
                                ))}
                                {product.options.extras.length > 2 && (
                                    <div className="flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-green-300 dark:text-green-200 border border-green-500/30">
                                        <span className="text-[10px] font-semibold">
                                            +{product.options.extras.length - 2}
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : null}

                        {/* Salsas Pills */}
                        {product.options?.salsas?.length ? (
                            <>
                                {product.options.salsas.slice(0, 2).map((salsa, idx) => {
                                    const salsaName = typeof salsa === "string" ? salsa : salsa.name;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-1 bg-gradient-to-r from-pink-500/20 to-pink-600/20 hover:from-pink-500/30 hover:to-pink-600/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-pink-300 dark:text-pink-200 transition-all duration-300 border border-pink-500/30"
                                        >
                                            <div className="w-1 h-1 rounded-full bg-pink-400 animate-pulse" />
                                            <span className="text-[10px] font-semibold tracking-wide">
                                                {salsaName}
                                            </span>
                                        </div>
                                    );
                                })}
                                {product.options.salsas.length > 2 && (
                                    <div className="flex items-center gap-1 bg-gradient-to-r from-pink-500/20 to-pink-600/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-pink-300 dark:text-pink-200 border border-pink-500/30">
                                        <span className="text-[10px] font-semibold">
                                            +{product.options.salsas.length - 2}
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : null}
                    </div>
                )}

                {/* Precios */}
                <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${product.price}
                    </span>
                    {product.comparePrice && (
                        <span className="text-sm text-gray-400 dark:text-zinc-500 line-through">
                            ${product.comparePrice}
                        </span>
                    )}
                </div>
            </div>

            {/* Indicador de hover */}
            <div className="absolute inset-0 border-2 border-green-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
};

export const ProductCard = memo(ProductCardBase);
export default ProductCard;