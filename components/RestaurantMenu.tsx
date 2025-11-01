"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ModalProducto } from "./ModalProducto";
import { ProductCard } from "./ProductCard";
import { Banner } from "./Banner";
import { CartSidebar } from "./CartSidebar";
import { CategorySelector } from "./CategorySelector";
import LoadingScreen from "./LoadingScreen";
import { MessageCircle, ShoppingCart } from "lucide-react";
import OrderHistory from "./OrderHistory";

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


    const clearCart = () => setCart([]);


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

    if (loading) return <LoadingScreen />;
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
        <div className="relative w-full bg-gray-900 rounded-b-lg min-h-screen ">


            {/* Carrito flotante */}
            {showCart && (
                <CartSidebar
                    cart={cart}
                    onClose={() => setShowCart(false)}
                    removeItem={(i) => setCart(cart.filter((_, idx) => idx !== i))}
                    whatsapp={restaurant.whatsapp as string}
                    restaurantId={restaurant.id}
                    getImageSrc={getImageSrc}
                    clearCart={clearCart} // 🔥 NUEVO
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
                    <CategorySelector
                        categories={categories}
                        activeCategory={activeCategory}
                        activeSubcategory={activeSubcategory}
                        onSelectCategory={setActiveCategory}
                        onSelectSubcategory={setActiveSubcategory}
                    />


                    {/* Productos */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-12">
                        {filteredProducts.map(prod => (
                            <ProductCard
                                key={prod.id}
                                product={prod}
                                onClick={(p) => setSelectedProduct(p as Product)}
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
            <div className="fixed bottom-6 right-6   gap-6 flex">

                {/* Botón flotante para abrir carrito */}
                {cart.length > 0 && (
                    <button
                        className="group flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl text-white transition-all duration-200 border border-green-400/20 hover:scale-105 active:scale-95"
                        onClick={() => setShowCart(true)}
                    >
                        <div className="relative">
                            <ShoppingCart className="w-5 h-5" />
                            {/* Badge con cantidad */}
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white/20">
                                {cart.length}
                            </span>
                        </div>
                        <span className="text-sm font-medium">Ver carrito</span>
                    </button>
                )}
                {/* Botón flotante de WhatsApp */}
                {restaurant.whatsapp && (
                    <a
                        href={`https://wa.me/${restaurant.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center bg-green-500/90 hover:bg-green-600 backdrop-blur-md w-14 h-14 rounded-full shadow-lg hover:shadow-xl text-white transition-all duration-200 border border-green-400/30 hover:scale-110 active:scale-95"
                    >
                        <MessageCircle className="w-6 h-6" />
                    </a>
                )}
            </div>
        </div>
    );
};
