import { motion } from "framer-motion";
import Image from "next/image";

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

export const ProductCard: React.FC<Props> = ({ product, onClick, getImageSrc }) => (
    <motion.div
        key={product.id}
        className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden cursor-pointer "

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
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-white">Sin imagen</div>
        )}
        <div className="p-4 space-y-1">
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            {product.description && <p className="text-white/70 text-sm">{product.description}</p>}
            {product.comparePrice && <p className="text-red-400 line-through text-sm">${product.comparePrice}</p>}
            {product.options?.extras && (
                <p className="text-white/70 text-sm">Extras: {product.options.extras.map(e => e.name).join(", ")}</p>
            )}
            <p className="font-bold text-white mt-1">${product.price}</p>
        </div>
    </motion.div>
);
