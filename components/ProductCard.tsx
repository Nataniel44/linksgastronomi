"use client";
import { motion } from "framer-motion";
import Image from "next/image";
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
    slug?: string;
};

type Props = {
    product: Product;
    onClick: (p: Product) => void;
    getImageSrc: (src?: string) => string;
};

export const ProductCard: React.FC<Props> = ({ product, onClick, getImageSrc }) => {
    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const shareText = `🔥 ${product.name} - $${product.price}\n${product.description || ""}`;
        const imageUrl = getImageSrc(product.image || undefined);
        const productUrl = `${window.location.origin}/producto/${product.slug || product.id}`;

        try {
            // Intentamos compartir con imagen
            if (navigator.canShare && navigator.canShare({ files: [] })) {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const file = new File([blob], `${product.name}.jpg`, { type: blob.type });

                await navigator.share({
                    title: product.name,
                    text: shareText,
                    files: [file],
                    url: productUrl,
                });
            } else if (navigator.share) {
                // Solo texto + URL
                await navigator.share({
                    title: product.name,
                    text: shareText,
                    url: productUrl,
                });
            } else {
                // Fallback a WhatsApp
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                    `${shareText}\n\n${imageUrl}\n${productUrl}`
                )}`;
                window.open(whatsappUrl, "_blank");
            }
        } catch (err) {
            console.error("Error al compartir:", err);
        }
    };

    return (
        <motion.div
            key={product.id}
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden cursor-pointer relative group"
            onClick={() => onClick(product)}
        >
            {product.image ? (
                <Image
                    src={getImageSrc(product.image)}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                />
            ) : (
                <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-white">
                    Sin imagen
                </div>
            )}

            {/* Botón compartir */}
            <button
                onClick={handleShare}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
            >
                <Share2 size={18} />
            </button>

            <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                {product.description && <p className="text-white/70 text-sm">{product.description}</p>}
                {product.comparePrice && (
                    <p className="text-red-400 line-through text-sm">${product.comparePrice}</p>
                )}
                {product.options?.extras && (
                    <p className="text-white/70 text-sm">
                        Extras: {product.options.extras.map((e) => e.name).join(", ")}
                    </p>
                )}
                <p className="font-bold text-white mt-1">${product.price}</p>
            </div>
        </motion.div>
    );
};
