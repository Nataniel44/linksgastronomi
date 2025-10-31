"use client";
import Image from "next/image";
import { memo } from "react";
import { Share2 } from "lucide-react";

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
    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();

        const shareText = `🔥 ${product.name} - $${product.price}\n${product.description || ""}`;
        const restaurantUrl = window.location.href;

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${restaurantUrl}`)}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div
            key={product.id}
            onClick={() => onClick(product)}
            className="rounded-xl bg-zinc-900/60 border border-zinc-800 overflow-hidden cursor-pointer select-none transition-transform active:scale-[0.97] hover:shadow-lg"
        >
            {/* Imagen optimizada */}
            {product.image ? (
                <div className="relative w-full h-48">
                    <Image
                        src={getImageSrc(product.image)}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="/placeholder.jpg"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            ) : (
                <div className="w-full h-48 bg-zinc-800 flex items-center justify-center text-white text-sm">
                    Sin imagen
                </div>
            )}

            {/* Contenido */}
            <div className="p-3 text-white space-y-1">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold truncate">{product.name}</h3>
                    <button
                        onClick={handleShare}
                        className="p-1.5 rounded-full bg-zinc-800 hover:bg-green-600 transition"
                        aria-label="Compartir"
                    >
                        <Share2 size={16} />
                    </button>
                </div>

                {product.description && (
                    <p className="text-xs text-zinc-400 line-clamp-2">{product.description}</p>
                )}

                {product.comparePrice && (
                    <p className="text-xs text-red-400 line-through">${product.comparePrice}</p>
                )}

                <p className="text-lg font-bold">${product.price}</p>
            </div>
        </div>
    );
};

export const ProductCard = memo(ProductCardBase);
export default ProductCard;
