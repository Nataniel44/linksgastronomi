"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ModalProducto } from "./ModalProducto";
import { ProductCard } from "./ProductCard";
import { Banner } from "./Banner";
import { CartSidebar } from "./CartSidebar";

// Tipos
type Product = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    price: number;
    comparePrice?: number | null;
    options?: {
        extras?: { name: string; price: number }[];
        sizes?: { name: string; price: number }[];
    };
    categoryId: number;
    subcategoryId?: number | null;
};

type Subcategory = {
    id: number;
    name: string;
    slug: string;
};
type Extra = {
    name: string;
    price: number;
};
type Category = {
    id: number;
    name: string;
    slug: string;
    subcategories: Subcategory[];
    products: Product[];
};

type RestaurantData = {
    restaurant: {
        id: number;
        name: string;
        logo: string | null;
        banner?: string | null;
        phone: string | null;
        whatsapp: string | null;
        description: string | null;
        address: string | null;
    };
    categories: Category[];
};
export type CartItem = {
    id: number;            // id del producto
    name: string;          // nombre del producto
    price: number;         // precio base del producto
    quantity: number;      // cantidad seleccionada
    extras: Extra[];       // lista de extras seleccionados
    image?: string | null; // imagen del producto
};
type Props = {
    slug: string;
};

export const RestaurantMenu: React.FC<Props> = ({ slug }) => {
    const [data, setData] = useState<RestaurantData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSubcategory, setActiveSubcategory] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);


    const handleAddToCart = (product: Product, quantity: number, extras: Extra[]) => {
        setCart(prev => [...prev, { ...product, quantity, extras }]);
        setShowCart(true); // abrir carrito automáticamente
    };
    const handleRemoveItem = (index: number) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };
    const getImageSrc = (src?: string) => {
        if (!src) return "/placeholder.png";
        return src.startsWith("http") ? src : `${src}`;
    };

    useEffect(() => {
        const fetchMenu = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/menu/${slug}`);
                if (!res.ok) throw new Error("No se pudo cargar el restaurante");
                const json: RestaurantData = await res.json();
                setData(json);
                setActiveCategory(json.categories[0]?.slug || null);
            } catch (err: any) {
                setError(err.message || "Error al cargar");
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [slug]);

    if (loading) return <p className="text-center mt-20">Cargando menú...</p>;
    if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;
    if (!data) return null;

    const { restaurant, categories } = data;
    const activeCat = categories.find((c) => c.slug === activeCategory);
    const subcategories = activeCat?.subcategories || [];
    const filteredProducts = activeCat
        ? activeCat.products.filter((p) =>
            activeSubcategory ? p.subcategoryId === activeSubcategory : true
        )
        : [];

    return (
        <div className="relative bg-gray-900 min-h-screen p">


            {/* Carrito flotante */}
            {showCart && (
                <CartSidebar
                    cart={cart}
                    onClose={() => setShowCart(false)}
                    removeItem={handleRemoveItem}
                    getImageSrc={getImageSrc}
                    whatsapp={restaurant.whatsapp || ""}
                />
            )}
            {/* Banner */}
            {restaurant.banner && (
                <div className="relative w-full">
                    <Banner
                        name={restaurant.name}
                        logo={restaurant.logo}
                        banner={restaurant.banner}
                        description={restaurant.description}
                        phone={restaurant.phone}
                        whatsapp={restaurant.whatsapp}
                        address={restaurant.address}
                        getImageSrc={getImageSrc}
                    />

                    {/* Productos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-12">
                        {filteredProducts.map(prod => (
                            <ProductCard
                                key={prod.id}
                                product={prod}
                                onClick={setSelectedProduct}
                                getImageSrc={getImageSrc}
                            />
                        ))}
                    </div>

                    {selectedProduct && (
                        <ModalProducto
                            product={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                            getImageSrc={getImageSrc}
                            onAddToCart={handleAddToCart}
                        />)}

                </div>
            )}

            {/* Botón flotante para abrir carrito */}
            {cart.length > 0 && (
                <button
                    className="fixed bottom-24 z-10 right-6 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-xl text-white text-2xl"
                    onClick={() => setShowCart(true)}
                >
                    🛒 ({cart.length})
                </button>
            )}
            {/* Botón WhatsApp flotante */}
            {restaurant.whatsapp && (
                <a
                    href={`https://wa.me/${restaurant.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-xl text-white text-2xl"
                >
                    💬
                </a>
            )}
        </div>
    );
};
