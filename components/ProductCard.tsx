"use client";
import Image from "next/image";
import { memo } from "react";

type Product = {
    id: number;
    name: string;
    description?: string | null;
    image?: string | null;
    price: number;
    comparePrice?: number | null;
    options?: {
        extras?: { name: string; price: number }[];
        sizes?: { name: string; price: number }[];
    };
};

type Props = {
    product: Product;
    onClick: (p: Product) => void;
    getImageSrc: (src?: string) => string;
};

const ProductCardBase: React.FC<Props> = ({ product, onClick, getImageSrc }) => {
    const hasDiscount = product.comparePrice != null && product.comparePrice > product.price;
    const discountPercent = hasDiscount && product.comparePrice
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 0;


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
            <div className="p-4 space-y-2">
                {/* Nombre */}
                <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {product.name}
                </h3>

                {/* Descripción */}
                {product.description && (
                    <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
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